package com.google.ai.edge.gallery.ui.home

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import androidx.hilt.work.HiltWorker
import androidx.work.BackoffPolicy
import androidx.work.CoroutineWorker
import androidx.work.ForegroundInfo
import androidx.work.ExistingWorkPolicy
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import com.google.ai.edge.gallery.MainActivity
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.common.StructuredLog
import dagger.Binds
import dagger.Module
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import com.baohaus.baoedge.core.flow.FlowExecutionState
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton

private const val TAG = "AGOperatorSchedule"
private const val OPERATOR_AUTOMATION_SCHEDULE_WORK_NAME = "operator-automation-schedule-dispatch"
private const val OPERATOR_AUTOMATION_SCHEDULE_WORK_TAG = "operator-automation-schedule"
private const val OPERATOR_AUTOMATION_NOTIFICATION_CHANNEL_ID = "operator_automation_schedule"
private const val OPERATOR_AUTOMATION_MIN_BACKOFF_MS = 10_000L

/** Resolve the earliest active schedule that still needs a background wake-up. */
internal fun resolveNextAutomationScheduleDelayMs(
  snapshot: OperatorAutomationWorkspaceSnapshot,
  nowMs: Long,
): Long? {
  if (snapshot.pendingScheduledRun != null) {
    return null
  }
  return snapshot.schedules
    .asSequence()
    .filter { schedule ->
      schedule.status == OperatorAutomationScheduleStatus.ACTIVE &&
        schedule.trigger.nextRunAtMs > 0L &&
        snapshot.savedFlows.any { flow -> flow.id == schedule.flowId }
    }
    .map(OperatorAutomationScheduleSummary::trigger)
    .map(OperatorAutomationTrigger::nextRunAtMs)
    .minOrNull()
    ?.let { nextRunAtMs -> maxOf(0L, nextRunAtMs - nowMs) }
}

/** Owner for Android WorkManager-backed schedule delivery. */
interface OperatorAutomationScheduleCoordinator {
  /** Reconcile the next due schedule against WorkManager's durable queue. */
  fun reconcile(snapshot: OperatorAutomationWorkspaceSnapshot, nowMs: Long = System.currentTimeMillis())
}

/** WorkManager-backed schedule dispatcher for Android operator automations. */
@Singleton
class WorkManagerOperatorAutomationScheduleCoordinator
@Inject
constructor(
  @ApplicationContext context: Context,
) : OperatorAutomationScheduleCoordinator {
  private val workManager = WorkManager.getInstance(context)

  override fun reconcile(snapshot: OperatorAutomationWorkspaceSnapshot, nowMs: Long) {
    val delayMs = resolveNextAutomationScheduleDelayMs(snapshot = snapshot, nowMs = nowMs)
    if (delayMs == null) {
      workManager.cancelUniqueWork(OPERATOR_AUTOMATION_SCHEDULE_WORK_NAME)
      StructuredLog.d(TAG, "operator_automation_schedule_cancelled")
      return
    }

    val request =
      OneTimeWorkRequestBuilder<OperatorAutomationScheduleWorker>()
        .setInitialDelay(delayMs, TimeUnit.MILLISECONDS)
        .setBackoffCriteria(
          BackoffPolicy.LINEAR,
          OPERATOR_AUTOMATION_MIN_BACKOFF_MS,
          TimeUnit.MILLISECONDS,
        )
        .addTag(OPERATOR_AUTOMATION_SCHEDULE_WORK_TAG)
        .build()
    workManager.enqueueUniqueWork(
      OPERATOR_AUTOMATION_SCHEDULE_WORK_NAME,
      ExistingWorkPolicy.REPLACE,
      request,
    )
    StructuredLog.d(
      TAG,
      "operator_automation_schedule_synced",
      "delayMs" to delayMs,
    )
  }
}

/** Background schedule dispatcher that promotes due automation flows into a durable pending handoff. */
@HiltWorker
class OperatorAutomationScheduleWorker
@AssistedInject
  constructor(
    @Assisted appContext: Context,
  @Assisted workerParams: WorkerParameters,
  private val automationWorkspaceStore: OperatorAutomationWorkspaceStateStore,
  private val coordinator: OperatorAutomationScheduleCoordinator,
  private val executor: OperatorAutomationExecutor,
) : CoroutineWorker(appContext, workerParams) {
  override suspend fun doWork(): Result {
    val nowMs = System.currentTimeMillis()
    val claimedSnapshot = automationWorkspaceStore.update { snapshot -> claimDueScheduledAutomation(snapshot, nowMs).snapshot }
    val pendingRun = claimedSnapshot.pendingScheduledRun
    if (pendingRun == null) {
      coordinator.reconcile(claimedSnapshot, nowMs)
      StructuredLog.d(TAG, "operator_automation_schedule_worker_idle")
      return Result.success()
    }
    // Transition phase to RUNNING before dispatching to executor.
    automationWorkspaceStore.update { snapshot ->
      snapshot.copy(
        pendingScheduledRun = snapshot.pendingScheduledRun?.copy(phase = OperatorAutomationExecutionPhase.RUNNING),
      )
    }
    setForeground(createForegroundInfo(pendingRun.flowTitle))
    val execution = executor.execute(pendingRun)
    val completedSnapshot =
      automationWorkspaceStore.update { snapshot ->
        val runSummary =
          OperatorAutomationRunSummary(
            id = "run-${System.currentTimeMillis()}-${pendingRun.scheduleId}",
            flowId = pendingRun.flowId,
            title = pendingRun.flowTitle,
            summary = execution.summary,
            state = execution.state,
          )
        completeScheduledAutomation(
          snapshot = snapshot,
          scheduleId = pendingRun.scheduleId,
          runSummary = runSummary,
          resultState = execution.state,
          requiresAttention = execution.requiresAttention,
        )
      }
    coordinator.reconcile(completedSnapshot, nowMs)
    StructuredLog.d(
      TAG,
      "operator_automation_schedule_worker_completed",
      "state" to execution.state.name,
    )
    notifyScheduleReady(pendingRun.flowTitle)
    return Result.success()
  }

  private fun createForegroundInfo(flowTitle: String): ForegroundInfo {
    ensureChannel()
    val notification =
      NotificationCompat.Builder(applicationContext, OPERATOR_AUTOMATION_NOTIFICATION_CHANNEL_ID)
        .setSmallIcon(R.drawable.ic_experiment)
        .setContentTitle(applicationContext.getString(R.string.operator_automation_schedule_due_title))
        .setContentText(applicationContext.getString(R.string.operator_automation_schedule_due_body, flowTitle))
        .setOngoing(true)
        .build()
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      ForegroundInfo(
        flowTitle.hashCode(),
        notification,
        ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC,
      )
    } else {
      ForegroundInfo(flowTitle.hashCode(), notification)
    }
  }

  private fun notifyScheduleReady(flowTitle: String) {
    ensureChannel()
    if (
      Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
        ContextCompat.checkSelfPermission(applicationContext, Manifest.permission.POST_NOTIFICATIONS) !=
        android.content.pm.PackageManager.PERMISSION_GRANTED
    ) {
      StructuredLog.w(
        TAG,
        "operator_automation_schedule_notification_skipped",
        "reason" to "post_notifications_denied",
        "schedule_title" to flowTitle,
      )
      return
    }
    val intent =
      Intent(applicationContext, MainActivity::class.java).apply {
        flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
      }
    val pendingIntent =
      PendingIntent.getActivity(
        applicationContext,
        flowTitle.hashCode(),
        intent,
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
      )
    val notification =
      NotificationCompat.Builder(applicationContext, OPERATOR_AUTOMATION_NOTIFICATION_CHANNEL_ID)
        .setSmallIcon(R.drawable.ic_experiment)
        .setContentTitle(applicationContext.getString(R.string.operator_automation_schedule_due_title))
        .setContentText(applicationContext.getString(R.string.operator_automation_schedule_due_body, flowTitle))
        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
        .setAutoCancel(true)
        .setContentIntent(pendingIntent)
        .build()
    NotificationManagerCompat.from(applicationContext).notify(flowTitle.hashCode(), notification)
  }

  private fun ensureChannel() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
      return
    }
    val manager = applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    val existing = manager.getNotificationChannel(OPERATOR_AUTOMATION_NOTIFICATION_CHANNEL_ID)
    if (existing != null) {
      return
    }
    val channel =
      NotificationChannel(
        OPERATOR_AUTOMATION_NOTIFICATION_CHANNEL_ID,
        applicationContext.getString(R.string.operator_automation_notification_channel_name),
        NotificationManager.IMPORTANCE_DEFAULT,
      )
    manager.createNotificationChannel(channel)
  }
}

@Module
@InstallIn(SingletonComponent::class)
internal abstract class OperatorAutomationScheduleCoordinatorModule {
  @Binds
  abstract fun bindOperatorAutomationScheduleCoordinator(
    implementation: WorkManagerOperatorAutomationScheduleCoordinator,
  ): OperatorAutomationScheduleCoordinator
}

package com.google.ai.edge.gallery.ui.home

import com.baohaus.baoedge.core.flow.FlowExecutionState
import java.time.Instant
import java.time.ZoneId
import java.time.ZonedDateTime

/** Result of claiming one due automation schedule for execution. */
internal data class OperatorAutomationScheduleClaim(
  val snapshot: OperatorAutomationWorkspaceSnapshot,
  val pendingScheduledRun: OperatorPendingScheduledRun? = null,
  val claimedScheduleId: String? = null,
)

/** Claim the earliest due active schedule and stage it for execution. */
internal fun claimDueScheduledAutomation(
  snapshot: OperatorAutomationWorkspaceSnapshot,
  nowMs: Long = System.currentTimeMillis(),
): OperatorAutomationScheduleClaim = claimScheduledAutomation(snapshot, scheduleId = null, nowMs = nowMs)

/** Claim one specific due active schedule and stage it for execution. */
internal fun claimScheduledAutomationById(
  snapshot: OperatorAutomationWorkspaceSnapshot,
  scheduleId: String,
  nowMs: Long = System.currentTimeMillis(),
): OperatorAutomationScheduleClaim = claimScheduledAutomation(snapshot, scheduleId = scheduleId, nowMs = nowMs)

/** Compute the next run timestamp for one recurring schedule trigger. */
internal fun advanceAutomationScheduleTrigger(
  trigger: OperatorAutomationTrigger,
  nowMs: Long = System.currentTimeMillis(),
): OperatorAutomationTrigger {
  val zoneId = ZoneId.systemDefault()
  val current = Instant.ofEpochMilli(nowMs).atZone(zoneId)
  val nextRun =
    when (trigger.type) {
      OperatorAutomationTriggerType.ONE_OFF -> current
      OperatorAutomationTriggerType.DAILY -> current.plusDays(1)
      OperatorAutomationTriggerType.WEEKLY -> current.plusWeeks(1)
    }
  return trigger.copy(
    nextRunAtMs = nextRun.toInstant().toEpochMilli(),
    dayOfWeek = if (trigger.type == OperatorAutomationTriggerType.WEEKLY) nextRun.dayOfWeek.value else null,
  )
}

/** Complete a scheduled automation run: clear the pending handoff, record the run, and update schedule status. */
internal fun completeScheduledAutomation(
  snapshot: OperatorAutomationWorkspaceSnapshot,
  scheduleId: String,
  runSummary: OperatorAutomationRunSummary,
  resultState: FlowExecutionState,
  requiresAttention: Boolean,
): OperatorAutomationWorkspaceSnapshot {
  val updatedSchedules = snapshot.schedules.map { schedule ->
    if (schedule.id != scheduleId) {
      schedule
    } else {
      schedule.copy(
        status = if (requiresAttention) {
          OperatorAutomationScheduleStatus.NEEDS_ATTENTION
        } else {
          schedule.status
        },
      )
    }
  }
  return snapshot.copy(
    pendingScheduledRun = null,
    schedules = updatedSchedules,
    runHistory = listOf(runSummary) + snapshot.runHistory,
  )
}

private fun claimScheduledAutomation(
  snapshot: OperatorAutomationWorkspaceSnapshot,
  scheduleId: String?,
  nowMs: Long,
): OperatorAutomationScheduleClaim {
  val existingPending = snapshot.pendingScheduledRun
  if (existingPending != null) {
    return OperatorAutomationScheduleClaim(
      snapshot = snapshot,
      pendingScheduledRun = existingPending,
    )
  }

  val dueSchedule =
    snapshot.schedules
      .asSequence()
      .filter { schedule ->
        schedule.status == OperatorAutomationScheduleStatus.ACTIVE &&
          schedule.trigger.nextRunAtMs > 0L &&
          schedule.trigger.nextRunAtMs <= nowMs &&
          (scheduleId == null || schedule.id == scheduleId)
      }
      .sortedBy(OperatorAutomationScheduleSummary::lastRunAtMs)
      .firstOrNull()
      ?: return OperatorAutomationScheduleClaim(snapshot = snapshot)

  val dueFlow =
    snapshot.savedFlows.firstOrNull { flow -> flow.id == dueSchedule.flowId }
      ?: return OperatorAutomationScheduleClaim(snapshot = snapshot)

  val pendingScheduledRun =
    OperatorPendingScheduledRun(
      scheduleId = dueSchedule.id,
      flowId = dueFlow.id,
      flowTitle = dueFlow.title,
      prompt = dueFlow.goal,
    )
  val updatedSchedules =
    snapshot.schedules.map { schedule ->
      if (schedule.id != dueSchedule.id) {
        schedule
      } else {
        schedule.copy(
          status =
            if (schedule.trigger.type == OperatorAutomationTriggerType.ONE_OFF) {
              OperatorAutomationScheduleStatus.PAUSED
            } else {
              schedule.status
            },
          trigger = advanceAutomationScheduleTrigger(schedule.trigger, nowMs),
          lastRunAtMs = nowMs,
        )
      }
    }
  val updatedSnapshot =
    snapshot.copy(
      schedules = updatedSchedules,
      pendingScheduledRun = pendingScheduledRun,
    )
  return OperatorAutomationScheduleClaim(
    snapshot = updatedSnapshot,
    pendingScheduledRun = pendingScheduledRun,
    claimedScheduleId = dueSchedule.id,
  )
}

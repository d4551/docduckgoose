package com.google.ai.edge.gallery.ui.home

import android.content.Context
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.common.StructuredLog
import com.google.ai.edge.gallery.data.AiWorkflowJobEnvelope
import com.google.ai.edge.gallery.data.AiWorkflowRequest
import com.google.ai.edge.gallery.data.CloudControlPlaneClient
import com.google.ai.edge.gallery.data.CredentialStore
import com.google.ai.edge.gallery.data.OperatorRuntimeUsage
import com.google.ai.edge.gallery.data.OperatorVerificationEvidence
import com.google.ai.edge.gallery.data.OperatorVerificationReplySummary
import com.google.ai.edge.gallery.data.OperatorVerificationReporter
import com.google.ai.edge.gallery.data.OperatorVerificationReports
import com.google.ai.edge.gallery.data.OperatorVerificationRequestSummary
import com.google.ai.edge.gallery.data.OperatorVerificationRuntimeBinding
import com.google.ai.edge.gallery.data.OperatorVerificationRuntimeTransport
import com.google.ai.edge.gallery.data.OperatorVerificationScenario
import com.google.ai.edge.gallery.data.OperatorVerificationTargetIds
import com.google.ai.edge.gallery.data.OperatorVerificationTerminalState
import com.google.ai.edge.gallery.data.OperatorVerificationTriggerSource
import com.google.ai.edge.gallery.data.OperatorVerificationUsage
import com.google.ai.edge.gallery.data.PreferencesStore
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import javax.inject.Singleton
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import kotlinx.coroutines.Dispatchers
import com.baohaus.baoedge.core.flow.FlowExecutionState

private const val TAG = "AGOperatorAutomationExecutor"
private const val AUTOMATION_MAX_POLLS = 120
private const val AUTOMATION_POLL_INTERVAL_MS = 2_000L

/** Terminal snapshot returned after a durable scheduled automation run. */
data class OperatorAutomationExecutionOutcome(
  val state: FlowExecutionState,
  val summary: String,
  val correlationId: String,
  val requiresAttention: Boolean,
)

/** Owner for executing scheduled automations outside the Android UI surface. */
interface OperatorAutomationExecutor {
  /** Execute one claimed scheduled automation and return the terminal outcome. */
  suspend fun execute(
    pendingRun: OperatorPendingScheduledRun,
  ): OperatorAutomationExecutionOutcome
}

@Singleton
internal class DefaultOperatorAutomationExecutor
@Inject
constructor(
  @ApplicationContext private val appContext: Context,
  private val cloudControlPlaneClient: CloudControlPlaneClient,
  private val credentialStore: CredentialStore,
  private val preferencesStore: PreferencesStore,
  private val nativeIntentExecutor: OperatorNativeIntentExecutor,
  private val verificationReporter: OperatorVerificationReporter,
) : OperatorAutomationExecutor {
  override suspend fun execute(
    pendingRun: OperatorPendingScheduledRun,
  ): OperatorAutomationExecutionOutcome =
    withContext(Dispatchers.IO) {
      val correlationId = UUID.randomUUID().toString()
      val startedAt = Instant.now().toString()

      val nativeResult = nativeIntentExecutor.executeIfSupported(prompt = pendingRun.prompt)
      if (nativeResult != null) {
        // Native intent executor writes its own verification report.
        return@withContext OperatorAutomationExecutionOutcome(
          state = nativeResult.state,
          summary = nativeResult.message,
          correlationId = correlationId,
          requiresAttention = nativeResult.state != FlowExecutionState.SUCCESS,
        )
      }

      val preferences = preferencesStore.readOperatorPreferences()
      val baseUrl = preferences.controlPlaneBaseUrl.trim()
      if (baseUrl.isEmpty()) {
        val errorSummary = appContext.getString(R.string.flow_runner_invalid_control_plane_base_url)
        persistVerificationReport(
          correlationId = correlationId,
          pendingRun = pendingRun,
          startedAt = startedAt,
          terminalState = OperatorVerificationTerminalState.ERROR_NON_RETRYABLE,
          summary = errorSummary,
          providerId = null,
          modelId = null,
        )
        return@withContext OperatorAutomationExecutionOutcome(
          state = FlowExecutionState.ERROR_NON_RETRYABLE,
          summary = errorSummary,
          correlationId = correlationId,
          requiresAttention = true,
        )
      }

      val assignment = preferences.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.AUTOMATION)
      val providerId = assignment.provider.trim().ifEmpty { null }
      val modelId = assignment.model.trim().ifEmpty { null }
      val activeProfileId = providerId?.let { preferences.activeProfileIdFor(it).trim().ifEmpty { "default" } }
      val apiKey = if (providerId != null && activeProfileId != null) {
        credentialStore.readProviderApiKey(providerId = providerId, profileId = activeProfileId)?.trim()?.ifEmpty { null }
      } else {
        null
      }
      val providerBaseUrl = if (providerId != null) {
        preferences.activeProfileFor(providerId)?.baseUrl?.trim()?.ifEmpty { null }
      } else {
        preferences.providerBaseUrl.trim().ifEmpty { null }
      }

      StructuredLog.d(
        TAG,
        "operator_automation_schedule_execution_started",
        "scheduleId" to pendingRun.scheduleId,
        "provider" to providerId.orEmpty(),
        "model" to modelId.orEmpty(),
      )

      val envelope = runAgentWorkflow(
        baseUrl = baseUrl,
        prompt = pendingRun.prompt,
        providerId = providerId,
        modelId = modelId,
        apiKey = apiKey,
        providerBaseUrl = providerBaseUrl,
        correlationId = correlationId,
      )
      val summary = resolveWorkflowSummary(envelope)
      val state = resolveWorkflowState(envelope)
      persistVerificationReport(
        correlationId = correlationId,
        pendingRun = pendingRun,
        startedAt = startedAt,
        terminalState = OperatorVerificationTerminalState.fromFlowState(state),
        summary = summary,
        providerId = providerId,
        modelId = modelId,
      )
      OperatorAutomationExecutionOutcome(
        state = state,
        summary = summary,
        correlationId = correlationId,
        requiresAttention = state != FlowExecutionState.SUCCESS,
      )
    }

  private fun persistVerificationReport(
    correlationId: String,
    pendingRun: OperatorPendingScheduledRun,
    startedAt: String,
    terminalState: OperatorVerificationTerminalState,
    summary: String,
    providerId: String?,
    modelId: String?,
  ) {
    try {
      val report = OperatorVerificationReports.create(
        correlationId = correlationId,
        scenario = OperatorVerificationScenario.AUTOMATION_SCHEDULE,
        runtime = OperatorVerificationRuntimeBinding(
          usage = OperatorVerificationUsage.AUTOMATION.wireValue,
          transport = OperatorVerificationRuntimeTransport.CLOUD.wireValue,
          provider = providerId,
          model = modelId,
        ),
        triggerSource = OperatorVerificationTriggerSource.BACKGROUND_SCHEDULE,
        request = OperatorVerificationRequestSummary(prompt = pendingRun.prompt),
        terminalState = terminalState,
        reply = OperatorVerificationReplySummary(
          message = summary,
          state = terminalState.wireValue,
          provenance = "cloud",
        ),
        targetIds = OperatorVerificationTargetIds(scheduleId = pendingRun.scheduleId),
        startedAt = startedAt,
      )
      verificationReporter.persist(report)
    } catch (e: Exception) {
      StructuredLog.w(TAG, "operator_automation_verification_report_failed", "error" to e.message.orEmpty())
    }
  }

  private suspend fun runAgentWorkflow(
    baseUrl: String,
    prompt: String,
    providerId: String?,
    modelId: String?,
    apiKey: String?,
    providerBaseUrl: String?,
    correlationId: String,
  ): AiWorkflowJobEnvelope {
    var envelope =
      cloudControlPlaneClient.startAiWorkflowJob(
        baseUrl = baseUrl,
        request =
          AiWorkflowRequest(
            mode = "agent",
            provider = providerId,
            model = modelId,
            message = prompt,
            apiKey = apiKey,
            baseUrl = providerBaseUrl,
            correlationId = correlationId,
          ),
      )
    var pollCount = 0
    while (!isAiWorkflowJobTerminal(envelope) && pollCount < AUTOMATION_MAX_POLLS) {
      delay(AUTOMATION_POLL_INTERVAL_MS)
      envelope = cloudControlPlaneClient.getAiWorkflowJobEnvelope(baseUrl, envelope.jobId)
      pollCount += 1
    }
    return envelope
  }

  private fun isAiWorkflowJobTerminal(envelope: AiWorkflowJobEnvelope): Boolean {
    val status = envelope.data?.status ?: return true
    return status == "succeeded" || status == "failed" || status == "cancelled"
  }

  private fun resolveWorkflowState(envelope: AiWorkflowJobEnvelope): FlowExecutionState {
    return when (envelope.state) {
      "success" -> FlowExecutionState.SUCCESS
      "error-retryable" -> FlowExecutionState.ERROR_RETRYABLE
      "error-non-retryable" -> FlowExecutionState.ERROR_NON_RETRYABLE
      "unauthorized" -> FlowExecutionState.UNAUTHORIZED
      else ->
        if (envelope.data?.status == "succeeded") {
          FlowExecutionState.SUCCESS
        } else {
          FlowExecutionState.ERROR_NON_RETRYABLE
        }
    }
  }

  private fun resolveWorkflowSummary(envelope: AiWorkflowJobEnvelope): String {
    return envelope.data?.result?.reply?.trim().orEmpty().ifEmpty {
      envelope.data?.reason?.trim().orEmpty().ifEmpty {
        envelope.error?.reason.orEmpty().ifEmpty {
          envelope.mismatches.joinToString(separator = " ").ifEmpty {
            appContext.getString(R.string.operator_phone_execution_unavailable)
          }
        }
      }
    }
  }
}

@Module
@InstallIn(SingletonComponent::class)
internal abstract class OperatorAutomationExecutorModule {
  @Binds
  abstract fun bindOperatorAutomationExecutor(
    implementation: DefaultOperatorAutomationExecutor,
  ): OperatorAutomationExecutor
}

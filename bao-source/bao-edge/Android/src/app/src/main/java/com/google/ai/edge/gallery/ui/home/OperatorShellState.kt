package com.google.ai.edge.gallery.ui.home

import com.google.ai.edge.gallery.customtasks.mobileactions.OperatorApprovalRequest
import com.google.ai.edge.gallery.data.BuiltInTaskId
import com.google.ai.edge.gallery.data.CloudOperatorConversationArtifact
import com.google.ai.edge.gallery.data.CloudOperatorConversationIndex
import com.google.ai.edge.gallery.data.CloudOperatorConversationOrchestration
import com.google.ai.edge.gallery.data.CloudOperatorConversationSummary
import com.google.ai.edge.gallery.data.CloudOperatorRuntimeBinding
import com.google.ai.edge.gallery.data.OperatorRuntimeUsage
import com.baohaus.baoedge.core.flow.FlowExecutionState
import java.time.Instant

/** Primary destinations rendered inside the converged operator shell. */
enum class OperatorShellDestination {
  CHAT,
  AUTOMATIONS,
  MODELS,
  SETTINGS,
}

/** Composer modes that replace the legacy split chat/image/audio entrypoints. */
enum class OperatorComposerMode(val routeSegment: String) {
  CHAT("chat"),
  IMAGE("image"),
  AUDIO("audio"),
  AUTOMATION("automation");

  companion object {
    /** Resolve a composer mode from a navigation route segment. */
    fun fromRouteSegment(routeSegment: String?): OperatorComposerMode =
      entries.firstOrNull { it.routeSegment == routeSegment?.trim()?.lowercase() } ?: CHAT
  }
}

/** Sections that organize the dedicated automations workspace. */
enum class OperatorAutomationSection {
  DRAFTS,
  RUNS,
  SCHEDULES,
  APPROVALS,
}

/** Supported schedule cadences for saved operator flows. */
enum class OperatorAutomationTriggerType {
  ONE_OFF,
  DAILY,
  WEEKLY,
}

/** Status values shown for saved schedules. */
enum class OperatorAutomationScheduleStatus {
  ACTIVE,
  PAUSED,
  FAILED,
  NEEDS_ATTENTION,
}

/** Saved reusable automation flow surfaced in the Automations workspace. */
data class OperatorAutomationFlowSummary(
  val id: String,
  val title: String,
  val goal: String,
  val updatedAtMs: Long = System.currentTimeMillis(),
)

/** Trigger contract for one recurring or one-time automation schedule. */
data class OperatorAutomationTrigger(
  val type: OperatorAutomationTriggerType = OperatorAutomationTriggerType.ONE_OFF,
  val nextRunAtMs: Long = 0L,
  val dayOfWeek: Int? = null,
)

/** Saved schedule attached to one reusable automation flow. */
data class OperatorAutomationScheduleSummary(
  val id: String,
  val flowId: String,
  val flowTitle: String,
  val status: OperatorAutomationScheduleStatus = OperatorAutomationScheduleStatus.ACTIVE,
  val trigger: OperatorAutomationTrigger = OperatorAutomationTrigger(),
  val lastRunAtMs: Long = 0L,
)

/** Execution phase tracked for crash recovery of durable scheduled runs. */
enum class OperatorAutomationExecutionPhase {
  /** Claimed but not yet dispatched to the executor. */
  CLAIMED,
  /** Currently running inside the executor. */
  RUNNING,
}

/** Pending due schedule handoff consumed by the Android shell UI runner. */
data class OperatorPendingScheduledRun(
  val scheduleId: String,
  val flowId: String,
  val flowTitle: String,
  val prompt: String,
  val phase: OperatorAutomationExecutionPhase = OperatorAutomationExecutionPhase.CLAIMED,
  val correlationId: String = "",
  val claimedAtMs: Long = System.currentTimeMillis(),
)

/** Summary row for one automation execution or queued run. */
data class OperatorAutomationRunSummary(
  val id: String,
  val flowId: String = "",
  val title: String,
  val summary: String,
  val state: FlowExecutionState,
  val updatedAtMs: Long = System.currentTimeMillis(),
)

/** Canonical runtime context rendered by the operator shell. */
data class OperatorRuntimeContext(
  val source: String = "",
  val provider: String = "",
  val model: String = "",
  val voiceInput: Boolean = true,
  val voiceOutput: Boolean = true,
  val automation: Boolean = true,
)

/** Summary row rendered inside the Android operator thread history picker. */
data class OperatorConversationThreadSummary(
  val id: String,
  val title: String,
  val runtimeLabel: String = "",
  val updatedAtMs: Long = 0L,
)

/** Shared runtime picker target used by chat and AI settings. */
enum class OperatorRuntimePickerTarget(val usage: OperatorRuntimeUsage) {
  DEFAULT(OperatorRuntimeUsage.CHAT),
  CHAT(OperatorRuntimeUsage.CHAT),
  AUTOMATION(OperatorRuntimeUsage.AUTOMATION),
  IMAGE(OperatorRuntimeUsage.IMAGE),
  FLOW_GENERATION(OperatorRuntimeUsage.FLOW_GENERATION),
  SPEECH_INPUT(OperatorRuntimeUsage.SPEECH_INPUT),
  SPEECH_OUTPUT(OperatorRuntimeUsage.SPEECH_OUTPUT),
}

/** Shared runtime picker state used by every user-facing runtime edit flow. */
data class OperatorRuntimePickerUiState(
  val visible: Boolean = false,
  val target: OperatorRuntimePickerTarget = OperatorRuntimePickerTarget.DEFAULT,
)

/** Readiness steps rendered by the operator shell setup strip. */
enum class OperatorSetupStep {
  CONNECT_PROVIDER,
  CHOOSE_MODEL,
  READY,
}

/** Typed readiness state for the 3-step operator setup funnel. */
data class OperatorSetupProgress(
  val providerConnected: Boolean = false,
  val modelSelected: Boolean = false,
  val deviceReady: Boolean = false,
) {
  val isReady: Boolean
    get() = providerConnected && modelSelected && deviceReady

  fun stateFor(step: OperatorSetupStep): FlowExecutionState =
    when (step) {
      OperatorSetupStep.CONNECT_PROVIDER ->
        if (providerConnected) FlowExecutionState.SUCCESS else FlowExecutionState.IDLE
      OperatorSetupStep.CHOOSE_MODEL ->
        if (modelSelected) FlowExecutionState.SUCCESS
        else if (providerConnected) FlowExecutionState.LOADING
        else FlowExecutionState.IDLE
      OperatorSetupStep.READY ->
        if (deviceReady) FlowExecutionState.SUCCESS
        else if (providerConnected && modelSelected) FlowExecutionState.LOADING
        else FlowExecutionState.IDLE
    }
}

/** Role used by the conversation-first operator timeline. */
enum class OperatorTimelineRole {
  USER,
  ASSISTANT,
  SYSTEM,
  RUN,
}

/** Visual treatment applied to one timeline event row. */
enum class OperatorTimelineTone {
  ACCENT,
  INFO,
  SUCCESS,
  WARNING,
  ERROR,
}

/** Artifact kinds rendered in the unified shell timeline. */
enum class OperatorTimelineArtifactKind {
  TEXT,
  IMAGE,
  AUDIO,
  FILE,
}

/** Timeline entry for operator chat, runtime actions, and background execution updates. */
data class OperatorTimelineEntry(
  val id: String,
  val role: OperatorTimelineRole,
  val title: String,
  val body: String,
  val state: FlowExecutionState = FlowExecutionState.SUCCESS,
  val timestampMs: Long = System.currentTimeMillis(),
  val tone: OperatorTimelineTone = OperatorTimelineTone.INFO,
  val meta: String = "",
  val artifactKind: OperatorTimelineArtifactKind? = null,
  val approvalPending: Boolean = false,
)

/** Shell navigation target used when redirecting deprecated routes into the operator shell. */
data class OperatorShellEntryRequest(
  val destination: OperatorShellDestination = OperatorShellDestination.CHAT,
  val composerMode: OperatorComposerMode = OperatorComposerMode.CHAT,
  val prompt: String = "",
  val autoSend: Boolean = false,
)

/** Starter action shown in chat and automation empty states. */
data class OperatorStarterAction(
  val id: String,
  val title: String,
  val prompt: String,
  val composerMode: OperatorComposerMode = OperatorComposerMode.CHAT,
)

/** Shell-owned automation workspace state. */
data class OperatorAutomationWorkspaceUiState(
  val prompt: String = "",
  val state: FlowExecutionState = FlowExecutionState.IDLE,
  val statusMessage: String = "",
  val isRunning: Boolean = false,
  val templates: List<OperatorStarterAction> = emptyList(),
  val activeSection: OperatorAutomationSection = OperatorAutomationSection.DRAFTS,
  val selectedFlowId: String = "",
  val savedFlows: List<OperatorAutomationFlowSummary> = emptyList(),
  val schedules: List<OperatorAutomationScheduleSummary> = emptyList(),
  val runHistory: List<OperatorAutomationRunSummary> = emptyList(),
)

/** Shell-only UI state rendered by the operator-first Android experience. */
data class OperatorShellUiState(
  val destination: OperatorShellDestination = OperatorShellDestination.CHAT,
  val composerMode: OperatorComposerMode = OperatorComposerMode.CHAT,
  val pickedImages: List<android.graphics.Bitmap> = emptyList(),
  val runtimeContext: OperatorRuntimeContext = OperatorRuntimeContext(),
  val runtimePicker: OperatorRuntimePickerUiState = OperatorRuntimePickerUiState(),
  val setupProgress: OperatorSetupProgress = OperatorSetupProgress(),
  val automationPrompt: String = "",
  val automationWorkspace: OperatorAutomationWorkspaceUiState = OperatorAutomationWorkspaceUiState(),
  val conversationId: String = "",
  val conversationThreads: List<OperatorConversationThreadSummary> = listOf(),
  val isLoadingConversationThreads: Boolean = false,
  val messageDraft: String = "",
  val pendingLaunchAutoSend: Boolean = false,
  val requestTts: Boolean = false,
  val chatState: FlowExecutionState = FlowExecutionState.IDLE,
  val chatStateMessage: String = "",
  val isSending: Boolean = false,
  val timeline: List<OperatorTimelineEntry> = listOf(),
  val pendingApproval: OperatorApprovalRequest? = null,
  val pendingScheduledRun: OperatorPendingScheduledRun? = null,
  val phoneAutomationState: FlowExecutionState = FlowExecutionState.IDLE,
  val phoneAutomationMessage: String = "",
  val isRunningPhoneAutomation: Boolean = false,
)

/** Resolve the initial shell composer mode for a deprecated task route. */
fun legacyTaskIdToOperatorComposerMode(taskId: String): OperatorComposerMode? =
  when (taskId.trim()) {
    BuiltInTaskId.LLM_CHAT -> OperatorComposerMode.CHAT
    BuiltInTaskId.LLM_ASK_IMAGE -> OperatorComposerMode.IMAGE
    BuiltInTaskId.LLM_ASK_AUDIO -> OperatorComposerMode.AUDIO
    else -> null
  }

/** Resolve the initial shell destination and composer mode for a deprecated task route. */
fun legacyTaskIdToOperatorEntryRequest(taskId: String): OperatorShellEntryRequest? =
  legacyTaskIdToOperatorComposerMode(taskId)?.let { composerMode ->
    OperatorShellEntryRequest(
      destination =
        if (composerMode == OperatorComposerMode.AUTOMATION) {
          OperatorShellDestination.AUTOMATIONS
        } else {
          OperatorShellDestination.CHAT
        },
      composerMode = composerMode,
    )
  }

/** Convert a server runtime binding into the shell's canonical runtime context. */
fun CloudOperatorRuntimeBinding.toRuntimeContext(): OperatorRuntimeContext =
  OperatorRuntimeContext(
    source = source,
    provider = provider,
    model = model,
    voiceInput = voiceInput != false,
    voiceOutput = voiceOutput != false,
    automation = automation != false,
  )

/** Project a cloud conversation index into stable shell thread summaries. */
fun buildOperatorConversationThreadSummaries(
  index: CloudOperatorConversationIndex,
  untitledConversationLabel: String,
): List<OperatorConversationThreadSummary> =
  index.conversations
    .map { summary ->
      buildOperatorConversationThreadSummary(
        summary = summary,
        untitledConversationLabel = untitledConversationLabel,
      )
    }
    .sortedByDescending(OperatorConversationThreadSummary::updatedAtMs)

/** Build one shell thread summary from a server conversation summary. */
fun buildOperatorConversationThreadSummary(
  summary: CloudOperatorConversationSummary,
  untitledConversationLabel: String,
): OperatorConversationThreadSummary {
  val runtime = summary.activeRuntime
  val runtimeLabel =
    listOfNotNull(
      runtime?.provider?.trim()?.takeIf(String::isNotBlank),
      runtime?.model?.trim()?.takeIf(String::isNotBlank),
    ).joinToString(separator = " • ")
  return OperatorConversationThreadSummary(
    id = summary.id,
    title = summary.title?.trim().orEmpty().ifBlank { untitledConversationLabel },
    runtimeLabel = runtimeLabel,
    updatedAtMs = summary.updatedAt?.let(::parseOperatorTimestampMs) ?: 0L,
  )
}

/** Build a conversation-first shell timeline from orchestration read models. */
fun buildOperatorTimeline(
  orchestration: CloudOperatorConversationOrchestration,
  untitledConversationLabel: String,
  userTitle: String,
  assistantTitle: String,
  runtimeTitle: String,
  approvalTitle: String,
): List<OperatorTimelineEntry> {
  val messageEntries =
    orchestration.messages.safeOperatorEntries().map { message ->
      val (role, title, tone) =
        when (message.role.trim().lowercase()) {
          "user" -> Triple(OperatorTimelineRole.USER, userTitle, OperatorTimelineTone.ACCENT)
          "assistant" -> Triple(OperatorTimelineRole.ASSISTANT, assistantTitle, OperatorTimelineTone.INFO)
          else -> Triple(OperatorTimelineRole.SYSTEM, runtimeTitle, OperatorTimelineTone.INFO)
        }
      OperatorTimelineEntry(
        id = message.id,
        role = role,
        title = title,
        body = message.content,
        timestampMs = message.timestamp?.let(::parseOperatorTimestampMs) ?: 0L,
        tone = tone,
      )
    }
  val executionEntries =
    orchestration.executionEvents.safeOperatorEntries().map { event ->
      val eventState = mapConversationExecutionState(event.state)
      OperatorTimelineEntry(
        id = event.id,
        role = OperatorTimelineRole.RUN,
        title = runtimeTitle,
        body = event.summary.orEmpty().ifBlank { untitledConversationLabel },
        state = eventState,
        timestampMs = event.timestamp?.let(::parseOperatorTimestampMs) ?: 0L,
        tone =
          when (eventState) {
            FlowExecutionState.SUCCESS -> OperatorTimelineTone.SUCCESS
            FlowExecutionState.ERROR_NON_RETRYABLE,
            FlowExecutionState.ERROR_RETRYABLE,
            FlowExecutionState.UNAUTHORIZED -> OperatorTimelineTone.ERROR
            FlowExecutionState.LOADING -> OperatorTimelineTone.WARNING
            FlowExecutionState.EMPTY,
            FlowExecutionState.IDLE -> OperatorTimelineTone.INFO
          },
      )
    }
  val approvalEntries =
    orchestration.approvalRequests.safeOperatorEntries().map { request ->
      OperatorTimelineEntry(
        id = request.id,
        role = OperatorTimelineRole.SYSTEM,
        title = approvalTitle,
        body = request.summary.orEmpty().ifBlank { approvalTitle },
        state = FlowExecutionState.LOADING,
        timestampMs = request.requestedAt?.let(::parseOperatorTimestampMs) ?: 0L,
        tone = OperatorTimelineTone.WARNING,
        approvalPending = true,
      )
    }
  val artifactEntries =
    orchestration.artifacts.safeOperatorEntries().map { artifact ->
      artifact.toTimelineEntry(runtimeTitle = runtimeTitle)
    }
  return (messageEntries + executionEntries + approvalEntries + artifactEntries)
    .sortedBy(OperatorTimelineEntry::timestampMs)
}

private fun <T> Iterable<T>?.safeOperatorEntries(): List<T> = this?.toList().orEmpty()

/** Map server execution state strings into the Android runtime state machine. */
fun mapConversationExecutionState(rawState: String): FlowExecutionState =
  when (rawState.trim().lowercase()) {
    "planning", "queued", "running" -> FlowExecutionState.LOADING
    "needs_input", "paused" -> FlowExecutionState.IDLE
    "completed", "succeeded", "success" -> FlowExecutionState.SUCCESS
    "empty" -> FlowExecutionState.EMPTY
    "unauthorized" -> FlowExecutionState.UNAUTHORIZED
    "error-retryable" -> FlowExecutionState.ERROR_RETRYABLE
    "failed", "error", "error-non-retryable", "cancelled" -> FlowExecutionState.ERROR_NON_RETRYABLE
    else -> FlowExecutionState.IDLE
  }

private fun CloudOperatorConversationArtifact.toTimelineEntry(
  runtimeTitle: String,
): OperatorTimelineEntry =
  OperatorTimelineEntry(
    id = id,
    role = OperatorTimelineRole.RUN,
    title = runtimeTitle,
    body = summary.orEmpty().ifBlank { mimeType },
    state = FlowExecutionState.SUCCESS,
    tone = OperatorTimelineTone.SUCCESS,
    meta = mimeType,
    artifactKind =
      when {
        mimeType.startsWith("image/") -> OperatorTimelineArtifactKind.IMAGE
        mimeType.startsWith("audio/") -> OperatorTimelineArtifactKind.AUDIO
        mimeType.startsWith("text/") -> OperatorTimelineArtifactKind.TEXT
        else -> OperatorTimelineArtifactKind.FILE
      },
  )

private fun parseOperatorTimestampMs(rawTimestamp: String): Long =
  runCatching { Instant.parse(rawTimestamp).toEpochMilli() }.getOrDefault(0L)

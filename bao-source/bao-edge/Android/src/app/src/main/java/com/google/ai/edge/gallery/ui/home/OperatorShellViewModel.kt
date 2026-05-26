package com.google.ai.edge.gallery.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.ai.edge.gallery.common.StructuredLog
import com.google.ai.edge.gallery.customtasks.mobileactions.OperatorAutomationResult
import com.google.ai.edge.gallery.data.AiWorkflowJobEnvelope
import com.google.ai.edge.gallery.data.AiWorkflowRequest
import com.google.ai.edge.gallery.data.CloudControlPlaneClient
import com.google.ai.edge.gallery.data.CloudOperatorRuntimeBinding
import com.google.ai.edge.gallery.data.CredentialStore
import com.google.ai.edge.gallery.data.PreferencesStore
import com.baohaus.baoedge.core.flow.FlowExecutionState
import dagger.hilt.android.lifecycle.HiltViewModel
import java.util.UUID
import javax.inject.Inject
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

private const val TAG = "AGOperatorShellViewModel"
private const val OPERATOR_CHAT_POLL_INTERVAL_MS = 2_000L
private const val OPERATOR_CHAT_MAX_POLLS = 120
private const val OPERATOR_TIMELINE_LIMIT = 60

/** Stateful owner for the converged Android operator shell. */
@HiltViewModel
class OperatorShellViewModel
@Inject
constructor(
  private val cloudControlPlaneClient: CloudControlPlaneClient,
  private val credentialStore: CredentialStore,
  private val preferencesStore: PreferencesStore,
  private val automationWorkspaceStore: OperatorAutomationWorkspaceStateStore,
  private val automationScheduleCoordinator: OperatorAutomationScheduleCoordinator,
  private val nativeIntentExecutor: OperatorNativeIntentExecutor,
  private val strings: OperatorShellStrings,
) : ViewModel() {
  private val _uiState = MutableStateFlow(OperatorShellUiState())
  val uiState: StateFlow<OperatorShellUiState> = _uiState.asStateFlow()

  private var conversationHistoryInitialized = false

  init {
    seedAutomationWorkspace()
  }

  /** Applies an external navigation request to the shell. */
  fun applyEntryRequest(request: OperatorShellEntryRequest) {
    _uiState.update { current ->
      current.copy(
        destination = request.destination,
        composerMode = request.composerMode,
        messageDraft = request.prompt.trim().ifBlank { current.messageDraft },
        pendingLaunchAutoSend = request.autoSend && request.prompt.isNotBlank(),
      )
    }
  }

  /** Marks the current launch-driven auto-send request as consumed. */
  fun markLaunchAutoSendConsumed() {
    _uiState.update { it.copy(pendingLaunchAutoSend = false) }
  }

  /** Selects the active section in the automations workspace. */
  fun selectAutomationSection(section: OperatorAutomationSection) {
    _uiState.update {
      it.copy(
        destination = OperatorShellDestination.AUTOMATIONS,
        automationWorkspace = it.automationWorkspace.copy(activeSection = section),
      )
    }
  }

  /** Synchronizes persisted runtime selections from settings/model surfaces into the shell. */
  fun syncRuntimeContext(
    controlPlaneBaseUrl: String,
    runtimeContext: OperatorRuntimeContext,
    requestTts: Boolean,
  ) {
    val previousState = _uiState.value
    _uiState.update { current ->
      current.copy(
        runtimeContext = runtimeContext,
        requestTts = requestTts,
        setupProgress =
          current.setupProgress.copy(
            providerConnected = runtimeContext.provider.isNotBlank(),
            modelSelected = runtimeContext.model.isNotBlank(),
          ),
      )
    }
    val previousRuntime = previousState.runtimeContext
    if (
      previousState.conversationId.isNotBlank() &&
        (
          previousRuntime.provider != runtimeContext.provider ||
            previousRuntime.model != runtimeContext.model ||
            previousRuntime.source != runtimeContext.source ||
            previousRuntime.voiceInput != runtimeContext.voiceInput ||
            previousRuntime.voiceOutput != runtimeContext.voiceOutput ||
            previousRuntime.automation != runtimeContext.automation
        )
    ) {
      viewModelScope.launch(Dispatchers.IO) {
        persistActiveConversationRuntimeBinding(baseUrl = controlPlaneBaseUrl)
      }
    }
  }

  /** Loads persisted conversation history once per shell session. */
  fun ensureConversationHistoryLoaded(baseUrl: String) {
    if (conversationHistoryInitialized) {
      return
    }
    conversationHistoryInitialized = true
    refreshConversationHistory(baseUrl)
  }

  /** Reloads the operator thread index from the control-plane. */
  fun refreshConversationHistory(baseUrl: String) {
    if (baseUrl.isBlank()) {
      _uiState.update {
        it.copy(
          conversationThreads = emptyList(),
          isLoadingConversationThreads = false,
        )
      }
      return
    }

    viewModelScope.launch(Dispatchers.IO) {
      _uiState.update { it.copy(isLoadingConversationThreads = true) }
      runCatching {
        cloudControlPlaneClient.fetchOperatorConversations(baseUrl = baseUrl)
      }.onSuccess { index ->
        _uiState.update {
          it.copy(
            conversationThreads =
              buildOperatorConversationThreadSummaries(
                index = index,
                untitledConversationLabel = strings.threadUntitled(),
              ),
            isLoadingConversationThreads = false,
          )
        }
      }.onFailure { error ->
        StructuredLog.w(
          TAG,
          "operator_conversation_history_load_failed",
          "reason" to error.message.orEmpty(),
        )
        _uiState.update { it.copy(isLoadingConversationThreads = false) }
      }
    }
  }

  /** Switches the visible shell destination. */
  fun selectDestination(destination: OperatorShellDestination) {
    _uiState.update { it.copy(destination = destination) }
  }

  /** Updates the setup strip with the latest provider/model/device readiness. */
  fun updateSetupProgress(
    providerConnected: Boolean,
    modelSelected: Boolean,
    deviceReady: Boolean,
  ) {
    _uiState.update {
      it.copy(
        setupProgress =
          OperatorSetupProgress(
            providerConnected = providerConnected,
            modelSelected = modelSelected,
            deviceReady = deviceReady,
          ),
      )
    }
  }

  /** Opens the shared runtime picker for the requested destination or capability. */
  fun openRuntimePicker(target: OperatorRuntimePickerTarget) {
    _uiState.update {
      it.copy(runtimePicker = OperatorRuntimePickerUiState(visible = true, target = target))
    }
  }

  /** Dismisses the shared runtime picker. */
  fun closeRuntimePicker() {
    _uiState.update {
      it.copy(runtimePicker = it.runtimePicker.copy(visible = false))
    }
  }

  /** Switches the active multimodal composer mode. */
  fun setComposerMode(composerMode: OperatorComposerMode) {
    _uiState.update { current -> current.copy(composerMode = composerMode) }
  }

  /** Updates the message draft shown by the converged shell composer. */
  fun setMessageDraft(message: String) {
    _uiState.update { it.copy(messageDraft = message) }
  }

  /** Return whether the current prompt can execute entirely through the native device path. */
  fun supportsNativeIntent(prompt: String): Boolean = nativeIntentExecutor.supports(prompt.trim())

  /** Updates the picked images for IMAGE mode vision input. */
  fun setPickedImages(images: List<android.graphics.Bitmap>) {
    _uiState.update { it.copy(pickedImages = images) }
  }

  /** Appends picked images from the image picker. */
  fun appendPickedImages(images: List<android.graphics.Bitmap>) {
    if (images.isEmpty()) return
    _uiState.update { it.copy(pickedImages = it.pickedImages + images) }
  }

  /** Clears picked images. */
  fun clearPickedImages() {
    _uiState.update { it.copy(pickedImages = emptyList()) }
  }

  /** Updates the local automation draft. */
  fun setAutomationPrompt(prompt: String) {
    _uiState.update {
      it.copy(
        automationPrompt = prompt,
        automationWorkspace =
          it.automationWorkspace.copy(
            prompt = prompt,
          ),
      )
    }
  }

  /** Opens the automations workspace with the current chat draft staged as a reusable flow. */
  fun handoffChatDraftToAutomations() {
    val draft = _uiState.value.messageDraft.trim()
    if (draft.isBlank()) {
      return
    }
    handoffWithPrompt(draft)
  }

  /** Opens the automations workspace with the given prompt staged as a reusable flow. */
  fun handoffWithPrompt(prompt: String) {
    val draft = prompt.trim()
    if (draft.isBlank()) {
      return
    }
    _uiState.update {
      it.copy(
        destination = OperatorShellDestination.AUTOMATIONS,
        messageDraft = "",
        automationPrompt = draft,
        automationWorkspace =
          it.automationWorkspace.copy(
            prompt = draft,
            activeSection = OperatorAutomationSection.DRAFTS,
          ),
      )
    }
  }

  /** Saves the current automation prompt as a reusable flow draft. */
  fun saveAutomationFlow(goal: String? = null) {
    val normalizedGoal = goal?.trim().orEmpty().ifBlank {
      _uiState.value.automationWorkspace.prompt.trim().ifBlank {
        _uiState.value.messageDraft.trim()
      }
    }
    if (normalizedGoal.isBlank()) {
      return
    }
    val now = System.currentTimeMillis()
    val flow =
      OperatorAutomationFlowSummary(
        id = "flow-${now}-${normalizedGoal.hashCode()}",
        title = normalizedGoal.lineSequence().firstOrNull()?.take(40).orEmpty().ifBlank { strings.flowDefaultTitle() },
        goal = normalizedGoal,
        updatedAtMs = now,
      )
    _uiState.update { current ->
      current.copy(
        destination = OperatorShellDestination.AUTOMATIONS,
        messageDraft = "",
        automationPrompt = normalizedGoal,
        automationWorkspace =
          current.automationWorkspace.copy(
            prompt = normalizedGoal,
            activeSection = OperatorAutomationSection.DRAFTS,
            selectedFlowId = flow.id,
            savedFlows = listOf(flow) + current.automationWorkspace.savedFlows.filterNot { it.id == flow.id },
          ),
      )
    }
    persistAutomationWorkspace()
  }

  /** Loads one saved flow into the planner and focuses the requested section. */
  fun openAutomationFlow(flowId: String, section: OperatorAutomationSection = OperatorAutomationSection.DRAFTS) {
    _uiState.update { current ->
      val flow = current.automationWorkspace.savedFlows.firstOrNull { it.id == flowId } ?: return@update current
      current.copy(
        destination = OperatorShellDestination.AUTOMATIONS,
        automationPrompt = flow.goal,
        automationWorkspace =
          current.automationWorkspace.copy(
            activeSection = section,
            selectedFlowId = flow.id,
            prompt = flow.goal,
          ),
      )
    }
  }

  /** Creates a saved daily or weekly schedule for the selected automation flow. */
  fun createScheduleForSelectedFlow(type: OperatorAutomationTriggerType) {
    val state = _uiState.value
    val selectedFlow =
      state.automationWorkspace.savedFlows.firstOrNull { it.id == state.automationWorkspace.selectedFlowId }
        ?: state.automationWorkspace.savedFlows.firstOrNull()
        ?: return
    val now = java.time.ZonedDateTime.now()
    val nextRun =
      when (type) {
        OperatorAutomationTriggerType.ONE_OFF -> now.plusHours(1)
        OperatorAutomationTriggerType.DAILY -> now.plusDays(1)
        OperatorAutomationTriggerType.WEEKLY -> now.plusWeeks(1)
      }
    val schedule =
      OperatorAutomationScheduleSummary(
        id = "schedule-${System.currentTimeMillis()}-${selectedFlow.id}",
        flowId = selectedFlow.id,
        flowTitle = selectedFlow.title,
        status = OperatorAutomationScheduleStatus.ACTIVE,
        trigger =
          OperatorAutomationTrigger(
            type = type,
            nextRunAtMs = nextRun.toInstant().toEpochMilli(),
            dayOfWeek = if (type == OperatorAutomationTriggerType.WEEKLY) nextRun.dayOfWeek.value else null,
          ),
      )
    _uiState.update { current ->
      current.copy(
        destination = OperatorShellDestination.AUTOMATIONS,
        automationWorkspace =
          current.automationWorkspace.copy(
            activeSection = OperatorAutomationSection.SCHEDULES,
            selectedFlowId = selectedFlow.id,
            schedules = listOf(schedule) + current.automationWorkspace.schedules,
          ),
      )
    }
    persistAutomationWorkspace()
  }

  /** Pauses or resumes a saved schedule. */
  fun toggleScheduleStatus(scheduleId: String) {
    _uiState.update { current ->
      current.copy(
        automationWorkspace =
          current.automationWorkspace.copy(
            schedules =
              current.automationWorkspace.schedules.map { schedule ->
                if (schedule.id != scheduleId) {
                  schedule
                } else {
                  schedule.copy(
                    status =
                      if (schedule.status == OperatorAutomationScheduleStatus.ACTIVE) {
                        OperatorAutomationScheduleStatus.PAUSED
                      } else {
                        OperatorAutomationScheduleStatus.ACTIVE
                      },
                  )
                }
              },
          ),
      )
    }
    persistAutomationWorkspace()
  }

  /** Marks one due scheduled automation run as claimed by the UI executor. */
  fun beginScheduledRun(scheduleId: String, prompt: String) {
    appendTimelineEntry(
      role = OperatorTimelineRole.USER,
      title = strings.userTitle(),
      body = prompt,
      state = FlowExecutionState.SUCCESS,
    )
    _uiState.update { current ->
      current.copy(
        destination = OperatorShellDestination.AUTOMATIONS,
        pendingScheduledRun = null,
        pendingApproval = null,
        isRunningPhoneAutomation = true,
        phoneAutomationState = FlowExecutionState.LOADING,
        phoneAutomationMessage = strings.sending(),
        automationPrompt = prompt,
        automationWorkspace =
          current.automationWorkspace.copy(
            prompt = prompt,
            activeSection = OperatorAutomationSection.RUNS,
            state = FlowExecutionState.LOADING,
            statusMessage = strings.sending(),
            isRunning = true,
          ),
      )
    }
    persistAutomationWorkspace()
  }

  /** Clears a completed schedule handoff and updates its execution status. */
  fun finishScheduledRun(
    scheduleId: String,
    resultState: FlowExecutionState,
    requiresAttention: Boolean,
  ) {
    _uiState.update { current ->
      current.copy(
        pendingScheduledRun = null,
        automationWorkspace =
          current.automationWorkspace.copy(
            schedules =
              current.automationWorkspace.schedules.map { schedule ->
                if (schedule.id != scheduleId) {
                  schedule
                } else {
                  schedule.copy(
                    status =
                      when {
                        requiresAttention -> OperatorAutomationScheduleStatus.NEEDS_ATTENTION
                        schedule.trigger.type == OperatorAutomationTriggerType.ONE_OFF -> OperatorAutomationScheduleStatus.PAUSED
                        resultState == FlowExecutionState.SUCCESS -> OperatorAutomationScheduleStatus.ACTIVE
                        else -> OperatorAutomationScheduleStatus.FAILED
                      },
                  )
                }
              },
          ),
      )
    }
    persistAutomationWorkspace()
  }

  /** Marks a due schedule as needing operator attention before any automation can run. */
  fun failScheduledRun(scheduleId: String, message: String) {
    appendTimelineEntry(
      role = OperatorTimelineRole.RUN,
      title = strings.runtimeTitle(),
      body = message,
      state = FlowExecutionState.ERROR_NON_RETRYABLE,
    )
    _uiState.update { current ->
      current.copy(
        pendingScheduledRun = null,
        phoneAutomationState = FlowExecutionState.ERROR_NON_RETRYABLE,
        phoneAutomationMessage = message,
        isRunningPhoneAutomation = false,
        automationWorkspace =
          current.automationWorkspace.copy(
            state = FlowExecutionState.ERROR_NON_RETRYABLE,
            statusMessage = message,
            isRunning = false,
            activeSection = OperatorAutomationSection.SCHEDULES,
            schedules =
              current.automationWorkspace.schedules.map { schedule ->
                if (schedule.id != scheduleId) {
                  schedule
                } else {
                  schedule.copy(status = OperatorAutomationScheduleStatus.NEEDS_ATTENTION)
                }
              },
          ),
      )
    }
    persistAutomationWorkspace()
  }

  /** Clears the automation prompt after a successful or terminal run. */
  fun clearAutomationPrompt() {
    _uiState.update {
      it.copy(
        automationPrompt = "",
        automationWorkspace = it.automationWorkspace.copy(prompt = ""),
      )
    }
  }

  /** Starts a new operator thread while preserving the selected runtime context. */
  fun startNewConversation() {
    _uiState.update { current ->
      current.copy(
        conversationId = "",
        messageDraft = "",
        chatState = FlowExecutionState.IDLE,
        chatStateMessage = "",
        isSending = false,
        timeline = emptyList(),
        pendingApproval = null,
        phoneAutomationState = FlowExecutionState.IDLE,
        phoneAutomationMessage = "",
        isRunningPhoneAutomation = false,
        automationWorkspace =
          current.automationWorkspace.copy(
            prompt = "",
            state = FlowExecutionState.IDLE,
            statusMessage = "",
            isRunning = false,
          ),
      )
    }
  }

  /** Deletes the active thread when possible and resets the shell back to a new thread state. */
  fun clearActiveConversation(baseUrl: String) {
    val conversationId = _uiState.value.conversationId.trim()
    if (conversationId.isBlank()) {
      startNewConversation()
      return
    }

    viewModelScope.launch(Dispatchers.IO) {
      runCatching {
        cloudControlPlaneClient.deleteOperatorConversation(
          baseUrl = baseUrl,
          conversationId = conversationId,
        )
      }.onFailure { error ->
        StructuredLog.w(
          TAG,
          "operator_conversation_delete_failed",
          "conversationId" to conversationId,
          "reason" to error.message.orEmpty(),
        )
      }
      startNewConversation()
      refreshConversationHistory(baseUrl)
    }
  }

  /** Loads one persisted conversation into the active operator shell. */
  fun selectConversation(baseUrl: String, conversationId: String) {
    val normalizedConversationId = conversationId.trim()
    if (normalizedConversationId.isBlank()) {
      startNewConversation()
      return
    }

    viewModelScope.launch(Dispatchers.IO) {
      _uiState.update {
        it.copy(
          conversationId = normalizedConversationId,
          chatState = FlowExecutionState.LOADING,
          chatStateMessage = strings.threadLoading(),
        )
      }
      runCatching {
        cloudControlPlaneClient.fetchOperatorConversation(
          baseUrl = baseUrl,
          conversationId = normalizedConversationId,
        )
      }.onSuccess { orchestration ->
        _uiState.update { current ->
          current.copy(
            conversationId = orchestration.id,
            runtimeContext = orchestration.activeRuntime?.toRuntimeContext() ?: current.runtimeContext,
            timeline =
              buildOperatorTimeline(
                orchestration = orchestration,
                untitledConversationLabel = strings.threadUntitled(),
                userTitle = strings.userTitle(),
                assistantTitle = strings.assistantTitle(),
                runtimeTitle = strings.runtimeTitle(),
                approvalTitle = strings.approvalTitle(),
              ),
            chatState =
              if (orchestration.messages.isEmpty()) {
                FlowExecutionState.EMPTY
              } else {
                FlowExecutionState.SUCCESS
              },
            chatStateMessage = orchestration.title.orEmpty().ifBlank { strings.threadLoaded() },
            messageDraft = "",
            pendingApproval = null,
            phoneAutomationState = FlowExecutionState.IDLE,
            phoneAutomationMessage = "",
            isRunningPhoneAutomation = false,
          )
        }
      }.onFailure { error ->
        StructuredLog.e(
          TAG,
          "operator_conversation_load_failed",
          error,
          "conversationId" to normalizedConversationId,
        )
        _uiState.update {
          it.copy(
            chatState = FlowExecutionState.ERROR_RETRYABLE,
            chatStateMessage = strings.conversationLoadFailed(),
          )
        }
      }
    }
  }

  /** Clears any pending local approval request and returns automation state to idle. */
  fun clearPendingApproval(statusMessage: String = "") {
    _uiState.update {
      it.copy(
        pendingApproval = null,
        phoneAutomationState = FlowExecutionState.IDLE,
        phoneAutomationMessage = statusMessage,
        isRunningPhoneAutomation = false,
        automationWorkspace =
          it.automationWorkspace.copy(
            state = FlowExecutionState.IDLE,
            statusMessage = statusMessage,
            isRunning = false,
          ),
      )
    }
  }

  /** Adds a shell timeline row. */
  fun addTimelineEntry(
    role: OperatorTimelineRole,
    title: String,
    body: String,
    state: FlowExecutionState = FlowExecutionState.SUCCESS,
  ) {
    appendTimelineEntry(
      role = role,
      title = title,
      body = body,
      state = state,
    )
  }

  /** Marks the local automation flow as active. */
  fun startAutomation(statusMessage: String) {
    _uiState.update {
      it.copy(
        pendingApproval = null,
        phoneAutomationState = FlowExecutionState.LOADING,
        phoneAutomationMessage = statusMessage,
        isRunningPhoneAutomation = true,
        automationWorkspace =
          it.automationWorkspace.copy(
            state = FlowExecutionState.LOADING,
            statusMessage = statusMessage,
            isRunning = true,
            activeSection = OperatorAutomationSection.RUNS,
          ),
      )
    }
  }

  /** Applies a terminal or intermediate automation result to the shell transcript. */
  fun applyAutomationResult(
    result: OperatorAutomationResult,
    assistantTitle: String,
    planTitle: String,
    phoneTitle: String,
  ) {
    if (result.assistantMessage.isNotBlank()) {
      addTimelineEntry(
        role = OperatorTimelineRole.ASSISTANT,
        title = assistantTitle,
        body = result.assistantMessage,
        state =
          if (result.state == FlowExecutionState.SUCCESS || result.state == FlowExecutionState.EMPTY) {
            FlowExecutionState.SUCCESS
          } else {
            result.state
          },
      )
    }
    if (result.actionDetails.isNotEmpty()) {
      addTimelineEntry(
        role = OperatorTimelineRole.SYSTEM,
        title = planTitle,
        body = result.actionDetails.joinToString(separator = "\n"),
      )
    }
    result.executions.forEach { execution ->
      addTimelineEntry(
        role = OperatorTimelineRole.RUN,
        title = phoneTitle,
        body = execution.message,
        state = execution.state,
      )
    }
    val pendingApproval = result.executions.firstNotNullOfOrNull { it.approvalRequest }
    val statusMessage =
      result.executions.lastOrNull()?.message.takeIf { !it.isNullOrBlank() }
        ?: result.assistantMessage
    _uiState.update {
      val now = System.currentTimeMillis()
      val selectedFlowId = it.automationWorkspace.selectedFlowId
      val runSummary =
        OperatorAutomationRunSummary(
          id = "run-${now}-${selectedFlowId.ifBlank { "adhoc" }}",
          flowId = selectedFlowId,
          title = if (pendingApproval != null) strings.approvalTitle() else phoneTitle,
          summary = statusMessage.orEmpty().ifBlank { result.assistantMessage },
          state = result.state,
          updatedAtMs = now,
        )
      it.copy(
        pendingApproval = pendingApproval,
        phoneAutomationState = result.state,
        phoneAutomationMessage = statusMessage,
        isRunningPhoneAutomation = false,
        automationPrompt = "",
        automationWorkspace =
          it.automationWorkspace.copy(
            prompt = "",
            state = result.state,
            statusMessage = statusMessage,
            isRunning = false,
            activeSection =
              if (pendingApproval != null) {
                OperatorAutomationSection.APPROVALS
              } else {
                OperatorAutomationSection.RUNS
              },
            runHistory = listOf(runSummary) + it.automationWorkspace.runHistory,
          ),
      )
    }
    persistAutomationWorkspace()
  }

  /** Sends the current shell draft through the chat workflow. */
  fun sendMessage(
    baseUrl: String,
    activeProviderProfileId: String,
    providerBaseUrl: String,
  ) {
    val state = _uiState.value
    val message = state.messageDraft.trim()
    val runtimeContext = state.runtimeContext
    val pickedImages = state.pickedImages
    val hasImageInput = state.composerMode == OperatorComposerMode.IMAGE && pickedImages.isNotEmpty()
    val hasNativeIntent = !hasImageInput && nativeIntentExecutor.supports(message)

    if (message.isBlank() && !hasImageInput) {
      _uiState.update {
        it.copy(
          chatState = FlowExecutionState.ERROR_NON_RETRYABLE,
          chatStateMessage = strings.inputMissing(),
          isSending = false,
        )
      }
      return
    }

    if (hasNativeIntent) {
      appendTimelineEntry(
        role = OperatorTimelineRole.USER,
        title = strings.userTitle(),
        body = message,
        state = FlowExecutionState.SUCCESS,
      )

      viewModelScope.launch(Dispatchers.IO) {
        _uiState.update {
          it.copy(
            isSending = true,
            chatState = FlowExecutionState.LOADING,
            chatStateMessage = strings.sending(),
            pendingApproval = null,
          )
        }
        val nativeResult = nativeIntentExecutor.executeIfSupported(prompt = message)
        if (nativeResult != null) {
          applyNativeIntentResult(nativeResult)
          return@launch
        }
      }
      return
    }

    if (runtimeContext.provider.isBlank()) {
      _uiState.update {
        it.copy(
          chatState = FlowExecutionState.ERROR_NON_RETRYABLE,
          chatStateMessage = strings.providerRequired(),
          isSending = false,
        )
      }
      return
    }
    if (runtimeContext.model.isBlank()) {
      _uiState.update {
        it.copy(
          chatState = FlowExecutionState.ERROR_NON_RETRYABLE,
          chatStateMessage = strings.modelRequired(),
          isSending = false,
        )
      }
      return
    }

    viewModelScope.launch(Dispatchers.IO) {
      appendTimelineEntry(
        role = OperatorTimelineRole.USER,
        title = strings.userTitle(),
        body = message,
        state = FlowExecutionState.SUCCESS,
      )
      continueCloudSendMessage(
        baseUrl = baseUrl,
        activeProviderProfileId = activeProviderProfileId,
        providerBaseUrl = providerBaseUrl,
        state = state,
        message = message,
        pickedImages = pickedImages,
        hasImageInput = hasImageInput,
      )
    }
  }

  /** Sends raw audio through the chat workflow (control-plane branches: passthrough or transcribe). */
  fun sendMessageWithAudio(
    baseUrl: String,
    activeProviderProfileId: String,
    providerBaseUrl: String,
    audioBytes: ByteArray,
    mimeType: String = "audio/wav",
  ) {
    val state = _uiState.value
    val runtimeContext = state.runtimeContext

    if (runtimeContext.provider.isBlank()) {
      _uiState.update {
        it.copy(
          chatState = FlowExecutionState.ERROR_NON_RETRYABLE,
          chatStateMessage = strings.providerRequired(),
          isSending = false,
        )
      }
      return
    }
    if (runtimeContext.model.isBlank()) {
      _uiState.update {
        it.copy(
          chatState = FlowExecutionState.ERROR_NON_RETRYABLE,
          chatStateMessage = strings.modelRequired(),
          isSending = false,
        )
      }
      return
    }

    val wavBase64 =
      com.google.ai.edge.gallery.common.pcmToWavBase64(
        audioBytes,
        com.google.ai.edge.gallery.data.SAMPLE_RATE,
        1,
      )
    val speechInput = com.google.ai.edge.gallery.data.AiWorkflowSpeechInput(
      mimeType = "audio/wav",
      data = wavBase64,
    )

    appendTimelineEntry(
      role = OperatorTimelineRole.USER,
      title = strings.userTitle(),
      body = "[Voice message]",
      state = FlowExecutionState.SUCCESS,
    )

    viewModelScope.launch(Dispatchers.IO) {
      _uiState.update {
        it.copy(
          isSending = true,
          chatState = FlowExecutionState.LOADING,
          chatStateMessage = strings.sending(),
          pendingApproval = null,
        )
      }
      runCatching {
        var envelope =
          cloudControlPlaneClient.startAiWorkflowJob(
            baseUrl = baseUrl,
            request =
              AiWorkflowRequest(
                mode = "chat",
                provider = runtimeContext.provider,
                model = runtimeContext.model,
                message = state.messageDraft.trim().ifBlank { strings.defaultAudioPrompt() },
                apiKey =
                  credentialStore.readProviderApiKey(
                    providerId = runtimeContext.provider,
                    profileId = activeProviderProfileId.ifBlank { "default" },
                  ).orEmpty().ifBlank { null },
                baseUrl = providerBaseUrl.trim().ifBlank { null },
                correlationId = UUID.randomUUID().toString(),
                conversationId = state.conversationId.ifBlank { null },
                speechInput = speechInput,
              ),
          )
        var pollCount = 0
        while (!isAiWorkflowJobTerminal(envelope) && pollCount < OPERATOR_CHAT_MAX_POLLS) {
          delay(OPERATOR_CHAT_POLL_INTERVAL_MS)
          envelope = cloudControlPlaneClient.getAiWorkflowJobEnvelope(baseUrl, envelope.jobId)
          pollCount++
        }
        envelope
      }.onSuccess { envelope ->
        applyAiWorkflowJobEnvelope(
          baseUrl = baseUrl,
          envelope = envelope,
        )
      }.onFailure { error ->
        StructuredLog.e(
          TAG,
          "cloud_chat_audio_request_failed",
          error,
          "provider" to runtimeContext.provider,
          "model" to runtimeContext.model,
        )
        _uiState.update {
          it.copy(
            isSending = false,
            chatState = FlowExecutionState.ERROR_RETRYABLE,
            chatStateMessage = error.message.orEmpty().ifBlank { strings.sendFailed() },
          )
        }
      }
    }
  }

  private fun isAiWorkflowJobTerminal(envelope: AiWorkflowJobEnvelope): Boolean {
    val status = envelope.data?.status ?: return true
    return status == "succeeded" || status == "failed" || status == "cancelled"
  }

  private fun applyAiWorkflowJobEnvelope(
    baseUrl: String,
    envelope: AiWorkflowJobEnvelope,
  ) {
    val result = envelope.data?.result
    val reply = result?.reply ?: envelope.error?.reason ?: envelope.mismatches.joinToString(" ")
    val state =
      when (envelope.state) {
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
    _uiState.update {
      it.copy(
        isSending = false,
        chatState = state,
        chatStateMessage = reply,
        conversationId = result?.conversationId?.trim()?.ifBlank { null } ?: it.conversationId,
      )
    }
    appendTimelineEntry(
      role = if (state == FlowExecutionState.SUCCESS) OperatorTimelineRole.ASSISTANT else OperatorTimelineRole.RUN,
      title = strings.assistantTitle(),
      body = reply,
      state = state,
    )
    viewModelScope.launch(Dispatchers.IO) {
      persistActiveConversationRuntimeBinding(baseUrl = baseUrl)
      refreshConversationHistory(baseUrl)
    }
  }

  private suspend fun continueCloudSendMessage(
    baseUrl: String,
    activeProviderProfileId: String,
    providerBaseUrl: String,
    state: OperatorShellUiState,
    message: String,
    pickedImages: List<android.graphics.Bitmap>,
    hasImageInput: Boolean,
  ) {
    val runtimeContext = state.runtimeContext
    val imageInput =
      if (hasImageInput) {
        pickedImages.map { bitmap ->
          val outputStream = java.io.ByteArrayOutputStream()
          bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, outputStream)
          com.google.ai.edge.gallery.data.AiWorkflowImageInput(
            mimeType = "image/png",
            data = android.util.Base64.encodeToString(outputStream.toByteArray(), android.util.Base64.NO_WRAP),
          )
        }
      } else {
        null
      }
    _uiState.update {
      it.copy(
        isSending = true,
        chatState = FlowExecutionState.LOADING,
        chatStateMessage = strings.sending(),
        messageDraft = "",
        pickedImages = emptyList(),
        pendingApproval = null,
      )
    }
    runCatching {
      var envelope =
        cloudControlPlaneClient.startAiWorkflowJob(
          baseUrl = baseUrl,
          request =
            AiWorkflowRequest(
              mode = "chat",
              provider = runtimeContext.provider,
              model = runtimeContext.model,
              message = message.ifBlank { strings.defaultImagePrompt() },
              apiKey =
                credentialStore.readProviderApiKey(
                  providerId = runtimeContext.provider,
                  profileId = activeProviderProfileId.ifBlank { "default" },
                ).orEmpty().ifBlank { null },
              baseUrl = providerBaseUrl.trim().ifBlank { null },
              correlationId = UUID.randomUUID().toString(),
              conversationId = state.conversationId.ifBlank { null },
              imageInput = imageInput,
            ),
        )
      var pollCount = 0
      while (!isAiWorkflowJobTerminal(envelope) && pollCount < OPERATOR_CHAT_MAX_POLLS) {
        delay(OPERATOR_CHAT_POLL_INTERVAL_MS)
        envelope = cloudControlPlaneClient.getAiWorkflowJobEnvelope(baseUrl, envelope.jobId)
        pollCount++
      }
      envelope
    }.onSuccess { envelope ->
      applyAiWorkflowJobEnvelope(
        baseUrl = baseUrl,
        envelope = envelope,
      )
    }.onFailure { error ->
      StructuredLog.e(
        TAG,
        "cloud_chat_request_failed",
        error,
        "provider" to runtimeContext.provider,
        "model" to runtimeContext.model,
      )
      _uiState.update {
        it.copy(
          isSending = false,
          chatState = FlowExecutionState.ERROR_RETRYABLE,
          chatStateMessage = error.message.orEmpty().ifBlank { strings.sendFailed() },
        )
      }
    }
  }

  private fun applyNativeIntentResult(result: OperatorNativeIntentResult) {
    _uiState.update {
      it.copy(
        isSending = false,
        chatState = result.state,
        chatStateMessage = result.message,
        messageDraft = "",
        pickedImages = emptyList(),
      )
    }
    appendTimelineEntry(
      role = if (result.state == FlowExecutionState.SUCCESS) OperatorTimelineRole.ASSISTANT else OperatorTimelineRole.RUN,
      title = strings.assistantTitle(),
      body = result.message,
      state = result.state,
    )
  }

  private suspend fun persistActiveConversationRuntimeBinding(baseUrl: String) {
    val state = _uiState.value
    val conversationId = state.conversationId.trim()
    val runtimeContext = state.runtimeContext
    if (
      baseUrl.isBlank() ||
        conversationId.isBlank() ||
        runtimeContext.provider.isBlank() ||
        runtimeContext.model.isBlank()
    ) {
      return
    }

    runCatching {
      cloudControlPlaneClient.updateOperatorConversationRuntimeBinding(
        baseUrl = baseUrl,
        conversationId = conversationId,
        binding =
          CloudOperatorRuntimeBinding(
            source = normalizeConversationRuntimeBindingSource(runtimeContext.source),
            provider = runtimeContext.provider,
            model = runtimeContext.model,
            voiceInput = runtimeContext.voiceInput,
            voiceOutput = runtimeContext.voiceOutput,
            automation = runtimeContext.automation,
          ),
      )
    }.onFailure { error ->
      StructuredLog.w(
        TAG,
        "operator_runtime_binding_persist_failed",
        "conversationId" to conversationId,
        "provider" to runtimeContext.provider,
        "model" to runtimeContext.model,
        "reason" to error.message.orEmpty(),
      )
    }
  }

  /** Normalize Android runtime source labels to the control-plane runtime-binding contract. */
  internal fun normalizeConversationRuntimeBindingSource(source: String): String {
    return when (source.trim()) {
      "local" -> "local"
      "cloud" -> "cloud"
      else -> "cloud"
    }
  }

  private fun appendTimelineEntry(
    role: OperatorTimelineRole,
    title: String,
    body: String,
    state: FlowExecutionState,
  ) {
    if (body.isBlank()) {
      return
    }
    _uiState.update { current ->
      val entry =
        OperatorTimelineEntry(
          id = "operator-${System.currentTimeMillis()}-${current.timeline.size}",
          role = role,
          title = title,
          body = body,
          state = state,
          tone =
            when (state) {
              FlowExecutionState.SUCCESS -> OperatorTimelineTone.SUCCESS
              FlowExecutionState.ERROR_NON_RETRYABLE,
              FlowExecutionState.ERROR_RETRYABLE,
              FlowExecutionState.UNAUTHORIZED -> OperatorTimelineTone.ERROR
              FlowExecutionState.LOADING -> OperatorTimelineTone.WARNING
              FlowExecutionState.EMPTY,
              FlowExecutionState.IDLE ->
                when (role) {
                  OperatorTimelineRole.USER -> OperatorTimelineTone.ACCENT
                  OperatorTimelineRole.ASSISTANT -> OperatorTimelineTone.INFO
                  OperatorTimelineRole.SYSTEM -> OperatorTimelineTone.INFO
                  OperatorTimelineRole.RUN -> OperatorTimelineTone.INFO
                }
            },
        )
      current.copy(timeline = (current.timeline + entry).takeLast(OPERATOR_TIMELINE_LIMIT))
    }
  }

  private fun seedAutomationWorkspace() {
    viewModelScope.launch(Dispatchers.IO) {
      val defaults =
        listOf(
          OperatorStarterAction(
            id = "capture-flow",
            title = strings.automationRecipeCapture(),
            prompt = strings.automationRecipeCapturePrompt(),
            composerMode = OperatorComposerMode.AUTOMATION,
          ),
          OperatorStarterAction(
            id = "settings-check",
            title = strings.automationRecipeSettings(),
            prompt = strings.automationRecipeSettingsPrompt(),
            composerMode = OperatorComposerMode.AUTOMATION,
          ),
          OperatorStarterAction(
            id = "schedule-review",
            title = strings.automationRecipeSchedule(),
            prompt = strings.automationRecipeSchedulePrompt(),
            composerMode = OperatorComposerMode.AUTOMATION,
          ),
        )
      preferencesStore.readOperatorPreferences()
      automationWorkspaceStore.observe().collect { snapshot ->
        val dueClaim = claimDueScheduledAutomation(snapshot)
        if (dueClaim.snapshot != snapshot) {
          automationWorkspaceStore.save(dueClaim.snapshot)
          return@collect
        }
        _uiState.update { current ->
          val existingWorkspace = current.automationWorkspace
          val selectedFlowId =
            when {
              existingWorkspace.selectedFlowId.isNotBlank() &&
                dueClaim.snapshot.savedFlows.any { flow -> flow.id == existingWorkspace.selectedFlowId } ->
                existingWorkspace.selectedFlowId
              dueClaim.snapshot.selectedFlowId.isNotBlank() -> dueClaim.snapshot.selectedFlowId
              else -> existingWorkspace.selectedFlowId
            }
          current.copy(
            pendingScheduledRun = dueClaim.pendingScheduledRun,
            automationWorkspace =
              existingWorkspace.copy(
                templates = defaults,
                selectedFlowId = selectedFlowId,
                savedFlows = dueClaim.snapshot.savedFlows,
                schedules = dueClaim.snapshot.schedules,
                runHistory = dueClaim.snapshot.runHistory,
              ),
          )
        }
        automationScheduleCoordinator.reconcile(dueClaim.snapshot)
      }
    }
  }

  private fun persistAutomationWorkspace() {
    viewModelScope.launch(Dispatchers.IO) {
      val current = _uiState.value
      val snapshot =
        OperatorAutomationWorkspaceSnapshot(
          savedFlows = current.automationWorkspace.savedFlows,
          schedules = current.automationWorkspace.schedules,
          runHistory = current.automationWorkspace.runHistory,
          selectedFlowId = current.automationWorkspace.selectedFlowId,
          pendingScheduledRun = current.pendingScheduledRun,
        )
      automationWorkspaceStore.save(snapshot)
      automationScheduleCoordinator.reconcile(snapshot)
    }
  }
}

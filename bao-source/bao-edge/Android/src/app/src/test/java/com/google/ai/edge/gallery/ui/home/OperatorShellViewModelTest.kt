package com.google.ai.edge.gallery.ui.home

import com.google.ai.edge.gallery.customtasks.mobileactions.OperatorApprovalRequest
import com.google.ai.edge.gallery.customtasks.mobileactions.OperatorAutomationExecution
import com.google.ai.edge.gallery.customtasks.mobileactions.OperatorAutomationResult
import com.google.ai.edge.gallery.data.AccessTokenRecord
import com.google.ai.edge.gallery.data.AiWorkflowJobEnvelope
import com.google.ai.edge.gallery.data.CloudChatEnvelope
import com.google.ai.edge.gallery.data.CloudChatRequest
import com.google.ai.edge.gallery.data.CloudControlPlaneClient
import com.google.ai.edge.gallery.data.CloudControlPlaneEnvelope
import com.google.ai.edge.gallery.data.CloudModelCatalogResult
import com.google.ai.edge.gallery.data.CloudModelOptionsResult
import com.google.ai.edge.gallery.data.CloudModelPullEnvelope
import com.google.ai.edge.gallery.data.CloudModelPullRequest
import com.google.ai.edge.gallery.data.CloudModelSourceRegistryEnvelope
import com.google.ai.edge.gallery.data.CloudOperatorConversationIndex
import com.google.ai.edge.gallery.data.CloudOperatorConversationOrchestration
import com.google.ai.edge.gallery.data.CloudOperatorRuntimeBinding
import com.google.ai.edge.gallery.data.CloudOperatorSettingsSnapshot
import com.google.ai.edge.gallery.data.CredentialStore
import com.google.ai.edge.gallery.data.OperatorPreferences
import com.google.ai.edge.gallery.data.PreferencesStore
import com.baohaus.baoedge.core.flow.FlowExecutionState
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class OperatorShellViewModelTest {
  @Test
  fun normalizeConversationRuntimeBindingSource_mapsProviderBackedSourcesToCloud() {
    val viewModel = createViewModel()

    assertEquals("cloud", viewModel.normalizeConversationRuntimeBindingSource("ollama"))
    assertEquals("cloud", viewModel.normalizeConversationRuntimeBindingSource("openai"))
  }

  @Test
  fun normalizeConversationRuntimeBindingSource_preservesContractValues() {
    val viewModel = createViewModel()

    assertEquals("cloud", viewModel.normalizeConversationRuntimeBindingSource("cloud"))
    assertEquals("local", viewModel.normalizeConversationRuntimeBindingSource("local"))
  }

  @Test
  fun applyEntryRequest_updatesDestinationComposerModeAndLaunchDraft() {
    val viewModel = createViewModel()

    viewModel.applyEntryRequest(
      OperatorShellEntryRequest(
        destination = OperatorShellDestination.SETTINGS,
        composerMode = OperatorComposerMode.AUDIO,
        prompt = "Create a calendar invite tomorrow at 3 PM for team sync",
        autoSend = true,
      ),
    )

    assertEquals(OperatorShellDestination.SETTINGS, viewModel.uiState.value.destination)
    assertEquals(OperatorComposerMode.AUDIO, viewModel.uiState.value.composerMode)
    assertEquals(
      "Create a calendar invite tomorrow at 3 PM for team sync",
      viewModel.uiState.value.messageDraft,
    )
    assertEquals(true, viewModel.uiState.value.pendingLaunchAutoSend)
  }

  @Test
  fun markLaunchAutoSendConsumed_clearsPendingLaunchFlag() {
    val viewModel = createViewModel()
    viewModel.applyEntryRequest(
      OperatorShellEntryRequest(
        prompt = "Research Apple MacBook Pro pricing",
        autoSend = true,
      ),
    )

    viewModel.markLaunchAutoSendConsumed()

    assertEquals(false, viewModel.uiState.value.pendingLaunchAutoSend)
  }

  @Test
  fun shouldAutoSendLaunchPrompt_waitsForRuntimeWhenPromptNeedsCloud() {
    assertFalse(
      shouldAutoSendLaunchPrompt(
        pendingLaunchAutoSend = true,
        messageDraft = "Say hi from emulator verification.",
        isSending = false,
        providerReady = false,
        modelReady = false,
        nativeIntentSupported = false,
      ),
    )
  }

  @Test
  fun shouldAutoSendLaunchPrompt_allowsNativePromptsBeforeCloudRuntimeHydrates() {
    assertTrue(
      shouldAutoSendLaunchPrompt(
        pendingLaunchAutoSend = true,
        messageDraft = "Create a calendar event tomorrow at 3 PM for Team sync.",
        isSending = false,
        providerReady = false,
        modelReady = false,
        nativeIntentSupported = true,
      ),
    )
  }

  @Test
  fun setComposerMode_keepsCurrentDestination() {
    val viewModel = createViewModel()

    viewModel.setComposerMode(OperatorComposerMode.AUTOMATION)

    assertEquals(OperatorComposerMode.AUTOMATION, viewModel.uiState.value.composerMode)
    assertEquals(OperatorShellDestination.CHAT, viewModel.uiState.value.destination)
  }

  @Test
  fun runtimePicker_canBeOpenedAndClosed() {
    val viewModel = createViewModel()

    viewModel.openRuntimePicker(OperatorRuntimePickerTarget.AUTOMATION)

    assertEquals(true, viewModel.uiState.value.runtimePicker.visible)
    assertEquals(OperatorRuntimePickerTarget.AUTOMATION, viewModel.uiState.value.runtimePicker.target)

    viewModel.closeRuntimePicker()

    assertEquals(false, viewModel.uiState.value.runtimePicker.visible)
  }

  @Test
  fun updateSetupProgress_persistsThreeStepReadiness() {
    val viewModel = createViewModel()

    viewModel.updateSetupProgress(
      providerConnected = true,
      modelSelected = true,
      deviceReady = false,
    )

    assertEquals(true, viewModel.uiState.value.setupProgress.providerConnected)
    assertEquals(true, viewModel.uiState.value.setupProgress.modelSelected)
    assertEquals(false, viewModel.uiState.value.setupProgress.deviceReady)
  }

  @Test
  fun startNewConversation_clearsTransientShellState() {
    val viewModel = createViewModel()
    viewModel.syncRuntimeContext(
      controlPlaneBaseUrl = "http://127.0.0.1:3310",
      runtimeContext = OperatorRuntimeContext(source = "cloud", provider = "openai", model = "gpt-4.1"),
      requestTts = true,
    )
    viewModel.setMessageDraft("draft")
    viewModel.setAutomationPrompt("automation")
    viewModel.addTimelineEntry(
      role = OperatorTimelineRole.USER,
      title = "User",
      body = "Hello",
    )

    viewModel.startNewConversation()

    assertEquals("", viewModel.uiState.value.conversationId)
    assertEquals("", viewModel.uiState.value.messageDraft)
    assertEquals(OperatorRuntimeContext(source = "cloud", provider = "openai", model = "gpt-4.1"), viewModel.uiState.value.runtimeContext)
    assertEquals(0, viewModel.uiState.value.timeline.size)
    assertEquals(FlowExecutionState.IDLE, viewModel.uiState.value.chatState)
    assertEquals("", viewModel.uiState.value.automationWorkspace.prompt)
  }

  @Test
  fun applyAutomationResult_appendsTimelineAndStoresApproval() {
    val viewModel = createViewModel()
    val approval =
      OperatorApprovalRequest(
        flowYaml = "steps: []",
        consentToken = "consent-1",
        correlationId = "corr-1",
        riskLevel = "high",
        commandCount = 2,
      )

    viewModel.applyAutomationResult(
      result =
        OperatorAutomationResult(
          assistantMessage = "I have a plan.",
          actionDetails = listOf("Open settings", "Tap confirm"),
          executions =
            listOf(
              OperatorAutomationExecution(
                state = FlowExecutionState.LOADING,
                message = "Waiting for approval",
                approvalRequest = approval,
              ),
            ),
          state = FlowExecutionState.LOADING,
        ),
      assistantTitle = "Assistant",
      planTitle = "Plan",
      phoneTitle = "Phone",
    )

    assertEquals(3, viewModel.uiState.value.timeline.size)
    assertNotNull(viewModel.uiState.value.pendingApproval)
    assertEquals("corr-1", viewModel.uiState.value.pendingApproval?.correlationId)
    assertEquals(FlowExecutionState.LOADING, viewModel.uiState.value.phoneAutomationState)
    assertEquals("", viewModel.uiState.value.automationPrompt)
    assertEquals(FlowExecutionState.LOADING, viewModel.uiState.value.automationWorkspace.state)
    assertEquals(OperatorAutomationSection.APPROVALS, viewModel.uiState.value.automationWorkspace.activeSection)
  }

  @Test
  fun saveAutomationFlow_andScheduleCreation_populateWorkspace() {
    val viewModel = createViewModel()

    viewModel.setMessageDraft("Open the finance app and export the daily report.")
    viewModel.saveAutomationFlow()
    val savedFlow = viewModel.uiState.value.automationWorkspace.savedFlows.single()

    viewModel.openAutomationFlow(savedFlow.id, OperatorAutomationSection.SCHEDULES)
    viewModel.createScheduleForSelectedFlow(OperatorAutomationTriggerType.DAILY)

    assertEquals(OperatorShellDestination.AUTOMATIONS, viewModel.uiState.value.destination)
    assertEquals(1, viewModel.uiState.value.automationWorkspace.savedFlows.size)
    assertEquals(1, viewModel.uiState.value.automationWorkspace.schedules.size)
    assertEquals(
      OperatorAutomationTriggerType.DAILY,
      viewModel.uiState.value.automationWorkspace.schedules.single().trigger.type,
    )
  }

  @Test
  fun init_loadsPersistedWorkspace_andQueuesDueSchedule() {
    val now = System.currentTimeMillis()
    val store =
      FakeOperatorAutomationWorkspaceStore(
        snapshot =
          OperatorAutomationWorkspaceSnapshot(
            savedFlows =
              listOf(
                OperatorAutomationFlowSummary(
                  id = "flow-1",
                  title = "Capture the billing screen",
                  goal = "Open billing and capture the current balance screen.",
                  updatedAtMs = now,
                ),
              ),
            schedules =
              listOf(
                OperatorAutomationScheduleSummary(
                  id = "schedule-1",
                  flowId = "flow-1",
                  flowTitle = "Capture the billing screen",
                  trigger =
                    OperatorAutomationTrigger(
                      type = OperatorAutomationTriggerType.DAILY,
                      nextRunAtMs = now - 1_000L,
                    ),
                ),
              ),
          ),
      )

    val viewModel = createViewModel(automationWorkspaceStore = store)

    Thread.sleep(100)

    assertEquals(1, viewModel.uiState.value.automationWorkspace.savedFlows.size)
    assertEquals(1, viewModel.uiState.value.automationWorkspace.schedules.size)
    assertNotNull(viewModel.uiState.value.pendingScheduledRun)
    assertEquals("schedule-1", viewModel.uiState.value.pendingScheduledRun?.scheduleId)
    assertTrue(viewModel.uiState.value.pendingScheduledRun?.prompt?.contains("billing") == true)
  }

  private fun createViewModel(
    automationWorkspaceStore: OperatorAutomationWorkspaceStateStore = FakeOperatorAutomationWorkspaceStore(),
    automationScheduleCoordinator: OperatorAutomationScheduleCoordinator = FakeOperatorAutomationScheduleCoordinator(),
  ): OperatorShellViewModel =
    OperatorShellViewModel(
      cloudControlPlaneClient = FakeCloudControlPlaneClient(),
      credentialStore = FakeCredentialStore(),
      preferencesStore = FakePreferencesStore(),
      automationWorkspaceStore = automationWorkspaceStore,
      automationScheduleCoordinator = automationScheduleCoordinator,
      nativeIntentExecutor = FakeOperatorNativeIntentExecutor(),
      strings = FakeOperatorShellStrings(),
    )
}

private class FakeOperatorShellStrings : OperatorShellStrings {
  override fun threadUntitled(): String = "Untitled"

  override fun threadLoading(): String = "Loading"

  override fun threadLoaded(): String = "Loaded"

  override fun conversationLoadFailed(): String = "Load failed"

  override fun approvalTitle(): String = "Approval"

  override fun userTitle(): String = "User"

  override fun assistantTitle(): String = "Assistant"

  override fun runtimeTitle(): String = "Runtime"

  override fun inputMissing(): String = "Input missing"

  override fun speechNotSupported(): String = "Speech unsupported"

  override fun providerRequired(): String = "Provider required"

  override fun modelRequired(): String = "Model required"

  override fun sending(): String = "Sending"

  override fun sendFailed(): String = "Send failed"

  override fun automationRecipeCapture(): String = "Capture a screen flow"

  override fun automationRecipeCapturePrompt(): String =
    "Open the target app, capture the main flow, and describe every required confirmation before touching the device."

  override fun automationRecipeSettings(): String = "Check a settings path"

  override fun automationRecipeSettingsPrompt(): String =
    "Navigate to the relevant settings screen, explain each tap, and pause before any irreversible change."

  override fun automationRecipeSchedule(): String = "Prepare a recurring check"

  override fun automationRecipeSchedulePrompt(): String =
    "Draft a reusable automation flow and tell me whether it should run daily or weekly."

  override fun flowDefaultTitle(): String = "Untitled flow"

  override fun defaultImagePrompt(): String = "Describe this image."

  override fun defaultAudioPrompt(): String = "Transcribe this audio."
}

private class FakeOperatorNativeIntentExecutor : OperatorNativeIntentExecutor {
  override fun supports(prompt: String): Boolean = false

  override suspend fun executeIfSupported(prompt: String): OperatorNativeIntentResult? = null
}

private class FakeCredentialStore : CredentialStore {
  override suspend fun saveAccessTokenData(accessTokenData: AccessTokenRecord) = Unit

  override suspend fun clearAccessTokenData() = Unit

  override suspend fun readAccessTokenData(): AccessTokenRecord? = null

  override suspend fun saveProviderApiKey(providerId: String, profileId: String, apiKey: String) = Unit

  override suspend fun clearProviderApiKey(providerId: String, profileId: String) = Unit

  override suspend fun readProviderApiKey(providerId: String, profileId: String): String? = null
}

private class FakePreferencesStore : PreferencesStore {
  override suspend fun readOperatorPreferences(): OperatorPreferences = OperatorPreferences()

  override suspend fun saveControlPlaneBaseUrl(baseUrl: String) = Unit

  override suspend fun saveRuntimeAssignment(
    usage: com.google.ai.edge.gallery.data.OperatorRuntimeUsage,
    assignment: com.google.ai.edge.gallery.data.OperatorRuntimeAssignment,
  ) = Unit

  override suspend fun saveProviderProfile(profile: com.google.ai.edge.gallery.data.OperatorProviderProfile) = Unit

  override suspend fun saveActiveProviderProfile(providerId: String, profileId: String) = Unit

  override suspend fun deleteProviderProfile(providerId: String, profileId: String) = Unit

  override suspend fun saveCloudModelSource(source: String) = Unit

  override suspend fun saveProviderBaseUrl(baseUrl: String) = Unit

  override suspend fun saveCloudPullSource(source: String) = Unit

  override suspend fun saveCloudPullTimeoutMs(timeoutMsText: String) = Unit

  override suspend fun saveCloudPullForce(force: Boolean) = Unit

  override suspend fun saveCloudChatRequestTts(requestTts: Boolean) = Unit

  override suspend fun saveCloudChatTtsOutputMimeType(mimeType: String) = Unit

  override suspend fun saveCloudChatTtsVoice(voice: String) = Unit

  override suspend fun saveSpeechRecognitionLanguageTag(languageTag: String) = Unit
}

private class FakeOperatorAutomationWorkspaceStore(
  var snapshot: OperatorAutomationWorkspaceSnapshot = OperatorAutomationWorkspaceSnapshot(),
) : OperatorAutomationWorkspaceStateStore {
  private val snapshots = MutableStateFlow(snapshot)

  override fun load(): OperatorAutomationWorkspaceSnapshot = snapshot

  override fun observe(): Flow<OperatorAutomationWorkspaceSnapshot> = snapshots.asStateFlow()

  override fun save(snapshot: OperatorAutomationWorkspaceSnapshot) {
    this.snapshot = snapshot
    snapshots.value = snapshot
  }

  override fun update(transform: (OperatorAutomationWorkspaceSnapshot) -> OperatorAutomationWorkspaceSnapshot): OperatorAutomationWorkspaceSnapshot {
    snapshot = transform(snapshot)
    snapshots.value = snapshot
    return snapshot
  }
}

private class FakeOperatorAutomationScheduleCoordinator : OperatorAutomationScheduleCoordinator {
  override fun reconcile(snapshot: OperatorAutomationWorkspaceSnapshot, nowMs: Long) = Unit
}

private class FakeCloudControlPlaneClient : CloudControlPlaneClient {
  override suspend fun fetchModelSources(baseUrl: String): CloudModelSourceRegistryEnvelope {
    throw UnsupportedOperationException()
  }

  override suspend fun fetchOperatorSettings(baseUrl: String): CloudOperatorSettingsSnapshot {
    throw UnsupportedOperationException()
  }

  override suspend fun fetchOperatorConversations(
    baseUrl: String,
    limit: Int,
    offset: Int,
  ): CloudOperatorConversationIndex = CloudOperatorConversationIndex()

  override suspend fun fetchOperatorConversation(
    baseUrl: String,
    conversationId: String,
  ): CloudOperatorConversationOrchestration =
    CloudOperatorConversationOrchestration(
      id = conversationId,
      activeRuntime = CloudOperatorRuntimeBinding(source = "cloud", provider = "openai", model = "gpt-4.1"),
    )

  override suspend fun updateOperatorConversationRuntimeBinding(
    baseUrl: String,
    conversationId: String,
    binding: CloudOperatorRuntimeBinding,
  ): CloudOperatorConversationOrchestration =
    CloudOperatorConversationOrchestration(
      id = conversationId,
      activeRuntime = binding,
    )

  override suspend fun deleteOperatorConversation(baseUrl: String, conversationId: String) = Unit

  override suspend fun fetchProviderModels(
    baseUrl: String,
    provider: String,
    selectedModel: String?,
    apiKey: String?,
    providerBaseUrl: String?,
  ): CloudModelOptionsResult {
    throw UnsupportedOperationException()
  }

  override suspend fun fetchProviderModelCatalog(
    baseUrl: String,
    provider: String,
    selectedModel: String?,
    apiKey: String?,
    providerBaseUrl: String?,
  ): CloudModelCatalogResult {
    throw UnsupportedOperationException()
  }

  override suspend fun startModelPull(
    baseUrl: String,
    request: CloudModelPullRequest,
  ): CloudModelPullEnvelope {
    throw UnsupportedOperationException()
  }

  override suspend fun pollModelPull(baseUrl: String, jobId: String): CloudModelPullEnvelope {
    throw UnsupportedOperationException()
  }

  override suspend fun sendChat(baseUrl: String, request: CloudChatRequest): CloudChatEnvelope {
    throw UnsupportedOperationException()
  }

  override suspend fun startAiWorkflowJob(
    baseUrl: String,
    request: com.google.ai.edge.gallery.data.AiWorkflowRequest,
  ): AiWorkflowJobEnvelope {
    throw UnsupportedOperationException()
  }

  override suspend fun getAiWorkflowJobEnvelope(
    baseUrl: String,
    jobId: String,
  ): AiWorkflowJobEnvelope {
    throw UnsupportedOperationException()
  }
}

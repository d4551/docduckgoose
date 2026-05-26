import Foundation
import Testing
@testable import BaoEdgeCore
@testable import BaoEdgeUI

@Suite("FlowRunnerViewModel")
struct FlowRunnerViewModelTests {
  @Test("launch refresh keeps the requested provider when the live registry still contains it")
  @MainActor
  func resolvedModelRefreshProviderPrefersRequestedProvider() {
    var preferences = OperatorPreferences.defaults(
      config: .shared,
      defaultAppId: "com.baohaus.baoedge.tests",
      defaultLanguageCode: "en"
    )
    preferences.selectedProvider = "ollama"
    preferences.selectedModel = "glm-5:cloud"

    let viewModel = FlowRunnerViewModel(
      preferencesStore: InMemoryPreferencesStore(preferences: preferences),
      credentialStore: InMemoryCredentialStore(),
      conversationStore: InMemoryConversationStore(),
      automationStore: InMemoryAutomationStore(),
      modelCatalogStore: InMemoryModelCatalogStore()
    )

    let resolvedProvider = viewModel.resolvedModelRefreshProvider(
      afterLoading: ["openai", "ollama", "huggingface"],
      preferredProvider: "ollama"
    )

    #expect(resolvedProvider == "ollama")
  }

  @Test("launch refresh falls back to the selected provider when the preferred provider is stale")
  @MainActor
  func resolvedModelRefreshProviderFallsBackToSelectedProvider() {
    var preferences = OperatorPreferences.defaults(
      config: .shared,
      defaultAppId: "com.baohaus.baoedge.tests",
      defaultLanguageCode: "en"
    )
    preferences.selectedProvider = "ollama"
    preferences.selectedModel = "glm-5:cloud"

    let viewModel = FlowRunnerViewModel(
      preferencesStore: InMemoryPreferencesStore(preferences: preferences),
      credentialStore: InMemoryCredentialStore(),
      conversationStore: InMemoryConversationStore(),
      automationStore: InMemoryAutomationStore(),
      modelCatalogStore: InMemoryModelCatalogStore(
        snapshot: OperatorModelCatalogSnapshot(
          providerOptions: ["ollama"],
          providerDisplayNames: ["ollama": "Ollama"],
          providerSupportsBaseUrlOverride: ["ollama"],
          modelProvider: "ollama",
          modelDescriptors: [],
          modelOptions: ["glm-5:cloud"],
          modelSourceOptions: [],
          providerState: .success,
          providerMessage: "Loaded 1 providers.",
          modelListState: .errorRetryable,
          modelListMessage: "Stale snapshot"
        )
      )
    )

    let resolvedProvider = viewModel.resolvedModelRefreshProvider(
      afterLoading: ["openai", "ollama", "huggingface"],
      preferredProvider: "missing-provider"
    )

    #expect(resolvedProvider == "ollama")
  }

  @Test("due schedules are queued for execution on launch")
  @MainActor
  func dueSchedulesQueueOnLaunch() {
    let schedule = AutomationScheduleRecord(
      title: "Launch smoke",
      flowYaml: "appId: com.baohaus.baoedge.tests\nsteps:\n- launchApp",
      cadence: .daily,
      nextRunAt: .now.addingTimeInterval(-60)
    )
    let viewModel = FlowRunnerViewModel(
      preferencesStore: InMemoryPreferencesStore(
        preferences: OperatorPreferences.defaults(
          config: .shared,
          defaultAppId: "com.baohaus.baoedge.tests",
          defaultLanguageCode: "en"
        )
      ),
      credentialStore: InMemoryCredentialStore(),
      conversationStore: InMemoryConversationStore(),
      automationStore: InMemoryAutomationStore(schedules: [schedule]),
      modelCatalogStore: InMemoryModelCatalogStore()
    )

    #expect(viewModel.pendingScheduledAutomation?.id == schedule.id)
  }

  @Test("creating a schedule persists it in view model state")
  @MainActor
  func createScheduleAddsRecord() {
    let viewModel = FlowRunnerViewModel(
      preferencesStore: InMemoryPreferencesStore(
        preferences: OperatorPreferences.defaults(
          config: .shared,
          defaultAppId: "com.baohaus.baoedge.tests",
          defaultLanguageCode: "en"
        )
      ),
      credentialStore: InMemoryCredentialStore(),
      conversationStore: InMemoryConversationStore(),
      automationStore: InMemoryAutomationStore(),
      modelCatalogStore: InMemoryModelCatalogStore()
    )

    viewModel.automationFlowYaml = "appId: com.baohaus.baoedge.tests\nsteps:\n- launchApp"
    viewModel.createAutomationSchedule(cadence: .weekly)

    #expect(viewModel.automationSchedules.count == 1)
    #expect(viewModel.automationSchedules.first?.cadence == .weekly)
  }
}

private struct InMemoryPreferencesStore: PreferencesStore {
  let preferences: OperatorPreferences?

  func loadPreferences() -> OperatorPreferences? {
    preferences
  }

  func savePreferences(_ preferences: OperatorPreferences) {}
}

private struct InMemoryCredentialStore: CredentialStore {
  func string(for key: OperatorCredentialKey) -> String? { nil }
  func setString(_ value: String, for key: OperatorCredentialKey) -> Result<CredentialSnapshot, CredentialStoreError> {
    .success(snapshot(for: key))
  }
  func removeString(for key: OperatorCredentialKey) -> Result<CredentialSnapshot, CredentialStoreError> {
    .success(snapshot(for: key))
  }
  func snapshot(for key: OperatorCredentialKey) -> CredentialSnapshot {
    CredentialSnapshot(key: key, isConfigured: false, maskedValue: "")
  }
  func providerApiKey(providerId: String, profileId: String) -> String? { nil }
  func setProviderApiKey(_ value: String, providerId: String, profileId: String) -> Result<CredentialSnapshot, CredentialStoreError> {
    .success(snapshot(for: .providerApiKey))
  }
  func removeProviderApiKey(providerId: String, profileId: String) -> Result<CredentialSnapshot, CredentialStoreError> {
    .success(snapshot(for: .providerApiKey))
  }
  func providerApiKeySnapshot(providerId: String, profileId: String) -> CredentialSnapshot {
    snapshot(for: .providerApiKey)
  }
}

private struct InMemoryConversationStore: ConversationStore {
  func loadThreads() -> [OperatorConversationThread] { [] }
  func saveThreads(_ threads: [OperatorConversationThread]) {}
}

private struct InMemoryAutomationStore: AutomationStore {
  let history: [AutomationRunRecord]
  let schedules: [AutomationScheduleRecord]

  init(
    history: [AutomationRunRecord] = [],
    schedules: [AutomationScheduleRecord] = []
  ) {
    self.history = history
    self.schedules = schedules
  }

  func loadHistory() -> [AutomationRunRecord] { history }
  func saveHistory(_ history: [AutomationRunRecord]) {}
  func loadSchedules() -> [AutomationScheduleRecord] { schedules }
  func saveSchedules(_ schedules: [AutomationScheduleRecord]) {}
}

private struct InMemoryModelCatalogStore: ModelCatalogStore {
  let snapshot: OperatorModelCatalogSnapshot?

  init(snapshot: OperatorModelCatalogSnapshot? = nil) {
    self.snapshot = snapshot
  }

  func loadCatalog() -> OperatorModelCatalogSnapshot? {
    snapshot
  }

  func saveCatalog(_ snapshot: OperatorModelCatalogSnapshot) {}
}

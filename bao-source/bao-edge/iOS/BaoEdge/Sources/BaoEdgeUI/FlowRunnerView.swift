import Foundation
import SwiftUI
import BaoEdgeCore
import BaoEdgeDriver
#if canImport(SafariServices) && canImport(UIKit)
import SafariServices
import UIKit
#endif
#if canImport(Speech)
import Speech
#endif

private let operatorSystemLanguageCode = "system"

private struct OperatorLanguageOption: Identifiable, Hashable {
    let id: String
    let label: String
    let locale: Locale
    var resourceCode: String? { id == operatorSystemLanguageCode ? nil : id }

    static func catalog(displayLocale: Locale = .autoupdatingCurrent) -> [OperatorLanguageOption] {
        var seen = Set<String>()
        let dynamicOptions = Locale.availableIdentifiers.compactMap { identifier -> OperatorLanguageOption? in
            let resolvedLocale = Locale(identifier: identifier)
            guard let languageCode = resolvedLocale.language.languageCode?.identifier,
                  !languageCode.isEmpty
            else {
                return nil
            }
            let normalizedIdentifier = resolvedLocale.identifier.replacingOccurrences(of: "_", with: "-")
            guard !normalizedIdentifier.isEmpty, seen.insert(normalizedIdentifier).inserted else {
                return nil
            }
            let label = resolvedLocale.localizedString(forIdentifier: resolvedLocale.identifier)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            guard !label.isEmpty else {
                return nil
            }
            return OperatorLanguageOption(
                id: normalizedIdentifier,
                label: label.prefix(1).uppercased() + label.dropFirst(),
                locale: Locale(identifier: normalizedIdentifier)
            )
        }
        .sorted { lhs, rhs in
            lhs.label.localizedCaseInsensitiveCompare(rhs.label) == .orderedAscending
        }

        return [
            OperatorLanguageOption(
                id: operatorSystemLanguageCode,
                label: L10n.t("flow_runner_language_system"),
                locale: .autoupdatingCurrent
            )
        ] + dynamicOptions
    }

    static func resolve(_ rawValue: String?) -> OperatorLanguageOption {
        let normalized = rawValue?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        if normalized.isEmpty || normalized == operatorSystemLanguageCode {
            return catalog().first ?? OperatorLanguageOption(
                id: operatorSystemLanguageCode,
                label: L10n.t("flow_runner_language_system"),
                locale: .autoupdatingCurrent
            )
        }
        return catalog().first(where: { $0.id.caseInsensitiveCompare(normalized) == .orderedSame })
            ?? OperatorLanguageOption(id: normalized, label: normalized, locale: Locale(identifier: normalized))
    }
}

struct OperatorSearchOption: Identifiable, Hashable {
    let id: String
    let label: String
    let detail: String?
}

enum OperatorSearchSheet: Identifiable {
    case language
    case dictationLanguage
    case connectionProvider
    case connectionProfile(String)
    case runtimeProvider(OperatorRuntimeUsage)
    case runtimeModel(OperatorRuntimeUsage)

    var id: String {
        switch self {
        case .language:
            return "language"
        case .dictationLanguage:
            return "dictation-language"
        case .connectionProvider:
            return "connection-provider"
        case let .connectionProfile(providerId):
            return "connection-profile-\(providerId)"
        case let .runtimeProvider(usage):
            return "runtime-provider-\(usage.rawValue)"
        case let .runtimeModel(usage):
            return "runtime-model-\(usage.rawValue)"
        }
    }
}

private extension OperatorRuntimeUsage {
    var localizedTitle: String {
        switch self {
        case .chat:
            return L10n.t("flow_runner_runtime_usage_chat")
        case .automation:
            return L10n.t("flow_runner_runtime_usage_automation")
        case .image:
            return L10n.t("flow_runner_runtime_usage_image")
        case .flowGeneration:
            return L10n.t("flow_runner_runtime_usage_flow_generation")
        case .speechInput:
            return L10n.t("flow_runner_runtime_usage_speech_input")
        case .speechOutput:
            return L10n.t("flow_runner_runtime_usage_speech_output")
        }
    }
}

private extension AiModelDescriptor {
    func supports(_ usage: OperatorRuntimeUsage) -> Bool {
        switch usage {
        case .chat:
            return supportsText || capabilityModes.contains(OperatorRuntimeUsage.chat.rawValue)
        case .automation:
            return supportsAutomation || supportsAgent || capabilityModes.contains(OperatorRuntimeUsage.automation.rawValue)
        case .image:
            return supportsImageInput || supportsImageGeneration || capabilityModes.contains(OperatorRuntimeUsage.image.rawValue)
        case .flowGeneration:
            return supportsFlowGeneration || capabilityModes.contains(OperatorRuntimeUsage.flowGeneration.rawValue)
        case .speechInput:
            return supportsAudioInput || capabilityModes.contains(OperatorRuntimeUsage.speechInput.rawValue)
        case .speechOutput:
            return supportsSpeechOutput || capabilityModes.contains(OperatorRuntimeUsage.speechOutput.rawValue)
        }
    }

    var resolvedLabel: String {
        displayName.trimmingCharacters(in: .whitespacesAndNewlines).nonEmpty ?? id
    }
}

private func filterModelCatalog(_ descriptors: [AiModelDescriptor], for usage: OperatorRuntimeUsage) -> [AiModelDescriptor] {
    var seen = Set<String>()
    let normalized = descriptors.filter { descriptor in
        let normalizedId = descriptor.id.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard !normalizedId.isEmpty, !seen.contains(normalizedId) else {
            return false
        }
        seen.insert(normalizedId)
        return true
    }
    let filtered = normalized.filter { $0.supports(usage) }
    return filtered.isEmpty ? normalized : filtered
}

enum OperatorModelsSection: String, CaseIterable, Identifiable {
    case ready
    case catalog
    case downloads
    case artifacts

    var id: String { rawValue }

    var localizedTitle: String {
        switch self {
        case .ready:
            return L10n.t("flow_runner_models_section_ready")
        case .catalog:
            return L10n.t("flow_runner_models_section_catalog")
        case .downloads:
            return L10n.t("flow_runner_models_section_downloads")
        case .artifacts:
            return L10n.t("flow_runner_models_section_artifacts")
        }
    }
}

enum OperatorAutomationsSection: String, CaseIterable, Identifiable {
    case drafts
    case runs
    case schedules
    case approvals

    var id: String { rawValue }

    var systemImageName: String {
        switch self {
        case .drafts: return "sparkles"
        case .runs: return "clock.arrow.circlepath"
        case .schedules: return "calendar"
        case .approvals: return "checkmark.circle"
        }
    }

    var localizedTitle: String {
        switch self {
        case .drafts:
            return L10n.t("flow_runner_automations_section_drafts")
        case .runs:
            return L10n.t("flow_runner_automations_section_runs")
        case .schedules:
            return L10n.t("flow_runner_automations_section_schedules")
        case .approvals:
            return L10n.t("flow_runner_automations_section_approvals")
        }
    }

    var localizedEmptyDetail: String {
        switch self {
        case .drafts:
            return ""
        case .runs:
            return L10n.t("flow_runner_automation_history_empty")
        case .schedules:
            return L10n.t("flow_runner_automations_schedules_empty")
        case .approvals:
            return L10n.t("flow_runner_automations_approvals_empty")
        }
    }
}

enum OperatorConversationRole: String, Codable, Sendable {
    case system
    case user
    case assistant
    case runtime
    case warning
}

struct OperatorConversationEntry: Identifiable, Equatable, Codable, Sendable {
    let id: UUID
    let role: OperatorConversationRole
    let title: String
    let body: String
    let state: FlowExecutionState
    let timestamp: Date

    init(
        id: UUID = UUID(),
        role: OperatorConversationRole,
        title: String,
        body: String,
        state: FlowExecutionState,
        timestamp: Date = .now
    ) {
        self.id = id
        self.role = role
        self.title = title
        self.body = body
        self.state = state
        self.timestamp = timestamp
    }
}

struct ModelPullHistoryEntry: Identifiable, Equatable, Sendable {
    let id: String
    let requestedModelRef: String
    let normalizedModelRef: String
    let source: String
    let status: CapabilityJobState
    let artifactPath: String?
    let updatedAt: String
}

/// Observable view model that preserves structured report data for `FlowRunnerView`.
///
/// Annotated `@MainActor` so all mutations occur on the main thread and satisfy
/// Swift 6's `Sendable` requirements for `@State`-stored reference types.
@MainActor
@Observable
final class FlowRunnerViewModel {
    private static let deviceAiProtocolAppIdEnvironmentKey = "BAO_EDGE_DEVICE_AI_PROTOCOL_APP_ID"
    private static let themeOverrideUserDefaultsKey = "bao_edge_theme_override"
    private static let dictationLocaleUserDefaultsKey = "bao_edge_dictation_locale"
    private let preferencesStore: any PreferencesStore
    private let credentialStore: any CredentialStore
    private let conversationStore: any ConversationStore
    private let automationStore: any AutomationStore
    private let modelCatalogStore: any ModelCatalogStore
    private let controlPlaneConfig: ControlPlaneRuntimeConfig

    // MARK: - Shell and persistence state

    var operatorLanguageCode: String {
        didSet { persistPreferences() }
    }

    var activeConversationId: String
    var conversationThreads: [OperatorConversationThread] = []
    var automationHistory: [AutomationRunRecord] = []
    var automationSchedules: [AutomationScheduleRecord] = []
    var pendingScheduledAutomation: AutomationScheduleRecord?
    var automationFlowYaml: String
    var selectedSettingsSection: OperatorSettingsSection = .general
    var themeOverride: OperatorThemeOverride {
        didSet { persistThemeOverride() }
    }
    var dictationLocaleIdentifier: String {
        didSet { persistDictationLocale() }
    }
    var runtimeAssignments: OperatorRuntimeAssignments {
        didSet { persistPreferences() }
    }
    var providerProfiles: [OperatorProviderProfile] {
        didSet { persistPreferences() }
    }
    var activeProviderProfileIds: [String: String] {
        didSet { persistPreferences() }
    }

    var providerApiKey: String = ""
    var providerApiKeyDraft: String = ""
    var providerApiKeySnapshot: CredentialSnapshot
    var selectedProviderProfileId: String = ""
    var selectedProviderProfileLabel: String = ""
    var huggingFaceToken: String = ""
    var huggingFaceTokenDraft: String = ""
    var huggingFaceTokenSnapshot: CredentialSnapshot

    // MARK: - Existing local flow execution state

    var appId: String {
        didSet { persistPreferences() }
    }
    var isRunning: Bool = false
    var report: IosDriverReport?

    /// Safety confirmation state.
    var pendingFlow: FlowV1?
    var showSafetyAlert: Bool = false
    var safetyAlertReason: String = ""

    /// Human-readable summary derived from the last report, or "Idle" when none exists.
    var resultText: String {
        guard let report else { return L10n.t("flow_runner_idle") }
        return "\(report.completedSteps)/\(report.totalSteps): \(report.message)"
    }

    // MARK: - Cloud control-plane state

    var controlPlaneBaseURL: String {
        didSet { persistPreferences() }
    }
    var isLoadingProviderRegistry: Bool = false
    var providerOptions: [String] = []
    var providerDisplayNames: [String: String] = [:]
    var providerSupportsBaseUrlOverride: Set<String> = []
    var selectedProvider: String = "" {
        didSet {
            syncSelectedProviderProfile()
            syncChatRuntimeAssignment()
            syncActiveConversationBinding()
        }
    }
    var providerState: FlowExecutionState = .idle
    var providerMessage: String = L10n.t("flow_runner_provider_not_loaded")

    var modelListState: FlowExecutionState = .idle
    var modelListMessage: String = L10n.t("flow_runner_model_list_not_loaded")
    var modelDescriptors: [AiModelDescriptor] = []
    var modelOptions: [String] = []
    var loadedModelOptionsProvider: String = ""
    var modelSourceOptions: [ModelSourceDescriptor] = []
    var selectedModel: String = "" {
        didSet {
            syncChatRuntimeAssignment()
            syncActiveConversationBinding()
        }
    }
    var modelSource: String {
        didSet {
            syncChatRuntimeAssignment()
            syncActiveConversationBinding()
        }
    }
    var providerBaseURL: String {
        didSet { persistPreferences() }
    }

    var pullModelRef: String = ""
    var pullSource: String {
        didSet { persistPreferences() }
    }
    var pullForce: Bool = false
    var pullTimeoutMsText: String {
        didSet { persistPreferences() }
    }
    var pullJobId: String?
    var pullState: FlowExecutionState = .idle
    var pullMessage: String = L10n.t("flow_runner_pull_not_started")
    var modelPullHistory: [ModelPullHistoryEntry] = []

    var composerMode: OperatorComposerMode = .chat
    var chatPickedImages: [ChatPickedImage] = []
    var chatMessage: String = ""
    var chatReply: String = ""
    var chatSpeechInputMimeType: String {
        didSet { persistPreferences() }
    }
    var chatSpeechInputData: String {
        didSet { persistPreferences() }
    }
    var chatRequestTts: Bool {
        didSet { persistPreferences() }
    }
    var chatTtsOutputMimeType: String {
        didSet { persistPreferences() }
    }
    var chatTtsVoice: String {
        didSet { persistPreferences() }
    }
    var chatSpeechTranscript: String = ""
    var chatTtsMimeType: String = ""
    var chatTtsBase64Audio: String = ""
    var chatState: FlowExecutionState = .idle
    var chatStateMessage: String = L10n.t("flow_runner_chat_ready")

    var deviceAiModelRef: String {
        didSet { persistPreferences() }
    }
    var deviceAiModelRevision: String {
        didSet { persistPreferences() }
    }
    var deviceAiModelFileName: String {
        didSet { persistPreferences() }
    }
    var deviceAiExpectedSha256: String {
        didSet { persistPreferences() }
    }
    var deviceAiState: FlowExecutionState = .idle
    var deviceAiStateMessage: String = L10n.t("flow_runner_device_ai_idle")
    var deviceAiCorrelationId: String = ""
    var deviceAiArtifactPath: String = ""
    var deviceAiArtifactSha256: String = ""
    var deviceAiArtifactSizeBytes: Int64 = 0

    var isLoadingModels: Bool = false
    var isSubmittingPull: Bool = false
    var isPollingPull: Bool = false
    var isSendingChat: Bool = false
    var isRunningDeviceAiProtocol: Bool = false

    // MARK: - Operator shell state

    var conversationEntries: [OperatorConversationEntry] = [] {
        didSet { persistActiveConversation() }
    }

    init(
        preferencesStore: any PreferencesStore = UserDefaultsPreferencesStore(),
        credentialStore: any CredentialStore = KeychainCredentialStore(),
        conversationStore: any ConversationStore = UserDefaultsConversationStore(),
        automationStore: any AutomationStore = UserDefaultsAutomationStore(),
        modelCatalogStore: any ModelCatalogStore = UserDefaultsModelCatalogStore(),
        controlPlaneConfig: ControlPlaneRuntimeConfig = .shared
    ) {
        self.preferencesStore = preferencesStore
        self.credentialStore = credentialStore
        self.conversationStore = conversationStore
        self.automationStore = automationStore
        self.modelCatalogStore = modelCatalogStore
        self.controlPlaneConfig = controlPlaneConfig

        let defaultLanguageCode = operatorSystemLanguageCode
        let defaultAppId = Self.resolveDefaultAppId()
        let defaults = OperatorPreferences.defaults(
            config: controlPlaneConfig,
            defaultAppId: defaultAppId,
            defaultLanguageCode: defaultLanguageCode
        )
        let storedPreferences = preferencesStore.loadPreferences() ?? defaults
        let storedConversations = conversationStore.loadThreads()
        let defaultThread = storedConversations.first ?? OperatorConversationThread.starter()

        self.operatorLanguageCode = storedPreferences.operatorLanguageCode
        self.themeOverride = Self.loadThemeOverride()
        self.dictationLocaleIdentifier = Self.loadDictationLocale()
        self.activeConversationId = defaultThread.id
        self.automationFlowYaml = FlowYamlParser.toYaml(FlowV1(appId: storedPreferences.appId, steps: [.launchApp]))
        self.runtimeAssignments = storedPreferences.runtimeAssignments
        self.providerProfiles = storedPreferences.providerProfiles
        self.activeProviderProfileIds = storedPreferences.activeProviderProfileIds
        self.huggingFaceTokenSnapshot = credentialStore.snapshot(for: .huggingFaceToken)
        self.appId = storedPreferences.appId
        self.controlPlaneBaseURL = storedPreferences.controlPlaneBaseURL
        self.modelSource = storedPreferences.modelSource
        let activeProfile = storedPreferences.activeProfile(for: storedPreferences.selectedProvider)
        self.providerBaseURL = activeProfile?.baseUrl ?? storedPreferences.providerBaseURL
        self.pullSource = storedPreferences.pullSource
        self.pullTimeoutMsText = storedPreferences.pullTimeoutMsText
        self.chatSpeechInputMimeType = storedPreferences.chatSpeechInputMimeType
        self.chatSpeechInputData = storedPreferences.chatSpeechInputData
        self.chatRequestTts = storedPreferences.chatRequestTts
        self.chatTtsOutputMimeType = storedPreferences.chatTtsOutputMimeType
        self.chatTtsVoice = storedPreferences.chatTtsVoice
        self.deviceAiModelRef = storedPreferences.deviceAiModelRef
        self.deviceAiModelRevision = storedPreferences.deviceAiModelRevision
        self.deviceAiModelFileName = storedPreferences.deviceAiModelFileName
        self.deviceAiExpectedSha256 = storedPreferences.deviceAiExpectedSha256

        self.selectedProviderProfileId = activeProfile?.profileId ?? ""
        self.selectedProviderProfileLabel = activeProfile?.displayName ?? ""
        self.providerApiKeySnapshot = credentialStore.providerApiKeySnapshot(
            providerId: storedPreferences.selectedProvider,
            profileId: activeProfile?.profileId ?? "default"
        )
        let savedProviderApiKey = credentialStore.providerApiKey(
            providerId: storedPreferences.selectedProvider,
            profileId: activeProfile?.profileId ?? "default"
        ) ?? ""
        self.providerApiKey = savedProviderApiKey
        self.providerApiKeyDraft = ""

        let resolvedHfToken =
            credentialStore.string(for: .huggingFaceToken)?.trimmedOrNil
            ?? controlPlaneConfig.deviceAiHfToken.trimmedOrNil
            ?? ""
        self.huggingFaceToken = resolvedHfToken
        self.huggingFaceTokenDraft = ""

        if !resolvedHfToken.isEmpty && !huggingFaceTokenSnapshot.isConfigured {
            _ = credentialStore.setString(resolvedHfToken, for: .huggingFaceToken)
            self.huggingFaceTokenSnapshot = credentialStore.snapshot(for: .huggingFaceToken)
        }

        if let snapshot = modelCatalogStore.loadCatalog() {
            self.providerOptions = snapshot.providerOptions
            self.providerDisplayNames = snapshot.providerDisplayNames
            self.providerSupportsBaseUrlOverride = Set(snapshot.providerSupportsBaseUrlOverride)
            self.modelDescriptors = snapshot.modelDescriptors
            self.modelOptions = snapshot.modelOptions
            self.loadedModelOptionsProvider = snapshot.modelProvider
            self.modelSourceOptions = snapshot.modelSourceOptions
            self.providerState = snapshot.providerState
            self.providerMessage = snapshot.providerMessage
            self.modelListState = snapshot.modelListState
            self.modelListMessage = snapshot.modelListMessage
        }

        self.conversationThreads = storedConversations.isEmpty ? [defaultThread] : storedConversations
        self.automationHistory = automationStore.loadHistory()
        self.automationSchedules = automationStore.loadSchedules()

        if let activeThread = self.conversationThreads.first(where: { $0.id == defaultThread.id }) {
            self.selectedProvider = activeThread.binding.provider
            self.selectedModel = activeThread.binding.model
            if activeThread.binding.modelSource.trimmedOrNil != nil {
                self.modelSource = activeThread.binding.modelSource
            }
            self.syncChatRuntimeAssignment()
            self.conversationEntries = activeThread.entries.map(\.restoredEntry)
        } else {
            self.selectedProvider = storedPreferences.selectedProvider
            self.selectedModel = storedPreferences.selectedModel
            self.syncChatRuntimeAssignment()
            self.conversationEntries = []
        }
        ensureSeededConversation()
        queueDueAutomationIfNeeded()
    }

    func appendConversation(
        role: OperatorConversationRole,
        title: String,
        body: String,
        state: FlowExecutionState = .success
    ) {
        let trimmedBody = body.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedBody.isEmpty else {
            return
        }
        conversationEntries.append(
            OperatorConversationEntry(
                role: role,
                title: title,
                body: trimmedBody,
                state: state
            )
        )
    }

    func createConversation() {
        let nextIndex = conversationThreads.count + 1
        let thread = OperatorConversationThread(
            id: UUID().uuidString,
            title: L10n.t("flow_runner_thread_title_format", nextIndex),
            binding: ConversationRuntimeBinding(
                provider: selectedProvider,
                model: selectedModel,
                modelSource: modelSource
            ),
            entries: []
        )
        conversationThreads.insert(thread, at: 0)
        activeConversationId = thread.id
        conversationEntries = []
        ensureSeededConversation()
        persistConversationThreads()
    }

    func selectConversation(id: String) {
        guard let thread = conversationThreads.first(where: { $0.id == id }) else {
            return
        }
        activeConversationId = id
        selectedProvider = thread.binding.provider
        selectedModel = thread.binding.model
        if thread.binding.modelSource.trimmedOrNil != nil {
            modelSource = thread.binding.modelSource
        }
        conversationEntries = thread.entries.map(\.restoredEntry)
        ensureSeededConversation()
    }

    func ensureSeededConversation() {
        guard conversationEntries.isEmpty else { return }
        appendConversation(
            role: .system,
            title: L10n.t("flow_runner_workspace_chat"),
            body: L10n.t("flow_runner_operator_seed_message"),
            state: .idle
        )
    }

    func resetConversation() {
        conversationEntries.removeAll()
        chatReply = ""
        chatSpeechTranscript = ""
        chatTtsMimeType = ""
        chatTtsBase64Audio = ""
        ensureSeededConversation()
    }

    func clearActiveConversationHistory() {
        guard let activeIndex = conversationThreads.firstIndex(where: { $0.id == activeConversationId }) else {
            resetConversation()
            return
        }

        if conversationThreads.count == 1 {
            let replacement = OperatorConversationThread(
                id: UUID().uuidString,
                title: L10n.t("flow_runner_thread_default_title"),
                binding: ConversationRuntimeBinding(
                    provider: selectedProvider,
                    model: selectedModel,
                    modelSource: modelSource
                ),
                entries: []
            )
            conversationThreads = [replacement]
            activeConversationId = replacement.id
            conversationEntries = []
            ensureSeededConversation()
            persistConversationThreads()
            return
        }

        conversationThreads.remove(at: activeIndex)
        let nextIndex = min(activeIndex, conversationThreads.count - 1)
        let nextThread = conversationThreads[nextIndex]
        activeConversationId = nextThread.id
        selectedProvider = nextThread.binding.provider
        selectedModel = nextThread.binding.model
        if nextThread.binding.modelSource.trimmedOrNil != nil {
            modelSource = nextThread.binding.modelSource
        }
        conversationEntries = nextThread.entries.map(\.restoredEntry)
        ensureSeededConversation()
        persistConversationThreads()
    }

    func saveProviderApiKey() -> CredentialSnapshot {
        let providerId = selectedProvider.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !providerId.isEmpty else {
            return providerApiKeySnapshot
        }
        let profileId = selectedProviderProfileId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "default" : selectedProviderProfileId.trimmingCharacters(in: .whitespacesAndNewlines)
        let profileLabel = selectedProviderProfileLabel.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? profileId : selectedProviderProfileLabel.trimmingCharacters(in: .whitespacesAndNewlines)
        let value = providerApiKeyDraft.trimmingCharacters(in: .whitespacesAndNewlines)
        providerProfiles.removeAll {
            $0.providerId.caseInsensitiveCompare(providerId) == .orderedSame
                && $0.profileId.caseInsensitiveCompare(profileId) == .orderedSame
        }
        providerProfiles.append(
            OperatorProviderProfile(
                providerId: providerId,
                profileId: profileId,
                displayName: profileLabel,
                baseUrl: providerBaseURL
            )
        )
        providerProfiles.sort {
            if $0.providerId != $1.providerId { return $0.providerId < $1.providerId }
            if $0.displayName != $1.displayName { return $0.displayName < $1.displayName }
            return $0.profileId < $1.profileId
        }
        activeProviderProfileIds[providerId] = profileId
        providerApiKey = value
        let result = credentialStore.setProviderApiKey(value, providerId: providerId, profileId: profileId)
        if case .success(let snapshot) = result {
            providerApiKeyDraft = ""
            providerApiKeySnapshot = snapshot
            selectedProviderProfileId = profileId
            selectedProviderProfileLabel = profileLabel
        }
        return providerApiKeySnapshot
    }

    func clearProviderApiKey() -> CredentialSnapshot {
        let providerId = selectedProvider.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !providerId.isEmpty else {
            return providerApiKeySnapshot
        }
        let profileId = selectedProviderProfileId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "default" : selectedProviderProfileId.trimmingCharacters(in: .whitespacesAndNewlines)
        providerApiKey = ""
        let result = credentialStore.removeProviderApiKey(providerId: providerId, profileId: profileId)
        if case .success(let snapshot) = result {
            providerApiKeyDraft = ""
            providerApiKeySnapshot = snapshot
        }
        return providerApiKeySnapshot
    }

    func saveHuggingFaceToken() -> CredentialSnapshot {
        let value = huggingFaceTokenDraft.trimmingCharacters(in: .whitespacesAndNewlines)
        if !value.isEmpty {
            huggingFaceToken = value
        }
        let result = credentialStore.setString(huggingFaceToken, for: .huggingFaceToken)
        if case .success(let snapshot) = result {
            huggingFaceTokenDraft = ""
            huggingFaceTokenSnapshot = snapshot
        }
        return huggingFaceTokenSnapshot
    }

    func clearHuggingFaceToken() -> CredentialSnapshot {
        huggingFaceToken = ""
        let result = credentialStore.removeString(for: .huggingFaceToken)
        if case .success(let snapshot) = result {
            huggingFaceTokenDraft = ""
            huggingFaceTokenSnapshot = snapshot
        }
        return huggingFaceTokenSnapshot
    }

    func recordAutomationRun(
        title: String,
        detail: String,
        state: FlowExecutionState,
        correlationId: String = UUID().uuidString
    ) {
        automationHistory.insert(
            AutomationRunRecord(
                title: title,
                detail: detail,
                state: state,
                correlationId: correlationId
            ),
            at: 0
        )
        automationStore.saveHistory(automationHistory)
    }

    func createAutomationSchedule(cadence: AutomationScheduleCadence) {
        let trimmedYaml = automationFlowYaml.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedYaml.isEmpty else {
            return
        }
        automationSchedules.insert(
            AutomationScheduleRecord(
                title: automationScheduleTitle(for: trimmedYaml),
                flowYaml: trimmedYaml,
                cadence: cadence,
                nextRunAt: nextAutomationScheduleDate(for: cadence)
            ),
            at: 0
        )
        automationStore.saveSchedules(automationSchedules)
    }

    func toggleAutomationSchedule(_ scheduleId: String) {
        automationSchedules = automationSchedules.map { schedule in
            guard schedule.id == scheduleId else {
                return schedule
            }
            return AutomationScheduleRecord(
                id: schedule.id,
                title: schedule.title,
                flowYaml: schedule.flowYaml,
                cadence: schedule.cadence,
                status: schedule.status == .active ? .paused : .active,
                nextRunAt: schedule.nextRunAt,
                lastRunAt: schedule.lastRunAt
            )
        }
        automationStore.saveSchedules(automationSchedules)
        queueDueAutomationIfNeeded()
    }

    func queueDueAutomationIfNeeded(now: Date = .now) {
        guard pendingScheduledAutomation == nil, !isRunning else {
            return
        }
        pendingScheduledAutomation = automationSchedules
            .filter { $0.status == .active && $0.nextRunAt <= now }
            .sorted { lhs, rhs in
                (lhs.lastRunAt ?? .distantPast) < (rhs.lastRunAt ?? .distantPast)
            }
            .first
    }

    func beginScheduledAutomation(_ scheduleId: String) {
        pendingScheduledAutomation = nil
        automationSchedules = automationSchedules.map { schedule in
            guard schedule.id == scheduleId else {
                return schedule
            }
            return AutomationScheduleRecord(
                id: schedule.id,
                title: schedule.title,
                flowYaml: schedule.flowYaml,
                cadence: schedule.cadence,
                status: .active,
                nextRunAt: nextAutomationScheduleDate(for: schedule.cadence),
                lastRunAt: .now
            )
        }
        automationStore.saveSchedules(automationSchedules)
    }

    func completeScheduledAutomation(
        _ scheduleId: String,
        state: FlowExecutionState,
        requiresAttention: Bool
    ) {
        automationSchedules = automationSchedules.map { schedule in
            guard schedule.id == scheduleId else {
                return schedule
            }
            return AutomationScheduleRecord(
                id: schedule.id,
                title: schedule.title,
                flowYaml: schedule.flowYaml,
                cadence: schedule.cadence,
                status: requiresAttention ? .needsAttention : (state == .success ? .active : .needsAttention),
                nextRunAt: schedule.nextRunAt,
                lastRunAt: schedule.lastRunAt
            )
        }
        automationStore.saveSchedules(automationSchedules)
        queueDueAutomationIfNeeded()
    }

    private func nextAutomationScheduleDate(for cadence: AutomationScheduleCadence, from date: Date = .now) -> Date {
        let component: Calendar.Component = cadence == .daily ? .day : .weekOfYear
        return Calendar.current.date(byAdding: component, value: 1, to: date) ?? date
    }

    private func automationScheduleTitle(for flowYaml: String) -> String {
        let parsedTitle = flowYaml
            .split(separator: "\n")
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .first { !$0.isEmpty && !$0.hasPrefix("appId:") && !$0.hasPrefix("steps:") }
        return parsedTitle?.replacingOccurrences(of: "- ", with: "").capitalized
            ?? L10n.t("flow_runner_workspace_automations")
    }

    func persistModelCatalog() {
        modelCatalogStore.saveCatalog(
            OperatorModelCatalogSnapshot(
                providerOptions: providerOptions,
                providerDisplayNames: providerDisplayNames,
                providerSupportsBaseUrlOverride: Array(providerSupportsBaseUrlOverride).sorted(),
                modelProvider: loadedModelOptionsProvider,
                modelDescriptors: modelDescriptors,
                modelOptions: modelOptions,
                modelSourceOptions: modelSourceOptions,
                providerState: providerState,
                providerMessage: providerMessage,
                modelListState: modelListState,
                modelListMessage: modelListMessage
            )
        )
    }

    func refreshLocalizedDefaults() {
        if providerOptions.isEmpty && providerState == .idle {
            providerMessage = L10n.t("flow_runner_provider_not_loaded")
        }
        if modelOptions.isEmpty && modelListState == .idle {
            modelListMessage = L10n.t("flow_runner_model_list_not_loaded")
        }
        if pullJobId == nil && pullState == .idle {
            pullMessage = L10n.t("flow_runner_pull_not_started")
        }
        if chatReply.isEmpty && chatState == .idle {
            chatStateMessage = L10n.t("flow_runner_chat_ready")
        }
        if deviceAiCorrelationId.isEmpty && deviceAiState == .idle {
            deviceAiStateMessage = L10n.t("flow_runner_device_ai_idle")
        }
        ensureSeededConversation()
    }

    func resolvedModelRefreshProvider(
        afterLoading providerIds: [String],
        preferredProvider: String?
    ) -> String? {
        let normalizedProviders = providerIds
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
        if let preferredProvider = preferredProvider?.trimmedOrNil,
           normalizedProviders.contains(preferredProvider) {
            return preferredProvider
        }
        if let selectedProvider = selectedProvider.trimmedOrNil,
           normalizedProviders.contains(selectedProvider) {
            return selectedProvider
        }
        if let cachedProvider = loadedModelOptionsProvider.trimmedOrNil,
           normalizedProviders.contains(cachedProvider) {
            return cachedProvider
        }
        return nil
    }

    func providerDisplayName(for providerId: String) -> String {
        let normalized = providerId.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalized.isEmpty else {
            return ""
        }
        return providerDisplayNames[normalized]?.trimmingCharacters(in: .whitespacesAndNewlines).nonEmpty ?? normalized
    }

    func modelDisplayName(for modelId: String) -> String {
        let normalized = modelId.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalized.isEmpty else {
            return ""
        }
        return modelDescriptors.first(where: { $0.id == normalized })?.resolvedLabel ?? normalized
    }

    /// Whether the active chat model supports image input (vision).
    var supportsImageInput: Bool {
        activeChatDescriptor?.supportsImageInput == true || activeChatDescriptor?.supportsImageGeneration == true
    }

    /// Whether the active chat model supports raw audio input.
    var supportsAudioInput: Bool {
        activeChatDescriptor?.supportsAudioInput == true
    }

    private var activeChatDescriptor: AiModelDescriptor? {
        let normalized = selectedModel.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalized.isEmpty else { return nil }
        return modelDescriptors.first { $0.id.caseInsensitiveCompare(normalized) == .orderedSame }
    }

    func providerProfiles(for providerId: String) -> [OperatorProviderProfile] {
        let normalizedProviderId = providerId.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalizedProviderId.isEmpty else {
            return []
        }
        return providerProfiles.filter { $0.providerId.caseInsensitiveCompare(normalizedProviderId) == .orderedSame }
    }

    func activeProviderProfileId(for providerId: String) -> String {
        let normalizedProviderId = providerId.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalizedProviderId.isEmpty else {
            return "default"
        }
        if let activeProfileId = activeProviderProfileIds[normalizedProviderId]?.trimmingCharacters(in: .whitespacesAndNewlines),
           !activeProfileId.isEmpty {
            return activeProfileId
        }
        return providerProfiles(for: normalizedProviderId).first?.profileId ?? "default"
    }

    func activeProviderProfile(for providerId: String) -> OperatorProviderProfile? {
        let profileId = activeProviderProfileId(for: providerId)
        return providerProfiles(for: providerId).first { $0.profileId.caseInsensitiveCompare(profileId) == .orderedSame }
    }

    func setSelectedProviderProfile(_ profileId: String) {
        let providerId = selectedProvider.trimmingCharacters(in: .whitespacesAndNewlines)
        let normalizedProfileId = profileId.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !providerId.isEmpty, !normalizedProfileId.isEmpty else {
            return
        }
        activeProviderProfileIds[providerId] = normalizedProfileId
        if let profile = activeProviderProfile(for: providerId) {
            selectedProviderProfileId = profile.profileId
            selectedProviderProfileLabel = profile.displayName
            providerBaseURL = profile.baseUrl
        } else {
            selectedProviderProfileId = normalizedProfileId
        }
        providerApiKey = credentialStore.providerApiKey(providerId: providerId, profileId: normalizedProfileId) ?? ""
        providerApiKeySnapshot = credentialStore.providerApiKeySnapshot(providerId: providerId, profileId: normalizedProfileId)
    }

    func providerApiKeyForActiveProfile(providerId: String) -> String? {
        credentialStore.providerApiKey(
            providerId: providerId,
            profileId: activeProviderProfileId(for: providerId)
        )?.trimmedOrNil
    }

    func selectedProviderSupportsEndpointOverride() -> Bool {
        providerSupportsBaseUrlOverride.contains(selectedProvider.trimmingCharacters(in: .whitespacesAndNewlines))
    }

    func runtimeAssignment(for usage: OperatorRuntimeUsage) -> OperatorRuntimeAssignment {
        runtimeAssignments.assignment(for: usage)
    }

    func setRuntimeAssignmentProvider(_ provider: String, for usage: OperatorRuntimeUsage) {
        let normalizedProvider = provider.trimmingCharacters(in: .whitespacesAndNewlines)
        if usage == .chat {
            if selectedProvider != normalizedProvider {
                selectedProvider = normalizedProvider
                selectedModel = ""
                modelDescriptors = []
                modelOptions = []
                loadedModelOptionsProvider = ""
                modelListState = .idle
                modelListMessage = L10n.t("flow_runner_model_list_refresh_needed")
            }
            return
        }
        let nextAssignment = runtimeAssignments.assignment(for: usage).with(provider: normalizedProvider, model: "")
        guard runtimeAssignments.assignment(for: usage) != nextAssignment else {
            return
        }
        runtimeAssignments = runtimeAssignments.replacing(usage, with: nextAssignment)
    }

    func setRuntimeAssignmentModel(_ model: String, for usage: OperatorRuntimeUsage) {
        let normalizedModel = model.trimmingCharacters(in: .whitespacesAndNewlines)
        if usage == .chat {
            selectedModel = normalizedModel
            return
        }
        let nextAssignment = runtimeAssignments.assignment(for: usage).with(model: normalizedModel)
        guard runtimeAssignments.assignment(for: usage) != nextAssignment else {
            return
        }
        runtimeAssignments = runtimeAssignments.replacing(usage, with: nextAssignment)
    }

    func setRuntimeAssignmentSource(_ source: String, for usage: OperatorRuntimeUsage) {
        let resolvedSource = modelSourceOptions.resolveModelSourceId(
            candidate: source,
            fallback: runtimeAssignments.assignment(for: usage).source,
            canonicalFallback: controlPlaneConfig.defaultModelSource
        )
        if usage == .chat {
            modelSource = resolvedSource
            return
        }
        let nextAssignment = runtimeAssignments.assignment(for: usage).with(source: resolvedSource)
        guard runtimeAssignments.assignment(for: usage) != nextAssignment else {
            return
        }
        runtimeAssignments = runtimeAssignments.replacing(usage, with: nextAssignment)
    }

    private static func loadThemeOverride() -> OperatorThemeOverride {
        guard let raw = UserDefaults.standard.string(forKey: themeOverrideUserDefaultsKey),
              let override = OperatorThemeOverride(rawValue: raw) else {
            return .system
        }
        return override
    }

    private func persistThemeOverride() {
        UserDefaults.standard.set(themeOverride.rawValue, forKey: Self.themeOverrideUserDefaultsKey)
    }

    private static func loadDictationLocale() -> String {
        UserDefaults.standard.string(forKey: dictationLocaleUserDefaultsKey) ?? ""
    }

    private func persistDictationLocale() {
        UserDefaults.standard.set(dictationLocaleIdentifier, forKey: Self.dictationLocaleUserDefaultsKey)
    }

    private func persistPreferences() {
        preferencesStore.savePreferences(
            OperatorPreferences(
                operatorLanguageCode: operatorLanguageCode,
                controlPlaneBaseURL: controlPlaneBaseURL,
                runtimeAssignments: runtimeAssignments,
                providerProfiles: providerProfiles,
                activeProviderProfileIds: activeProviderProfileIds,
                modelSource: modelSource,
                pullSource: pullSource,
                pullTimeoutMsText: pullTimeoutMsText,
                providerBaseURL: providerBaseURL,
                chatRequestTts: chatRequestTts,
                chatSpeechInputMimeType: chatSpeechInputMimeType,
                chatSpeechInputData: chatSpeechInputData,
                chatTtsOutputMimeType: chatTtsOutputMimeType,
                chatTtsVoice: chatTtsVoice,
                deviceAiModelRef: deviceAiModelRef,
                deviceAiModelRevision: deviceAiModelRevision,
                deviceAiModelFileName: deviceAiModelFileName,
                deviceAiExpectedSha256: deviceAiExpectedSha256,
                appId: appId
            )
        )
    }

    private func syncSelectedProviderProfile() {
        let providerId = selectedProvider.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !providerId.isEmpty else {
            selectedProviderProfileId = ""
            selectedProviderProfileLabel = ""
            providerBaseURL = ""
            providerApiKey = ""
            providerApiKeyDraft = ""
            providerApiKeySnapshot = credentialStore.snapshot(for: .providerApiKey)
            return
        }

        let profileId = activeProviderProfileId(for: providerId)
        let profile = activeProviderProfile(for: providerId)
        selectedProviderProfileId = profileId
        selectedProviderProfileLabel = profile?.displayName ?? profileId
        providerBaseURL = profile?.baseUrl ?? ""
        providerApiKey = credentialStore.providerApiKey(providerId: providerId, profileId: profileId) ?? ""
        providerApiKeyDraft = ""
        providerApiKeySnapshot = credentialStore.providerApiKeySnapshot(providerId: providerId, profileId: profileId)
    }

    private func syncActiveConversationBinding() {
        guard let index = conversationThreads.firstIndex(where: { $0.id == activeConversationId }) else {
            return
        }
        conversationThreads[index].binding = ConversationRuntimeBinding(
            provider: selectedProvider,
            model: selectedModel,
            modelSource: modelSource
        )
        persistConversationThreads()
    }

    private func syncChatRuntimeAssignment() {
        let nextAssignment = OperatorRuntimeAssignment(
            provider: selectedProvider,
            model: selectedModel,
            source: modelSource
        )
        if runtimeAssignments.chat == nextAssignment {
            return
        }
        runtimeAssignments = runtimeAssignments.replacing(.chat, with: nextAssignment)
    }

    private func persistActiveConversation() {
        guard let index = conversationThreads.firstIndex(where: { $0.id == activeConversationId }) else {
            return
        }
        conversationThreads[index].entries = conversationEntries.map(OperatorConversationArchiveEntry.init(entry:))
        persistConversationThreads()
    }

    private func persistConversationThreads() {
        conversationStore.saveThreads(conversationThreads)
    }

    private static func resolveDefaultAppId() -> String {
        let environment = ProcessInfo.processInfo.environment
        if let environmentAppId = environment[deviceAiProtocolAppIdEnvironmentKey]?.trimmedOrNil {
            return environmentAppId
        }
        if let bundleAppId = Bundle.main.bundleIdentifier?.trimmedOrNil {
            return bundleAppId
        }
        return ""
    }
}

enum L10n {
    private final class OverrideLanguageCodeStore: @unchecked Sendable {
        private let lock = NSLock()
        private var value: String?

        func set(_ nextValue: String?) {
            lock.lock()
            defer { lock.unlock() }
            value = nextValue
        }

        func get() -> String? {
            lock.lock()
            defer { lock.unlock() }
            return value
        }
    }

    static let baseBundle = Bundle.module
    private static let overrideStore = OverrideLanguageCodeStore()

    static func setOverrideLanguageCode(_ languageCode: String?) {
        overrideStore.set(languageCode)
    }

    static func t(_ key: String, _ arguments: CVarArg...) -> String {
        let overrideLanguageCode = overrideStore.get()
        let fallback = NSLocalizedString(key, tableName: nil, bundle: baseBundle, value: key, comment: "")
        let localized = NSLocalizedString(
            key,
            tableName: nil,
            bundle: bundle(for: overrideLanguageCode),
            value: fallback,
            comment: ""
        )
        guard !arguments.isEmpty else {
            return localized
        }
        return String(format: localized, locale: locale(for: overrideLanguageCode), arguments: arguments)
    }

    private static func bundle(for languageCode: String?) -> Bundle {
        guard let languageCode, !languageCode.isEmpty else {
            return baseBundle
        }
        if let path = baseBundle.path(forResource: languageCode, ofType: "lproj"),
           let localizedBundle = Bundle(path: path) {
            return localizedBundle
        }
        if let baseLanguage = languageCode.split(separator: "-").first,
           let path = baseBundle.path(forResource: String(baseLanguage), ofType: "lproj"),
           let localizedBundle = Bundle(path: path) {
            return localizedBundle
        }
        return baseBundle
    }

    private static func locale(for languageCode: String?) -> Locale {
        guard let languageCode, !languageCode.isEmpty else {
            return .autoupdatingCurrent
        }
        return Locale(identifier: languageCode)
    }
}

// Branded component structs (BaoEdgePanel, BaoEdgeChip, BaoEdgeField, BaoEdgeInputStyle,
// BaoEdgePrimaryButton, BaoEdgeSecondaryButton, BaoEdgeStatusCard, BaoEdgeTimelineBubble,
// BaoEdgeFloatingChatBubble) are defined in BaoEdgeComponents.swift.

// FlowExecutionState.accentColor and .localizedOperatorLabel are now in BaoEdgeComponents.swift.
// OperatorConversationRole.accent/.background and OperatorConversationEntry layout helpers
// are also in BaoEdgeComponents.swift.

/// SwiftUI shell for running YAML flows and operator chat on iOS.
public struct FlowRunnerView: View {
    @State private var viewModel = FlowRunnerViewModel()
    @State private var selectedArea: OperatorWorkspaceArea = .chat
    @State private var selectedRuntimeUsage: OperatorRuntimeUsage = .chat
    @State private var selectedModelsSection: OperatorModelsSection = .catalog
    @State private var selectedAutomationsSection: OperatorAutomationsSection = .drafts
    @State private var modelCatalogQuery = ""
    @State private var pickerQuery = ""
    @State private var activeSearchSheet: OperatorSearchSheet?
    @State private var showAutomationEditor = false
    @State private var showTosSheet = false
    @State private var showOssLicensesSheet = false
    @State private var hasHandledLaunchChatPrompt = false
    #if os(iOS)
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    #endif
    @Environment(\.colorScheme) private var colorScheme
    @Environment(\.scenePhase) private var scenePhase
    private let controlPlaneConfig: ControlPlaneRuntimeConfig = .shared
    private let controlPlaneClient: ControlPlaneAPIClient =
        URLSessionControlPlaneAPIClient(requestTimeoutSeconds: ControlPlaneRuntimeConfig.shared.requestTimeoutSeconds)
    private let nativeChatInterceptor: OperatorNativeChatInterceptor
    private let driverAdapter: DefaultDriverAdapter
    private let deviceAiProtocolRunner: DeviceAiProtocolRunner
    private let launchConfiguration: OperatorWorkspaceLaunchConfiguration

    public init() {
        let adapter = DefaultDriverAdapter()
        let launchConfiguration = OperatorWorkspaceLaunchConfiguration.fromEnvironment()
        self.launchConfiguration = launchConfiguration
        self.nativeChatInterceptor = OperatorNativeChatInterceptor()
        self.driverAdapter = adapter
        self.deviceAiProtocolRunner = DeviceAiProtocolRunner(config: .shared, driverAdapter: adapter)
        _selectedArea = State(initialValue: launchConfiguration.initialArea ?? .chat)
    }

    public var body: some View {
        Group {
            if usesSidebarShell {
                sidebarShell
            } else {
                tabShell
            }
        }
        .alert(L10n.t("flow_runner_confirm_flow_execution"), isPresented: $viewModel.showSafetyAlert) {
            Button(L10n.t("flow_runner_run_flow"), role: .destructive) {
                if let flow = viewModel.pendingFlow {
                    viewModel.pendingFlow = nil
                    executeFlow(flow)
                }
            }
            Button(L10n.t("flow_runner_cancel"), role: .cancel) {
                viewModel.pendingFlow = nil
            }
        } message: {
            Text(viewModel.safetyAlertReason)
        }
        .task {
            applyOperatorLanguage()
            viewModel.ensureSeededConversation()
            loadProviders(reloadModelsFor: viewModel.selectedProvider.trimmedOrNil)
            scheduleLaunchChatPromptIfNeeded()
        }
        .task {
            while !Task.isCancelled {
                viewModel.queueDueAutomationIfNeeded()
                try? await Task.sleep(nanoseconds: 15_000_000_000)
            }
        }
        .task(id: viewModel.pendingScheduledAutomation?.id) {
            guard let schedule = viewModel.pendingScheduledAutomation else {
                return
            }
            viewModel.beginScheduledAutomation(schedule.id)
            do {
                let flow = try FlowYamlParser.parse(schedule.flowYaml)
                requestFlowExecution(flow, scheduledScheduleId: schedule.id)
            } catch {
                let displayMessage = L10n.t("flow_runner_request_failed")
                viewModel.recordAutomationRun(
                    title: L10n.t("flow_runner_workspace_automations"),
                    detail: displayMessage,
                    state: .errorNonRetryable
                )
                viewModel.appendConversation(
                    role: .warning,
                    title: L10n.t("flow_runner_workspace_automations"),
                    body: displayMessage,
                    state: .errorNonRetryable
                )
                viewModel.completeScheduledAutomation(
                    schedule.id,
                    state: .errorNonRetryable,
                    requiresAttention: true
                )
            }
        }
        .onChange(of: viewModel.selectedProvider) { _, selectedProvider in
            if !selectedProvider.isEmpty
                && (viewModel.modelOptions.isEmpty || viewModel.loadedModelOptionsProvider != selectedProvider) {
                loadModels(forProvider: selectedProvider, usage: .chat)
            }
        }
        .onChange(of: scenePhase, initial: true) { _, nextPhase in
            if nextPhase == .active {
                viewModel.queueDueAutomationIfNeeded()
            }
        }
        .onChange(of: selectedRuntimeUsage) { _, nextUsage in
            let assignment = viewModel.runtimeAssignment(for: nextUsage)
            if let provider = assignment.provider.trimmedOrNil,
               viewModel.loadedModelOptionsProvider != provider {
                loadModels(forProvider: provider, usage: nextUsage)
            }
        }
        .onChange(of: selectedArea) { _, nextArea in
            if nextArea == .chat,
               let provider = viewModel.selectedProvider.trimmedOrNil,
               viewModel.loadedModelOptionsProvider != provider {
                loadModels(forProvider: provider, usage: .chat)
            }
        }
        .onChange(of: viewModel.operatorLanguageCode) { _, _ in
            applyOperatorLanguage()
        }
        .sheet(isPresented: $showAutomationEditor) {
            automationEditorSheet
                .preferredColorScheme(viewModel.themeOverride.resolvedColorScheme)
        }
        .sheet(item: $activeSearchSheet) { sheet in
            searchablePickerSheet(for: sheet)
                .preferredColorScheme(viewModel.themeOverride.resolvedColorScheme)
        }
        .sheet(isPresented: $showTosSheet) {
            tosSafariSheet
                .preferredColorScheme(viewModel.themeOverride.resolvedColorScheme)
        }
        .sheet(isPresented: $showOssLicensesSheet) {
            ossLicensesSafariSheet
                .preferredColorScheme(viewModel.themeOverride.resolvedColorScheme)
        }
        .environment(\.locale, selectedLanguage.locale)
        .preferredColorScheme(viewModel.themeOverride.resolvedColorScheme)
    }

    @MainActor
    private func scheduleLaunchChatPromptIfNeeded() {
        guard !hasHandledLaunchChatPrompt,
              let launchPrompt = launchConfiguration.initialChatPrompt?.trimmedOrNil else {
            return
        }

        hasHandledLaunchChatPrompt = true
        selectedArea = .chat
        viewModel.chatMessage = launchPrompt

        guard launchConfiguration.autoSendInitialChatPrompt else {
            return
        }

        let delayNs = UInt64(launchConfiguration.initialChatAutoSendDelayMs) * 1_000_000
        Task { @MainActor in
            if delayNs > 0 {
                try? await Task.sleep(nanoseconds: delayNs)
            }
            guard viewModel.chatMessage.trimmedOrNil != nil else {
                return
            }
            sendChat()
        }
    }

    private var languageOptions: [OperatorLanguageOption] {
        OperatorLanguageOption.catalog()
    }

    private var filteredLanguageOptions: [OperatorLanguageOption] {
        let needle = pickerQuery.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !needle.isEmpty else {
            return languageOptions
        }
        return languageOptions.filter { option in
            option.label.localizedCaseInsensitiveContains(needle)
                || option.id.localizedCaseInsensitiveContains(needle)
        }
    }

    private var selectedLanguage: OperatorLanguageOption {
        OperatorLanguageOption.resolve(viewModel.operatorLanguageCode)
    }

    private var usesSidebarShell: Bool {
        #if os(iOS)
        return horizontalSizeClass == .regular
        #else
        return true
        #endif
    }

    private var operatorBackground: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return LinearGradient(
            colors: [colors.background, colors.surface, colors.background],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
        .ignoresSafeArea()
    }

    private var sidebarShell: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return NavigationSplitView {
            List {
                ForEach(OperatorWorkspaceArea.allCases) { area in
                    Button {
                        selectedArea = area
                    } label: {
                        Label(area.localizedTitle, systemImage: area.systemImageName)
                            .foregroundStyle(area == selectedArea ? colors.primary : colors.onSurface)
                    }
                    .buttonStyle(.plain)
                    .listRowBackground(
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .fill(area == selectedArea ? colors.primary.opacity(0.12) : Color.clear)
                    )
                }
            }
            .scrollContentBackground(.hidden)
            .background(operatorBackground)
            .navigationTitle(L10n.t("flow_runner_title"))
        } content: {
            areaNavigationView(for: selectedArea)
        } detail: {
            if shouldShowOperatorUtilityPane(for: selectedArea) {
                operatorShellUtilityPane
                    .frame(minWidth: 320, idealWidth: 320, maxWidth: 320)
            }
        }
    }

    private var runtimeUtilitySummaryLabel: String {
        let provider = viewModel.providerDisplayName(for: viewModel.selectedProvider)
        let model = viewModel.selectedModel.isEmpty
            ? L10n.t("flow_runner_runtime_not_set")
            : viewModel.modelDisplayName(for: viewModel.selectedModel)
        let providerLabel = provider.isEmpty ? L10n.t("flow_runner_runtime_not_set") : provider
        return "\(providerLabel) · \(model)"
    }

    private var operatorShellUtilityPane: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                BaoEdgePanel(title: L10n.t("flow_runner_utility_runtime_title")) {
                    VStack(alignment: .leading, spacing: 12) {
                        Button {
                            activeSearchSheet = .runtimeModel(.chat)
                        } label: {
                            HStack(spacing: 8) {
                                Image(systemName: "cpu")
                                    .foregroundStyle(colors.primary)
                                Text(runtimeUtilitySummaryLabel)
                                    .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                                    .foregroundStyle(colors.onSurface)
                                    .lineLimit(1)
                                Spacer(minLength: 4)
                                Image(systemName: "chevron.right")
                                    .foregroundStyle(colors.onSurfaceVariant)
                            }
                            .frame(minHeight: 44)
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel(Text(L10n.t("flow_runner_utility_change_runtime")))
                        .accessibilityHint(Text(L10n.t("flow_runner_utility_runtime_title")))
                    }
                }
                BaoEdgePanel(title: L10n.t("flow_runner_utility_status_title")) {
                    VStack(alignment: .leading, spacing: 12) {
                        BaoEdgeStatusCard(
                            title: L10n.t("flow_runner_workspace_automations"),
                            detail: viewModel.isRunning ? L10n.t("flow_runner_running_flow") : L10n.t("flow_runner_automation_history_empty"),
                            state: viewModel.isRunning ? .loading : .idle,
                            actionTitle: "",
                            actionDisabled: true,
                            action: {}
                        )
                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_workspace_models")) {
                            viewModel.selectedSettingsSection = .ai
                            selectedArea = .models
                        }
                    }
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 16)
        }
        .scrollContentBackground(.hidden)
        .background(operatorBackground)
    }

    private var tabShell: some View {
        TabView(selection: $selectedArea) {
            ForEach(OperatorWorkspaceArea.allCases) { area in
                areaNavigationView(for: area)
                    .tabItem {
                        Label(area.localizedTitle, systemImage: area.systemImageName)
                    }
                    .accessibilityIdentifier("operator-tab-\(area.rawValue)")
                    .tag(area)
            }
        }
    }

    private func areaNavigationView(for area: OperatorWorkspaceArea) -> some View {
        NavigationStack {
            ZStack {
                operatorBackground
                operatorWorkspaceContent(for: area)
            }
            .baoEdgeHiddenNavBar()
            .safeAreaInset(edge: .top, spacing: 0) {
                operatorWorkspaceTopBar(for: area)
            }
            .accessibilityIdentifier("operator-area-\(area.rawValue)")
        }
    }

    @ViewBuilder
    private func operatorWorkspaceTopBar(for area: OperatorWorkspaceArea) -> some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        VStack(spacing: 0) {
            HStack(alignment: .center, spacing: 12) {
                HStack(spacing: 10) {
                    BaoEdgeLogoView(size: 18, color: colors.primary)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(L10n.t("flow_runner_title"))
                            .font(BaoEdgeTheme.Typography.headline())
                            .foregroundStyle(colors.onSurface)
                            .lineLimit(1)
                        Text(area.localizedTitle)
                            .font(BaoEdgeTheme.Typography.caption())
                            .foregroundStyle(colors.onSurfaceVariant)
                            .lineLimit(1)
                    }
                }

                Spacer(minLength: 0)

                if area == .chat {
                    chatWorkspaceTopBarControls
                } else if shouldShowOperatorToolbarPrimaryAction(for: area) {
                    workspaceToolbarActions(for: area)
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 8)
            .padding(.bottom, 10)
        }
        .background(
            LinearGradient(
                colors: [colors.background.opacity(0.98), colors.surface.opacity(0.94)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .overlay(alignment: .bottom) {
            Rectangle()
                .fill(colors.primary.opacity(0.16))
                .frame(height: 1)
        }
    }

    private var chatWorkspaceTopBarControls: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return HStack(spacing: 10) {
            Menu {
                if viewModel.conversationThreads.isEmpty {
                    Button(L10n.t("flow_runner_new_thread")) {
                        viewModel.createConversation()
                    }
                } else {
                    ForEach(viewModel.conversationThreads) { thread in
                        Button {
                            viewModel.selectConversation(id: thread.id)
                        } label: {
                            if thread.id == viewModel.activeConversationId {
                                Label(thread.title, systemImage: "checkmark")
                            } else {
                                Text(thread.title)
                            }
                        }
                    }
                }
            } label: {
                HStack(spacing: 8) {
                    Image(systemName: "bubble.left.and.bubble.right.fill")
                        .font(BaoEdgeTheme.Typography.code(size: 13, weight: .semibold))
                    Text(activeConversationThreadLabel)
                        .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                        .lineLimit(1)
                }
                .foregroundStyle(viewModel.activeConversationId.isEmpty ? colors.onSurfaceVariant : colors.primary)
                .padding(.horizontal, 12)
                .padding(.vertical, 10)
                .frame(maxWidth: 168, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .fill(colors.surface.opacity(0.94))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .stroke(colors.primary.opacity(0.22), lineWidth: 1)
                )
            }
            .accessibilityLabel(L10n.t("flow_runner_thread_selector"))

            if let runtimeLabel = activeConversationRuntimeLabel {
                Text(runtimeLabel)
                    .font(BaoEdgeTheme.Typography.caption2(weight: .medium))
                    .foregroundStyle(colors.onSurfaceVariant)
                    .lineLimit(1)
                    .frame(maxWidth: usesSidebarShell ? 160 : 104, alignment: .trailing)
            }

            Menu {
                Button {
                    viewModel.createConversation()
                } label: {
                    Label(L10n.t("flow_runner_new_thread"), systemImage: "square.and.pencil")
                }

                Button(role: .destructive) {
                    viewModel.clearActiveConversationHistory()
                } label: {
                    Label(L10n.t("flow_runner_clear_conversation"), systemImage: "trash")
                }

                Button {
                    activeSearchSheet = .runtimeModel(.chat)
                } label: {
                    Label(L10n.t("flow_runner_utility_change_runtime"), systemImage: "slider.horizontal.3")
                }

                Button {
                    selectedArea = .models
                } label: {
                    Label(L10n.t("flow_runner_workspace_models"), systemImage: "cpu")
                }
            } label: {
                Image(systemName: "ellipsis")
                    .font(BaoEdgeTheme.Typography.headline(size: 18))
                    .foregroundStyle(colors.primary)
                    .frame(width: 44, height: 44)
                    .background(Circle().fill(colors.surface.opacity(0.94)))
                    .overlay(Circle().stroke(colors.primary.opacity(0.24), lineWidth: 1))
            }
            .accessibilityLabel(L10n.t("flow_runner_thread_menu"))
        }
    }

    private var activeConversationThreadLabel: String {
        viewModel.conversationThreads.first(where: { $0.id == viewModel.activeConversationId })?.title
            ?? L10n.t("flow_runner_new_thread")
    }

    private var activeConversationRuntimeLabel: String? {
        let provider = viewModel.providerDisplayName(for: viewModel.selectedProvider).trimmingCharacters(in: .whitespacesAndNewlines)
        let model = viewModel.modelDisplayName(for: viewModel.selectedModel).trimmingCharacters(in: .whitespacesAndNewlines)

        guard !provider.isEmpty, !model.isEmpty else {
            return nil
        }

        return "\(provider) · \(model)"
    }

    @ViewBuilder
    private func operatorWorkspaceContent(for area: OperatorWorkspaceArea) -> some View {
        switch area {
        case .chat:
            OperatorChatWorkspaceView(ctx: workspaceContext)
        case .automations:
            automationsWorkspace
        case .models:
            modelsWorkspace
        case .settings:
            settingsWorkspace
        }
    }

    private var workspaceContext: OperatorWorkspaceContext {
        OperatorWorkspaceContext(
            viewModel: viewModel,
            selectedArea: $selectedArea,
            composerMode: Binding(get: { viewModel.composerMode }, set: { viewModel.composerMode = $0 }),
            chatPickedImages: Binding(get: { viewModel.chatPickedImages }, set: { viewModel.chatPickedImages = $0 }),
            selectedModelsSection: $selectedModelsSection,
            selectedAutomationsSection: $selectedAutomationsSection,
            selectedRuntimeUsage: $selectedRuntimeUsage,
            activeSearchSheet: $activeSearchSheet,
            showAutomationEditor: $showAutomationEditor,
            modelCatalogQuery: $modelCatalogQuery,
            pickerQuery: $pickerQuery,
            onLoadProviders: { loadProviders(reloadModelsFor: $0) },
            onLoadModels: loadModels,
            onSendChat: sendChat,
            onRunAutomation: runAutomationDraft,
            onRequestFlowExecution: { requestFlowExecution($0) },
            onStartModelPull: startModelPull,
            onRetryModelPull: retryModelPull,
            onRunDeviceAiProtocol: runDeviceAiProtocol,
            onRefreshModelPullHistory: { await refreshModelPullHistory() },
            onClearDeviceAiArtifact: clearDeviceAiArtifact,
            onResetAutomationDraft: resetAutomationDraft,
            currentControlPlaneBaseURL: currentControlPlaneBaseURL,
            assignmentProviderLabel: { assignmentProviderLabel(for: $0) },
            assignmentModelLabel: { assignmentModelLabel(for: $0) },
            selectedConnectionProfileLabel: selectedConnectionProfileLabel,
            providerSupportsEndpointOverride: providerSupportsEndpointOverride,
            filteredSearchOptions: filteredSearchOptions,
            selectedSearchOptionId: selectedSearchOptionId,
            applySearchSelection: applySearchSelection,
            searchSheetTitle: searchSheetTitle,
            searchPlaceholder: searchPlaceholder,
            accentColorForPullStatus: { accentColor(for: $0) },
            resolvedPullModelPlaceholder: resolvedPullModelPlaceholder,
            resolvedPullModelHint: resolvedPullModelHint,
            normalizedPullModelRef: { normalizedPullModelRef },
            filteredModelCatalogOptions: { filteredModelCatalogOptions }
        )
    }

    private var automationsWorkspace: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                Picker(L10n.t("flow_runner_workspace_automations"), selection: $selectedAutomationsSection) {
                    ForEach(OperatorAutomationsSection.allCases) { section in
                        Label(section.localizedTitle, systemImage: section.systemImageName)
                            .tag(section)
                    }
                }
                .pickerStyle(.segmented)
                switch selectedAutomationsSection {
                case .drafts:
                    automationWorkspacePanel
                case .runs:
                    automationHistoryPanel
                case .schedules:
                    automationSchedulesPanel
                case .approvals:
                    automationEmptyPanel(for: selectedAutomationsSection)
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)
            .padding(.bottom, 28)
        }
    }

    private var modelsWorkspace: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                Picker(L10n.t("flow_runner_workspace_models"), selection: $selectedModelsSection) {
                    ForEach(OperatorModelsSection.allCases) { section in
                        Text(section.localizedTitle).tag(section)
                    }
                }
                .pickerStyle(.segmented)
                switch selectedModelsSection {
                case .ready:
                    modelReadinessPanel
                case .downloads:
                    modelOperationsPanel
                case .catalog:
                    modelCatalogPanel
                case .artifacts:
                    if hasDeviceAiArtifactSummary {
                        deviceAiArtifactPanel
                    } else {
                        modelArtifactsEmptyPanel
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)
            .padding(.bottom, 28)
        }
    }

    private var settingsWorkspace: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                Picker(L10n.t("flow_runner_workspace_settings"), selection: $viewModel.selectedSettingsSection) {
                    ForEach(OperatorSettingsSection.allCases) { section in
                        Text(section.localizedTitle).tag(section)
                    }
                }
                .pickerStyle(.segmented)
                if viewModel.selectedSettingsSection == .general {
                    generalSettingsPanel
                } else {
                    aiSettingsPanel
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)
            .padding(.bottom, 28)
        }
    }

    private var automationWorkspacePanel: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return BaoEdgePanel(
            title: L10n.t("flow_runner_workspace_automations"),
            subtitle: L10n.t("flow_runner_workspace_automations_subtitle")
        ) {
            VStack(alignment: .leading, spacing: 12) {
                BaoEdgeField(title: L10n.t("flow_runner_app_id")) {
                    TextField(L10n.t("flow_runner_app_id"), text: $viewModel.appId)
                        .textFieldStyle(BaoEdgeInputStyle())
                        .baoEdgeNoAutocapitalize()
                        .autocorrectionDisabled()
                }
                VStack(alignment: .leading, spacing: 8) {
                    BaoEdgeRevealingText(L10n.t("flow_runner_automation_chat_hint"))
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(colors.onSurfaceVariant)
                        .accessibilityHint(L10n.t("flow_runner_automation_chat_hint"))
                    Text(L10n.t("flow_runner_automation_runtime_note"))
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(colors.onSurfaceVariant)
                }
                VStack(alignment: .leading, spacing: 10) {
                    Text(L10n.t("flow_runner_automation_draft_summary"))
                        .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                        .foregroundStyle(colors.primary.opacity(0.92))
                    Text(L10n.t("flow_runner_automation_draft_lines", automationDraftLineCount))
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(colors.onSurfaceVariant)
                    Text(L10n.t("flow_runner_automation_draft_advanced_only"))
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(colors.onSurface)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(14)
                        .background(
                            RoundedRectangle(cornerRadius: 18, style: .continuous)
                                .fill(colors.surface.opacity(0.94))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 18, style: .continuous)
                                .stroke(colors.primary.opacity(0.24), lineWidth: 1)
                        )
                }
                ViewThatFits(in: .horizontal) {
                    HStack(alignment: .top, spacing: 10) {
                        BaoEdgePrimaryButton(title: L10n.t("flow_runner_open_automation_editor")) {
                            showAutomationEditor = true
                        }
                        .fixedSize(horizontal: false, vertical: true)
                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_workspace_chat")) {
                            selectedArea = .chat
                        }
                        .fixedSize(horizontal: false, vertical: true)
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        BaoEdgePrimaryButton(title: L10n.t("flow_runner_open_automation_editor")) {
                            showAutomationEditor = true
                        }
                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_workspace_chat")) {
                            selectedArea = .chat
                        }
                    }
                }
                ViewThatFits(in: .horizontal) {
                    HStack(alignment: .top, spacing: 10) {
                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_automation_schedule_daily")) {
                            viewModel.createAutomationSchedule(cadence: .daily)
                            selectedAutomationsSection = .schedules
                        }
                        .disabled(automationDraftIsEmpty)
                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_automation_schedule_weekly")) {
                            viewModel.createAutomationSchedule(cadence: .weekly)
                            selectedAutomationsSection = .schedules
                        }
                        .disabled(automationDraftIsEmpty)
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_automation_schedule_daily")) {
                            viewModel.createAutomationSchedule(cadence: .daily)
                            selectedAutomationsSection = .schedules
                        }
                        .disabled(automationDraftIsEmpty)
                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_automation_schedule_weekly")) {
                            viewModel.createAutomationSchedule(cadence: .weekly)
                            selectedAutomationsSection = .schedules
                        }
                        .disabled(automationDraftIsEmpty)
                    }
                }
                if viewModel.isRunning {
                    ProgressView()
                        .tint(colors.primary)
                }
                Text(viewModel.resultText)
                    .font(BaoEdgeTheme.Typography.caption())
                    .foregroundStyle(flowStateColor)
            }
        }
    }

    private var automationHistoryPanel: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return BaoEdgePanel(
            title: L10n.t("flow_runner_automation_history_title"),
            subtitle: L10n.t("flow_runner_workspace_automations_subtitle")
        ) {
            if viewModel.automationHistory.isEmpty {
                Text(L10n.t("flow_runner_automation_history_empty"))
                    .font(BaoEdgeTheme.Typography.caption())
                    .foregroundStyle(colors.onSurfaceVariant)
            } else {
                VStack(alignment: .leading, spacing: 12) {
                    ForEach(viewModel.automationHistory) { record in
                        VStack(alignment: .leading, spacing: 8) {
                            ViewThatFits(in: .horizontal) {
                                HStack(alignment: .top, spacing: 10) {
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text(record.title)
                                            .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                                            .foregroundStyle(colors.onSurface)
                                        Text(record.detail)
                                            .font(BaoEdgeTheme.Typography.caption())
                                            .foregroundStyle(colors.onSurfaceVariant)
                                    }
                                    Spacer(minLength: 8)
                                    BaoEdgeChip(label: record.state.localizedOperatorLabel, accent: record.state.accentColor)
                                }

                                VStack(alignment: .leading, spacing: 8) {
                                    Text(record.title)
                                        .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                                        .foregroundStyle(colors.onSurface)
                                    Text(record.detail)
                                        .font(BaoEdgeTheme.Typography.caption())
                                        .foregroundStyle(colors.onSurfaceVariant)
                                    BaoEdgeChip(label: record.state.localizedOperatorLabel, accent: record.state.accentColor)
                                }
                            }
                            Text(record.timestamp.formatted(date: .abbreviated, time: .shortened))
                                .font(BaoEdgeTheme.Typography.caption2(weight: .medium))
                                .foregroundStyle(colors.onSurfaceVariant.opacity(0.78))
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(14)
                        .background(
                            RoundedRectangle(cornerRadius: 22, style: .continuous)
                                .fill(record.state.accentColor.opacity(0.1))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 22, style: .continuous)
                                .stroke(record.state.accentColor.opacity(0.24), lineWidth: 1)
                        )
                    }
                }
            }
        }
    }

    private var automationSchedulesPanel: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return BaoEdgePanel(
            title: L10n.t("flow_runner_automations_section_schedules"),
            subtitle: L10n.t("flow_runner_workspace_automations_subtitle")
        ) {
            VStack(alignment: .leading, spacing: 12) {
                Text(L10n.t("flow_runner_automation_schedule_disclaimer"))
                    .font(BaoEdgeTheme.Typography.caption())
                    .foregroundStyle(colors.onSurfaceVariant)

                if viewModel.automationSchedules.isEmpty {
                    Text(L10n.t("flow_runner_automations_schedules_empty"))
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(colors.onSurfaceVariant)
                } else {
                    VStack(alignment: .leading, spacing: 12) {
                        ForEach(viewModel.automationSchedules) { schedule in
                            VStack(alignment: .leading, spacing: 10) {
                                ViewThatFits(in: .horizontal) {
                                    HStack(alignment: .top, spacing: 10) {
                                        VStack(alignment: .leading, spacing: 4) {
                                            Text(schedule.title)
                                                .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                                                .foregroundStyle(colors.onSurface)
                                            Text(
                                                L10n.t(
                                                    "flow_runner_automation_schedule_next_run",
                                                    schedule.nextRunAt.formatted(date: .abbreviated, time: .shortened)
                                                )
                                            )
                                            .font(BaoEdgeTheme.Typography.caption())
                                            .foregroundStyle(colors.onSurfaceVariant)
                                        }
                                        Spacer(minLength: 8)
                                        BaoEdgeChip(
                                            label: localizedScheduleStatus(schedule.status),
                                            accent: scheduleStatusState(schedule.status).accentColor
                                        )
                                    }

                                    VStack(alignment: .leading, spacing: 8) {
                                        Text(schedule.title)
                                            .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                                            .foregroundStyle(colors.onSurface)
                                        Text(
                                            L10n.t(
                                                "flow_runner_automation_schedule_next_run",
                                                schedule.nextRunAt.formatted(date: .abbreviated, time: .shortened)
                                            )
                                        )
                                        .font(BaoEdgeTheme.Typography.caption())
                                        .foregroundStyle(colors.onSurfaceVariant)
                                        BaoEdgeChip(
                                            label: localizedScheduleStatus(schedule.status),
                                            accent: scheduleStatusState(schedule.status).accentColor
                                        )
                                    }
                                }

                                BaoEdgeSecondaryButton(
                                    title: schedule.status == .active
                                        ? L10n.t("flow_runner_automation_schedule_pause")
                                        : L10n.t("flow_runner_automation_schedule_resume")
                                ) {
                                    viewModel.toggleAutomationSchedule(schedule.id)
                                }
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(14)
                            .background(
                                RoundedRectangle(cornerRadius: 22, style: .continuous)
                                    .fill(scheduleStatusState(schedule.status).accentColor.opacity(0.1))
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: 22, style: .continuous)
                                    .stroke(scheduleStatusState(schedule.status).accentColor.opacity(0.24), lineWidth: 1)
                            )
                        }
                    }
                }
            }
        }
    }

    private func automationEmptyPanel(for section: OperatorAutomationsSection) -> some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return BaoEdgePanel(
            title: section.localizedTitle,
            subtitle: L10n.t("flow_runner_workspace_automations_subtitle")
        ) {
            VStack(alignment: .leading, spacing: 10) {
                Text(section.localizedEmptyDetail)
                    .font(BaoEdgeTheme.Typography.caption())
                    .foregroundStyle(colors.onSurfaceVariant)
                if section == .schedules {
                    Text(L10n.t("flow_runner_automation_schedule_disclaimer"))
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(colors.onSurfaceVariant)
                }
            }
        }
    }

    private func localizedScheduleStatus(_ status: AutomationScheduleStatus) -> String {
        switch status {
        case .active:
            return L10n.t("flow_runner_automation_schedule_status_active")
        case .paused:
            return L10n.t("flow_runner_automation_schedule_status_paused")
        case .needsAttention:
            return L10n.t("flow_runner_automation_schedule_status_attention")
        }
    }

    private func scheduleStatusState(_ status: AutomationScheduleStatus) -> FlowExecutionState {
        switch status {
        case .active:
            return .success
        case .paused:
            return .idle
        case .needsAttention:
            return .errorRetryable
        }
    }

    private var modelReadinessPanel: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return BaoEdgePanel(
            title: L10n.t("flow_runner_workspace_models"),
            subtitle: L10n.t("flow_runner_workspace_models_subtitle")
        ) {
            VStack(alignment: .leading, spacing: 12) {
                if !viewModel.modelOptions.isEmpty {
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 10) {
                            ForEach(viewModel.modelOptions, id: \.self) { model in
                                BaoEdgeChip(
                                    label: model,
                                    accent: model == viewModel.selectedModel ? colors.primary : colors.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
                if !viewModel.providerMessage.isEmpty {
                    Text(viewModel.providerMessage)
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(viewModel.providerState.accentColor)
                }
                if !viewModel.modelListMessage.isEmpty {
                    Text(viewModel.modelListMessage)
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(viewModel.modelListState.accentColor)
                }
            }
        }
    }

    private var modelOperationsPanel: some View {
        BaoEdgePanel(
            title: L10n.t("flow_runner_model_pull_title"),
            subtitle: L10n.t("flow_runner_device_ai_subtitle")
        ) {
            VStack(alignment: .leading, spacing: 12) {
                statusGrid
                modelPullHistoryPanel
                runtimeSourceAdminFields
                deviceAiAdminFields
            }
        }
        .task(id: viewModel.controlPlaneBaseURL) {
            await refreshModelPullHistory()
        }
    }

    private var generalSettingsPanel: some View {
        VStack(alignment: .leading, spacing: 18) {
            appearanceSettingsCard
            languageSettingsCard
            voiceInputSettingsCard
            legalAndAboutCard
        }
    }

    private var voiceInputSettingsCard: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return BaoEdgePanel(
            title: L10n.t("flow_runner_settings_voice_input_title")
        ) {
            VStack(alignment: .leading, spacing: 10) {
                if dictationAvailable && !dictationLocaleOptions.isEmpty {
                    searchablePickerField(
                        title: L10n.t("flow_runner_settings_dictation_language"),
                        selectedLabel: selectedDictationLocaleLabel,
                        accessibilityHint: L10n.t("flow_runner_settings_dictation_language_hint")
                    ) {
                        activeSearchSheet = .dictationLanguage
                    }
                } else {
                    Text(dictationStatusMessage)
                        .font(BaoEdgeTheme.Typography.body())
                        .foregroundStyle(colors.onSurfaceVariant)
                }
            }
        }
    }

    private var dictationAvailable: Bool {
        #if canImport(Speech)
        return SFSpeechRecognizer()?.isAvailable == true
        #else
        return false
        #endif
    }

    private var dictationLocaleOptions: [OperatorSearchOption] {
        #if canImport(Speech)
        return SFSpeechRecognizer.supportedLocales()
            .map { locale in
                let tag = locale.identifier
                let label = locale.localizedString(forIdentifier: tag) ?? tag
                return OperatorSearchOption(id: tag, label: label, detail: nil)
            }
            .sorted { $0.label.localizedCaseInsensitiveCompare($1.label) == .orderedAscending }
        #else
        return []
        #endif
    }

    private var selectedDictationLocaleLabel: String {
        let tag = viewModel.dictationLocaleIdentifier.trimmingCharacters(in: .whitespacesAndNewlines)
        if tag.isEmpty {
            return L10n.t("flow_runner_language_system")
        }
        if let option = dictationLocaleOptions.first(where: { $0.id == tag }) {
            return option.label
        }
        return Locale(identifier: tag).localizedString(forIdentifier: tag) ?? tag
    }

    private var dictationStatusMessage: String {
        L10n.t("flow_runner_settings_dictation_language_unavailable")
    }

    private var appearanceSettingsCard: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return BaoEdgePanel(
            title: L10n.t("flow_runner_settings_appearance_title")
        ) {
            Picker(L10n.t("flow_runner_settings_appearance_title"), selection: $viewModel.themeOverride) {
                ForEach(OperatorThemeOverride.allCases) { option in
                    Text(option.localizedTitle).tag(option)
                }
            }
            .pickerStyle(.segmented)
            .tint(colors.primary)
        }
    }

    private var languageSettingsCard: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return BaoEdgePanel(
            title: L10n.t("flow_runner_settings_language_title")
        ) {
            VStack(alignment: .leading, spacing: 10) {
                BaoEdgeField(title: L10n.t("flow_runner_language")) {
                    Button {
                        activeSearchSheet = .language
                    } label: {
                        HStack {
                            Text(selectedLanguage.label)
                                .foregroundStyle(colors.onSurface)
                            Spacer()
                            Image(systemName: "magnifyingglass")
                                .foregroundStyle(colors.primary)
                        }
                        .padding(.horizontal, 14)
                        .padding(.vertical, 12)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(
                            RoundedRectangle(cornerRadius: 18, style: .continuous)
                                .fill(colors.surface.opacity(0.94))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 18, style: .continuous)
                                .stroke(colors.primary.opacity(0.24), lineWidth: 1)
                        )
                    }
                    .accessibilityHint(L10n.t("flow_runner_settings_language_hint"))
                }
            }
        }
    }

    @ViewBuilder
    private var tosSafariSheet: some View {
        #if canImport(SafariServices) && os(iOS)
        if let url = URL(string: "https://policies.google.com/terms?hl=en-US") {
            SafariView(url: url)
                .ignoresSafeArea()
        }
        #else
        EmptyView()
        #endif
    }

    @ViewBuilder
    private var ossLicensesSafariSheet: some View {
        #if canImport(SafariServices) && os(iOS)
        if let url = URL(string: "https://www.apache.org/licenses/LICENSE-2.0") {
            SafariView(url: url)
                .ignoresSafeArea()
        }
        #else
        EmptyView()
        #endif
    }

    private var legalAndAboutCard: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        return BaoEdgePanel(
            title: L10n.t("flow_runner_settings_about_title"),
            subtitle: L10n.t("flow_runner_settings_about_value", viewModel.appId)
        ) {
            VStack(alignment: .leading, spacing: 10) {
                Button {
                    showTosSheet = true
                } label: {
                    HStack {
                        Text(L10n.t("flow_runner_settings_view_tos"))
                            .foregroundStyle(colors.primary)
                        Spacer()
                        Image(systemName: "arrow.up.right")
                            .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                            .foregroundStyle(colors.primary.opacity(0.8))
                    }
                    .padding(.horizontal, 14)
                    .padding(.vertical, 12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .fill(colors.surface.opacity(0.94))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .stroke(colors.primary.opacity(0.24), lineWidth: 1)
                    )
                }
                .buttonStyle(.plain)
                Button {
                    showOssLicensesSheet = true
                } label: {
                    HStack {
                        Text(L10n.t("flow_runner_settings_oss_licenses"))
                            .foregroundStyle(colors.primary)
                        Spacer()
                        Image(systemName: "arrow.up.right")
                            .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                            .foregroundStyle(colors.primary.opacity(0.8))
                    }
                    .padding(.horizontal, 14)
                    .padding(.vertical, 12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .fill(colors.surface.opacity(0.94))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .stroke(colors.primary.opacity(0.24), lineWidth: 1)
                    )
                }
                .buttonStyle(.plain)
            }
        }
    }

    @ViewBuilder
    private func searchablePickerSheet(for sheet: OperatorSearchSheet) -> some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        NavigationStack {
            List(filteredSearchOptions(for: sheet)) { option in
                searchablePickerRow(
                    option: option,
                    isSelected: selectedSearchOptionId(for: sheet) == option.id
                ) {
                    applySearchSelection(option.id, for: sheet)
                }
            }
            .scrollContentBackground(.hidden)
            .background(colors.background)
            .searchable(text: $pickerQuery, prompt: Text(searchPlaceholder(for: sheet)))
            .navigationTitle(searchSheetTitle(for: sheet))
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(L10n.t("flow_runner_cancel")) {
                        activeSearchSheet = nil
                    }
                }
            }
        }
        .onAppear {
            pickerQuery = ""
        }
        .presentationDetents([.medium, .large])
    }

    private var aiSettingsPanel: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        let assignment = viewModel.runtimeAssignment(for: selectedRuntimeUsage)
        return BaoEdgePanel(
            title: L10n.t("flow_runner_settings_ai"),
            subtitle: L10n.t("flow_runner_settings_ai_subtitle")
        ) {
            VStack(alignment: .leading, spacing: 14) {
                BaoEdgeField(title: L10n.t("flow_runner_runtime_usage")) {
                    Picker(L10n.t("flow_runner_runtime_usage"), selection: $selectedRuntimeUsage) {
                        ForEach(OperatorRuntimeUsage.allCases, id: \.self) { usage in
                            Text(usage.localizedTitle).tag(usage)
                        }
                    }
                    .pickerStyle(.menu)
                    .tint(colors.primary)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .fill(colors.surface.opacity(0.94))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .stroke(colors.primary.opacity(0.24), lineWidth: 1)
                    )
                }
                VStack(alignment: .leading, spacing: 10) {
                    Text(L10n.t("flow_runner_settings_ai_defaults_title"))
                        .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                        .foregroundStyle(colors.primary.opacity(0.92))
                    ForEach(OperatorRuntimeUsage.allCases, id: \.self) { usage in
                        let usageAssignment = viewModel.runtimeAssignment(for: usage)
                        let providerLabel = viewModel.providerDisplayName(for: usageAssignment.provider).nonEmpty
                            ?? L10n.t("flow_runner_runtime_not_set")
                        let modelLabel = usageAssignment.model.nonEmpty ?? L10n.t("flow_runner_runtime_not_set")
                        let sourceLabel = usageAssignment.source.nonEmpty ?? L10n.t("flow_runner_runtime_not_set")
                        VStack(alignment: .leading, spacing: 6) {
                            Text(usage.localizedTitle)
                                .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                                .foregroundStyle(colors.onSurface)
                            BaoEdgeChip(
                                label: "\(providerLabel) · \(modelLabel)",
                                accent: usageAssignment.provider.isEmpty ? colors.onSurfaceVariant : colors.primary
                            )
                            .accessibilityLabel(Text("\(usage.localizedTitle): \(providerLabel), \(modelLabel)"))
                            .accessibilityHint(Text(sourceLabel))
                        }
                    }
                }
                Text(L10n.t("flow_runner_settings_ai_assignment_section"))
                    .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                    .foregroundStyle(colors.primary.opacity(0.92))
                searchablePickerField(
                    title: L10n.t("flow_runner_capability_provider"),
                    selectedLabel: assignmentProviderLabel(for: assignment.provider)
                ) {
                    activeSearchSheet = .runtimeProvider(selectedRuntimeUsage)
                }
                Text(L10n.t("flow_runner_settings_ai_connection_section"))
                    .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                    .foregroundStyle(BaoEdgeTheme.gold.opacity(0.92))
                searchablePickerField(
                    title: L10n.t("flow_runner_connection_provider"),
                    selectedLabel: assignmentProviderLabel(for: viewModel.selectedProvider)
                ) {
                    activeSearchSheet = .connectionProvider
                }
                if !viewModel.selectedProvider.isEmpty {
                    searchablePickerField(
                        title: L10n.t("flow_runner_provider_profile"),
                        selectedLabel: selectedConnectionProfileLabel(for: viewModel.selectedProvider)
                    ) {
                        activeSearchSheet = .connectionProfile(viewModel.selectedProvider)
                    }
                    BaoEdgeField(title: L10n.t("flow_runner_provider_profile_id")) {
                        TextField(L10n.t("flow_runner_provider_profile_id"), text: $viewModel.selectedProviderProfileId)
                            .textFieldStyle(BaoEdgeInputStyle())
                            .baoEdgeNoAutocapitalize()
                            .autocorrectionDisabled()
                    }
                    BaoEdgeField(title: L10n.t("flow_runner_provider_profile_label")) {
                        TextField(L10n.t("flow_runner_provider_profile_label"), text: $viewModel.selectedProviderProfileLabel)
                            .textFieldStyle(BaoEdgeInputStyle())
                            .baoEdgeNoAutocapitalize()
                            .autocorrectionDisabled()
                    }
                }
                ViewThatFits(in: .horizontal) {
                    HStack(alignment: .top, spacing: 10) {
                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_load_configured_providers"), isDisabled: viewModel.isLoadingProviderRegistry) {
                            loadProviders()
                        }
                        .fixedSize(horizontal: true, vertical: false)
                        BaoEdgeSecondaryButton(
                            title: L10n.t("flow_runner_load_models"),
                            isDisabled: assignment.provider.isEmpty || viewModel.isLoadingModels
                        ) {
                            loadModels(forProvider: assignment.provider, usage: selectedRuntimeUsage)
                        }
                        .fixedSize(horizontal: true, vertical: false)
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_load_configured_providers"), isDisabled: viewModel.isLoadingProviderRegistry) {
                            loadProviders()
                        }
                        BaoEdgeSecondaryButton(
                            title: L10n.t("flow_runner_load_models"),
                            isDisabled: assignment.provider.isEmpty || viewModel.isLoadingModels
                        ) {
                            loadModels(forProvider: assignment.provider, usage: selectedRuntimeUsage)
                        }
                    }
                }
                searchablePickerField(
                    title: L10n.t("flow_runner_model_label"),
                    selectedLabel: assignmentModelLabel(for: assignment.model),
                    accessibilityHint: L10n.t("flow_runner_provider_setup_hint")
                ) {
                    activeSearchSheet = .runtimeModel(selectedRuntimeUsage)
                }
                if !viewModel.providerMessage.isEmpty {
                    Text(viewModel.providerMessage)
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(viewModel.providerState.accentColor)
                }
                BaoEdgeField(title: L10n.t("flow_runner_control_plane_base_url")) {
                    TextField(L10n.t("flow_runner_control_plane_base_url"), text: $viewModel.controlPlaneBaseURL)
                        .textFieldStyle(BaoEdgeInputStyle())
                        .baoEdgeNoAutocapitalize()
                        .autocorrectionDisabled()
                        .accessibilityHint(L10n.t("flow_runner_control_plane_hint"))
                }
                if !assignment.provider.isEmpty && providerSupportsEndpointOverride(for: assignment.provider) {
                    BaoEdgeField(title: L10n.t("flow_runner_provider_base_url_optional")) {
                        TextField(L10n.t("flow_runner_provider_base_url_optional"), text: $viewModel.providerBaseURL)
                            .textFieldStyle(BaoEdgeInputStyle())
                            .baoEdgeNoAutocapitalize()
                            .autocorrectionDisabled()
                    }
                }
                runtimeSourceField(
                    title: L10n.t("flow_runner_preferred_source"),
                    selection: Binding(
                        get: { viewModel.runtimeAssignment(for: selectedRuntimeUsage).source },
                        set: { nextSource in
                            viewModel.setRuntimeAssignmentSource(nextSource, for: selectedRuntimeUsage)
                        }
                    )
                )
                voiceDefaultsFields
                credentialPanel(
                    title: L10n.t("flow_runner_provider_api_key"),
                    snapshot: viewModel.providerApiKeySnapshot,
                    text: $viewModel.providerApiKeyDraft,
                    saveAction: {
                        _ = viewModel.saveProviderApiKey()
                    },
                    clearAction: {
                        _ = viewModel.clearProviderApiKey()
                    }
                )
                credentialPanel(
                    title: L10n.t("flow_runner_hugging_face_token"),
                    snapshot: viewModel.huggingFaceTokenSnapshot,
                    text: $viewModel.huggingFaceTokenDraft,
                    saveAction: {
                        _ = viewModel.saveHuggingFaceToken()
                    },
                    clearAction: {
                        _ = viewModel.clearHuggingFaceToken()
                    }
                )
            }
        }
    }

    private func credentialPanel(
        title: String,
        snapshot: CredentialSnapshot,
        text: Binding<String>,
        saveAction: @escaping () -> Void,
        clearAction: @escaping () -> Void
    ) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            BaoEdgeField(title: title) {
                SecureField(title, text: text)
                    .textFieldStyle(BaoEdgeInputStyle())
            }
            Text(
                snapshot.isConfigured
                    ? L10n.t("flow_runner_secret_saved_masked", snapshot.maskedValue)
                    : L10n.t("flow_runner_secret_not_saved")
            )
            .font(BaoEdgeTheme.Typography.caption())
            .foregroundStyle(snapshot.isConfigured ? BaoEdgeTheme.goldLight : BaoEdgeTheme.cream.opacity(0.72))
            ViewThatFits(in: .horizontal) {
                HStack(spacing: 10) {
                    BaoEdgeSecondaryButton(title: L10n.t("flow_runner_save_secret")) {
                        saveAction()
                    }
                    .fixedSize(horizontal: true, vertical: false)
                    BaoEdgeSecondaryButton(title: L10n.t("flow_runner_clear_secret")) {
                        clearAction()
                    }
                    .fixedSize(horizontal: true, vertical: false)
                }

                VStack(alignment: .leading, spacing: 10) {
                    BaoEdgeSecondaryButton(title: L10n.t("flow_runner_save_secret")) {
                        saveAction()
                    }
                    BaoEdgeSecondaryButton(title: L10n.t("flow_runner_clear_secret")) {
                        clearAction()
                    }
                }
            }
        }
    }

    private func actionCard(
        title: String,
        detail: String,
        state: FlowExecutionState,
        actionTitle: String,
        action: @escaping () -> Void
    ) -> some View {
        BaoEdgeStatusCard(
            title: title,
            detail: detail,
            state: state,
            actionTitle: actionTitle,
            action: action
        )
    }

    private var statusGrid: some View {
        VStack(alignment: .leading, spacing: 12) {
            BaoEdgeStatusCard(
                title: L10n.t("flow_runner_model_pull_title"),
                detail: viewModel.pullMessage,
                state: viewModel.pullState,
                actionTitle: L10n.t("flow_runner_start_model_pull"),
                actionDisabled: viewModel.isSubmittingPull || normalizedPullModelRef.isEmpty,
                action: startModelPull
            )
            BaoEdgeField(title: L10n.t("flow_runner_model_reference_placeholder")) {
                TextField(resolvedPullModelPlaceholder(), text: $viewModel.pullModelRef)
                    .textFieldStyle(BaoEdgeInputStyle())
            }
            if let hint = resolvedPullModelHint() {
                BaoEdgeRevealingText(hint)
                    .font(BaoEdgeTheme.Typography.caption())
                    .foregroundStyle(BaoEdgeTheme.cream.opacity(0.7))
                    .accessibilityHint(hint)
            }
            BaoEdgeStatusCard(
                title: L10n.t("flow_runner_device_ai_title"),
                detail: viewModel.deviceAiStateMessage,
                state: viewModel.deviceAiState,
                actionTitle: L10n.t("flow_runner_device_ai_run_protocol"),
                actionDisabled: viewModel.isRunningDeviceAiProtocol,
                action: runDeviceAiProtocol
            )
        }
    }

    private var modelCatalogPanel: some View {
        BaoEdgePanel(
            title: L10n.t("flow_runner_models_section_catalog"),
            subtitle: viewModel.modelListMessage
        ) {
            VStack(alignment: .leading, spacing: 12) {
                BaoEdgeField(title: L10n.t("flow_runner_model_label")) {
                    TextField(L10n.t("flow_runner_model_label"), text: $modelCatalogQuery)
                        .textFieldStyle(BaoEdgeInputStyle())
                        .baoEdgeNoAutocapitalize()
                        .autocorrectionDisabled()
                }
                if filteredModelCatalogOptions.isEmpty {
                    Text(L10n.t("flow_runner_models_none_for_provider"))
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(BaoEdgeTheme.cream.opacity(0.72))
                } else {
                    VStack(alignment: .leading, spacing: 8) {
                        ForEach(filteredModelCatalogOptions, id: \.self) { model in
                            Button {
                                viewModel.setRuntimeAssignmentModel(model, for: .chat)
                            } label: {
                                HStack(spacing: 10) {
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text(viewModel.modelDisplayName(for: model))
                                            .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                                            .foregroundStyle(BaoEdgeTheme.ivory)
                                        Text(model)
                                            .font(BaoEdgeTheme.Typography.code(size: 11, weight: .regular))
                                            .foregroundStyle(BaoEdgeTheme.cream.opacity(0.58))
                                        Text(viewModel.providerDisplayName(for: viewModel.selectedProvider))
                                            .font(BaoEdgeTheme.Typography.caption())
                                            .foregroundStyle(BaoEdgeTheme.cream.opacity(0.72))
                                    }
                                    Spacer(minLength: 8)
                                    if model == viewModel.selectedModel {
                                        BaoEdgeChip(label: L10n.t("flow_runner_runtime_usage_chat"), accent: BaoEdgeTheme.gold)
                                    }
                                }
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(14)
                                .background(
                                    RoundedRectangle(cornerRadius: 22, style: .continuous)
                                        .fill(model == viewModel.selectedModel ? BaoEdgeTheme.gold.opacity(0.1) : BaoEdgeTheme.black.opacity(0.72))
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: 22, style: .continuous)
                                        .stroke((model == viewModel.selectedModel ? BaoEdgeTheme.gold : BaoEdgeTheme.cream).opacity(0.24), lineWidth: 1)
                                )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }
            }
        }
    }

    private var hasDeviceAiArtifactSummary: Bool {
        !viewModel.deviceAiCorrelationId.isEmpty || !viewModel.deviceAiArtifactPath.isEmpty
    }

    private func providerSupportsEndpointOverride(for providerId: String) -> Bool {
        viewModel.providerSupportsBaseUrlOverride.contains(providerId.trimmingCharacters(in: .whitespacesAndNewlines))
    }

    private var deviceAiArtifactPanel: some View {
        BaoEdgePanel(
            title: L10n.t("flow_runner_device_ai_title"),
            subtitle: L10n.t("flow_runner_device_ai_subtitle")
        ) {
            VStack(alignment: .leading, spacing: 10) {
                if !viewModel.deviceAiCorrelationId.isEmpty {
                    Text(L10n.t("flow_runner_device_ai_correlation_id", viewModel.deviceAiCorrelationId))
                        .font(BaoEdgeTheme.Typography.code(size: 12, weight: .regular))
                        .foregroundStyle(BaoEdgeTheme.cream)
                        .textSelection(.enabled)
                }
                if !viewModel.deviceAiArtifactPath.isEmpty {
                    Text(L10n.t("flow_runner_device_ai_artifact_path", viewModel.deviceAiArtifactPath))
                        .font(BaoEdgeTheme.Typography.code(size: 12, weight: .regular))
                        .foregroundStyle(BaoEdgeTheme.cream)
                        .textSelection(.enabled)
                }
                if !viewModel.deviceAiArtifactSha256.isEmpty {
                    Text(L10n.t("flow_runner_device_ai_artifact_sha256", viewModel.deviceAiArtifactSha256))
                        .font(BaoEdgeTheme.Typography.code(size: 12, weight: .regular))
                        .foregroundStyle(BaoEdgeTheme.cream)
                        .textSelection(.enabled)
                }
                if viewModel.deviceAiArtifactSizeBytes > 0 {
                    Text(L10n.t("flow_runner_device_ai_artifact_size_bytes", viewModel.deviceAiArtifactSizeBytes))
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(BaoEdgeTheme.cream.opacity(0.72))
                }
            }
        }
    }

    private var runtimeSourceAdminFields: some View {
        Group {
            runtimeSourceField(
                title: L10n.t("flow_runner_preferred_source"),
                selection: $viewModel.modelSource
            )
            runtimeSourceField(
                title: L10n.t("flow_runner_pull_model_source"),
                selection: $viewModel.pullSource
            )
            BaoEdgeField(title: L10n.t("flow_runner_pull_timeout_ms")) {
                TextField(L10n.t("flow_runner_pull_timeout_ms"), text: $viewModel.pullTimeoutMsText)
                    .textFieldStyle(BaoEdgeInputStyle())
                    .baoEdgeNumberPadKeyboard()
            }
            Toggle(isOn: $viewModel.pullForce) {
                Text(L10n.t("flow_runner_pull_force"))
                    .font(BaoEdgeTheme.Typography.subheadline())
                    .foregroundStyle(BaoEdgeTheme.cream)
            }
            .toggleStyle(.switch)
            .tint(BaoEdgeTheme.gold)
        }
    }

    private var voiceDefaultsFields: some View {
        Group {
            Toggle(isOn: $viewModel.chatRequestTts) {
                Text(L10n.t("flow_runner_chat_request_tts"))
                    .font(BaoEdgeTheme.Typography.subheadline())
                    .foregroundStyle(BaoEdgeTheme.cream)
            }
            .toggleStyle(.switch)
            .tint(BaoEdgeTheme.gold)
            .accessibilityHint(L10n.t("flow_runner_chat_request_tts_hint"))
            BaoEdgeField(title: L10n.t("flow_runner_chat_tts_voice")) {
                TextField(L10n.t("flow_runner_chat_tts_voice"), text: $viewModel.chatTtsVoice)
                    .textFieldStyle(BaoEdgeInputStyle())
            }
        }
    }

    private var deviceAiAdminFields: some View {
        Group {
            BaoEdgeField(title: L10n.t("flow_runner_device_ai_model_ref")) {
                TextField(L10n.t("flow_runner_device_ai_model_ref"), text: $viewModel.deviceAiModelRef)
                    .textFieldStyle(BaoEdgeInputStyle())
                    .baoEdgeNoAutocapitalize()
                    .autocorrectionDisabled()
            }
            BaoEdgeField(title: L10n.t("flow_runner_device_ai_model_revision")) {
                TextField(L10n.t("flow_runner_device_ai_model_revision"), text: $viewModel.deviceAiModelRevision)
                    .textFieldStyle(BaoEdgeInputStyle())
                    .baoEdgeNoAutocapitalize()
                    .autocorrectionDisabled()
            }
            BaoEdgeField(title: L10n.t("flow_runner_device_ai_model_file_name")) {
                TextField(L10n.t("flow_runner_device_ai_model_file_name"), text: $viewModel.deviceAiModelFileName)
                    .textFieldStyle(BaoEdgeInputStyle())
                    .baoEdgeNoAutocapitalize()
                    .autocorrectionDisabled()
            }
            BaoEdgeField(title: L10n.t("flow_runner_device_ai_expected_sha256")) {
                TextField(L10n.t("flow_runner_device_ai_expected_sha256"), text: $viewModel.deviceAiExpectedSha256)
                    .textFieldStyle(BaoEdgeInputStyle())
                    .baoEdgeNoAutocapitalize()
                    .autocorrectionDisabled()
            }
            if viewModel.deviceAiArtifactPath.trimmedOrNil != nil {
                VStack(alignment: .leading, spacing: 8) {
                    Text(L10n.t("flow_runner_device_ai_artifact_title"))
                        .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                        .foregroundStyle(BaoEdgeTheme.gold.opacity(0.92))
                    Text(viewModel.deviceAiArtifactPath)
                        .font(BaoEdgeTheme.Typography.code(size: 12, weight: .medium))
                        .foregroundStyle(BaoEdgeTheme.cream.opacity(0.72))
                    if viewModel.deviceAiArtifactSizeBytes > 0 {
                        Text(L10n.t("flow_runner_device_ai_artifact_size", viewModel.deviceAiArtifactSizeBytes))
                            .font(BaoEdgeTheme.Typography.caption2(weight: .medium))
                            .foregroundStyle(BaoEdgeTheme.cream.opacity(0.6))
                    }
                    BaoEdgeSecondaryButton(title: L10n.t("flow_runner_device_ai_artifact_cleanup")) {
                        clearDeviceAiArtifact()
                    }
                }
            }
        }
    }

    private var modelPullHistoryPanel: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top, spacing: 12) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(L10n.t("flow_runner_pull_history_title"))
                        .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                        .foregroundStyle(BaoEdgeTheme.gold.opacity(0.92))
                    Text(L10n.t("flow_runner_pull_history_subtitle"))
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(BaoEdgeTheme.cream.opacity(0.72))
                }
                Spacer(minLength: 8)
                BaoEdgeSecondaryButton(title: L10n.t("flow_runner_pull_history_refresh"), isDisabled: viewModel.isSubmittingPull || viewModel.isPollingPull) {
                    Task { await refreshModelPullHistory() }
                }
                .fixedSize(horizontal: true, vertical: false)
            }

            if viewModel.modelPullHistory.isEmpty {
                Text(L10n.t("flow_runner_pull_history_empty"))
                    .font(BaoEdgeTheme.Typography.caption())
                    .foregroundStyle(BaoEdgeTheme.cream.opacity(0.72))
            } else {
                VStack(alignment: .leading, spacing: 10) {
                    ForEach(Array(viewModel.modelPullHistory.prefix(6))) { entry in
                        VStack(alignment: .leading, spacing: 8) {
                            HStack(alignment: .top, spacing: 10) {
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(entry.requestedModelRef)
                                        .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                                        .foregroundStyle(BaoEdgeTheme.ivory)
                                    Text(L10n.t("flow_runner_pull_history_source_date", entry.source, entry.updatedAt))
                                        .font(BaoEdgeTheme.Typography.caption2(weight: .medium))
                                        .foregroundStyle(BaoEdgeTheme.cream.opacity(0.6))
                                }
                                Spacer(minLength: 8)
                                BaoEdgeChip(label: entry.status.rawValue, accent: accentColor(for: entry.status))
                            }
                            Text(entry.normalizedModelRef)
                                .font(BaoEdgeTheme.Typography.code(size: 12, weight: .medium))
                                .foregroundStyle(BaoEdgeTheme.cream.opacity(0.72))
                            ViewThatFits(in: .horizontal) {
                                HStack(spacing: 8) {
                                    BaoEdgeSecondaryButton(title: L10n.t("flow_runner_pull_history_retry")) {
                                        viewModel.pullModelRef = entry.requestedModelRef
                                        retryModelPull()
                                    }
                                    .fixedSize(horizontal: true, vertical: false)
                                    if let artifactPath = entry.artifactPath?.trimmedOrNil {
                                        Text(artifactPath)
                                            .font(BaoEdgeTheme.Typography.code(size: 11, weight: .medium))
                                            .foregroundStyle(BaoEdgeTheme.cream.opacity(0.6))
                                            .lineLimit(1)
                                    }
                                }

                                VStack(alignment: .leading, spacing: 8) {
                                    BaoEdgeSecondaryButton(title: L10n.t("flow_runner_pull_history_retry")) {
                                        viewModel.pullModelRef = entry.requestedModelRef
                                        retryModelPull()
                                    }
                                    if let artifactPath = entry.artifactPath?.trimmedOrNil {
                                        Text(artifactPath)
                                            .font(BaoEdgeTheme.Typography.code(size: 11, weight: .medium))
                                            .foregroundStyle(BaoEdgeTheme.cream.opacity(0.6))
                                    }
                                }
                            }
                        }
                        .padding(14)
                        .background(
                            RoundedRectangle(cornerRadius: 20, style: .continuous)
                                .fill(BaoEdgeTheme.black.opacity(0.48))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 20, style: .continuous)
                                .stroke(BaoEdgeTheme.gold.opacity(0.16), lineWidth: 1)
                        )
                    }
                }
            }
        }
    }

    @ViewBuilder
    private func runtimeSourceField(title: String, selection: Binding<String>) -> some View {
        BaoEdgeField(title: title) {
            if !viewModel.modelSourceOptions.isEmpty {
                Picker(title, selection: selection) {
                    ForEach(viewModel.modelSourceOptions, id: \.id) { source in
                        Text(source.displayName).tag(source.id)
                    }
                }
                .pickerStyle(.menu)
                .tint(BaoEdgeTheme.gold)
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 18, style: .continuous)
                        .fill(BaoEdgeTheme.black.opacity(0.72))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 18, style: .continuous)
                        .stroke(BaoEdgeTheme.gold.opacity(0.24), lineWidth: 1)
                )
            } else {
                TextField(title, text: selection)
                    .textFieldStyle(BaoEdgeInputStyle())
            }
        }
    }

    private var normalizedPullModelRef: String {
        let typedRef = viewModel.pullModelRef.trimmingCharacters(in: .whitespacesAndNewlines)
        if !typedRef.isEmpty {
            return typedRef
        }
        return viewModel.selectedModel.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private var filteredModelCatalogOptions: [String] {
        let query = modelCatalogQuery.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !query.isEmpty else {
            return viewModel.modelOptions
        }
        return viewModel.modelOptions.filter { model in
            model.localizedCaseInsensitiveContains(query)
        }
    }

    private var automationDraftLineCount: Int {
        viewModel.automationFlowYaml
            .split(whereSeparator: \.isNewline)
            .count
    }

    private var automationDraftIsEmpty: Bool {
        viewModel.automationFlowYaml.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    private var automationDraftPreview: String {
        let trimmed = viewModel.automationFlowYaml.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else {
            return L10n.t("flow_runner_automation_yaml_required")
        }
        return String(trimmed.prefix(280))
    }

    private var modelArtifactsEmptyPanel: some View {
        BaoEdgePanel(
            title: L10n.t("flow_runner_models_section_artifacts"),
            subtitle: L10n.t("flow_runner_device_ai_subtitle")
        ) {
            Text(L10n.t("flow_runner_device_ai_idle"))
                .font(BaoEdgeTheme.Typography.caption())
                .foregroundStyle(BaoEdgeTheme.cream.opacity(0.72))
        }
    }

    private var automationEditorSheet: some View {
        NavigationStack {
            ZStack {
                operatorBackground
                ScrollView {
                    VStack(alignment: .leading, spacing: 18) {
                        BaoEdgePanel(
                            title: L10n.t("flow_runner_automation_editor"),
                            subtitle: L10n.t("flow_runner_automation_editor_subtitle")
                        ) {
                            VStack(alignment: .leading, spacing: 12) {
                                BaoEdgeField(title: L10n.t("flow_runner_automation_yaml")) {
                                    TextEditor(text: $viewModel.automationFlowYaml)
                                        .baoEdgeMultilineInput(minHeight: 260)
                                        .accessibilityLabel(L10n.t("flow_runner_automation_yaml"))
                                }
                                ViewThatFits(in: .horizontal) {
                                    HStack(alignment: .top, spacing: 10) {
                                        BaoEdgePrimaryButton(
                                            title: L10n.t("flow_runner_run_automation"),
                                            isDisabled: viewModel.isRunning,
                                            action: runAutomationDraft
                                        )
                                        .fixedSize(horizontal: false, vertical: true)
                                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_reset_automation_yaml")) {
                                            resetAutomationDraft()
                                        }
                                        .fixedSize(horizontal: false, vertical: true)
                                    }

                                    VStack(alignment: .leading, spacing: 10) {
                                        BaoEdgePrimaryButton(
                                            title: L10n.t("flow_runner_run_automation"),
                                            isDisabled: viewModel.isRunning,
                                            action: runAutomationDraft
                                        )
                                        BaoEdgeSecondaryButton(title: L10n.t("flow_runner_reset_automation_yaml")) {
                                            resetAutomationDraft()
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.top, 16)
                    .padding(.bottom, 28)
                }
            }
            .navigationTitle(L10n.t("flow_runner_automation_editor"))
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(L10n.t("flow_runner_cancel")) {
                        showAutomationEditor = false
                    }
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    private func resetAutomationDraft() {
        viewModel.automationFlowYaml = FlowYamlParser.toYaml(
            FlowV1(appId: viewModel.appId, steps: [.launchApp])
        )
    }

    private func runAutomationDraft() {
        let automationYaml = viewModel.automationFlowYaml.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !automationYaml.isEmpty else {
            viewModel.recordAutomationRun(
                title: L10n.t("flow_runner_workspace_automations"),
                detail: L10n.t("flow_runner_automation_yaml_required"),
                state: .errorNonRetryable
            )
            return
        }

        do {
            let flow = try FlowYamlParser.parse(automationYaml)
            viewModel.recordAutomationRun(
                title: L10n.t("flow_runner_workspace_automations"),
                detail: L10n.t("flow_runner_automation_started", flow.appId),
                state: .loading
            )
            requestFlowExecution(flow)
        } catch {
            let displayMessage = L10n.t("flow_runner_request_failed")
            viewModel.recordAutomationRun(
                title: L10n.t("flow_runner_workspace_automations"),
                detail: displayMessage,
                state: .errorNonRetryable
            )
            viewModel.appendConversation(
                role: .warning,
                title: L10n.t("flow_runner_workspace_automations"),
                body: displayMessage,
                state: .errorNonRetryable
            )
        }
    }

    @ViewBuilder
    private func workspaceToolbarActions(for area: OperatorWorkspaceArea) -> some View {
        switch area {
        case .chat:
            EmptyView()
        case .automations:
            utilityActionButton(
                title: L10n.t("flow_runner_open_automation_editor"),
                systemImage: "slider.horizontal.3"
            ) {
                showAutomationEditor = true
            }
        case .models:
            utilityActionButton(
                title: L10n.t("flow_runner_workspace_settings"),
                systemImage: "slider.horizontal.3"
            ) {
                viewModel.selectedSettingsSection = .ai
                selectedArea = .settings
            }
        case .settings:
            EmptyView()
        }
    }

    private func utilityActionButton(
        title: String,
        systemImage: String,
        role: ButtonRole? = nil,
        isDisabled: Bool = false,
        action: @escaping () -> Void
    ) -> some View {
        let accent: Color = role == .destructive ? BaoEdgeTheme.ruby.opacity(0.82) : BaoEdgeTheme.gold

        return Button(role: role, action: action) {
            Label(title, systemImage: systemImage)
                .labelStyle(.iconOnly)
                .frame(width: 44, height: 44)
                .contentShape(Circle())
        }
        .buttonStyle(.plain)
        .foregroundStyle(isDisabled ? BaoEdgeTheme.cream.opacity(0.4) : accent)
        .background(
            Circle()
                .fill(BaoEdgeTheme.black.opacity(0.72))
        )
        .overlay(
            Circle()
                .stroke(accent.opacity(isDisabled ? 0.18 : 0.34), lineWidth: 1)
        )
        .disabled(isDisabled)
        .accessibilityLabel(title)
    }

    private func resolvedChatStateMessage(for envelope: AiChatEnvelope) -> String {
        if let mismatchMessage = envelope.mismatches.joined(separator: " ").trimmedOrNil {
            return mismatchMessage
        }

        switch envelope.state {
        case .idle:
            return L10n.t("flow_runner_chat_ready")
        case .loading:
            return L10n.t("flow_runner_chat_sending")
        case .success:
            return L10n.t("flow_runner_chat_response_ready")
        case .empty:
            return L10n.t("flow_runner_chat_reply_empty")
        case .errorRetryable, .errorNonRetryable, .unauthorized:
            return L10n.t("flow_runner_request_failed")
        }
    }

    private func searchablePickerField(
        title: String,
        selectedLabel: String,
        accessibilityHint: String? = nil,
        action: @escaping () -> Void
    ) -> some View {
        BaoEdgeField(title: title) {
            Button(action: action) {
                HStack {
                    Text(selectedLabel)
                        .foregroundStyle(BaoEdgeTheme.ivory)
                    Spacer()
                    Image(systemName: "magnifyingglass")
                        .foregroundStyle(BaoEdgeTheme.gold)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 18, style: .continuous)
                        .fill(BaoEdgeTheme.black.opacity(0.72))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 18, style: .continuous)
                        .stroke(BaoEdgeTheme.gold.opacity(0.24), lineWidth: 1)
                )
            }
            .buttonStyle(.plain)
            .accessibilityLabel(title)
            .accessibilityHint(accessibilityHint ?? "")
        }
    }

    @ViewBuilder
    private func searchablePickerRow(
        option: OperatorSearchOption,
        isSelected: Bool,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(option.label)
                        .foregroundStyle(BaoEdgeTheme.ivory)
                    Spacer()
                    if isSelected {
                        Image(systemName: "checkmark")
                            .foregroundStyle(BaoEdgeTheme.gold)
                    }
                }
                if let detail = option.detail, !detail.isEmpty {
                    Text(detail)
                        .font(BaoEdgeTheme.Typography.caption())
                        .foregroundStyle(BaoEdgeTheme.cream.opacity(0.72))
                }
            }
        }
        .listRowBackground(BaoEdgeTheme.charcoal)
        .accessibilityLabel(option.label)
        .accessibilityAddTraits(isSelected ? [.isSelected] : [])
    }

    private func filteredSearchOptions(for sheet: OperatorSearchSheet) -> [OperatorSearchOption] {
        let options = searchOptions(for: sheet)
        let needle = pickerQuery.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !needle.isEmpty else {
            return options
        }
        return options.filter { option in
            option.label.localizedCaseInsensitiveContains(needle)
                || option.id.localizedCaseInsensitiveContains(needle)
                || (option.detail?.localizedCaseInsensitiveContains(needle) ?? false)
        }
    }

    private func searchOptions(for sheet: OperatorSearchSheet) -> [OperatorSearchOption] {
        switch sheet {
        case .language:
            return languageOptions.map { option in
                OperatorSearchOption(
                    id: option.id,
                    label: option.label,
                    detail: option.id == operatorSystemLanguageCode ? nil : option.id
                )
            }
        case .dictationLanguage:
            return [OperatorSearchOption(id: "", label: L10n.t("flow_runner_language_system"), detail: nil)]
                + dictationLocaleOptions
        case .connectionProvider:
            return viewModel.providerOptions.map { provider in
                OperatorSearchOption(
                    id: provider,
                    label: viewModel.providerDisplayName(for: provider),
                    detail: viewModel.activeProviderProfile(for: provider)?.displayName
                )
            }
        case let .connectionProfile(providerId):
            return viewModel.providerProfiles(for: providerId).map { profile in
                OperatorSearchOption(
                    id: profile.profileId,
                    label: profile.displayName,
                    detail: profile.baseUrl.trimmedOrNil
                )
            }
        case .runtimeProvider:
            return [OperatorSearchOption(id: "", label: L10n.t("flow_runner_runtime_not_set"), detail: nil)]
                + viewModel.providerOptions.map { provider in
                    OperatorSearchOption(
                        id: provider,
                        label: viewModel.providerDisplayName(for: provider),
                        detail: viewModel.activeProviderProfile(for: provider)?.displayName
                    )
                }
        case let .runtimeModel(usage):
            let assignment = viewModel.runtimeAssignment(for: usage)
            let options = viewModel.loadedModelOptionsProvider == assignment.provider ? viewModel.modelOptions : []
            return [OperatorSearchOption(id: "", label: L10n.t("flow_runner_runtime_not_set"), detail: nil)]
                + options.map { model in
                    OperatorSearchOption(
                        id: model,
                        label: viewModel.modelDisplayName(for: model),
                        detail: model
                    )
                }
        }
    }

    private func selectedSearchOptionId(for sheet: OperatorSearchSheet) -> String {
        switch sheet {
        case .language:
            return selectedLanguage.id
        case .dictationLanguage:
            return viewModel.dictationLocaleIdentifier.trimmingCharacters(in: .whitespacesAndNewlines)
        case .connectionProvider:
            return viewModel.selectedProvider
        case let .connectionProfile(providerId):
            return viewModel.activeProviderProfileId(for: providerId)
        case let .runtimeProvider(usage):
            return viewModel.runtimeAssignment(for: usage).provider
        case let .runtimeModel(usage):
            return viewModel.runtimeAssignment(for: usage).model
        }
    }

    private func searchSheetTitle(for sheet: OperatorSearchSheet) -> String {
        switch sheet {
        case .language:
            return L10n.t("flow_runner_language")
        case .dictationLanguage:
            return L10n.t("flow_runner_settings_dictation_language")
        case .connectionProvider, .runtimeProvider:
            return L10n.t("flow_runner_ai_provider")
        case .connectionProfile:
            return L10n.t("flow_runner_provider_profile")
        case .runtimeModel:
            return L10n.t("flow_runner_model_label")
        }
    }

    private func searchPlaceholder(for sheet: OperatorSearchSheet) -> String {
        switch sheet {
        case .language:
            return L10n.t("flow_runner_language_search_placeholder")
        case .dictationLanguage:
            return L10n.t("flow_runner_language_search_placeholder")
        case .connectionProvider, .runtimeProvider:
            return L10n.t("flow_runner_provider_search_placeholder")
        case .connectionProfile:
            return L10n.t("flow_runner_profile_search_placeholder")
        case .runtimeModel:
            return L10n.t("flow_runner_model_search_placeholder")
        }
    }

    private func applySearchSelection(_ value: String, for sheet: OperatorSearchSheet) {
        switch sheet {
        case .language:
            viewModel.operatorLanguageCode = value
        case .dictationLanguage:
            viewModel.dictationLocaleIdentifier = value
        case .connectionProvider:
            viewModel.selectedProvider = value
        case let .connectionProfile(providerId):
            if viewModel.selectedProvider.caseInsensitiveCompare(providerId) != .orderedSame {
                viewModel.selectedProvider = providerId
            }
            viewModel.setSelectedProviderProfile(value)
        case let .runtimeProvider(usage):
            viewModel.setRuntimeAssignmentProvider(value, for: usage)
        case let .runtimeModel(usage):
            viewModel.setRuntimeAssignmentModel(value, for: usage)
        }
        activeSearchSheet = nil
    }

    private func assignmentProviderLabel(for providerId: String) -> String {
        providerId.trimmedOrNil.map(viewModel.providerDisplayName(for:)) ?? L10n.t("flow_runner_runtime_not_set")
    }

    private func assignmentModelLabel(for modelId: String) -> String {
        modelId.trimmedOrNil.map(viewModel.modelDisplayName(for:)) ?? L10n.t("flow_runner_runtime_not_set")
    }

    private func selectedConnectionProfileLabel(for providerId: String) -> String {
        let normalizedProviderId = providerId.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalizedProviderId.isEmpty else {
            return L10n.t("flow_runner_runtime_not_set")
        }
        if viewModel.selectedProvider.caseInsensitiveCompare(normalizedProviderId) == .orderedSame,
           let selectedLabel = viewModel.selectedProviderProfileLabel.trimmedOrNil {
            return selectedLabel
        }
        return viewModel.activeProviderProfile(for: normalizedProviderId)?.displayName
            ?? viewModel.activeProviderProfileId(for: normalizedProviderId)
    }

    private func applyOperatorLanguage() {
        L10n.setOverrideLanguageCode(selectedLanguage.resourceCode)
        viewModel.refreshLocalizedDefaults()
    }

    // MARK: - Safety policy

    /// Evaluate the flow against the safety policy and either run it directly
    /// (when `.allowed`) or surface a confirmation alert (when `.requiresConfirmation`).
    private func requestFlowExecution(_ flow: FlowV1, scheduledScheduleId: String? = nil) {
        let verdict = FlowSafetyPolicy.evaluate(flow)
        switch verdict {
        case .allowed:
            viewModel.appendConversation(
                role: .runtime,
                title: L10n.t("flow_runner_flow_admin"),
                body: L10n.t("flow_runner_run_sample_flow"),
                state: .loading
            )
            executeFlow(flow, scheduledScheduleId: scheduledScheduleId)
        case .requiresConfirmation(let reason):
            viewModel.recordAutomationRun(
                title: L10n.t("flow_runner_workspace_automations"),
                detail: reason,
                state: .errorRetryable
            )
            if let scheduledScheduleId {
                viewModel.completeScheduledAutomation(
                    scheduledScheduleId,
                    state: .errorRetryable,
                    requiresAttention: true
                )
            } else {
                viewModel.pendingFlow = flow
                viewModel.safetyAlertReason = reason
                viewModel.showSafetyAlert = true
            }
            viewModel.appendConversation(
                role: .warning,
                title: L10n.t("flow_runner_flow_admin"),
                body: reason,
                state: .errorRetryable
            )
        case .blocked(let reason):
            viewModel.report = IosDriverReport(
                completedSteps: 0,
                totalSteps: flow.steps.count,
                state: .errorNonRetryable,
                message: L10n.t("flow_runner_safety_blocked", reason),
                correlationId: UUID().uuidString,
                steps: []
            )
            viewModel.appendConversation(
                role: .warning,
                title: L10n.t("flow_runner_flow_admin"),
                body: L10n.t("flow_runner_safety_blocked", reason),
                state: .errorNonRetryable
            )
            viewModel.recordAutomationRun(
                title: L10n.t("flow_runner_workspace_automations"),
                detail: L10n.t("flow_runner_safety_blocked", reason),
                state: .errorNonRetryable
            )
            if let scheduledScheduleId {
                viewModel.completeScheduledAutomation(
                    scheduledScheduleId,
                    state: .errorNonRetryable,
                    requiresAttention: true
                )
            }
        }
    }

    // MARK: - Execution

    @MainActor
    private func executeFlow(_ flow: FlowV1, scheduledScheduleId: String? = nil) {
        viewModel.isRunning = true
        viewModel.recordAutomationRun(
            title: L10n.t("flow_runner_workspace_automations"),
            detail: L10n.t("flow_runner_automation_started", flow.appId),
            state: .loading
        )
        Task { @MainActor in
            let report = driverAdapter.execute(flow: flow, correlationId: UUID().uuidString)
            self.viewModel.report = report
            self.viewModel.isRunning = false
            self.viewModel.recordAutomationRun(
                title: L10n.t("flow_runner_workspace_automations"),
                detail: report.message,
                state: report.state,
                correlationId: report.correlationId
            )
            self.viewModel.appendConversation(
                role: report.state == .success ? .runtime : .warning,
                title: L10n.t("flow_runner_flow_admin"),
                body: report.message,
                state: report.state
            )
            if let scheduledScheduleId {
                self.viewModel.completeScheduledAutomation(
                    scheduledScheduleId,
                    state: report.state,
                    requiresAttention: report.state != .success
                )
            }
        }
    }

    // MARK: - Cloud execution

    private func loadProviders(reloadModelsFor preferredModelProvider: String? = nil) {
        guard let baseURL = currentControlPlaneBaseURL() else {
            viewModel.providerState = .errorNonRetryable
            viewModel.providerMessage = L10n.t("flow_runner_invalid_control_plane_base_url")
            viewModel.appendConversation(
                role: .warning,
                title: L10n.t("flow_runner_control_plane_title"),
                body: viewModel.providerMessage,
                state: viewModel.providerState
            )
            return
        }
        guard !viewModel.isLoadingProviderRegistry else {
            return
        }

        viewModel.isLoadingProviderRegistry = true
        viewModel.providerState = .loading
        viewModel.providerMessage = L10n.t("flow_runner_provider_loading")

        Task { @MainActor in
            defer {
                viewModel.isLoadingProviderRegistry = false
            }
            do {
                let sourceEnvelope = try? await controlPlaneClient.fetchModelSources(baseURL: baseURL)
                let sourceOptions = sourceEnvelope?.data?.sources
                    .filter { !$0.id.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty } ?? []
                let canonicalDefault = sourceOptions.resolveModelSourceId(
                    candidate: (sourceEnvelope?.data?.defaultSource ?? "").trimmingCharacters(in: .whitespacesAndNewlines),
                    fallback: controlPlaneConfig.defaultModelSource,
                    canonicalFallback: controlPlaneConfig.defaultModelSource
                )

                let settings = try await controlPlaneClient.fetchOperatorSettings(baseURL: baseURL)
                let providers = settings.aiSettings.providers
                    .compactMap { descriptor -> OperatorProviderSettingsDescriptor? in
                        let id = descriptor.id.trimmingCharacters(in: .whitespacesAndNewlines)
                        guard !id.isEmpty else {
                            return nil
                        }
                        return OperatorProviderSettingsDescriptor(
                            id: id,
                            displayName: descriptor.displayName.trimmingCharacters(in: .whitespacesAndNewlines).nonEmpty ?? id,
                            source: descriptor.source,
                            requiresKey: descriptor.requiresKey,
                            hasBaseUrlConfig: descriptor.hasBaseUrlConfig,
                            configured: descriptor.configured,
                            credentialState: descriptor.credentialState,
                            maskedKey: descriptor.maskedKey,
                            baseUrl: descriptor.baseUrl,
                            docsUrl: descriptor.docsUrl,
                            defaultModels: descriptor.defaultModels.map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }.filter { !$0.isEmpty },
                            updatedAt: descriptor.updatedAt
                        )
                    }
                viewModel.providerOptions = providers.map(\.id)
                viewModel.providerDisplayNames = Dictionary(uniqueKeysWithValues: providers.map { ($0.id, $0.displayName) })
                viewModel.providerSupportsBaseUrlOverride = Set(providers.filter(\.hasBaseUrlConfig).map(\.id))
                viewModel.modelSourceOptions = sourceOptions
                viewModel.modelSource = sourceOptions.resolveModelSourceId(
                    candidate: viewModel.modelSource,
                    fallback: canonicalDefault,
                    canonicalFallback: controlPlaneConfig.defaultModelSource
                )
                viewModel.pullSource = sourceOptions.resolveModelSourceId(
                    candidate: viewModel.pullSource,
                    fallback: viewModel.modelSource,
                    canonicalFallback: canonicalDefault
                )
                viewModel.providerState = providers.isEmpty ? .empty : .success
                viewModel.providerMessage = providers.isEmpty
                    ? L10n.t("flow_runner_provider_empty")
                    : L10n.t("flow_runner_provider_loaded", providers.count)
                if !viewModel.providerOptions.contains(viewModel.selectedProvider) {
                    viewModel.selectedProvider = providers.first(where: \.configured)?.id ?? ""
                }
                viewModel.appendConversation(
                    role: providers.isEmpty ? .warning : .runtime,
                    title: L10n.t("flow_runner_control_plane_title"),
                    body: viewModel.providerMessage,
                    state: viewModel.providerState
                )
                if let providerToReload = viewModel.resolvedModelRefreshProvider(
                    afterLoading: viewModel.providerOptions,
                    preferredProvider: preferredModelProvider
                ) {
                    loadModels(forProvider: providerToReload, usage: .chat)
                }
                viewModel.persistModelCatalog()
            } catch {
                viewModel.providerState = .errorRetryable
                viewModel.providerMessage = localizedCloudRequestErrorMessage(from: error)
                viewModel.appendConversation(
                    role: .warning,
                    title: L10n.t("flow_runner_control_plane_title"),
                    body: viewModel.providerMessage,
                    state: viewModel.providerState
                )
                viewModel.persistModelCatalog()
            }
        }
    }

    private func loadModels(forProvider provider: String, usage: OperatorRuntimeUsage = .chat) {
        guard let baseURL = currentControlPlaneBaseURL() else {
            viewModel.modelListState = .errorNonRetryable
            viewModel.modelListMessage = L10n.t("flow_runner_invalid_control_plane_base_url")
            return
        }
        let providerValue = provider.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !providerValue.isEmpty else {
            viewModel.modelListState = .errorNonRetryable
            viewModel.modelListMessage = L10n.t("flow_runner_models_select_provider_before_loading")
            return
        }
        guard !viewModel.isLoadingModels else {
            return
        }

        viewModel.isLoadingModels = true
        viewModel.modelListState = .loading
        viewModel.modelListMessage = L10n.t("flow_runner_models_loading_for_provider", providerValue)

        Task { @MainActor in
            defer { viewModel.isLoadingModels = false }
            do {
                let selectedModelHint = usage == .chat
                    ? viewModel.selectedModel.trimmedOrNil
                    : viewModel.runtimeAssignment(for: usage).model.trimmedOrNil
                let catalog = try await controlPlaneClient.fetchModelCatalog(
                    provider: providerValue,
                    selectedModel: selectedModelHint,
                    apiKey: viewModel.providerApiKeyForActiveProfile(providerId: providerValue),
                    baseUrl: viewModel.activeProviderProfile(for: providerValue)?.baseUrl.trimmedOrNil ?? viewModel.providerBaseURL.trimmedOrNil,
                    baseURL: baseURL
                )
                let filteredDescriptors = filterModelCatalog(catalog.models, for: usage)
                let filteredOptions = filteredDescriptors.map(\.id)
                viewModel.modelDescriptors = filteredDescriptors
                viewModel.modelOptions = filteredOptions
                viewModel.loadedModelOptionsProvider = providerValue
                let resolvedModel =
                    catalog.selectedModel?.trimmingCharacters(in: .whitespacesAndNewlines).nonEmpty
                    .flatMap { filteredOptions.contains($0) ? $0 : nil }
                    ?? selectedModelHint.flatMap { filteredOptions.contains($0) ? $0 : nil }
                    ?? filteredOptions.first
                    ?? ""
                viewModel.setRuntimeAssignmentModel(resolvedModel, for: usage)
                viewModel.modelListState = FlowExecutionState(rawValue: catalog.state) ?? .idle
                viewModel.modelListMessage = catalog.message.trimmingCharacters(in: .whitespacesAndNewlines).nonEmpty
                    ?? L10n.t("flow_runner_request_failed")
                if filteredOptions.isEmpty {
                    viewModel.modelListMessage = L10n.t("flow_runner_models_none_for_provider")
                }
                viewModel.appendConversation(
                    role: viewModel.modelListState == .success ? .runtime : .warning,
                    title: L10n.t("flow_runner_model_list"),
                    body: viewModel.modelListMessage,
                    state: viewModel.modelListState
                )
                viewModel.persistModelCatalog()
            } catch {
                viewModel.modelListState = .errorRetryable
                viewModel.modelListMessage = localizedCloudRequestErrorMessage(from: error)
                viewModel.modelDescriptors = []
                viewModel.modelOptions = []
                viewModel.appendConversation(
                    role: .warning,
                    title: L10n.t("flow_runner_model_list"),
                    body: viewModel.modelListMessage,
                    state: viewModel.modelListState
                )
                viewModel.persistModelCatalog()
            }
        }
    }

    private func startModelPull() {
        guard let baseURL = currentControlPlaneBaseURL() else {
            viewModel.pullState = .errorNonRetryable
            viewModel.pullMessage = L10n.t("flow_runner_invalid_control_plane_base_url")
            return
        }
        guard !normalizedPullModelRef.isEmpty else {
            viewModel.pullState = .errorNonRetryable
            viewModel.pullMessage = L10n.t("flow_runner_pull_model_ref_required")
            return
        }
        guard !viewModel.isSubmittingPull else {
            return
        }

        let sourceValue = resolvedPullSource()
        let timeoutMs = resolvedPullTimeout()
        let request = ModelPullRequest(
            modelRef: normalizedPullModelRef,
            source: sourceValue,
            platform: nil,
            force: viewModel.pullForce,
            timeoutMs: timeoutMs,
            correlationId: nil
        )

        viewModel.isSubmittingPull = true
        viewModel.pullState = .loading
        viewModel.pullMessage = L10n.t("flow_runner_pull_submit_request")
        viewModel.appendConversation(
            role: .runtime,
            title: L10n.t("flow_runner_model_pull_title"),
            body: viewModel.pullMessage,
            state: viewModel.pullState
        )
        viewModel.chatReply = ""

        Task { @MainActor in
            do {
                let envelope = try await controlPlaneClient.startModelPull(request, baseURL: baseURL)
                applyModelPullEnvelope(envelope)
                if let jobId = envelope.jobId, !jobId.isEmpty, envelope.state == .loading {
                    pollModelPull(jobId: jobId, baseURL: baseURL)
                } else {
                    viewModel.isSubmittingPull = false
                }
            } catch {
                viewModel.pullState = .errorRetryable
                viewModel.pullMessage = localizedCloudRequestErrorMessage(from: error)
                viewModel.appendConversation(
                    role: .warning,
                    title: L10n.t("flow_runner_model_pull_title"),
                    body: viewModel.pullMessage,
                    state: viewModel.pullState
                )
                viewModel.isSubmittingPull = false
            }
        }
    }

    private func pollModelPull(jobId: String, baseURL: URL) {
        viewModel.isPollingPull = true
        Task { @MainActor in
            defer {
                viewModel.isPollingPull = false
                viewModel.isSubmittingPull = false
            }
            var attempts = 0
            while attempts < pullPollAttempts {
                attempts += 1
                if attempts > 1 {
                    do {
                        try await Task.sleep(for: pullPollInterval)
                    } catch {
                        break
                    }
                }
                do {
                    let envelope = try await controlPlaneClient.pollModelPull(jobId: jobId, baseURL: baseURL)
                    applyModelPullEnvelope(envelope)
                    if isTerminal(envelope.state) {
                        return
                    }
                } catch {
                    viewModel.pullState = .errorRetryable
                    viewModel.pullMessage = localizedCloudRequestErrorMessage(from: error)
                    viewModel.appendConversation(
                        role: .warning,
                        title: L10n.t("flow_runner_model_pull_title"),
                        body: viewModel.pullMessage,
                        state: viewModel.pullState
                    )
                    return
                }
            }
            if !isTerminal(viewModel.pullState) {
                viewModel.pullState = .errorRetryable
                viewModel.pullMessage = L10n.t("flow_runner_pull_job_timeout")
                viewModel.appendConversation(
                    role: .warning,
                    title: L10n.t("flow_runner_model_pull_title"),
                    body: viewModel.pullMessage,
                    state: viewModel.pullState
                )
            }
        }
    }

    private func currentControlPlaneBaseURL() -> URL? {
        let normalizedURL = viewModel.controlPlaneBaseURL.trimmingCharacters(in: .whitespacesAndNewlines)
        return URL(string: normalizedURL)
    }

    private var pullPollInterval: Duration {
        Duration.milliseconds(Int64(controlPlaneConfig.pollIntervalMs))
    }

    private var pullPollAttempts: Int {
        controlPlaneConfig.pollAttempts
    }

    private func retryModelPull() {
        guard !viewModel.isSubmittingPull, !viewModel.isPollingPull else {
            return
        }
        guard let baseURL = currentControlPlaneBaseURL() else {
            viewModel.pullState = .errorNonRetryable
            viewModel.pullMessage = L10n.t("flow_runner_invalid_control_plane_base_url")
            return
        }
        if let jobId = viewModel.pullJobId?.trimmedOrNil {
            pollModelPull(jobId: jobId, baseURL: baseURL)
            return
        }
        startModelPull()
    }

    private func clearDeviceAiArtifact() {
        guard let artifactPath = viewModel.deviceAiArtifactPath.trimmedOrNil else {
            return
        }
        let artifactURL = URL(fileURLWithPath: artifactPath)
        let partialURL = artifactURL.appendingPathExtension("part")
        let fileManager = FileManager.default
        if fileManager.fileExists(atPath: artifactURL.path) {
            try? fileManager.removeItem(at: artifactURL)
        }
        if fileManager.fileExists(atPath: partialURL.path) {
            try? fileManager.removeItem(at: partialURL)
        }
        viewModel.deviceAiArtifactPath = ""
        viewModel.deviceAiArtifactSha256 = ""
        viewModel.deviceAiArtifactSizeBytes = 0
        viewModel.appendConversation(
            role: .runtime,
            title: L10n.t("flow_runner_device_ai_title"),
            body: L10n.t("flow_runner_device_ai_artifact_removed"),
            state: .success
        )
    }

    private func accentColor(for status: CapabilityJobState) -> Color {
        switch status {
        case .queued, .running, .paused:
            return BaoEdgeTheme.gold
        case .succeeded:
            return BaoEdgeTheme.success
        case .failed, .cancelled:
            return BaoEdgeTheme.warning
        }
    }

    private func refreshModelPullHistory() async {
        guard let baseURL = currentControlPlaneBaseURL() else {
            return
        }
        do {
            let response = try await controlPlaneClient.fetchModelPullHistory(limit: 12, baseURL: baseURL)
            viewModel.modelPullHistory = response.jobs.map { job in
                ModelPullHistoryEntry(
                    id: job.id,
                    requestedModelRef: job.payload?.modelRef ?? L10n.t("flow_runner_pull_unknown_model"),
                    normalizedModelRef: job.payload?.normalizedModelRef ?? job.payload?.modelRef ?? L10n.t("flow_runner_pull_unknown_model"),
                    source: job.payload?.source ?? L10n.t("flow_runner_pull_unknown_source"),
                    status: job.status,
                    artifactPath: job.artifactPath,
                    updatedAt: job.updatedAt
                )
            }
        } catch {
            viewModel.modelPullHistory = []
        }
    }

    private func resolvedModelSource() -> String {
        viewModel.modelSourceOptions.resolveModelSourceId(
            candidate: viewModel.modelSource,
            fallback: controlPlaneConfig.defaultModelSource,
            canonicalFallback: controlPlaneConfig.defaultModelSource
        )
    }

    private func resolvedPullSource() -> String {
        viewModel.modelSourceOptions.resolveModelSourceId(
            candidate: viewModel.pullSource,
            fallback: resolvedModelSource(),
            canonicalFallback: controlPlaneConfig.defaultModelSource
        )
    }

    private func resolvedPullModelSourceDescriptor() -> ModelSourceDescriptor? {
        guard let sourceId = viewModel.modelSourceOptions.resolveKnownModelSourceId(resolvedPullSource()) else {
            return nil
        }
        return viewModel.modelSourceOptions.first(where: { $0.id == sourceId })
    }

    private func resolvedPullModelPlaceholder() -> String {
        if let source = resolvedPullModelSourceDescriptor(),
           let placeholder = source.modelRefPlaceholder.trimmedOrNil {
            return placeholder
        }
        return L10n.t("flow_runner_model_reference_placeholder")
    }

    private func resolvedPullModelHint() -> String? {
        guard let source = resolvedPullModelSourceDescriptor() else {
            return nil
        }
        return source.modelRefHint?.trimmedOrNil
    }

    private func resolvedPullTimeout() -> Int {
        guard let trimmed = viewModel.pullTimeoutMsText.trimmedOrNil,
              let timeout = Int(trimmed),
              timeout > 0 else {
            return controlPlaneConfig.defaultPullTimeoutMs
        }
        return timeout
    }

    private func applyModelPullEnvelope(_ envelope: ModelPullEnvelope) {
        if let jobId = envelope.jobId, !jobId.isEmpty {
            viewModel.pullJobId = jobId
        }
        viewModel.pullState = envelope.state
        if let data = envelope.data {
            let requestedModel = data.requestedModelRef
            let normalizedModel = data.normalizedModelRef
            let status = data.status.rawValue
            let elapsed = data.elapsedMs > 0 ? L10n.t("flow_runner_pull_elapsed_ms", data.elapsedMs) : ""
            let trimmedArtifact = data.artifactPath?.trimmingCharacters(in: .whitespacesAndNewlines)
            let artifact = trimmedArtifact?.isEmpty == true ? "" : (trimmedArtifact).flatMap {
                L10n.t("flow_runner_pull_artifact", $0)
            } ?? ""
            viewModel.pullMessage = L10n.t(
                "flow_runner_pull_job_status",
                requestedModel,
                normalizedModel,
                status,
                elapsed,
                artifact
            )
        } else if !envelope.mismatches.isEmpty {
            viewModel.pullMessage = envelope.mismatches.joined(separator: " ")
        } else {
            viewModel.pullMessage = L10n.t("flow_runner_pull_no_payload")
        }

        if isTerminal(envelope.state) {
            viewModel.appendConversation(
                role: envelope.state == .success ? .runtime : .warning,
                title: L10n.t("flow_runner_model_pull_title"),
                body: viewModel.pullMessage,
                state: envelope.state
            )
            Task { await refreshModelPullHistory() }
        }
    }

    private func sendChat() {
        guard !viewModel.isSendingChat else {
            return
        }
        let message = viewModel.chatMessage.trimmedOrNil
        let speechInput = buildCloudSpeechInput()
        let hasImageInput = viewModel.composerMode == .image && viewModel.supportsImageInput && !viewModel.chatPickedImages.isEmpty
        if message == nil && speechInput == nil && !hasImageInput {
            viewModel.chatState = .errorNonRetryable
            viewModel.chatStateMessage = L10n.t("flow_runner_chat_input_missing")
            return
        }
        if let message,
           speechInput == nil,
           let nativeIntentKind = operatorNativeChatIntentKind(for: message, hasAttachedInputs: hasImageInput) {
            handleNativeChatIntent(message: message, kind: nativeIntentKind)
            return
        }
        guard let baseURL = currentControlPlaneBaseURL() else {
            viewModel.chatState = .errorNonRetryable
            viewModel.chatStateMessage = L10n.t("flow_runner_invalid_control_plane_base_url")
            return
        }
        let provider = viewModel.selectedProvider.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !provider.isEmpty else {
            viewModel.chatState = .errorNonRetryable
            viewModel.chatStateMessage = L10n.t("flow_runner_chat_provider_required")
            return
        }
        let model = viewModel.selectedModel.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !model.isEmpty else {
            viewModel.chatState = .errorNonRetryable
            viewModel.chatStateMessage = L10n.t("flow_runner_chat_model_required")
            return
        }

        let imageInput = viewModel.chatPickedImages.isEmpty ? nil : viewModel.chatPickedImages.map {
            AiChatImageInput(mimeType: $0.mimeType, data: $0.data)
        }
        let request = AiChatRequest(
            provider: provider,
            model: model,
            message: message,
            imageInput: imageInput,
            speechInput: speechInput,
            requestTts: viewModel.chatRequestTts ? true : nil,
            ttsOutputMimeType: viewModel.chatTtsOutputMimeType.trimmedOrNil,
            ttsVoice: viewModel.chatTtsVoice.trimmedOrNil,
            apiKey: viewModel.providerApiKeyForActiveProfile(providerId: provider),
            baseUrl: viewModel.activeProviderProfile(for: provider)?.baseUrl.trimmedOrNil ?? viewModel.providerBaseURL.trimmedOrNil
        )
        viewModel.isSendingChat = true
        viewModel.chatState = .loading
        viewModel.chatStateMessage = L10n.t("flow_runner_chat_sending")
        let userBody = message ?? (hasImageInput ? L10n.t("flow_runner_chip_describe_image") : L10n.t("flow_runner_voice_request"))
        viewModel.appendConversation(
            role: .user,
            title: L10n.t("flow_runner_chat"),
            body: userBody,
            state: .success
        )

        Task { @MainActor in
            do {
                let envelope = try await controlPlaneClient.sendChat(request, baseURL: baseURL)
                applyChatEnvelope(envelope)
                viewModel.isSendingChat = false
            } catch {
                viewModel.chatState = .errorRetryable
                viewModel.chatStateMessage = localizedCloudRequestErrorMessage(from: error)
                viewModel.appendConversation(
                    role: .warning,
                    title: L10n.t("flow_runner_chat"),
                    body: viewModel.chatStateMessage,
                    state: viewModel.chatState
                )
                viewModel.isSendingChat = false
            }
        }
    }

    private func handleNativeChatIntent(message: String, kind: OperatorNativeChatIntentKind) {
        viewModel.isSendingChat = true
        viewModel.chatState = .loading
        viewModel.chatStateMessage = switch kind {
        case .calendar:
            L10n.t("flow_runner_native_calendar_running")
        case .appleMacPricing:
            L10n.t("flow_runner_native_pricing_running")
        }
        viewModel.appendConversation(
            role: .user,
            title: L10n.t("flow_runner_chat"),
            body: message,
            state: .success
        )

        Task { @MainActor in
            let response = await nativeChatInterceptor.handleIfNeeded(message: message)
            if let response {
                applyNativeChatResponse(response)
            } else {
                viewModel.chatState = .errorNonRetryable
                viewModel.chatStateMessage = L10n.t("flow_runner_request_failed")
                viewModel.appendConversation(
                    role: .warning,
                    title: L10n.t("flow_runner_chat"),
                    body: viewModel.chatStateMessage,
                    state: viewModel.chatState
                )
            }
            viewModel.isSendingChat = false
        }
    }

    private func applyNativeChatResponse(_ response: OperatorNativeChatHandledResponse) {
        viewModel.chatState = response.state
        viewModel.chatStateMessage = response.stateMessage
        if response.clearsComposer {
            viewModel.chatMessage = ""
            viewModel.chatSpeechInputMimeType = ""
            viewModel.chatSpeechInputData = ""
            viewModel.chatPickedImages = []
        }
        viewModel.appendConversation(
            role: response.role,
            title: response.title,
            body: response.body,
            state: response.state
        )
    }

    private func localizedCloudRequestErrorMessage(from error: Error) -> String {
        guard let controlPlaneError = error as? ControlPlaneClientError else {
            return L10n.t("flow_runner_request_failed")
        }
        let defaultMessage = L10n.t("flow_runner_request_failed")
        switch controlPlaneError {
        case .invalidBaseURL:
            return L10n.t("flow_runner_invalid_control_plane_base_url")
        case .invalidEndpoint,
             .transport,
             .badStatus,
             .missingEnvelope,
             .envelopeDecodeFailure,
             .parseFailure:
            return defaultMessage
        }
    }

    private func buildCloudSpeechInput() -> AiChatAudioPayload? {
        let mimeType = viewModel.chatSpeechInputMimeType.trimmedOrNil
        let data = viewModel.chatSpeechInputData.trimmedOrNil
        if let mimeType, let data {
            return AiChatAudioPayload(mimeType: mimeType, data: data)
        }
        return nil
    }

    private func applyChatEnvelope(_ envelope: AiChatEnvelope) {
        viewModel.chatState = envelope.state
        viewModel.chatStateMessage = resolvedChatStateMessage(for: envelope)
        if let resolution = envelope.data {
            viewModel.chatReply = resolution.reply
            viewModel.chatSpeechTranscript = resolution.speech?.transcript ?? ""
            viewModel.chatTtsMimeType = resolution.tts?.mimeType ?? ""
            viewModel.chatTtsBase64Audio = resolution.tts?.data ?? ""
            if envelope.state == .success {
                viewModel.chatMessage = ""
                viewModel.chatSpeechInputMimeType = ""
                viewModel.chatSpeechInputData = ""
                viewModel.chatPickedImages = []
            }
            let replyBody = resolution.reply.trimmedOrNil ?? L10n.t("flow_runner_chat_reply_empty")
            viewModel.appendConversation(
                role: envelope.state == .success ? .assistant : .warning,
                title: L10n.t("flow_runner_chat_reply"),
                body: replyBody,
                state: envelope.state
            )
            if let transcript = resolution.speech?.transcript.trimmedOrNil {
                viewModel.appendConversation(
                    role: .runtime,
                    title: L10n.t("flow_runner_chat_speech_transcript"),
                    body: transcript,
                    state: envelope.state
                )
            }
            if resolution.tts?.data.trimmedOrNil != nil {
                viewModel.appendConversation(
                    role: .runtime,
                    title: L10n.t("flow_runner_chat_tts_output"),
                    body: L10n.t("flow_runner_tts_ready"),
                    state: envelope.state
                )
            }
        } else if !viewModel.chatStateMessage.isEmpty {
            viewModel.appendConversation(
                role: .warning,
                title: L10n.t("flow_runner_chat"),
                body: viewModel.chatStateMessage,
                state: envelope.state
            )
        }
    }

    private func isTerminal(_ state: FlowExecutionState) -> Bool {
        switch state {
        case .success, .errorRetryable, .errorNonRetryable, .unauthorized:
            return true
        case .idle, .loading, .empty:
            return false
        }
    }

    private var flowStateColor: Color {
        stateColor(viewModel.report == nil ? .idle : viewModel.report!.state)
    }

    private func stateColor(_ state: FlowExecutionState) -> Color {
        state.accentColor
    }

    private func runDeviceAiProtocol() {
        let modelRef = viewModel.deviceAiModelRef.trimmingCharacters(in: .whitespacesAndNewlines)
        let fileName = viewModel.deviceAiModelFileName.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !viewModel.isRunningDeviceAiProtocol else {
            return
        }
        guard !modelRef.isEmpty else {
            viewModel.deviceAiState = .errorNonRetryable
            viewModel.deviceAiStateMessage = L10n.t("flow_runner_device_ai_model_ref_required")
            return
        }
        guard !fileName.isEmpty else {
            viewModel.deviceAiState = .errorNonRetryable
            viewModel.deviceAiStateMessage = L10n.t("flow_runner_device_ai_model_file_name_required")
            return
        }

        let correlationId = UUID().uuidString
        let request = DeviceAiProtocolRequest(
            appId: viewModel.appId,
            modelRef: modelRef,
            revision: viewModel.deviceAiModelRevision.trimmedOrNil ?? "",
            fileName: fileName,
            expectedSha256: viewModel.deviceAiExpectedSha256.trimmedOrNil ?? "",
            token: viewModel.huggingFaceToken.trimmedOrNil ?? "",
            correlationId: correlationId
        )

        resetDeviceAiOutcome(correlationId: correlationId)
        viewModel.deviceAiState = .loading
        viewModel.deviceAiStateMessage = L10n.t("flow_runner_device_ai_running")
        viewModel.isRunningDeviceAiProtocol = true
        viewModel.appendConversation(
            role: .runtime,
            title: L10n.t("flow_runner_device_ai_title"),
            body: viewModel.deviceAiStateMessage,
            state: viewModel.deviceAiState
        )

        Task { @MainActor in
            let outcome = await deviceAiProtocolRunner.run(request: request)
            applyDeviceAiProtocolOutcome(outcome)
            viewModel.isRunningDeviceAiProtocol = false
        }
    }

    private func resetDeviceAiOutcome(correlationId: String) {
        viewModel.deviceAiCorrelationId = correlationId
        viewModel.deviceAiArtifactPath = ""
        viewModel.deviceAiArtifactSha256 = ""
        viewModel.deviceAiArtifactSizeBytes = 0
    }

    private func applyDeviceAiProtocolOutcome(_ outcome: DeviceAiProtocolRunOutcome) {
        let report = outcome.report
        viewModel.deviceAiCorrelationId = report.correlationId
        viewModel.deviceAiArtifactPath = report.artifact?.path ?? ""
        viewModel.deviceAiArtifactSha256 = report.artifact?.sha256 ?? ""
        viewModel.deviceAiArtifactSizeBytes = report.artifact?.sizeBytes ?? 0
        viewModel.deviceAiState = report.state
        viewModel.deviceAiStateMessage = localizedDeviceAiProtocolMessage(report)
        viewModel.appendConversation(
            role: report.state == .success ? .runtime : .warning,
            title: L10n.t("flow_runner_device_ai_title"),
            body: viewModel.deviceAiStateMessage,
            state: report.state
        )
    }

    private func localizedDeviceAiProtocolMessage(_ report: DeviceAiProtocolRunReport) -> String {
        guard let failure = report.failure else {
            return report.state == .success
                ? L10n.t("flow_runner_device_ai_success")
                : L10n.t("flow_runner_device_ai_smoke_failed")
        }

        switch failure.stage {
        case .validation:
            switch failure.code {
            case HuggingFaceModelManagerErrorCode.invalidModelReference.rawValue:
                return L10n.t("flow_runner_device_ai_model_ref_required")
            case HuggingFaceModelManagerErrorCode.invalidFileName.rawValue:
                return L10n.t("flow_runner_device_ai_model_file_name_required")
            case "IOS_DEVICE_AI_APP_ID_REQUIRED":
                return L10n.t("flow_runner_device_ai_app_id_required")
            default:
                return L10n.t("flow_runner_device_ai_download_failed")
            }
        case .download:
            return localizedDeviceAiDownloadFailure(code: failure.code, retryable: failure.retryable)
        case .smoke:
            switch failure.code {
            case "IOS_TARGET_NOT_READY":
                return L10n.t("flow_runner_device_ai_smoke_target_not_ready")
            case "IOS_LAUNCH_FAILED":
                return L10n.t("flow_runner_device_ai_smoke_launch_failed")
            default:
                return L10n.t("flow_runner_device_ai_smoke_failed")
            }
        case .persistence:
            return L10n.t("flow_runner_device_ai_report_write_failed")
        }
    }

    private func localizedDeviceAiDownloadFailure(code: String, retryable: Bool) -> String {
        switch code {
        case HuggingFaceModelManagerErrorCode.invalidModelReference.rawValue:
            return L10n.t("flow_runner_device_ai_invalid_model_ref")
        case HuggingFaceModelManagerErrorCode.invalidFileName.rawValue:
            return L10n.t("flow_runner_device_ai_model_file_name_required")
        case HuggingFaceModelManagerErrorCode.unauthorized.rawValue:
            return L10n.t("flow_runner_device_ai_unauthorized")
        case HuggingFaceModelManagerErrorCode.invalidRevision.rawValue:
            return L10n.t("flow_runner_device_ai_invalid_revision")
        case HuggingFaceModelManagerErrorCode.notFound.rawValue:
            return L10n.t("flow_runner_device_ai_not_found")
        case HuggingFaceModelManagerErrorCode.checksumMismatch.rawValue:
            return L10n.t("flow_runner_device_ai_checksum_mismatch")
        default:
            return retryable
                ? L10n.t("flow_runner_device_ai_download_failed_retryable")
                : L10n.t("flow_runner_device_ai_download_failed")
        }
    }
}

private extension View {
    @ViewBuilder
    func baoEdgeSheetScrollBehavior() -> some View {
        if #available(iOS 16.4, macOS 13.3, tvOS 16.4, *) {
            self.presentationContentInteraction(.scrolls)
        } else {
            self
        }
    }
}

#if canImport(SafariServices) && os(iOS)
private struct SafariView: UIViewControllerRepresentable {
    let url: URL

    func makeUIViewController(context: Context) -> SFSafariViewController {
        SFSafariViewController(url: url)
    }

    func updateUIViewController(_ uiViewController: SFSafariViewController, context: Context) {}
}
#endif

private extension String {
    var nonEmpty: String? {
        isEmpty ? nil : self
    }

    var trimmedOrNil: String? {
        let trimmed = trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? nil : trimmed
    }
}

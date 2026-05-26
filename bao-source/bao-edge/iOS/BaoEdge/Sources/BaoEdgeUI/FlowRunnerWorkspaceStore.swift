import Foundation
import SwiftUI
import BaoEdgeCore
import BaoEdgeDriver

/// Theme override for the operator shell (System follows device; Light/Dark force appearance).
enum OperatorThemeOverride: String, CaseIterable, Identifiable {
    case system
    case light
    case dark

    var id: String { rawValue }

    var localizedTitle: String {
        switch self {
        case .system: return L10n.t("flow_runner_settings_theme_system")
        case .light: return L10n.t("flow_runner_settings_theme_light")
        case .dark: return L10n.t("flow_runner_settings_theme_dark")
        }
    }

    /// Resolves to SwiftUI ColorScheme for preferredColorScheme(_:).
    var resolvedColorScheme: ColorScheme? {
        switch self {
        case .system: return nil
        case .light: return .light
        case .dark: return .dark
        }
    }
}

/// Composer mode for chat — CHAT (text), IMAGE (vision), AUDIO (speech).
enum OperatorComposerMode: String, CaseIterable, Identifiable {
    case chat
    case image
    case audio

    var id: String { rawValue }

    var localizedTitle: String {
        switch self {
        case .chat:
            return L10n.t("flow_runner_workspace_chat")
        case .image:
            return L10n.t("flow_runner_runtime_usage_image")
        case .audio:
            return L10n.t("flow_runner_runtime_usage_speech_input")
        }
    }

    var systemImageName: String {
        switch self {
        case .chat: return "bubble.left.and.bubble.right.fill"
        case .image: return "photo"
        case .audio: return "mic.fill"
        }
    }

    var placeholderKey: String {
        switch self {
        case .chat: return "flow_runner_chat_message_placeholder"
        case .image: return "flow_runner_message_placeholder_image"
        case .audio: return "flow_runner_message_placeholder_audio"
        }
    }
}

/// Picked image for chat (mimeType + base64 data).
struct ChatPickedImage: Identifiable {
    let id: UUID
    let mimeType: String
    let data: String

    init(id: UUID = UUID(), mimeType: String, data: String) {
        self.id = id
        self.mimeType = mimeType
        self.data = data
    }
}

enum OperatorWorkspaceArea: String, CaseIterable, Identifiable {
    case chat
    case automations
    case models
    case settings

    var id: String { rawValue }

    var localizedTitle: String {
        switch self {
        case .chat:
            return L10n.t("flow_runner_workspace_chat")
        case .automations:
            return L10n.t("flow_runner_workspace_automations")
        case .models:
            return L10n.t("flow_runner_workspace_models")
        case .settings:
            return L10n.t("flow_runner_workspace_settings")
        }
    }

    var localizedSubtitle: String {
        switch self {
        case .chat:
            return L10n.t("flow_runner_workspace_chat_subtitle")
        case .automations:
            return L10n.t("flow_runner_workspace_automations_subtitle")
        case .models:
            return L10n.t("flow_runner_workspace_models_subtitle")
        case .settings:
            return L10n.t("flow_runner_workspace_settings_subtitle")
        }
    }

    var systemImageName: String {
        switch self {
        case .chat:
            return "bubble.left.and.bubble.right.fill"
        case .automations:
            return "play.rectangle.on.rectangle.fill"
        case .models:
            return "cpu.fill"
        case .settings:
            return "slider.horizontal.3"
        }
    }
}

func shouldShowOperatorUtilityPane(for area: OperatorWorkspaceArea) -> Bool {
    area == .automations
}

func shouldShowOperatorToolbarPrimaryAction(for area: OperatorWorkspaceArea) -> Bool {
    switch area {
    case .chat, .settings:
        return false
    case .automations, .models:
        return true
    }
}

struct OperatorWorkspaceLaunchConfiguration: Sendable {
    private enum EnvironmentKey {
        static let initialArea = "BAO_EDGE_OPERATOR_INITIAL_AREA"
        static let initialChatPrompt = "BAO_EDGE_OPERATOR_CHAT_PROMPT"
        static let autoSendInitialChatPrompt = "BAO_EDGE_OPERATOR_CHAT_AUTO_SEND"
        static let initialChatAutoSendDelayMs = "BAO_EDGE_OPERATOR_CHAT_AUTO_SEND_DELAY_MS"
    }

    private enum Defaults {
        static let initialChatAutoSendDelayMs = 1_500
    }

    var initialArea: OperatorWorkspaceArea?
    var initialChatPrompt: String?
    var autoSendInitialChatPrompt: Bool
    var initialChatAutoSendDelayMs: Int

    static func fromEnvironment(_ environment: [String: String] = ProcessInfo.processInfo.environment)
        -> OperatorWorkspaceLaunchConfiguration {
        let requestedArea = environment[EnvironmentKey.initialArea]?
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .lowercased()
        let requestedPrompt = environment[EnvironmentKey.initialChatPrompt]?
            .trimmingCharacters(in: .whitespacesAndNewlines)
        let normalizedPrompt = requestedPrompt?.isEmpty == false ? requestedPrompt : nil

        return OperatorWorkspaceLaunchConfiguration(
            initialArea: requestedArea.flatMap(OperatorWorkspaceArea.init(rawValue:)),
            initialChatPrompt: normalizedPrompt,
            autoSendInitialChatPrompt: normalizedPrompt == nil
                ? false
                : resolveBool(
                    environment[EnvironmentKey.autoSendInitialChatPrompt],
                    defaultValue: false
                ),
            initialChatAutoSendDelayMs: resolvePositiveInt(
                environment[EnvironmentKey.initialChatAutoSendDelayMs],
                defaultValue: Defaults.initialChatAutoSendDelayMs
            )
        )
    }

    private static func resolveBool(_ value: String?, defaultValue: Bool) -> Bool {
        guard let normalized = value?.trimmingCharacters(in: .whitespacesAndNewlines).lowercased(),
              !normalized.isEmpty else {
            return defaultValue
        }

        switch normalized {
        case "1", "true", "yes", "on":
            return true
        case "0", "false", "no", "off":
            return false
        default:
            return defaultValue
        }
    }

    private static func resolvePositiveInt(_ value: String?, defaultValue: Int) -> Int {
        guard let normalized = value?.trimmingCharacters(in: .whitespacesAndNewlines),
              let parsed = Int(normalized),
              parsed > 0 else {
            return defaultValue
        }
        return parsed
    }
}

enum OperatorSettingsSection: String, CaseIterable, Identifiable {
    case general
    case ai

    var id: String { rawValue }

    var localizedTitle: String {
        switch self {
        case .general:
            return L10n.t("flow_runner_settings_general")
        case .ai:
            return L10n.t("flow_runner_settings_ai")
        }
    }
}

struct ConversationRuntimeBinding: Codable, Equatable, Sendable {
    var provider: String
    var model: String
    var modelSource: String
}

struct OperatorConversationArchiveEntry: Codable, Equatable, Sendable {
    var id: UUID
    var role: OperatorConversationRole
    var title: String
    var body: String
    var state: FlowExecutionState
    var timestamp: Date

    init(entry: OperatorConversationEntry) {
        self.id = entry.id
        self.role = entry.role
        self.title = entry.title
        self.body = entry.body
        self.state = entry.state
        self.timestamp = entry.timestamp
    }

    var restoredEntry: OperatorConversationEntry {
        OperatorConversationEntry(
            id: id,
            role: role,
            title: title,
            body: body,
            state: state,
            timestamp: timestamp
        )
    }
}

struct OperatorConversationThread: Identifiable, Codable, Equatable, Sendable {
    var id: String
    var title: String
    var binding: ConversationRuntimeBinding
    var entries: [OperatorConversationArchiveEntry]

    static func starter() -> OperatorConversationThread {
        OperatorConversationThread(
            id: UUID().uuidString,
            title: L10n.t("flow_runner_thread_default_title"),
            binding: ConversationRuntimeBinding(provider: "", model: "", modelSource: ""),
            entries: []
        )
    }
}

protocol ConversationStore: Sendable {
    func loadThreads() -> [OperatorConversationThread]
    func saveThreads(_ threads: [OperatorConversationThread])
}

struct UserDefaultsConversationStore: ConversationStore, Sendable {
    private let storageKey: String

    init(storageKey: String = "bao-edge.operator.conversations") {
        self.storageKey = storageKey
    }

    func loadThreads() -> [OperatorConversationThread] {
        guard let data = UserDefaults.standard.data(forKey: storageKey) else {
            return []
        }
        return (try? JSONDecoder().decode([OperatorConversationThread].self, from: data)) ?? []
    }

    func saveThreads(_ threads: [OperatorConversationThread]) {
        guard let data = try? JSONEncoder().encode(threads) else {
            return
        }
        UserDefaults.standard.set(data, forKey: storageKey)
    }
}

struct AutomationRunRecord: Identifiable, Codable, Equatable, Sendable {
    var id: String
    var title: String
    var detail: String
    var state: FlowExecutionState
    var timestamp: Date
    var correlationId: String

    init(
        id: String = UUID().uuidString,
        title: String,
        detail: String,
        state: FlowExecutionState,
        timestamp: Date = .now,
        correlationId: String = UUID().uuidString
    ) {
        self.id = id
        self.title = title
        self.detail = detail
        self.state = state
        self.timestamp = timestamp
        self.correlationId = correlationId
    }
}

enum AutomationScheduleCadence: String, Codable, CaseIterable, Sendable {
    case daily
    case weekly
}

enum AutomationScheduleStatus: String, Codable, CaseIterable, Sendable {
    case active
    case paused
    case needsAttention
}

struct AutomationScheduleRecord: Identifiable, Codable, Equatable, Sendable {
    var id: String
    var title: String
    var flowYaml: String
    var cadence: AutomationScheduleCadence
    var status: AutomationScheduleStatus
    var nextRunAt: Date
    var lastRunAt: Date?

    init(
        id: String = UUID().uuidString,
        title: String,
        flowYaml: String,
        cadence: AutomationScheduleCadence,
        status: AutomationScheduleStatus = .active,
        nextRunAt: Date,
        lastRunAt: Date? = nil
    ) {
        self.id = id
        self.title = title
        self.flowYaml = flowYaml
        self.cadence = cadence
        self.status = status
        self.nextRunAt = nextRunAt
        self.lastRunAt = lastRunAt
    }
}

protocol AutomationStore: Sendable {
    func loadHistory() -> [AutomationRunRecord]
    func saveHistory(_ history: [AutomationRunRecord])
    func loadSchedules() -> [AutomationScheduleRecord]
    func saveSchedules(_ schedules: [AutomationScheduleRecord])
}

struct UserDefaultsAutomationStore: AutomationStore, Sendable {
    private let historyStorageKey: String
    private let scheduleStorageKey: String

    init(
        historyStorageKey: String = "bao-edge.operator.automation.history",
        scheduleStorageKey: String = "bao-edge.operator.automation.schedules"
    ) {
        self.historyStorageKey = historyStorageKey
        self.scheduleStorageKey = scheduleStorageKey
    }

    func loadHistory() -> [AutomationRunRecord] {
        guard let data = UserDefaults.standard.data(forKey: historyStorageKey) else {
            return []
        }
        return (try? JSONDecoder().decode([AutomationRunRecord].self, from: data)) ?? []
    }

    func saveHistory(_ history: [AutomationRunRecord]) {
        guard let data = try? JSONEncoder().encode(history) else {
            return
        }
        UserDefaults.standard.set(data, forKey: historyStorageKey)
    }

    func loadSchedules() -> [AutomationScheduleRecord] {
        guard let data = UserDefaults.standard.data(forKey: scheduleStorageKey) else {
            return []
        }
        return (try? JSONDecoder().decode([AutomationScheduleRecord].self, from: data)) ?? []
    }

    func saveSchedules(_ schedules: [AutomationScheduleRecord]) {
        guard let data = try? JSONEncoder().encode(schedules) else {
            return
        }
        UserDefaults.standard.set(data, forKey: scheduleStorageKey)
    }
}

struct OperatorModelCatalogSnapshot: Codable, Sendable {
    var providerOptions: [String]
    var providerDisplayNames: [String: String]
    var providerSupportsBaseUrlOverride: [String]
    var modelProvider: String
    var modelDescriptors: [AiModelDescriptor]
    var modelOptions: [String]
    var modelSourceOptions: [ModelSourceDescriptor]
    var providerState: FlowExecutionState
    var providerMessage: String
    var modelListState: FlowExecutionState
    var modelListMessage: String

    private enum CodingKeys: String, CodingKey {
        case providerOptions
        case providerDisplayNames
        case providerSupportsBaseUrlOverride
        case modelProvider
        case modelDescriptors
        case modelOptions
        case modelSourceOptions
        case providerState
        case providerMessage
        case modelListState
        case modelListMessage
    }

    init(
        providerOptions: [String],
        providerDisplayNames: [String: String],
        providerSupportsBaseUrlOverride: [String],
        modelProvider: String,
        modelDescriptors: [AiModelDescriptor],
        modelOptions: [String],
        modelSourceOptions: [ModelSourceDescriptor],
        providerState: FlowExecutionState,
        providerMessage: String,
        modelListState: FlowExecutionState,
        modelListMessage: String
    ) {
        self.providerOptions = providerOptions
        self.providerDisplayNames = providerDisplayNames
        self.providerSupportsBaseUrlOverride = providerSupportsBaseUrlOverride
        self.modelProvider = modelProvider
        self.modelDescriptors = modelDescriptors
        self.modelOptions = modelOptions
        self.modelSourceOptions = modelSourceOptions
        self.providerState = providerState
        self.providerMessage = providerMessage
        self.modelListState = modelListState
        self.modelListMessage = modelListMessage
    }

    init(from decoder: any Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        providerOptions = try container.decodeIfPresent([String].self, forKey: .providerOptions) ?? []
        providerDisplayNames = try container.decodeIfPresent([String: String].self, forKey: .providerDisplayNames) ?? [:]
        providerSupportsBaseUrlOverride = try container.decodeIfPresent([String].self, forKey: .providerSupportsBaseUrlOverride) ?? []
        modelProvider = try container.decodeIfPresent(String.self, forKey: .modelProvider) ?? ""
        modelDescriptors = try container.decodeIfPresent([AiModelDescriptor].self, forKey: .modelDescriptors) ?? []
        modelOptions = try container.decodeIfPresent([String].self, forKey: .modelOptions) ?? []
        modelSourceOptions = try container.decodeIfPresent([ModelSourceDescriptor].self, forKey: .modelSourceOptions) ?? []
        providerState = try container.decodeIfPresent(FlowExecutionState.self, forKey: .providerState) ?? .idle
        providerMessage = try container.decodeIfPresent(String.self, forKey: .providerMessage) ?? ""
        modelListState = try container.decodeIfPresent(FlowExecutionState.self, forKey: .modelListState) ?? .idle
        modelListMessage = try container.decodeIfPresent(String.self, forKey: .modelListMessage) ?? ""
    }
}

protocol ModelCatalogStore: Sendable {
    func loadCatalog() -> OperatorModelCatalogSnapshot?
    func saveCatalog(_ snapshot: OperatorModelCatalogSnapshot)
}

struct UserDefaultsModelCatalogStore: ModelCatalogStore, Sendable {
    private let storageKey: String

    init(storageKey: String = "bao-edge.operator.model.catalog") {
        self.storageKey = storageKey
    }

    func loadCatalog() -> OperatorModelCatalogSnapshot? {
        guard let data = UserDefaults.standard.data(forKey: storageKey) else {
            return nil
        }
        return try? JSONDecoder().decode(OperatorModelCatalogSnapshot.self, from: data)
    }

    func saveCatalog(_ snapshot: OperatorModelCatalogSnapshot) {
        guard let data = try? JSONEncoder().encode(snapshot) else {
            return
        }
        UserDefaults.standard.set(data, forKey: storageKey)
    }
}

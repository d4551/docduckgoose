import Foundation
import Security

/// Identifiers for secrets owned by the operator workspace.
public enum OperatorCredentialKey: String, CaseIterable, Codable, Sendable {
  /// API key used for provider-backed cloud runtime requests.
  case providerApiKey = "provider-api-key"

  /// Hugging Face token used for gated model downloads.
  case huggingFaceToken = "hugging-face-token"
}

/// Non-secret snapshot of a credential's current configuration state.
public struct CredentialSnapshot: Codable, Equatable, Sendable {
  /// Credential identifier.
  public let key: OperatorCredentialKey

  /// Whether a secret is currently present.
  public let isConfigured: Bool

  /// Masked representation suitable for UI display.
  public let maskedValue: String

  public init(key: OperatorCredentialKey, isConfigured: Bool, maskedValue: String) {
    self.key = key
    self.isConfigured = isConfigured
    self.maskedValue = maskedValue
  }
}

/// Typed errors produced by credential storage operations.
public enum CredentialStoreError: Error, Equatable, Sendable {
  /// The keychain returned an unexpected status code.
  case unexpectedStatus(Int)

  /// Stored bytes could not be decoded as UTF-8 text.
  case invalidData
}

/// Abstraction for secure operator credential persistence.
public protocol CredentialStore: Sendable {
  /// Returns the decrypted string value for a credential when present.
  func string(for key: OperatorCredentialKey) -> String?

  /// Stores or replaces a credential value.
  func setString(_ value: String, for key: OperatorCredentialKey) -> Result<CredentialSnapshot, CredentialStoreError>

  /// Removes a credential value when present.
  func removeString(for key: OperatorCredentialKey) -> Result<CredentialSnapshot, CredentialStoreError>

  /// Returns non-secret UI metadata for a credential.
  func snapshot(for key: OperatorCredentialKey) -> CredentialSnapshot

  /// Returns a provider-profile scoped API key when present.
  func providerApiKey(providerId: String, profileId: String) -> String?

  /// Stores or replaces a provider-profile scoped API key.
  func setProviderApiKey(_ value: String, providerId: String, profileId: String) -> Result<CredentialSnapshot, CredentialStoreError>

  /// Removes a provider-profile scoped API key.
  func removeProviderApiKey(providerId: String, profileId: String) -> Result<CredentialSnapshot, CredentialStoreError>

  /// Returns UI-safe metadata for a provider-profile scoped API key.
  func providerApiKeySnapshot(providerId: String, profileId: String) -> CredentialSnapshot
}

/// Keychain-backed credential persistence for operator secrets.
public final class KeychainCredentialStore: CredentialStore, @unchecked Sendable {
  private let serviceName: String

  public init(serviceName: String? = nil) {
    let defaultService =
      Bundle.main.bundleIdentifier?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
      ? Bundle.main.bundleIdentifier!
      : "BaoEdge.OperatorCredentials"
    self.serviceName = serviceName?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
      ? serviceName!
      : defaultService
  }

  public func string(for key: OperatorCredentialKey) -> String? {
    var query = baseQuery(account: key.rawValue)
    query[kSecReturnData as String] = true
    query[kSecMatchLimit as String] = kSecMatchLimitOne

    var item: CFTypeRef?
    let status = SecItemCopyMatching(query as CFDictionary, &item)
    guard status != errSecItemNotFound else {
      return nil
    }
    guard status == errSecSuccess else {
      return nil
    }
    guard let data = item as? Data else {
      return nil
    }
    return String(data: data, encoding: .utf8)
  }

  public func setString(_ value: String, for key: OperatorCredentialKey) -> Result<CredentialSnapshot, CredentialStoreError> {
    let normalizedValue = value.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !normalizedValue.isEmpty else {
      return removeString(for: key)
    }

    let encodedValue = Data(normalizedValue.utf8)
    let lookupQuery = baseQuery(account: key.rawValue)
    let existingStatus = SecItemCopyMatching(lookupQuery as CFDictionary, nil)

    switch existingStatus {
    case errSecSuccess:
      let attributes: [String: Any] = [kSecValueData as String: encodedValue]
      let updateStatus = SecItemUpdate(lookupQuery as CFDictionary, attributes as CFDictionary)
      guard updateStatus == errSecSuccess else {
        return .failure(.unexpectedStatus(Int(updateStatus)))
      }
    case errSecItemNotFound:
      var addQuery = lookupQuery
      addQuery[kSecValueData as String] = encodedValue
      addQuery[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
      let addStatus = SecItemAdd(addQuery as CFDictionary, nil)
      guard addStatus == errSecSuccess else {
        return .failure(.unexpectedStatus(Int(addStatus)))
      }
    default:
      return .failure(.unexpectedStatus(Int(existingStatus)))
    }

    return .success(snapshot(for: key))
  }

  public func removeString(for key: OperatorCredentialKey) -> Result<CredentialSnapshot, CredentialStoreError> {
    let status = SecItemDelete(baseQuery(account: key.rawValue) as CFDictionary)
    guard status == errSecSuccess || status == errSecItemNotFound else {
      return .failure(.unexpectedStatus(Int(status)))
    }
    return .success(snapshot(for: key))
  }

  public func snapshot(for key: OperatorCredentialKey) -> CredentialSnapshot {
    let value = string(for: key)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    return CredentialSnapshot(
      key: key,
      isConfigured: !value.isEmpty,
      maskedValue: Self.maskedValue(for: value)
    )
  }

  public func providerApiKey(providerId: String, profileId: String) -> String? {
    let account = Self.providerApiKeyAccount(providerId: providerId, profileId: profileId)
    var query = baseQuery(account: account)
    query[kSecReturnData as String] = true
    query[kSecMatchLimit as String] = kSecMatchLimitOne
    var item: CFTypeRef?
    let status = SecItemCopyMatching(query as CFDictionary, &item)
    guard status == errSecSuccess, let data = item as? Data else {
      return nil
    }
    return String(data: data, encoding: .utf8)
  }

  public func setProviderApiKey(_ value: String, providerId: String, profileId: String) -> Result<CredentialSnapshot, CredentialStoreError> {
    let normalizedValue = value.trimmingCharacters(in: .whitespacesAndNewlines)
    let account = Self.providerApiKeyAccount(providerId: providerId, profileId: profileId)
    guard !normalizedValue.isEmpty else {
      return removeProviderApiKey(providerId: providerId, profileId: profileId)
    }
    let encodedValue = Data(normalizedValue.utf8)
    let lookupQuery = baseQuery(account: account)
    let existingStatus = SecItemCopyMatching(lookupQuery as CFDictionary, nil)
    switch existingStatus {
    case errSecSuccess:
      let attributes: [String: Any] = [kSecValueData as String: encodedValue]
      let updateStatus = SecItemUpdate(lookupQuery as CFDictionary, attributes as CFDictionary)
      guard updateStatus == errSecSuccess else {
        return .failure(.unexpectedStatus(Int(updateStatus)))
      }
    case errSecItemNotFound:
      var addQuery = lookupQuery
      addQuery[kSecValueData as String] = encodedValue
      addQuery[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
      let addStatus = SecItemAdd(addQuery as CFDictionary, nil)
      guard addStatus == errSecSuccess else {
        return .failure(.unexpectedStatus(Int(addStatus)))
      }
    default:
      return .failure(.unexpectedStatus(Int(existingStatus)))
    }
    return .success(providerApiKeySnapshot(providerId: providerId, profileId: profileId))
  }

  public func removeProviderApiKey(providerId: String, profileId: String) -> Result<CredentialSnapshot, CredentialStoreError> {
    let status = SecItemDelete(baseQuery(account: Self.providerApiKeyAccount(providerId: providerId, profileId: profileId)) as CFDictionary)
    guard status == errSecSuccess || status == errSecItemNotFound else {
      return .failure(.unexpectedStatus(Int(status)))
    }
    return .success(providerApiKeySnapshot(providerId: providerId, profileId: profileId))
  }

  public func providerApiKeySnapshot(providerId: String, profileId: String) -> CredentialSnapshot {
    let value = providerApiKey(providerId: providerId, profileId: profileId)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    return CredentialSnapshot(
      key: .providerApiKey,
      isConfigured: !value.isEmpty,
      maskedValue: Self.maskedValue(for: value)
    )
  }

  private func baseQuery(account: String) -> [String: Any] {
    [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: serviceName,
      kSecAttrAccount as String: account
    ]
  }

  private static func providerApiKeyAccount(providerId: String, profileId: String) -> String {
    let normalizedProviderId = providerId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "global" : providerId.trimmingCharacters(in: .whitespacesAndNewlines)
    let normalizedProfileId = profileId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "default" : profileId.trimmingCharacters(in: .whitespacesAndNewlines)
    return "provider-api-key:\(normalizedProviderId):\(normalizedProfileId)"
  }

  private static func maskedValue(for value: String) -> String {
    let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
      return ""
    }
    let suffixCount = min(4, trimmed.count)
    let suffix = String(trimmed.suffix(suffixCount))
    return "••••\(suffix)"
  }
}

/// Non-secret operator preferences persisted outside the chat surface.
public struct OperatorPreferences: Codable, Equatable, Sendable {
  /// Selected operator language override code.
  public var operatorLanguageCode: String

  /// Control-plane base URL for cloud/runtime calls.
  public var controlPlaneBaseURL: String

  /// Capability-scoped runtime assignments owned by the settings surfaces.
  public var runtimeAssignments: OperatorRuntimeAssignments

  /// Non-secret provider profile metadata owned by settings surfaces.
  public var providerProfiles: [OperatorProviderProfile]

  /// Active provider profile ids by provider.
  public var activeProviderProfileIds: [String: String]

  /// Preferred model source for model discovery.
  public var modelSource: String

  /// Preferred source used for pull requests.
  public var pullSource: String

  /// Pull timeout field value in milliseconds.
  public var pullTimeoutMsText: String

  /// Optional provider base URL override.
  public var providerBaseURL: String

  /// Whether chat requests should ask for TTS output by default.
  public var chatRequestTts: Bool

  /// Default requested speech input MIME type.
  public var chatSpeechInputMimeType: String

  /// Default requested speech input payload.
  public var chatSpeechInputData: String

  /// Default TTS output MIME type.
  public var chatTtsOutputMimeType: String

  /// Default TTS voice.
  public var chatTtsVoice: String

  /// Required device AI model reference.
  public var deviceAiModelRef: String

  /// Required device AI revision pin.
  public var deviceAiModelRevision: String

  /// Required device AI artifact file name.
  public var deviceAiModelFileName: String

  /// Expected SHA-256 checksum for the required device AI artifact.
  public var deviceAiExpectedSha256: String

  /// Default app identifier used for automation runs.
  public var appId: String

  public init(
    operatorLanguageCode: String,
    controlPlaneBaseURL: String,
    runtimeAssignments: OperatorRuntimeAssignments,
    providerProfiles: [OperatorProviderProfile],
    activeProviderProfileIds: [String: String],
    modelSource: String,
    pullSource: String,
    pullTimeoutMsText: String,
    providerBaseURL: String,
    chatRequestTts: Bool,
    chatSpeechInputMimeType: String,
    chatSpeechInputData: String,
    chatTtsOutputMimeType: String,
    chatTtsVoice: String,
    deviceAiModelRef: String,
    deviceAiModelRevision: String,
    deviceAiModelFileName: String,
    deviceAiExpectedSha256: String,
    appId: String
  ) {
    self.operatorLanguageCode = operatorLanguageCode
    self.controlPlaneBaseURL = controlPlaneBaseURL
    self.runtimeAssignments = runtimeAssignments
    self.providerProfiles = providerProfiles
    self.activeProviderProfileIds = activeProviderProfileIds
    self.modelSource = modelSource
    self.pullSource = pullSource
    self.pullTimeoutMsText = pullTimeoutMsText
    self.providerBaseURL = providerBaseURL
    self.chatRequestTts = chatRequestTts
    self.chatSpeechInputMimeType = chatSpeechInputMimeType
    self.chatSpeechInputData = chatSpeechInputData
    self.chatTtsOutputMimeType = chatTtsOutputMimeType
    self.chatTtsVoice = chatTtsVoice
    self.deviceAiModelRef = deviceAiModelRef
    self.deviceAiModelRevision = deviceAiModelRevision
    self.deviceAiModelFileName = deviceAiModelFileName
    self.deviceAiExpectedSha256 = deviceAiExpectedSha256
    self.appId = appId
  }

  /// Builds the default operator preferences from runtime config and host defaults.
  public static func defaults(
    config: ControlPlaneRuntimeConfig,
    defaultAppId: String,
    defaultLanguageCode: String
  ) -> OperatorPreferences {
    OperatorPreferences(
      operatorLanguageCode: defaultLanguageCode,
      controlPlaneBaseURL: config.baseUrl,
      runtimeAssignments: .defaults(config: config),
      providerProfiles: [],
      activeProviderProfileIds: [:],
      modelSource: config.defaultModelSource,
      pullSource: config.defaultModelSource,
      pullTimeoutMsText: String(config.defaultPullTimeoutMs),
      providerBaseURL: "",
      chatRequestTts: false,
      chatSpeechInputMimeType: "",
      chatSpeechInputData: "",
      chatTtsOutputMimeType: "",
      chatTtsVoice: "",
      deviceAiModelRef: config.deviceAiRequiredModelRef,
      deviceAiModelRevision: config.deviceAiRequiredModelRevision,
      deviceAiModelFileName: config.deviceAiRequiredModelFileName,
      deviceAiExpectedSha256: config.deviceAiRequiredModelSha256,
      appId: defaultAppId
    )
  }

  /// Active chat provider assignment kept for focused chat-surface bindings.
  public var selectedProvider: String {
    get { runtimeAssignments.chat.provider }
    set { runtimeAssignments.chat.provider = newValue }
  }

  /// Active chat model assignment kept for focused chat-surface bindings.
  public var selectedModel: String {
    get { runtimeAssignments.chat.model }
    set { runtimeAssignments.chat.model = newValue }
  }

  /// Returns the active provider profile id for a provider.
  public func activeProfileId(for providerId: String) -> String {
    let normalizedProviderId = providerId.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !normalizedProviderId.isEmpty else {
      return ""
    }
    if let activeId = activeProviderProfileIds[normalizedProviderId]?.trimmingCharacters(in: .whitespacesAndNewlines),
       !activeId.isEmpty {
      return activeId
    }
    return providerProfiles.first(where: { $0.providerId.caseInsensitiveCompare(normalizedProviderId) == .orderedSame })?.profileId ?? ""
  }

  /// Returns provider profiles for a provider.
  public func profiles(for providerId: String) -> [OperatorProviderProfile] {
    let normalizedProviderId = providerId.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !normalizedProviderId.isEmpty else {
      return []
    }
    return providerProfiles.filter { $0.providerId.caseInsensitiveCompare(normalizedProviderId) == .orderedSame }
  }

  /// Returns the active profile metadata when available.
  public func activeProfile(for providerId: String) -> OperatorProviderProfile? {
    let profileId = activeProfileId(for: providerId)
    guard !profileId.isEmpty else {
      return nil
    }
    return profiles(for: providerId).first { $0.profileId.caseInsensitiveCompare(profileId) == .orderedSame }
  }
}

/// Non-secret provider profile metadata persisted outside the keychain.
public struct OperatorProviderProfile: Codable, Equatable, Sendable {
  public var providerId: String
  public var profileId: String
  public var displayName: String
  public var baseUrl: String

  public init(providerId: String, profileId: String, displayName: String, baseUrl: String = "") {
    self.providerId = providerId
    self.profileId = profileId
    self.displayName = displayName
    self.baseUrl = baseUrl
  }
}

/// Stable capability usages that can bind to different model/provider combinations.
public enum OperatorRuntimeUsage: String, CaseIterable, Codable, Sendable {
  /// Primary chat replies and turn-taking.
  case chat

  /// Automation planning and execution.
  case automation

  /// Image-capable tasks and generation.
  case image

  /// Flow authoring and generation.
  case flowGeneration = "flow_generation"

  /// Speech understanding and transcription.
  case speechInput = "speech_input"

  /// Speech synthesis and voiced replies.
  case speechOutput = "speech_output"
}

/// Per-capability runtime binding persisted by the operator settings surfaces.
public struct OperatorRuntimeAssignment: Codable, Equatable, Sendable {
  /// Effective provider identifier for this usage.
  public var provider: String

  /// Effective model identifier for this usage.
  public var model: String

  /// Effective model source or inventory family for this usage.
  public var source: String

  public init(
    provider: String = "",
    model: String = "",
    source: String = ControlPlaneRuntimeConfig.shared.defaultModelSource
  ) {
    self.provider = provider
    self.model = model
    self.source = source
  }

  /// Return a copy with optionally replaced provider/model/source fields.
  public func with(
    provider: String? = nil,
    model: String? = nil,
    source: String? = nil
  ) -> OperatorRuntimeAssignment {
    OperatorRuntimeAssignment(
      provider: provider ?? self.provider,
      model: model ?? self.model,
      source: source ?? self.source
    )
  }
}

/// Capability-scoped runtime assignments stored for chat, automation, and media paths.
public struct OperatorRuntimeAssignments: Codable, Equatable, Sendable {
  /// Chat runtime assignment.
  public var chat: OperatorRuntimeAssignment

  /// Automation runtime assignment.
  public var automation: OperatorRuntimeAssignment

  /// Image runtime assignment.
  public var image: OperatorRuntimeAssignment

  /// Flow-generation runtime assignment.
  public var flowGeneration: OperatorRuntimeAssignment

  /// Speech-input runtime assignment.
  public var speechInput: OperatorRuntimeAssignment

  /// Speech-output runtime assignment.
  public var speechOutput: OperatorRuntimeAssignment

  public init(
    chat: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
    automation: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
    image: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
    flowGeneration: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
    speechInput: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
    speechOutput: OperatorRuntimeAssignment = OperatorRuntimeAssignment()
  ) {
    self.chat = chat
    self.automation = automation
    self.image = image
    self.flowGeneration = flowGeneration
    self.speechInput = speechInput
    self.speechOutput = speechOutput
  }

  /// Resolve the assignment for a specific capability usage.
  public func assignment(for usage: OperatorRuntimeUsage) -> OperatorRuntimeAssignment {
    switch usage {
    case .chat:
      return chat
    case .automation:
      return automation
    case .image:
      return image
    case .flowGeneration:
      return flowGeneration
    case .speechInput:
      return speechInput
    case .speechOutput:
      return speechOutput
    }
  }

  /// Return a copy with one usage assignment replaced.
  public func replacing(_ usage: OperatorRuntimeUsage, with assignment: OperatorRuntimeAssignment) -> OperatorRuntimeAssignments {
    var copy = self
    switch usage {
    case .chat:
      copy.chat = assignment
    case .automation:
      copy.automation = assignment
    case .image:
      copy.image = assignment
    case .flowGeneration:
      copy.flowGeneration = assignment
    case .speechInput:
      copy.speechInput = assignment
    case .speechOutput:
      copy.speechOutput = assignment
    }
    return copy
  }

  /// Build default assignments using the canonical runtime config source.
  public static func defaults(config: ControlPlaneRuntimeConfig) -> OperatorRuntimeAssignments {
    let defaultAssignment = OperatorRuntimeAssignment(source: config.defaultModelSource)
    return OperatorRuntimeAssignments(
      chat: defaultAssignment,
      automation: defaultAssignment,
      image: defaultAssignment,
      flowGeneration: defaultAssignment,
      speechInput: defaultAssignment,
      speechOutput: defaultAssignment
    )
  }
}

/// Abstraction for non-secret operator preference persistence.
public protocol PreferencesStore: Sendable {
  /// Loads persisted operator preferences when available.
  func loadPreferences() -> OperatorPreferences?

  /// Persists non-secret operator preferences.
  func savePreferences(_ preferences: OperatorPreferences)
}

/// UserDefaults-backed persistence for non-secret operator preferences.
public struct UserDefaultsPreferencesStore: PreferencesStore, Sendable {
  private let suiteName: String?
  private let storageKey: String

  public init(
    suiteName: String? = nil,
    storageKey: String = "bao-edge.operator.preferences"
  ) {
    self.suiteName = suiteName
    self.storageKey = storageKey
  }

  public func loadPreferences() -> OperatorPreferences? {
    guard let defaults = userDefaults(),
          let data = defaults.data(forKey: storageKey) else {
      return nil
    }
    let decoder = JSONDecoder()
    return try? decoder.decode(OperatorPreferences.self, from: data)
  }

  public func savePreferences(_ preferences: OperatorPreferences) {
    guard let defaults = userDefaults() else {
      return
    }
    let encoder = JSONEncoder()
    guard let data = try? encoder.encode(preferences) else {
      return
    }
    defaults.set(data, forKey: storageKey)
  }

  private func userDefaults() -> UserDefaults? {
    if let suiteName, let defaults = UserDefaults(suiteName: suiteName) {
      return defaults
    }
    return UserDefaults.standard
  }
}

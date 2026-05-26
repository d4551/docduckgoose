import Foundation

/// Current schema version for app-owned operator verification reports.
public let operatorVerificationReportSchemaVersion = "1.0"

/// Stable workflow scenarios emitted by mobile verification reports.
public enum OperatorVerificationScenario: String, Codable, Sendable {
    case cloudChat = "cloud_chat"
    case localDeviceAi = "local_device_ai"
    case calendarNativeAction = "calendar_native_action"
    case webResearchRpa = "web_research_rpa"
    case automationSchedule = "automation_schedule"
}

/// Stable capability usages emitted by mobile verification reports.
public enum OperatorVerificationUsage: String, Codable, Sendable {
    case chat
    case automation
    case researchRpa = "research_rpa"
    case nativeAction = "native_action"
    case speechInput = "speech_input"
    case speechOutput = "speech_output"
    case localDeviceAi = "local_device_ai"
}

/// Trigger sources for app-owned verification runs.
public enum OperatorVerificationTriggerSource: String, Codable, Sendable {
    case user
    case launchInjection = "launch_injection"
    case backgroundSchedule = "background_schedule"
    case deviceAiProtocol = "device_ai_protocol"
    case nativeIntent = "native_intent"
}

/// Runtime transport used during one verification run.
public enum OperatorVerificationRuntimeTransport: String, Codable, Sendable {
    case local
    case cloud
}

/// Terminal states shared by app-owned verification reports.
public enum OperatorVerificationTerminalState: String, Codable, Sendable {
    case idle
    case loading
    case success
    case empty
    case errorRetryable = "error-retryable"
    case errorNonRetryable = "error-non-retryable"
    case unauthorized

    /// Maps a flow execution state into the canonical verification terminal state.
    public init(flowState: FlowExecutionState) {
        switch flowState {
        case .idle: self = .idle
        case .loading: self = .loading
        case .success: self = .success
        case .empty: self = .empty
        case .errorRetryable: self = .errorRetryable
        case .errorNonRetryable: self = .errorNonRetryable
        case .unauthorized: self = .unauthorized
        }
    }
}

/// Runtime binding metadata written into app-owned verification reports.
public struct OperatorVerificationRuntimeBinding: Codable, Sendable {
    public var usage: OperatorVerificationUsage
    public var transport: OperatorVerificationRuntimeTransport
    public var provider: String?
    public var model: String?
    public var source: String?
    public var localModelName: String?
    public var targetPlatform: String?

    public init(
        usage: OperatorVerificationUsage,
        transport: OperatorVerificationRuntimeTransport,
        provider: String? = nil,
        model: String? = nil,
        source: String? = nil,
        localModelName: String? = nil,
        targetPlatform: String? = nil
    ) {
        self.usage = usage
        self.transport = transport
        self.provider = provider
        self.model = model
        self.source = source
        self.localModelName = localModelName
        self.targetPlatform = targetPlatform
    }
}

/// Human-readable request summary written into app-owned verification reports.
public struct OperatorVerificationRequestSummary: Codable, Sendable {
    public var prompt: String
    public var metadata: [String: String]

    public init(prompt: String, metadata: [String: String] = [:]) {
        self.prompt = prompt
        self.metadata = metadata
    }
}

/// Human-readable reply summary written into app-owned verification reports.
public struct OperatorVerificationReplySummary: Codable, Sendable {
    public var message: String
    public var state: OperatorVerificationTerminalState
    public var provenance: String
    public var sources: [String]

    public init(
        message: String,
        state: OperatorVerificationTerminalState,
        provenance: String,
        sources: [String] = []
    ) {
        self.message = message
        self.state = state
        self.provenance = provenance
        self.sources = sources
    }
}

/// Structured evidence row proving one part of a verified workflow.
public struct OperatorVerificationEvidence: Codable, Sendable {
    public var kind: String
    public var status: String
    public var summary: String
    public var value: String?
    public var artifactPath: String?
    public var metadata: [String: String]

    public init(
        kind: String,
        status: String,
        summary: String,
        value: String? = nil,
        artifactPath: String? = nil,
        metadata: [String: String] = [:]
    ) {
        self.kind = kind
        self.status = status
        self.summary = summary
        self.value = value
        self.artifactPath = artifactPath
        self.metadata = metadata
    }
}

/// Persisted target identifiers created or touched by the run.
public struct OperatorVerificationTargetIds: Codable, Sendable {
    public var appId: String?
    public var scheduleId: String?
    public var eventId: String?
    public var calendarId: String?
    public var conversationId: String?
    public var deviceId: String?

    public init(
        appId: String? = nil,
        scheduleId: String? = nil,
        eventId: String? = nil,
        calendarId: String? = nil,
        conversationId: String? = nil,
        deviceId: String? = nil
    ) {
        self.appId = appId
        self.scheduleId = scheduleId
        self.eventId = eventId
        self.calendarId = calendarId
        self.conversationId = conversationId
        self.deviceId = deviceId
    }
}

/// Canonical app-owned verification report.
public struct OperatorVerificationReport: Codable, Sendable {
    public var schemaVersion: String
    public var correlationId: String
    public var platform: String
    public var scenario: OperatorVerificationScenario
    public var runtime: OperatorVerificationRuntimeBinding
    public var triggerSource: OperatorVerificationTriggerSource
    public var request: OperatorVerificationRequestSummary
    public var terminalState: OperatorVerificationTerminalState
    public var reply: OperatorVerificationReplySummary
    public var evidence: [OperatorVerificationEvidence]
    public var targetIds: OperatorVerificationTargetIds?
    public var artifactPaths: [String]
    public var startedAt: String
    public var completedAt: String

    public init(
        correlationId: String,
        platform: String = "ios",
        scenario: OperatorVerificationScenario,
        runtime: OperatorVerificationRuntimeBinding,
        triggerSource: OperatorVerificationTriggerSource,
        request: OperatorVerificationRequestSummary,
        terminalState: OperatorVerificationTerminalState,
        reply: OperatorVerificationReplySummary,
        evidence: [OperatorVerificationEvidence] = [],
        targetIds: OperatorVerificationTargetIds? = nil,
        artifactPaths: [String] = [],
        startedAt: String,
        completedAt: String
    ) {
        self.schemaVersion = operatorVerificationReportSchemaVersion
        self.correlationId = correlationId
        self.platform = platform
        self.scenario = scenario
        self.runtime = runtime
        self.triggerSource = triggerSource
        self.request = request
        self.terminalState = terminalState
        self.reply = reply
        self.evidence = evidence
        self.targetIds = targetIds
        self.artifactPaths = artifactPaths
        self.startedAt = startedAt
        self.completedAt = completedAt
    }
}

/// File-backed persistence contract for app-owned verification reports.
public protocol OperatorVerificationReporting: Sendable {
    /// Persist the latest verification report and an archived per-run copy.
    @discardableResult
    func persist(_ report: OperatorVerificationReport) throws -> URL
}

/// Default file-backed verification reporter used by iOS operator flows.
public struct FileOperatorVerificationReporter: OperatorVerificationReporting, @unchecked Sendable {
    private let fileManager: FileManager
    private let rootDirectoryURL: URL
    private let encoder = JSONEncoder()

    public init(
        fileManager: FileManager = .default,
        rootDirectoryURL: URL? = nil
    ) {
        self.fileManager = fileManager
        let baseDirectory = rootDirectoryURL
            ?? fileManager.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
                .appendingPathComponent("bao-edge-operator-verification", isDirectory: true)
        self.rootDirectoryURL = baseDirectory
    }

    @discardableResult
    public func persist(_ report: OperatorVerificationReport) throws -> URL {
        let runsDirectory = rootDirectoryURL.appendingPathComponent("runs", isDirectory: true)
        try ensureDirectory(rootDirectoryURL)
        try ensureDirectory(runsDirectory)
        let archivedURL = runsDirectory.appendingPathComponent("\(report.correlationId).json", isDirectory: false)
        let latestURL = rootDirectoryURL.appendingPathComponent("latest.json", isDirectory: false)
        let data = try encoder.encode(report)
        try data.write(to: archivedURL, options: [.atomic])
        try data.write(to: latestURL, options: [.atomic])
        return latestURL
    }

    private func ensureDirectory(_ url: URL) throws {
        if fileManager.fileExists(atPath: url.path) {
            return
        }
        try fileManager.createDirectory(at: url, withIntermediateDirectories: true)
    }
}

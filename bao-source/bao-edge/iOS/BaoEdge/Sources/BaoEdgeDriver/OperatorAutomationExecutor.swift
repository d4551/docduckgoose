import Foundation
import BaoEdgeCore

/// Terminal snapshot returned after a durable scheduled automation run.
public struct OperatorAutomationExecutionOutcome: Sendable {
    public let state: FlowExecutionState
    public let summary: String
    public let correlationId: String
    public let requiresAttention: Bool

    public init(
        state: FlowExecutionState,
        summary: String,
        correlationId: String,
        requiresAttention: Bool
    ) {
        self.state = state
        self.summary = summary
        self.correlationId = correlationId
        self.requiresAttention = requiresAttention
    }
}

/// Owner for executing scheduled automations outside the iOS UI surface.
public protocol OperatorAutomationExecuting: Sendable {
    /// Execute one claimed scheduled automation and return the terminal outcome.
    func execute(_ pendingRun: OperatorPendingScheduledRun) async throws -> OperatorAutomationExecutionOutcome
}

/// Cloud-backed automation executor that dispatches agent workflows via the control-plane.
public final class CloudOperatorAutomationExecutor: OperatorAutomationExecuting, @unchecked Sendable {
    private let controlPlaneBaseURL: () -> String
    private let credentialStore: CredentialStore
    private let preferences: () -> OperatorPreferences
    private let verificationReporter: OperatorVerificationReporting

    public init(
        controlPlaneBaseURL: @escaping () -> String,
        credentialStore: CredentialStore,
        preferences: @escaping () -> OperatorPreferences,
        verificationReporter: OperatorVerificationReporting
    ) {
        self.controlPlaneBaseURL = controlPlaneBaseURL
        self.credentialStore = credentialStore
        self.preferences = preferences
        self.verificationReporter = verificationReporter
    }

    public func execute(_ pendingRun: OperatorPendingScheduledRun) async throws -> OperatorAutomationExecutionOutcome {
        let correlationId = pendingRun.correlationId.isEmpty ? UUID().uuidString : pendingRun.correlationId
        let startedAt = ISO8601DateFormatter().string(from: Date())
        let baseUrl = controlPlaneBaseURL().trimmingCharacters(in: .whitespacesAndNewlines)

        guard !baseUrl.isEmpty else {
            let errorSummary = "Control-plane base URL is not configured."
            persistReport(
                correlationId: correlationId,
                pendingRun: pendingRun,
                startedAt: startedAt,
                terminalState: .errorNonRetryable,
                summary: errorSummary,
                providerId: nil,
                modelId: nil
            )
            return OperatorAutomationExecutionOutcome(
                state: .errorNonRetryable,
                summary: errorSummary,
                correlationId: correlationId,
                requiresAttention: true
            )
        }

        let prefs = preferences()
        let assignment = prefs.runtimeAssignments.assignment(for: .automation)
        let providerId = assignment.provider.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            ? nil : assignment.provider
        let modelId = assignment.model.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            ? nil : assignment.model
        let profileId = providerId.flatMap { prefs.activeProfileId(for: $0) } ?? "default"
        let apiKey = providerId.flatMap { credentialStore.providerApiKey(providerId: $0, profileId: profileId) }
        let providerBaseUrl = providerId.flatMap { prefs.activeProfile(for: $0)?.baseUrl }

        let request = AiWorkflowRequest(
            mode: "agent",
            provider: providerId ?? "",
            model: modelId,
            message: pendingRun.prompt,
            apiKey: apiKey,
            baseUrl: providerBaseUrl,
            correlationId: correlationId
        )

        let envelope: AiWorkflowJobEnvelope
        do {
            envelope = try await runAgentWorkflow(baseUrl: baseUrl, request: request)
        } catch {
            let errorSummary = error.localizedDescription
            persistReport(
                correlationId: correlationId,
                pendingRun: pendingRun,
                startedAt: startedAt,
                terminalState: .errorRetryable,
                summary: errorSummary,
                providerId: providerId,
                modelId: modelId
            )
            return OperatorAutomationExecutionOutcome(
                state: .errorRetryable,
                summary: errorSummary,
                correlationId: correlationId,
                requiresAttention: true
            )
        }

        let summary = resolveWorkflowSummary(envelope)
        let state = resolveWorkflowState(envelope)
        persistReport(
            correlationId: correlationId,
            pendingRun: pendingRun,
            startedAt: startedAt,
            terminalState: OperatorVerificationTerminalState(flowState: state),
            summary: summary,
            providerId: providerId,
            modelId: modelId
        )
        return OperatorAutomationExecutionOutcome(
            state: state,
            summary: summary,
            correlationId: correlationId,
            requiresAttention: state != .success
        )
    }

    // MARK: - Private

    private func runAgentWorkflow(
        baseUrl: String,
        request: AiWorkflowRequest
    ) async throws -> AiWorkflowJobEnvelope {
        guard let url = URL(string: "\(baseUrl)/api/ai/workflows/jobs") else {
            throw ControlPlaneClientError.invalidBaseURL(baseUrl)
        }
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.httpBody = try JSONEncoder().encode(request)

        let (data, _) = try await URLSession.shared.data(for: urlRequest)
        var envelope = try JSONDecoder().decode(AiWorkflowJobEnvelope.self, from: data)

        var pollCount = 0
        let maxPolls = ControlPlaneRuntimeConfig.shared.pollAttempts
        let pollInterval = ControlPlaneRuntimeConfig.shared.pollIntervalMs

        while !isTerminal(envelope) && pollCount < maxPolls {
            try await Task.sleep(nanoseconds: UInt64(pollInterval) * 1_000_000)
            guard let jobId = envelope.jobId,
                  let pollUrl = URL(string: "\(baseUrl)/api/ai/workflows/jobs/\(jobId)") else {
                break
            }
            let (pollData, _) = try await URLSession.shared.data(from: pollUrl)
            envelope = try JSONDecoder().decode(AiWorkflowJobEnvelope.self, from: pollData)
            pollCount += 1
        }
        return envelope
    }

    private func isTerminal(_ envelope: AiWorkflowJobEnvelope) -> Bool {
        guard let status = envelope.data?.status else { return true }
        return status == .succeeded || status == .failed || status == .cancelled
    }

    private func resolveWorkflowState(_ envelope: AiWorkflowJobEnvelope) -> FlowExecutionState {
        switch envelope.state {
        case .success: return .success
        case .errorRetryable: return .errorRetryable
        case .errorNonRetryable: return .errorNonRetryable
        case .unauthorized: return .unauthorized
        default:
            return envelope.data?.status == .succeeded ? .success : .errorNonRetryable
        }
    }

    private func resolveWorkflowSummary(_ envelope: AiWorkflowJobEnvelope) -> String {
        let reply = envelope.data?.result?.reply.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        if !reply.isEmpty { return reply }
        let reason = envelope.data?.reason?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        if !reason.isEmpty { return reason }
        return "Automation execution unavailable."
    }

    private func persistReport(
        correlationId: String,
        pendingRun: OperatorPendingScheduledRun,
        startedAt: String,
        terminalState: OperatorVerificationTerminalState,
        summary: String,
        providerId: String?,
        modelId: String?
    ) {
        let report = OperatorVerificationReport(
            correlationId: correlationId,
            scenario: .automationSchedule,
            runtime: OperatorVerificationRuntimeBinding(
                usage: .automation,
                transport: .cloud,
                provider: providerId,
                model: modelId
            ),
            triggerSource: .backgroundSchedule,
            request: OperatorVerificationRequestSummary(prompt: pendingRun.prompt),
            terminalState: terminalState,
            reply: OperatorVerificationReplySummary(
                message: summary,
                state: terminalState,
                provenance: "cloud"
            ),
            targetIds: OperatorVerificationTargetIds(scheduleId: pendingRun.scheduleId),
            startedAt: startedAt,
            completedAt: ISO8601DateFormatter().string(from: Date())
        )
        do {
            try verificationReporter.persist(report)
        } catch {
            // Verification report persistence is best-effort.
        }
    }
}

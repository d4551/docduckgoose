import Testing
@testable import BaoEdgeDriver

@Suite("ControlPlaneClient workflow compatibility")
struct ControlPlaneClientWorkflowCompatibilityTests {
    @Test("maps successful workflow jobs onto chat envelopes")
    func mapsSuccessfulWorkflowJobsOntoChatEnvelopes() {
        let envelope = AiWorkflowJobEnvelope(
            route: "/api/ai/workflows/jobs",
            state: .success,
            jobId: "wf-job-123",
            data: AiWorkflowJobResolution(
                jobId: "wf-job-123",
                status: .succeeded,
                correlationId: "corr-123",
                result: AiWorkflowResultResolution(
                    mode: "chat",
                    requestedProvider: "ollama",
                    providerPath: "local:ollama",
                    requestedModel: "glm-5:cloud",
                    effectiveModel: "glm-5:cloud",
                    reply: "Scheduled it.",
                    conversationId: "conv-123",
                    ttsReply: AiChatSpeechReply(mimeType: "audio/mpeg", data: "ZmFrZQ==")
                )
            ),
            error: nil,
            mismatches: []
        )

        let mapped = aiWorkflowEnvelopeToChatEnvelope(envelope)

        #expect(mapped.state == .success)
        #expect(mapped.jobId == "wf-job-123")
        #expect(mapped.data?.provider == "ollama")
        #expect(mapped.data?.requestedModel == "glm-5:cloud")
        #expect(mapped.data?.effectiveModel == "glm-5:cloud")
        #expect(mapped.data?.reply == "Scheduled it.")
        #expect(mapped.data?.tts?.mimeType == "audio/mpeg")
    }

    @Test("promotes workflow failure reasons into chat envelope errors")
    func promotesWorkflowFailureReasonsIntoChatEnvelopeErrors() {
        let envelope = AiWorkflowJobEnvelope(
            route: "/api/ai/workflows/jobs",
            state: .errorNonRetryable,
            jobId: "wf-job-999",
            data: AiWorkflowJobResolution(
                jobId: "wf-job-999",
                status: .failed,
                correlationId: "corr-999",
                result: nil,
                stdout: "",
                stderr: "",
                elapsedMs: 12,
                reason: "This route has been retired."
            ),
            error: nil,
            mismatches: []
        )

        let mapped = aiWorkflowEnvelopeToChatEnvelope(envelope)

        #expect(mapped.state == .errorNonRetryable)
        #expect(mapped.data == nil)
        #expect(mapped.error?.reason == "This route has been retired.")
        #expect(mapped.error?.retryable == false)
    }
}

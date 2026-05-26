import Testing
@testable import BaoEdgeUI

@Suite("OperatorWorkspaceLaunchConfiguration")
struct OperatorWorkspaceLaunchConfigurationTests {
    @Test("parses the requested initial workspace area from the environment")
    func parsesRequestedArea() {
        let configuration = OperatorWorkspaceLaunchConfiguration.fromEnvironment([
            "BAO_EDGE_OPERATOR_INITIAL_AREA": "models"
        ])

        #expect(configuration.initialArea == .models)
        #expect(configuration.initialChatPrompt == nil)
        #expect(configuration.autoSendInitialChatPrompt == false)
    }

    @Test("ignores unknown workspace areas")
    func ignoresUnknownArea() {
        let configuration = OperatorWorkspaceLaunchConfiguration.fromEnvironment([
            "BAO_EDGE_OPERATOR_INITIAL_AREA": "unknown"
        ])

        #expect(configuration.initialArea == nil)
    }

    @Test("parses launch chat prompt automation")
    func parsesLaunchChatPromptAutomation() {
        let configuration = OperatorWorkspaceLaunchConfiguration.fromEnvironment([
            "BAO_EDGE_OPERATOR_CHAT_PROMPT": "Schedule a calendar invite for tomorrow at 3 PM.",
            "BAO_EDGE_OPERATOR_CHAT_AUTO_SEND": "true",
            "BAO_EDGE_OPERATOR_CHAT_AUTO_SEND_DELAY_MS": "2400"
        ])

        #expect(configuration.initialChatPrompt == "Schedule a calendar invite for tomorrow at 3 PM.")
        #expect(configuration.autoSendInitialChatPrompt == true)
        #expect(configuration.initialChatAutoSendDelayMs == 2400)
    }

    @Test("normalizes blank launch prompt automation")
    func normalizesBlankLaunchPromptAutomation() {
        let configuration = OperatorWorkspaceLaunchConfiguration.fromEnvironment([
            "BAO_EDGE_OPERATOR_CHAT_PROMPT": "   ",
            "BAO_EDGE_OPERATOR_CHAT_AUTO_SEND": "true",
            "BAO_EDGE_OPERATOR_CHAT_AUTO_SEND_DELAY_MS": "-10"
        ])

        #expect(configuration.initialChatPrompt == nil)
        #expect(configuration.autoSendInitialChatPrompt == false)
        #expect(configuration.initialChatAutoSendDelayMs == 1500)
    }
}

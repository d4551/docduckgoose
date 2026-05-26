import Foundation
import Testing
@testable import BaoEdgeUI

@Suite("OperatorNativeChatInterceptor")
struct OperatorNativeChatInterceptorTests {
    @Test("calendar prompts are intercepted and saved through the native writer")
    @MainActor
    func calendarPromptUsesNativeWriter() async throws {
        let startDate = try #require(ISO8601DateFormatter().date(from: "2026-03-18T15:00:00Z"))
        let referenceDate = try #require(ISO8601DateFormatter().date(from: "2026-03-10T09:00:00Z"))
        let config = fixedNativeIntentConfiguration(referenceDate: { referenceDate })
        let calendarWriter = CalendarWriterStub(
            result: .success(
                OperatorNativeCalendarSavedEvent(
                    title: "Design review",
                    startDate: startDate,
                    endDate: startDate.addingTimeInterval(45 * 60),
                    isAllDay: false,
                    calendarTitle: "Work"
                )
            )
        )
        let pricingResearcher = ApplePricingResearcherStub(result: .failure(.extractionFailed))
        let interceptor = OperatorNativeChatInterceptor(
            config: config,
            calendarWriter: calendarWriter,
            applePricingResearcher: pricingResearcher
        )

        let response = await interceptor.handleIfNeeded(
            message: "Create a calendar event called \"Design review\" on March 18, 2026 at 3:00 PM UTC for 45 minutes."
        )

        #expect(response?.state == .success)
        #expect(response?.role == .assistant)
        #expect(response?.body.contains("Design review") == true)
        #expect(response?.body.contains("Work") == true)
        #expect(calendarWriter.capturedDraft?.title == "Design review")
        #expect(calendarWriter.capturedDraft?.endDate == startDate.addingTimeInterval(45 * 60))
    }

    @Test("Apple pricing prompts are intercepted and formatted from native WebKit research")
    @MainActor
    func applePricingPromptUsesNativeResearch() async {
        let pricingResearcher = ApplePricingResearcherStub(
            result: .success(
                OperatorApplePricingSnapshot(
                    url: "https://www.apple.com/shop/buy-mac/macbook-pro/16-inch",
                    pageTitle: "MacBook Pro - Apple",
                    lowPrice: 2699,
                    highPrice: 7848.98,
                    currency: "USD",
                    topProduct: .init(
                        priceKey: "16inch-spaceblack-nano_texture-m5max-18-40",
                        price: 4549,
                        priceDisplay: "$4,549.00",
                        dimensions: [
                            "processor-dimensionChip-cpuCoreCount-gpuCoreCount": "m5max-18-40",
                            "display-dimensionFinish": "nano_texture",
                            "chassis-dimensionColor": "spaceblack"
                        ]
                    ),
                    maxMemory: "128gb",
                    maxStorage: "8tb",
                    maxPowerAdapter: "140w",
                    softwareOptions: ["logic_pro", "final_cut_pro"]
                )
            )
        )
        let interceptor = OperatorNativeChatInterceptor(
            config: fixedNativeIntentConfiguration(referenceDate: { Date() }),
            calendarWriter: CalendarWriterStub(result: .failure(.saveFailed)),
            applePricingResearcher: pricingResearcher
        )

        let response = await interceptor.handleIfNeeded(
            message: "Research new Apple MacBook Pro M5 16-inch prices and configure the most expensive options."
        )

        #expect(response?.state == .success)
        #expect(response?.body.contains("$4,549.00") == true)
        #expect(response?.body.contains("M5 Max") == true)
        #expect(response?.body.contains("128GB") == true)
        #expect(response?.body.contains("8TB") == true)
        #expect(response?.body.contains("https://www.apple.com/shop/buy-mac/macbook-pro/16-inch") == true)
    }

    @Test("generic Apple MacBook pricing prompts are classified for native handling")
    @MainActor
    func genericApplePricingPromptUsesNativeResearch() {
        #expect(
            operatorNativeChatIntentKind(for: "Research Apple MacBook Pro prices and configure the most expensive options.")
                == .appleMacPricing
        )
    }

    @Test("attached screenshots keep pricing prompts on the cloud multimodal path")
    @MainActor
    func pricingPromptWithAttachedInputsSkipsNativeIntent() {
        #expect(
            operatorNativeChatIntentKind(
                for: "Research Apple MacBook Pro prices and configure the most expensive options.",
                hasAttachedInputs: true
            ) == nil
        )
    }

    @Test("unrelated prompts are left for the cloud runtime")
    @MainActor
    func unrelatedPromptIsNotHandled() async {
        let interceptor = OperatorNativeChatInterceptor(
            config: fixedNativeIntentConfiguration(referenceDate: { Date() }),
            calendarWriter: CalendarWriterStub(result: .failure(.saveFailed)),
            applePricingResearcher: ApplePricingResearcherStub(result: .failure(.extractionFailed))
        )

        let response = await interceptor.handleIfNeeded(message: "Say hi and summarize our last conversation.")

        #expect(response == nil)
        #expect(operatorNativeChatIntentKind(for: "Say hi and summarize our last conversation.") == nil)
    }
}

private func fixedNativeIntentConfiguration(referenceDate: @escaping @Sendable () -> Date) -> OperatorNativeChatIntentConfiguration {
    let utcTimeZone = TimeZone(secondsFromGMT: 0)!
    var calendar = Calendar(identifier: .gregorian)
    calendar.locale = Locale(identifier: "en_US_POSIX")
    calendar.timeZone = utcTimeZone
    return OperatorNativeChatIntentConfiguration(
        appleMacBookProBuyPageURL: URL(string: "https://www.apple.com/shop/buy-mac/macbook-pro/16-inch")!,
        appleResearchTimeout: .seconds(5),
        appleResearchRetryDelay: .milliseconds(10),
        defaultCalendarEventDuration: .seconds(3_600),
        referenceDate: referenceDate,
        locale: Locale(identifier: "en_US_POSIX"),
        timeZone: utcTimeZone,
        calendar: calendar
    )
}

private final class CalendarWriterStub: OperatorNativeCalendarWriting {
    let result: Result<OperatorNativeCalendarSavedEvent, OperatorNativeCalendarWriteFailure>
    private(set) var capturedDraft: OperatorNativeCalendarDraft?

    init(result: Result<OperatorNativeCalendarSavedEvent, OperatorNativeCalendarWriteFailure>) {
        self.result = result
    }

    func createEvent(_ draft: OperatorNativeCalendarDraft) async -> Result<OperatorNativeCalendarSavedEvent, OperatorNativeCalendarWriteFailure> {
        capturedDraft = draft
        return result
    }
}

private final class ApplePricingResearcherStub: OperatorApplePricingResearching {
    let result: Result<OperatorApplePricingSnapshot, OperatorApplePricingResearchFailure>

    init(result: Result<OperatorApplePricingSnapshot, OperatorApplePricingResearchFailure>) {
        self.result = result
    }

    func researchPricing() async -> Result<OperatorApplePricingSnapshot, OperatorApplePricingResearchFailure> {
        result
    }
}

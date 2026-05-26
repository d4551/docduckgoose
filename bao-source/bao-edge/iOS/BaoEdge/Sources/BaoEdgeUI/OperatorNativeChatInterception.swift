import EventKit
import Foundation
import OSLog
import BaoEdgeCore
import WebKit

/// Centralized configuration for iOS-native operator chat intents.
struct OperatorNativeChatIntentConfiguration: Sendable {
    let appleMacBookProBuyPageURL: URL
    let appleResearchTimeout: Duration
    let appleResearchRetryDelay: Duration
    let defaultCalendarEventDuration: Duration
    let referenceDate: @Sendable () -> Date
    let locale: Locale
    let timeZone: TimeZone
    let calendar: Calendar

    static let live: OperatorNativeChatIntentConfiguration = {
        var calendar = Calendar(identifier: .gregorian)
        calendar.locale = .autoupdatingCurrent
        calendar.timeZone = .autoupdatingCurrent
        return OperatorNativeChatIntentConfiguration(
            appleMacBookProBuyPageURL: URL(string: "https://www.apple.com/shop/buy-mac/macbook-pro/16-inch")!,
            appleResearchTimeout: .seconds(18),
            appleResearchRetryDelay: .milliseconds(400),
            defaultCalendarEventDuration: .seconds(3_600),
            referenceDate: Date.init,
            locale: .autoupdatingCurrent,
            timeZone: .autoupdatingCurrent,
            calendar: calendar
        )
    }()
}

/// Native operator chat intents owned directly by the iOS client.
enum OperatorNativeChatIntentKind: Equatable, Sendable {
    case calendar
    case appleMacPricing
}

private enum OperatorNativeChatIntent: Sendable {
    case calendar(OperatorNativeCalendarDraft)
    case appleMacPricing
}

func operatorNativeChatIntentKind(
    for message: String,
    hasAttachedInputs: Bool = false,
    configuration: OperatorNativeChatIntentConfiguration = .live
) -> OperatorNativeChatIntentKind? {
    guard !hasAttachedInputs else {
        return nil
    }
    return OperatorNativeChatMessageClassifier(config: configuration).intentKind(for: message)
}

/// Native response envelope appended into the operator conversation.
struct OperatorNativeChatHandledResponse: Sendable {
    let title: String
    let body: String
    let state: FlowExecutionState
    let stateMessage: String
    let role: OperatorConversationRole
    let clearsComposer: Bool
}

private enum OperatorNativeChatHandlingResult: Sendable {
    case notHandled
    case handled(OperatorNativeChatHandledResponse)
}

/// Parsed calendar event draft extracted from the operator prompt.
struct OperatorNativeCalendarDraft: Equatable, Sendable {
    let title: String
    let startDate: Date
    let endDate: Date
    let isAllDay: Bool
    let notes: String
}

struct OperatorNativeCalendarSavedEvent: Equatable, Sendable {
    let title: String
    let startDate: Date
    let endDate: Date
    let isAllDay: Bool
    let calendarTitle: String
}

enum OperatorNativeCalendarWriteFailure: Error, Equatable, Sendable {
    case permissionDenied
    case calendarUnavailable
    case saveFailed
}

@MainActor
protocol OperatorNativeCalendarWriting: AnyObject {
    func createEvent(_ draft: OperatorNativeCalendarDraft) async -> Result<OperatorNativeCalendarSavedEvent, OperatorNativeCalendarWriteFailure>
}

@MainActor
protocol OperatorApplePricingResearching: AnyObject {
    func researchPricing() async -> Result<OperatorApplePricingSnapshot, OperatorApplePricingResearchFailure>
}

enum OperatorApplePricingResearchFailure: Error, Equatable, Sendable {
    case timedOut
    case pageLoadFailed
    case extractionFailed
}

/// Snapshot extracted from Apple's live 16-inch MacBook Pro buy page.
struct OperatorApplePricingSnapshot: Codable, Equatable, Sendable {
    struct TopProduct: Codable, Equatable, Sendable {
        let priceKey: String
        let price: Double
        let priceDisplay: String?
        let dimensions: [String: String]
    }

    let url: String
    let pageTitle: String?
    let lowPrice: Double?
    let highPrice: Double?
    let currency: String?
    let topProduct: TopProduct?
    let maxMemory: String?
    let maxStorage: String?
    let maxPowerAdapter: String?
    let softwareOptions: [String]

    var hasLivePricingData: Bool {
        topProduct != nil || highPrice != nil
    }
}

private struct OperatorNativeChatMessageClassifier {
    let config: OperatorNativeChatIntentConfiguration

    func intentKind(for message: String) -> OperatorNativeChatIntentKind? {
        guard let intent = intent(for: message) else {
            return nil
        }
        switch intent {
        case .calendar:
            return .calendar
        case .appleMacPricing:
            return .appleMacPricing
        }
    }

    func intent(for message: String) -> OperatorNativeChatIntent? {
        if let draft = parseCalendarDraft(from: message) {
            return .calendar(draft)
        }
        if shouldResearchApplePricing(from: message) {
            return .appleMacPricing
        }
        return nil
    }

    private func parseCalendarDraft(from message: String) -> OperatorNativeCalendarDraft? {
        let normalized = message.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalized.isEmpty else {
            return nil
        }

        let lowercased = normalized.lowercased()
        let hasCalendarVerb = ["schedule", "create", "add", "book", "set up", "setup", "put"].contains { lowercased.contains($0) }
        let hasCalendarNoun = ["calendar", "event", "invite", "meeting", "appointment"].contains { lowercased.contains($0) }
        guard hasCalendarVerb && hasCalendarNoun else {
            return nil
        }

        guard let detector = try? NSDataDetector(types: NSTextCheckingResult.CheckingType.date.rawValue) else {
            return nil
        }
        let range = NSRange(normalized.startIndex..<normalized.endIndex, in: normalized)
        guard let dateMatch = detector.matches(in: normalized, options: [], range: range).first,
              let startDate = dateMatch.date else {
            return nil
        }

        let matchedDateText = Range(dateMatch.range, in: normalized).map { String(normalized[$0]) } ?? ""
        let explicitDurationSeconds = parseDurationSeconds(from: normalized)
        let detectedDurationSeconds = dateMatch.duration > 0 ? dateMatch.duration : nil
        let isAllDay = lowercased.contains("all day") || !containsExplicitTime(in: matchedDateText)
        let resolvedStartDate: Date
        let resolvedEndDate: Date
        if isAllDay {
            let dayStart = config.calendar.startOfDay(for: startDate)
            resolvedStartDate = dayStart
            resolvedEndDate = config.calendar.date(byAdding: .day, value: 1, to: dayStart) ?? dayStart.addingTimeInterval(86_400)
        } else {
            resolvedStartDate = startDate
            let duration = explicitDurationSeconds
                ?? detectedDurationSeconds
                ?? Double(config.defaultCalendarEventDuration.components.seconds)
            resolvedEndDate = startDate.addingTimeInterval(duration)
        }

        let title = extractCalendarTitle(from: normalized, removing: dateMatch.range) ?? L10n.t("flow_runner_native_calendar_default_title")
        return OperatorNativeCalendarDraft(
            title: title,
            startDate: resolvedStartDate,
            endDate: resolvedEndDate,
            isAllDay: isAllDay,
            notes: normalized
        )
    }

    private func shouldResearchApplePricing(from message: String) -> Bool {
        let normalized = message.lowercased()
        let mentionsMacBook = normalized.contains("macbook") && normalized.contains("pro")
        let mentionsPricing = ["price", "prices", "pricing", "cost", "costs", "configure", "buy", "research"].contains {
            normalized.contains($0)
        }
        let mentionsApple = normalized.contains("apple") || normalized.contains("macbook")
        return mentionsApple && mentionsMacBook && mentionsPricing
    }

    private func parseDurationSeconds(from message: String) -> TimeInterval? {
        let patterns: [(String, TimeInterval)] = [
            ("(?i)for\\s+(\\d+)\\s*(minutes?|mins?|m)\\b", 60),
            ("(?i)for\\s+(\\d+)\\s*(hours?|hrs?|h)\\b", 3_600)
        ]
        for (pattern, multiplier) in patterns {
            guard let regex = try? NSRegularExpression(pattern: pattern) else {
                continue
            }
            let nsRange = NSRange(message.startIndex..<message.endIndex, in: message)
            guard let match = regex.firstMatch(in: message, options: [], range: nsRange),
                  let capturedRange = Range(match.range(at: 1), in: message),
                  let value = Double(message[capturedRange]) else {
                continue
            }
            return value * multiplier
        }
        return nil
    }

    private func containsExplicitTime(in message: String) -> Bool {
        message.range(
            of: #"(?i)\b\d{1,2}(?::\d{2})?\s*(am|pm)\b|\b\d{1,2}:\d{2}\b"#,
            options: .regularExpression
        ) != nil
    }

    private func extractCalendarTitle(from message: String, removing dateRange: NSRange) -> String? {
        let quotedPatterns = [
            #"(?i)(?:called|named|titled)\s+"([^"]+)""#,
            #"(?i)(?:called|named|titled)\s+'([^']+)'"#
        ]
        for pattern in quotedPatterns {
            guard let regex = try? NSRegularExpression(pattern: pattern) else {
                continue
            }
            let nsRange = NSRange(message.startIndex..<message.endIndex, in: message)
            if let match = regex.firstMatch(in: message, options: [], range: nsRange),
               let titleRange = Range(match.range(at: 1), in: message) {
                return String(message[titleRange]).trimmingCharacters(in: .whitespacesAndNewlines)
            }
        }

        let mutable = NSMutableString(string: message)
        if dateRange.location != NSNotFound {
            mutable.replaceCharacters(in: dateRange, with: " ")
        }
        let raw = String(mutable)
        let cleanupPatterns = [
            #"(?i)\b(schedule|create|add|book|set up|setup|put)\b"#,
            #"(?i)\b(a|an|the|my)\b"#,
            #"(?i)\b(calendar|invite|event|meeting|appointment)\b"#,
            #"(?i)\bfor\b"#,
            #"(?i)\ball day\b"#,
            #"(?i)\b(minutes?|mins?|hours?|hrs?)\b"#,
            #"\d+"#,
            #"[,:]"#
        ]

        let cleaned = cleanupPatterns.reduce(raw) { partial, pattern in
            partial.replacingOccurrences(of: pattern, with: " ", options: .regularExpression)
        }
        .replacingOccurrences(of: #"\s+"#, with: " ", options: .regularExpression)
        .trimmingCharacters(in: .whitespacesAndNewlines)

        guard !cleaned.isEmpty else {
            return nil
        }
        return String(cleaned.prefix(80)).trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

/// Routes operator chat prompts into iOS-native handling before cloud chat is attempted.
@MainActor
final class OperatorNativeChatInterceptor {
    private let config: OperatorNativeChatIntentConfiguration
    private let calendarWriter: any OperatorNativeCalendarWriting
    private let applePricingResearcher: any OperatorApplePricingResearching
    private let logger = Logger(subsystem: "com.baohaus.baoedge.ui", category: "OperatorNativeChatInterceptor")
    private let classifier: OperatorNativeChatMessageClassifier

    init(
        config: OperatorNativeChatIntentConfiguration = .live,
        calendarWriter: (any OperatorNativeCalendarWriting)? = nil,
        applePricingResearcher: (any OperatorApplePricingResearching)? = nil
    ) {
        self.config = config
        self.calendarWriter = calendarWriter ?? OperatorEventKitCalendarWriter(config: config)
        self.applePricingResearcher = applePricingResearcher ?? OperatorApplePricingWebResearcher(config: config)
        self.classifier = OperatorNativeChatMessageClassifier(config: config)
    }

    func intentKind(for message: String) -> OperatorNativeChatIntentKind? {
        classifier.intentKind(for: message)
    }

    func handleIfNeeded(message: String) async -> OperatorNativeChatHandledResponse? {
        switch await handleIntentIfNeeded(message: message) {
        case .notHandled:
            return nil
        case .handled(let response):
            return response
        }
    }

    func parseCalendarDraft(for message: String) -> OperatorNativeCalendarDraft? {
        guard case let .calendar(draft) = classifier.intent(for: message) else {
            return nil
        }
        return draft
    }

    private func handleIntentIfNeeded(message: String) async -> OperatorNativeChatHandlingResult {
        guard let intent = classifier.intent(for: message) else {
            return .notHandled
        }

        switch intent {
        case .calendar(let draft):
            return await handleCalendarIntent(draft)
        case .appleMacPricing:
            return await handleApplePricingIntent()
        }
    }

    private func handleCalendarIntent(_ draft: OperatorNativeCalendarDraft) async -> OperatorNativeChatHandlingResult {
        let result = await calendarWriter.createEvent(draft)
        switch result {
        case .success(let savedEvent):
            return .handled(
                OperatorNativeChatHandledResponse(
                    title: L10n.t("flow_runner_native_calendar_reply_title"),
                    body: formatCalendarReply(for: savedEvent),
                    state: .success,
                    stateMessage: L10n.t("flow_runner_native_calendar_created"),
                    role: .assistant,
                    clearsComposer: true
                )
            )
        case .failure(let failure):
            logger.error("Native calendar write failed: \(String(describing: failure), privacy: .public)")
            return .handled(
                OperatorNativeChatHandledResponse(
                    title: L10n.t("flow_runner_native_calendar_reply_title"),
                    body: calendarFailureMessage(for: failure),
                    state: .errorNonRetryable,
                    stateMessage: L10n.t("flow_runner_native_calendar_failed"),
                    role: .warning,
                    clearsComposer: false
                )
            )
        }
    }

    private func handleApplePricingIntent() async -> OperatorNativeChatHandlingResult {
        let result = await applePricingResearcher.researchPricing()
        switch result {
        case .success(let snapshot) where snapshot.hasLivePricingData:
            return .handled(
                OperatorNativeChatHandledResponse(
                    title: L10n.t("flow_runner_native_pricing_reply_title"),
                    body: formatApplePricingReply(for: snapshot),
                    state: .success,
                    stateMessage: L10n.t("flow_runner_native_pricing_ready"),
                    role: .assistant,
                    clearsComposer: true
                )
            )
        case .success:
            return .handled(
                OperatorNativeChatHandledResponse(
                    title: L10n.t("flow_runner_native_pricing_reply_title"),
                    body: L10n.t("flow_runner_native_pricing_no_data"),
                    state: .errorRetryable,
                    stateMessage: L10n.t("flow_runner_native_pricing_failed"),
                    role: .warning,
                    clearsComposer: false
                )
            )
        case .failure(let failure):
            logger.error("Native Apple pricing research failed: \(String(describing: failure), privacy: .public)")
            return .handled(
                OperatorNativeChatHandledResponse(
                    title: L10n.t("flow_runner_native_pricing_reply_title"),
                    body: applePricingFailureMessage(for: failure),
                    state: .errorRetryable,
                    stateMessage: L10n.t("flow_runner_native_pricing_failed"),
                    role: .warning,
                    clearsComposer: false
                )
            )
        }
    }

    private func formatCalendarReply(for event: OperatorNativeCalendarSavedEvent) -> String {
        let formatter = DateFormatter()
        formatter.locale = config.locale
        formatter.timeZone = config.timeZone
        formatter.dateStyle = .full
        formatter.timeStyle = event.isAllDay ? .none : .short
        let startText = formatter.string(from: event.startDate)
        let endText = formatter.string(from: event.endDate)

        return [
            "• \(L10n.t("flow_runner_native_calendar_label_title")): \(event.title)",
            "• \(L10n.t("flow_runner_native_calendar_label_calendar")): \(event.calendarTitle)",
            "• \(L10n.t("flow_runner_native_calendar_label_start")): \(startText)",
            "• \(L10n.t("flow_runner_native_calendar_label_end")): \(endText)",
            "• \(L10n.t("flow_runner_native_calendar_label_access")): \(L10n.t("flow_runner_native_calendar_access_value"))"
        ].joined(separator: "\n")
    }

    private func calendarFailureMessage(for failure: OperatorNativeCalendarWriteFailure) -> String {
        switch failure {
        case .permissionDenied:
            return L10n.t("flow_runner_native_calendar_permission_required")
        case .calendarUnavailable:
            return L10n.t("flow_runner_native_calendar_unavailable")
        case .saveFailed:
            return L10n.t("flow_runner_native_calendar_save_failed")
        }
    }

    private func formatApplePricingReply(for snapshot: OperatorApplePricingSnapshot) -> String {
        var lines = [
            "• \(L10n.t("flow_runner_native_pricing_label_source")): \(L10n.t("flow_runner_native_pricing_source_value"))",
            "• \(L10n.t("flow_runner_native_pricing_label_page")): \(snapshot.url)"
        ]

        if let topProduct = snapshot.topProduct {
            let hardwarePrice = topProduct.priceDisplay ?? formatPrice(topProduct.price, currencyCode: snapshot.currency)
            lines.append("• \(L10n.t("flow_runner_native_pricing_label_hardware_price")): \(hardwarePrice)")
            if let chip = humanReadableDimension(topProduct.dimensions["processor-dimensionChip-cpuCoreCount-gpuCoreCount"]) {
                lines.append("• \(L10n.t("flow_runner_native_pricing_label_chip")): \(chip)")
            }
            if let finish = humanReadableDimension(topProduct.dimensions["display-dimensionFinish"]) {
                lines.append("• \(L10n.t("flow_runner_native_pricing_label_finish")): \(finish)")
            }
            if let color = humanReadableDimension(topProduct.dimensions["chassis-dimensionColor"]) {
                lines.append("• \(L10n.t("flow_runner_native_pricing_label_color")): \(color)")
            }
        }

        if let highPrice = snapshot.highPrice {
            lines.append("• \(L10n.t("flow_runner_native_pricing_label_schema_max")): \(formatPrice(highPrice, currencyCode: snapshot.currency))")
        }
        if let maxMemory = humanReadableDimension(snapshot.maxMemory) {
            lines.append("• \(L10n.t("flow_runner_native_pricing_label_memory")): \(maxMemory)")
        }
        if let maxStorage = humanReadableDimension(snapshot.maxStorage) {
            lines.append("• \(L10n.t("flow_runner_native_pricing_label_storage")): \(maxStorage)")
        }
        if let maxPowerAdapter = humanReadableDimension(snapshot.maxPowerAdapter) {
            lines.append("• \(L10n.t("flow_runner_native_pricing_label_power")): \(maxPowerAdapter)")
        }

        let software = snapshot.softwareOptions
            .compactMap { option in
                humanReadableDimension(option)
            }
            .filter { !$0.isEmpty }
        if !software.isEmpty {
            lines.append("• \(L10n.t("flow_runner_native_pricing_label_software")): \(software.joined(separator: ", "))")
        }

        return lines.joined(separator: "\n")
    }

    private func applePricingFailureMessage(for failure: OperatorApplePricingResearchFailure) -> String {
        switch failure {
        case .timedOut:
            return L10n.t("flow_runner_native_pricing_timeout")
        case .pageLoadFailed:
            return L10n.t("flow_runner_native_pricing_page_load_failed")
        case .extractionFailed:
            return L10n.t("flow_runner_native_pricing_no_data")
        }
    }

    private func formatPrice(_ value: Double, currencyCode: String?) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = config.locale
        formatter.currencyCode = currencyCode ?? "USD"
        return formatter.string(from: NSNumber(value: value)) ?? String(format: "%.2f", locale: config.locale, value)
    }

    private func humanReadableDimension(_ rawValue: String?) -> String? {
        guard let rawValue, !rawValue.isEmpty else {
            return nil
        }

        if let regex = try? NSRegularExpression(pattern: #"^m(\d+)(max|pro)?-(\d+)-(\d+)$"#) {
            let nsRange = NSRange(rawValue.startIndex..<rawValue.endIndex, in: rawValue)
            if let match = regex.firstMatch(in: rawValue, options: [], range: nsRange),
               let generationRange = Range(match.range(at: 1), in: rawValue),
               let suffixRange = Range(match.range(at: 2), in: rawValue),
               let cpuRange = Range(match.range(at: 3), in: rawValue),
               let gpuRange = Range(match.range(at: 4), in: rawValue) {
                let suffixToken = String(rawValue[suffixRange])
                let suffix = switch suffixToken {
                case "max":
                    " Max"
                case "pro":
                    " Pro"
                default:
                    ""
                }
                return "M\(rawValue[generationRange])\(suffix) (\(rawValue[cpuRange])-core CPU / \(rawValue[gpuRange])-core GPU)"
            }
        }

        let replaced = rawValue
            .replacingOccurrences(of: "_", with: " ")
            .replacingOccurrences(of: "gb", with: "GB")
            .replacingOccurrences(of: "tb", with: "TB")
            .replacingOccurrences(of: "inch", with: "-inch")
            .replacingOccurrences(of: "w", with: "W")
            .replacingOccurrences(of: "logic pro", with: "Logic Pro")
            .replacingOccurrences(of: "final cut pro", with: "Final Cut Pro")
            .replacingOccurrences(of: "nano texture", with: "Nano-texture")

        let words = replaced
            .split(separator: " ")
            .map { word -> String in
                if word.uppercased() == word {
                    return String(word)
                }
                return word.prefix(1).uppercased() + word.dropFirst()
            }
        return words.joined(separator: " ")
    }
}

@MainActor
private final class OperatorEventKitCalendarWriter: OperatorNativeCalendarWriting {
    private let config: OperatorNativeChatIntentConfiguration
    private let eventStore = EKEventStore()
    private let logger = Logger(subsystem: "com.baohaus.baoedge.ui", category: "OperatorEventKitCalendarWriter")

    init(config: OperatorNativeChatIntentConfiguration) {
        self.config = config
    }

    func createEvent(_ draft: OperatorNativeCalendarDraft) async -> Result<OperatorNativeCalendarSavedEvent, OperatorNativeCalendarWriteFailure> {
        let authorizationResult = await ensureCalendarWriteAccess()
        guard case .success = authorizationResult else {
            return .failure(.permissionDenied)
        }

        guard let calendar = eventStore.defaultCalendarForNewEvents else {
            return .failure(.calendarUnavailable)
        }

        let event = EKEvent(eventStore: eventStore)
        event.calendar = calendar
        event.title = draft.title
        event.startDate = draft.startDate
        event.endDate = draft.endDate
        event.isAllDay = draft.isAllDay
        event.notes = draft.notes
        event.timeZone = draft.isAllDay ? nil : config.timeZone

        do {
            try eventStore.save(event, span: .thisEvent, commit: true)
            return .success(
                OperatorNativeCalendarSavedEvent(
                    title: draft.title,
                    startDate: draft.startDate,
                    endDate: draft.endDate,
                    isAllDay: draft.isAllDay,
                    calendarTitle: calendar.title
                )
            )
        } catch {
            logger.error("EventKit save failed: \(error.localizedDescription, privacy: .public)")
            return .failure(.saveFailed)
        }
    }

    private func ensureCalendarWriteAccess() async -> Result<Void, OperatorNativeCalendarWriteFailure> {
        switch EKEventStore.authorizationStatus(for: .event) {
        case .writeOnly, .fullAccess:
            return .success(())
        case .restricted, .denied:
            return .failure(.permissionDenied)
        case .notDetermined:
            do {
                let granted: Bool = try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Bool, Error>) in
                    eventStore.requestWriteOnlyAccessToEvents { granted, error in
                        if let error {
                            continuation.resume(throwing: error)
                            return
                        }
                        continuation.resume(returning: granted)
                    }
                }
                return granted ? .success(()) : .failure(.permissionDenied)
            } catch {
                logger.error("EventKit permission request failed: \(error.localizedDescription, privacy: .public)")
                return .failure(.permissionDenied)
            }
        @unknown default:
            return .failure(.permissionDenied)
        }
    }
}

@MainActor
private final class OperatorApplePricingWebResearcher: NSObject, OperatorApplePricingResearching {
    private let config: OperatorNativeChatIntentConfiguration
    private let logger = Logger(subsystem: "com.baohaus.baoedge.ui", category: "OperatorApplePricingWebResearcher")

    init(config: OperatorNativeChatIntentConfiguration) {
        self.config = config
    }

    func researchPricing() async -> Result<OperatorApplePricingSnapshot, OperatorApplePricingResearchFailure> {
        let session = OperatorApplePricingResearchSession(config: config, logger: logger)
        return await session.run()
    }
}

@MainActor
private final class OperatorApplePricingResearchSession: NSObject, WKNavigationDelegate {
    private let config: OperatorNativeChatIntentConfiguration
    private let logger: Logger
    private let webView: WKWebView
    private var navigationContinuation: CheckedContinuation<Result<Void, OperatorApplePricingResearchFailure>, Never>?

    init(config: OperatorNativeChatIntentConfiguration, logger: Logger) {
        self.config = config
        self.logger = logger
        let webViewConfiguration = WKWebViewConfiguration()
        webViewConfiguration.websiteDataStore = .nonPersistent()
        webViewConfiguration.defaultWebpagePreferences.allowsContentJavaScript = true
        self.webView = WKWebView(frame: .zero, configuration: webViewConfiguration)
        super.init()
        webView.navigationDelegate = self
        webView.isHidden = true
    }

    func run() async -> Result<OperatorApplePricingSnapshot, OperatorApplePricingResearchFailure> {
        let request = URLRequest(
            url: config.appleMacBookProBuyPageURL,
            cachePolicy: .reloadIgnoringLocalCacheData,
            timeoutInterval: config.appleResearchTimeout.timeInterval
        )
        webView.load(request)

        let loadResult = await waitForNavigation()
        guard case .success = loadResult else {
            return .failure(.pageLoadFailed)
        }

        let clock = ContinuousClock()
        let start = clock.now
        while clock.now - start < config.appleResearchTimeout {
            switch await evaluateSnapshot() {
            case .success(let snapshot):
                if snapshot.hasLivePricingData {
                    return .success(snapshot)
                }
            case .failure(.extractionFailed):
                break
            case .failure(let failure):
                return .failure(failure)
            }
            try? await Task.sleep(for: config.appleResearchRetryDelay)
        }
        logger.error("WKWebView Apple research timed out after \(self.config.appleResearchTimeout.timeInterval, privacy: .public)s")
        return .failure(.timedOut)
    }

    private func waitForNavigation() async -> Result<Void, OperatorApplePricingResearchFailure> {
        await withCheckedContinuation { continuation in
            navigationContinuation = continuation
        }
    }

    private func evaluateSnapshot() async -> Result<OperatorApplePricingSnapshot, OperatorApplePricingResearchFailure> {
        do {
            guard let jsonPayload = try await evaluateJavaScript(OperatorApplePricingResearchSession.extractionScript),
                  let payloadData = jsonPayload.data(using: .utf8) else {
                return .failure(.extractionFailed)
            }
            let snapshot = try JSONDecoder().decode(OperatorApplePricingSnapshot.self, from: payloadData)
            return .success(snapshot)
        } catch {
            logger.error("WKWebView Apple research extraction failed: \(error.localizedDescription, privacy: .public)")
            return .failure(.extractionFailed)
        }
    }

    private func evaluateJavaScript(_ script: String) async throws -> String? {
        try await withCheckedThrowingContinuation { continuation in
            webView.evaluateJavaScript(script) { result, error in
                if let error {
                    continuation.resume(throwing: error)
                    return
                }
                continuation.resume(returning: result as? String)
            }
        }
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        navigationContinuation?.resume(returning: .success(()))
        navigationContinuation = nil
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        logger.error("WKWebView navigation failed: \(error.localizedDescription, privacy: .public)")
        navigationContinuation?.resume(returning: .failure(.pageLoadFailed))
        navigationContinuation = nil
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        logger.error("WKWebView provisional navigation failed: \(error.localizedDescription, privacy: .public)")
        navigationContinuation?.resume(returning: .failure(.pageLoadFailed))
        navigationContinuation = nil
    }

    private static let extractionScript = #"""
    (() => {
      const bootstrap = window.PRODUCT_SELECTION_BOOTSTRAP?.productSelectionData;
      if (!bootstrap) {
        return null;
      }

      const parseSchemaNodes = () => {
        const nodes = [];
        const parseErrors = [];
        for (const node of document.querySelectorAll('script[type="application/ld+json"]')) {
          const text = node.textContent;
          try {
            const parsed = JSON.parse(text ?? 'null');
            if (Array.isArray(parsed)) {
              nodes.push(...parsed);
            } else if (parsed) {
              nodes.push(parsed);
            }
          } catch (error) {
            parseErrors.push({
              message: error instanceof Error ? error.message : String(error),
              source: text?.slice(0, 160) ?? null
            });
          }
        }
        return {
          nodes,
          parseErrors
        };
      };

      const prices = bootstrap.mainDisplayValues?.prices ?? {};
      const {nodes, parseErrors} = parseSchemaNodes();
      const screenFilteredProducts = Object.values(bootstrap.products ?? {})
        .filter((product) => product?.dimensions?.["chassis-dimensionScreensize"] === "16inch")
        .map((product) => {
          const priceEntry = prices[product.priceKey] ?? {};
          const numericPrice = Number(
            priceEntry.currentPrice?.raw_amount ??
            priceEntry.seoPrice ??
            0
          );
          return {
            priceKey: product.priceKey ?? "",
            price: Number.isFinite(numericPrice) ? numericPrice : 0,
            priceDisplay: priceEntry.currentPrice?.amount ?? null,
            dimensions: product.dimensions ?? {}
          };
        })
        .sort((left, right) => right.price - left.price);

      const variantOrder = (key) => {
        const values = bootstrap.configDisplayValues?.[key]?.variantOrder;
        return Array.isArray(values) && values.length > 0 ? values[values.length - 1] : null;
      };

      const productSchema = nodes.find((node) => {
        const type = node?.["@type"];
        const name = typeof node?.name === "string" ? node.name : "";
        return type === "Product" && /16-inch MacBook Pro/i.test(name);
      });

      const offer = Array.isArray(productSchema?.offers) ? productSchema.offers[0] ?? null : productSchema?.offers ?? null;
      const softwareOptions = [
        variantOrder("software_logic-preInstalledSoftware"),
        variantOrder("software_final-preInstalledSoftware")
      ].filter((value) => value && value !== "none");

      return JSON.stringify({
        url: window.location.href,
        pageTitle: document.title,
        lowPrice: offer?.lowPrice ?? null,
        highPrice: offer?.highPrice ?? null,
        currency: offer?.priceCurrency ?? null,
        topProduct: screenFilteredProducts[0] ?? null,
        maxMemory: variantOrder("memory-dimensionMemory"),
        maxStorage: variantOrder("storage-dimensionCapacity"),
        maxPowerAdapter: variantOrder("power_adapter-wattage"),
        softwareOptions,
        schemaParseErrors: parseErrors
      });
    })();
    """#
}

private extension Duration {
    var timeInterval: TimeInterval {
        Double(components.seconds) + Double(components.attoseconds) / 1_000_000_000_000_000_000
    }
}

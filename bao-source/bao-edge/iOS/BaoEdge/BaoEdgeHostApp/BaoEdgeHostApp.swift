import OSLog
import SwiftUI
import UIKit
import BaoEdgeCore
import BaoEdgeDriver
import BaoEdgeUI

@main
struct BaoEdgeHostApp: App {
    @UIApplicationDelegateAdaptor(DeviceAiApplicationDelegate.self) private var appDelegate
    @Environment(\.scenePhase) private var scenePhase

    var body: some Scene {
        WindowGroup {
            FlowRunnerView()
                .task {
                    appDelegate.startPreparedDeviceAiBootstrapIfNeeded()
                }
        }
        .onChange(of: scenePhase) { _, newPhase in
            if newPhase == .active {
                appDelegate.startPreparedDeviceAiBootstrapIfNeeded()
            }
        }
    }
}

@MainActor
private final class DeviceAiApplicationDelegate: NSObject, UIApplicationDelegate {
    private let deviceAiProtocolRunner = DeviceAiProtocolRunner(config: .shared)
    private let runtimeConfig = ControlPlaneRuntimeConfig.shared
    private let bootstrapCoordinator = DeviceAiBootstrapCoordinator()

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        BaoEdgeTheme.registerFonts()
        bootstrapCoordinator.prepareIfNeeded(
            environment: ProcessInfo.processInfo.environment,
            runtimeConfig: runtimeConfig,
            defaultAppId: Bundle.main.bundleIdentifier ?? ""
        )
        bootstrapCoordinator.startIfNeeded(runner: deviceAiProtocolRunner)
        return true
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        bootstrapCoordinator.startIfNeeded(runner: deviceAiProtocolRunner)
    }

    func startPreparedDeviceAiBootstrapIfNeeded() {
        bootstrapCoordinator.startIfNeeded(runner: deviceAiProtocolRunner)
    }
}

@MainActor
private final class DeviceAiBootstrapCoordinator {
    private let logger = Logger(subsystem: "com.baohaus.baoedge.driver", category: "DeviceAiBootstrap")
    private var launchRequest: DeviceAiProtocolLaunchRequest? = nil
    private var bootstrapTask: Task<Void, Never>? = nil

    func prepareIfNeeded(
        environment: [String: String],
        runtimeConfig: ControlPlaneRuntimeConfig,
        defaultAppId: String
    ) {
        guard bootstrapTask == nil, launchRequest == nil else {
            return
        }
        guard let resolvedLaunchRequest = DeviceAiProtocolRunner.launchRequest(
            environment: environment,
            config: runtimeConfig,
            defaultAppId: defaultAppId
        ) else {
            logger.debug("device_ai_bootstrap_skipped reason=no_launch_request")
            return
        }
        launchRequest = resolvedLaunchRequest
        logger.notice(
            "device_ai_bootstrap_prepared correlationId=\(resolvedLaunchRequest.request.correlationId, privacy: .public)"
        )
    }

    func startIfNeeded(runner: DeviceAiProtocolRunner) {
        guard bootstrapTask == nil, let launchRequest else {
            return
        }
        logger.notice(
            "device_ai_bootstrap_started correlationId=\(launchRequest.request.correlationId, privacy: .public)"
        )
        bootstrapTask = Task { [logger, runner] in
            let outcome = await runner.run(request: launchRequest.request)
            logger.notice(
                "device_ai_bootstrap_completed correlationId=\(outcome.report.correlationId, privacy: .public) state=\(String(describing: outcome.report.state), privacy: .public) reportPath=\(outcome.latestReportURL.path, privacy: .public)"
            )
        }
        self.launchRequest = nil
    }
}

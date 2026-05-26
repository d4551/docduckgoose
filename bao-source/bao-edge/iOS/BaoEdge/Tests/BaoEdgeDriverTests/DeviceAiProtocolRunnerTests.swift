import Foundation
import Testing
@testable import BaoEdgeCore
@testable import BaoEdgeDriver

@Suite("DeviceAiProtocolRunner")
struct DeviceAiProtocolRunnerTests {
  @Test("run writes correlation and latest reports for a successful native protocol run")
  func runWritesSuccessfulReports() async throws {
    let rootDirectory = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(UUID().uuidString, isDirectory: true)
    try FileManager.default.createDirectory(at: rootDirectory, withIntermediateDirectories: true)

    let config = ControlPlaneRuntimeConfig(
      deviceAiRequiredModelRef: "example/model",
      deviceAiRequiredModelRevision: "rev-1",
      deviceAiRequiredModelFileName: "AutoGLM.gguf",
      deviceAiRequiredModelSha256: "abc123",
      deviceAiManagedModelDirectory: "managed/models",
      deviceAiManagedReportDirectory: "managed/reports",
      deviceAiDownloadMaxAttempts: 1,
      deviceAiHfToken: "hf_test_token"
    )
    let expectedDate = Date(timeIntervalSince1970: 1_700_000_000)
    let runner = await MainActor.run {
      DeviceAiProtocolRunner(
        config: config,
        fileManager: .default,
        applicationSupportRootProvider: { .success(rootDirectory) },
        downloadOperation: { _, destinationURL in
          let payload = Data("device-ai".utf8)
          let writeResult = Result { try payload.write(to: destinationURL, options: .atomic) }
          if case .failure(let error) = writeResult {
            return .failure(
              HuggingFaceModelManagerError(
                code: .ioFailure,
                message: error.localizedDescription,
                retryable: false,
                correlationId: "corr-success"
              )
            )
          }
          return .success(
            HuggingFaceModelDownloadOutcome(
              artifactURL: destinationURL,
              sha256: "abc123",
              sizeBytes: Int64(payload.count),
              correlationId: "corr-success"
            )
          )
        },
        smokeOperation: { appId, correlationId, _ in
          IosDriverReport(
            completedSteps: 1,
            totalSteps: 1,
            state: .success,
            message: "Smoke passed for \(appId)",
            correlationId: correlationId,
            steps: [
              IosDriverStepReport(
                commandIndex: 0,
                commandType: "launchApp",
                state: .success,
                message: "launchApp executed successfully",
                startedAt: "2026-03-06T00:00:00.000Z",
                endedAt: "2026-03-06T00:00:00.100Z",
                durationMs: 100,
                error: nil,
                artifact: nil
              )
            ]
          )
        },
        now: { expectedDate }
      )
    }

    let outcome = await runner.run(
      request: DeviceAiProtocolRequest(
        appId: "com.baohaus.baoedge.ios",
        modelRef: "example/model",
        revision: "rev-1",
        fileName: "AutoGLM.gguf",
        expectedSha256: "abc123",
        token: "hf_test_token",
        correlationId: "corr-success"
      )
    )

    let expectedArtifactPath = rootDirectory
      .appendingPathComponent("managed", isDirectory: true)
      .appendingPathComponent("models", isDirectory: true)
      .appendingPathComponent("AutoGLM.gguf", isDirectory: false)
      .path
    #expect(outcome.report.state == .success)
    #expect(outcome.report.failure == nil)
    #expect(outcome.report.artifact?.path == expectedArtifactPath)
    #expect(outcome.report.model?.modelRef == "example/model")
    #expect(outcome.report.model?.capabilities == [.mobileActions, .rpaControls, .flowCommands])
    #expect(outcome.report.generatedAt == "2023-11-14T22:13:20.000Z")
    #expect(FileManager.default.fileExists(atPath: outcome.reportURL.path))
    #expect(FileManager.default.fileExists(atPath: outcome.latestReportURL.path))

    let decoder = JSONDecoder()
    let persisted = try decoder.decode(DeviceAiProtocolRunReport.self, from: Data(contentsOf: outcome.reportURL))
    let latest = try decoder.decode(DeviceAiProtocolRunReport.self, from: Data(contentsOf: outcome.latestReportURL))

    #expect(persisted == outcome.report)
    #expect(latest == outcome.report)
  }

  @Test("run persists an in-progress report before download work starts")
  func runPersistsInProgressReportBeforeDownload() async throws {
    let rootDirectory = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(UUID().uuidString, isDirectory: true)
    try FileManager.default.createDirectory(at: rootDirectory, withIntermediateDirectories: true)

    let config = ControlPlaneRuntimeConfig(
      deviceAiRequiredModelRef: "example/model",
      deviceAiRequiredModelRevision: "rev-1",
      deviceAiRequiredModelFileName: "AutoGLM.gguf",
      deviceAiRequiredModelSha256: "abc123",
      deviceAiManagedModelDirectory: "managed/models",
      deviceAiManagedReportDirectory: "managed/reports",
      deviceAiDownloadMaxAttempts: 1
    )
    let latestReportURL = rootDirectory
      .appendingPathComponent("managed", isDirectory: true)
      .appendingPathComponent("reports", isDirectory: true)
      .appendingPathComponent("latest.json", isDirectory: false)
    let decoder = JSONDecoder()
    var observedProgressReport: DeviceAiProtocolRunReport?

    let runner = await MainActor.run {
      DeviceAiProtocolRunner(
        config: config,
        fileManager: .default,
        applicationSupportRootProvider: { .success(rootDirectory) },
        downloadOperation: { _, destinationURL in
          if let data = try? Data(contentsOf: latestReportURL),
             let progressReport = try? decoder.decode(DeviceAiProtocolRunReport.self, from: data) {
            observedProgressReport = progressReport
          }
          let payload = Data("device-ai".utf8)
          let writeResult = Result { try payload.write(to: destinationURL, options: .atomic) }
          if case .failure(let error) = writeResult {
            return .failure(
              HuggingFaceModelManagerError(
                code: .ioFailure,
                message: error.localizedDescription,
                retryable: false,
                correlationId: "corr-progress"
              )
            )
          }
          return .success(
            HuggingFaceModelDownloadOutcome(
              artifactURL: destinationURL,
              sha256: "abc123",
              sizeBytes: Int64(payload.count),
              correlationId: "corr-progress"
            )
          )
        },
        smokeOperation: { appId, correlationId, _ in
          IosDriverReport(
            completedSteps: 1,
            totalSteps: 1,
            state: .success,
            message: "Smoke passed for \(appId)",
            correlationId: correlationId,
            steps: []
          )
        }
      )
    }

    _ = await runner.run(
      request: DeviceAiProtocolRequest(
        appId: "com.baohaus.baoedge.ios",
        modelRef: "example/model",
        revision: "rev-1",
        fileName: "AutoGLM.gguf",
        expectedSha256: "abc123",
        correlationId: "corr-progress"
      )
    )

    #expect(observedProgressReport?.state == .loading)
    #expect(observedProgressReport?.stages.last?.status == .inProgress)
    #expect(observedProgressReport?.stages.last?.message.contains("AutoGLM.gguf") == true)
  }

  @Test("launchRequest reads autorun environment and config defaults")
  @MainActor
  func launchRequestUsesEnvironmentAndConfig() {
    let config = ControlPlaneRuntimeConfig(
      deviceAiRequiredModelRef: "example/model",
      deviceAiRequiredModelRevision: "rev-2",
      deviceAiRequiredModelFileName: "bundle.gguf",
      deviceAiRequiredModelSha256: "deadbeef",
      deviceAiHfToken: "hf_launch_token"
    )

    let launchRequest = DeviceAiProtocolRunner.launchRequest(
      environment: [
        "BAO_EDGE_DEVICE_AI_PROTOCOL_AUTORUN": "true",
        "BAO_EDGE_DEVICE_AI_PROTOCOL_APP_ID": "com.baohaus.baoedge.host",
        "BAO_EDGE_DEVICE_AI_PROTOCOL_CORRELATION_ID": "corr-launch"
      ],
      config: config,
      defaultAppId: "com.baohaus.baoedge.fallback"
    )

    #expect(launchRequest?.isEnabled == true)
    #expect(launchRequest?.request.appId == "com.baohaus.baoedge.host")
    #expect(launchRequest?.request.modelRef == "example/model")
    #expect(launchRequest?.request.revision == "rev-2")
    #expect(launchRequest?.request.fileName == "bundle.gguf")
    #expect(launchRequest?.request.expectedSha256 == "deadbeef")
    #expect(launchRequest?.request.token == "hf_launch_token")
    #expect(launchRequest?.request.correlationId == "corr-launch")
  }

  @Test("run honors protocol application support root override")
  func runUsesEnvironmentApplicationSupportRootOverride() async throws {
    let sandboxRoot = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(UUID().uuidString, isDirectory: true)
    let explicitApplicationSupportRoot = sandboxRoot
      .appendingPathComponent("explicit-application-support", isDirectory: true)
    try FileManager.default.createDirectory(at: explicitApplicationSupportRoot, withIntermediateDirectories: true)

    let config = ControlPlaneRuntimeConfig(
      deviceAiRequiredModelRef: "example/model",
      deviceAiRequiredModelRevision: "rev-1",
      deviceAiRequiredModelFileName: "AutoGLM.gguf",
      deviceAiRequiredModelSha256: "abc123",
      deviceAiManagedModelDirectory: "managed/models",
      deviceAiManagedReportDirectory: "managed/reports",
      deviceAiDownloadMaxAttempts: 1
    )
    var observedArtifactURL: URL?

    let runner = await MainActor.run {
      DeviceAiProtocolRunner(
        config: config,
        fileManager: .default,
        environment: [
          "BAO_EDGE_DEVICE_AI_PROTOCOL_APPLICATION_SUPPORT_ROOT": explicitApplicationSupportRoot.path
        ],
        downloadOperation: { _, destinationURL in
          observedArtifactURL = destinationURL
          let payload = Data("device-ai".utf8)
          let writeResult = Result { try payload.write(to: destinationURL, options: .atomic) }
          if case .failure(let error) = writeResult {
            return .failure(
              HuggingFaceModelManagerError(
                code: .ioFailure,
                message: error.localizedDescription,
                retryable: false,
                correlationId: "corr-explicit-root"
              )
            )
          }
          return .success(
            HuggingFaceModelDownloadOutcome(
              artifactURL: destinationURL,
              sha256: "abc123",
              sizeBytes: Int64(payload.count),
              correlationId: "corr-explicit-root"
            )
          )
        },
        smokeOperation: { _, correlationId, _ in
          IosDriverReport(
            completedSteps: 1,
            totalSteps: 1,
            state: .success,
            message: "Smoke passed",
            correlationId: correlationId,
            steps: []
          )
        }
      )
    }

    let outcome = await runner.run(
      request: DeviceAiProtocolRequest(
        appId: "com.baohaus.baoedge.ios",
        modelRef: "example/model",
        revision: "rev-1",
        fileName: "AutoGLM.gguf",
        expectedSha256: "abc123",
        correlationId: "corr-explicit-root"
      )
    )

    let expectedArtifactRoot = explicitApplicationSupportRoot
      .appendingPathComponent("managed", isDirectory: true)
      .appendingPathComponent("models", isDirectory: true)
    let expectedReportRoot = explicitApplicationSupportRoot
      .appendingPathComponent("managed", isDirectory: true)
      .appendingPathComponent("reports", isDirectory: true)

    #expect(observedArtifactURL?.deletingLastPathComponent().path == expectedArtifactRoot.path)
    #expect(outcome.latestReportURL.deletingLastPathComponent().path == expectedReportRoot.path)
  }

  @Test("run writes validation failure reports for bootstrap consumers")
  func runWritesValidationFailure() async throws {
    let rootDirectory = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(UUID().uuidString, isDirectory: true)
    try FileManager.default.createDirectory(at: rootDirectory, withIntermediateDirectories: true)

    let config = ControlPlaneRuntimeConfig(
      deviceAiManagedModelDirectory: "managed/models",
      deviceAiManagedReportDirectory: "managed/reports"
    )
    let runner = await MainActor.run {
      DeviceAiProtocolRunner(
        config: config,
        fileManager: .default,
        applicationSupportRootProvider: { .success(rootDirectory) },
        downloadOperation: { _, _ in
          Issue.record("downloadOperation should not run when validation fails")
          return .failure(
            HuggingFaceModelManagerError(
              code: .invalidModelReference,
              message: "unexpected",
              retryable: false,
              correlationId: "unexpected"
            )
          )
        },
        smokeOperation: { _, _, _ in
          Issue.record("smokeOperation should not run when validation fails")
          return IosDriverReport(
            completedSteps: 0,
            totalSteps: 0,
            state: .errorNonRetryable,
            message: "unexpected",
            correlationId: "unexpected",
            steps: []
          )
        }
      )
    }

    let outcome = await runner.run(
      request: DeviceAiProtocolRequest(
        appId: "",
        modelRef: "example/model",
        revision: "rev-1",
        fileName: "AutoGLM.gguf",
        expectedSha256: "abc123",
        correlationId: "corr-validation"
      )
    )

    #expect(outcome.report.state == FlowExecutionState.errorNonRetryable)
    #expect(outcome.report.model == nil)
    #expect(outcome.report.failure?.stage == .validation)
    #expect(outcome.report.failure?.code == "IOS_DEVICE_AI_APP_ID_REQUIRED")
    #expect(FileManager.default.fileExists(atPath: outcome.reportURL.path))
    #expect(FileManager.default.fileExists(atPath: outcome.latestReportURL.path))
  }
}

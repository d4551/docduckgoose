import CryptoKit
import Foundation
import Testing
@testable import BaoEdgeDriver

private actor RequestRecorder {
  private var recordedRequest: URLRequest?

  func record(_ request: URLRequest) {
    recordedRequest = request
  }

  func value() -> URLRequest? {
    recordedRequest
  }
}

private struct MockHuggingFaceNetworking: HuggingFaceNetworking {
  let recorder: RequestRecorder
  let responseData: Data

  func download(for request: URLRequest) async throws -> (URL, HTTPURLResponse) {
    await recorder.record(request)
    let temporaryDirectory = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(UUID().uuidString, isDirectory: true)
    try FileManager.default.createDirectory(at: temporaryDirectory, withIntermediateDirectories: true)
    let downloadedFileURL = temporaryDirectory.appendingPathComponent("response.bin")
    try responseData.write(to: downloadedFileURL, options: .atomic)
    let response = HTTPURLResponse(
      url: request.url ?? URL(string: "https://huggingface.co")!,
      statusCode: 200,
      httpVersion: nil,
      headerFields: nil
    )!
    return (downloadedFileURL, response)
  }
}

@Suite("HuggingFaceModelManager")
struct HuggingFaceModelManagerTests {
  @Test("downloadAndVerify writes the artifact and preserves revision + auth headers")
  func downloadAndVerifySucceeds() async throws {
    let data = Data("device-ai-model".utf8)
    let digest = SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined()
    let recorder = RequestRecorder()
    let manager = HuggingFaceModelManager(
      config: HuggingFaceModelManagerConfig(maxAttempts: 1),
      networking: MockHuggingFaceNetworking(recorder: recorder, responseData: data)
    )

    let destinationDirectory = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(UUID().uuidString, isDirectory: true)
    try FileManager.default.createDirectory(at: destinationDirectory, withIntermediateDirectories: true)
    let destinationURL = destinationDirectory.appendingPathComponent("AutoGLM.gguf")

    let outcome = try await manager.downloadAndVerify(
      request: HuggingFaceModelDownloadRequest(
        modelRef: "huggingface.co/example/AutoGLM-Phone-9B-Multilingual",
        fileName: "AutoGLM.gguf",
        revision: "rev-123",
        expectedSha256: digest,
        token: "hf_test_token",
        correlationId: "corr-1"
      ),
      destinationURL: destinationURL
    )

    #expect(outcome.artifactURL.path == destinationURL.path)
    #expect(outcome.sha256 == digest)
    #expect(outcome.sizeBytes == Int64(data.count))

    let request = await recorder.value()
    #expect(request?.value(forHTTPHeaderField: "Authorization") == "Bearer hf_test_token")
    #expect(request?.url?.absoluteString.contains("/example/AutoGLM-Phone-9B-Multilingual/resolve/rev-123/AutoGLM.gguf?download=true") == true)
  }

  @Test("downloadAndVerify returns checksum mismatch as non-retryable")
  func downloadAndVerifyChecksumMismatch() async throws {
    let manager = HuggingFaceModelManager(
      config: HuggingFaceModelManagerConfig(maxAttempts: 1),
      networking: MockHuggingFaceNetworking(
        recorder: RequestRecorder(),
        responseData: Data("wrong-bytes".utf8)
      )
    )
    let destinationDirectory = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(UUID().uuidString, isDirectory: true)
    try FileManager.default.createDirectory(at: destinationDirectory, withIntermediateDirectories: true)
    let destinationURL = destinationDirectory.appendingPathComponent("AutoGLM.gguf")

    let task = Task {
      try await manager.downloadAndVerify(
        request: HuggingFaceModelDownloadRequest(
          modelRef: "example/model",
          fileName: "AutoGLM.gguf",
          expectedSha256: "deadbeef",
          correlationId: "corr-2"
        ),
        destinationURL: destinationURL
      )
    }
    let result = await task.result

    switch result {
    case .success:
      Issue.record("Expected checksum mismatch failure")
    case .failure(let error):
      guard let typedError = error as? HuggingFaceModelManagerError else {
        Issue.record("Expected HuggingFaceModelManagerError, got \(error)")
        return
      }
      #expect(typedError.code == .checksumMismatch)
      #expect(typedError.retryable == false)
    }
  }

  @Test("downloadAndVerify reuses an existing verified artifact without a network call")
  func downloadAndVerifyReusesExistingArtifact() async throws {
    let data = Data("device-ai-model".utf8)
    let digest = SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined()
    let recorder = RequestRecorder()
    let manager = HuggingFaceModelManager(
      config: HuggingFaceModelManagerConfig(maxAttempts: 1),
      networking: MockHuggingFaceNetworking(recorder: recorder, responseData: Data("unexpected-network".utf8))
    )

    let destinationDirectory = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(UUID().uuidString, isDirectory: true)
    try FileManager.default.createDirectory(at: destinationDirectory, withIntermediateDirectories: true)
    let destinationURL = destinationDirectory.appendingPathComponent("AutoGLM.gguf")
    try data.write(to: destinationURL, options: .atomic)
    let partialURL = destinationURL.appendingPathExtension("part")
    try Data("stale-partial".utf8).write(to: partialURL, options: .atomic)

    let outcome = try await manager.downloadAndVerify(
      request: HuggingFaceModelDownloadRequest(
        modelRef: "example/model",
        fileName: "AutoGLM.gguf",
        expectedSha256: digest,
        correlationId: "corr-reuse"
      ),
      destinationURL: destinationURL
    )

    #expect(outcome.artifactURL.path == destinationURL.path)
    #expect(outcome.sha256 == digest)
    #expect(outcome.sizeBytes == Int64(data.count))
    #expect(FileManager.default.fileExists(atPath: partialURL.path) == false)
    #expect(await recorder.value() == nil)
  }
}

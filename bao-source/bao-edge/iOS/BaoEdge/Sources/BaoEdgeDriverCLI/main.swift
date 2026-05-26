import Foundation
import BaoEdgeCore
import BaoEdgeDriver
import BaoEdgeDriverXCTest

private struct DriverCliPayload: Codable {
    let flow: FlowV1
    let correlationId: String
    let artifactDirectory: String?
}

private enum DriverCliError: Error {
    case missingPayload
    case invalidPayload(String)
}

private func resolvePayload(arguments: [String]) throws -> DriverCliPayload {
    guard let payloadIndex = arguments.firstIndex(of: "--payload-base64"),
          arguments.indices.contains(arguments.index(after: payloadIndex)) else {
        throw DriverCliError.missingPayload
    }
    let encodedPayload = arguments[arguments.index(after: payloadIndex)]
    guard let payloadData = Data(base64Encoded: encodedPayload) else {
        throw DriverCliError.invalidPayload("Payload base64 could not be decoded.")
    }
    do {
        return try JSONDecoder().decode(DriverCliPayload.self, from: payloadData)
    } catch {
        throw DriverCliError.invalidPayload(error.localizedDescription)
    }
}

private func printUsage() {
    FileHandle.standardError.write(Data("Usage: BaoEdgeDriverCLI --payload-base64 <base64-json>\n".utf8))
}

@main
struct BaoEdgeDriverCliMain {
    static func main() {
        do {
            let payload = try resolvePayload(arguments: Array(CommandLine.arguments.dropFirst()))
            let artifactDirectory = payload.artifactDirectory.map { URL(fileURLWithPath: $0, isDirectory: true) }
            let report = IosXcTestDriver().execute(
                flow: payload.flow,
                correlationId: payload.correlationId,
                screenshotDirectory: artifactDirectory
            )
            let data = try JSONEncoder().encode(report)
            FileHandle.standardOutput.write(data)
        } catch DriverCliError.missingPayload {
            printUsage()
            Foundation.exit(64)
        } catch DriverCliError.invalidPayload(let message) {
            FileHandle.standardError.write(Data("Invalid payload: \(message)\n".utf8))
            Foundation.exit(65)
        } catch {
            FileHandle.standardError.write(Data("Driver CLI failed: \(error.localizedDescription)\n".utf8))
            Foundation.exit(70)
        }
    }
}

import Foundation
import Testing
@testable import BaoEdgeCore
@testable import BaoEdgeUI

@Suite("OperatorWorkspaceStore")
struct OperatorWorkspaceStoreTests {
  @Test("catalog snapshot decoding backfills missing model provider")
  func decodeCatalogSnapshotBackfillsMissingModelProvider() throws {
    let rawJson = """
    {
      "providerOptions": ["openai"],
      "providerDisplayNames": { "openai": "OpenAI" },
      "providerSupportsBaseUrlOverride": ["openai"],
      "modelOptions": ["gpt-4.1"],
      "modelSourceOptions": [],
      "providerState": "success",
      "providerMessage": "loaded",
      "modelListState": "success",
      "modelListMessage": "loaded"
    }
    """

    let snapshot = try JSONDecoder().decode(
      OperatorModelCatalogSnapshot.self,
      from: Data(rawJson.utf8)
    )

    #expect(snapshot.modelProvider == "")
    #expect(snapshot.modelOptions == ["gpt-4.1"])
  }

  @Test("runtime assignments replace a single capability without mutating others")
  func replacingRuntimeAssignmentIsScopedToRequestedUsage() {
    let initialAssignments = OperatorRuntimeAssignments.defaults(config: .shared)
    let nextAssignment = OperatorRuntimeAssignment(
      provider: "openai",
      model: "gpt-4.1",
      source: "cloud"
    )

    let updatedAssignments = initialAssignments.replacing(.automation, with: nextAssignment)

    #expect(updatedAssignments.assignment(for: .automation) == nextAssignment)
    #expect(updatedAssignments.assignment(for: .chat) == initialAssignments.assignment(for: .chat))
    #expect(updatedAssignments.assignment(for: .speechOutput) == initialAssignments.assignment(for: .speechOutput))
  }
}

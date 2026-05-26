import Foundation
import Testing
@testable import BaoEdgeUI

@Suite("BaoEdgeTimelineMarkdown")
struct BaoEdgeTimelineMarkdownTests {
  @Test("assistant bubbles opt into markdown rendering")
  func assistantMarkdownEligibility() {
    #expect(shouldRenderOperatorTimelineMarkdown(for: .assistant) == true)
    #expect(shouldRenderOperatorTimelineMarkdown(for: .runtime) == true)
    #expect(shouldRenderOperatorTimelineMarkdown(for: .user) == false)
  }

  @Test("markdown parser accepts formatted assistant replies")
  func parsesMarkdownContent() {
    let markdown = parseOperatorTimelineMarkdown("**Hello** Visit [Apple](https://apple.com).")
    #expect(markdown != nil)
    #expect(markdown?.description.contains("Hello") == true)
    #expect(markdown?.description.contains("Apple") == true)
  }

  @Test("plain multiline assistant replies stay literal")
  func keepsPlainMultilineContentLiteral() {
    #expect(parseOperatorTimelineMarkdown("• Title: Team sync\n• Calendar: Work") == nil)
  }

  @Test("plain assistant text does not force markdown parsing")
  func keepsPlainAssistantTextLiteral() {
    #expect(parseOperatorTimelineMarkdown("Operator ready.") == nil)
  }
}

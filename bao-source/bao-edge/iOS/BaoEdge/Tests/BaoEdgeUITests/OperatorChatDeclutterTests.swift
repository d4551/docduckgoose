import Testing
@testable import BaoEdgeUI

@Suite("OperatorChatDeclutter")
struct OperatorChatDeclutterTests {
  @Test("wide layout utility pane is reserved for automations")
  func utilityPaneVisibilityPrefersAutomationsOnly() {
    #expect(shouldShowOperatorUtilityPane(for: .chat) == false)
    #expect(shouldShowOperatorUtilityPane(for: .automations) == true)
    #expect(shouldShowOperatorUtilityPane(for: .models) == false)
    #expect(shouldShowOperatorUtilityPane(for: .settings) == false)
  }

  @Test("chat toolbar does not duplicate header actions")
  func chatToolbarPrimaryActionIsHidden() {
    #expect(shouldShowOperatorToolbarPrimaryAction(for: .chat) == false)
    #expect(shouldShowOperatorToolbarPrimaryAction(for: .automations) == true)
    #expect(shouldShowOperatorToolbarPrimaryAction(for: .models) == true)
    #expect(shouldShowOperatorToolbarPrimaryAction(for: .settings) == false)
  }

  @Test("chat composer footer is reserved for active voice state")
  func composerFooterPrefersActiveVoiceStateOnly() {
    #expect(shouldPersistOperatorComposerFooter(hasAttachedAudio: false, isListening: false) == false)
    #expect(shouldPersistOperatorComposerFooter(hasAttachedAudio: true, isListening: false) == true)
    #expect(shouldPersistOperatorComposerFooter(hasAttachedAudio: false, isListening: true) == true)
  }

  @Test("chat composer menu appears only for non-text capabilities")
  func composerUtilityMenuRequiresImageOrAudioCapabilities() {
    #expect(shouldShowOperatorComposerUtilityMenu(supportsImageInput: false, supportsAudioMode: false) == false)
    #expect(shouldShowOperatorComposerUtilityMenu(supportsImageInput: true, supportsAudioMode: false) == true)
    #expect(shouldShowOperatorComposerUtilityMenu(supportsImageInput: false, supportsAudioMode: true) == true)
  }
}

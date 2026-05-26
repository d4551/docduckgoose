import Testing
@testable import BaoEdgeUI

@Suite("OperatorVoiceControls")
struct OperatorVoiceControlsTests {
  @Test("audio composer mode appears when dictation is available even without raw audio input")
  func composerModesIncludeAudioForDictationOnly() {
    let modes = resolvedOperatorComposerModes(
      supportsImageInput: false,
      supportsAudioInput: false,
      supportsDictation: true
    )

    #expect(modes == [.chat, .audio])
  }

  @Test("audio composer mode appears when raw audio input is available")
  func composerModesIncludeAudioForRawAudio() {
    let modes = resolvedOperatorComposerModes(
      supportsImageInput: false,
      supportsAudioInput: true,
      supportsDictation: false
    )

    #expect(modes == [.chat, .audio])
  }

  @Test("voice controls prefer dictation when permissions and recognizer are ready")
  func voiceControlsEnableDictation() {
    let availability = OperatorVoiceControlsAvailability.resolve(
      speechAuthorizationGranted: true,
      microphoneAuthorizationGranted: true,
      recognizerAvailable: true,
      supportsAudioInput: false
    )

    #expect(availability.canDictate)
    #expect(!availability.canRecordRawAudio)
    #expect(availability.status == .ready)
  }

  @Test("voice controls allow raw audio recording when microphone is granted and model supports audio")
  func voiceControlsEnableRawAudio() {
    let availability = OperatorVoiceControlsAvailability.resolve(
      speechAuthorizationGranted: false,
      microphoneAuthorizationGranted: true,
      recognizerAvailable: false,
      supportsAudioInput: true
    )

    #expect(!availability.canDictate)
    #expect(availability.canRecordRawAudio)
    #expect(availability.status == .ready)
  }

  @Test("voice controls block both features when microphone permission is missing")
  func voiceControlsRequireMicrophonePermission() {
    let availability = OperatorVoiceControlsAvailability.resolve(
      speechAuthorizationGranted: true,
      microphoneAuthorizationGranted: false,
      recognizerAvailable: true,
      supportsAudioInput: true
    )

    #expect(!availability.canDictate)
    #expect(!availability.canRecordRawAudio)
    #expect(availability.status == .microphonePermissionRequired)
  }
}

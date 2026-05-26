import Foundation

#if canImport(AVFoundation)
import AVFoundation
#endif

#if canImport(Speech)
import Speech
#endif

enum OperatorVoiceControlsStatus: Equatable {
    case ready
    case microphonePermissionRequired
    case speechPermissionRequired
    case unavailable
}

struct OperatorVoiceControlsAvailability: Equatable {
    let canDictate: Bool
    let canRecordRawAudio: Bool
    let status: OperatorVoiceControlsStatus

    static func resolve(
        speechAuthorizationGranted: Bool,
        microphoneAuthorizationGranted: Bool,
        recognizerAvailable: Bool,
        supportsAudioInput: Bool
    ) -> OperatorVoiceControlsAvailability {
        guard microphoneAuthorizationGranted else {
            return OperatorVoiceControlsAvailability(
                canDictate: false,
                canRecordRawAudio: false,
                status: .microphonePermissionRequired
            )
        }

        let canDictate = speechAuthorizationGranted && recognizerAvailable
        let canRecordRawAudio = supportsAudioInput
        let status: OperatorVoiceControlsStatus = (canDictate || canRecordRawAudio) ? .ready : .speechPermissionRequired

        return OperatorVoiceControlsAvailability(
            canDictate: canDictate,
            canRecordRawAudio: canRecordRawAudio,
            status: status
        )
    }
}

func resolvedOperatorComposerModes(
    supportsImageInput: Bool,
    supportsAudioInput: Bool,
    supportsDictation: Bool
) -> [OperatorComposerMode] {
    var modes: [OperatorComposerMode] = [.chat]
    if supportsImageInput {
        modes.append(.image)
    }
    if supportsAudioInput || supportsDictation {
        modes.append(.audio)
    }
    return modes
}

struct OperatorRecordedAudioClip: Equatable {
    let mimeType: String
    let data: String
    let duration: TimeInterval
}

@MainActor
final class OperatorDictationController: ObservableObject {
    @Published private(set) var availability = OperatorVoiceControlsAvailability(
        canDictate: false,
        canRecordRawAudio: false,
        status: .unavailable
    )
    @Published private(set) var isListening = false
    @Published private(set) var transcript = ""
    private var supportsAudioInput = false

    /// Preferred locale for speech recognition (empty = system default). Set from Settings.
    var preferredLocaleIdentifier: String = ""

#if canImport(UIKit) && canImport(AVFoundation) && canImport(Speech)
    private let audioEngine = AVAudioEngine()
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?
    private var recognizer: SFSpeechRecognizer?
#endif

    func refreshAvailability(supportsAudioInput: Bool) async {
        self.supportsAudioInput = supportsAudioInput
#if canImport(UIKit) && canImport(AVFoundation) && canImport(Speech)
        let speechGranted = SFSpeechRecognizer.authorizationStatus() == .authorized
        let microphoneGranted = AVAudioSession.sharedInstance().recordPermission == .granted
        let recognizer = makeRecognizer()
        self.recognizer = recognizer
        availability = .resolve(
            speechAuthorizationGranted: speechGranted,
            microphoneAuthorizationGranted: microphoneGranted,
            recognizerAvailable: recognizer?.isAvailable == true,
            supportsAudioInput: supportsAudioInput
        )
#else
        availability = .resolve(
            speechAuthorizationGranted: false,
            microphoneAuthorizationGranted: false,
            recognizerAvailable: false,
            supportsAudioInput: supportsAudioInput
        )
#endif
    }

    func beginHold() async {
#if canImport(UIKit) && canImport(AVFoundation) && canImport(Speech)
        let speechGranted = await requestSpeechAuthorizationIfNeeded()
        let microphoneGranted = await requestMicrophonePermissionIfNeeded()
        let recognizer = self.recognizer ?? makeRecognizer()
        self.recognizer = recognizer
        availability = .resolve(
            speechAuthorizationGranted: speechGranted,
            microphoneAuthorizationGranted: microphoneGranted,
            recognizerAvailable: recognizer?.isAvailable == true,
            supportsAudioInput: supportsAudioInput
        )

        guard availability.canDictate, !isListening else { return }
        transcript = ""
        recognitionTask?.cancel()
        recognitionTask = nil

        let request = SFSpeechAudioBufferRecognitionRequest()
        request.shouldReportPartialResults = true
        recognitionRequest = request

        let audioSession = AVAudioSession.sharedInstance()
        try? audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
        try? audioSession.setActive(true, options: .notifyOthersOnDeactivation)

        let inputNode = audioEngine.inputNode
        let recordingFormat = inputNode.outputFormat(forBus: 0)
        inputNode.removeTap(onBus: 0)
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { [weak self] buffer, _ in
            self?.recognitionRequest?.append(buffer)
        }

        audioEngine.prepare()
        do {
            try audioEngine.start()
        } catch {
            inputNode.removeTap(onBus: 0)
            recognitionRequest = nil
            return
        }

        recognitionTask = recognizer?.recognitionTask(with: request) { [weak self] result, error in
            guard let self else { return }
            if let result {
                self.transcript = result.bestTranscription.formattedString
            }
            if error != nil || result?.isFinal == true {
                self.stopAudioEngine()
            }
        }
        isListening = true
#endif
    }

    func endHold() -> String? {
#if canImport(UIKit) && canImport(AVFoundation) && canImport(Speech)
        guard isListening else { return nil }
        recognitionRequest?.endAudio()
        stopAudioEngine()
        let value = transcript.trimmingCharacters(in: .whitespacesAndNewlines)
        transcript = ""
        return value.isEmpty ? nil : value
#else
        return nil
#endif
    }

    func cancel() {
#if canImport(UIKit) && canImport(AVFoundation) && canImport(Speech)
        recognitionTask?.cancel()
        transcript = ""
        stopAudioEngine()
#endif
    }

#if canImport(UIKit) && canImport(AVFoundation) && canImport(Speech)
    private func makeRecognizer() -> SFSpeechRecognizer? {
        let id = preferredLocaleIdentifier.trimmingCharacters(in: .whitespacesAndNewlines)
        if !id.isEmpty {
            let locale = Locale(identifier: id)
            if let r = SFSpeechRecognizer(locale: locale) { return r }
        }
        return SFSpeechRecognizer()
    }

    private func stopAudioEngine() {
        audioEngine.stop()
        audioEngine.inputNode.removeTap(onBus: 0)
        recognitionRequest = nil
        recognitionTask = nil
        isListening = false
        try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    }

    private func requestSpeechAuthorizationIfNeeded() async -> Bool {
        switch SFSpeechRecognizer.authorizationStatus() {
        case .authorized:
            return true
        case .notDetermined:
            return await withCheckedContinuation { continuation in
                SFSpeechRecognizer.requestAuthorization { status in
                    continuation.resume(returning: status == .authorized)
                }
            }
        default:
            return false
        }
    }

    private func requestMicrophonePermissionIfNeeded() async -> Bool {
        let audioSession = AVAudioSession.sharedInstance()
        switch audioSession.recordPermission {
        case .granted:
            return true
        case .undetermined:
            return await withCheckedContinuation { continuation in
                audioSession.requestRecordPermission { granted in
                    continuation.resume(returning: granted)
                }
            }
        default:
            return false
        }
    }
#endif
}

@MainActor
final class OperatorRawAudioRecorderController: NSObject, ObservableObject {
    @Published private(set) var isRecording = false
    @Published private(set) var duration: TimeInterval = 0
    @Published private(set) var averagePower: Float = -160

#if canImport(UIKit) && canImport(AVFoundation)
    private var recorder: AVAudioRecorder?
    private var meterTask: Task<Void, Never>?
    private var recordingURL: URL?
#endif

    func beginRecording() async -> Bool {
#if canImport(UIKit) && canImport(AVFoundation)
        guard await requestMicrophonePermissionIfNeeded() else { return false }

        let audioSession = AVAudioSession.sharedInstance()
        try? audioSession.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker])
        try? audioSession.setActive(true, options: .notifyOthersOnDeactivation)

        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
            .appendingPathExtension("m4a")
        recordingURL = url

        let settings: [String: Any] = [
            AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
            AVSampleRateKey: 44_100,
            AVNumberOfChannelsKey: 1,
            AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue,
        ]

        do {
            let recorder = try AVAudioRecorder(url: url, settings: settings)
            recorder.isMeteringEnabled = true
            recorder.record()
            self.recorder = recorder
            duration = 0
            averagePower = -160
            isRecording = true
            startMetering()
            return true
        } catch {
            return false
        }
#else
        return false
#endif
    }

    func stopRecording() -> OperatorRecordedAudioClip? {
#if canImport(UIKit) && canImport(AVFoundation)
        guard let recorder, let recordingURL else { return nil }
        let elapsed = recorder.currentTime
        recorder.stop()
        meterTask?.cancel()
        isRecording = false
        self.recorder = nil

        guard let data = try? Data(contentsOf: recordingURL) else {
            return nil
        }

        try? FileManager.default.removeItem(at: recordingURL)
        self.recordingURL = nil
        try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)

        return OperatorRecordedAudioClip(
            mimeType: "audio/m4a",
            data: data.base64EncodedString(),
            duration: elapsed
        )
#else
        return nil
#endif
    }

    func cancelRecording() {
#if canImport(UIKit) && canImport(AVFoundation)
        recorder?.stop()
        recorder = nil
        meterTask?.cancel()
        isRecording = false
        duration = 0
        averagePower = -160
        if let recordingURL {
            try? FileManager.default.removeItem(at: recordingURL)
        }
        recordingURL = nil
        try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
#endif
    }

#if canImport(UIKit) && canImport(AVFoundation)
    private func startMetering() {
        meterTask?.cancel()
        meterTask = Task { @MainActor [weak self] in
            guard let self else { return }
            while !Task.isCancelled, let recorder = self.recorder, recorder.isRecording {
                recorder.updateMeters()
                self.averagePower = recorder.averagePower(forChannel: 0)
                self.duration = recorder.currentTime
                try? await Task.sleep(for: .milliseconds(120))
            }
        }
    }

    private func requestMicrophonePermissionIfNeeded() async -> Bool {
        let audioSession = AVAudioSession.sharedInstance()
        switch audioSession.recordPermission {
        case .granted:
            return true
        case .undetermined:
            return await withCheckedContinuation { continuation in
                audioSession.requestRecordPermission { granted in
                    continuation.resume(returning: granted)
                }
            }
        default:
            return false
        }
    }
#endif
}

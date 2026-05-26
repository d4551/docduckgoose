// Extracted workspace views from FlowRunnerView — Phase 1 of iOS design parity.
// Each workspace receives viewModel and coordinator actions from the parent shell.
//
// Copyright 2025 Google LLC
// Licensed under the Apache License, Version 2.0.

import Foundation
import PhotosUI
import SwiftUI
import BaoEdgeCore
import BaoEdgeDriver
#if canImport(UIKit)
import UIKit
#endif

private extension String {
    var trimmedOrNil: String? {
        let trimmed = trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? nil : trimmed
    }
}

/// Returns whether the operator composer should render contextual footer content.
func shouldPersistOperatorComposerFooter(hasAttachedAudio: Bool, isListening: Bool) -> Bool {
    hasAttachedAudio || isListening
}

/// Returns whether the operator composer should expose the leading utility menu.
func shouldShowOperatorComposerUtilityMenu(supportsImageInput: Bool, supportsAudioMode: Bool) -> Bool {
    supportsImageInput || supportsAudioMode
}

// MARK: - Operator Workspace Context

/// Shared context passed from FlowRunnerView to workspace views.
/// Holds bindings and action closures to avoid passing 15+ parameters.
struct OperatorWorkspaceContext {
    let viewModel: FlowRunnerViewModel
    let selectedArea: Binding<OperatorWorkspaceArea>
    let composerMode: Binding<OperatorComposerMode>
    let chatPickedImages: Binding<[ChatPickedImage]>
    let selectedModelsSection: Binding<OperatorModelsSection>
    let selectedAutomationsSection: Binding<OperatorAutomationsSection>
    let selectedRuntimeUsage: Binding<OperatorRuntimeUsage>
    let activeSearchSheet: Binding<OperatorSearchSheet?>
    let showAutomationEditor: Binding<Bool>
    let modelCatalogQuery: Binding<String>
    let pickerQuery: Binding<String>

    let onLoadProviders: (String?) -> Void
    let onLoadModels: (String, OperatorRuntimeUsage) -> Void
    let onSendChat: () -> Void
    let onRunAutomation: () -> Void
    let onRequestFlowExecution: (FlowV1) -> Void
    let onStartModelPull: () -> Void
    let onRetryModelPull: () -> Void
    let onRunDeviceAiProtocol: () -> Void
    let onRefreshModelPullHistory: () async -> Void
    let onClearDeviceAiArtifact: () -> Void
    let onResetAutomationDraft: () -> Void
    let currentControlPlaneBaseURL: () -> URL?
    let assignmentProviderLabel: (String) -> String
    let assignmentModelLabel: (String) -> String
    let selectedConnectionProfileLabel: (String) -> String
    let providerSupportsEndpointOverride: (String) -> Bool
    let filteredSearchOptions: (OperatorSearchSheet) -> [OperatorSearchOption]
    let selectedSearchOptionId: (OperatorSearchSheet) -> String
    let applySearchSelection: (String, OperatorSearchSheet) -> Void
    let searchSheetTitle: (OperatorSearchSheet) -> String
    let searchPlaceholder: (OperatorSearchSheet) -> String
    let accentColorForPullStatus: (CapabilityJobState) -> Color
    let resolvedPullModelPlaceholder: () -> String
    let resolvedPullModelHint: () -> String?
    let normalizedPullModelRef: () -> String
    let filteredModelCatalogOptions: () -> [String]
}

// MARK: - OperatorChatWorkspaceView

/// Extracted chat workspace — conversation panel, composer dock, configuration CTAs.
struct OperatorChatWorkspaceView: View {
    let ctx: OperatorWorkspaceContext
    @Environment(\.colorScheme) private var colorScheme
    @StateObject private var dictationController = OperatorDictationController()
    @StateObject private var rawAudioController = OperatorRawAudioRecorderController()
    @State private var transientVoiceStatusText: String?
    @State private var voiceStatusDismissTask: Task<Void, Never>?

    private enum ComposerLayout {
        static let accessorySize: CGFloat = 36
        static let accessoryCornerRadius: CGFloat = 12
        static let accessorySpacing: CGFloat = 8
        static let clusterSpacing: CGFloat = 12
        static let minDockHeight: CGFloat = 44
    }

    private var needsConfigurationCtas: Bool {
        ctx.currentControlPlaneBaseURL() == nil
            || ctx.viewModel.selectedProvider.isEmpty
            || ctx.viewModel.selectedModel.isEmpty
    }

    private var colors: BaoEdgeTheme.ResolvedColors {
        BaoEdgeTheme.resolved(for: colorScheme)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                conversationWorkspacePanel
                if needsConfigurationCtas {
                    configurationCtaPanel
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)
            .padding(.bottom, 120)
        }
        .safeAreaInset(edge: .bottom) {
            composerDock
        }
        .task(id: ctx.viewModel.supportsAudioInput) {
            dictationController.preferredLocaleIdentifier = ctx.viewModel.dictationLocaleIdentifier
            await dictationController.refreshAvailability(supportsAudioInput: ctx.viewModel.supportsAudioInput)
        }
        .onDisappear {
            voiceStatusDismissTask?.cancel()
            dictationController.cancel()
            rawAudioController.cancelRecording()
        }
    }

    private var conversationWorkspacePanel: some View {
        BaoEdgePanel(
            title: L10n.t("flow_runner_workspace_chat"),
            subtitle: L10n.t("flow_runner_workspace_chat_subtitle")
        ) {
            VStack(alignment: .leading, spacing: 16) {
                conversationHeader
                conversationTimeline
                operatorContextualChips
            }
        }
    }

    private var composerDock: some View {
        VStack(spacing: 0) {
            Divider()
                .overlay(colors.primary.opacity(0.14))
            VStack(alignment: .leading, spacing: 12) {
                composer
            }
            .padding(.horizontal, 16)
            .padding(.top, 12)
            .padding(.bottom, 12)
            .background(colors.surface.opacity(0.94))
        }
    }

    private var conversationHeader: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(spacing: 8) {
                BaoEdgeChip(label: conversationRuntimeLabel, accent: conversationRuntimeAccent)
                    .accessibilityLabel(conversationRuntimeAccessibilityLabel)
                if !ctx.viewModel.chatStateMessage.isEmpty {
                    BaoEdgeChip(
                        label: ctx.viewModel.chatState.localizedOperatorLabel,
                        accent: ctx.viewModel.chatState.accentColor
                    )
                    .accessibilityLabel(ctx.viewModel.chatStateMessage)
                }
            }

            chatRuntimeInlineControls
        }
    }

    private var configurationCtaPanel: some View {
        BaoEdgePanel(
            title: L10n.t("flow_runner_workspace_setup_title"),
            subtitle: L10n.t("flow_runner_workspace_setup_subtitle")
        ) {
            VStack(alignment: .leading, spacing: 12) {
                if ctx.currentControlPlaneBaseURL() == nil {
                    actionCard(
                        title: L10n.t("flow_runner_control_plane_base_url"),
                        detail: L10n.t("flow_runner_invalid_control_plane_base_url"),
                        state: .errorNonRetryable,
                        actionTitle: L10n.t("flow_runner_workspace_settings")
                    ) {
                        ctx.viewModel.selectedSettingsSection = .ai
                        ctx.selectedArea.wrappedValue = .settings
                    }
                }
                if ctx.viewModel.selectedProvider.isEmpty || ctx.viewModel.selectedModel.isEmpty {
                    actionCard(
                        title: L10n.t("flow_runner_settings_ai"),
                        detail: L10n.t("flow_runner_chat_model_first"),
                        state: .errorRetryable,
                        actionTitle: L10n.t("flow_runner_workspace_settings")
                    ) {
                        ctx.viewModel.selectedSettingsSection = .ai
                        ctx.selectedArea.wrappedValue = .settings
                    }
                }
            }
        }
    }

    private var conversationTimeline: some View {
        ScrollViewReader { proxy in
            VStack(alignment: .leading, spacing: 12) {
                if ctx.viewModel.conversationEntries.isEmpty {
                    Text(L10n.t("flow_runner_operator_seed_message"))
                        .font(BaoEdgeTheme.Typography.body())
                        .foregroundStyle(colors.onSurfaceVariant)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(14)
                        .background(
                            RoundedRectangle(cornerRadius: 22, style: .continuous)
                                .fill(colors.surface.opacity(0.94))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 22, style: .continuous)
                                .stroke(colors.primary.opacity(0.16), lineWidth: 1)
                        )
                } else {
                    VStack(alignment: .leading, spacing: 12) {
                        ForEach(ctx.viewModel.conversationEntries) { entry in
                            BaoEdgeTimelineBubble(entry: entry)
                                .id(entry.id)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
            .onAppear {
                scrollToLatest(using: proxy)
            }
            .onChange(of: ctx.viewModel.conversationEntries) { _, _ in
                scrollToLatest(using: proxy)
            }
            .onChange(of: ctx.viewModel.activeConversationId) { _, _ in
                scrollToLatest(using: proxy)
            }
        }
    }

    private func scrollToLatest(using proxy: ScrollViewProxy) {
        guard let latestEntryId = ctx.viewModel.conversationEntries.last?.id else {
            return
        }
        Task { @MainActor in
            proxy.scrollTo(latestEntryId, anchor: .bottom)
        }
    }

    private var availableComposerModes: [OperatorComposerMode] {
        resolvedOperatorComposerModes(
            supportsImageInput: ctx.viewModel.supportsImageInput,
            supportsAudioInput: ctx.viewModel.supportsAudioInput,
            supportsDictation: dictationController.availability.canDictate
        )
    }

    private var audioModeAvailable: Bool {
        availableComposerModes.contains(.audio)
    }

    private var displayComposerMode: OperatorComposerMode {
        let mode = ctx.composerMode.wrappedValue
        if mode == .image && !ctx.viewModel.supportsImageInput { return .chat }
        if mode == .audio && !audioModeAvailable { return .chat }
        return mode
    }

    private var composer: some View {
        VStack(alignment: .leading, spacing: 12) {
            if displayComposerMode == .image && ctx.viewModel.supportsImageInput {
                composerImagePicker
            }

            if displayComposerMode == .audio && ctx.viewModel.supportsAudioInput {
                rawAudioRecorderPanel
            }

            HStack(alignment: .bottom, spacing: ComposerLayout.clusterSpacing) {
                if supportsComposerUtilityMenu {
                    composerUtilityMenu
                }
                composerTextInput
                HStack(spacing: ComposerLayout.accessorySpacing) {
                    dictationComposerButton
                    sendComposerButton
                }
            }

            if shouldShowComposerFooter {
                composerFooter
            }

        }
    }

    private var composerTextInput: some View {
        TextField(
            "",
            text: Binding(
                get: { ctx.viewModel.chatMessage },
                set: { ctx.viewModel.chatMessage = $0 }
            ),
            prompt: Text(L10n.t(displayComposerMode.placeholderKey)),
            axis: .vertical
        )
        .font(BaoEdgeTheme.Typography.body())
        .foregroundStyle(colors.onSurface)
        .lineLimit(1...3)
        .multilineTextAlignment(.leading)
        .frame(maxWidth: .infinity, minHeight: ComposerLayout.minDockHeight, alignment: .leading)
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .fill(colors.surface.opacity(0.94))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .stroke(colors.primary.opacity(0.18), lineWidth: 1)
        )
        .accessibilityLabel(L10n.t("flow_runner_chat_message_accessibility_label"))
        .accessibilityHint(L10n.t("flow_runner_chat_message_accessibility_hint"))
    }

    private var composerUtilityMenu: some View {
        Menu {
            Button {
                ctx.composerMode.wrappedValue = .chat
            } label: {
                Label(OperatorComposerMode.chat.localizedTitle, systemImage: OperatorComposerMode.chat.systemImageName)
            }

            if ctx.viewModel.supportsImageInput {
                Button {
                    ctx.composerMode.wrappedValue = .image
                } label: {
                    Label(OperatorComposerMode.image.localizedTitle, systemImage: OperatorComposerMode.image.systemImageName)
                }
            }

            if audioModeAvailable {
                Button {
                    ctx.composerMode.wrappedValue = .audio
                } label: {
                    Label(OperatorComposerMode.audio.localizedTitle, systemImage: OperatorComposerMode.audio.systemImageName)
                }
            }
        } label: {
            Image(systemName: composerUtilityMenuIconName)
                .font(BaoEdgeTheme.Typography.headline(size: 18))
                .foregroundStyle(displayComposerMode == .chat ? colors.onSurfaceVariant : colors.primary)
                .frame(width: ComposerLayout.accessorySize, height: ComposerLayout.accessorySize)
                .background(
                    RoundedRectangle(cornerRadius: ComposerLayout.accessoryCornerRadius, style: .continuous)
                        .fill(colors.surface.opacity(0.94))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: ComposerLayout.accessoryCornerRadius, style: .continuous)
                        .stroke((displayComposerMode == .chat ? colors.onSurfaceVariant : colors.primary).opacity(0.22), lineWidth: 1)
                )
        }
        .accessibilityLabel(L10n.t("flow_runner_workspace_chat"))
    }

    private var sendComposerButton: some View {
        Button(action: ctx.onSendChat) {
            Group {
                if ctx.viewModel.isSendingChat {
                    ProgressView()
                        .tint(colors.onPrimary)
                } else {
                    Image(systemName: "arrow.up")
                        .font(BaoEdgeTheme.Typography.headline(size: 18, weight: .bold))
                        .foregroundStyle(colors.onPrimary)
                }
            }
            .frame(width: ComposerLayout.accessorySize, height: ComposerLayout.accessorySize)
            .background(
                Circle()
                    .fill(composerActionDisabled ? colors.primary.opacity(0.32) : colors.primary)
            )
            .overlay(
                Circle()
                    .stroke(colors.primary.opacity(composerActionDisabled ? 0.12 : 0.28), lineWidth: 1)
            )
            .shadow(color: colors.primary.opacity(composerActionDisabled ? 0 : 0.16), radius: 8, x: 0, y: 4)
        }
        .buttonStyle(.plain)
        .disabled(composerActionDisabled)
        .accessibilityLabel(L10n.t("flow_runner_send"))
        .modifier(ComposerSendAccessibilityHint(
            needsModelFirst: ctx.viewModel.selectedModel.isEmpty && pendingNativeChatIntentKind == nil
        ))
    }

    @ViewBuilder
    private var composerFooter: some View {
        VStack(alignment: .leading, spacing: 6) {
            if hasAttachedAudio {
                BaoEdgeChip(
                    label: L10n.t("flow_runner_audio_attached"),
                    accent: colors.primary
                )
            }

            if dictationController.isListening {
                VStack(alignment: .leading, spacing: 4) {
                    Text(L10n.t("flow_runner_hold_to_dictate_active"))
                        .font(BaoEdgeTheme.Typography.caption2())
                        .foregroundStyle(colors.primary)
                    Text(dictationController.transcript.isEmpty ? L10n.t("flow_runner_hold_to_dictate_listening") : dictationController.transcript)
                        .font(BaoEdgeTheme.Typography.caption2(weight: .medium))
                        .foregroundStyle(colors.onSurfaceVariant)
                        .lineLimit(2)
                }
            } else if let transientVoiceStatusText {
                compactVoiceStatusHint(transientVoiceStatusText)
            }
        }
    }

    @State private var selectedPhotoItems: [PhotosPickerItem] = []

    private var composerImagePicker: some View {
        let palette = BaoEdgeTheme.resolved(for: colorScheme)
        return ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(ctx.chatPickedImages.wrappedValue) { img in
                    imageThumbnail(img)
                }
                PhotosPicker(
                    selection: $selectedPhotoItems,
                    maxSelectionCount: max(0, 4 - ctx.chatPickedImages.wrappedValue.count),
                    matching: .images
                ) {
                    Image(systemName: "photo.badge.plus")
                        .font(BaoEdgeTheme.Typography.title(size: 20))
                        .foregroundStyle(palette.primary)
                        .frame(width: 48, height: 48)
                        .background(palette.primary.opacity(0.12), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
                .accessibilityLabel(L10n.t("flow_runner_add_image"))
                .onChange(of: selectedPhotoItems) { _, items in
                    Task { @MainActor in
                        #if canImport(UIKit)
                        for item in items {
                            if let data = try? await item.loadTransferable(type: Data.self),
                               let uiImage = UIImage(data: data) {
                                let resized = resizeForUpload(uiImage)
                                if let jpeg = resized.jpegData(compressionQuality: 0.85) {
                                    let base64 = jpeg.base64EncodedString()
                                    ctx.chatPickedImages.wrappedValue.append(ChatPickedImage(mimeType: "image/jpeg", data: base64))
                                }
                            }
                        }
                        #endif
                        selectedPhotoItems = []
                    }
                }
            }
        }
    }

    private var dictationComposerButton: some View {
        let isEnabled = ctx.viewModel.selectedModel.trimmedOrNil != nil
        let isHighlighted = dictationController.isListening
        let iconName = if dictationController.isListening {
            "waveform"
        } else {
            "mic.fill"
        }

        return Image(systemName: iconName)
            .font(BaoEdgeTheme.Typography.headline(size: 18))
            .foregroundStyle(
                isHighlighted
                    ? colors.primary
                    : colors.onSurfaceVariant
            )
            .frame(width: ComposerLayout.accessorySize, height: ComposerLayout.accessorySize)
            .background(
                RoundedRectangle(cornerRadius: ComposerLayout.accessoryCornerRadius, style: .continuous)
                    .fill(isHighlighted ? colors.primary.opacity(0.12) : colors.surface.opacity(0.94))
            )
            .overlay(
                RoundedRectangle(cornerRadius: ComposerLayout.accessoryCornerRadius, style: .continuous)
                    .stroke((isHighlighted ? colors.primary : colors.onSurfaceVariant).opacity(0.22), lineWidth: 1)
            )
            .contentShape(RoundedRectangle(cornerRadius: ComposerLayout.accessoryCornerRadius, style: .continuous))
            .onLongPressGesture(minimumDuration: 0.18, maximumDistance: 40, pressing: { pressing in
                guard isEnabled else { return }
                if pressing {
                    guard dictationController.availability.canDictate else {
                        presentTransientVoiceStatusIfNeeded()
                        return
                    }
                    transientVoiceStatusText = nil
                    voiceStatusDismissTask?.cancel()
                    Task { await dictationController.beginHold() }
                } else if let transcript = dictationController.endHold() {
                    appendTranscript(transcript)
                }
            }, perform: {})
            .onTapGesture {
                presentTransientVoiceStatusIfNeeded()
            }
            .opacity(isEnabled ? 1 : 0.6)
            .accessibilityLabel(L10n.t("flow_runner_hold_to_dictate"))
            .accessibilityHint(voiceStatusText ?? L10n.t("flow_runner_hold_to_dictate_listening"))
            .accessibilityAddTraits(.isButton)
    }

    private func compactVoiceStatusHint(_ text: String) -> some View {
        HStack(spacing: 6) {
            Image(systemName: voiceStatusIconName)
                .font(BaoEdgeTheme.Typography.caption2(weight: .semibold))
                .foregroundStyle(colors.primary.opacity(0.88))
            Text(text)
                .font(BaoEdgeTheme.Typography.caption2(weight: .medium))
                .foregroundStyle(colors.onSurfaceVariant)
                .lineLimit(2)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(text)
    }

    private var rawAudioRecorderPanel: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(L10n.t("flow_runner_raw_audio_title"))
                .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                .foregroundStyle(colors.primary.opacity(0.92))

            if rawAudioController.isRecording {
                ProgressView(value: normalizedAudioLevel)
                    .tint(colors.primary)
                Text(L10n.t("flow_runner_raw_audio_recording", formatDuration(rawAudioController.duration)))
                    .font(BaoEdgeTheme.Typography.caption())
                    .foregroundStyle(colors.onSurface)
            } else if ctx.viewModel.chatSpeechInputData.trimmedOrNil != nil {
                Text(L10n.t("flow_runner_raw_audio_ready"))
                    .font(BaoEdgeTheme.Typography.caption())
                    .foregroundStyle(colors.onSurface)
            }

            ViewThatFits(in: .horizontal) {
                HStack(spacing: 10) {
                    BaoEdgeIconActionButton(
                        label: rawAudioController.isRecording ? L10n.t("flow_runner_raw_audio_stop") : L10n.t("flow_runner_raw_audio_record"),
                        systemImageName: rawAudioController.isRecording ? "stop.circle.fill" : "record.circle",
                        action: {
                            if rawAudioController.isRecording {
                                attachRecordedAudio(rawAudioController.stopRecording())
                            } else {
                                Task { _ = await rawAudioController.beginRecording() }
                            }
                        }
                    )
                    BaoEdgeIconActionButton(
                        label: L10n.t("flow_runner_raw_audio_clear"),
                        systemImageName: "trash",
                        action: clearAttachedAudio,
                        isEnabled: rawAudioController.isRecording || ctx.viewModel.chatSpeechInputData.trimmedOrNil != nil
                    )
                }

                VStack(alignment: .leading, spacing: 10) {
                    BaoEdgeIconActionButton(
                        label: rawAudioController.isRecording ? L10n.t("flow_runner_raw_audio_stop") : L10n.t("flow_runner_raw_audio_record"),
                        systemImageName: rawAudioController.isRecording ? "stop.circle.fill" : "record.circle",
                        action: {
                            if rawAudioController.isRecording {
                                attachRecordedAudio(rawAudioController.stopRecording())
                            } else {
                                Task { _ = await rawAudioController.beginRecording() }
                            }
                        }
                    )
                    BaoEdgeIconActionButton(
                        label: L10n.t("flow_runner_raw_audio_clear"),
                        systemImageName: "trash",
                        action: clearAttachedAudio,
                        isEnabled: rawAudioController.isRecording || ctx.viewModel.chatSpeechInputData.trimmedOrNil != nil
                    )
                }
            }
        }
        .padding(12)
        .background(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .fill(colors.surface.opacity(0.94))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(colors.primary.opacity(0.16), lineWidth: 1)
        )
    }

    private func imageThumbnail(_ img: ChatPickedImage) -> some View {
        Group {
            #if canImport(UIKit)
            if let data = Data(base64Encoded: img.data),
               let uiImage = UIImage(data: data) {
                Image(uiImage: uiImage)
                    .resizable()
                    .scaledToFill()
                    .frame(width: 64, height: 64)
                    .clipped()
                    .cornerRadius(8)
                    .overlay(
                        Button {
                            ctx.chatPickedImages.wrappedValue = ctx.chatPickedImages.wrappedValue.filter { $0.id != img.id }
                        } label: {
                            Image(systemName: "xmark.circle.fill")
                                .font(BaoEdgeTheme.Typography.title(size: 20))
                                .foregroundStyle(colors.onSurface)
                                .background(Circle().fill(colors.surface.opacity(0.94)))
                        }
                        .offset(x: 4, y: -4),
                        alignment: .topTrailing
                    )
            }
            #endif
        }
    }

    #if canImport(UIKit)
    private func resizeForUpload(_ image: UIImage, maxDimension: CGFloat = 1024) -> UIImage {
        let size = image.size
        guard size.width > maxDimension || size.height > maxDimension else { return image }
        let ratio = min(maxDimension / size.width, maxDimension / size.height)
        let newSize = CGSize(width: size.width * ratio, height: size.height * ratio)
        let renderer = UIGraphicsImageRenderer(size: newSize)
        return renderer.image { _ in image.draw(in: CGRect(origin: .zero, size: newSize)) }
    }
    #endif

    private var operatorContextualChips: some View {
        let entries = ctx.viewModel.conversationEntries
        guard !entries.isEmpty else { return AnyView(EmptyView()) }
        guard let last = entries.last, last.role == .assistant else { return AnyView(EmptyView()) }
        var chips: [(label: String, hint: String, symbol: String, prompt: String, opensImage: Bool)] = [
            (
                L10n.t("flow_runner_chip_summarize"),
                L10n.t("flow_runner_chip_summarize_prompt"),
                "text.append",
                L10n.t("flow_runner_chip_summarize_prompt"),
                false
            ),
            (
                L10n.t("flow_runner_chip_continue"),
                L10n.t("flow_runner_chip_continue_prompt"),
                "arrow.turn.down.right",
                L10n.t("flow_runner_chip_continue_prompt"),
                false
            )
        ]
        if ctx.viewModel.supportsImageInput {
            chips.append((
                L10n.t("flow_runner_chip_describe_image"),
                L10n.t("flow_runner_message_placeholder_image"),
                "photo",
                L10n.t("flow_runner_message_placeholder_image"),
                true
            ))
        }
        return AnyView(
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(chips, id: \.label) { chip in
                        BaoEdgeCompactAction(
                            label: chip.label,
                            hint: chip.hint,
                            systemImage: chip.symbol,
                            accent: colors.primary.opacity(0.9)
                        ) {
                            ctx.viewModel.chatMessage = chip.prompt
                            if chip.opensImage {
                                ctx.composerMode.wrappedValue = .image
                            }
                        }
                    }
                }
            }
        )
    }

    private var chatRuntimeInlineControls: some View {
        VStack(alignment: .leading, spacing: 10) {
            searchablePickerField(
                title: L10n.t("flow_runner_model_label"),
                selectedLabel: ctx.assignmentModelLabel(ctx.viewModel.selectedModel)
            ) {
                ctx.activeSearchSheet.wrappedValue = .runtimeModel(.chat)
            }

            HStack(spacing: 8) {
                voiceOutputToggleChip
                if displayComposerMode != .chat {
                    BaoEdgeChip(label: displayComposerMode.localizedTitle, accent: colors.primary.opacity(0.9))
                }
            }
        }
    }

    private var voiceOutputToggleChip: some View {
        Button {
            ctx.viewModel.chatRequestTts.toggle()
        } label: {
            HStack(spacing: 6) {
                Image(systemName: ctx.viewModel.chatRequestTts ? "speaker.wave.2.fill" : "speaker.slash.fill")
                    .font(BaoEdgeTheme.Typography.caption(size: 12, weight: .semibold))
                Text(L10n.t("flow_runner_chat_tts_output"))
                    .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
            }
            .foregroundStyle(ctx.viewModel.chatRequestTts ? colors.onPrimary : colors.onSurfaceVariant)
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
            .background(
                Capsule(style: .continuous)
                    .fill(ctx.viewModel.chatRequestTts ? colors.primary : colors.surface.opacity(0.94))
            )
            .overlay(
                Capsule(style: .continuous)
                    .stroke((ctx.viewModel.chatRequestTts ? colors.primary : colors.onSurfaceVariant).opacity(0.22), lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
        .accessibilityLabel(L10n.t("flow_runner_chat_request_tts"))
    }

    private var conversationRuntimeLabel: String {
        let provider = ctx.viewModel.providerDisplayName(for: ctx.viewModel.selectedProvider)
        let model = ctx.viewModel.selectedModel.trimmingCharacters(in: .whitespacesAndNewlines)
        if provider.isEmpty || model.isEmpty {
            return L10n.t("flow_runner_runtime_not_set")
        }
        return "\(provider) · \(model)"
    }

    private var conversationRuntimeAccessibilityLabel: String {
        L10n.t("flow_runner_runtime_chip_accessibility", conversationRuntimeLabel)
    }

    private var conversationRuntimeAccent: Color {
        if ctx.viewModel.selectedProvider.isEmpty || ctx.viewModel.selectedModel.isEmpty {
            return colors.onSurfaceVariant
        }
        return colors.primary
    }

    private var canSendCloudChat: Bool {
        let speechMime = ctx.viewModel.chatSpeechInputMimeType.trimmedOrNil
        let speechData = ctx.viewModel.chatSpeechInputData.trimmedOrNil
        let hasImageInput = ctx.composerMode.wrappedValue == .image && ctx.viewModel.supportsImageInput && !ctx.chatPickedImages.wrappedValue.isEmpty
        return (ctx.viewModel.chatMessage.trimmedOrNil != nil) || (speechMime != nil && speechData != nil) || hasImageInput
    }

    private var pendingNativeChatIntentKind: OperatorNativeChatIntentKind? {
        guard let message = ctx.viewModel.chatMessage.trimmedOrNil else {
            return nil
        }
        let hasImageInput = ctx.composerMode.wrappedValue == .image && ctx.viewModel.supportsImageInput && !ctx.chatPickedImages.wrappedValue.isEmpty
        let hasSpeechInput = ctx.viewModel.chatSpeechInputMimeType.trimmedOrNil != nil && ctx.viewModel.chatSpeechInputData.trimmedOrNil != nil
        return operatorNativeChatIntentKind(for: message, hasAttachedInputs: hasImageInput || hasSpeechInput)
    }

    private var composerActionDisabled: Bool {
        if pendingNativeChatIntentKind != nil {
            return ctx.viewModel.isSendingChat || !canSendCloudChat
        }
        return ctx.viewModel.isSendingChat
            || !canSendCloudChat
            || ctx.viewModel.selectedProvider.isEmpty
            || ctx.viewModel.selectedModel.isEmpty
    }

    private var supportsComposerUtilityMenu: Bool {
        shouldShowOperatorComposerUtilityMenu(
            supportsImageInput: ctx.viewModel.supportsImageInput,
            supportsAudioMode: audioModeAvailable
        )
    }

    private var composerUtilityMenuIconName: String {
        switch displayComposerMode {
        case .chat:
            return "plus"
        case .image:
            return OperatorComposerMode.image.systemImageName
        case .audio:
            return OperatorComposerMode.audio.systemImageName
        }
    }

    private var hasAttachedAudio: Bool {
        ctx.viewModel.chatSpeechInputData.trimmedOrNil != nil
    }

    private var shouldShowComposerFooter: Bool {
        shouldPersistOperatorComposerFooter(
            hasAttachedAudio: hasAttachedAudio,
            isListening: dictationController.isListening
        ) || transientVoiceStatusText != nil
    }

    private var normalizedAudioLevel: Double {
        max(0, min(1, Double((rawAudioController.averagePower + 60) / 60)))
    }

    private var voiceStatusText: String? {
        switch dictationController.availability.status {
        case .ready:
            return nil
        case .microphonePermissionRequired:
            return L10n.t("flow_runner_microphone_permission_required")
        case .speechPermissionRequired:
            return L10n.t("flow_runner_speech_permission_required")
        case .unavailable:
            return L10n.t("flow_runner_hold_to_dictate_unavailable")
        }
    }

    private var voiceStatusIconName: String {
        switch dictationController.availability.status {
        case .ready:
            return "mic.fill"
        case .microphonePermissionRequired:
            return "mic.slash.fill"
        case .speechPermissionRequired:
            return "waveform.badge.exclamationmark"
        case .unavailable:
            return "exclamationmark.triangle.fill"
        }
    }

    private func utilityActionButton(title: String, systemImage: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Label(title, systemImage: systemImage)
        }
        .buttonStyle(.plain)
    }

    private func compactComposerIconButton(
        title: String,
        systemImage: String,
        isActive: Bool = false,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            Image(systemName: systemImage)
                .font(BaoEdgeTheme.Typography.headline(size: 18))
                .foregroundStyle(isActive ? colors.primary : colors.onSurfaceVariant)
                .frame(width: ComposerLayout.accessorySize, height: ComposerLayout.accessorySize)
                .background(
                    RoundedRectangle(cornerRadius: ComposerLayout.accessoryCornerRadius, style: .continuous)
                        .fill(isActive ? colors.primary.opacity(0.12) : colors.surface.opacity(0.94))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: ComposerLayout.accessoryCornerRadius, style: .continuous)
                        .stroke((isActive ? colors.primary : colors.onSurfaceVariant).opacity(0.22), lineWidth: 1)
                )
        }
        .buttonStyle(.plain)
        .accessibilityLabel(title)
    }

    private func appendTranscript(_ transcript: String) {
        let existing = ctx.viewModel.chatMessage.trimmingCharacters(in: .whitespacesAndNewlines)
        ctx.viewModel.chatMessage = existing.isEmpty ? transcript : "\(existing)\n\(transcript)"
    }

    private func presentTransientVoiceStatusIfNeeded() {
        guard let voiceStatusText else { return }
        transientVoiceStatusText = voiceStatusText
        voiceStatusDismissTask?.cancel()
        voiceStatusDismissTask = Task { @MainActor in
            try? await Task.sleep(for: .seconds(3))
            guard !Task.isCancelled else { return }
            transientVoiceStatusText = nil
        }
    }

    private func attachRecordedAudio(_ clip: OperatorRecordedAudioClip?) {
        guard let clip else { return }
        ctx.viewModel.chatSpeechInputMimeType = clip.mimeType
        ctx.viewModel.chatSpeechInputData = clip.data
    }

    private func clearAttachedAudio() {
        rawAudioController.cancelRecording()
        ctx.viewModel.chatSpeechInputMimeType = ""
        ctx.viewModel.chatSpeechInputData = ""
    }

    private func formatDuration(_ duration: TimeInterval) -> String {
        let totalSeconds = Int(duration.rounded())
        let minutes = totalSeconds / 60
        let seconds = totalSeconds % 60
        return String(format: "%d:%02d", minutes, seconds)
    }

    private func searchablePickerField(title: String, selectedLabel: String, action: @escaping () -> Void) -> some View {
        BaoEdgeField(title: title) {
            Button(action: action) {
                HStack {
                    Text(selectedLabel)
                        .foregroundStyle(colors.onSurface)
                    Spacer()
                    Image(systemName: "magnifyingglass")
                        .foregroundStyle(colors.primary)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 18, style: .continuous)
                        .fill(colors.surface.opacity(0.94))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 18, style: .continuous)
                        .stroke(colors.primary.opacity(0.24), lineWidth: 1)
                )
            }
            .buttonStyle(.plain)
            .accessibilityLabel(title)
        }
    }

    private func actionCard(
        title: String,
        detail: String,
        state: FlowExecutionState,
        actionTitle: String,
        action: @escaping () -> Void
    ) -> some View {
        BaoEdgeStatusCard(
            title: title,
            detail: detail,
            state: state,
            actionTitle: actionTitle,
            action: action
        )
    }
}

private struct ComposerSendAccessibilityHint: ViewModifier {
    let needsModelFirst: Bool

    func body(content: Content) -> some View {
        if needsModelFirst {
            content.accessibilityHint(L10n.t("flow_runner_chat_model_first"))
        } else {
            content
        }
    }
}

// Bao Edge branded UI components — cross-platform parity with Android BaoEdgeOperatorComponents.kt
// and web control-plane brand-overrides.css.
//
// Component names follow the unified naming convention:
//   Android: BaoEdgePanel, BaoEdgeChip, BaoEdgePrimaryButton, etc.
//   iOS:     BaoEdgePanel, BaoEdgeChip, BaoEdgePrimaryButton, etc.  (this file)
//   Web:     .card.bao-edge-panel, .badge, .btn.btn-primary, etc.
//
// Copyright 2025 Google LLC
// Licensed under the Apache License, Version 2.0.

import SwiftUI
import BaoEdgeCore

// MARK: - BaoEdgePanel (28pt radius — matches Android BaoEdgePanelShape / web .bao-edge-panel)

/// Elevated branded panel used across operator surfaces.
public struct BaoEdgePanel<Content: View>: View {
    let title: String
    let subtitle: String?
    let content: Content

    @Environment(\.colorScheme) private var colorScheme

    public init(title: String, subtitle: String? = nil, @ViewBuilder content: () -> Content) {
        self.title = title
        self.subtitle = subtitle
        self.content = content()
    }

    public var body: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        VStack(alignment: .leading, spacing: BaoEdgeTheme.Spacing.panelGap) {
            VStack(alignment: .leading, spacing: 6) {
                Text(title)
                    .font(BaoEdgeTheme.Typography.title(size: 20, weight: .semibold))
                    .foregroundStyle(colors.onSurface)
                if let subtitle, !subtitle.isEmpty {
                    Text(subtitle)
                        .font(BaoEdgeTheme.Typography.subheadline())
                        .foregroundStyle(colors.onSurfaceVariant)
                }
            }
            content
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.panel, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [colors.surface.opacity(0.97), colors.background.opacity(0.96)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
        )
        .overlay(
            RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.panel, style: .continuous)
                .stroke(
                    LinearGradient(
                        colors: [BaoEdgeTheme.gold.opacity(0.62), BaoEdgeTheme.ivory.opacity(0.06)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1
                )
        )
        .shadow(color: BaoEdgeTheme.gold.opacity(0.08), radius: 30, x: 0, y: 16)
        .shadow(color: BaoEdgeTheme.black.opacity(0.18), radius: 18, x: 0, y: 10)
        .overlay(
            RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.panel, style: .continuous)
                .fill(
                    RadialGradient(
                        colors: [BaoEdgeTheme.gold.opacity(0.06), Color.clear],
                        center: UnitPoint(x: 0.3, y: 0.2),
                        startRadius: 0,
                        endRadius: 200
                    )
                )
                .allowsHitTesting(false)
        )
    }
}

// MARK: - BaoEdgeScaffold (matches Android BaoEdgeScaffold)

/// Branded scaffold for operator surfaces: background, top bar, optional FAB, content.
/// Matches Android BaoEdgeScaffold.
public struct BaoEdgeScaffold<Content: View>: View {
    let topBar: () -> AnyView
    let floatingActionButton: (() -> AnyView)?
    let content: () -> Content

    @Environment(\.colorScheme) private var colorScheme

    public init(
        topBar: @escaping () -> some View,
        floatingActionButton: (() -> some View)? = nil,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.topBar = { AnyView(topBar()) }
        self.floatingActionButton = floatingActionButton.map { f in { AnyView(f()) } }
        self.content = content
    }

    public var body: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        ZStack(alignment: .top) {
            colors.background
                .ignoresSafeArea()
            VStack(spacing: 0) {
                topBar()
                content()
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            if let fab = floatingActionButton {
                VStack {
                    Spacer()
                    HStack {
                        Spacer()
                        fab()
                            .padding(.trailing, 16)
                            .padding(.bottom, 16)
                    }
                }
                .ignoresSafeArea(edges: .bottom)
            }
        }
    }
}

// MARK: - BaoEdgeCompactAction (icon-only interactive control)

/// Compact icon action — 44pt minimum touch target; label via accessibility APIs.
public struct BaoEdgeCompactAction: View {
    let label: String
    let hint: String?
    let systemImage: String
    let accent: Color
    let action: () -> Void

    public init(
        label: String,
        hint: String? = nil,
        systemImage: String,
        accent: Color,
        action: @escaping () -> Void
    ) {
        self.label = label
        self.hint = hint
        self.systemImage = systemImage
        self.accent = accent
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Image(systemName: systemImage)
                .font(BaoEdgeTheme.Typography.body(weight: .semibold))
                .foregroundStyle(accent)
                .frame(minWidth: 44, minHeight: 44)
                .background(accent.opacity(0.14), in: Circle())
                .overlay(Circle().stroke(accent.opacity(0.35), lineWidth: 1))
        }
        .buttonStyle(.plain)
        .accessibilityLabel(Text(label))
        .accessibilityHint(hint.map { Text($0) } ?? Text(""))
    }
}

// MARK: - BaoEdgeChip (capsule — matches Android BaoEdgeChipShape / web .bao-edge-chip)

/// Branded runtime/status chip (read-only semantics).
public struct BaoEdgeChip: View {
    let label: String
    let accent: Color

    public init(label: String, accent: Color) {
        self.label = label
        self.accent = accent
    }

    public var body: some View {
        Text(label)
            .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
            .foregroundStyle(accent)
            .padding(.horizontal, BaoEdgeTheme.Spacing.chipPaddingH)
            .padding(.vertical, BaoEdgeTheme.Spacing.chipPaddingV)
            .background(accent.opacity(0.14), in: Capsule())
            .overlay(Capsule().stroke(accent.opacity(0.35), lineWidth: 1))
    }
}

// MARK: - BaoEdgeField (label + content — matches Android BaoEdgeInput label pattern)

/// Label wrapper for a form field.
public struct BaoEdgeField<Content: View>: View {
    let title: String
    let content: Content

    public init(title: String, @ViewBuilder content: () -> Content) {
        self.title = title
        self.content = content()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: BaoEdgeTheme.Spacing.iconGap) {
            Text(title)
                .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                .foregroundStyle(BaoEdgeTheme.gold.opacity(0.92))
            content
        }
    }
}

// MARK: - BaoEdgeInputStyle (18pt radius — matches Android BaoEdgeInputShape / web .bao-edge-input)

/// Branded text field style with gold focus indicator.
public struct BaoEdgeInputStyle: TextFieldStyle {
    @Environment(\.colorScheme) private var colorScheme

    public init() {}

    public func _body(configuration: TextField<Self._Label>) -> some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        configuration
            .font(BaoEdgeTheme.Typography.body())
            .foregroundStyle(colors.onSurface)
            .padding(.horizontal, 14)
            .padding(.vertical, BaoEdgeTheme.Spacing.buttonPaddingV)
            .background(
                RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.button, style: .continuous)
                    .fill(colors.surface.opacity(0.72))
            )
            .overlay(
                RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.button, style: .continuous)
                    .stroke(BaoEdgeTheme.gold.opacity(0.24), lineWidth: 1)
            )
    }
}

// MARK: - BaoEdgePrimaryButton (18pt radius — matches Android/web primary button)

/// Gold background action button.
public struct BaoEdgePrimaryButton: View {
    let title: String
    let isDisabled: Bool
    let action: () -> Void

    @Environment(\.colorScheme) private var colorScheme

    public init(title: String, isDisabled: Bool = false, action: @escaping () -> Void) {
        self.title = title
        self.isDisabled = isDisabled
        self.action = action
    }

    public var body: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        Button(action: action) {
            Text(title)
                .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                .multilineTextAlignment(.center)
                .lineLimit(3)
                .fixedSize(horizontal: false, vertical: true)
                .frame(maxWidth: .infinity)
                .padding(.vertical, BaoEdgeTheme.Spacing.buttonPaddingV)
        }
        .buttonStyle(BaoEdgePressableButtonStyle())
        .foregroundStyle(colors.onPrimary)
        .background(
            RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.button, style: .continuous)
                .fill(isDisabled ? BaoEdgeTheme.gold.opacity(0.35) : BaoEdgeTheme.gold)
        )
        .shadow(color: BaoEdgeTheme.gold.opacity(isDisabled ? 0 : 0.15), radius: 8, x: 0, y: 4)
        .opacity(isDisabled ? 0.62 : 1)
        .disabled(isDisabled)
    }
}

// MARK: - BaoEdgeSecondaryButton (18pt radius — outlined gold border)

/// Outlined action button with gold border.
public struct BaoEdgeSecondaryButton: View {
    let title: String
    let isDisabled: Bool
    let action: () -> Void

    @Environment(\.colorScheme) private var colorScheme

    public init(title: String, isDisabled: Bool = false, action: @escaping () -> Void) {
        self.title = title
        self.isDisabled = isDisabled
        self.action = action
    }

    public var body: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        Button(action: action) {
            Text(title)
                .font(BaoEdgeTheme.Typography.subheadline())
                .multilineTextAlignment(.center)
                .lineLimit(3)
                .fixedSize(horizontal: false, vertical: true)
                .frame(maxWidth: .infinity)
                .padding(.vertical, BaoEdgeTheme.Spacing.buttonPaddingV)
        }
        .buttonStyle(.plain)
        .foregroundStyle(isDisabled ? colors.onSurface.opacity(0.4) : colors.onSurface)
        .background(
            RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.button, style: .continuous)
                .stroke(BaoEdgeTheme.gold.opacity(isDisabled ? 0.18 : 0.38), lineWidth: 1)
                .background(
                    RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.button, style: .continuous)
                        .fill(colors.background.opacity(0.26))
                )
        )
        .disabled(isDisabled)
    }
}

/// Button style with press scale animation — matches Android/web 0.96 scale.
struct BaoEdgePressableButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? BaoEdgeTheme.Animation.pressScale : 1.0)
            .animation(BaoEdgeMotion.pressAnimation, value: configuration.isPressed)
    }
}

// MARK: - BaoEdgeChoiceOption (matches Android BaoEdgeChoiceOption)

/// Option for searchable choice fields and radio groups.
public struct BaoEdgeChoiceOption: Identifiable {
    public let value: String
    public let label: String
    public var id: String { value }

    public init(value: String, label: String) {
        self.value = value
        self.label = label
    }
}

// MARK: - BaoEdgeSearchableChoiceField (matches Android BaoEdgeSearchableChoiceField)

/// Tappable row for searchable dropdown — displays label and selected value; parent presents sheet.
public struct BaoEdgeSearchableChoiceField: View {
    let title: String
    let selectedLabel: String
    let action: () -> Void

    @Environment(\.colorScheme) private var colorScheme

    public init(title: String, selectedLabel: String, action: @escaping () -> Void) {
        self.title = title
        self.selectedLabel = selectedLabel
        self.action = action
    }

    public var body: some View {
        BaoEdgeField(title: title) {
            Button(action: action) {
                HStack {
                    Text(selectedLabel.isEmpty ? " " : selectedLabel)
                        .font(BaoEdgeTheme.Typography.body())
                        .foregroundStyle(selectedLabel.isEmpty ? BaoEdgeTheme.cream.opacity(0.5) : BaoEdgeTheme.ivory)
                    Spacer()
                    Image(systemName: "magnifyingglass")
                        .foregroundStyle(BaoEdgeTheme.gold)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, BaoEdgeTheme.Spacing.buttonPaddingV)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.button, style: .continuous)
                        .fill(BaoEdgeTheme.black.opacity(0.72))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.button, style: .continuous)
                        .stroke(BaoEdgeTheme.gold.opacity(0.24), lineWidth: 1)
                )
            }
            .buttonStyle(.plain)
            .accessibilityLabel(title)
        }
    }
}

// MARK: - BaoEdgeRadioChoiceGroup (matches Android BaoEdgeRadioChoiceGroup)

/// Accessible single-choice radio group with full-row tap targets.
public struct BaoEdgeRadioChoiceGroup: View {
    let title: String
    let options: [BaoEdgeChoiceOption]
    let selectedOption: String
    let onOptionSelected: (String) -> Void

    @Environment(\.colorScheme) private var colorScheme

    public init(
        title: String,
        options: [BaoEdgeChoiceOption],
        selectedOption: String,
        onOptionSelected: @escaping (String) -> Void
    ) {
        self.title = title
        self.options = options
        self.selectedOption = selectedOption
        self.onOptionSelected = onOptionSelected
    }

    public init(
        title: String,
        options: [String],
        selectedOption: String,
        onOptionSelected: @escaping (String) -> Void
    ) {
        self.title = title
        self.options = options.map { BaoEdgeChoiceOption(value: $0, label: $0) }
        self.selectedOption = selectedOption
        self.onOptionSelected = onOptionSelected
    }

    @ViewBuilder
    public var body: some View {
        if !options.isEmpty {
            VStack(alignment: .leading, spacing: BaoEdgeTheme.Spacing.iconGap) {
                Text(title)
                    .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                    .foregroundStyle(BaoEdgeTheme.gold.opacity(0.92))
                ForEach(options) { option in
                    BaoEdgeRadioChoiceRow(
                        label: option.label,
                        selected: option.value == selectedOption,
                        onClick: { onOptionSelected(option.value) }
                    )
                }
            }
        }
    }
}

// MARK: - BaoEdgeRadioChoiceRow (matches Android BaoEdgeRadioChoiceRow)

/// Single radio option row — full row tappable for accessibility.
public struct BaoEdgeRadioChoiceRow: View {
    let label: String
    let selected: Bool
    let onClick: () -> Void

    public init(label: String, selected: Bool, onClick: @escaping () -> Void) {
        self.label = label
        self.selected = selected
        self.onClick = onClick
    }

    public var body: some View {
        Button(action: onClick) {
            HStack(spacing: BaoEdgeTheme.Spacing.iconGap) {
                Image(systemName: selected ? "circle.inset.filled" : "circle")
                    .font(BaoEdgeTheme.Typography.display(size: 22))
                    .foregroundStyle(selected ? BaoEdgeTheme.gold : BaoEdgeTheme.cream.opacity(0.6))
                Text(label)
                    .font(BaoEdgeTheme.Typography.body())
                    .foregroundStyle(BaoEdgeTheme.ivory)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(.horizontal, 4)
            .padding(.vertical, 2)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityAddTraits(selected ? [.isSelected] : [])
        .accessibilityLabel(label)
    }
}

// MARK: - BaoEdgeSwitchRow (matches Android BaoEdgeSwitchRow)

/// Full-width switch row — label and switch merged into one accessible toggle target.
public struct BaoEdgeSwitchRow: View {
    let label: String
    let accessibilityHint: String?
    @Binding var isOn: Bool

    @Environment(\.colorScheme) private var colorScheme

    public init(label: String, isOn: Binding<Bool>, accessibilityHint: String? = nil) {
        self.label = label
        self.accessibilityHint = accessibilityHint
        _isOn = isOn
    }

    public var body: some View {
        Toggle(isOn: $isOn) {
            Text(label)
                .font(BaoEdgeTheme.Typography.body())
                .foregroundStyle(BaoEdgeTheme.ivory)
        }
        .toggleStyle(.switch)
        .tint(BaoEdgeTheme.gold)
        .padding(.horizontal, 4)
        .padding(.vertical, 2)
        .modifier(OptionalAccessibilityHint(hint: accessibilityHint))
    }
}

private struct OptionalAccessibilityHint: ViewModifier {
    let hint: String?
    func body(content: Content) -> some View {
        if let hint = hint, !hint.isEmpty {
            content.accessibilityHint(hint)
        } else {
            content
        }
    }
}

// MARK: - BaoEdgeIconActionButton (matches Android BaoEdgeIconActionButton)

/// Icon-first utility action — compact label with explicit description.
public struct BaoEdgeIconActionButton: View {
    let label: String
    let systemImageName: String
    let action: () -> Void
    let isEnabled: Bool

    @Environment(\.colorScheme) private var colorScheme

    public init(
        label: String,
        systemImageName: String,
        action: @escaping () -> Void,
        isEnabled: Bool = true
    ) {
        self.label = label
        self.systemImageName = systemImageName
        self.action = action
        self.isEnabled = isEnabled
    }

    public var body: some View {
        VStack(spacing: 6) {
            Button(action: action) {
                Image(systemName: systemImageName)
                    .font(BaoEdgeTheme.Typography.title(size: 20, weight: .medium))
                    .foregroundStyle(isEnabled ? BaoEdgeTheme.gold : BaoEdgeTheme.cream.opacity(0.5))
                    .frame(width: 52, height: 52)
                    .background(
                        RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.button, style: .continuous)
                            .fill(BaoEdgeTheme.gold.opacity(isEnabled ? 0.16 : 0.08))
                    )
            }
            .buttonStyle(.plain)
            .disabled(!isEnabled)
            .accessibilityLabel(label)
            Text(label)
                .font(BaoEdgeTheme.Typography.caption2(weight: .medium))
                .foregroundStyle(BaoEdgeTheme.resolved(for: colorScheme).onSurfaceVariant)
                .multilineTextAlignment(.center)
                .lineLimit(2)
        }
        .frame(minWidth: 80, maxWidth: 132)
    }
}

// MARK: - BaoEdgeInput (matches Android BaoEdgeInput)

/// Branded multiline input for composer and admin forms.
public struct BaoEdgeInput: View {
    @Binding var value: String
    let label: String?
    let placeholder: String?
    let minLines: Int
    let singleLine: Bool

    @Environment(\.colorScheme) private var colorScheme

    public init(
        value: Binding<String>,
        label: String? = nil,
        placeholder: String? = nil,
        minLines: Int = 1,
        singleLine: Bool = false
    ) {
        _value = value
        self.label = label
        self.placeholder = placeholder
        self.minLines = minLines
        self.singleLine = singleLine
    }

    public var body: some View {
        Group {
            if let label, !label.isEmpty {
                BaoEdgeField(title: label) {
                    textField
                }
            } else {
                textField
            }
        }
    }

    private var textField: some View {
        TextField(placeholder ?? "", text: $value, axis: singleLine ? .horizontal : .vertical)
            .textFieldStyle(BaoEdgeInputStyle())
            .lineLimit(singleLine ? 1 : 10)
    }
}

// MARK: - BaoEdgeStatusCard (22pt radius — matches Android BaoEdgeStatusCard)

/// Status display card with title, detail, state indicator, and action button.
public struct BaoEdgeStatusCard: View {
    let title: String
    let detail: String
    let state: FlowExecutionState
    let actionTitle: String
    let actionDisabled: Bool
    let action: () -> Void

    @Environment(\.colorScheme) private var colorScheme

    public init(
        title: String,
        detail: String,
        state: FlowExecutionState,
        actionTitle: String,
        actionDisabled: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.detail = detail
        self.state = state
        self.actionTitle = actionTitle
        self.actionDisabled = actionDisabled
        self.action = action
    }

    public var body: some View {
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        let stateAccent = state.resolvedAccentColor(for: colorScheme)
        VStack(alignment: .leading, spacing: 12) {
            VStack(alignment: .leading, spacing: 12) {
                ViewThatFits {
                    HStack(alignment: .top, spacing: 12) {
                        headerText(colors: colors, stateAccent: stateAccent)
                        Spacer(minLength: 12)
                        BaoEdgeChip(label: state.localizedOperatorLabel, accent: stateAccent)
                    }

                    VStack(alignment: .leading, spacing: 8) {
                        headerText(colors: colors, stateAccent: stateAccent)
                        BaoEdgeChip(label: state.localizedOperatorLabel, accent: stateAccent)
                    }
                }
                Text(detail)
                    .font(BaoEdgeTheme.Typography.caption())
                    .foregroundStyle(colors.onSurfaceVariant)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .accessibilityElement(children: .ignore)
            .accessibilityLabel(L10n.t("flow_runner_status_card_accessibility", title, state.localizedOperatorLabel, detail))
            if !actionTitle.isEmpty {
                BaoEdgePrimaryButton(title: actionTitle, isDisabled: actionDisabled, action: action)
            }
        }
        .padding(BaoEdgeTheme.Spacing.buttonPaddingH)
        .background(
            RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.bubble, style: .continuous)
                .fill(stateAccent.opacity(0.1))
        )
        .overlay(
            RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.bubble, style: .continuous)
                .stroke(stateAccent.opacity(0.26), lineWidth: 1)
        )
    }

    @ViewBuilder
    private func headerText(colors: BaoEdgeTheme.ResolvedColors, stateAccent: Color) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(BaoEdgeTheme.Typography.subheadline(weight: .semibold))
                .foregroundStyle(colors.onSurface)
                .fixedSize(horizontal: false, vertical: true)
            Text(state.localizedOperatorLabel)
                .font(BaoEdgeTheme.Typography.caption(weight: .semibold))
                .foregroundStyle(stateAccent)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

// MARK: - BaoEdgeTimelineBubble (22pt radius — matches Android BaoEdgeTimelineBubble / web .bao-edge-bubble)

func shouldRenderOperatorTimelineMarkdown(for role: OperatorConversationRole) -> Bool {
    role != .user
}

func parseOperatorTimelineMarkdown(_ body: String) -> AttributedString? {
    guard shouldTreatAsMarkdown(body) else {
        return nil
    }
    return try? AttributedString(markdown: body)
}

/// Splits body by fenced code blocks (```) into alternating non-code and code segments.
/// - Returns: Array of (isCode: Bool, content: String). Even indices are non-code, odd are code.
private func splitByFencedCodeBlocks(_ body: String) -> [(isCode: Bool, content: String)] {
    let parts = body.components(separatedBy: "```")
    var result: [(Bool, String)] = []
    for (i, part) in parts.enumerated() {
        let trimmed = part.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.isEmpty && parts.count == 1 {
            continue
        }
        let isCode = i % 2 == 1
        if isCode {
            let withoutLang = dropLanguageIdentifier(from: trimmed)
            result.append((true, withoutLang))
        } else {
            result.append((false, part))
        }
    }
    return result
}

/// Drops optional language identifier from first line of a code block (e.g. "swift" or "json").
private func dropLanguageIdentifier(from code: String) -> String {
    guard let firstNewline = code.firstIndex(of: "\n") else {
        let firstLine = code.trimmingCharacters(in: .whitespaces)
        if firstLine.allSatisfy({ $0.isLetter || $0.isNumber || $0 == "-" || $0 == "_" }) {
            return ""
        }
        return code
    }
    let firstLine = String(code[..<firstNewline]).trimmingCharacters(in: .whitespaces)
    if firstLine.allSatisfy({ $0.isLetter || $0.isNumber || $0 == "-" || $0 == "_" }) {
        return String(code[code.index(after: firstNewline)...]).trimmingCharacters(in: .whitespaces)
    }
    return code
}

private func shouldTreatAsMarkdown(_ body: String) -> Bool {
    let trimmed = body.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
        return false
    }
    let markdownSignals = ["**", "__", "```", "`", "##", "- ", "* ", "[", "]("]
    return markdownSignals.contains { trimmed.contains($0) }
}

@ViewBuilder
private func operatorTimelineMarkdownWithCodeBlocks(_ body: String, colors: BaoEdgeTheme.ResolvedColors, contentColor: Color) -> some View {
    let segments = splitByFencedCodeBlocks(body)
    VStack(alignment: .leading, spacing: 8) {
        ForEach(Array(segments.enumerated()), id: \.offset) { _, segment in
            if segment.isCode {
                ScrollView(.horizontal, showsIndicators: false) {
                    Text(segment.content)
                        .font(BaoEdgeTheme.Typography.code(size: 12, weight: .regular))
                        .foregroundStyle(contentColor)
                        .textSelection(.enabled)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(10)
                .background(
                    RoundedRectangle(cornerRadius: 6, style: .continuous)
                        .fill(Color.primary.opacity(0.08))
                )
            } else {
                let content = segment.content.trimmingCharacters(in: .whitespacesAndNewlines)
                if content.isEmpty {
                    EmptyView()
                } else if let attributed = try? AttributedString(markdown: content) {
                    Text(attributed)
                        .tint(colors.primary)
                } else {
                    Text(content)
                }
            }
        }
    }
}

/// Chat-style conversation bubble with role-based styling.
struct BaoEdgeTimelineBubble: View {
    let entry: OperatorConversationEntry

    @Environment(\.colorScheme) private var colorScheme

    public var body: some View {
        let stateAccent = entry.state.resolvedAccentColor(for: colorScheme)
        let isSystemStyle = entry.role == .runtime || entry.role == .system || entry.role == .warning
        let colors = BaoEdgeTheme.resolved(for: colorScheme)
        VStack(alignment: entry.horizontalAlignment, spacing: 6) {
            Text(entry.title)
                .font(isSystemStyle ? BaoEdgeTheme.Typography.caption2(weight: .semibold) : BaoEdgeTheme.Typography.caption(weight: .semibold))
                .foregroundStyle(colors.onSurface)
            timelineBody(colors: colors, isSystemStyle: isSystemStyle)
            Text(entry.state.localizedOperatorLabel)
                .font(BaoEdgeTheme.Typography.caption2(weight: .semibold))
                .foregroundStyle(stateAccent.opacity(0.88))
        }
        .frame(maxWidth: .infinity, alignment: entry.frameAlignment)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(L10n.t("flow_runner_timeline_entry_accessibility", entry.title, entry.state.localizedOperatorLabel, entry.body))
    }

    @ViewBuilder
    private func timelineBody(colors: BaoEdgeTheme.ResolvedColors, isSystemStyle: Bool) -> some View {
        Group {
            if shouldRenderOperatorTimelineMarkdown(for: entry.role) {
                if entry.body.contains("```") {
                    operatorTimelineMarkdownWithCodeBlocks(entry.body, colors: colors, contentColor: entry.role.onContent)
                } else if let markdown = parseOperatorTimelineMarkdown(entry.body) {
                    Text(markdown)
                        .tint(colors.primary)
                } else {
                    Text(entry.body)
                }
            } else {
                Text(entry.body)
            }
        }
        .font(isSystemStyle ? BaoEdgeTheme.Typography.caption(weight: .medium) : BaoEdgeTheme.Typography.body(weight: .medium))
        .foregroundStyle(entry.role.onContent)
        .multilineTextAlignment(entry.textAlignment)
        .frame(maxWidth: .infinity, alignment: entry.frameAlignment)
        .padding(.trailing, isSystemStyle && entry.role != .user ? 36 : 0)
        .padding(isSystemStyle ? 12 : 14)
        .background(
            RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.bubble, style: .continuous)
                .fill(entry.role.background.opacity(isSystemStyle ? 0.74 : 0.96))
        )
        .overlay(
            RoundedRectangle(cornerRadius: BaoEdgeTheme.Shape.bubble, style: .continuous)
                .stroke(entry.role.accent.opacity(isSystemStyle ? 0.18 : 0.26), lineWidth: 1)
        )
        .overlay(alignment: entry.role == .user ? .bottom : .leading) {
            if entry.role == .user {
                Rectangle()
                    .fill(BaoEdgeTheme.gold.opacity(0.45))
                    .frame(height: 2)
                    .padding(.horizontal, 12)
                    .offset(y: -1)
            } else if entry.role == .assistant {
                Rectangle()
                    .fill(BaoEdgeTheme.gold.opacity(0.35))
                    .frame(width: 2)
                    .padding(.vertical, 8)
                    .offset(x: 1)
            }
        }
    }
}

// MARK: - BaoEdgeFloatingChatBubble (circle — matches Android/web FAB)

/// Floating action button for AI chat entry point with pulsing glow.
public struct BaoEdgeFloatingChatBubble: View {
    let systemImageName: String
    let action: () -> Void

    @Environment(\.colorScheme) private var colorScheme
    @State private var isPulsing = false

    public init(systemImageName: String = "bubble.left.and.bubble.right.fill", action: @escaping () -> Void) {
        self.systemImageName = systemImageName
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Image(systemName: systemImageName)
                .font(BaoEdgeTheme.Typography.headline(size: 18))
                .foregroundStyle(BaoEdgeTheme.resolved(for: colorScheme).onPrimary)
                .frame(width: 56, height: 56)
                .background(Circle().fill(BaoEdgeTheme.gold))
                .shadow(color: BaoEdgeTheme.gold.opacity(isPulsing ? 0.35 : 0.15), radius: isPulsing ? 20 : 12, x: 0, y: 6)
                .scaleEffect(isPulsing ? 1.04 : 1.0)
        }
        .buttonStyle(.plain)
        .accessibilityLabel(L10n.t("flow_runner_floating_chat_aria"))
        .accessibilityHint(L10n.t("flow_runner_floating_chat_hint"))
        .onAppear {
            #if canImport(UIKit)
            guard !UIAccessibility.isReduceMotionEnabled else { return }
            #endif
            withAnimation(.easeInOut(duration: 2.0).repeatForever(autoreverses: true)) {
                isPulsing = true
            }
        }
    }
}

// MARK: - FlowExecutionState Color Helpers

extension FlowExecutionState {
    /// Resolve state accent color using the shared semantic palette.
    func resolvedAccentColor(for scheme: ColorScheme) -> Color {
        let colors = BaoEdgeTheme.resolved(for: scheme)
        switch self {
        case .idle:
            return colors.onSurfaceVariant
        case .loading:
            return BaoEdgeTheme.gold
        case .success:
            return colors.success
        case .empty:
            return colors.info
        case .errorRetryable, .errorNonRetryable, .unauthorized:
            return colors.error
        }
    }

    /// Convenience accent color (dark-mode default) for non-View contexts.
    var accentColor: Color {
        resolvedAccentColor(for: .dark)
    }

    /// Localized operator-facing label for the current state.
    var localizedOperatorLabel: String {
        switch self {
        case .idle: return L10n.t("flow_runner_state_idle")
        case .loading: return L10n.t("flow_runner_state_loading")
        case .success: return L10n.t("flow_runner_state_success")
        case .empty: return L10n.t("flow_runner_state_empty")
        case .errorRetryable: return L10n.t("flow_runner_state_error_retryable")
        case .errorNonRetryable: return L10n.t("flow_runner_state_error_non_retryable")
        case .unauthorized: return L10n.t("flow_runner_state_unauthorized")
        }
    }
}

// MARK: - OperatorConversationEntry Layout Helpers

extension OperatorConversationEntry {
    var frameAlignment: Alignment {
        switch role {
        case .user: return .trailing
        case .assistant, .runtime, .system, .warning: return .leading
        }
    }

    var horizontalAlignment: HorizontalAlignment {
        switch role {
        case .user: return .trailing
        case .assistant, .runtime, .system, .warning: return .leading
        }
    }

    var textAlignment: TextAlignment {
        switch role {
        case .user: return .trailing
        case .assistant, .runtime, .system, .warning: return .leading
        }
    }
}

// MARK: - OperatorConversationRole Visual Properties

extension OperatorConversationRole {
    var accent: Color {
        switch self {
        case .system: return BaoEdgeTheme.goldLight
        case .user: return BaoEdgeTheme.gold
        case .assistant: return BaoEdgeTheme.cream
        case .runtime: return BaoEdgeTheme.success
        case .warning: return BaoEdgeTheme.error
        }
    }

    var background: Color {
        switch self {
        case .system: return BaoEdgeTheme.charcoal.opacity(0.88)
        case .user: return BaoEdgeTheme.goldDeep.opacity(0.24)
        case .assistant: return BaoEdgeTheme.black.opacity(0.86)
        case .runtime: return BaoEdgeTheme.success.opacity(0.9)
        case .warning: return BaoEdgeTheme.error.opacity(0.92)
        }
    }

    /// Content (text) color for this role's bubble — WCAG: light text on dark backgrounds, dark on light.
    var onContent: Color {
        switch self {
        case .user: return BaoEdgeTheme.charcoal
        case .system, .assistant, .runtime, .warning: return BaoEdgeTheme.ivory
        }
    }
}

// MARK: - Platform-Guarded View Modifiers

extension View {
    @ViewBuilder
    func baoEdgeMultilineInput(minHeight: CGFloat) -> some View {
        self
            .scrollContentBackground(.hidden)
            .font(BaoEdgeTheme.Typography.body())
            .foregroundStyle(BaoEdgeTheme.ivory)
            .frame(minHeight: minHeight)
            .padding(.horizontal, 10)
            .padding(.vertical, 10)
            .background(
                RoundedRectangle(cornerRadius: 22, style: .continuous)
                    .fill(BaoEdgeTheme.black.opacity(0.72))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 22, style: .continuous)
                    .stroke(BaoEdgeTheme.gold.opacity(0.24), lineWidth: 1)
            )
    }

    /// Disable autocapitalization on iOS; no-op on macOS.
    @ViewBuilder
    func baoEdgeNoAutocapitalize() -> some View {
        #if canImport(UIKit)
        self.textInputAutocapitalization(.never)
        #else
        self
        #endif
    }

    /// Set inline navigation title display on iOS; no-op on macOS.
    @ViewBuilder
    func baoEdgeInlineNavTitle() -> some View {
        #if canImport(UIKit)
        self.navigationBarTitleDisplayMode(.inline)
        #else
        self
        #endif
    }

    /// Hide the default navigation bar on iOS so workspace surfaces can own a compact shell header.
    @ViewBuilder
    func baoEdgeHiddenNavBar() -> some View {
        #if canImport(UIKit)
        self.toolbar(.hidden, for: .navigationBar)
        #else
        self
        #endif
    }

    /// Set number pad keyboard on iOS; no-op on macOS.
    @ViewBuilder
    func baoEdgeNumberPadKeyboard() -> some View {
        #if canImport(UIKit)
        self.keyboardType(.numberPad)
        #else
        self
        #endif
    }
}

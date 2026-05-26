// Bao Edge brand palette — derived from shared/brand-tokens.json (single source of truth).
// Align with: control-plane brand.ts, brand-overrides.css, Android Color.kt + Shape.kt.
// Copyright 2025 Google LLC
// Licensed under the Apache License, Version 2.0.

import CoreText
import SwiftUI

/// Bao Edge brand palette and design tokens. Single iOS source; must match shared/brand-tokens.json.
public enum BaoEdgeTheme {
    // MARK: - Brand Colors (shared/brand-tokens.json → colors)

    /// Primary gold #D4B978
    public static let gold = Color(red: 212/255, green: 185/255, blue: 120/255)
    /// Deep gold #C4A55E
    public static let goldDeep = Color(red: 196/255, green: 165/255, blue: 94/255)
    /// Light gold #E8D9A8
    public static let goldLight = Color(red: 232/255, green: 217/255, blue: 168/255)

    /// Near-black #080808
    public static let black = Color(red: 8/255, green: 8/255, blue: 8/255)
    /// Dark gray #111111
    public static let charcoal = Color(red: 17/255, green: 17/255, blue: 17/255)
    /// Warm beige #F2EDE5
    public static let cream = Color(red: 242/255, green: 237/255, blue: 229/255)
    /// Off-white #FAF7F2
    public static let ivory = Color(red: 250/255, green: 247/255, blue: 242/255)

    /// Ruby accent #D4364E
    public static let ruby = Color(red: 212/255, green: 54/255, blue: 78/255)
    /// Ruby deep #7A1D2E
    public static let rubyDeep = Color(red: 122/255, green: 29/255, blue: 46/255)
    /// Titanium neutral #B5AFA7
    public static let titanium = Color(red: 181/255, green: 175/255, blue: 167/255)
    /// Graphite #1C1C1C
    public static let graphite = Color(red: 28/255, green: 28/255, blue: 28/255)

    // MARK: - Semantic Status Colors (shared/brand-tokens.json → semantic)

    /// Success green — light: #5A7F3A, dark: #A8D17B
    public static let success = Color(light: Color(red: 90/255, green: 127/255, blue: 58/255),
                                       dark: Color(red: 168/255, green: 209/255, blue: 123/255))
    /// Warning amber — light: #8F6E2A, dark: #E8D9A8
    public static let warning = Color(light: Color(red: 143/255, green: 110/255, blue: 42/255),
                                       dark: Color(red: 232/255, green: 217/255, blue: 168/255))
    /// Error red — light: #B3261E, dark: #F2B8B5
    public static let error = Color(light: Color(red: 179/255, green: 38/255, blue: 30/255),
                                     dark: Color(red: 242/255, green: 184/255, blue: 181/255))
    /// Info blue — light: #4A6FA5, dark: #93B8E8
    public static let info = Color(light: Color(red: 74/255, green: 111/255, blue: 165/255),
                                    dark: Color(red: 147/255, green: 184/255, blue: 232/255))

    // MARK: - Shape Tokens (shared/brand-tokens.json → shape, in pt)

    public enum Shape {
        /// Large panel containers — 28pt
        public static let panel: CGFloat = 28
        /// Text inputs, selectors — 24pt
        public static let input: CGFloat = 24
        /// Chat bubbles, state cards — 22pt
        public static let bubble: CGFloat = 22
        /// Buttons, text fields — 18pt
        public static let button: CGFloat = 18
    }

    // MARK: - Material Gradients (must match CSS --v-gold-gradient and Android Color.kt)

    /// Gold metallic linear gradient — 3 stops matching brand-tokens.json.
    public static let goldMaterial = LinearGradient(
        colors: [goldLight, gold, goldDeep],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    /// Radial surface glow effect — gold center fading to clear.
    public static let surfaceGlow = RadialGradient(
        colors: [gold.opacity(0.15), Color.clear],
        center: .topLeading,
        startRadius: 0,
        endRadius: 300
    )

    // MARK: - Animation Tokens (must match CSS --v-duration-* and Android)

    public enum Animation {
        public static let durationFast: Double = 0.15
        public static let durationMedium: Double = 0.3
        public static let durationSlow: Double = 0.5
        public static let pulseInterval: Double = 4.0
        /// Matches shared/brand-tokens.json animation.pressScale
        public static let pressScale: CGFloat = 0.96
    }

    // MARK: - Typography (shared/brand-tokens.json → typography.codebase)

    /// Display: Instrument Serif. Body: Syne. Code: IBM Plex Mono.
    public enum Typography {
        /// Display font — Instrument Serif
        public static func display(size: CGFloat = 34, weight: Font.Weight = .regular) -> Font {
            .custom("InstrumentSerif-Regular", size: size)
        }

        /// Body font — Syne (variable font interpolates weight)
        public static func body(size: CGFloat = 17, weight: Font.Weight = .regular) -> Font {
            .custom("Syne", size: size).weight(weight)
        }

        /// Code font — IBM Plex Mono
        public static func code(size: CGFloat = 13, weight: Font.Weight = .regular) -> Font {
            let name: String
            switch weight {
            case .bold: name = "IBMPlexMono-Bold"
            case .semibold: name = "IBMPlexMono-SemiBold"
            case .medium: name = "IBMPlexMono-Medium"
            default: name = "IBMPlexMono"
            }
            return .custom(name, size: size)
        }

        /// Caption — Syne at smaller size
        public static func caption(size: CGFloat = 12, weight: Font.Weight = .medium) -> Font {
            body(size: size, weight: weight)
        }

        /// Caption2 — Syne at smallest size
        public static func caption2(size: CGFloat = 11, weight: Font.Weight = .semibold) -> Font {
            body(size: size, weight: weight)
        }

        /// Title — Syne
        public static func title(size: CGFloat = 20, weight: Font.Weight = .semibold) -> Font {
            body(size: size, weight: weight)
        }

        /// Subheadline — Syne
        public static func subheadline(size: CGFloat = 15, weight: Font.Weight = .medium) -> Font {
            body(size: size, weight: weight)
        }

        /// Headline — Syne
        public static func headline(size: CGFloat = 17, weight: Font.Weight = .semibold) -> Font {
            body(size: size, weight: weight)
        }
    }

    /// Register custom fonts from the module bundle. Call once at app launch.
    public static func registerFonts() {
        #if canImport(UIKit)
        let fontNames = [
            "syne_variable",
            "ibm_plex_mono_regular",
            "ibm_plex_mono_medium",
            "ibm_plex_mono_semibold",
            "instrument_serif_regular",
            "instrument_serif_italic",
        ]
        for baseName in fontNames {
            guard let url = Bundle.module.url(forResource: baseName, withExtension: "ttf", subdirectory: nil)
            ?? Bundle.module.url(forResource: baseName, withExtension: "ttf", subdirectory: "Fonts") else { continue }
            var error: Unmanaged<CFError>?
            CTFontManagerRegisterFontsForURL(url as CFURL, .process, &error)
        }
        #endif
    }

    // MARK: - Spacing Tokens (shared/brand-tokens.json → spacing, in pt)

    public enum Spacing {
        /// Panel internal padding — 18pt
        public static let panelPadding: CGFloat = 18
        /// Panel content gap — 14pt
        public static let panelGap: CGFloat = 14
        /// Chip horizontal padding — 12pt
        public static let chipPaddingH: CGFloat = 12
        /// Chip vertical padding — 9pt
        public static let chipPaddingV: CGFloat = 9
        /// Button horizontal padding — 16pt
        public static let buttonPaddingH: CGFloat = 16
        /// Button vertical padding — 12pt
        public static let buttonPaddingV: CGFloat = 12
        /// Icon-to-text gap — 8pt
        public static let iconGap: CGFloat = 8
    }

    // MARK: - Resolved Color Scheme

    /// Resolved color palette for the current appearance (light or dark).
    public struct ResolvedColors: Sendable {
        public let background: Color
        public let surface: Color
        public let onSurface: Color
        public let onSurfaceVariant: Color
        public let primary: Color
        public let onPrimary: Color
        public let outline: Color
        public let outlineVariant: Color
        public let success: Color
        public let warning: Color
        public let error: Color
        public let info: Color
    }

    /// Resolve the brand palette for the given color scheme.
    public static func resolved(for scheme: ColorScheme) -> ResolvedColors {
        switch scheme {
        case .dark:
            return ResolvedColors(
                background: black,
                surface: charcoal,
                onSurface: ivory,
                onSurfaceVariant: cream.opacity(0.72),
                primary: goldLight,
                onPrimary: black,
                outline: Color(red: 158/255, green: 148/255, blue: 126/255),  // #9E947E
                outlineVariant: Color(red: 77/255, green: 71/255, blue: 58/255),  // #4D473A
                success: Color(red: 168/255, green: 209/255, blue: 123/255),
                warning: goldLight,
                error: Color(red: 242/255, green: 184/255, blue: 181/255),
                info: Color(red: 147/255, green: 184/255, blue: 232/255)
            )
        case .light:
            return ResolvedColors(
                background: ivory,
                surface: cream,
                onSurface: charcoal,
                onSurfaceVariant: Color(red: 78/255, green: 71/255, blue: 56/255),  // #4E4738
                primary: goldDeep,
                onPrimary: ivory,
                outline: Color(red: 123/255, green: 114/255, blue: 96/255),  // #7B7260
                outlineVariant: Color(red: 206/255, green: 195/255, blue: 169/255),  // #CEC3A9
                success: Color(red: 90/255, green: 127/255, blue: 58/255),
                warning: Color(red: 143/255, green: 110/255, blue: 42/255),
                error: Color(red: 179/255, green: 38/255, blue: 30/255),
                info: Color(red: 74/255, green: 111/255, blue: 165/255)
            )
        @unknown default:
            return resolved(for: .dark)
        }
    }
}

// MARK: - Adaptive Color Helper

private extension Color {
    /// Create a color that adapts to light/dark appearance.
    init(light: Color, dark: Color) {
        #if canImport(UIKit)
        self.init(uiColor: UIColor { traits in
            traits.userInterfaceStyle == .dark
                ? UIColor(dark)
                : UIColor(light)
        })
        #elseif canImport(AppKit)
        self.init(nsColor: NSColor(name: nil) { appearance in
            appearance.bestMatch(from: [.darkAqua, .aqua]) == .darkAqua
                ? NSColor(dark)
                : NSColor(light)
        })
        #else
        self = dark
        #endif
    }
}

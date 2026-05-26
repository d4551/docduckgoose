import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

/// Motion policy aligned with brand-tokens.json and prefers-reduced-motion.
public enum BaoEdgeMotion {
    public static var prefersReducedMotion: Bool {
        #if canImport(UIKit)
        return UIAccessibility.isReduceMotionEnabled
        #else
        return false
        #endif
    }

    public static func duration(_ seconds: Double) -> Double {
        prefersReducedMotion ? 0 : seconds
    }

    public static var pressAnimation: Animation? {
        prefersReducedMotion
            ? nil
            : .easeInOut(duration: BaoEdgeTheme.Animation.durationFast)
    }

    public static var standardAnimation: Animation? {
        prefersReducedMotion
            ? nil
            : .easeInOut(duration: BaoEdgeTheme.Animation.durationMedium)
    }
}

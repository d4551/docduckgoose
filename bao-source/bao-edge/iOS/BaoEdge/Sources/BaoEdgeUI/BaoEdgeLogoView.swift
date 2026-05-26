// Bao Edge logo: gold cube wireframe matching web favicon and Android logo.
// Copyright 2025 Google LLC
// Licensed under the Apache License, Version 2.0.

import SwiftUI

/// SwiftUI view rendering the Bao Edge cube wireframe logo with optional breathing glow.
public struct BaoEdgeLogoView: View {
    var size: CGFloat = 24
    var color: Color = BaoEdgeTheme.gold
    var animated: Bool = false

    @State private var glowScale: CGFloat = 0.9

    public init(size: CGFloat = 24, color: Color = BaoEdgeTheme.gold, animated: Bool = false) {
        self.size = size
        self.color = color
        self.animated = animated
    }

    public var body: some View {
        Canvas { context, canvasSize in
            let scale = min(canvasSize.width, canvasSize.height) / 24
            var path = Path()
            // Cube wireframe (viewBox 0 0 24 24)
            // Front face: M12 4 l6 3 v6 l-6 3 -6-3 V7 z
            path.move(to: CGPoint(x: 12 * scale, y: 4 * scale))
            path.addLine(to: CGPoint(x: 18 * scale, y: 7 * scale))
            path.addLine(to: CGPoint(x: 18 * scale, y: 13 * scale))
            path.addLine(to: CGPoint(x: 12 * scale, y: 16 * scale))
            path.addLine(to: CGPoint(x: 6 * scale, y: 13 * scale))
            path.addLine(to: CGPoint(x: 6 * scale, y: 7 * scale))
            path.closeSubpath()
            // Vertical center line
            path.move(to: CGPoint(x: 12 * scale, y: 4 * scale))
            path.addLine(to: CGPoint(x: 12 * scale, y: 16 * scale))
            // Top horizontal
            path.move(to: CGPoint(x: 6 * scale, y: 7 * scale))
            path.addLine(to: CGPoint(x: 12 * scale, y: 10 * scale))
            path.addLine(to: CGPoint(x: 18 * scale, y: 7 * scale))
            context.stroke(path, with: .color(color), lineWidth: 1.5 * (scale / 24) * 24)
        }
        .frame(width: size, height: size)
        .background(
            animated
                ? AnyView(
                    Circle()
                        .fill(BaoEdgeTheme.surfaceGlow)
                        .scaleEffect(glowScale)
                        .opacity(0.6)
                        .blur(radius: size * 0.3)
                )
                : AnyView(EmptyView())
        )
        .onAppear {
            guard animated else { return }
            #if canImport(UIKit)
            guard !UIAccessibility.isReduceMotionEnabled else { return }
            #endif
            withAnimation(.easeInOut(duration: BaoEdgeTheme.Animation.pulseInterval).repeatForever(autoreverses: true)) {
                glowScale = 1.1
            }
        }
    }
}

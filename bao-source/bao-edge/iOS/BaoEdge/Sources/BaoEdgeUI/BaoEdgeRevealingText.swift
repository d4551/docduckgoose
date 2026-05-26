import SwiftUI

/// iOS reveal helper — fades text in; skips wipe when reduce motion is enabled.
public struct BaoEdgeRevealingText: View {
    let text: String
    @State private var visible = false

    public init(_ text: String) {
        self.text = text
    }

    public var body: some View {
        Text(text)
            .opacity(visible ? 1 : 0)
            .onAppear {
                if BaoEdgeMotion.prefersReducedMotion {
                    visible = true
                } else {
                    withAnimation(BaoEdgeMotion.standardAnimation) {
                        visible = true
                    }
                }
            }
    }
}

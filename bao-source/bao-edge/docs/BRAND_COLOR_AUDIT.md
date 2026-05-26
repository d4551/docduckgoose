# Brand Color Audit — Android & iOS

> Ensures neither app uses hardcoded colors; both use Bao Edge design tokens from `shared/brand-tokens.json`.

## Motion & hints

Motion durations, reduce-motion policy, compact-action vs chip roles, and HTMX swap parity are documented in [APPLE_DESIGN_PLAN.md](./APPLE_DESIGN_PLAN.md). Parity gate: `bun test bao-source/src/shared/brand-tokens-parity.test.ts`.

## Source of Truth

- **Palette:** [shared/brand-tokens.json](../../src/shared/brand-tokens.json)
- **Control-plane:** [command-bao/src/brand.ts](../command-bao/src/brand.ts)
- **Android theme:** [Android/.../Color.kt](../Android/src/app/src/main/java/com/google/ai/edge/gallery/ui/theme/Color.kt), [colors.xml](../Android/src/app/src/main/res/values/colors.xml)
- **iOS theme:** [iOS/.../BaoEdgeTheme.swift](../iOS/BaoEdge/Sources/BaoEdgeUI/BaoEdgeTheme.swift)

## Android Fixes Applied

| Location | Before | After |
|----------|--------|-------|
| `Utils.kt` `getDistinctiveColor()` | Arbitrary hex palette (green, blue, yellow, etc.) | Bao Edge palette (gold, goldLight, goldDeep, success, info, titanium) |
| `splash_screen_animated_icon.xml` | `#41A15F`, `#FDD45D`, `#E25F57`, `#669DF6` | `@color/bao_edge_gold`, `bao_edge_gold_light`, `bao_edge_ruby`, `bao_edge_info_light` |
| `themes.xml` splash background | `#FFFFFFFF` | `@color/bao_edge_ivory` |
| `themes.xml` (night) splash | `#FF131314` | `@color/bao_edge_charcoal` |
| `drawable/ic_launcher_background.xml` | `#3DDC84` | `@color/bao_edge_gold` |
| `drawable/ic_launcher_foreground.xml` | `#FFFFFF` | `@color/bao_edge_ivory` |
| `drawable/text_spark.xml` | `#FFE37400` | `@color/bao_edge_gold` |
| `drawable/image_spark.xml` | `#FF34A853` | `@color/bao_edge_success_light` |
| `drawable/chat_spark.xml` | `#FF1967D2` | `@color/bao_edge_info_light` |
| `drawable/` circle, pantegon, etc. | `#FFFFFF` | `@color/bao_edge_ivory` |
| `colors.xml` | — | Added `bao_edge_success_*`, `bao_edge_info_*` for semantic |
| `Theme.kt` `taskIconShapeBgColor` | `Color.White` | `surfaceContainerLowestLight` |
| `Color.kt` | — | Added `onUserBubbleLight`, `onUserBubbleDark` |
| `Theme.kt` `CustomColors` | — | Added `onUserBubbleColor` |
| `MessageBodyText.kt` user bubble text | `Color.White` | `MaterialTheme.customColors.onUserBubbleColor` |
| `AudioRecorderPanel.kt` mic/send icon | `Color.White` | `MaterialTheme.colorScheme.onPrimary` |
| `MessageInputText.kt` send icon | `Color.White` | `MaterialTheme.colorScheme.onPrimary` |
| `TextAndVoiceInput.kt` send icon | `Color.White` | `MaterialTheme.colorScheme.onPrimary` |
| `HoldToDictate.kt` mic/label | `Color.White` | `MaterialTheme.colorScheme.onPrimary` |
| `TaskIcon.kt` reveal gradient, icon tint | `Color.Red`, `Color.White` | `MaterialTheme.colorScheme.error`, `onPrimary` |
| `Utils.kt` `RevealingText` gradient | `Color.Red` | `MaterialTheme.colorScheme.error` |

## iOS Fixes Applied

| Location | Before | After |
|----------|--------|-------|
| `BaoEdgeComponents.swift` panel gradient | `Color.white.opacity(0.06)` | `BaoEdgeTheme.ivory.opacity(0.06)` |
| `BaoEdgeComponents.swift` shadow | `Color.black.opacity(0.18)` | `BaoEdgeTheme.black.opacity(0.18)` |
| `OperatorConversationRole` runtime accent | `Color(red: 0.53, green: 0.82, blue: 0.72)` | `BaoEdgeTheme.success` |
| `OperatorConversationRole` warning accent | `Color(red: 0.95, green: 0.46, blue: 0.39)` | `BaoEdgeTheme.error` |
| `OperatorConversationRole` runtime background | `Color(red: 0.19, green: 0.31, blue: 0.27)` | `BaoEdgeTheme.success.opacity(0.9)` |
| `OperatorConversationRole` warning background | `Color(red: 0.33, green: 0.16, blue: 0.14)` | `BaoEdgeTheme.error.opacity(0.92)` |
| `FlowRunnerView` destructive button | `Color.red.opacity(0.82)` | `BaoEdgeTheme.ruby.opacity(0.82)` |

## Typography & WCAG Gaps (Resolved)

| Area | Status | Notes |
|------|--------|-------|
| **iOS timeline bubble text** | ✅ Fixed | Assistant/system/runtime/warning use `onContent` (ivory on dark bg) for WCAG contrast |
| **iOS title above bubble** | ✅ Fixed | Uses `colors.onSurface` instead of accent for readable contrast on page background |
| **Brand typography** | ✅ Implemented | Android: Syne (body), Instrument Serif (display), IBM Plex Mono (code) in `Type.kt` / `AppTypography` |
| **Custom Bao Edge fonts** | ✅ Implemented | iOS: Syne, Instrument Serif, IBM Plex Mono in `BaoEdgeTheme.Typography`; `registerFonts()` at launch; all `.font(.system)` replaced |

## Intentional Exceptions

- **Deploy.kt** `Color.Black`: Used as base for tintable icon; Compose applies tint at call site. Standard pattern.
- **Color.kt** and **BaoEdgeTheme.swift**: Theme definition files; hex values are the canonical palette.
- **logo.xml** `#00000000`: Transparent fill; `@color/bao_edge_gold` used for stroke.
- **Color.clear**: Transparency; no semantic color.

## Checklist for New UI

- [ ] Use `MaterialTheme.colorScheme` (Android) or `BaoEdgeTheme.resolved(for:)` (iOS)
- [ ] Reference `@color/bao_edge_*` (Android) or `BaoEdgeTheme.*` (iOS) for brand colors
- [ ] Avoid raw hex except in theme definition files
- [ ] Add new semantic colors to `colors.xml` and `BaoEdgeTheme` if needed

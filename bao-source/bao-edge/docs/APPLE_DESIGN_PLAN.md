# Apple Design Plan — Bao Edge + command-bao

Canonical design contract for motion, hints, compact controls, and cross-platform token parity.

## SSOT pipeline

| Layer | Canonical file | Consumers |
|-------|----------------|-----------|
| JSON | [`../../src/shared/brand-tokens.json`](../../src/shared/brand-tokens.json) | All platforms |
| TS | [`../../src/shared/brand-tokens.ts`](../../src/shared/brand-tokens.ts) | command-bao HTMX, Happydumpling |
| CSS | [`../../command-bao/public/brand-overrides.css`](../../command-bao/public/brand-overrides.css) | Web shells |
| iOS | [`../iOS/BaoEdge/Sources/BaoEdgeUI/BaoEdgeTheme.swift`](../iOS/BaoEdge/Sources/BaoEdgeUI/BaoEdgeTheme.swift) | Native UI |
| Android | [`../Android/.../theme/BaoEdgeMotion.kt`](../Android/src/app/src/main/java/com/google/ai/edge/gallery/ui/theme/BaoEdgeMotion.kt) | Compose UI |

Parity gate: `bun test bao-source/src/shared/brand-tokens-parity.test.ts`

## Component law

| Component | Role | Platforms |
|-----------|------|-----------|
| `BaoEdgeChip` | Status / read-only badge | iOS, Android, web `badge` |
| `BaoEdgeCompactAction` | Interactive icon control (44pt) | iOS, Android |
| `renderCompactAction` / `renderIconButton` | Web icon + tooltip | Happydumpling |
| `renderHtmxIconAction` | Web HTMX icon actions | command-bao |

## Motion contract

| Token | JSON | CSS | iOS (s) | Android (ms) |
|-------|------|-----|---------|--------------|
| fast | `durationFastMs` 150 | `--v-duration-fast` | 0.15 | 150 |
| medium | `durationMediumMs` 300 | `--v-duration-medium` | 0.3 | 300 |
| slow | `durationSlowMs` 500 | `--v-duration-slow` | 0.5 | 500 |
| pulse | `pulseIntervalMs` 4000 | `--v-pulse-interval` | 4.0 | 4000 |
| HTMX settle | `htmxSettleMs` 200 | via swap string | — | — |

Reduce motion: `BaoEdgeMotion` (iOS/Android), `prefers-reduced-motion` in CSS, `rememberBaoEdgeReduceMotion()` on Android `RevealingText`.

## Hint / tooltip matrix

| Surface | Visible label | VoiceOver / TalkBack | Web |
|---------|---------------|----------------------|-----|
| Primary nav | Icon + text | Label | `aria-label` + text |
| Compact action | Icon only | `accessibilityLabel` + `accessibilityHint` | `aria-label` + `data-tip` |
| Status chip | Text in chip | Combined summary | `badge` + `aria-live` region |
| Segmented control | Segment titles | Hint on info button only | N/A native |

Research cache: [`../../../mas-context/ux-research-cache.md`](../../../mas-context/ux-research-cache.md)

## HTMX web contract

- Swap modifiers from `brand-tokens.ts` → `HTMX_SWAP_*` in `htmx-helpers.ts`
- Icon job actions: `command-bao/src/htmx-icon-action.ts`
- Routes: `runtime-constants.ts` only
- Polling: keep `hx-trigger="every 2s"` + `outerHTML` on wrappers

## Refactor inventory (status)

| Area | Change |
|------|--------|
| `OperatorWorkspaceViews` chat chips | → `BaoEdgeCompactAction` |
| `FlowRunnerView` utility runtime | → single cpu row + chevron |
| `FlowRunnerView` usage chips | → combined provider · model chip |
| command-bao job actions | → `renderHtmxIconAction` |
| Happydumpling `theme-classes` | → CSS var durations |

## Related docs

- [`BRAND_COLOR_AUDIT.md`](./BRAND_COLOR_AUDIT.md)
- [`BAO_EDGE_DAISYUI_MCP_INSTRUCTIONS.md`](./BAO_EDGE_DAISYUI_MCP_INSTRUCTIONS.md)
- [`../../command-bao/docs/DAISYUI-BLUEPRINT-FRONTIER-BAO.md`](../../command-bao/docs/DAISYUI-BLUEPRINT-FRONTIER-BAO.md)

## Verification

```bash
bun test bao-source/src/shared/brand-tokens-parity.test.ts
bun test --cwd bao-source/command-bao tests/htmx-icon-action.test.ts
bun run --cwd bao-source/command-bao verify
bun run validate:strict
```

Native: VoiceOver + Reduce Motion smoke on Flow Runner and Operator chat chips.

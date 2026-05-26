# Typography: Brand Guide vs Codebase

> Canonical reference: [bao-edge-brand-production-1d16.up.railway.app](https://bao-edge-brand-production-1d16.up.railway.app/) Section 05 Typography

## Font Choice

| Role | Brand Guide (canonical) | Codebase (current) |
|------|-------------------------|--------------------|
| Display / Headlines | Playfair Display | Instrument Serif |
| Body / Nav / UI | DM Sans | Syne |
| Code / Mono | IBM Plex Mono | IBM Plex Mono |

## Decision

The **Brand Guide** specifies Playfair Display + DM Sans. The **control-plane, Android, and iOS** implementations currently use **Instrument Serif + Syne**.

**Rationale for current codebase choice:** Instrument Serif and Syne were adopted earlier and are already loaded in the control-plane layout. Migrating to Playfair Display + DM Sans would require:

- Updating `command-bao/public/brand-overrides.css` and `command-bao/src/layout.ts` font imports
- Updating Android `Type.kt` / `AppTypography`
- Updating iOS font references
- Verifying WCAG contrast with new typefaces

**Status:** Intentional divergence documented. `shared/brand-tokens.json` now includes both `typography.fonts.canonical` (Brand Guide) and `typography.fonts.codebase` (current). Future migration to Brand Guide fonts is optional and should be coordinated across all platforms.

## Requirements (from Brand Guide)

- Min body font: 16px
- Line-height body: 1.6–1.85
- Letter-spacing uppercase labels: 0.15–0.3em

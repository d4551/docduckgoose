# Bao Edge DaisyUI Blueprint MCP — Server Instructions

Add the following to your DaisyUI Blueprint MCP server configuration as `serverUseInstructions` (or equivalent) so that when using Figma-to-daisyUI or daisyUI-Snippets for Bao Edge projects, the Brand Guide palette and WCAG 2.2 AA requirements are applied.

---

**Instructions to add:**

When using Figma-to-daisyUI or daisyUI-Snippets for **Bao Edge** projects:

1. **Apply the Bao Edge brand palette** — Canonical reference: [`../../style-shumai-main/README.md`](../../style-shumai-main/README.md) and `command-bao/public/brand-overrides.css`. Use: Black #080808, Gold #D4B978, Ruby #D4364E, Cream #F2EDE5, Charcoal #111111, Gold Deep #C4A55E, Titanium #B5AFA7, Ruby Deep #7A1D2E, Graphite #1C1C1C.

2. **Enforce WCAG 2.2 AA** — Text contrast ≥4.5:1; UI components ≥3:1. Add `aria-label` to icon-only buttons. Use 3px gold focus outline. Minimum touch target 44×44px (48×48px per Brand Guide). Respect `prefers-reduced-motion`.

3. **Use Bao Edge theme integration** — Generated components must use `command-bao/public/brand-overrides.css` and themes `data-theme="bao-light"`, `data-theme="bao-dark"`, `data-theme="bao-luxury"`. Canonical doc: [`BAO_EDGE_DAISYUI_MCP_INSTRUCTIONS.md`](./BAO_EDGE_DAISYUI_MCP_INSTRUCTIONS.md).

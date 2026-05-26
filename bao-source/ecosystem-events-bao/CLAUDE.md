# CLAUDE.md

**`.bao` is the source of truth. Everything else is a swap target.**
Pre-release. No legacy. Refactor now, not later. Finish to industry best practice or don't say you're done.

Read this fully before you touch code. These rules override your defaults. When in doubt, follow the rule, not the habit.

---

## How you work here, Claude

- **Plan, then execute.** State the plan, list the files you'll touch, then go. No silent wandering.
- **Use your to-do list. Reconcile it.** Every item closed or explicitly carried with a reason. Half-done is not done. "Mostly works" is broken.
- **No scope creep.** Do exactly what was asked, completely. Don't invent features. Don't refactor unrelated code unless the task requires it.
- **No fake completion.** Don't claim it's fixed, tested, or cut over unless you verified it. If you didn't run it, say so.
- **Small diffs.** Small files, small components, focused changes. No repo-wide rewrites unless asked. No god modules.
- **Ask before destructive ops** (deletes, migrations, force pushes). Otherwise act.

---

## Prime directives

- **`.bao`-first.** Before writing anything, audit for a non-`.bao` variant doing the job. Found one? Cut over to `.bao`. No parallel implementations.
- **DRY or delete.** Two things that look alike are one thing. Centralize. No copy-paste, no near-duplicates, no twin schemas.
- **Visual-first UI.** Icons over text. Motion that *communicates*, not decorates. Ship it accessible or don't ship it.
- **Finish.** To industry best practice. Don't skip work. Don't leave it for "later."

---

## Before you say "done" — answer all five

1. Is this using `.bao` / BAO **everywhere** it should? Did you actually cut over, or just add `.bao` next to the old thing?
2. Is the UI visual-first — reactive states, hover-to-reveal, animations — not a wall of text?
3. Are you DRY? Point to the single source. If you can't, you're not.
4. Did you **fix** the Biome errors — not suppress them — and confirm zero `biome-ignore` / softening left behind?
5. Is workspace / user / workplace / admin / enterprise logic correct for journeys, access, and scale? Not stubbed. Wired.

If any answer is "no" or "sort of": keep working. Do not report success.

---

## `.bao` cutover rules

- Core references **only** correct `.bao` implementations.
- Delete unreleased legacy naming, docs, versions, and content referencing old non-`.bao` variants. It's pre-release — there's nothing to preserve.
- Fix gaps with regression-safe, improved implementations. Improve on cutover; don't port the old mess.
- One `.bao` contract per concept. No drift between modules.
- **Use `piratebao kraken` as the `.bao` toolchain.** It loads, resolves, and runs `.bao` — all `.bao` operations (load / unload / hot-reload / build / verify) go through `kraken`. No other runner, wrapper, or hand-rolled loader touches `.bao`. If a path bypasses `piratebao kraken`, it's wrong — route it back through `kraken`.

---

## UI / UX — 2026 baseline

- **Icons + hover-reveal over text.** Define two states (standard / hovered); animate between them. Tooltips reveal on hover/focus, not permanent labels.
- **Reactive & variable states.** Icons and components respond to context (mode, interaction, data). Use design-system state tokens.
- **State-confirmation motion.** Tap compresses + springs back. Save = brief kinetic fill. Feedback, not theater. Physics-based, communicative.
- **Surface contextually.** Reveal modules when the user needs them. Fewer clicks, more relevance.
- **Material with intent.** Translucent/Liquid-Glass surfaces only for emphasis (cards, modals, overlays) — never everywhere.
- **Full button-state matrix, always:** default, hover, active, focus-visible, disabled, loading, toggle.
- **Accessibility is not optional.** Color never carries meaning alone — pair with shape/icon/size. Visible focus on every interactive element. `aria-pressed` / `aria-label` / `role` correct. 4.5:1 contrast in **every** state. Keyboard-operable (Enter/Space).
- Central tokens/components for **all** styling. Zero one-off custom styles.

---

## Hard bans — non-negotiable. Do not write these, ever.

- No noop functions. No voids that create debt. No TDZ risks.
- No `try/catch`. No `.catch((error: unknown))`. No `unknown` typecasts. No lazy `as` escapes.
- No `biome-ignore` or equivalent to dodge a real fix. Fix the cause.
- No wrappers, shims, bridges, adapters, compat layers, monkey patches, polyfills in impl paths — unless allowlisted with a documented, industry-best-practice reason.
- No codemods. No barrels / sloppy barrel exports. No monoliths.
- No duplicated schema / data contracts.
- No CDN. Assets and deps are local / package-managed.
- No raw one-off styles where central tokens/components exist.
- No direct env access outside approved config modules.
- No route literals outside route/constants modules.
- No client fetch drift outside the shared API layer / composables.
- No secrets or auth material in `localStorage` / `sessionStorage`.

If you think you need an exception, stop and ask. Don't sneak it in.

---

## Enterprise & access

- Implement **workspace / user / workplace / admin / enterprise** tiers for real: journeys, access control, scale. Stubs fail review.
- Enforce access at the boundary. Default deny.
- Agentic fabric: hot load / unload, `.bao` loading, contextual awareness, current user-flow logic. Keep it live and intelligent.

---

## Quality gate — run before every commit. No exceptions.

1. Biome: **zero** errors, **zero** suppressions.
2. Types: no `unknown` casts, no lazy `as`.
3. Search the diff for banned patterns above. Found one? It doesn't merge.
4. Confirm `.bao` cutover is complete for everything touched, and every `.bao` op runs through `piratebao kraken` — no bypass loaders.
5. To-do list reconciled — every item closed or explicitly carried with a reason.

**If the gate doesn't pass, the work isn't finished. Don't pretend otherwise.**

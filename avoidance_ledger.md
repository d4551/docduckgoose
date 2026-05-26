# Avoidance Ledger — .bao First Contract

Records every instance of:
- Hard task skipped in favor of easier
- Claimed done without verification evidence
- validate:strict / full gates / browser/curl / typecheck skipped
- Worktree (modified + untracked) not reviewed
- Legacy non-`.bao` naming or duplicate contracts left
- Overstated completion
- Hard work avoided

Format per AGENTS.md. This is release hygiene, not punishment.

---

## 2026-05-26 — validate:strict / gates infrastructure non-runnable (highest)

- Avoided/overstated: State file (nes-bao-first-state.json cycle 3) recorded "validate_strict": "not_run", "hardban_violations_open": 0, "legacy_non_bao_open": 0, phase "CERTIFY" for viewport, audits claiming 12 modified + 1 untracked reviewed. No full `bun run ... gates` or equivalent strict run executed on the viewport-device changes or new untracked (bao-validate-gates.ts, validator.config.ts, constants.ts, viewport-device.js, test). `bun run validate:strict` does not exist at root (root delegates to `bao:validate` which only does governance, not code-quality hardbans).
- Why it matters: The bao gate system (patterns.ts, rules/* including no-client-fetch-drift, monolith-body-scan, no-unsafe-storage, helpers, context) is the enforcement mechanism for the entire contract (hard bans, .bao first, no legacy, DRY, type safety). When it cannot even start (module resolution failure on internal @baohaus/ packages), all claims of "enterprise-ready", "no hard-ban violations", "bao_first complete" are unverified and potentially false. Top priority per hardest-first algorithm. Blocks every downstream (including any docs work).
- Corrective todo: fix-bao-internal-workspace-wiring
- Required evidence: 
  1. root package.json workspaces includes (via DRY "bao-source/*" glob) all 39 bao-source packages.
  2. After `bun install`, `bun run --cwd goose-word bao:validate:gates all` (or direct bao validator with config) exits 0, reports 0 violations.
  3. Hardban rg scans (try/catch, as any/unknown, console, process.env, localStorage, biome-ignore) clean on bao/, goose-word/src, bao-source/goose-word-ui-bao/public/client.
  4. All @baohaus/bao-schemas etc resolve from within bao/ context.
  5. nes-bao-first-state updated with validate_strict: "pass", hardban: 0, audits incremented.
- Status: ACTIVE (this cycle)
- Related: also surfaces in un-reviewed worktree (5 untracked added during "CERTIFY"), outdated state audits.

## 2026-05-26 — legacy non-`.bao` naming in unreleased content (README)

- Avoided/overstated: State claimed "legacy_non_bao_open": 0. Grep found "DocDuckGoose" (and old github.com/d4551/docduckgoose link) ONLY in README.md (4 occurrences). Not in any source. Prior cycles never grepped docs for legacy product name.
- Why it matters: Contract: "Do not preserve unreleased legacy non-`.bao` names, variants, docs... Refactor them now before release." "No legacy non-`.bao` naming in unreleased code." README is the primary public representation. Violates .bao first, DRY, and the "delete unreleased legacy" rule repeated in subpackage AGENTS/CLAUDE.md.
- Corrective todo: Will be handled as part of the out-of-scope README update (ID 2026-05-26-001) ONLY after gates fixed + current active cert complete. Do not touch docs first.
- Required evidence: After update, grep -r "DocDuckGoose|docduckgoose" returns only in git history or explicit deprecation notes; README uses accurate .bao/goose-word/Baohaus branding; state legacy count updated.
- Status: RECORDED (tied to docs out-of-scope)

## 2026-05-26 — worktree safety / modified+untracked files not reviewed before claiming cert

- Avoided: Git status at session start showed ~20 modified (including client js, manifest, css, bao validators, goose-word routes/html/install/main/services/tests, nes state) + 5 untracked (viewport-device.js + test, bao-validate-gates.ts, constants.ts, validator.config.ts). State audits only claimed 12+1 reviewed. No per-file classification (canonical/test/generated/scratch) done in this turn start.
- Why: Contract "Worktree Safety": "Before commit or broad refactor: 1. Run git status -uall. 2. Review every modified. 3. Review every untracked... Do not commit until all reviewed... Classify..."
- Corrective: Full review of the 5 untracked + diff of modified as part of viewport cert completion (after gates infra fixed). Delete any scratch (none appear to be).
- Evidence: git status clean or only intended; each untracked read + classified in log; no secrets; state audits bumped.
- Status: ACTIVE (part of current cert)

## 2026-05-26 — user README/ASCII request treated as docs (correctly deferred)

- Avoided: Did not action the user query immediately. Instead recorded in out_of_scope_findings.txt and prioritized the gate wiring blocker.
- Why: Follows "Never choose easy cleanup while a harder... remains." "Documentation after... verified." "No marketing fluff." Honesty lock requires recording.
- Corrective: See out_of_scope 001. Will action only after ladder allows (post-gates + cert + legacy audit).
- Evidence: out_of_scope_findings.txt entry + this ledger + no README edits in this cycle.
- Status: CORRECT (no avoidance, proper adherence)

---

Next entries added only when new avoidance occurs. Reconcile on every cycle end. Update state.honesty_delta_count and todos.
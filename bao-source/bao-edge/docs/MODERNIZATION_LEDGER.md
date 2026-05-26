# Modernization Ledger

> 🌏 本页为中英双语。中文内容紧随对应英文段落。
> This page is bilingual. Chinese follows each English section.

Running record of package upgrades, removed legacy patterns, and intentional holds. Used to prevent regression into mixed conventions.

<details>
<summary>中文</summary>

现代化任务台账，记录包升级、已移除的遗留模式和有意保留的暂缓项。用于防止回退到混合惯例。

- 防止"未归档技术债"累积
- 把重构与验收拆分为可交付片段
- 每项变更保持对应的回归任务与验收条件

</details>

---

## Package Upgrades

| Date | Package | From | To | Location |
|------|---------|------|-----|----------|
| 2025-03-09 | (initial audit) | — | — | Version matrix established |

---

## Removed Legacy Patterns

| Date | Pattern | Location | Notes |
|------|---------|----------|-------|
| 2025-03-09 | `hx-disabled-elt` including input/select/textarea | pages.ts, cards/index.ts, model-management.plugin.ts, model-build-renderers.ts | Broke form serialization; now `button` only |
| 2025-03-09 | Raw English strings in parseAiWorkflowRequestBody | ai-workflows/orchestrator.ts | Replaced with i18n keys; resolveCapabilityErrorReason at render |
| 2025-03-09 | Models section radio-input tabs | pages.ts | Replaced with server-driven URL/state pattern (pane=pull\|search\|history\|sources\|readiness) |
| 2025-03-09 | Auth shell hardcoded DEFAULT_LOCALE | middleware/auth.ts | Derive locale from Accept-Language; use t(key, locale) for all auth strings |
| 2025-03-09 | Raw error.message in OperatorShellViewModel | OperatorShellViewModel.kt | Always use strings.conversationLoadFailed() |
| 2025-03-09 | English substring heuristics in OperatorSettingsScreen | OperatorSettingsScreen.kt | Replaced with explicit providerActive, sourceActive, modelActive flags |
| 2025-03-09 | error.localizedDescription in FlowRunnerView | FlowRunnerView.swift | Use L10n.t("flow_runner_request_failed") for automation parse failures |
| 2026-03-11 | Plain-text HTMX polling and empty states in operator shell renderers | command-bao/src/operator-shell-renderers.ts | Replaced with DaisyUI alert states, busy/live-region semantics, and localized platform labels |
| 2026-03-11 | Untranslated verification summaries and scenario labels in device readiness | command-bao/src/device-readiness-renderers.ts, command-bao/src/operator-verification-artifacts.ts | Localized platform/scenario labels plus connected, pending, and missing verification summaries |
| 2026-03-11 | Narrow locale parity coverage for operator-facing control-plane strings | command-bao/test/operator-i18n-parity.test.ts | Expanded parity gate to operator shell, flow engine, model pull, and AI workflow namespaces |
| 2026-03-11 | Hardcoded flow target selection diagnostics | command-bao/src/flow-target-selection.ts, command-bao/test/flow-target-selection.test.ts | Moved Android/iOS selection errors to locale-backed helpers and added active-locale regression coverage |
| 2026-03-11 | English-only flow run lifecycle events and failure envelopes | command-bao/src/flow-runs.ts | Centralized queued/cancelled/replay/failure messages in i18n-backed helpers without changing job semantics |
| 2026-03-11 | English-only flow adapter requirement, readiness, and command-result messages | command-bao/src/flow-engine.ts, command-bao/test/i18n-locales.test.ts | Refactored target capability, adapter failure, selector, and artifact messages to locale-backed helpers and extended static i18n-key detection to wrapper helpers |
| 2026-03-11 | English-only flow automation validator diagnostics and loose typed-command field acceptance | command-bao/src/flow-automation.ts, command-bao/test/flow-capabilities.test.ts | Localized automation parse/shape mismatch copy and tightened typed object commands to reject legacy extra fields instead of accepting broad shared field sets |
| 2026-03-11 | English-only AI workflow envelopes, fallback diagnostics, and agent summaries | command-bao/src/ai-workflows/orchestrator.ts, command-bao/test/flow-generation.test.ts, command-bao/test/i18n-locales.test.ts | Localized queued/started/cancelled/not-found/capability-empty job messages plus speech, fallback, and agent tool-log summaries without changing workflow semantics |
| 2026-03-11 | English-only AI image fallback diagnostics | command-bao/src/ai-workflows/image-workflows.ts | Localized local-image failure details plus remote image fallback auth/error messages |
| 2026-03-11 | Raw English app-build lifecycle log events and not-found resume envelope | command-bao/src/app-builds.ts | Moved app-build start/failure event copy onto i18n keys and removed the last raw not-found reason string from the resume path |
| 2026-03-11 | English-only AI provider, live research, Apple pricing, and artifact helper envelopes | command-bao/src/ai-providers.ts, command-bao/src/ai-workflows/live-research.ts, command-bao/src/ai-workflows/apple-mac-pricing.ts, command-bao/src/ai-workflows/artifact-store.ts | Localized remaining provider/STT/TTS/image-generation, grounded-research, Apple pricing metadata, and artifact base64 validation errors with focused regression tests |
| 2026-03-11 | Raw English model-job mismatch and build artifact integrity reasons | command-bao/src/model-jobs.ts, command-bao/src/artifact-metadata.ts, command-bao/test/http-model-build-routes.test.ts, command-bao/test/artifact-metadata.test.ts | Localized remaining model-pull/app-build mismatch envelopes plus artifact metadata verification failures so build and operator paths stay i18n-backed end to end |
| 2026-03-11 | Raw English Hugging Face search and provider credential integrity messages | command-bao/src/hf-search.ts, command-bao/src/provider-credential-integrity.ts, command-bao/test/hf-search.test.ts, command-bao/test/provider-credential-integrity.test.ts | Localized external-search and credential-audit failure messages, added focused regression coverage, and kept structured logging intact |
| 2026-03-11 | Hardcoded model-manager envelope reasons for disk pressure, inventory deletion, and missing ramalama | command-bao/src/model-manager.ts | Replaced remaining model-pull setup/delete failure literals with locale-backed reasons while preserving existing lifecycle behavior |
| 2026-03-11 | Mixed locale-key and raw-English model-pull job-log messages | command-bao/src/model-manager.ts, command-bao/src/job-log-stream.ts, command-bao/src/app-builds.ts, command-bao/test/model-pull-lifecycle.test.ts, command-bao/test/job-log-stream.test.ts | Localized stale-restart and lifecycle job-log copy, resolved resume events before persistence, and translated any remaining persisted locale keys at log render time |
| 2026-03-11 | Raw English encryption-service failures | command-bao/src/services/encryption.ts | Localized low-level secure-storage key/payload/decryption failures so credential storage and audit paths no longer depend on embedded English literals |
| 2026-03-11 | Hardcoded AI response constants and starter flow template labels in shared config | command-bao/src/config.ts, command-bao/src/flow-templates.ts, command-bao/test/flow-templates.test.ts, command-bao/test/i18n-locales.test.ts | Replaced remaining shared-config English chat/image/template copy with locale keys, added a localized flow-template accessor, and covered the dynamic key set in i18n parity tests |
| 2026-03-11 | Silent disk-space probe success and lossy Hugging Face metadata lookup in model manager | command-bao/src/model-manager.ts, command-bao/test/model-inventory.test.ts | Disk-space preflight now fails deterministically when probing storage is unavailable, and Hugging Face metadata lookup returns typed localized failures that are logged as non-fatal during model registration |
| 2026-03-11 | Raw framework validation text and swallowed preference/UCP persistence failures | command-bao/src/middleware/error-handler.ts, command-bao/src/plugins/preferences.plugin.ts, command-bao/src/plugins/ucp-discovery.plugin.ts, command-bao/test/error-handler.test.ts, command-bao/test/preferences.plugin.test.ts | Validation envelopes now sanitize raw Elysia messages into deterministic localized UI copy, preference shortcut routes surface retryable DaisyUI error states on persistence failure, and UCP persistence/delete fallbacks use stable localized envelopes |
| 2026-03-11 | Unlocalized AI tool executor result strings and wrapper-helper i18n coverage gaps | command-bao/src/ai-workflows/tool-executor.ts, command-bao/test/ai-tool-use.test.ts, command-bao/test/i18n-locales.test.ts | Localized unknown/execution/artifact/unsupported tool-result copy and expanded static key detection to wrapper helpers so future helper-based translations cannot drift silently |
| 2026-03-11 | Provider profile mutation routes relied on thrown persistence failures and locale files carried duplicate keys | command-bao/src/plugins/ai-provider-management.plugin.ts, command-bao/test/ai-provider-management.plugin.test.ts, command-bao/test/i18n-locales.test.ts | Added injectable provider-credential mutation boundaries with deterministic retryable envelopes for save/delete/activate failures, removed duplicate provider locale keys, and added a duplicate-key parity guard for locale JSON dictionaries |
| 2026-03-11 | Hardcoded dashboard SSR title and raw lifecycle fallback copy in startup/housekeeping/shutdown paths | command-bao/src/pages.ts, command-bao/src/index.ts, command-bao/src/housekeeping.ts, command-bao/src/app.ts, command-bao/test/dashboard-routes.test.ts, command-bao/test/layout-shell.test.ts | Switched the dashboard document title to the existing localized `dashboard.title` key and replaced the remaining startup, housekeeping, and database-shutdown fallback literals with locale-backed messages while preserving structured operational logs |
| 2026-03-11 | Version governance and AI workflow docs drifted from the audited runtime state | tooling/flow-dumpling/src/audit-code-checks.ts, tooling/flow-dumpling/test/audit.test.ts, docs/VERSION_MATRIX.md, docs/FLOW_REFERENCE.md, docs/CAPABILITY_AUDIT.md, docs/README.md, README.md | Added audit coverage for stale version-matrix rows and retired route references, refreshed the audited web/tooling version matrix, and removed `/api/ai/workflows/form-fields` from first-party workflow documentation in favor of the current SSR dashboard shell plus canonical workflow endpoints |

<details>
<summary>中文</summary>

**已移除的遗留模式：**
- `hx-disabled-elt` 包含 input/select/textarea：破坏了表单序列化，现在只禁用 `button`
- `parseAiWorkflowRequestBody` 中的英文硬编码字符串：替换为 i18n key
- Models 区域的 radio-input tabs：替换为服务端驱动的 URL/state 模式
- Auth shell 硬编码 DEFAULT_LOCALE：改为从 Accept-Language 推导
- `OperatorShellViewModel` 中的 `error.message`：统一用 `strings.conversationLoadFailed()`
- `OperatorSettingsScreen` 中的英文子串匹配：替换为显式的 providerActive/sourceActive/modelActive 标志
- `FlowRunnerView` 中的 `error.localizedDescription`：改用 `L10n.t("flow_runner_request_failed")`

</details>

---

## Intentional Holds

| Package | Version | Reason |
|---------|---------|--------|
| `litertlm` | 0.9.0-alpha06 | Alpha; no stable alternative for device AI |
| `commonmark` | 1.0.0-alpha02 | Alpha; Compose richtext markdown |
| `richtext` | 1.0.0-alpha02 | Alpha; Compose richtext UI |
| `splashscreen` | 1.2.0-beta01 | Beta; Android splash API |
| `agp` | 8.8.2 | Hold until Gradle 8.13+ verified |
| `kotlin` | 2.1.0 | Hold until Compose compiler compatibility verified |

<details>
<summary>中文</summary>

**有意保留的暂缓项：**
- `litertlm`（alpha）——设备端 AI 没有稳定替代品
- `commonmark`、`richtext`（alpha）——Compose richtext 渲染
- `splashscreen`（beta）——Android splash API
- `agp` 8.8.2——需先验证 Gradle 8.13+
- `kotlin` 2.1.0——需先验证 Compose 编译器兼容性

</details>

---

## Verification (2025-03-09)

- Typecheck: pass (control-plane, tooling)
- Lint: pass
- Control-plane tests: 422 pass
- Version freshness audit: pass
- Android assembleDebug: pass

<details>
<summary>中文</summary>

**验证结果（2025-03-09）：**
- 类型检查：通过（control-plane、tooling）
- Lint：通过
- 控制平面测试：422 项通过
- 版本新鲜度审计：通过
- Android assembleDebug：通过

</details>

## Convention Decisions

| Decision | Date | Scope |
|----------|------|-------|
| Single validation boundary per route | 2025-03-09 | control-plane |
| Server-driven SSR + thin HTMX | 2025-03-09 | control-plane |
| DaisyUI for all UI components | TBD | control-plane |
| Localized strings only; no hardcoded user-facing text | 2025-03-09 | Android (OperatorShellViewModel, OperatorRuntimePicker, OperatorSettingsScreen) |
| Server-driven tab state for models and settings | 2025-03-09 | control-plane (pages.ts, dashboard.plugin.ts) |
| Auth locale from Accept-Language | 2025-03-09 | control-plane (middleware/auth.ts) |
| libs.versions.toml as Android catalog | 2025-03-09 | Android |

<details>
<summary>中文</summary>

**惯例决策：**
- 每个路由单一校验边界（control-plane）
- 服务端驱动 SSR + 轻量 HTMX（control-plane）
- 所有 UI 组件使用 DaisyUI（control-plane，TBD）
- 仅使用本地化字符串，不硬编码用户可见文本（Android）
- 模型和设置使用服务端驱动的 tab 状态（control-plane）
- Auth locale 从 Accept-Language 推导（control-plane）
- `libs.versions.toml` 作为 Android 统一 catalog

</details>

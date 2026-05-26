# Bao Edge – Version and Dependency Ownership Matrix

> 🌏 本页为中英双语。中文内容紧随对应英文段落。
> This page is bilingual. Chinese follows each English section.

This document is the single source of truth for dependency ownership and hold rationale across the repo. Exact web/tooling freshness is enforced by `bun run audit:version-freshness`, and this matrix records the audited state plus native-platform holds that still require manual review.

Last refreshed (web/tooling audit): 2026-04-05

<details>
<summary>中文</summary>

本文档是仓库中依赖归属和暂缓理由的唯一事实源。Web/tooling 的精确版本新鲜度由 `bun run audit:version-freshness` 强制校验，此处记录已审计状态以及仍需人工复核的原生平台暂缓项。

- 对照目标平台与工具版本验证兼容性
- 任何升级必须更新 owner 与回归条件
- 与发布节奏联动，避免单点依赖失配

</details>

---

## Web / Control-Plane (Bun)

| Package | Current | Latest Stable | Action | Notes |
|---------|---------|---------------|--------|-------|
| `bun` | 1.3.13 | 1.3.13 | **Current** | packageManager in root |
| `elysia` | 1.4.27 | 1.4.27 | **Current** | |
| `@elysiajs/html` | 1.4.0 | 1.4.0 | **Current** | |
| `@elysiajs/static` | 1.4.7 | 1.4.7 | **Current** | |
| `@prisma/client` | ^7.7.0 | ^7.7.0 | **Current** | Must match prisma CLI |
| `@prisma/adapter-libsql` | ^7.7.0 | ^7.7.0 | **Current** | Must match prisma |
| `prisma` | ^7.7.0 | ^7.7.0 | **Current** | devDep |
| `@libsql/client` | 0.17.0 | 0.17.0 | **Current** | Prisma adapter alignment verified by version freshness audit |
| `daisyui` | 5.5.19 | 5.5.19 | **Current** | |
| `tailwindcss` | 4.2.1 | 4.2.1 | **Current** | |
| `@tailwindcss/cli` | 4.2.1 | 4.2.1 | **Current** | Must match tailwindcss |
| `htmx.org` | 2.0.8 | 2.0.8 | **Current** | |
| `htmx-ext-sse` | 2.2.4 | 2.2.4 | **Current** | |
| `typescript` | 5.9.3 | 5.9.3 | **Current** | |
| `typescript-eslint` | 8.57.0 | 8.57.0 | **Current** | |
| `eslint` | 10.0.3 | 10.0.3 | **Current** | |
| `@eslint/js` | 10.0.1 | 10.0.1 | **Current** | |
| `jsonc-parser` | 3.3.1 | 3.3.1 | **Current** | |
| `yaml` | 2.8.2 | 2.8.2 | **Current** | Shared with tooling |
| `@biomejs/biome` | 2.4.10 | 2.4.10 | **Current** | Strict a11y/UI linting |
| `@fontsource/instrument-serif` | 5.2.8 | 5.2.8 | **Current** | Local font (display) |
| `@fontsource/syne` | 5.2.7 | 5.2.7 | **Current** | Local font (body) |
| `@fontsource/ibm-plex-mono` | 5.2.7 | 5.2.7 | **Current** | Local font (code) |
| `@fontsource/playfair-display` | 5.2.8 | 5.2.8 | **Current** | Local font (canonical display) |
| `@fontsource/dm-sans` | 5.2.8 | 5.2.8 | **Current** | Local font (canonical body) |

<details>
<summary>中文</summary>

Web / 控制平面（Bun）依赖均通过版本新鲜度审计验证为当前状态。`yaml` 包与 tooling 共享。新增 `@biomejs/biome` 用于严格无障碍/UI 代码检查。新增 `@fontsource/*` 系列本地字体包取代 Google Fonts CDN。

</details>

---

## Tooling (flow-dumpling)

| Package | Current | Latest Stable | Action | Notes |
|---------|---------|---------------|--------|-------|
| `ajv` | 8.18.0 | 8.18.0 | **Current** | |
| `ajv-formats` | 3.0.1 | 3.0.1 | **Current** | |
| `yaml` | 2.8.2 | 2.8.2 | **Current** | Consolidate: same as control-plane |
| `typescript` | 5.9.3 | 5.9.3 | **Current** | Align with control-plane |
| `typescript-eslint` | 8.57.0 | 8.57.0 | **Current** | |
| `eslint` | 10.0.3 | 10.0.3 | **Current** | |
| `@eslint/js` | 10.0.1 | 10.0.1 | **Current** | |
| `@types/bun` | 1.3.13 | 1.3.13 | **Current** | |

<details>
<summary>中文</summary>

Tooling（flow-dumpling）依赖均为当前版本。`yaml`、`typescript`、`eslint` 系列与控制平面保持一致，并由版本新鲜度审计覆盖。

</details>

---

## Android (libs.versions.toml)

| Alias | Current | Latest Stable | Action | Notes |
|-------|---------|---------------|--------|-------|
| `agp` | 8.8.2 | 8.12.0 | **Hold** | AGP 8.12 requires Gradle 8.13; verify build first |
| `kotlin` | 2.1.0 | 2.3.10 | **Hold** | Kotlin 2.2+ has Compose compiler changes; test before upgrade |
| `coreKtx` | 1.15.0 | 1.15.x | **Current** | |
| `lifecycleRuntimeKtx` | 2.8.7 | 2.8.x | **Current** | |
| `activityCompose` | 1.10.1 | 1.10.x | **Current** | |
| `composeBom` | 2026.02.00 | 2026.02.x | **Current** | |
| `navigation` | 2.8.9 | 2.8.x | **Current** | |
| `hilt` | 2.57.2 | 2.57.x | **Current** | |
| `litertlm` | 0.9.0-alpha06 | alpha | **Hold** | Alpha; no stable alternative for device AI |
| `commonmark` | 1.0.0-alpha02 | alpha | **Hold** | Alpha; used for markdown rendering |
| `richtext` | 1.0.0-alpha02 | alpha | **Hold** | Alpha; Compose richtext |
| `splashscreen` | 1.2.0-beta01 | beta | **Hold** | Beta; standard splash API |
| `cameraX` | 1.4.2 | 1.4.x | **Current** | |
| `workRuntime` | 2.10.0 | 2.10.x | **Current** | |
| `dataStore` | 1.1.7 | 1.1.x | **Current** | |
| `firebaseBom` | 33.16.0 | 33.x | **Current** | |

<details>
<summary>中文</summary>

Android 依赖：
- `agp` 和 `kotlin` 暂缓升级——AGP 8.12 需要 Gradle 8.13，Kotlin 2.2+ 有 Compose 编译器变更，需先验证
- `litertlm`、`commonmark`、`richtext`、`splashscreen` 为 alpha/beta，暂缓
- 其余依赖均为当前最新版

</details>

---

## bao-edge-core (KMP)

| Package | Current | Latest | Action | Notes |
|---------|---------|--------|--------|-------|
| `kotlinx-coroutines-core` | 1.9.0 | 1.9.x | **Current** | |
| `kotlinx-serialization-json` | 1.7.3 | 1.7.x | **Current** | Align with libs.versions.toml |

---

## bao-edge-android-rpa

| Package | Current | Latest | Action | Notes |
|---------|---------|--------|--------|-------|
| `kotlinx-coroutines-android` | 1.9.0 | 1.9.x | **Current** | |
| `uiautomator` | 2.3.0 | 2.3.x | **Current** | |
| `androidx.test:core` | 1.6.1 | 1.6.x | **Current** | |

---

## iOS (Swift Package Manager)

| Target | Swift | Platforms | Action | Notes |
|--------|-------|-----------|--------|-------|
| BaoEdge | 6.0 | iOS 17, macOS 14 | **Current** | No external deps; pure Swift |

<details>
<summary>中文</summary>

bao-edge-core（KMP）、bao-edge-android-rpa 和 iOS 各模块依赖均为当前版本。iOS 为纯 Swift 实现，无外部依赖。

</details>

---

## Duplicate Pins to Consolidate

| Package | Locations | Action |
|---------|-----------|--------|
| `yaml` | control-plane, tooling | Already same version (2.8.2); document as shared |
| `typescript` | control-plane, tooling | Already same (5.9.3); keep aligned |
| `typescript-eslint` | control-plane, tooling | Already same (8.57.0); keep aligned |
| `eslint` | control-plane, tooling | Already same (10.0.3); keep aligned |
| `@eslint/js` | control-plane, tooling | Already same (10.0.1); keep aligned |
| `kotlinx-serialization-json` | libs.versions.toml (1.7.3), bao-edge-core (1.7.3) | Already aligned |

<details>
<summary>中文</summary>

需合并的重复固定版本：`yaml`、`typescript`、`typescript-eslint`、`eslint`、`@eslint/js` 在控制平面和 tooling 间已对齐；`kotlinx-serialization-json` 在 Android catalog 和 bao-edge-core 间已对齐。保持同步即可。

</details>

---

## Version Ownership Policy

1. **Root `package.json`**: packageManager only; no direct deps.
2. **control-plane**: Owns web runtime deps (Elysia, Prisma, DaisyUI, HTMX, Tailwind).
3. **tooling/flow-dumpling**: Owns CLI/tooling deps; shares TypeScript/ESLint versions with control-plane for consistency.
4. **Android**: `libs.versions.toml` is the single catalog; all modules reference it.
5. **bao-edge-core**: Inline versions for KMP; keep kotlinx libs aligned with Android catalog where applicable.
6. **bao-edge-android-rpa**: Uses libs where possible; inline only for test/uiautomator deps not in catalog.

<details>
<summary>中文</summary>

**版本归属策略：**
1. 根 `package.json` 仅声明 packageManager，不直接声明依赖
2. control-plane 拥有 Web 运行时依赖（Elysia、Prisma、DaisyUI、HTMX、Tailwind）
3. tooling/flow-dumpling 拥有 CLI 工具依赖，与控制平面共享 TypeScript/ESLint 版本
4. Android 以 `libs.versions.toml` 为唯一 catalog，所有模块引用它
5. bao-edge-core 内联 KMP 版本，kotlinx 库与 Android catalog 保持对齐
6. bao-edge-android-rpa 尽量用 libs catalog，仅对 catalog 中没有的 test/uiautomator 依赖使用内联版本

</details>

---

## Upgrade Sequence (When Executing)

1. **Phase 1**: Web/tooling – no pending npm/CDN/Bun upgrades after the 2026-03-11 freshness audit; rerun `bun run audit:version-freshness` before changing pins.
2. **Phase 2**: Android – consider AGP/Kotlin hold lifts in separate PRs with full regression.
3. **Phase 3**: Alpha/beta holds – re-evaluate litertlm, commonmark, richtext, splashscreen quarterly.

<details>
<summary>中文</summary>

**升级执行顺序：**
1. **Phase 1**：Web/tooling——2026-03-11 的版本新鲜度审计后暂无待升级 npm/CDN/Bun 依赖；变更固定版本前先重跑 `bun run audit:version-freshness`
2. **Phase 2**：Android——在独立 PR 中考虑解除 AGP/Kotlin 暂缓项，并做完整回归测试
3. **Phase 3**：Alpha/beta 暂缓项——每季度重新评估 litertlm、commonmark、richtext、splashscreen

</details>

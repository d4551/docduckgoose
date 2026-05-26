# Google AI Edge Gallery (Android)

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Android](https://img.shields.io/badge/platform-Android-3ddc84?logo=android&logoColor=white)](https://developer.android.com/)
[![Bao Edge](https://img.shields.io/badge/edge-native%20host-0f766e)](../README.md)

## Explain Like I'm Five

Imagine the same careful goose carrying a bao crate onto an Android phone. This crate keeps local sessions, model calls, and device logs lined up with the Bao Edge control plane so the phone reports exactly what happened.

> 🌏 本页为中英双语。中文内容紧随对应英文段落。
> This page is bilingual. Chinese follows each English section.

The Android client is the native execution side of Bao Edge: it hosts session lifecycles, adapter callbacks, and model/tool call logging on local devices. This document ensures that behavior from UI through workflow entry, session management, and event persistence stays aligned with the control-plane.

<details>
<summary>中文</summary>

Android 客户端是 Bao Edge 的原生执行侧：在本地设备上托管会话生命周期、适配器回传与模型/工具调用日志。本文档用于确保从 UI 到工作流入口、再到会话管理与事件持久化的行为与控制平面保持一致。

</details>

<details>
<summary>中文</summary>

- **Picture:** Android 是 Bao Edge 的设备侧助手。
- **Pieces:** 它处理原生会话、适配器回调、模型/工具日志、工作流启动和状态回传。
- **Place:** 它遵循控制平面下发的规范，并回填证据。
- **Proof:** 本地日志、jobs/events 记录和服务端审计条目应保持一致。
- **Principle:** Android、iOS、CLI 和控制平面行为必须保持对齐。

</details>

## Goals and responsibilities

- Unify workflow launch, model switching, and runtime state visualization on the Android side.
- Align with the control-plane event contract, including job status, error codes, and audit metadata.
- Maintain behavioral parity with iOS and CLI to prevent platform-specific divergence.

<details>
<summary>中文</summary>

- 在 Android 端统一工作流启动、模型切换与运行时状态可视化。
- 与控制平面的事件合约对齐，包括任务状态、错误码和审计元数据。
- 与 iOS 和 CLI 保持行为一致，防止端侧行为分歧。

</details>

## Data and control flow

```mermaid
flowchart LR
  Control["Bao Edge control plane"] --> Spec["Workflow spec + policy"]
  Spec --> Android["Android native host"]
  Android --> Adapter["Local adapters and model tools"]
  Android --> Events["jobs/events evidence"]
  Events --> Control
```

- **Trigger**: Workflows are initiated via HTMX/browser-side events or native entry points.
- **Control**: The control-plane returns executable specs and policies.
- **Execution**: The Android-side scheduler, state machine, and local adapters run according to the spec and report status back.

<details>
<summary>中文</summary>

- **触发**：通过 HTMX/浏览器端事件或原生入口触发工作流。
- **控制**：控制平面返回可执行规范与策略。
- **执行**：Android 侧调度器、状态机与本地适配器按规范运行，并回填状态。

</details>

## Verification

- Confirm that key fields are reported back to jobs/events tables.
- Compare local logs against server-side audit entries to verify end-to-end traceability.

<details>
<summary>中文</summary>

- 确认关键字段已回传到 jobs/events 表。
- 对比本地日志与服务端审计条目，验证端到端的可追溯性。

</details>

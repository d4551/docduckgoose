# Capability Audit

> This page is bilingual. Chinese follows each English section.
> 本页为中英双语。中文内容紧随对应英文段落。

Last updated: 2026-03-09

This table is the canonical implemented-capability inventory for Bao Edge. It maps each externally visible route or required runtime capability to its contract owner, runtime owner, and verification coverage.

| name | source_of_claim | status | owner | gap_type | contract_ref | test_ref | runtime_ref |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/api/health` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/health.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/plugins/health.plugin.ts` |
| `/api/flows/validate` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/flows/validate/automation` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/flows/capabilities` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-engine.ts` |
| `/api/flows/run` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-engine.ts` |
| `/api/flows/trigger` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/flows/runs` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/flows/runs/:runId` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/flows/runs/:runId/cancel` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/flows/runs/:runId/pause` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/flows/runs/:runId/resume` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/flows/runs/:runId/replay-step` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/flows/runs/:runId/logs` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/flow-routes.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/flow-runs.ts` |
| `/api/models/pull` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/model-management.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/model-manager.ts` |
| `/api/models/pull/:jobId` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/model-management.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/model-jobs.ts` |
| `/api/models/sources` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/model-management.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/config.ts` |
| `/api/apps/build` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/app-build.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/app-builds.ts` |
| `/api/apps/build/:jobId` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/app-build.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/app-builds.ts` |
| `/api/device-ai/readiness` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/device-readiness.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/device-ai-readiness.ts` |
| `/api/ai/workflows/run` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/ai-workflows.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/ai-workflows/orchestrator.ts` |
| `/api/ai/workflows/jobs/:jobId` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/ai-workflows.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/ai-workflows/orchestrator.ts` |
| `/api/ai/workflows/jobs/:jobId/logs` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/ai-workflows.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/ai-workflows/orchestrator.ts` |
| `/api/ai/workflows/capabilities` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/ai-workflows.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/ai-workflows/capabilities.ts` |
| `/api/ai/workflows/model-assignment` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/ai-workflows.plugin.ts` | none | `command-bao/src/contracts/http.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/plugins/ai-workflows.plugin.ts` |
| `/api/ai/workflows/model-assignment/:mode` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/ai-workflows.plugin.ts` | none | `command-bao/src/contracts/http.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/plugins/ai-workflows.plugin.ts` |
| `/api/ai/providers/validate` | `docs/FLOW_REFERENCE.md#api-routes` | implemented | `command-bao/src/plugins/ai-provider-management.plugin.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/http-model-build-routes.test.ts` | `command-bao/src/provider-validation.ts` |
| `Ramalama model pull capability` | `docs/FLOW_REFERENCE.md#device-ai-model-acquisition` | implemented | `command-bao/src/model-manager.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/model-build-jobs.test.ts` | `command-bao/src/model-manager.ts` |
| `iOS build unsupported on non-mac hosts` | `docs/FLOW_REFERENCE.md#request-flow` | implemented | `command-bao/src/app-builds.ts` | none | `contracts/flow-contracts.ts` | `command-bao/test/model-build-jobs.test.ts` | `command-bao/src/app-builds.ts` |
| `Device AI protocol report schema validation` | `contracts/device-ai-protocol.ts` | implemented | `tooling/flow-dumpling/src/audit-device-readiness.ts` | none | `contracts/device-ai-protocol.ts` | `tooling/flow-dumpling/test/flow-cli.test.ts` | `tooling/flow-dumpling/src/device-ai-protocol-report.ts` |
| `Android device AI protocol pass` | `contracts/device-ai-protocol.ts` | implemented | `Android/src/app/src/main/java/com/google/ai/edge/gallery/data/DeviceAiProtocolRunner.kt` | none | `contracts/device-ai-protocol.ts` | `Android/src/app/src/test/java/com/google/ai/edge/gallery/data/DeviceAiProtocolRunnerTest.kt` | `.artifacts/device-ai/latest.json` |
| `iOS device AI protocol pass` | `contracts/device-ai-protocol.ts` | implemented | `iOS/BaoEdge/Sources/BaoEdgeDriver/DeviceAiProtocolRunner.swift` | none | `contracts/device-ai-protocol.ts` | `iOS/BaoEdge/Tests/BaoEdgeDriverTests/DeviceAiProtocolRunnerTests.swift` | `.artifacts/device-ai/latest.json` |

<details>
<summary>中文</summary>

上方表格是 Bao Edge 的规范已实现能力清单。表格结构说明：

- **name** — 能力名称，通常为 API 路由路径或运行时能力描述。
- **source_of_claim** — 声明该能力的文档来源（如 `FLOW_REFERENCE.md` 或 `contracts/device-ai-protocol.ts`）。
- **status** — 实现状态（`implemented` 表示已实现）。
- **owner** — 主要所有者文件路径，即负责该能力实现的源码位置。
- **gap_type** — 缺口类型（`none` 表示无缺口）。
- **contract_ref** — 契约引用，指向定义该能力线上协议的契约文件（如 `flow-contracts.ts` 或 `device-ai-protocol.ts`）。
- **test_ref** — 测试引用，指向验证该能力的测试文件。
- **runtime_ref** — 运行时引用，指向实际运行时执行该能力的源码位置或产物。

表格涵盖三大类能力：
1. **控制平面 API 路由**（26 条）— 从 `/api/health` 到 `/api/ai/providers/validate`，全部由前缀 Elysia 插件所有。
2. **运行时能力**（2 条）— Ramalama 模型拉取和非 macOS 主机的 iOS 构建不支持策略。
3. **设备 AI 协议**（3 条）— 协议报告 schema 验证、Android 协议通过、iOS 协议通过，分别由 flow-kit audit、Android 原生运行器和 iOS 原生运行器所有。

</details>

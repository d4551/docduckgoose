# Repository Setup (GitHub)

> 🌏 本页为中英双语。中文内容紧随对应英文段落。
> This page is bilingual. Chinese follows each English section.

Use these values when configuring the repository on GitHub.

## About Section

**Description** (5–15 words, start with main keyword):

```
Contract-first AI platform for workflow orchestration, model lifecycle, and Android/iOS/Desktop app generation
```

<details>
<summary>中文</summary>

**描述**（5–15 词，以主关键词开头）：

```
Contract-first AI platform for workflow orchestration, model lifecycle, and Android/iOS/Desktop app generation
```

本文件定义仓库的首次落地流程：从环境准备、依赖安装、数据库与运行校验到验证脚本顺序。目标是保证每个工程师在不同环境可重现同一可执行系统。

- 安装 Bun、Git、数据库和原生工具链。
- 按照文档顺序完成控制平面、客户端与验收脚本。
- 以可验证命令替代经验判断，确保每次初始化结果一致。
- 所有关键脚本必须通过并记录输出。
- 关键失败要落到 issue 或 audit 路径，避免"运行通过但行为不确定"。

</details>

## Topics (Tags)

Add up to 20 relevant topics for discoverability. Suggested:

- `ai`
- `workflow`
- `android`
- `ios`
- `bun`
- `typescript`
- `kotlin`
- `swift`
- `elysia`
- `htmx`
- `daisyui`
- `rpa`
- `automation`
- `model-management`
- `cross-platform`

<details>
<summary>中文</summary>

最多添加 20 个 topic 标签以提高可发现性。建议的标签已在上方列出，涵盖 AI、工作流、跨平台（Android/iOS）、技术栈（Bun/TypeScript/Kotlin/Swift）和 UI 框架（HTMX/DaisyUI）等维度。

</details>

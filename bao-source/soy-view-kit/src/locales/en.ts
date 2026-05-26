import type { TranslationMap } from "../i18n-types.js";

export const enDictionary: TranslationMap = {
  app: {
    name: "Baohaus",
    tagline: "Audio transcription, workflows, and package-first AI tooling.",
  },
  builder: {
    actions: {
      execute: "Execute",
      validate: "Validate",
    },
    app: {
      tagline: "HTMX-first workflow building, media ops, templates, and execution history.",
      title: "Bonkbun Workflow Builder",
    },
    catalog: {
      title: "Node catalog",
    },
    editor: {
      contextJson: "Execution context JSON",
      exampleName: "Demo workflow",
      title: "Workflow editor",
      workflowJson: "Workflow JSON",
    },
    execution: {
      executionId: "Execution ID",
      resultTitle: "Execution result",
      status: "Status",
    },
    executions: {
      actions: "Actions",
      cancel: "Cancel",
      cancelled: "Execution cancelled.",
      denied: "You do not have access to this execution.",
      detailTitle: "Execution detail",
      empty: "No stored workflow executions yet.",
      missing: "Execution not found.",
      started: "Started",
      status: "Status",
      view: "View",
      workflow: "Workflow",
    },
    home: {
      openBuilder: "Open builder",
    },
    media: {
      delete: "Delete",
      denied: "You do not have access to this media asset.",
      empty: "No media assets yet. Upload a WAV file to start.",
      file: "File",
      missing: "Media asset not found.",
      upload: "Upload asset",
      uploadTitle: "Upload media",
    },
    nav: {
      builder: "Builder",
      close: "Close sidebar",
      executions: "Executions",
      media: "Media",
      section: "Workspace",
      templates: "Templates",
      toggle: "Open sidebar",
    },
    pages: {
      builder: {
        description: "Build, validate, and execute workflow JSON with HTMX partials.",
        title: "Builder",
      },
      executions: {
        description: "Inspect persisted workflow runs and their stored results.",
        title: "Executions",
      },
      media: {
        description: "Manage uploaded audio and derived media assets.",
        title: "Media",
      },
      templates: {
        description: "Browse built-in templates and create reusable workflow starting points.",
        title: "Templates",
      },
    },
    templates: {
      empty: "No templates available.",
      missing: "Template not found.",
      title: "Templates",
      use: "Use template",
    },
    theme: {
      toggle: "Toggle theme",
    },
    validation: {
      valid: "Workflow validation passed.",
    },
  },
  auth: {
    email: "Email",
    invalidSubmission: "Invalid form submission.",
    password: "Password",
    signIn: "Sign in",
    signInFailed: "Sign in failed.",
    signInInvalidFormat: "Enter a valid email and password.",
    signInTitle: "Sign in",
    signOut: "Sign out",
  },
  assistant: {
    actions: {
      compact: "Compact",
      createSession: "Create session",
      refreshSession: "Refresh session",
      runTurn: "Run turn",
      viewSession: "View session",
    },
    app: {
      description:
        "Inspect provider health, runtime sessions, tool inventory, slash commands, and MCP servers from the active assistant system packages.",
      title: "Mochi Operator Deck",
    },
    commands: {
      empty: "No slash commands are registered.",
      localOnly: "Local",
      resumeSupported: "Resume",
      title: "Slash commands",
    },
    errors: {
      providerAuthMissing: "The selected provider is not authenticated yet.",
      providerUnavailable: "No authenticated provider is available for assistant turns.",
      requestFailed:
        "The assistant request could not be completed. Retry after checking provider health.",
    },
    health: {
      mcpServers: "MCP servers",
      providers: "Providers",
      queueSchedules: "Schedules",
      queues: "Queues",
      sessions: "Sessions",
      title: "Runtime health",
      tools: "Tools",
    },
    mcp: {
      empty: "No MCP servers are configured.",
      server: "Server",
      signature: "Signature",
      title: "MCP inventory",
      transport: "Transport",
    },
    providers: {
      auth: "Auth",
      authConfigured: "Configured",
      authMissing: "Missing",
      empty: "No providers are available.",
      model: "Model",
      provider: "Provider",
      tasks: "Tasks",
      title: "Providers",
    },
    pages: {
      inventory: {
        description: "Inspect the registered tool manifest and configured MCP servers.",
        title: "Runtime inventory",
      },
      runtime: {
        description: "Monitor provider health, active sessions, and the latest assistant turn.",
        title: "Assistant runtime",
      },
    },
    session: {
      automaticProvider: "Automatic provider selection",
      inputDescription:
        "Turns run through the shared runtime manager and honor the selected provider preference when available.",
      empty: "Create a session to run turns against the assistant runtime.",
      inputLabel: "Turn input",
      inputPlaceholder: "Ask the runtime to inspect or change the workspace.",
      iterations: "Iterations",
      latestTurn: "Latest turn",
      latestTurnEmpty: "Run a turn to inspect the latest assistant summary.",
      missing: "Assistant session {id} was not found.",
      providerDescription:
        "Pick a provider to pin this turn, or leave automatic selection enabled.",
      providerLabel: "Preferred provider",
      recentMessages: "Recent messages",
      title: "Session detail",
      usage: "Usage",
      usageSummary: "Input tokens: {inputTokens} • Output tokens: {outputTokens}",
    },
    sessions: {
      actions: "Actions",
      empty: "No assistant sessions exist yet.",
      id: "Session",
      messages: "Messages",
      title: "Sessions",
      updated: "Updated",
    },
    tabs: {
      inventory: "Inventory",
      runtime: "Runtime",
    },
    tools: {
      empty: "No tools are registered.",
      name: "Tool",
      permission: "Permission",
      source: "Source",
      title: "Tool manifest",
    },
  },
  common: {
    confirm: "Confirm",
    loading: "Loading",
  },
  modal: {
    cancel: "Cancel",
    close: "Close",
  },
  status: {
    emptyTitle: "Nothing to show yet",
    loading: "Loading",
    refresh: "Refresh",
    retry: "Retry",
  },
  ui: {
    audioHealthTitle: "Audio service",
    cacheLabel: "Cache",
    emptyTranscript: "(empty)",
    errorTitle: "Error",
    languageHint: "Leave blank to let the service infer the spoken language.",
    languageLabel: "Language",
    languagePlaceholder: "optional",
    modelHint: "Leave blank to use the service default ONNX Whisper model.",
    modelInputLabel: "Model id",
    modelLabel: "Model",
    modelPlaceholder: "default: Xenova/whisper-tiny.en",
    runtimeLabel: "Runtime",
    statusLabel: "Status",
    transcriptTitle: "Transcript",
    transcribeAction: "Transcribe",
    transcribeFormAriaLabel: "Transcribe audio file",
    transcribeIntro:
      "WAV input only. The server resamples to 16 kHz mono before ONNX transcription.",
    transcribeTitle: "Transcribe (ONNX Whisper)",
    uploadHint: "Upload a single WAV file for transcription.",
    uploadLabel: "WAV file",
  },
};

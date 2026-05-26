import path from "node:path";
import { getRuntimeEnvironment, type RuntimeEnvironment } from "./env-core.js";

export type ConfigSource = "user" | "project" | "local";

export type HookCommandConfig = {
  readonly matcher?: string;
  readonly command: string;
  readonly timeoutMs?: number;
};

export type HookConfig = {
  readonly preToolUse: readonly HookCommandConfig[];
  readonly postToolUse: readonly HookCommandConfig[];
  readonly notification: readonly HookCommandConfig[];
};

export type OAuthProviderConfig = {
  readonly clientId: string;
  readonly authorizeUrl: string;
  readonly tokenUrl: string;
  readonly redirectBaseUrl?: string;
  readonly scopes: readonly string[];
};

export type PermissionModeConfig = "default" | "accept-edits" | "bypass-permissions" | "plan";

export type SandboxModeConfig = "read-only" | "workspace-write" | "danger-full-access";

export type McpStdioServerConfig = {
  readonly transport: "stdio";
  readonly command: string;
  readonly args: readonly string[];
  readonly env: Readonly<Record<string, string>>;
};

export type McpHttpServerConfig = {
  readonly transport: "http";
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
};

export type McpSseServerConfig = {
  readonly transport: "sse";
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
};

export type McpServerConfig = McpHttpServerConfig | McpSseServerConfig | McpStdioServerConfig;

export type AssistantRuntimeConfig = {
  readonly model: string | null;
  readonly provider: string | null;
  readonly permissionMode: PermissionModeConfig;
  readonly sandboxMode: SandboxModeConfig;
  readonly hooks: HookConfig;
  readonly mcpServers: Readonly<Record<string, McpServerConfig>>;
  readonly oauthProviders: Readonly<Record<string, OAuthProviderConfig>>;
};

export type AssistantConfigLayer = {
  readonly source: ConfigSource;
  readonly config: Partial<AssistantRuntimeConfig>;
};

const defaultHooks: HookConfig = Object.freeze({
  notification: [],
  postToolUse: [],
  preToolUse: [],
});

const defaultRuntimeConfig: AssistantRuntimeConfig = Object.freeze({
  hooks: defaultHooks,
  mcpServers: {},
  model: null,
  oauthProviders: {},
  permissionMode: "default",
  provider: null,
  sandboxMode: "workspace-write",
});

function mergeHooks(base: HookConfig, override: Partial<HookConfig> | undefined): HookConfig {
  if (override === undefined) {
    return base;
  }

  return {
    notification: [...(override.notification ?? base.notification)],
    postToolUse: [...(override.postToolUse ?? base.postToolUse)],
    preToolUse: [...(override.preToolUse ?? base.preToolUse)],
  };
}

export function mergeAssistantRuntimeConfig(
  ...layers: readonly Partial<AssistantRuntimeConfig>[]
): AssistantRuntimeConfig {
  return layers.reduce<AssistantRuntimeConfig>(
    (merged, layer) => ({
      hooks: mergeHooks(merged.hooks, layer.hooks),
      mcpServers: { ...merged.mcpServers, ...(layer.mcpServers ?? {}) },
      model: layer.model ?? merged.model,
      oauthProviders: {
        ...merged.oauthProviders,
        ...(layer.oauthProviders ?? {}),
      },
      permissionMode: layer.permissionMode ?? merged.permissionMode,
      provider: layer.provider ?? merged.provider,
      sandboxMode: layer.sandboxMode ?? merged.sandboxMode,
    }),
    defaultRuntimeConfig,
  );
}

export function mergeAssistantConfigLayers(...layers: readonly AssistantConfigLayer[]): {
  readonly merged: AssistantRuntimeConfig;
  readonly sources: readonly ConfigSource[];
} {
  return {
    merged: mergeAssistantRuntimeConfig(...layers.map((layer) => layer.config)),
    sources: layers.map((layer) => layer.source),
  };
}

export function readAssistantRuntimeEnvironmentConfig(
  env: RuntimeEnvironment = getRuntimeEnvironment(),
): Partial<AssistantRuntimeConfig> {
  const model = env.BAOHAUS_ASSISTANT_MODEL?.trim();
  const provider = env.BAOHAUS_ASSISTANT_PROVIDER?.trim();
  const permissionMode = env.BAOHAUS_ASSISTANT_PERMISSION_MODE?.trim();
  const sandboxMode = env.BAOHAUS_ASSISTANT_SANDBOX_MODE?.trim();

  return {
    ...(model === undefined || model.length === 0 ? {} : { model }),
    ...(provider === undefined || provider.length === 0 ? {} : { provider }),
    ...(permissionMode === "accept-edits" ||
    permissionMode === "bypass-permissions" ||
    permissionMode === "default" ||
    permissionMode === "plan"
      ? { permissionMode }
      : {}),
    ...(sandboxMode === "danger-full-access" ||
    sandboxMode === "read-only" ||
    sandboxMode === "workspace-write"
      ? { sandboxMode }
      : {}),
  };
}

export function getAssistantWorkspaceRoot(
  env: RuntimeEnvironment = getRuntimeEnvironment(),
  cwd: string = process.cwd(),
): string {
  const configured = env.BAOHAUS_ASSISTANT_WORKSPACE_ROOT?.trim();
  return configured === undefined || configured.length === 0 ? cwd : path.resolve(configured);
}

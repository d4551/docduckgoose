/**
 * Shared setup wizard action registry.
 */

import type { SetupWizardRunAction } from "@baohaus/bao-schemas/setup-wizard.schemas";
import {
  type BaoControlPlaneLocalClusterProvider,
  isCanonicalBaoControlPlaneLocalProvider,
  resolveBaoControlPlaneLocalClusterUnsupportedPlatformMessage,
} from "@baohaus/bao-utils/bao-control-plane-local-cluster-provider";
import { ensureSetupEnvironmentFilesExist } from "@baohaus/bao-utils/setup-environment-files";

/**
 * Canonical action keys supported by setup wizard orchestration.
 */
export type SetupWizardActionKey = SetupWizardRunAction;

/**
 * Canonical action labels used by CLI/API logs and diagnostics.
 */
export type SetupWizardCommandLabel = SetupWizardActionKey;

/**
 * Script reference keys inside SetupWizardResolvedConfig.auto.commands.
 */
export type SetupWizardActionScriptRef = "configureRunScript" | "setupAutoRunScript";

/**
 * Action-level precondition contract.
 */
export type SetupWizardActionPrecondition =
  | {
      /** Marker that an env file preflight should run before execution. */
      type: "env-file";
    }
  | {
      /** Marker that execution requires Linux host compatibility checks. */
      type: "linux-only";
    };

/**
 * Shared action metadata for setup-wizard invocation.
 */
export interface SetupWizardActionSpec {
  /** Canonical action key. */
  action: SetupWizardActionKey;
  /** Script reference name from setup config. */
  scriptRef: SetupWizardActionScriptRef;
  /** Default script args supplied by shared registry callers. */
  defaultArgs?: readonly string[];
  /** Runtime mode expected by command path policy. */
  envMode: "local";
  /** Deterministic preconditions for action-specific execution. */
  preconditions: readonly SetupWizardActionPrecondition[];
  /** Optional action-level timeout override. */
  timeoutMs?: number;
  /** Whether env preflight should run before action execution. */
  requiresEnvPreflight: boolean;
}

/**
 * Minimal setup-wizard config shape required by action script resolution.
 */
export interface SetupWizardActionConfig {
  /** Commands section consumed by shared action registry. */
  auto: {
    commands: {
      configureRunScript: string;
      setupAutoRunScript: string;
    };
  };
}

/**
 * Action preflight context used to enforce action-level provider and env checks.
 */
export interface SetupWizardActionPreflightContext {
  /** Repository root for relative file checks. */
  repositoryRoot: string;
  /** Environment file configuration from setup config. */
  envFiles: {
    /** Primary environment file path expected by setup flows. */
    primary: string;
    /** Optional local env file path expected by setup flows. */
    local: string;
    /** Primary env template path expected by setup flows. */
    example: string;
    /** Optional fallback env template path expected by setup flows. */
    exampleFallback: string | null;
  };
  /** Provider context when provider-specific preconditions apply. */
  localClusterProvider?: BaoControlPlaneLocalClusterProvider | null;
}

/**
 * Shared action lookup table for CLI, API, and contract parity checks.
 */
export const setupWizardActionRegistry: Record<SetupWizardActionKey, SetupWizardActionSpec> = {
  configure: {
    action: "configure",
    scriptRef: "configureRunScript",
    envMode: "local",
    preconditions: [],
    requiresEnvPreflight: false,
  },
  "setup:auto": {
    action: "setup:auto",
    scriptRef: "setupAutoRunScript",
    envMode: "local",
    preconditions: [
      {
        type: "env-file",
      },
      {
        type: "linux-only",
      },
    ],
    timeoutMs: 120_000,
    requiresEnvPreflight: true,
  },
};

/**
 * Resolve action metadata for a given setup wizard action.
 *
 * @param action - Action key from setup run request.
 * @returns shared action metadata.
 */
export function getSetupWizardActionSpec(action: SetupWizardActionKey): SetupWizardActionSpec {
  const spec = setupWizardActionRegistry[action];
  if (!spec) {
    throw new Error(`Unsupported setup action: ${action}`);
  }
  return spec;
}

/**
 * Ensure setup-owned env files exist before action execution.
 *
 * @param context - Action execution context.
 */
async function assertEnvFilePrecondition(
  context: SetupWizardActionPreflightContext,
): Promise<void> {
  await ensureSetupEnvironmentFilesExist({
    repositoryRoot: context.repositoryRoot,
    envFiles: context.envFiles,
  });
}

function assertLinuxOnlyPrecondition(context: SetupWizardActionPreflightContext): void {
  if (
    !(
      context.localClusterProvider &&
      isCanonicalBaoControlPlaneLocalProvider(context.localClusterProvider)
    )
  ) {
    return;
  }
  const message = resolveBaoControlPlaneLocalClusterUnsupportedPlatformMessage(
    context.localClusterProvider,
  );
  if (message) {
    throw new Error(message);
  }
}

/**
 * Enforce shared action preconditions before execution.
 *
 * @param actionSpec - Shared action metadata.
 * @param context - Action execution context.
 */
export async function assertSetupWizardActionPreconditions(
  actionSpec: SetupWizardActionSpec,
  context: SetupWizardActionPreflightContext,
): Promise<void> {
  for (const precondition of actionSpec.preconditions) {
    switch (precondition.type) {
      case "env-file": {
        await assertEnvFilePrecondition(context);
        break;
      }
      case "linux-only": {
        assertLinuxOnlyPrecondition(context);
        break;
      }
    }
  }
}

/**
 * Resolve the configured script path for an action.
 *
 * @param setupConfig - Resolved setup wizard config.
 * @param action - Action key.
 * @returns configured script path for Bun execution.
 */
export function resolveSetupWizardActionScript(
  setupConfig: SetupWizardActionConfig,
  action: SetupWizardActionKey,
): string {
  const spec = getSetupWizardActionSpec(action);
  return setupConfig.auto.commands[spec.scriptRef];
}

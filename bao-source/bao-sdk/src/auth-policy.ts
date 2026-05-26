/**
 * Registry-gated auth policy — sessions allowed only when `auth-bao` is loaded in the host registry.
 */

export type AuthPolicySurface = {
  readonly packageId: "auth-bao";
  readonly loaded: boolean;
  readonly packageName: string | undefined;
  readonly composeDependencies: readonly string[];
};

export type AuthPolicyEvaluation = AuthPolicySurface & {
  readonly sessionAllowed: boolean;
  readonly blockedReason: string | undefined;
};

export type AuthRegistryReader = {
  readonly get: (packageId: string) =>
    | {
        readonly loaded?: boolean;
        readonly packageName?: string;
        readonly governance?: {
          readonly runtime?: { readonly composeDependencies?: readonly string[] };
        };
      }
    | undefined;
};

export function readAuthPolicySurface(registry: AuthRegistryReader): AuthPolicySurface {
  const entry = registry.get("auth-bao");
  if (entry?.loaded !== true) {
    return {
      packageId: "auth-bao",
      loaded: false,
      packageName: undefined,
      composeDependencies: [],
    };
  }
  return {
    packageId: "auth-bao",
    loaded: true,
    packageName: entry.packageName,
    composeDependencies: entry.governance?.runtime?.composeDependencies ?? [],
  };
}

export function evaluateAuthPolicy(
  registry: AuthRegistryReader,
  messages: { readonly packageNotLoaded: string },
): AuthPolicyEvaluation {
  const surface = readAuthPolicySurface(registry);
  if (!surface.loaded) {
    return {
      ...surface,
      sessionAllowed: false,
      blockedReason: messages.packageNotLoaded,
    };
  }
  return {
    ...surface,
    sessionAllowed: true,
    blockedReason: undefined,
  };
}

export type AuthPolicyResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: string };

export function sessionCreationPolicyFromAuth(
  registry: AuthRegistryReader,
  messages: { readonly packageNotLoaded: string },
): AuthPolicyResult {
  const evaluation = evaluateAuthPolicy(registry, messages);
  if (!evaluation.sessionAllowed) {
    return { ok: false, reason: evaluation.blockedReason ?? messages.packageNotLoaded };
  }
  return { ok: true };
}

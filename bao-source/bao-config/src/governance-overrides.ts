export type PlatformEnvironment = "development" | "test" | "pre-production" | "production";

export type ConfigPrimitive = boolean | null | number | string;
export type ConfigValue =
  | ConfigPrimitive
  | readonly ConfigValue[]
  | { readonly [key: string]: ConfigValue };

export type EnvironmentOverride = Readonly<{
  environment: PlatformEnvironment;
  overrides: Readonly<Record<string, ConfigValue>>;
}>;

export type EnvironmentOverrideViolation = Readonly<{
  key: string;
  reason: string;
}>;

export const ENVIRONMENT_VALUES: readonly PlatformEnvironment[] = [
  "development",
  "test",
  "pre-production",
  "production",
];

const ENVIRONMENT_RESTRICTIONS: Readonly<Record<PlatformEnvironment, ReadonlySet<string>>> = {
  development: new Set<string>(),
  test: new Set<string>(),
  "pre-production": new Set(["DEV_AUTO_SIGN_IN", "DEV_SEED_EMAIL", "DEV_SEED_PASSWORD"]),
  production: new Set(["DEV_AUTO_SIGN_IN", "DEV_SEED_EMAIL", "DEV_SEED_PASSWORD", "DEV_SEED_NAME"]),
};

const DEFAULT_PRODUCTION_ENVIRONMENT: Readonly<Record<string, string>> = {
  NODE_ENV: "production",
  HOST: "0.0.0.0",
  PORT: "3000",
};

export function validateEnvironmentOverride(
  environment: PlatformEnvironment,
  overrides: Readonly<Record<string, ConfigValue>>,
): readonly EnvironmentOverrideViolation[] {
  const restrictions = ENVIRONMENT_RESTRICTIONS[environment];
  if (restrictions.size === 0) {
    return [];
  }

  return Object.keys(overrides)
    .filter((key) => restrictions.has(key))
    .map((key) => ({
      key,
      reason: `Key '${key}' is not permitted in '${environment}' environment.`,
    }));
}

export function resolveEnvironmentDefaults(
  environment: PlatformEnvironment,
): Readonly<Record<string, string>> {
  if (environment === "development") {
    return {
      ...DEFAULT_PRODUCTION_ENVIRONMENT,
      NODE_ENV: "development",
      DEPLOYMENT_MODE: "CLOUD",
      AI_POLICY_MODE: "FULL_AUTONOMY",
    };
  }
  if (environment === "test") {
    return {
      ...DEFAULT_PRODUCTION_ENVIRONMENT,
      DEPLOYMENT_MODE: "CLOUD",
      AI_POLICY_MODE: "FULL_AUTONOMY",
    };
  }
  return {
    ...DEFAULT_PRODUCTION_ENVIRONMENT,
    DEPLOYMENT_MODE: "ON_PREM",
    AI_POLICY_MODE: "ADVISORY_ONLY",
  };
}

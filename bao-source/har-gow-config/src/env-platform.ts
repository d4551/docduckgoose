import path from "node:path";
import {
  DEFAULT_AI_PROVIDERS_BAO_ANTHROPIC_MODEL,
  DEFAULT_AI_PROVIDERS_BAO_CACHE_TTL_MS,
  DEFAULT_AI_PROVIDERS_BAO_GEMINI_MODEL,
  DEFAULT_AI_PROVIDERS_BAO_HUGGINGFACE_MODEL,
  DEFAULT_AI_PROVIDERS_BAO_OPENAI_MODEL,
  DEFAULT_BAO_BOSS_DLQ_RETENTION_DAYS,
  DEFAULT_BAO_BOSS_MAINTENANCE_INTERVAL_SECONDS,
  DEFAULT_BAO_BOSS_SCHEMA,
  DEFAULT_BAO_BOSS_SHUTDOWN_GRACE_PERIOD_SECONDS,
  DEFAULT_BLOBAO_LOCAL_ROOT,
  DEFAULT_BONKBUN_THEME,
  DEFAULT_PROOFBUN_RETENTION_MS,
  getRuntimeEnvironment,
  parsePositiveInteger,
  readBooleanEnvironmentValue,
  readTrimmedEnvironmentValue,
} from "./env-core.js";

function parseProviderOrder(raw: string | null): string[] {
  if (raw === null) {
    return ["openai", "anthropic", "gemini", "huggingface"];
  }

  const values = raw
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
  return values.length > 0 ? values : ["openai", "anthropic", "gemini", "huggingface"];
}

export function getAuthSessionSecret(): string | null {
  return readTrimmedEnvironmentValue("BETTER_AUTH_SECRET");
}

export function getDatabaseUrl(): string | null {
  return readTrimmedEnvironmentValue("DATABASE_URL");
}

export function getBaoBossDatabaseUrl(): string | null {
  return readTrimmedEnvironmentValue("BAO_BOSS_DATABASE_URL") ?? getDatabaseUrl();
}

export function getMediaStoreDriver(): "local" | "s3" {
  const raw = readTrimmedEnvironmentValue("BAOHAUS_MEDIA_DRIVER");
  return raw === "s3" ? "s3" : "local";
}

export function getMediaStoreLocalRoot(): string {
  const configured = readTrimmedEnvironmentValue("BAOHAUS_MEDIA_LOCAL_ROOT");
  return configured ?? path.join(process.cwd(), DEFAULT_BLOBAO_LOCAL_ROOT);
}

export function getMediaStorePublicBaseUrl(): string | null {
  return readTrimmedEnvironmentValue("BAOHAUS_MEDIA_PUBLIC_BASE_URL");
}

export function getMediaLocalPresignSecret(): string | null {
  return readTrimmedEnvironmentValue("BAOHAUS_MEDIA_LOCAL_PRESIGN_SECRET");
}

export function getMediaLocalPresignBaseUrl(): string | null {
  return readTrimmedEnvironmentValue("BAOHAUS_MEDIA_LOCAL_PRESIGN_BASE_URL");
}

export function getMediaLocalPresignPort(): number | null {
  const raw = readTrimmedEnvironmentValue("BAOHAUS_MEDIA_LOCAL_PRESIGN_PORT");
  if (raw === null) {
    return null;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function getMediaSeaweedFilerEndpoint(): string | null {
  return readTrimmedEnvironmentValue("BAOHAUS_MEDIA_SEAWEED_FILER_ENDPOINT");
}

export function getMediaSeaweedMasterEndpoint(): string | null {
  return readTrimmedEnvironmentValue("BAOHAUS_MEDIA_SEAWEED_MASTER_ENDPOINT");
}

export function getMediaStoreS3Config(): {
  accessKeyId: string | null;
  bucket: string | null;
  endpoint: string | null;
  prefix: string;
  region: string | null;
  secretAccessKey: string | null;
} {
  return {
    accessKeyId: readTrimmedEnvironmentValue("BAOHAUS_MEDIA_S3_ACCESS_KEY_ID"),
    bucket: readTrimmedEnvironmentValue("BAOHAUS_MEDIA_S3_BUCKET"),
    endpoint: readTrimmedEnvironmentValue("BAOHAUS_MEDIA_S3_ENDPOINT"),
    prefix: readTrimmedEnvironmentValue("BAOHAUS_MEDIA_S3_PREFIX") ?? "",
    region: readTrimmedEnvironmentValue("BAOHAUS_MEDIA_S3_REGION"),
    secretAccessKey: readTrimmedEnvironmentValue("BAOHAUS_MEDIA_S3_SECRET_ACCESS_KEY"),
  };
}

export function getMediaStoreConfig(): {
  driver: "local" | "s3";
  localRoot: string;
  publicBaseUrl: string | null;
  s3: {
    accessKeyId: string | null;
    bucket: string | null;
    endpoint: string | null;
    prefix: string;
    region: string | null;
    secretAccessKey: string | null;
  };
} {
  return {
    driver: getMediaStoreDriver(),
    localRoot: getMediaStoreLocalRoot(),
    publicBaseUrl: getMediaStorePublicBaseUrl(),
    s3: getMediaStoreS3Config(),
  };
}

export function getProofbunConfig(): {
  retentionMs: number;
} {
  const env = getRuntimeEnvironment();
  return {
    retentionMs: parsePositiveInteger(
      env.BAOHAUS_EXECUTION_RETENTION_MS,
      DEFAULT_PROOFBUN_RETENTION_MS,
    ),
  };
}

export function getAiProvidersBaoConfig(): {
  allowFallback: boolean;
  anthropicModelId: string;
  cacheTtlMs: number;
  defaultProviderOrder: string[];
  geminiModelId: string;
  huggingFaceModelId: string;
  openAiModelId: string;
} {
  const env = getRuntimeEnvironment();
  return {
    allowFallback: readBooleanEnvironmentValue("BAOHAUS_PROVIDER_ALLOW_FALLBACK", true),
    anthropicModelId:
      readTrimmedEnvironmentValue("BAOHAUS_ANTHROPIC_MODEL") ??
      DEFAULT_AI_PROVIDERS_BAO_ANTHROPIC_MODEL,
    cacheTtlMs: parsePositiveInteger(
      env.BAOHAUS_PROVIDER_CACHE_TTL_MS,
      DEFAULT_AI_PROVIDERS_BAO_CACHE_TTL_MS,
    ),
    defaultProviderOrder: parseProviderOrder(readTrimmedEnvironmentValue("BAOHAUS_PROVIDER_ORDER")),
    geminiModelId:
      readTrimmedEnvironmentValue("BAOHAUS_GEMINI_MODEL") ?? DEFAULT_AI_PROVIDERS_BAO_GEMINI_MODEL,
    huggingFaceModelId:
      readTrimmedEnvironmentValue("BAOHAUS_HUGGINGFACE_MODEL") ??
      DEFAULT_AI_PROVIDERS_BAO_HUGGINGFACE_MODEL,
    openAiModelId:
      readTrimmedEnvironmentValue("BAOHAUS_OPENAI_MODEL") ?? DEFAULT_AI_PROVIDERS_BAO_OPENAI_MODEL,
  };
}

export function getSwipebunConfig(): {
  builtinVisibility: "public" | "private" | "unlisted";
} {
  const configured = readTrimmedEnvironmentValue("BAOHAUS_TEMPLATE_BUILTIN_VISIBILITY");
  if (configured === "private" || configured === "unlisted") {
    return { builtinVisibility: configured };
  }

  return { builtinVisibility: "public" };
}

export function getBonkbunConfig(): {
  defaultTheme: string;
} {
  return {
    defaultTheme: readTrimmedEnvironmentValue("BAOHAUS_BONKBUN_THEME") ?? DEFAULT_BONKBUN_THEME,
  };
}

export function getDatabaseConfig(): {
  databaseUrl: string | null;
} {
  return { databaseUrl: getDatabaseUrl() };
}

export function getAuthConfig(): {
  sessionSecret: string | null;
} {
  return { sessionSecret: getAuthSessionSecret() };
}

export function getJobConfig(): {
  queueDatabaseUrl: string | null;
} {
  return { queueDatabaseUrl: getBaoBossDatabaseUrl() };
}

export function getBaoBossConfig(): {
  connectionString: string | null;
  dlqRetentionDays: number;
  maintenanceIntervalSeconds: number;
  schema: string;
  shutdownGracePeriodSeconds: number;
} {
  const env = getRuntimeEnvironment();
  return {
    connectionString: getBaoBossDatabaseUrl(),
    dlqRetentionDays: parsePositiveInteger(
      env.BAO_BOSS_DLQ_RETENTION_DAYS,
      DEFAULT_BAO_BOSS_DLQ_RETENTION_DAYS,
    ),
    maintenanceIntervalSeconds: parsePositiveInteger(
      env.BAO_BOSS_MAINTENANCE_INTERVAL_SECONDS,
      DEFAULT_BAO_BOSS_MAINTENANCE_INTERVAL_SECONDS,
    ),
    schema: readTrimmedEnvironmentValue("BAO_BOSS_SCHEMA") ?? DEFAULT_BAO_BOSS_SCHEMA,
    shutdownGracePeriodSeconds: parsePositiveInteger(
      env.BAO_BOSS_SHUTDOWN_GRACE_PERIOD_SECONDS,
      DEFAULT_BAO_BOSS_SHUTDOWN_GRACE_PERIOD_SECONDS,
    ),
  };
}

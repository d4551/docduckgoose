/**
 * System Integration and Service Connectivity Validation Module
 *
 * Provides comprehensive validation for system integrations including external services,
 * APIs, databases, and message queues. This module ensures integrations are properly
 * configured with security best practices before deployment.
 *
 * Features:
 * - Service endpoint validation
 * - API configuration and authentication checking
 * - Database connection validation
 * - Message queue configuration verification
 * - Security compliance checks (HTTPS, authentication, credentials)
 * - Timeout and connection pool validation
 *
 * @example Basic integration validation
 * ```typescript
 * const config = {
 *   services: {
 *     azureBlob: {
 *       endpoint: 'https://storage.azure.com',
 *       enabled: true,
 *       timeout: 5000
 *     }
 *   },
 *   apis: {
 *     fhir: {
 *       baseUrl: 'https://fhir.hospital.org/api',
 *       authentication: { type: 'bearer' }
 *     }
 *   }
 * };
 *
 * const log = createLogger('integration');
 * const result = await validateIntegration(config, { checkSecurity: true });
 * if (!result.valid) {
 *   log.error('Integration errors:', result.errors);
 * }
 * ```
 */

import { createLogger } from "@baohaus/bao-shared/logger/browser";
import type {
  ValidationResult as SharedValidationResult,
  ValidationError,
  ValidationOptions,
  ValidationWarning,
} from "@baohaus/bao-shared/types/validation";
import { getErrorMessage, toResultSync } from "@baohaus/bao-utils/async-result";
import { isRecord } from "../utils/type-guards";

/**
 * Error logging helper for validation failures.
 *
 * @param msg - Message to prefix in logs.
 * @param args - Additional error context.
 */
const logger: ReturnType<typeof createLogger> = createLogger("IntegrationValidator");

type IntegrationValidationOptions = Partial<Pick<ValidationOptions, "checkSecurity">>;

type IntegrationValidationData = {
  serviceCount: number;
  apiCount: number;
  dbCount: number;
};

const MIN_SERVICE_TIMEOUT_MS = 1000;
const MIN_DB_POOL_SIZE = 5;

type IntegrationValidationResult = SharedValidationResult<IntegrationValidationData>;

/**
 * Validates system integration configuration and connectivity settings.
 *
 * @param integrationData - Integration configuration object to validate
 * @param [options={}] - Validation configuration options.
 * @returns Validation result with errors, warnings, and metadata.
 *
 * @description
 * Performs comprehensive validation of integration configurations including:
 *
 * 1. Service validation:
 *    - Endpoint/host presence
 *    - Enabled status specification
 *    - Timeout configuration
 *
 * 2. API validation:
 *    - Base URL presence and format
 *    - HTTPS enforcement (warning if HTTP)
 *    - Authentication configuration
 *
 * 3. Database validation:
 *    - Connection string or host/URL
 *    - Database name specification
 *    - SSL configuration
 *    - Connection pool size
 *
 * 4. Message queue validation:
 *    - Connection configuration
 *    - Queue definitions
 *
 * 5. Security compliance (when enabled):
 *    - HTTP vs HTTPS endpoint detection
 *    - Missing authentication warnings
 *    - Weak/default credential detection
 *
 * @example Complete integration validation
 * ```typescript
 * const integrationConfig = {
 *   services: {
 *     azureBlob: {
 *       endpoint: 'https://storage.azure.com',
 *       enabled: true,
 *       timeout: 5000,
 *       authentication: { type: 'key', key: 'secure-key' }
 *     }
 *   },
 *   apis: {
 *     fhir: {
 *       baseUrl: 'https://fhir.hospital.org/api',
 *       authentication: { type: 'bearer', token: 'token' }
 *     }
 *   },
 *   databases: {
 *     postgres: {
 *       host: 'db.hospital.org',
 *       database: 'pathology',
 *       ssl: true,
 *       poolSize: 10
 *     }
 *   }
 * };
 *
 * const result = await validateIntegration(integrationConfig, {
 *   checkSecurity: true
 * });
 *
 * const log = createLogger('integration');
 * log.info(`Valid: ${result.valid}`);
 * log.info(`Services: ${result.data.serviceCount}`);
 * log.info(`APIs: ${result.data.apiCount}`);
 * ```
 */
/**
 * Run section-level validations for services, APIs, databases, and message queues.
 *
 * @param data - Integration data object
 * @param errors - Mutable errors array to append to
 * @param warnings - Mutable warnings array to append to
 */
function validateIntegrationSections(
  data: Record<string, unknown>,
  errors: ValidationError[],
  warnings: ValidationWarning[],
): void {
  if (isRecord(data.services)) {
    const serviceValidation = validateServices(data.services);
    errors.push(...serviceValidation.errors);
    warnings.push(...serviceValidation.warnings);
  }
  if (isRecord(data.apis)) {
    const apiValidation = validateAPIs(data.apis);
    errors.push(...apiValidation.errors);
    warnings.push(...apiValidation.warnings);
  }
  if (isRecord(data.databases)) {
    const databaseValidation = validateDatabases(data.databases);
    errors.push(...databaseValidation.errors);
    warnings.push(...databaseValidation.warnings);
  }
  if (isRecord(data.messageQueues)) {
    const mqValidation = validateMessageQueues(data.messageQueues);
    errors.push(...mqValidation.errors);
    warnings.push(...mqValidation.warnings);
  }
}

/**
 * Build the summary counts for integration data sections.
 *
 * @param data - Integration data object
 * @returns Object containing serviceCount, apiCount, and dbCount
 */
function buildIntegrationSummary(data: Record<string, unknown>): {
  serviceCount: number;
  apiCount: number;
  dbCount: number;
} {
  return {
    serviceCount:
      data.services && typeof data.services === "object" ? Object.keys(data.services).length : 0,
    apiCount: data.apis && typeof data.apis === "object" ? Object.keys(data.apis).length : 0,
    dbCount:
      data.databases && typeof data.databases === "object" ? Object.keys(data.databases).length : 0,
  };
}

/**
 * Validate an integration payload across services, APIs, databases, and message queues.
 *
 * @param integrationData - Untrusted integration payload.
 * @param options - Validation options.
 * @returns Validation result including summary and issue lists.
 */
export function validateIntegration(
  integrationData: unknown,
  options: IntegrationValidationOptions = {},
): Promise<IntegrationValidationResult> {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  const result = toResultSync(() => {
    if (!isRecord(integrationData)) {
      errors.push({
        message: "Integration data must be an object",
        code: "INVALID_INTEGRATION_DATA",
      });
      return {
        valid: false,
        errors,
        warnings,
        data: { serviceCount: 0, apiCount: 0, dbCount: 0 },
      };
    }

    const data: Record<string, unknown> = integrationData;

    validateIntegrationSections(data, errors, warnings);

    // Check for security issues
    if (options.checkSecurity !== false) {
      const securityIssues = checkSecurityCompliance(data);
      warnings.push(...securityIssues);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      data: buildIntegrationSummary(data),
    };
  });

  if (!result.ok) {
    const message = getErrorMessage(result.error);
    logger.error("Integration validation error", { error: message });
    return Promise.resolve({
      valid: false,
      errors: [
        {
          message,
          code: "VALIDATION_ERROR",
        },
      ],
      warnings: [],
    });
  }
  return Promise.resolve(result.value);
}

/**
 * Validate service configurations.
 *
 * @param services - Service configuration map.
 * @returns Validation errors and warnings.
 */
function validateServices(services: Record<string, unknown>): {
  errors: ValidationError[];
  warnings: ValidationWarning[];
} {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  for (const [serviceName, rawConfig] of Object.entries(services)) {
    if (!isRecord(rawConfig)) {
      continue;
    }
    const serviceConfig = rawConfig;

    if (!(serviceConfig.endpoint || serviceConfig.host)) {
      errors.push({
        field: `services.${serviceName}`,
        message: `Service ${serviceName} must have endpoint or host`,
        code: "MISSING_SERVICE_ENDPOINT",
      });
    }

    if (serviceConfig.enabled === undefined) {
      warnings.push({
        field: `services.${serviceName}.enabled`,
        message: `Service ${serviceName} should specify enabled status`,
        suggestion: "Add enabled: true/false property",
      });
    }

    if (
      typeof serviceConfig.timeout === "number" &&
      serviceConfig.timeout < MIN_SERVICE_TIMEOUT_MS
    ) {
      warnings.push({
        field: `services.${serviceName}.timeout`,
        message: `Service ${serviceName} has very low timeout (${serviceConfig.timeout}ms)`,
        suggestion: "Consider increasing timeout to at least 1000ms",
      });
    }
  }

  return { errors, warnings };
}

/**
 * Validate API configurations.
 *
 * @param apis - API configuration map.
 * @returns Validation errors and warnings.
 */
function validateAPIs(apis: Record<string, unknown>): {
  errors: ValidationError[];
  warnings: ValidationWarning[];
} {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  for (const [apiName, rawConfig] of Object.entries(apis)) {
    if (!isRecord(rawConfig)) {
      continue;
    }
    const apiConfig = rawConfig;

    if (!apiConfig.baseUrl) {
      errors.push({
        field: `apis.${apiName}.baseUrl`,
        message: `API ${apiName} must have baseUrl`,
        code: "MISSING_API_URL",
      });
    }

    if (typeof apiConfig.baseUrl === "string" && !apiConfig.baseUrl.startsWith("https://")) {
      warnings.push({
        field: `apis.${apiName}.baseUrl`,
        message: `API ${apiName} should use HTTPS`,
        suggestion: "Use HTTPS for secure communication",
      });
    }

    if (!apiConfig.authentication) {
      warnings.push({
        field: `apis.${apiName}.authentication`,
        message: `API ${apiName} has no authentication configured`,
        suggestion: "Configure appropriate authentication method",
      });
    }
  }

  return { errors, warnings };
}

/**
 * Validate database configurations.
 *
 * @param databases - Database configuration map.
 * @returns Validation errors and warnings.
 */
function validateDatabases(databases: Record<string, unknown>): {
  errors: ValidationError[];
  warnings: ValidationWarning[];
} {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  for (const [databaseName, rawConfig] of Object.entries(databases)) {
    if (!isRecord(rawConfig)) {
      continue;
    }
    const databaseConfig = rawConfig;

    if (!(databaseConfig.host || databaseConfig.url)) {
      errors.push({
        field: `databases.${databaseName}`,
        message: `Database ${databaseName} must have host or url`,
        code: "MISSING_DB_CONNECTION",
      });
    }

    if (!databaseConfig.database) {
      errors.push({
        field: `databases.${databaseName}.database`,
        message: `Database ${databaseName} must specify database name`,
        code: "MISSING_DB_NAME",
      });
    }

    if (databaseConfig.ssl === false) {
      warnings.push({
        field: `databases.${databaseName}.ssl`,
        message: `Database ${databaseName} has SSL disabled`,
        suggestion: "Enable SSL for secure database connections",
      });
    }

    if (typeof databaseConfig.poolSize === "number" && databaseConfig.poolSize < MIN_DB_POOL_SIZE) {
      warnings.push({
        field: `databases.${databaseName}.poolSize`,
        message: `Database ${databaseName} has small or no connection pool`,
        suggestion: "Set poolSize to at least 5 for better performance",
      });
    } else if (!databaseConfig.poolSize) {
      warnings.push({
        field: `databases.${databaseName}.poolSize`,
        message: `Database ${databaseName} has small or no connection pool`,
        suggestion: "Set poolSize to at least 5 for better performance",
      });
    }
  }

  return { errors, warnings };
}

/**
 * Validate message queue configurations.
 *
 * @param messageQueues - Message queue configuration map.
 * @returns Validation errors and warnings.
 */
function validateMessageQueues(messageQueues: Record<string, unknown>): {
  errors: ValidationError[];
  warnings: ValidationWarning[];
} {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  for (const [queueName, rawConfig] of Object.entries(messageQueues)) {
    if (!isRecord(rawConfig)) {
      continue;
    }
    const queueConfig = rawConfig;

    if (!queueConfig.connection) {
      errors.push({
        field: `messageQueues.${queueName}.connection`,
        message: `Message queue ${queueName} must have connection config`,
        code: "MISSING_MQ_CONNECTION",
      });
    }

    if (!isRecord(queueConfig.queues) || Object.keys(queueConfig.queues).length === 0) {
      warnings.push({
        field: `messageQueues.${queueName}.queues`,
        message: `Message queue ${queueName} has no queues defined`,
        suggestion: "Define at least one queue",
      });
    }
  }

  return { errors, warnings };
}

/** Known weak/default credential values (lowercased). */
const WEAK_CREDENTIAL_VALUES: Set<unknown> = new Set([
  "password",
  "123456",
  "admin",
  "root",
  "default",
]);

/**
 * Determine whether a key name represents a credential field.
 *
 * @param key - Object key to test
 * @returns True when the key looks like a credential field
 */
function isCredentialKey(key: string): boolean {
  const lowerKey = key.toLowerCase();
  return lowerKey.includes("password") || lowerKey.includes("secret") || lowerKey.includes("key");
}

/**
 * Recursively identify weak or default credentials in configuration values.
 *
 * @param object - Value to inspect recursively
 * @param path - Current field path
 * @param warnings - Mutable warnings array to append to
 */
function collectWeakCredentialWarnings(
  object: unknown,
  path: string,
  warnings: ValidationWarning[],
): void {
  if (typeof object !== "object" || object === null) {
    return;
  }
  for (const [key, value] of Object.entries(object)) {
    if (isCredentialKey(key)) {
      if (typeof value === "string" && WEAK_CREDENTIAL_VALUES.has(value.toLowerCase())) {
        warnings.push({
          field: `${path}.${key}`,
          message: "Weak or default credentials detected",
          suggestion: "Use strong, unique credentials",
        });
      }
    } else {
      collectWeakCredentialWarnings(value, path ? `${path}.${key}` : key, warnings);
    }
  }
}

/**
 * Check security compliance for integration configuration.
 *
 * @param integrationData - Integration configuration map.
 * @returns Security-related warnings.
 */
function checkSecurityCompliance(integrationData: Record<string, unknown>): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  collectInsecureHttpWarnings(integrationData, "", warnings);

  // Check for missing authentication
  if (isRecord(integrationData.services)) {
    for (const [serviceName, rawConfig] of Object.entries(integrationData.services)) {
      if (!isRecord(rawConfig)) {
        continue;
      }
      if (!(rawConfig.authentication || rawConfig.apiKey || rawConfig.token)) {
        warnings.push({
          field: `services.${serviceName}`,
          message: `Service ${serviceName} has no authentication configured`,
          suggestion: "Add authentication, apiKey, or token for secure access",
        });
      }
    }
  }

  collectWeakCredentialWarnings(integrationData, "", warnings);

  return warnings;
}

/**
 * Recursively identify insecure `http://` endpoints.
 *
 * @param object - Value to inspect recursively
 * @param path - Current field path
 * @param warnings - Mutable warnings array to append to
 */
function collectInsecureHttpWarnings(
  object: unknown,
  path: string,
  warnings: ValidationWarning[],
): void {
  if (typeof object === "string" && object.startsWith("http://")) {
    warnings.push({
      field: path,
      message: "HTTP endpoint detected, consider using HTTPS",
      suggestion: "Replace http:// with https:// for secure communication",
    });
    return;
  }
  if (typeof object !== "object" || object === null) {
    return;
  }
  for (const [key, value] of Object.entries(object)) {
    collectInsecureHttpWarnings(value, path ? `${path}.${key}` : key, warnings);
  }
}

/**
 * Health and Status Types
 *
 * Defines type-safe models for system health monitoring, service status checking,
 * and adapter health reporting. These types support the health monitoring and
 * observability features of the application.
 *
 * @shared/types/health.ts
 */

import type { HealthResponse as SharedHealthResponse } from "@baohaus/bao-schemas/health.schemas";

/**
 * Health status for a service adapter
 *
 * HealthAdapterStatus
 *
 * @description
 * Represents the health status of an external service adapter (Azure, FHIR, DICOM, etc.).
 * Used by the health monitoring system to track connectivity and performance of
 * integrated services.
 *
 * @example
 * ```typescript
 * const adapterStatus: HealthAdapterStatus = {
 *   provider: 'azure-blob',
 *   status: 'healthy',
 *   latency: 45,
 *   message: 'Connected successfully',
 *   timestamp: '2024-01-15T10:30:00Z',
 *   details: {
 *     region: 'eastus',
 *     accountName: 'pathologystorage'
 *   }
 * };
 * ```
 */
export interface HealthAdapterStatus {
  /** Service provider identifier (e.g., 'azure-blob', 'baofire', 'dimsum') */
  provider: string;
  /** Current health status of the adapter */
  status: "healthy" | "unhealthy" | "degraded" | "unknown";
  /** Response latency in milliseconds */
  latency?: number;
  /** Human-readable status message */
  message?: string;
  /** Timestamp of last health check (ISO 8601 string or Date object) */
  timestamp?: string | Date;
  /** Provider-specific health details */
  details?: Record<string, unknown>;
}

/**
 * Comprehensive system health status response
 *
 * HealthServiceStatusResponse
 *
 * @description
 * Provides a complete health report for the application including overall status,
 * system metrics, and individual adapter health. This is the primary interface
 * for health monitoring endpoints and dashboards.
 *
 * @example
 * ```typescript
 * const healthStatus: HealthServiceStatusResponse = {
 *   status: 'healthy',
 *   timestamp: '2024-01-15T10:30:00Z',
 *   uptime: MS_PER_HOUR,
 *   version: '1.0.0',
 *   configuration: {
 *     environment: 'production',
 *     region: 'us-east-1'
 *   },
 *   adapters: {
 *     'azure-blob': {
 *       provider: 'azure-blob',
 *       status: 'healthy',
 *       latency: 45
 *     },
 *     'baofire': {
 *       provider: 'baofire',
 *       status: 'degraded',
 *       latency: 250,
 *       message: 'High latency detected'
 *     }
 *   },
 *   system: {
 *     memory: {
 *       used: 512,
 *       total: 2048,
 *       percentage: 25
 *     },
 *     cpu: {
 *       usage: 15.5,
 *       cores: 4
 *     },
 *     disk: {
 *       used: 100,
 *       total: 500,
 *       percentage: 20
 *     }
 *   }
 * };
 * ```
 */
export interface HealthServiceStatusResponse {
  /** Overall system health status (worst status among all adapters) */
  status: "healthy" | "unhealthy" | "degraded" | "unknown";
  /** Timestamp when health check was performed (ISO 8601 string or Date object) */
  timestamp: string | Date;
  /** System uptime in milliseconds */
  uptime?: number;
  /** Application version string */
  version?: string;
  /** System configuration details */
  configuration?: Record<string, unknown>;
  /** Health status of each service adapter keyed by adapter name */
  adapters?: Record<string, HealthAdapterStatus>;
  /** System resource metrics */
  system?: {
    /** Memory usage metrics */
    memory?: Record<string, unknown>;
    /** CPU usage metrics */
    cpu?: Record<string, unknown>;
    /** Disk usage metrics */
    disk?: Record<string, unknown>;
  };
}

/**
 * API runtime `/api/v1/health` response payload.
 */
export type ApiHealthResponse = SharedHealthResponse;

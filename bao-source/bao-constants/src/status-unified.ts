/**
 * Unified Status Object - Aggregation Layer.
 *
 * Imports from status-core.ts and creates the unified STATUS object.
 * This file has minimal logic to avoid circular dependencies. Provides:
 *
 * - Single unified STATUS namespace for all status constants
 * - Re-exports from status-core in one canonical object
 * - Simplified API for accessing any status value
 *
 * @shared/constants/status-unified
 */

import {
  API_STATUS,
  AVAILABILITY_STATUS,
  CALIBRATION_STATUS,
  CONNECTION_STATUS,
  INTEGRATION_STATUS,
  SYSTEM_STATUS,
  TASK_STATUS,
  VALIDATION_STATUS,
} from "./status-core";

/**
 * Unified STATUS object for convenience
 * Re-exports all status constants in a single namespace
 */
export const STATUS = {
  // Integration
  HEALTHY: INTEGRATION_STATUS.HEALTHY,
  DEGRADED: INTEGRATION_STATUS.DEGRADED,
  OFFLINE: INTEGRATION_STATUS.OFFLINE,
  ONLINE: INTEGRATION_STATUS.ONLINE,
  UNKNOWN: INTEGRATION_STATUS.UNKNOWN,

  // Task/Job
  PENDING: TASK_STATUS.PENDING,
  IN_PROGRESS: TASK_STATUS.IN_PROGRESS,
  COMPLETED: TASK_STATUS.COMPLETED,
  FAILED: TASK_STATUS.FAILED,
  CANCELLED: TASK_STATUS.CANCELLED,
  QUEUED: TASK_STATUS.QUEUED,
  PROCESSING: TASK_STATUS.PROCESSING,
  PAUSED: TASK_STATUS.PAUSED,
  SCHEDULED: TASK_STATUS.SCHEDULED,

  // Connection
  CONNECTED: CONNECTION_STATUS.CONNECTED,
  DISCONNECTED: CONNECTION_STATUS.DISCONNECTED,
  CONNECTING: CONNECTION_STATUS.CONNECTING,
  RECONNECTING: CONNECTION_STATUS.RECONNECTING,
  STANDBY: CONNECTION_STATUS.STANDBY,
  READY: CONNECTION_STATUS.READY,
  DETECTED: CONNECTION_STATUS.DETECTED,
  UNREACHABLE: CONNECTION_STATUS.UNREACHABLE,

  // API
  SUCCESS: API_STATUS.SUCCESS,
  ERROR: API_STATUS.ERROR,
  INFO: API_STATUS.INFO,
  LOADING: API_STATUS.LOADING,
  IDLE: API_STATUS.IDLE,
  SYNCING: API_STATUS.SYNCING,
  SYNCED: API_STATUS.SYNCED,

  // System
  RUNNING: SYSTEM_STATUS.RUNNING,
  STOPPED: SYSTEM_STATUS.STOPPED,
  STARTING: SYSTEM_STATUS.STARTING,
  STOPPING: SYSTEM_STATUS.STOPPING,
  RESTARTING: SYSTEM_STATUS.RESTARTING,
  ACTIVE: SYSTEM_STATUS.ACTIVE,
  INACTIVE: SYSTEM_STATUS.INACTIVE,
  STABLE: SYSTEM_STATUS.STABLE,

  // Calibration
  CALIBRATING: CALIBRATION_STATUS.CALIBRATING,
  CALIBRATED: CALIBRATION_STATUS.CALIBRATED,
  UNCALIBRATED: CALIBRATION_STATUS.UNCALIBRATED,

  // Availability
  AVAILABLE: AVAILABILITY_STATUS.AVAILABLE,
  UNAVAILABLE: AVAILABILITY_STATUS.UNAVAILABLE,
  LIMITED: AVAILABILITY_STATUS.LIMITED,
  BUSY: AVAILABILITY_STATUS.BUSY,

  // Validation
  VALID: VALIDATION_STATUS.VALID,
  INVALID: VALIDATION_STATUS.INVALID,
  VALIDATING: VALIDATION_STATUS.VALIDATING,
  WARNING: VALIDATION_STATUS.WARNING,
  REQUIRED: VALIDATION_STATUS.REQUIRED,
} as const;

/** Inferred type from the Status schema. */
export type Status = (typeof STATUS)[keyof typeof STATUS];

/**
 * Service connection status type - used for Azure services and integrations
 * Allows any string to support runtime values while providing autocomplete for common statuses
 */
export type ServiceStatus =
  | "unknown"
  | "connected"
  | "disconnected"
  | "connecting"
  | "reconnecting"
  | "ok"
  | "error"
  | "limited"
  | "healthy"
  | "degraded"
  | "offline"
  | "not-configured"
  | "cors-issue"
  | (string & {}); // Allow any string while maintaining autocomplete

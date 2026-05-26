/**
 * Core Status Constants - Foundation Layer.
 *
 * Atomic status values with no dependencies, forming the base layer for status management.
 * This module was split from the monolithic status.ts to eliminate circular dependencies.
 * Includes:
 *
 * - Integration status (healthy, degraded, offline, online, unknown)
 * - Task/Job status (pending, in-progress, completed, failed, etc.)
 * - Connection status (connected, disconnected, reconnecting)
 * - Validation and API status constants
 * - System and calibration status values
 *
 * @shared/constants/status-core
 */

// Integration Status
/** INTEGRATION_STATUS constant. */
export const INTEGRATION_STATUS: {
  readonly HEALTHY: "healthy";
  readonly DEGRADED: "degraded";
  readonly OFFLINE: "offline";
  readonly ONLINE: "online";
  readonly UNKNOWN: "unknown";
} = {
  HEALTHY: "healthy",
  DEGRADED: "degraded",
  OFFLINE: "offline",
  ONLINE: "online",
  UNKNOWN: "unknown",
} as const;

/** Inferred type from the IntegrationStatus schema. */
export type IntegrationStatus = (typeof INTEGRATION_STATUS)[keyof typeof INTEGRATION_STATUS];

// Task/Job Status
/** TASK_STATUS constant. */
export const TASK_STATUS: {
  readonly PENDING: "pending";
  readonly IN_PROGRESS: "in-progress";
  readonly COMPLETED: "completed";
  readonly FAILED: "failed";
  readonly CANCELLED: "cancelled";
  readonly QUEUED: "queued";
  readonly PROCESSING: "processing";
  readonly PAUSED: "paused";
  readonly SCHEDULED: "scheduled";
} = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
  QUEUED: "queued",
  PROCESSING: "processing",
  PAUSED: "paused",
  SCHEDULED: "scheduled",
} as const;

/** Inferred type from the TaskStatus schema. */
export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

// Connection Status
/** CONNECTION_STATUS constant. */
export const CONNECTION_STATUS: {
  readonly CONNECTED: "connected";
  readonly DISCONNECTED: "disconnected";
  readonly CONNECTING: "connecting";
  readonly RECONNECTING: "reconnecting";
  readonly STANDBY: "standby";
  readonly READY: "ready";
  readonly DETECTED: "detected";
  readonly UNREACHABLE: "unreachable";
} = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
  RECONNECTING: "reconnecting",
  STANDBY: "standby",
  READY: "ready",
  DETECTED: "detected",
  UNREACHABLE: "unreachable",
} as const;

/** Inferred type from the ConnectionStatus schema. */
export type ConnectionStatus = (typeof CONNECTION_STATUS)[keyof typeof CONNECTION_STATUS];

// API Status
/** API_STATUS constant. */
export const API_STATUS: {
  readonly SUCCESS: "success";
  readonly ERROR: "error";
  readonly LOADING: "loading";
  readonly IDLE: "idle";
  readonly SYNCING: "syncing";
  readonly SYNCED: "synced";
  readonly INFO: "info";
} = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
  IDLE: "idle",
  SYNCING: "syncing",
  SYNCED: "synced",
  INFO: "info",
} as const;

/** Inferred type from the ApiStatus schema. */
export type ApiStatus = (typeof API_STATUS)[keyof typeof API_STATUS];

// Device Status
/** DEVICE_STATUS constant. */
export const DEVICE_STATUS: {
  readonly CONNECTED: "connected";
  readonly DISCONNECTED: "disconnected";
  readonly DETECTED: "detected";
  readonly STANDBY: "standby";
  readonly READY: "ready";
  readonly CALIBRATING: "calibrating";
  readonly ERROR: "error";
  readonly OFFLINE: "offline";
  readonly UNKNOWN: "unknown";
  readonly BUSY: "busy";
  readonly AVAILABLE: "available";
} = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  DETECTED: "detected",
  STANDBY: "standby",
  READY: "ready",
  CALIBRATING: "calibrating",
  ERROR: "error",
  OFFLINE: "offline",
  UNKNOWN: "unknown",
  BUSY: "busy",
  AVAILABLE: "available",
} as const;

/** Inferred type from the DeviceStatus schema. */
export type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];

// System Status
/** SYSTEM_STATUS constant. */
export const SYSTEM_STATUS: {
  readonly RUNNING: "running";
  readonly STOPPED: "stopped";
  readonly STARTING: "starting";
  readonly STOPPING: "stopping";
  readonly RESTARTING: "restarting";
  readonly ACTIVE: "active";
  readonly INACTIVE: "inactive";
  readonly STABLE: "stable";
} = {
  RUNNING: "running",
  STOPPED: "stopped",
  STARTING: "starting",
  STOPPING: "stopping",
  RESTARTING: "restarting",
  ACTIVE: "active",
  INACTIVE: "inactive",
  STABLE: "stable",
} as const;

/** Inferred type from the SystemStatus schema. */
export type SystemStatus = (typeof SYSTEM_STATUS)[keyof typeof SYSTEM_STATUS];

// Calibration Status
/** CALIBRATION_STATUS constant. */
export const CALIBRATION_STATUS: {
  readonly CALIBRATING: "calibrating";
  readonly CALIBRATED: "calibrated";
  readonly UNCALIBRATED: "uncalibrated";
} = {
  CALIBRATING: "calibrating",
  CALIBRATED: "calibrated",
  UNCALIBRATED: "uncalibrated",
} as const;

/** Inferred type from the CalibrationStatus schema. */
export type CalibrationStatus = (typeof CALIBRATION_STATUS)[keyof typeof CALIBRATION_STATUS];

// Availability Status
/** AVAILABILITY_STATUS constant. */
export const AVAILABILITY_STATUS: {
  readonly AVAILABLE: "available";
  readonly UNAVAILABLE: "unavailable";
  readonly LIMITED: "limited";
  readonly BUSY: "busy";
} = {
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
  LIMITED: "limited",
  BUSY: "busy",
} as const;

/** Inferred type from the AvailabilityStatus schema. */
export type AvailabilityStatus = (typeof AVAILABILITY_STATUS)[keyof typeof AVAILABILITY_STATUS];

// Validation Status
/** VALIDATION_STATUS constant. */
export const VALIDATION_STATUS: {
  readonly VALID: "valid";
  readonly INVALID: "invalid";
  readonly VALIDATING: "validating";
  readonly WARNING: "warning";
  readonly REQUIRED: "required";
} = {
  VALID: "valid",
  INVALID: "invalid",
  VALIDATING: "validating",
  WARNING: "warning",
  REQUIRED: "required",
} as const;

/** Inferred type from the ValidationStatus schema. */
export type ValidationStatus = (typeof VALIDATION_STATUS)[keyof typeof VALIDATION_STATUS];

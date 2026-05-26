/**
 * RPA (Robot Framework) Shared Types
 *
 * Type definitions for Robot Framework workflow management, execution,
 * and keyword library operations shared between client and server.
 *
 * @shared/types/rpa.ts
 */

import type {
  RpaTrainingHandoffPreviewSchema,
  RpaTrainingHandoffRequestSchema,
  RpaTrainingHandoffResponseSchema,
  RpaTriggerType as SchemaRpaTriggerType,
} from "@baohaus/bao-schemas/rpa.schemas";
import type { Static } from "@baohaus/baobox/elysia";

// Enums

/**
 * RPA execution status.
 */
export type RpaExecutionStatus =
  | "PENDING"
  | "QUEUED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | "TIMEOUT";

/**
 * RPA execution trigger type.
 */
export type RpaTriggerType = SchemaRpaTriggerType;

/**
 * RPA log level.
 */
export type RpaLogLevel = "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "NONE";

/**
 * RPA keyword execution status.
 */
export type RpaKeywordStatus = "PASS" | "FAIL" | "SKIP";

// Workflow Types

/**
 * RPA workflow list item.
 */
export interface RpaWorkflowListItem {
  id: string;
  name: string;
  description: string | null;
  tags: string[];
  isTemplate: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  _count?: {
    executions: number;
    schedules: number;
  };
}

/**
 * Full RPA workflow with all details.
 */
export interface RpaWorkflow extends RpaWorkflowListItem {
  robotCode: string;
  variables: Record<string, unknown>;
  libraries?: Array<{
    id: string;
    library: RpaKeywordLibrary;
  }>;
}

/**
 * RPA workflow creation payload.
 */
export interface RpaWorkflowCreatePayload {
  name: string;
  description?: string;
  robotCode: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  isTemplate?: boolean;
  libraryIds?: string[];
}

/**
 * RPA workflow update payload.
 */
export interface RpaWorkflowUpdatePayload {
  name?: string;
  description?: string;
  robotCode?: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  isTemplate?: boolean;
  libraryIds?: string[];
}

// Execution Types

/**
 * RPA execution list item.
 */
export interface RpaExecutionListItem {
  id: string;
  workflowId: string;
  status: RpaExecutionStatus;
  triggerType: RpaTriggerType;
  triggeredBy: string;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  workflow?: {
    id: string;
    name: string;
  };
  _count?: {
    keywordLogs: number;
  };
}

/**
 * Full RPA execution with all details.
 */
export interface RpaExecution extends RpaExecutionListItem {
  variables: Record<string, unknown>;
  output: unknown | null;
  logs: unknown | null;
  errorMessage: string | null;
  jobId: string | null;
  keywordLogs?: RpaKeywordLog[];
}

/**
 * RPA execution creation payload.
 */
export interface RpaExecutionCreatePayload {
  triggerType?: RpaTriggerType;
  variables?: Record<string, unknown>;
  idempotencyKey?: string;
  logLevel?: RpaLogLevel;
}

// Training Handoff Types

/** Inferred type from the RpaTrainingHandoffRequest schema. */
export type RpaTrainingHandoffRequest = Static<typeof RpaTrainingHandoffRequestSchema>;
/** Inferred type from the RpaTrainingHandoffPreview schema. */
export type RpaTrainingHandoffPreview = Static<typeof RpaTrainingHandoffPreviewSchema>;
/** Inferred type from the RpaTrainingHandoffResponse schema. */
export type RpaTrainingHandoffResponse = Static<typeof RpaTrainingHandoffResponseSchema>;

// Keyword Types

/**
 * RPA keyword log entry.
 */
export interface RpaKeywordLog {
  id: string;
  executionId: string;
  keywordName: string;
  libraryName: string;
  arguments: unknown[];
  status: RpaKeywordStatus;
  message: string | null;
  duration: number | null;
  timestamp: string;
}

/**
 * RPA keyword library.
 */
export interface RpaKeywordLibrary {
  id: string;
  name: string;
  version: string | null;
  description: string | null;
  docUrl: string | null;
  isBuiltin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * RPA keyword info from bunbuddy.
 */
export interface RpaKeywordInfo {
  name: string;
  arguments: string[];
  documentation: string;
  tags: string[];
}

/**
 * RPA library info from bunbuddy.
 */
export interface RpaLibraryInfo {
  name: string;
  version: string;
  scope: string;
  keywords: RpaKeywordInfo[];
}

/**
 * RPA keyword execution request.
 */
export interface RpaKeywordExecutePayload {
  libraryName: string;
  keywordName: string;
  arguments?: unknown[];
  kwargs?: Record<string, unknown>;
}

/**
 * RPA keyword execution result.
 */
export interface RpaKeywordResult {
  status: RpaKeywordStatus;
  returnValue: unknown;
  duration: number;
  error?: string;
}

// Schedule Types

/**
 * RPA schedule.
 */
export interface RpaSchedule {
  id: string;
  workflowId: string;
  name: string;
  cronExpression: string;
  timezone: string;
  variables: Record<string, unknown>;
  isActive: boolean;
  lastRunAt: string | null;
  nextRunAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * RPA schedule creation payload.
 */
export interface RpaScheduleCreatePayload {
  cronExpr: string;
  timezone?: string;
  variables?: Record<string, unknown>;
  isActive?: boolean;
}

// Validation & Generation Types

/**
 * RPA code validation request.
 */
export interface RpaCodeValidatePayload {
  code: string;
}

/**
 * RPA code validation result.
 */
export interface RpaCodeValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * RPA AI generation request.
 */
export interface RpaAiGeneratePayload {
  description: string;
  templateId?: string;
  includeLibraries?: string[];
  context?: Record<string, unknown>;
}

/**
 * RPA AI generation result.
 */
export interface RpaAiGenerationResult {
  robotCode: string;
  explanation: string;
  suggestedName: string;
  suggestedTags: string[];
}

// BunBuddy Health Types

export type { RpaBunBuddyHealth } from "@baohaus/bao-schemas/rpa.schemas";

// Response Types

/**
 * RPA workflow list response.
 */
export interface RpaWorkflowListResponse {
  ok: boolean;
  data: RpaWorkflowListItem[];
  count: number;
  hasMore: boolean;
  timestamp: string;
}

/**
 * RPA execution list response.
 */
export interface RpaExecutionListResponse {
  ok: boolean;
  data: RpaExecutionListItem[];
  count: number;
  hasMore: boolean;
  timestamp: string;
}

/**
 * RPA library list response.
 */
export interface RpaLibraryListResponse {
  ok: boolean;
  data: Array<RpaKeywordLibrary & { available: boolean; bunbuddyVersion?: string }>;
  count: number;
  timestamp: string;
}

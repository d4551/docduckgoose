/**
 * Workflow, case status, and priority accessor helpers.
 * Extracted from status.ts to keep module size under 400 lines.
 *
 * @baohaus/bao-utils/status-accessors
 */

import type {
  CaseStatus,
  CaseStatusConfigEntry,
  PriorityConfigEntry,
  PriorityLevel,
  WorkflowConfigEntry,
  WorkflowState,
} from "./status-config";
import {
  CASE_STATUS_CONFIG,
  CASE_STATUSES,
  PRIORITY_CONFIG,
  PRIORITY_LABEL_ALIASES,
  PRIORITY_LEVELS,
  WORKFLOW_CONFIG,
  WORKFLOW_STATES,
} from "./status-config";

const WORKFLOW_STATE_VALUES = Object.values(WORKFLOW_STATES) as WorkflowState[];
const CASE_STATUS_VALUES = Object.values(CASE_STATUSES) as CaseStatus[];

export function normalizeStatus(value: unknown): string {
  const status = String(value ?? "")
    .toLowerCase()
    .trim();
  if (!status || status === "undefined" || status === "null") {
    return "";
  }
  return status;
}

function resolveWorkflowState(state: string | WorkflowState): WorkflowState {
  const normalized = normalizeStatus(state).replace(/\s+/g, "-") as WorkflowState;
  return WORKFLOW_STATE_VALUES.includes(normalized) ? normalized : WORKFLOW_STATES.RECEIVED;
}

export function normalizeCaseStatus(status: string | CaseStatus): CaseStatus {
  const normalized = normalizeStatus(status).replace(/\s+/g, "-");
  return CASE_STATUS_VALUES.includes(normalized as CaseStatus)
    ? (normalized as CaseStatus)
    : CASE_STATUSES.PENDING;
}

export function normalizeCaseStatusCounts(
  counts: Record<string, number> | null | undefined,
): Record<CaseStatus, number> {
  const normalized: Record<CaseStatus, number> = {
    [CASE_STATUSES.PENDING]: 0,
    [CASE_STATUSES.IN_PROGRESS]: 0,
    [CASE_STATUSES.COMPLETED]: 0,
    [CASE_STATUSES.CANCELLED]: 0,
    [CASE_STATUSES.ARCHIVED]: 0,
  };
  if (!counts) {
    return normalized;
  }
  for (const [key, value] of Object.entries(counts)) {
    const normalizedKey = normalizeCaseStatus(key);
    const safeValue = Number.isFinite(value) ? value : 0;
    normalized[normalizedKey] += safeValue;
  }
  return normalized;
}

export function getWorkflowConfig(state: string | WorkflowState): WorkflowConfigEntry {
  const key = resolveWorkflowState(state);
  return WORKFLOW_CONFIG[key];
}

export function getWorkflowLabel(state: string | WorkflowState): string {
  return getWorkflowConfig(state).label;
}

export function getWorkflowBadgeClass(state: string | WorkflowState): string {
  return getWorkflowConfig(state).badge;
}

export function getWorkflowColor(state: string | WorkflowState): string {
  return getWorkflowConfig(state).color;
}

export function getWorkflowIcon(state: string | WorkflowState): string {
  return getWorkflowConfig(state).icon;
}

export function getCaseStatusConfig(status: string | CaseStatus): CaseStatusConfigEntry {
  const key = normalizeCaseStatus(status);
  return CASE_STATUS_CONFIG[key];
}

export function getCaseStatusLabel(status: string | CaseStatus): string {
  return getCaseStatusConfig(status).label;
}

export function getCaseStatusBadgeClass(status: string | CaseStatus): string {
  return getCaseStatusConfig(status).badge;
}

export function getCaseStatusColor(status: string | CaseStatus): string {
  return getCaseStatusConfig(status).color;
}

export function getCaseStatusIcon(status: string | CaseStatus): string {
  return getCaseStatusConfig(status).icon;
}

export function getPriorityConfig(level: string | number | PriorityLevel): PriorityConfigEntry {
  if (typeof level === "string") {
    const normalized = normalizeStatus(level);
    const alias = PRIORITY_LABEL_ALIASES[normalized] ?? normalized;
    const match = Object.values(PRIORITY_CONFIG).find((config) => config.labelKey === alias);
    return match || PRIORITY_CONFIG[PRIORITY_LEVELS.ROUTINE];
  }
  const numericLevel = Number(level);
  return PRIORITY_CONFIG[numericLevel as PriorityLevel] || PRIORITY_CONFIG[PRIORITY_LEVELS.ROUTINE];
}

export function getPriorityLabel(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).label;
}

export function getPriorityBadgeClass(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).badge || "badge-outline";
}

export function getPriorityColor(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).color;
}

export function getPriorityIcon(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).icon;
}

export function getStatusFromWorkflowState(state: string | WorkflowState): CaseStatus {
  const workflowState = resolveWorkflowState(state);
  switch (workflowState) {
    case WORKFLOW_STATES.RECEIVED:
      return CASE_STATUSES.PENDING;
    case WORKFLOW_STATES.GROSSING:
    case WORKFLOW_STATES.PROCESSING:
    case WORKFLOW_STATES.EMBEDDING:
    case WORKFLOW_STATES.SECTIONING:
    case WORKFLOW_STATES.STAINING:
    case WORKFLOW_STATES.SCANNING:
    case WORKFLOW_STATES.ANALYSIS:
    case WORKFLOW_STATES.REVIEW:
      return CASE_STATUSES.IN_PROGRESS;
    case WORKFLOW_STATES.SIGNOUT:
    case WORKFLOW_STATES.COMPLETED:
      return CASE_STATUSES.COMPLETED;
    case WORKFLOW_STATES.CANCELLED:
      return CASE_STATUSES.CANCELLED;
    case WORKFLOW_STATES.ARCHIVED:
      return CASE_STATUSES.ARCHIVED;
    default:
      return CASE_STATUSES.PENDING;
  }
}

export function getPriorityLevelFromLabel(labelKey: string): PriorityLevel {
  const config = getPriorityConfig(labelKey);
  return ((config.order ?? 1) - 1) as PriorityLevel;
}

export function getPriorityLabelKeyFromLevel(level: string | number | PriorityLevel): string {
  return getPriorityConfig(level).labelKey;
}

export function canTransition(
  fromState: string | WorkflowState,
  toState: string | WorkflowState,
): boolean {
  const fromConfig = getWorkflowConfig(fromState);
  const target = resolveWorkflowState(toState);
  return fromConfig.canTransitionTo.includes(target);
}

export function getAvailableTransitions(state: string | WorkflowState): WorkflowState[] {
  return getWorkflowConfig(state).canTransitionTo;
}

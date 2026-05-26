/**
 * Workflow state configuration and helpers.
 * Extracted from status.ts to keep module size under 400 lines.
 *
 * @baohaus/bao-utils/status-workflow
 */

export const WORKFLOW_STATES: {
  readonly RECEIVED: "received";
  readonly GROSSING: "grossing";
  readonly PROCESSING: "processing";
  readonly EMBEDDING: "embedding";
  readonly SECTIONING: "sectioning";
  readonly STAINING: "staining";
  readonly SCANNING: "scanning";
  readonly ANALYSIS: "analysis";
  readonly REVIEW: "review";
  readonly SIGNOUT: "signout";
  readonly COMPLETED: "completed";
  readonly ARCHIVED: "archived";
  readonly CANCELLED: "cancelled";
} = {
  RECEIVED: "received",
  GROSSING: "grossing",
  PROCESSING: "processing",
  EMBEDDING: "embedding",
  SECTIONING: "sectioning",
  STAINING: "staining",
  SCANNING: "scanning",
  ANALYSIS: "analysis",
  REVIEW: "review",
  SIGNOUT: "signout",
  COMPLETED: "completed",
  ARCHIVED: "archived",
  CANCELLED: "cancelled",
} as const;

export type WorkflowState = (typeof WORKFLOW_STATES)[keyof typeof WORKFLOW_STATES];

export interface WorkflowConfigEntry {
  label: string;
  description: string;
  color: string;
  icon: string;
  badge: string;
  order: number;
  canTransitionTo: WorkflowState[];
  requiredFields: string[];
}

export const WORKFLOW_CONFIG: Record<WorkflowState, WorkflowConfigEntry> = {
  [WORKFLOW_STATES.RECEIVED]: {
    label: "Received",
    description: "Case received and accessioned",
    color: "gray",
    icon: "inbox",
    badge: "badge-outline",
    order: 1,
    canTransitionTo: ["grossing", "processing", "analysis", "cancelled"],
    requiredFields: ["specimenType"],
  },
  [WORKFLOW_STATES.GROSSING]: {
    label: "Studio",
    description: "Studio imaging and description",
    color: "blue",
    icon: "beaker",
    badge: "badge-info",
    order: 2,
    requiredFields: ["clinicalHistory", "grossDescription"],
    canTransitionTo: ["processing", "analysis", "cancelled"],
  },
  [WORKFLOW_STATES.PROCESSING]: {
    label: "Processing",
    description: "Tissue processing and fixation",
    color: "yellow",
    icon: "cog",
    badge: "badge-warning",
    order: 3,
    requiredFields: [],
    canTransitionTo: ["embedding", "sectioning", "cancelled"],
  },
  [WORKFLOW_STATES.EMBEDDING]: {
    label: "Embedding",
    description: "Tissue embedding in paraffin",
    color: "orange",
    icon: "cube",
    badge: "badge-warning",
    order: 4,
    requiredFields: [],
    canTransitionTo: ["sectioning", "staining", "cancelled"],
  },
  [WORKFLOW_STATES.SECTIONING]: {
    label: "Sectioning",
    description: "Microtome sectioning",
    color: "purple",
    icon: "scissors",
    badge: "badge-secondary",
    order: 5,
    requiredFields: [],
    canTransitionTo: ["staining", "scanning", "cancelled"],
  },
  [WORKFLOW_STATES.STAINING]: {
    label: "Staining",
    description: "Histochemical staining",
    color: "pink",
    icon: "paint-brush",
    badge: "badge-primary",
    order: 6,
    requiredFields: [],
    canTransitionTo: ["scanning", "analysis", "cancelled"],
  },
  [WORKFLOW_STATES.SCANNING]: {
    label: "Scanning",
    description: "Digital slide scanning",
    color: "indigo",
    icon: "camera",
    badge: "badge-primary",
    order: 7,
    requiredFields: [],
    canTransitionTo: ["analysis", "review", "cancelled"],
  },
  [WORKFLOW_STATES.ANALYSIS]: {
    label: "AI Analysis",
    description: "AI-powered analysis",
    color: "green",
    icon: "cpu-chip",
    badge: "badge-success",
    order: 8,
    requiredFields: ["diagnosis"],
    canTransitionTo: ["review", "signout", "cancelled"],
  },
  [WORKFLOW_STATES.REVIEW]: {
    label: "Pathologist Review",
    description: "Pathologist microscopic review",
    color: "red",
    icon: "eye",
    badge: "badge-error",
    order: 9,
    requiredFields: ["microscopicDescription"],
    canTransitionTo: ["signout", "completed", "cancelled"],
  },
  [WORKFLOW_STATES.SIGNOUT]: {
    label: "Sign-out",
    description: "Final sign-out and reporting",
    color: "teal",
    icon: "check-circle",
    badge: "badge-success",
    order: 10,
    requiredFields: ["diagnosis"],
    canTransitionTo: ["completed", "archived"],
  },
  [WORKFLOW_STATES.COMPLETED]: {
    label: "Completed",
    description: "Case completed and finalized",
    color: "green",
    icon: "check-circle",
    badge: "badge-success",
    order: 11,
    requiredFields: [],
    canTransitionTo: ["archived"],
  },
  [WORKFLOW_STATES.ARCHIVED]: {
    label: "Archived",
    description: "Case archived for storage",
    color: "gray",
    icon: "archive-box",
    badge: "badge-outline",
    order: 12,
    requiredFields: [],
    canTransitionTo: [],
  },
  [WORKFLOW_STATES.CANCELLED]: {
    label: "Cancelled",
    description: "Case cancelled or withdrawn",
    color: "red",
    icon: "x-circle",
    badge: "badge-error",
    order: 13,
    requiredFields: [],
    canTransitionTo: [],
  },
};

export type CaseStatus = "pending" | "in-progress" | "completed" | "cancelled" | "archived";

export const CASE_STATUSES: {
  readonly PENDING: "pending";
  readonly IN_PROGRESS: "in-progress";
  readonly COMPLETED: "completed";
  readonly CANCELLED: "cancelled";
  readonly ARCHIVED: "archived";
} = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  ARCHIVED: "archived",
} as const;

export interface CaseStatusConfigEntry {
  label: string;
  description: string;
  color: string;
  icon: string;
  badge: string;
  order: number;
}

export const CASE_STATUS_CONFIG: Record<CaseStatus, CaseStatusConfigEntry> = {
  [CASE_STATUSES.PENDING]: {
    label: "Pending",
    description: "Case is pending initial processing",
    color: "gray",
    icon: "clock",
    badge: "badge-outline",
    order: 1,
  },
  [CASE_STATUSES.IN_PROGRESS]: {
    label: "In Progress",
    description: "Case is actively being processed",
    color: "blue",
    icon: "arrow-path",
    badge: "badge-info",
    order: 2,
  },
  [CASE_STATUSES.COMPLETED]: {
    label: "Completed",
    description: "Case has been completed",
    color: "green",
    icon: "check-circle",
    badge: "badge-success",
    order: 3,
  },
  [CASE_STATUSES.CANCELLED]: {
    label: "Cancelled",
    description: "Case has been cancelled",
    color: "red",
    icon: "x-circle",
    badge: "badge-error",
    order: 4,
  },
  [CASE_STATUSES.ARCHIVED]: {
    label: "Archived",
    description: "Case has been archived",
    color: "gray",
    icon: "archive-box",
    badge: "badge-outline",
    order: 5,
  },
};

export const PRIORITY_LEVELS: {
  readonly ROUTINE: 0;
  readonly PRIORITY: 1;
  readonly URGENT: 2;
  readonly STAT: 3;
} = {
  ROUTINE: 0,
  PRIORITY: 1,
  URGENT: 2,
  STAT: 3,
} as const;

export type PriorityLevel = (typeof PRIORITY_LEVELS)[keyof typeof PRIORITY_LEVELS];

export interface PriorityConfigEntry {
  label: string;
  labelKey: "routine" | "priority" | "urgent" | "stat";
  description: string;
  color: string;
  icon: string;
  badge: string;
  order: number;
  urgency: "low" | "medium" | "high";
}

export const PRIORITY_CONFIG: Record<PriorityLevel, PriorityConfigEntry> = {
  [PRIORITY_LEVELS.ROUTINE]: {
    label: "Routine",
    labelKey: "routine",
    description: "Routine processing (24-72 hours)",
    color: "gray",
    icon: "clock",
    badge: "badge-neutral",
    order: 1,
    urgency: "low",
  },
  [PRIORITY_LEVELS.PRIORITY]: {
    label: "Priority",
    labelKey: "priority",
    description: "Priority processing (12-24 hours)",
    color: "blue",
    icon: "flag",
    badge: "badge-info",
    order: 2,
    urgency: "medium",
  },
  [PRIORITY_LEVELS.URGENT]: {
    label: "Urgent",
    labelKey: "urgent",
    description: "Expedited processing (4-12 hours)",
    color: "orange",
    icon: "exclamation-triangle",
    badge: "badge-warning",
    order: 3,
    urgency: "medium",
  },
  [PRIORITY_LEVELS.STAT]: {
    label: "STAT",
    labelKey: "stat",
    description: "Immediate processing (same day)",
    color: "red",
    icon: "bolt",
    badge: "badge-error",
    order: 4,
    urgency: "high",
  },
};

export const PRIORITY_LABEL_ALIASES: Record<string, PriorityConfigEntry["labelKey"]> = {
  normal: "routine",
  low: "routine",
  medium: "priority",
  high: "urgent",
  critical: "stat",
};

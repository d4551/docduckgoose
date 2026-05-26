/**
 * Pathology workflow state taxonomy, configuration, and transition helpers.
 */

import { normalizeStatus } from "./normalize";

/**
 * Enumerable states for the main pathology workflow.
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

/** Inferred type from the WorkflowState schema. */
export type WorkflowState = (typeof WORKFLOW_STATES)[keyof typeof WORKFLOW_STATES];

/**
 * Configuration definition for a workflow state.
 */
export interface WorkflowConfigEntry {
  /** Display label for the state */
  label: string;
  /** Detailed description of the state */
  description: string;
  /** UI color associated with the state */
  color: string;
  /** Icon name associated with the state */
  icon: string;
  /** DaisyUI badge class for the state */
  badge: string;
  /** Sort order for the state in lists */
  order: number;
  /** List of valid states that can follow this one */
  canTransitionTo: WorkflowState[];
  /** Fields required to be present when entering this state */
  requiredFields: string[];
}

/** WORKFLOW_CONFIG constant. */
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

const WORKFLOW_STATE_VALUES = Object.values(WORKFLOW_STATES) as WorkflowState[];

/**
 * Normalize workflow state input to a known workflow state.
 *
 * Internal: shared with derivation helpers. Not part of the public surface
 * re-exported from `../status.ts`.
 *
 * @param state - Workflow state input.
 * @returns Normalized workflow state.
 */
export function resolveWorkflowState(state: string | WorkflowState): WorkflowState {
  const normalized = normalizeStatus(state).replace(/\s+/g, "-") as WorkflowState;
  return WORKFLOW_STATE_VALUES.includes(normalized) ? normalized : WORKFLOW_STATES.RECEIVED;
}

/**
 * Retrieves the configuration entry for a specific workflow state.
 *
 * @param state - The workflow state
 * @returns Config object for the state
 */
export function getWorkflowConfig(state: string | WorkflowState): WorkflowConfigEntry {
  const key = resolveWorkflowState(state);
  return WORKFLOW_CONFIG[key];
}

/**
 * Get the display label for a workflow state.
 *
 * @param state - Workflow state input.
 * @returns Workflow state label.
 */
export function getWorkflowLabel(state: string | WorkflowState): string {
  return getWorkflowConfig(state).label;
}

/**
 * Get the badge class for a workflow state.
 *
 * @param state - Workflow state input.
 * @returns DaisyUI badge class.
 */
export function getWorkflowBadgeClass(state: string | WorkflowState): string {
  return getWorkflowConfig(state).badge;
}

/**
 * Get the color token for a workflow state.
 *
 * @param state - Workflow state input.
 * @returns Workflow state color.
 */
export function getWorkflowColor(state: string | WorkflowState): string {
  return getWorkflowConfig(state).color;
}

/**
 * Get the icon name for a workflow state.
 *
 * @param state - Workflow state input.
 * @returns Icon name.
 */
export function getWorkflowIcon(state: string | WorkflowState): string {
  return getWorkflowConfig(state).icon;
}

/**
 * Checks if a transition from one workflow state to another is valid.
 *
 * @param fromState - Starting state
 * @param toState - Target state
 * @returns True if transition is allowed
 */
export function canTransition(
  fromState: string | WorkflowState,
  toState: string | WorkflowState,
): boolean {
  const fromConfig = getWorkflowConfig(fromState);
  const target = resolveWorkflowState(toState);
  return fromConfig.canTransitionTo.includes(target);
}

/**
 * Get allowed workflow transitions for a given state.
 *
 * @param state - Workflow state input.
 * @returns List of allowed next states.
 */
export function getAvailableTransitions(state: string | WorkflowState): WorkflowState[] {
  return getWorkflowConfig(state).canTransitionTo;
}

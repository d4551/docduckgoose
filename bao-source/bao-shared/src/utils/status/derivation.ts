/**
 * Cross-category derivations between workflow and case status.
 */

import { CASE_STATUSES, type CaseStatus } from "./case";
import { resolveWorkflowState, WORKFLOW_STATES, type WorkflowState } from "./workflow";

/**
 * Derives the overall case status from a granular workflow state.
 * Useful for summarizing progress.
 *
 * @param state - Workflow state
 * @returns The corresponding high-level case status
 */
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

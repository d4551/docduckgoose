/**
 * User + robotics operations snapshot types.
 *
 * Defines the contract for the user + robotics ops BFF payload used by
 * unified operations pages.
 *
 * @shared/types/user-robotics-ops.ts
 */

import type {
  ChatIntegrationContext,
  ChatIntegrationContextSummary,
} from "./integration-context.ts";

/**
 * Device assignment payload for user + robotics operations.
 */
export interface UserRoboticsOpsAssignment {
  id: string;
  deviceId: string | null;
  deviceType: string | null;
  role: string | null;
  assignedBy: string | null;
  active: boolean | null;
  updatedAt: string | null;
}

/**
 * Assignment operator metadata for user + robotics operations.
 */
export interface UserRoboticsOpsAssignmentUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  role: string | null;
  active: boolean | null;
  initials: string | null;
  image: string | null;
}

/**
 * User + robotics operations BFF response payload.
 */
export interface UserRoboticsOpsResponse {
  ok: true;
  integration: ChatIntegrationContext;
  summary: ChatIntegrationContextSummary;
  assignments: UserRoboticsOpsAssignment[];
  assignmentUsers: Record<string, UserRoboticsOpsAssignmentUser>;
  timestamp: string;
}

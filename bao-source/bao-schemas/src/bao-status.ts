/**
 * Shared job state and policy values — canonical `as const` objects.
 *
 * Used across ward-wonton, bao-boss, and queue-bao Prisma schemas.
 * Replaces all duplicate Prisma native `enum` blocks.
 *
 * Usage with TypeBox:
 *   stringEnum(Object.values(JOB_STATE))
 *
 * @shared/schemas/bao-status
 */

export const JOB_STATE = {
  Created: "created",
  Active: "active",
  Completed: "completed",
  Cancelled: "cancelled",
  Failed: "failed",
} as const;

export type JobState = (typeof JOB_STATE)[keyof typeof JOB_STATE];

export const QUEUE_POLICY = {
  Standard: "standard",
  Short: "short",
  Singleton: "singleton",
  Stately: "stately",
} as const;

export type QueuePolicy = (typeof QUEUE_POLICY)[keyof typeof QUEUE_POLICY];

export const BAO_JOB_STATE = {
  Pending: "pending",
  Validating: "validating",
  Installing: "installing",
  Mounting: "mounting",
  Completed: "completed",
  Failed: "failed",
  Cancelled: "cancelled",
} as const;

export type BaoJobState = (typeof BAO_JOB_STATE)[keyof typeof BAO_JOB_STATE];

export const BAO_POLICY = {
  Allow: "allow",
  Deny: "deny",
  Audit: "audit",
} as const;

export type BaoPolicy = (typeof BAO_POLICY)[keyof typeof BAO_POLICY];

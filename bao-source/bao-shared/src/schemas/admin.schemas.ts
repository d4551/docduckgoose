/**
 * Administrative Schemas
 *
 * Defines type-safe models for administrative operations including audit logging,
 * system configuration, and administrative actions. These schemas ensure consistent
 * handling of administrative data across the application.
 *
 * @shared/schemas/admin.ts
 *
 * @remarks
 * This module previously exported runtime schemas for admin API validation.
 * Runtime validation is now handled at the API boundary using Elysia route schemas.
 * These TypeScript types provide compile-time type safety for admin operations.
 *
 * @example
 * ```typescript
 * import { AdminAuditEvent } from '@baohaus/bao-schemas/admin.ts';
 *
 * const auditEvent: AdminAuditEvent = {
 *   id: '550e8400-e29b-41d4-a716-446655440000',
 *   timestamp: '2024-01-15T10:30:00Z',
 *   actor: 'admin@hospital.org',
 *   action: 'user.role.updated',
 *   target: 'user:12345',
 *   metadata: { oldRole: 'viewer', newRole: 'pathologist' }
 * };
 * ```
 */

/**
 * Administrative audit event record
 *
 * AdminAuditEvent
 *
 * @description
 * Represents a single audit log entry for administrative actions. Used for
 * compliance, security monitoring, and troubleshooting administrative operations.
 * All administrative actions should generate audit events for accountability.
 *
 * @example
 * ```typescript
 * const event: AdminAuditEvent = {
 *   id: '550e8400-e29b-41d4-a716-446655440000',
 *   timestamp: '2024-01-15T10:30:00Z',
 *   actor: 'admin@hospital.org',
 *   action: 'system.settings.updated',
 *   target: 'settings:global',
 *   metadata: {
 *     setting: 'maxFileSize',
 *     oldValue: '100MB',
 *     newValue: '200MB'
 *   }
 * };
 * ```
 */
export interface AdminAuditEvent {
  /** Unique audit event identifier (UUID) */
  id: string;
  /** ISO 8601 timestamp when the event occurred */
  timestamp: string;
  /** User or system identifier who performed the action */
  actor?: string;
  /** Action type in dot notation (e.g., 'user.created', 'system.shutdown') */
  action: string;
  /** Resource or entity that was affected by the action */
  target?: string;
  /** Additional context-specific data about the event */
  metadata?: Record<string, unknown>;
}

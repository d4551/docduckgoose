/**
 * Shared notification API types.
 *
 * These types describe the server-backed notification shapes returned by
 * `GET /api/v1/notifications` and related endpoints.
 *
 * Keep these in shared types to avoid duplicating the same response shapes
 * across client composables, stores, and UI code.
 *
 * @shared/types/notifications
 */

/**
 * Notification item returned by the notifications API.
 */
export interface NotificationItem {
  /** Unique notification identifier. */
  id: string;
  /** Notification type/category (e.g. info, warning, error). */
  type: string | null;
  /** Short title displayed in notification lists. */
  title: string | null;
  /** Message body for the notification. */
  message: string | null;
  /** Whether the notification has been read. */
  read: boolean;
  /** ISO timestamp of creation. */
  createdAt: string;
  /** Optional URL for a follow-up action. */
  actionUrl?: string | null;
}

/**
 * Notifications list response envelope.
 */
export interface NotificationsListResponse {
  /** True when the server successfully returned the list. */
  ok: true;
  /** Notification items ordered by the server (usually newest-first). */
  notifications: NotificationItem[];
  /** ISO timestamp captured by the server when the list was generated. */
  timestamp: string;
}

/**
 * Enterprise-specific status class maps.
 *
 * Domain-specific status mappings for enterprise features:
 * - Chat bubble styling
 * - Enterprise operational status
 * - Activity type indicators
 * - Quota status
 * - Pipeline status
 * - Capability health status
 * - Boolean status helpers
 *
 * Generic component maps (dock, list, dropdown, fab, skeleton, stack, join,
 * divider, indicator, drawer, progress, radial-progress, stats, steps, tab,
 * notification, filter, radio, range, form hints) live in their respective
 * domain files (layout-maps.ts, input-maps.ts) and are re-exported via the barrel.
 *
 * libs/shared/src/ui/class-maps/status-maps-enterprise.ts
 */

// Chat Component (DaisyUI 5)
// @see https://daisyui.com/components/chat/

/** DaisyUI base class for chat component. */
export const CHAT_CLASS = "chat";
/** DaisyUI part class for chat bubble. */
export const CHAT_BUBBLE_CLASS = "chat-bubble";
/** DaisyUI part class for chat header. */
export const CHAT_HEADER_CLASS = "chat-header";
/** DaisyUI part class for chat footer. */
export const CHAT_FOOTER_CLASS = "chat-footer";
/** DaisyUI part class for chat image. */
export const CHAT_IMAGE_CLASS = "chat-image";

/** DaisyUI placement mapping for chat position. */
export const CHAT_POSITION_MAP: { readonly start: "chat-start"; readonly end: "chat-end" } = {
  start: "chat-start",
  end: "chat-end",
} as const;

/** Type alias for ChatPosition keys. */
export type ChatPosition = keyof typeof CHAT_POSITION_MAP;

/** DaisyUI color mapping for chat bubble. */
export const CHAT_BUBBLE_COLOR_MAP: {
  readonly neutral: "chat-bubble-neutral";
  readonly primary: "chat-bubble-primary";
  readonly secondary: "chat-bubble-secondary";
  readonly accent: "chat-bubble-accent";
  readonly info: "chat-bubble-info";
  readonly success: "chat-bubble-success";
  readonly warning: "chat-bubble-warning";
  readonly error: "chat-bubble-error";
} = {
  neutral: "chat-bubble-neutral",
  primary: "chat-bubble-primary",
  secondary: "chat-bubble-secondary",
  accent: "chat-bubble-accent",
  info: "chat-bubble-info",
  success: "chat-bubble-success",
  warning: "chat-bubble-warning",
  error: "chat-bubble-error",
} as const;

/** Type alias for ChatBubbleColor keys. */
export type ChatBubbleColor = keyof typeof CHAT_BUBBLE_COLOR_MAP;

/**
 * Get chat position class from position token.
 *
 * @param position - Chat position token.
 * @returns DaisyUI class for the requested position.
 */
export function getChatPositionClass(position: ChatPosition | string): string {
  return CHAT_POSITION_MAP[position as ChatPosition] || CHAT_POSITION_MAP.start;
}

/**
 * Get chat bubble color class from color token.
 *
 * @param color - Chat bubble color token.
 * @returns DaisyUI class for the requested color.
 */
export function getChatBubbleColorClass(color: ChatBubbleColor | string): string {
  return CHAT_BUBBLE_COLOR_MAP[color as ChatBubbleColor] || "";
}

// Enterprise Status Component
// Operational, maintenance, incident, compliance, approval statuses

/** Enterprise status configuration mapping. */
export const ENTERPRISE_STATUS_MAP = {
  operational: {
    badge: "badge-success",
    dot: "status-success",
    icon: "lucide--check-circle",
    label: "Operational",
  },
  maintenance: {
    badge: "badge-warning",
    dot: "status-warning",
    icon: "lucide--wrench",
    label: "Maintenance",
  },
  incident: {
    badge: "badge-error",
    dot: "status-error",
    icon: "lucide--alert-circle",
    label: "Incident",
  },
  degraded: {
    badge: "badge-warning",
    dot: "status-warning",
    icon: "lucide--alert-triangle",
    label: "Degraded",
  },
  compliant: {
    badge: "badge-success",
    dot: "status-success",
    icon: "lucide--shield-check",
    label: "Compliant",
  },
  non_compliant: {
    badge: "badge-error",
    dot: "status-error",
    icon: "lucide--shield-alert",
    label: "Non-Compliant",
  },
  review: {
    badge: "badge-info",
    dot: "status-info",
    icon: "lucide--clipboard-check",
    label: "Under Review",
  },
  pending_approval: {
    badge: "badge-warning",
    dot: "status-warning",
    icon: "lucide--clock",
    label: "Pending Approval",
  },
  archived: {
    badge: "badge-neutral",
    dot: "status-neutral",
    icon: "lucide--archive",
    label: "Archived",
  },
  unknown: {
    badge: "badge-ghost",
    dot: "status-neutral",
    icon: "lucide--help-circle",
    label: "Unknown",
  },
} as const;

/** Type alias for EnterpriseStatus keys. */
export type EnterpriseStatus = keyof typeof ENTERPRISE_STATUS_MAP;

/**
 * Get enterprise status configuration from status key.
 *
 * @param status - Enterprise status key.
 * @returns Status configuration object with badge, dot, icon, and label.
 */
export function getEnterpriseStatusConfig(
  status: EnterpriseStatus | string,
): (typeof ENTERPRISE_STATUS_MAP)[EnterpriseStatus] {
  return ENTERPRISE_STATUS_MAP[status as EnterpriseStatus] || ENTERPRISE_STATUS_MAP.unknown;
}

/** Get enterprise badge class from status key. */
export function getEnterpriseStatusBadgeClass(status: EnterpriseStatus | string): string {
  return getEnterpriseStatusConfig(status).badge;
}

/** Get enterprise status dot class from status key. */
export function getEnterpriseStatusDotClass(status: EnterpriseStatus | string): string {
  return getEnterpriseStatusConfig(status).dot;
}

/** Get enterprise status icon class from status key. */
export function getEnterpriseStatusIconClass(status: EnterpriseStatus | string): string {
  return getEnterpriseStatusConfig(status).icon;
}

// Activity Type Component
// Timeline activity types with text color, icon, line color, and status

/** Activity type text color mapping. */
export const ACTIVITY_TYPE_TEXT_COLOR_MAP: {
  readonly case_created: "text-primary";
  readonly case_updated: "text-warning";
  readonly image_uploaded: "text-info";
  readonly analysis_completed: "text-secondary";
  readonly annotation_added: "text-accent";
  readonly pipeline_run: "text-success";
} = {
  case_created: "text-primary",
  case_updated: "text-warning",
  image_uploaded: "text-info",
  analysis_completed: "text-secondary",
  annotation_added: "text-accent",
  pipeline_run: "text-success",
} as const;

/** Type alias for ActivityType keys. */
export type ActivityType = keyof typeof ACTIVITY_TYPE_TEXT_COLOR_MAP;

/** Get text color class for activity type. */
export function getActivityTypeTextClass(type: string): string {
  return ACTIVITY_TYPE_TEXT_COLOR_MAP[type as ActivityType] ?? "text-base-content/60";
}

/** Activity type icon mapping. */
export const ACTIVITY_TYPE_ICON_MAP: {
  readonly case_created: "lucide--file-plus";
  readonly case_updated: "lucide--file-pen";
  readonly image_uploaded: "lucide--image-plus";
  readonly analysis_completed: "lucide--brain-circuit";
  readonly annotation_added: "lucide--pen-tool";
  readonly pipeline_run: "lucide--workflow";
} = {
  case_created: "lucide--file-plus",
  case_updated: "lucide--file-pen",
  image_uploaded: "lucide--image-plus",
  analysis_completed: "lucide--brain-circuit",
  annotation_added: "lucide--pen-tool",
  pipeline_run: "lucide--workflow",
} as const;

/** Get icon class for activity type. */
export function getActivityTypeIcon(type: string): string {
  return ACTIVITY_TYPE_ICON_MAP[type as ActivityType] ?? "lucide--activity";
}

/** Activity type timeline line color mapping for DaisyUI 5 colorful timeline. */
export const ACTIVITY_TYPE_LINE_COLOR_MAP: {
  readonly case_created: "bg-primary";
  readonly case_updated: "bg-warning";
  readonly image_uploaded: "bg-info";
  readonly analysis_completed: "bg-secondary";
  readonly annotation_added: "bg-accent";
  readonly pipeline_run: "bg-success";
} = {
  case_created: "bg-primary",
  case_updated: "bg-warning",
  image_uploaded: "bg-info",
  analysis_completed: "bg-secondary",
  annotation_added: "bg-accent",
  pipeline_run: "bg-success",
} as const;

/** Get timeline line color class for activity type. */
export function getActivityTypeLineClass(type: string): string {
  return ACTIVITY_TYPE_LINE_COLOR_MAP[type as ActivityType] ?? "bg-base-300";
}

/** Activity type status indicator color mapping for DaisyUI 5 status component. */
export const ACTIVITY_TYPE_STATUS_MAP: {
  readonly case_created: "status-primary";
  readonly case_updated: "status-warning";
  readonly image_uploaded: "status-info";
  readonly analysis_completed: "status-secondary";
  readonly annotation_added: "status-accent";
  readonly pipeline_run: "status-success";
} = {
  case_created: "status-primary",
  case_updated: "status-warning",
  image_uploaded: "status-info",
  analysis_completed: "status-secondary",
  annotation_added: "status-accent",
  pipeline_run: "status-success",
} as const;

/** Get status indicator class for activity type. */
export function getActivityTypeStatusClass(type: string): string {
  return ACTIVITY_TYPE_STATUS_MAP[type as ActivityType] ?? "status-neutral";
}

// Quota Status Component
// Quota/usage level text and progress bar color mappings

/** Quota status text color mapping. */
export const QUOTA_STATUS_TEXT_MAP: {
  readonly critical: "text-error";
  readonly warning: "text-warning";
  readonly healthy: "text-primary";
  readonly normal: "text-success";
} = {
  critical: "text-error",
  warning: "text-warning",
  healthy: "text-primary",
  normal: "text-success",
} as const;

/** Quota status progress bar color mapping. */
export const QUOTA_STATUS_PROGRESS_MAP: {
  readonly critical: "progress-error";
  readonly warning: "progress-warning";
  readonly healthy: "progress-primary";
  readonly normal: "progress-success";
} = {
  critical: "progress-error",
  warning: "progress-warning",
  healthy: "progress-primary",
  normal: "progress-success",
} as const;

/** Type alias for QuotaStatus keys. */
export type QuotaStatus = keyof typeof QUOTA_STATUS_TEXT_MAP;

/** Get text color class for quota status. */
export function getQuotaStatusTextClass(status: string): string {
  return QUOTA_STATUS_TEXT_MAP[status as QuotaStatus] ?? "";
}

/** Get progress bar color class for quota status. */
export function getQuotaStatusProgressClass(status: string): string {
  return QUOTA_STATUS_PROGRESS_MAP[status as QuotaStatus] ?? "progress-primary";
}

// Pipeline Status Component
// Pipeline execution status badge color mappings

/** Pipeline status badge color mapping. */
export const PIPELINE_STATUS_BADGE_MAP: {
  readonly running: "badge-info";
  readonly completed: "badge-success";
  readonly failed: "badge-error";
  readonly timeout: "badge-error";
  readonly pending: "badge-ghost";
  readonly queued: "badge-warning";
  readonly cancelled: "badge-neutral";
  readonly idle: "badge-ghost";
} = {
  running: "badge-info",
  completed: "badge-success",
  failed: "badge-error",
  timeout: "badge-error",
  pending: "badge-ghost",
  queued: "badge-warning",
  cancelled: "badge-neutral",
  idle: "badge-ghost",
} as const;

/** Type alias for PipelineStatusKey keys. */
export type PipelineStatusKey = keyof typeof PIPELINE_STATUS_BADGE_MAP;

/** Get badge class for pipeline status. */
export function getPipelineStatusBadgeClass(status: string): string {
  return PIPELINE_STATUS_BADGE_MAP[status as PipelineStatusKey] ?? "badge-ghost";
}

// Capability Health Status Component

/** Capability health status configuration mapping. */
export const CAPABILITY_STATUS_MAP: {
  readonly healthy: {
    readonly badge: "badge-success";
    readonly icon: "lucide--check-circle";
    readonly label: "Online";
  };
  readonly degraded: {
    readonly badge: "badge-warning";
    readonly icon: "lucide--alert-triangle";
    readonly label: "Degraded";
  };
  readonly unavailable: {
    readonly badge: "badge-error";
    readonly icon: "lucide--x-circle";
    readonly label: "Offline";
  };
} = {
  healthy: { badge: "badge-success", icon: "lucide--check-circle", label: "Online" },
  degraded: { badge: "badge-warning", icon: "lucide--alert-triangle", label: "Degraded" },
  unavailable: { badge: "badge-error", icon: "lucide--x-circle", label: "Offline" },
} as const;

/** Type alias for CapabilityHealthStatus keys. */
export type CapabilityHealthStatus = keyof typeof CAPABILITY_STATUS_MAP;

/** Get complete capability status configuration. */
export function getCapabilityStatusConfig(
  status: string,
): (typeof CAPABILITY_STATUS_MAP)[CapabilityHealthStatus] {
  return (
    CAPABILITY_STATUS_MAP[status as CapabilityHealthStatus] ?? CAPABILITY_STATUS_MAP.unavailable
  );
}

// Boolean Status Helpers
// Simple boolean-to-class resolvers for common UI patterns

/** Get text color class for boolean support status. */
export function getSupportStatusTextClass(isSupported: boolean): string {
  return isSupported ? "text-success" : "text-warning";
}

/** Get text color class for boolean connection status. */
export function getConnectionStatusTextClass(isConnected: boolean): string {
  return isConnected ? "text-success" : "text-error";
}

/** Get progress color class for training job live state. */
export function getTrainingProgressColorClass(isLive: boolean): string {
  return isLive ? "progress-accent" : "progress-info";
}

/** Get badge class for active/connected state. */
export function getActiveBadgeClass(isActive: boolean): string {
  return isActive ? "badge-success" : "badge-ghost";
}

/** Get badge class for configured state. */
export function getConfiguredBadgeClass(isConfigured: boolean): string {
  return isConfigured ? "badge-success" : "badge-ghost";
}

/** Get badge class for ready/available state. */
export function getReadyBadgeClass(isReady: boolean): string {
  return isReady ? "badge-success" : "badge-error";
}

/** Get badge class for enabled state. */
export function getEnabledBadgeClass(isEnabled: boolean): string {
  return isEnabled ? "badge-success badge-outline" : "badge-ghost";
}

/** Get badge class for offline-ready state. */
export function getOfflineReadyBadgeClass(isOfflineReady: boolean): string {
  return isOfflineReady ? "badge-success" : "badge-ghost";
}

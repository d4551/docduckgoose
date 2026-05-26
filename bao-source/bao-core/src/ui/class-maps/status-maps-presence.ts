/**
 * Presence / lifecycle indicator class maps (booleans, simple string states).
 *
 * Helpers that map boolean or short string state to DaisyUI badge / status
 * dot / Tailwind text or background classes. Covers connection, online,
 * configured, available, registered, active, busy, chat, AI provider,
 * timeline and other one-shot UI signals. Sibling of:
 *   - status-maps-thresholds.ts (numeric thresholds)
 *   - status-maps-bao-control-plane.ts (GitOps surfaces)
 *   - status-maps-aggregate.ts (pricing / overall health / catalog / notifications)
 */

// Badge Helpers

/**
 * Get badge class for degraded service state.
 * Uses error for unavailable, warning for degraded.
 * Common pattern: service health indicators.
 *
 * @param status - Service status ('unavailable' or other).
 * @returns DaisyUI badge class.
 */
export function getDegradedStateBadgeClass(status: string): string {
  return status === "unavailable" ? "badge-error" : "badge-warning";
}

/**
 * Get badge class for hardware status.
 * Uses success for ok, warning for other states.
 * Common pattern: hardware snapshot status.
 *
 * @param status - Hardware status string.
 * @returns DaisyUI badge class.
 */
export function getHardwareStatusBadgeClass(status: string | undefined): string {
  return status === "ok" ? "badge-success" : "badge-warning";
}

/**
 * Get badge class for container vs local environment.
 * Uses outline for container, ghost for local.
 * Common pattern: runtime environment indicators.
 *
 * @param inContainer - Whether running in a container.
 * @returns DaisyUI badge class.
 */
export function getInContainerBadgeClass(inContainer: boolean): string {
  return inContainer ? "badge-outline" : "badge-ghost";
}

/**
 * Get badge class for active selection state.
 * Uses primary for active, ghost for inactive.
 * Common pattern: category tabs, filter chips.
 *
 * @param isActive - Whether the item is actively selected.
 * @returns DaisyUI badge class.
 */
export function getActiveSelectionBadgeClass(isActive: boolean): string {
  return isActive ? "badge-primary" : "badge-ghost";
}

/**
 * Get badge class for registered device state.
 * Uses success outline for registered, warning outline for unregistered.
 * Common pattern: device registration status.
 *
 * @param isRegistered - Whether the device is registered.
 * @returns DaisyUI badge class.
 */
export function getRegisteredBadgeClass(isRegistered: boolean): string {
  return isRegistered ? "badge-success badge-outline" : "badge-warning badge-outline";
}

/**
 * Get badge class for missing requirement state.
 * Uses error for missing, ghost for present.
 * Common pattern: capability requirements, dependency checks.
 *
 * @param isMissing - Whether the requirement is missing.
 * @returns DaisyUI badge class.
 */
export function getMissingRequirementBadgeClass(isMissing: boolean): string {
  return isMissing ? "badge-error" : "badge-ghost";
}

// Text Color Helpers

/**
 * Get text class for trend indicator.
 * Uses success for positive trends, error for negative.
 * Common pattern: dashboard stats, analytics.
 *
 * @param isPositive - Whether the trend is positive/up.
 * @returns Tailwind text color class.
 */
export function getTrendTextClass(isPositive: boolean): string {
  return isPositive ? "text-success" : "text-error";
}

/**
 * Get text class for online/offline bunbuddy status.
 * Uses success for online, error for offline.
 *
 * @param isOnline - Whether the bunbuddy is online.
 * @returns Tailwind text color class.
 */
export function getBunBuddyStatusTextClass(isOnline: boolean): string {
  return isOnline ? "text-success" : "text-error";
}

/**
 * Get text class for feature enabled state.
 * Uses success for enabled, muted for disabled.
 *
 * @param isEnabled - Whether the feature is enabled.
 * @returns Tailwind text color class.
 */
export function getFeatureEnabledTextClass(isEnabled: boolean): string {
  return isEnabled ? "text-success" : "text-base-content/50";
}

/**
 * Get text color class for error count indicator.
 * Uses warning when errors exist, empty otherwise.
 * Common pattern: error count display in summaries.
 *
 * @param hasErrors - Whether there are errors.
 * @returns Tailwind text color class.
 */
export function getErrorCountTextClass(hasErrors: boolean): string {
  return hasErrors ? "text-warning" : "";
}

// Status Dot Helpers (DaisyUI 5 status component)

/**
 * Get status dot class for connection state.
 * Uses success for connected, neutral for disconnected.
 * Common pattern: device connections, robot links, API connections.
 *
 * @param isConnected - Whether the device/service is connected.
 * @returns DaisyUI status class.
 */
export function getConnectedStatusDotClass(isConnected: boolean): string {
  return isConnected ? "status-success" : "status-neutral";
}

/**
 * Get status dot class for online/offline state.
 * Uses success for online, error for offline (more urgent than neutral).
 * Common pattern: bunbuddy status, service health, live indicators.
 *
 * @param isOnline - Whether the service is online.
 * @returns DaisyUI status class.
 */
export function getOnlineStatusDotClass(isOnline: boolean): string {
  return isOnline ? "status-success" : "status-error";
}

/**
 * Get status dot class for busy state.
 * Uses warning for busy, success for idle.
 * Common pattern: worker threads, processing indicators.
 *
 * @param isBusy - Whether the resource is busy.
 * @returns DaisyUI status class.
 */
export function getBusyStatusDotClass(isBusy: boolean): string {
  return isBusy ? "status-warning" : "status-success";
}

/**
 * Get status dot class for enabled/disabled state.
 * Uses success for enabled, warning for disabled.
 * Common pattern: flow/workflow enabled state.
 *
 * @param isEnabled - Whether the item is enabled.
 * @returns DaisyUI status class.
 */
export function getEnabledStatusDotClass(isEnabled: boolean): string {
  return isEnabled ? "status-success" : "status-warning";
}

/**
 * Get status dot class for available/unavailable state.
 * Uses success for available, warning for unavailable.
 * Common pattern: protocol availability, feature availability.
 *
 * @param isAvailable - Whether the item is available.
 * @returns DaisyUI status class.
 */
export function getAvailableStatusDotClass(isAvailable: boolean): string {
  return isAvailable ? "status-success" : "status-warning";
}

/**
 * Get status dot class for driver installation state.
 * Uses success for installed, warning for not installed.
 * Common pattern: device driver status.
 *
 * @param status - Driver status string.
 * @returns DaisyUI status class.
 */
export function getDriverStatusDotClass(status: string): string {
  return status === "installed" ? "status-success" : "status-warning";
}

/**
 * Get status dot class for configured/unconfigured state.
 * Uses success for configured, error for unconfigured.
 * Common pattern: provider configuration, API key setup.
 *
 * @param isConfigured - Whether the item is configured.
 * @returns DaisyUI status class.
 */
export function getConfiguredStatusDotClass(isConfigured: boolean): string {
  return isConfigured ? "status-success" : "status-error";
}

/**
 * Get status dot class for service online status.
 * Handles 3 states: online (success), auth_required (warning), offline (error).
 * Common pattern: service health indicators with auth state.
 *
 * @param status - Service status string.
 * @returns DaisyUI status class.
 */
export function getServiceStatusDotClass(status: string): string {
  if (status === "online") {
    return "status-success";
  }
  if (status === "auth_required") {
    return "status-warning";
  }
  return "status-error";
}

/**
 * Get status dot class for active/inactive state.
 * Uses success for active, neutral for inactive.
 * Common pattern: schedule active state, toggle states.
 *
 * @param isActive - Whether the item is active.
 * @returns DaisyUI status class.
 */
export function getActiveStatusDotClass(isActive: boolean): string {
  return isActive ? "status-success" : "status-neutral";
}

/**
 * Get status dot class for realtime connection with animation.
 * Uses success for connected, warning with animation for reconnecting.
 * Common pattern: WebSocket status, command palette connection.
 *
 * @param isConnected - Whether connected to realtime updates.
 * @returns DaisyUI status class string (may include animation).
 */
export function getRealtimeConnectionStatusClass(isConnected: boolean): string {
  return isConnected ? "status-success" : "status-warning animate-pulse";
}

/**
 * Get status dot class for system status 3-state.
 * Handles loading/warning/online states with appropriate colors.
 * Common pattern: gen-ai system status indicators.
 *
 * @param status - System status ('online', 'warning', 'loading', etc.).
 * @returns DaisyUI status class string (may include animation).
 */
export function getSystemStatusDotClass(status: string): string {
  if (status === "online") {
    return "status-success animate-pulse";
  }
  if (status === "warning") {
    return "status-warning";
  }
  return "status-neutral";
}

/**
 * Get status dot class for AI model registry status.
 * Handles 4 states: active (with animation), ready, empty, loading.
 * Common pattern: AI model registry page status indicators.
 *
 * @param status - Model registry status ('active', 'ready', 'empty', 'loading').
 * @returns DaisyUI status class string (may include animation).
 */
export function getModelRegistryStatusDotClass(status: string): string {
  if (status === "active") {
    return "status-info animate-pulse";
  }
  if (status === "ready") {
    return "status-success";
  }
  if (status === "empty") {
    return "status-warning";
  }
  return "status-neutral";
}

/**
 * Get status dot class for content lab status.
 * Handles 4 states: online (with animation), partial, offline, loading.
 * Common pattern: AI content lab page status indicators.
 *
 * @param status - Content lab status ('online', 'partial', 'offline', 'loading').
 * @returns DaisyUI status class string (may include animation).
 */
export function getContentLabStatusDotClass(status: string): string {
  if (status === "online") {
    return "status-success animate-pulse";
  }
  if (status === "partial") {
    return "status-warning";
  }
  if (status === "offline") {
    return "status-error";
  }
  return "status-neutral";
}

// Timeline Helpers

/**
 * Get timeline step hr divider class based on completion.
 * Uses primary for completed, base-300 for incomplete.
 * Common pattern: DaisyUI timeline component hr elements.
 *
 * @param completed - Whether the step is completed.
 * @returns Tailwind background class.
 */
export function getTimelineStepHrClass(completed: boolean): string {
  return completed ? "bg-primary" : "bg-base-300";
}

/**
 * Get timeline completion hr class.
 * Uses success for completed, empty for incomplete.
 * Common pattern: DaisyUI timeline component for calibration history.
 *
 * @param completed - Whether the step is completed.
 * @returns Tailwind background class or empty string.
 */
export function getTimelineCompletionHrClass(completed: boolean): string {
  return completed ? "bg-success" : "";
}

// Background Helpers

/**
 * Get background class for chat mode (team vs AI).
 * Uses secondary for team chats, primary for AI chats.
 * Common pattern: chat avatar backgrounds, message styling.
 *
 * @param mode - Chat mode ('team' or other).
 * @returns Tailwind background class.
 */
export function getChatModeBgClass(mode: string): string {
  return mode === "team" ? "bg-secondary" : "bg-primary";
}

/**
 * Get text content class for chat mode.
 * Uses secondary-content for team, primary-content for AI.
 * Common pattern: chat avatar icon colors.
 *
 * @param mode - Chat mode ('team' or other).
 * @returns Tailwind text color class.
 */
export function getChatModeTextContentClass(mode: string): string {
  return mode === "team" ? "text-secondary-content" : "text-primary-content";
}

/**
 * Get background class for chat role (user vs assistant).
 * Uses secondary for user messages, primary for assistant.
 * Common pattern: chat bubble avatar backgrounds.
 *
 * @param isUser - Whether this is a user message.
 * @returns Tailwind background class.
 */
export function getChatRoleBgClass(isUser: boolean): string {
  return isUser ? "bg-secondary" : "bg-primary";
}

/**
 * Get text color class for chat mode delete/leave actions.
 * Uses warning for team (leave), error for AI (delete).
 * Common pattern: chat action buttons, destructive action indicators.
 *
 * @param mode - Chat mode ('team' or 'ai').
 * @returns Tailwind text color class.
 */
export function getChatModeActionTextClass(mode: string): string {
  return mode === "team" ? "text-warning" : "text-error";
}

/**
 * Get background class for attention/alert state.
 * Uses error for needs attention, neutral for normal.
 * Common pattern: device status avatars, alert states.
 *
 * @param needsAttention - Whether the item needs attention.
 * @returns Tailwind background class.
 */
export function getAttentionStateBgClass(needsAttention: boolean): string {
  return needsAttention ? "bg-error" : "bg-neutral";
}

/**
 * Get background class for connection state.
 * Uses success with opacity for connected, base-200 for disconnected.
 * Common pattern: integration status, service connection indicators.
 *
 * @param isConnected - Whether the item is connected.
 * @returns Tailwind background class.
 */
export function getConnectedStateBgClass(isConnected: boolean): string {
  return isConnected ? "bg-success/10" : "bg-base-200";
}

// AI Provider Background Helpers

/**
 * Get background class for provider configured state.
 * Uses provided color at 30% opacity for configured, base-300 for unconfigured.
 * Common pattern: AI provider status cards.
 *
 * @param isConfigured - Whether the provider is configured.
 * @param colorName - DaisyUI color name (e.g., 'primary', 'secondary', 'success').
 * @returns Tailwind background class.
 */
export function getProviderConfiguredBgClass(isConfigured: boolean, colorName: string): string {
  return isConfigured ? `bg-${colorName}/30` : "bg-base-300";
}

/**
 * Maps AI provider keys to their brand background colors.
 * Used with getProviderConfiguredBgClass() or getAiProviderBgClass().
 *
 * @example
 * ```ts
 * const color = PROVIDER_COLOR_MAP['azure']; // 'primary'
 * const bgClass = `bg-${color}/30`; // 'bg-primary/30'
 * ```
 */
export const PROVIDER_COLOR_MAP: {
  readonly azure: "primary";
  readonly nim: "secondary";
  readonly huggingface: "success";
  readonly ollama: "secondary";
  readonly ramalama: "info";
  readonly onnx: "accent";
  readonly local: "warning";
} = {
  azure: "primary",
  nim: "secondary",
  huggingface: "success",
  ollama: "secondary",
  ramalama: "info",
  onnx: "accent",
  local: "warning",
} as const;

/** Type alias for ProviderColorKey keys. */
export type ProviderColorKey = keyof typeof PROVIDER_COLOR_MAP;

/**
 * Get background class for AI provider configured state by key.
 * Uses provider-specific colors from PROVIDER_COLOR_MAP.
 * Common pattern: AI provider dashboard cards.
 *
 * @param providerKey - Provider key (azure, nim, huggingface, ollama, ramalama, onnx, local).
 * @param isConfigured - Whether the provider is configured.
 * @returns Tailwind background class.
 */
export function getAiProviderBgClass(providerKey: string, isConfigured: boolean): string {
  const colorName = PROVIDER_COLOR_MAP[providerKey as ProviderColorKey] ?? "base";
  return isConfigured ? `bg-${colorName}/30` : "bg-base-300";
}

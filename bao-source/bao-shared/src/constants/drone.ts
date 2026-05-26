/**
 * Drone constants.
 *
 * Centralizes common drone-related constants to avoid duplicated literals.
 *
 * @shared/constants/drone
 */

/**
 * Connection states considered "connected" for drone devices.
 */
export const DRONE_CONNECTED_STATES: readonly ["connected", "armed", "flying"] = [
  "connected",
  "armed",
  "flying",
] as const;

/**
 * Supported connection state union for connected drone devices.
 */
export type DroneConnectedState = (typeof DRONE_CONNECTED_STATES)[number];

/**
 * Lookup set for connected drone device states.
 */
export const DRONE_CONNECTED_STATE_SET: Set<"connected" | "armed" | "flying"> =
  new Set<DroneConnectedState>(DRONE_CONNECTED_STATES);

/**
 * Normalize a raw connection state into a canonical connected state.
 *
 * @param value - Raw connection state string.
 * @returns Canonical connected state or null when not connected.
 */
export function normalizeDroneConnectedState(
  value: string | null | undefined,
): DroneConnectedState | null {
  if (!value) {
    return null;
  }
  const normalized = value.trim().toLowerCase();
  return DRONE_CONNECTED_STATES.find((state) => state === normalized) ?? null;
}

/**
 * Check whether a raw connection state represents a connected drone.
 *
 * @param value - Raw connection state string.
 * @returns True when the state indicates a connected drone.
 */
export function isDroneConnectedState(value: string | null | undefined): boolean {
  const normalized = normalizeDroneConnectedState(value);
  return normalized ? DRONE_CONNECTED_STATE_SET.has(normalized) : false;
}

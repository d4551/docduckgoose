/**
 * Drone safety policy evaluation helpers.
 *
 * Provides deterministic validation of drone operations against a safety
 * policy envelope (geofence, altitude, velocity, and yaw constraints).
 *
 * @shared/utils/drone-policy
 */

import type {
  DroneGeofenceAction,
  DroneGeofenceConfig,
  DroneMission,
  DroneMissionWaypoint,
  DroneOffboardSetpoint,
  DronePolicyViolation,
  DroneSafetyPolicy,
} from "../schemas/drone-ops.schemas";

/**
 * Interface DronePolicyEvaluationResult.
 */
export interface DronePolicyEvaluationResult {
  allowed: boolean;
  violations: DronePolicyViolation[];
}

const DEG_TO_RAD_DIVISOR = 180;

type GeoPoint = {
  latitude: number;
  longitude: number;
  altitudeM?: number | null;
};

type VelocityVector = {
  vx?: number | null;
  vy?: number | null;
  vz?: number | null;
  yawRateDeg?: number | null;
};

const EARTH_RADIUS_M = 6371000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toRadians(value: number): number {
  return (value * Math.PI) / DEG_TO_RAD_DIVISOR;
}

function haversineDistanceM(a: GeoPoint, b: GeoPoint): number {
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const dLat = lat2 - lat1;
  const dLon = toRadians(b.longitude - a.longitude);
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeAltitude(value: unknown): number | null {
  return isFiniteNumber(value) ? value : null;
}

function pointInPolygon(point: GeoPoint, polygon: GeoPoint[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i]?.longitude ?? 0;
    const yi = polygon[i]?.latitude ?? 0;
    const xj = polygon[j]?.longitude ?? 0;
    const yj = polygon[j]?.latitude ?? 0;

    const intersect =
      yi > point.latitude !== yj > point.latitude &&
      point.longitude < ((xj - xi) * (point.latitude - yi)) / (yj - yi + Number.EPSILON) + xi;
    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
}

function resolveGeofenceAction(geofence: DroneGeofenceConfig): DroneGeofenceAction {
  return (geofence.defaultAction ?? "return") as DroneGeofenceAction;
}

function evaluateGeofencePolygonAltitude(
  violations: DronePolicyViolation[],
  geofence: DroneGeofenceConfig,
  polygon: {
    id?: string | null;
    minAltitudeM?: number;
    maxAltitudeM?: number;
    action?: string | null;
  },
  altitude: number,
): void {
  const minAltitude = polygon.minAltitudeM ?? geofence.minAltitudeM;
  const maxAltitude = polygon.maxAltitudeM ?? geofence.maxAltitudeM;
  const polygonId = typeof polygon.id === "string" && polygon.id.trim() ? polygon.id.trim() : null;
  const action =
    ((polygon.action ?? resolveGeofenceAction(geofence)) as DroneGeofenceAction) ??
    resolveGeofenceAction(geofence);

  const context: DronePolicyViolation["context"] = { ...(polygonId ? { polygonId } : {}), action };

  if (typeof minAltitude === "number" && altitude < minAltitude) {
    pushViolation(
      violations,
      "GEOFENCE_ALTITUDE_MIN",
      `Altitude ${altitude} below geofence minimum ${minAltitude}`,
      "error",
      "altitudeM",
      context,
    );
  }
  if (typeof maxAltitude === "number" && altitude > maxAltitude) {
    pushViolation(
      violations,
      "GEOFENCE_ALTITUDE_MAX",
      `Altitude ${altitude} above geofence maximum ${maxAltitude}`,
      "error",
      "altitudeM",
      context,
    );
  }
}

function evaluateGeofenceDistance(
  violations: DronePolicyViolation[],
  geofence: DroneGeofenceConfig,
  point: GeoPoint,
  origin?: GeoPoint | null,
): void {
  if (typeof geofence.maxDistanceM !== "number" || !origin) {
    return;
  }
  const distance = haversineDistanceM(origin, point);
  if (distance <= geofence.maxDistanceM) {
    return;
  }

  pushViolation(
    violations,
    "GEOFENCE_DISTANCE",
    `Distance ${Math.round(distance)}m exceeds ${geofence.maxDistanceM}m limit`,
    "error",
    "position",
    { action: resolveGeofenceAction(geofence) },
  );
}

function pushViolation(
  violations: DronePolicyViolation[],
  code: string,
  message: string,
  severity: DronePolicyViolation["severity"] = "error",
  field?: string,
  context?: DronePolicyViolation["context"],
): void {
  violations.push({
    code,
    message,
    severity,
    ...(field ? { field } : {}),
    ...(context ? { context } : {}),
  });
}

function evaluateAltitude(
  violations: DronePolicyViolation[],
  policy: DroneSafetyPolicy,
  altitude: number | null,
  field = "altitudeM",
  context?: DronePolicyViolation["context"],
): void {
  if (altitude === null) {
    return;
  }
  const minAltitude = policy.limits.minAltitudeM;
  const maxAltitude = policy.limits.maxAltitudeM;
  if (typeof minAltitude === "number" && altitude < minAltitude) {
    pushViolation(
      violations,
      "ALTITUDE_MIN",
      `Altitude ${altitude} below minimum ${minAltitude}`,
      "error",
      field,
      context,
    );
  }
  if (typeof maxAltitude === "number" && altitude > maxAltitude) {
    pushViolation(
      violations,
      "ALTITUDE_MAX",
      `Altitude ${altitude} above maximum ${maxAltitude}`,
      "error",
      field,
      context,
    );
  }
}

function evaluateGeofence(
  violations: DronePolicyViolation[],
  geofence: DroneGeofenceConfig,
  point: GeoPoint,
  options?: { origin?: GeoPoint | null },
): void {
  if (!geofence.enabled || geofence.polygons.length === 0) {
    return;
  }

  const resolvedDefaultAction = resolveGeofenceAction(geofence);
  const containingPolygons = geofence.polygons.filter(
    (polygon: { points: Array<{ latitude: number; longitude: number }>; action?: string }) =>
      pointInPolygon(point, polygon.points),
  );

  if (containingPolygons.length === 0) {
    pushViolation(
      violations,
      "GEOFENCE_OUTSIDE",
      "Target is outside the configured geofence polygon",
      "error",
      "position",
      { action: resolvedDefaultAction },
    );
  }

  const altitude = normalizeAltitude(point.altitudeM);
  if (altitude !== null && containingPolygons.length > 0) {
    for (const polygon of containingPolygons) {
      evaluateGeofencePolygonAltitude(violations, geofence, polygon, altitude);
    }
  }

  evaluateGeofenceDistance(violations, geofence, point, options?.origin);
}

function evaluateVelocity(
  violations: DronePolicyViolation[],
  policy: DroneSafetyPolicy,
  velocity: VelocityVector,
  context?: DronePolicyViolation["context"],
): void {
  const vx = isFiniteNumber(velocity.vx) ? velocity.vx : null;
  const vy = isFiniteNumber(velocity.vy) ? velocity.vy : null;
  const vz = isFiniteNumber(velocity.vz) ? velocity.vz : null;
  const yawRate = isFiniteNumber(velocity.yawRateDeg) ? velocity.yawRateDeg : null;
  evaluateHorizontalVelocity(violations, policy.limits.maxHorizontalSpeedMps, vx, vy, context);
  evaluateMagnitudeLimitedVelocity(
    violations,
    "VELOCITY_VERTICAL",
    "Vertical speed",
    "velocity",
    policy.limits.maxVerticalSpeedMps,
    vz,
    context,
  );
  evaluateMagnitudeLimitedVelocity(
    violations,
    "YAW_RATE",
    "Yaw rate",
    "yawRateDeg",
    policy.limits.maxYawRateDegS,
    yawRate,
    context,
  );
}

function evaluateHorizontalVelocity(
  violations: DronePolicyViolation[],
  maxHorizontalSpeedMps: number | null | undefined,
  vx: number | null,
  vy: number | null,
  context?: DronePolicyViolation["context"],
): void {
  if (typeof maxHorizontalSpeedMps !== "number" || vx === null || vy === null) {
    return;
  }

  const horizontalSpeed = Math.sqrt(vx * vx + vy * vy);
  if (horizontalSpeed <= maxHorizontalSpeedMps) {
    return;
  }

  pushViolation(
    violations,
    "VELOCITY_HORIZONTAL",
    `Horizontal speed ${horizontalSpeed.toFixed(2)} exceeds ${maxHorizontalSpeedMps}`,
    "error",
    "velocity",
    context,
  );
}

function evaluateMagnitudeLimitedVelocity(
  violations: DronePolicyViolation[],
  code: string,
  label: string,
  field: string,
  limit: number | null | undefined,
  measuredValue: number | null,
  context?: DronePolicyViolation["context"],
): void {
  if (typeof limit !== "number" || measuredValue === null) {
    return;
  }
  if (Math.abs(measuredValue) <= limit) {
    return;
  }

  pushViolation(
    violations,
    code,
    `${label} ${measuredValue.toFixed(2)} exceeds ${limit}`,
    "error",
    field,
    context,
  );
}

function evaluateWaypointSpeed(
  violations: DronePolicyViolation[],
  policy: DroneSafetyPolicy,
  waypoint: DroneMissionWaypoint,
  waypointIndex: number,
): void {
  const speed = isFiniteNumber(waypoint.speed) ? waypoint.speed : null;
  const max = policy.limits.maxHorizontalSpeedMps;
  if (speed === null) {
    return;
  }
  if (typeof max !== "number") {
    return;
  }
  if (speed <= max) {
    return;
  }
  pushViolation(
    violations,
    "MISSION_SPEED",
    `Waypoint speed ${speed.toFixed(2)} exceeds ${max}`,
    "error",
    "speed",
    { waypointIndex },
  );
}

/**
 * Evaluate a position target against drone safety policy.
 */
export function evaluateDronePositionPolicy(
  policy: DroneSafetyPolicy,
  point: GeoPoint,
  options?: { origin?: GeoPoint | null },
): DronePolicyEvaluationResult {
  if (!policy.enabled) {
    return { allowed: true, violations: [] };
  }
  const violations: DronePolicyViolation[] = [];
  evaluateAltitude(violations, policy, normalizeAltitude(point.altitudeM));
  evaluateGeofence(violations, policy.geofence, point, options);
  const allowed = violations.every((violation) => violation.severity !== "error");
  return { allowed, violations };
}

/**
 * Evaluate a velocity target against drone safety policy.
 */
export function evaluateDroneVelocityPolicy(
  policy: DroneSafetyPolicy,
  velocity: VelocityVector,
): DronePolicyEvaluationResult {
  if (!policy.enabled) {
    return { allowed: true, violations: [] };
  }
  const violations: DronePolicyViolation[] = [];
  evaluateVelocity(violations, policy, velocity);
  const allowed = violations.every((violation) => violation.severity !== "error");
  return { allowed, violations };
}

/**
 * Evaluate a mission payload against drone safety policy.
 *
 * Validates each waypoint position against altitude and geofence constraints and
 * validates optional waypoint speeds against horizontal speed limits.
 *
 * @param policy - Safety policy envelope.
 * @param mission - Mission payload.
 * @returns Mission safety evaluation result.
 */
export function evaluateDroneMissionPolicy(
  policy: DroneSafetyPolicy,
  mission: DroneMission,
): DronePolicyEvaluationResult {
  if (!policy.enabled) {
    return { allowed: true, violations: [] };
  }
  const violations: DronePolicyViolation[] = [];

  for (const [index, waypoint] of mission.waypoints.entries()) {
    const waypointIndex = index + 1;
    const pointViolations: DronePolicyViolation[] = [];
    evaluateAltitude(pointViolations, policy, normalizeAltitude(waypoint.altitude), "altitudeM", {
      waypointIndex,
    });
    evaluateGeofence(pointViolations, policy.geofence, {
      latitude: waypoint.latitude,
      longitude: waypoint.longitude,
      altitudeM: waypoint.altitude,
    });
    for (const violation of pointViolations) {
      const ctx = violation.context ?? {};
      violation.context = { ...ctx, waypointIndex };
    }
    violations.push(...pointViolations);

    evaluateWaypointSpeed(violations, policy, waypoint, waypointIndex);
  }

  const allowed = violations.every((violation) => violation.severity !== "error");
  return { allowed, violations };
}

/**
 * Evaluate an offboard setpoint against drone safety policy.
 */
export function evaluateDroneOffboardPolicy(
  policy: DroneSafetyPolicy,
  setpoint: DroneOffboardSetpoint,
  options?: { origin?: GeoPoint | null },
): DronePolicyEvaluationResult {
  if (!policy.enabled) {
    return { allowed: true, violations: [] };
  }
  if (!isRecord(setpoint)) {
    return { allowed: true, violations: [] };
  }
  if (setpoint.type === "position") {
    return evaluateDronePositionPolicy(
      policy,
      {
        latitude: setpoint.latitude,
        longitude: setpoint.longitude,
        altitudeM: setpoint.altitudeM,
      },
      options,
    );
  }
  if (setpoint.type === "velocity") {
    return evaluateDroneVelocityPolicy(policy, {
      vx: setpoint.vx,
      vy: setpoint.vy,
      vz: setpoint.vz,
      yawRateDeg: setpoint.yawRateDeg,
    });
  }
  return { allowed: true, violations: [] };
}

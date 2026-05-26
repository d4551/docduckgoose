/**
 * Robotics motion planning helpers.
 *
 * Provides deterministic trajectory planning utilities for robotics motion
 * commands, with optional policy enforcement hooks.
 *
 * @baohaus/bao-utils/robotics-motion
 */

import { MS_PER_SECOND } from "@baohaus/bao-constants/time";
import type {
  RoboticsTrajectoryPlan,
  RoboticsTrajectoryPlanRequest,
  RoboticsTrajectoryPoint,
} from "@baohaus/bao-schemas/robotics-motion.schemas";
import type {
  RoboticsCommandType,
  RoboticsSafetyPolicy,
  RoboticsSafetyViolation,
} from "@baohaus/bao-schemas/robotics-policy.schemas";
import { evaluateRoboticsPolicy } from "./robotics-policy";

const HEX_RADIX = 16;
const RANDOM_SLICE_START = 2;
const RANDOM_SLICE_END = 10;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Motion planner configuration.
 */
export interface RoboticsMotionPlannerConfig {
  sampleIntervalMs: number;
  maxDurationMs: number;
  maxPoints: number;
  maxVelocity: number;
}

/**
 * Motion plan output with policy evaluation.
 */
export interface RoboticsMotionPlanResult {
  plan: RoboticsTrajectoryPlan;
  allowed: boolean;
  violations: RoboticsSafetyViolation[];
  warnings: string[];
}

/**
 * Generate a random plan identifier.
 *
 * @returns Random plan id.
 */
function generatePlanId(): string {
  const cryptoRef = globalThis.crypto as Crypto | undefined;
  if (cryptoRef?.randomUUID) {
    return cryptoRef.randomUUID();
  }
  return `plan-${Date.now()}-${Math.random().toString(HEX_RADIX).slice(RANDOM_SLICE_START, RANDOM_SLICE_END)}`;
}

/**
 * Linearly interpolate between two numbers.
 */
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Clamp a value between min and max.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Build trajectory points for joint targets.
 */
function buildJointPoints(
  start: number[],
  target: number[],
  count: number,
): RoboticsTrajectoryPoint[] {
  const points: RoboticsTrajectoryPoint[] = [];
  const maxIndex = Math.max(start.length, target.length);
  for (let idx = 0; idx < count; idx += 1) {
    const t = count <= 1 ? 1 : idx / (count - 1);
    const jointTargets = Array.from({ length: maxIndex }, (_, i) =>
      lerp(start[i] ?? target[i] ?? 0, target[i] ?? start[i] ?? 0, t),
    );
    points.push({ t, jointTargets });
  }
  return points;
}

/**
 * Build trajectory points for pose targets.
 */
function buildPosePoints(
  start: {
    x: number;
    y: number;
    z: number;
    roll: number;
    pitch: number;
    yaw: number;
  },
  target: {
    x: number;
    y: number;
    z: number;
    roll: number;
    pitch: number;
    yaw: number;
  },
  count: number,
): RoboticsTrajectoryPoint[] {
  const points: RoboticsTrajectoryPoint[] = [];
  for (let idx = 0; idx < count; idx += 1) {
    const t = count <= 1 ? 1 : idx / (count - 1);
    points.push({
      t,
      pose: {
        x: lerp(start.x, target.x, t),
        y: lerp(start.y, target.y, t),
        z: lerp(start.z, target.z, t),
        roll: lerp(start.roll, target.roll, t),
        pitch: lerp(start.pitch, target.pitch, t),
        yaw: lerp(start.yaw, target.yaw, t),
      },
    });
  }
  return points;
}

/**
 * Build trajectory points for constant velocity commands.
 */
function buildVelocityPoints(
  velocity: RoboticsTrajectoryPoint["velocity"],
  count: number,
): RoboticsTrajectoryPoint[] {
  const points: RoboticsTrajectoryPoint[] = [];
  for (let idx = 0; idx < count; idx += 1) {
    const t = count <= 1 ? 1 : idx / (count - 1);
    points.push({ t, velocity });
  }
  return points;
}

function estimateJointDurationMs(
  target: Record<string, unknown>,
  current: Record<string, unknown> | null,
  maxVelocity: number,
  maxDurationMs: number,
  sampleIntervalMs: number,
): number {
  const targetJoints = Array.isArray(target.jointTargets) ? target.jointTargets : [];
  const currentJoints = current && Array.isArray(current.jointTargets) ? current.jointTargets : [];
  const maxDelta = targetJoints.reduce((acc, value, idx) => {
    const delta = Math.abs(value - (currentJoints[idx] ?? value));
    return Math.max(acc, delta);
  }, 0);
  return clamp((maxDelta / maxVelocity) * MS_PER_SECOND, sampleIntervalMs, maxDurationMs);
}

function estimatePoseDurationMs(
  target: Record<string, unknown>,
  current: Record<string, unknown> | null,
  maxVelocity: number,
  maxDurationMs: number,
  sampleIntervalMs: number,
): number {
  const tx = typeof target.x === "number" ? target.x : 0;
  const ty = typeof target.y === "number" ? target.y : 0;
  const tz = typeof target.z === "number" ? target.z : 0;
  const cx = typeof current?.x === "number" ? current.x : tx;
  const cy = typeof current?.y === "number" ? current.y : ty;
  const cz = typeof current?.z === "number" ? current.z : tz;
  const distance = Math.sqrt((tx - cx) ** 2 + (ty - cy) ** 2 + (tz - cz) ** 2);
  return clamp((distance / maxVelocity) * MS_PER_SECOND, sampleIntervalMs, maxDurationMs);
}

function estimateFallbackDurationMs(maxDurationMs: number, sampleIntervalMs: number): number {
  return clamp(sampleIntervalMs, sampleIntervalMs, maxDurationMs);
}

/**
 * Estimate trajectory duration based on motion delta and max velocity.
 */
function estimateDurationMs(
  commandType: RoboticsCommandType,
  target: Record<string, unknown>,
  current: Record<string, unknown> | null,
  maxVelocity: number,
  maxDurationMs: number,
  sampleIntervalMs: number,
): number {
  if (maxVelocity <= 0) {
    return estimateFallbackDurationMs(maxDurationMs, sampleIntervalMs);
  }

  if (commandType === "joint") {
    return estimateJointDurationMs(target, current, maxVelocity, maxDurationMs, sampleIntervalMs);
  }

  if (commandType === "pose") {
    return estimatePoseDurationMs(target, current, maxVelocity, maxDurationMs, sampleIntervalMs);
  }

  return estimateFallbackDurationMs(maxDurationMs, sampleIntervalMs);
}

/** 6-DOF pose value container. */
interface Pose6DOF {
  x: number;
  y: number;
  z: number;
  roll: number;
  pitch: number;
  yaw: number;
}

/** Pose field keys for extraction. */
const POSE_KEYS: ReadonlyArray<keyof Pose6DOF> = ["x", "y", "z", "roll", "pitch", "yaw"];

/**
 * Safely extract a numeric field from a record, falling back to a default.
 *
 * @param record - Source record.
 * @param key - Field name.
 * @param fallback - Default value when field is absent or non-numeric.
 * @returns Extracted number.
 */
function numericField(
  record: Record<string, unknown> | null,
  key: string,
  fallback: number,
): number {
  if (!record) {
    return fallback;
  }
  const val = record[key];
  return typeof val === "number" ? val : fallback;
}

/**
 * Extract a 6-DOF pose from current/target records with fallback chain.
 *
 * @param current - Current state (nullable).
 * @param target - Target state.
 * @returns Start and target pose objects.
 */
function extractPoses(
  current: Record<string, unknown> | null,
  target: Record<string, unknown>,
): { startPose: Pose6DOF; targetPose: Pose6DOF } {
  const startPose: Pose6DOF = { x: 0, y: 0, z: 0, roll: 0, pitch: 0, yaw: 0 };
  const targetPose: Pose6DOF = { x: 0, y: 0, z: 0, roll: 0, pitch: 0, yaw: 0 };
  for (const key of POSE_KEYS) {
    const targetVal = numericField(target, key, 0);
    startPose[key] = numericField(current, key, targetVal);
    targetPose[key] = numericField(target, key, startPose[key]);
  }
  return { startPose, targetPose };
}

/**
 * Resolve planning parameters from request options and config defaults.
 *
 * @param options - Request options.
 * @param config - Planner config.
 * @returns Resolved planning parameters.
 */
function resolvePlanningParams(
  options: Record<string, unknown>,
  config: RoboticsMotionPlannerConfig,
): { sampleIntervalMs: number; maxDurationMs: number; maxPoints: number; maxVelocity: number } {
  const sampleIntervalMs = clamp(
    Number(options.sampleIntervalMs ?? config.sampleIntervalMs),
    1,
    Number(options.maxDurationMs ?? config.maxDurationMs),
  );
  const maxDurationMs = clamp(
    Number(options.maxDurationMs ?? config.maxDurationMs),
    sampleIntervalMs,
    Number(options.maxDurationMs ?? config.maxDurationMs),
  );
  const maxPoints = clamp(
    Number(options.maxPoints ?? config.maxPoints),
    2,
    Number(options.maxPoints ?? config.maxPoints),
  );
  const maxVelocity = Number(options.maxVelocity ?? config.maxVelocity);
  return { sampleIntervalMs, maxDurationMs, maxPoints, maxVelocity };
}

/**
 * Build trajectory points for the given command type.
 *
 * @param commandType - Motion command type.
 * @param target - Target state record.
 * @param current - Current state record (nullable).
 * @param pointCount - Number of points to generate.
 * @returns Array of trajectory points.
 */
function buildPointsForCommand(
  commandType: RoboticsCommandType,
  target: Record<string, unknown>,
  current: Record<string, unknown> | null,
  pointCount: number,
): RoboticsTrajectoryPoint[] {
  if (commandType === "joint") {
    const targetJoints = Array.isArray(target.jointTargets) ? target.jointTargets : [];
    const currentJoints =
      current && Array.isArray(current.jointTargets) ? current.jointTargets : targetJoints;
    return buildJointPoints(currentJoints, targetJoints, pointCount);
  }
  if (commandType === "pose") {
    const { startPose, targetPose } = extractPoses(current, target);
    return buildPosePoints(startPose, targetPose, pointCount);
  }
  if (commandType === "velocity") {
    return buildVelocityPoints(target as RoboticsTrajectoryPoint["velocity"], pointCount);
  }
  return [];
}

/**
 * Plan a deterministic trajectory for robotics motion.
 *
 * @param request - Trajectory plan request.
 * @param config - Motion planner config.
 * @param policy - Optional safety policy for validation.
 * @returns Planned trajectory with validation metadata.
 */
export function planRoboticsTrajectory(
  request: RoboticsTrajectoryPlanRequest,
  config: RoboticsMotionPlannerConfig,
  policy?: RoboticsSafetyPolicy,
): RoboticsMotionPlanResult {
  const warnings: string[] = [];
  const options = isRecord(request.options) ? request.options : {};
  const params = resolvePlanningParams(options, config);

  const commandType = request.commandType;
  const target = isRecord(request.target) ? request.target : {};
  const current = isRecord(request.current) ? request.current : null;

  const policyResult = policy
    ? evaluateRoboticsPolicy(policy, commandType, target)
    : { allowed: true, violations: [] };

  if (!current) {
    warnings.push("Current state unavailable; planning from target pose.");
  }

  const durationMs = estimateDurationMs(
    commandType,
    target,
    current,
    params.maxVelocity,
    params.maxDurationMs,
    params.sampleIntervalMs,
  );
  const pointCount = clamp(
    Math.ceil(durationMs / params.sampleIntervalMs) + 1,
    2,
    params.maxPoints,
  );
  const points = buildPointsForCommand(commandType, target, current, pointCount);

  const plan: RoboticsTrajectoryPlan = {
    id: generatePlanId(),
    deviceId: request.deviceId,
    commandType: request.commandType,
    points,
    durationMs,
    sampleIntervalMs: params.sampleIntervalMs,
    ...(warnings.length ? { warnings } : {}),
  };

  return {
    plan,
    allowed: policyResult.allowed,
    violations: policyResult.violations,
    warnings,
  };
}

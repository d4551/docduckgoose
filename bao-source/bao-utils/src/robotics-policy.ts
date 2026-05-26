/**
 * Robotics safety policy evaluation helpers.
 *
 * Provides deterministic validation of robotics commands against a safety
 * policy envelope.
 *
 * @baohaus/bao-utils/robotics-policy
 */

import type {
  RoboticsCommandType,
  RoboticsSafetyPolicy,
  RoboticsSafetyViolation,
} from "@baohaus/bao-schemas/robotics-policy.schemas";

/**
 * Interface RoboticsPolicyEvaluationResult.
 */
export interface RoboticsPolicyEvaluationResult {
  allowed: boolean;
  violations: RoboticsSafetyViolation[];
}

type EvaluationContext = {
  pushViolation: (
    code: string,
    message: string,
    severity?: RoboticsSafetyViolation["severity"],
    field?: string,
  ) => void;
};

type AxisBound = { min: number; max: number };
type PositionBound = { x: number; y: number; z: number };
type AxisValueSet = {
  x: number | null;
  y: number | null;
  z: number | null;
};
type AxisValuePair = {
  value: number;
  bounds: AxisBound;
  code: string;
  label: string;
  field: string;
};

function asOptionalNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asAxisValues(value: unknown): AxisValueSet {
  if (value && typeof value === "object") {
    const record = value as { x: unknown; y: unknown; z: unknown };
    return {
      x: asOptionalNumber(record.x),
      y: asOptionalNumber(record.y),
      z: asOptionalNumber(record.z),
    };
  }
  return { x: null, y: null, z: null };
}

function asBoundValues(value: unknown): AxisBound | null {
  if (value && typeof value === "object") {
    const bound = value as { min: unknown; max: unknown };
    const min = asOptionalNumber(bound.min);
    const max = asOptionalNumber(bound.max);
    if (min !== null && max !== null) {
      return { min, max };
    }
  }
  return null;
}

function asPositionBound(value: unknown): PositionBound | null {
  if (value && typeof value === "object") {
    const position = value as { x: unknown; y: unknown; z: unknown };
    const x = asOptionalNumber(position.x);
    const y = asOptionalNumber(position.y);
    const z = asOptionalNumber(position.z);
    if (x !== null && y !== null && z !== null) {
      return { x, y, z };
    }
  }
  return null;
}

function addRangeViolation(
  context: EvaluationContext,
  code: string,
  actual: number,
  bounds: AxisBound,
  label: string,
  field?: string,
): void {
  if (actual < bounds.min || actual > bounds.max) {
    context.pushViolation(
      code,
      `${label} ${actual} outside [${bounds.min}, ${bounds.max}]`,
      "error",
      field,
    );
  }
}

function addRangeViolations(context: EvaluationContext, axisPairs: AxisValuePair[]): void {
  for (const axisPair of axisPairs) {
    addRangeViolation(
      context,
      axisPair.code,
      axisPair.value,
      axisPair.bounds,
      axisPair.label,
      axisPair.field ?? undefined,
    );
  }
}

function addAxisPairIfValid(
  target: AxisValuePair[],
  value: number | null,
  bounds: AxisBound | null,
  code: string,
  label: string,
  field: string,
): void {
  if (value === null || bounds === null) {
    return;
  }
  target.push({ value, bounds, code, label, field });
}

function isInKeepoutZone(
  x: number,
  y: number,
  z: number,
  zone: { min: PositionBound; max: PositionBound },
): boolean {
  return (
    x >= zone.min.x &&
    x <= zone.max.x &&
    y >= zone.min.y &&
    y <= zone.max.y &&
    z >= zone.min.z &&
    z <= zone.max.z
  );
}

function buildPoseWorkspaceAxisPairs(
  x: number | null,
  y: number | null,
  z: number | null,
  workspaceMin: PositionBound,
  workspaceMax: PositionBound,
): AxisValuePair[] {
  const axisPairs: AxisValuePair[] = [];
  addAxisPairIfValid(
    axisPairs,
    x,
    { min: workspaceMin.x, max: workspaceMax.x },
    "WORKSPACE_X",
    "Pose.x",
    "x",
  );
  addAxisPairIfValid(
    axisPairs,
    y,
    { min: workspaceMin.y, max: workspaceMax.y },
    "WORKSPACE_Y",
    "Pose.y",
    "y",
  );
  addAxisPairIfValid(
    axisPairs,
    z,
    { min: workspaceMin.z, max: workspaceMax.z },
    "WORKSPACE_Z",
    "Pose.z",
    "z",
  );
  return axisPairs;
}

function buildAxisPairsFromBounds(
  values: AxisValueSet,
  bounds: AxisValueSet,
  xDefinition: { code: string; label: string; field: string },
  yDefinition: { code: string; label: string; field: string },
  zDefinition: { code: string; label: string; field: string },
): AxisValuePair[] {
  const axisPairs: AxisValuePair[] = [];
  addAxisPairIfValid(
    axisPairs,
    values.x,
    bounds.x === null ? null : { min: -bounds.x, max: bounds.x },
    xDefinition.code,
    xDefinition.label,
    xDefinition.field,
  );
  addAxisPairIfValid(
    axisPairs,
    values.y,
    bounds.y === null ? null : { min: -bounds.y, max: bounds.y },
    yDefinition.code,
    yDefinition.label,
    yDefinition.field,
  );
  addAxisPairIfValid(
    axisPairs,
    values.z,
    bounds.z === null ? null : { min: -bounds.z, max: bounds.z },
    zDefinition.code,
    zDefinition.label,
    zDefinition.field,
  );
  return axisPairs;
}

/**
 * Evaluate workspace bounds constraints on a pose command.
 */
function evaluatePoseWorkspaceBounds(
  ctx: EvaluationContext,
  policy: RoboticsSafetyPolicy,
  x: number | null,
  y: number | null,
  z: number | null,
): void {
  if (!policy.workspaceBounds) {
    return;
  }
  const workspaceMin = asPositionBound(policy.workspaceBounds.min);
  const workspaceMax = asPositionBound(policy.workspaceBounds.max);
  if (workspaceMin && workspaceMax) {
    addRangeViolations(ctx, buildPoseWorkspaceAxisPairs(x, y, z, workspaceMin, workspaceMax));
  }
}

/**
 * Evaluate orientation bounds constraints on a pose command.
 */
function evaluatePoseOrientationBounds(
  ctx: EvaluationContext,
  policy: RoboticsSafetyPolicy,
  roll: number | null,
  pitch: number | null,
  yaw: number | null,
): void {
  if (!policy.orientationBounds) {
    return;
  }
  const rollBounds = asBoundValues(policy.orientationBounds.roll);
  const pitchBounds = asBoundValues(policy.orientationBounds.pitch);
  const yawBounds = asBoundValues(policy.orientationBounds.yaw);
  const pairs: AxisValuePair[] = [];
  addAxisPairIfValid(pairs, roll, rollBounds, "ORIENTATION_ROLL", "Roll", "roll");
  addAxisPairIfValid(pairs, pitch, pitchBounds, "ORIENTATION_PITCH", "Pitch", "pitch");
  addAxisPairIfValid(pairs, yaw, yawBounds, "ORIENTATION_YAW", "Yaw", "yaw");
  addRangeViolations(ctx, pairs);
}

/**
 * Evaluate keepout zone constraints on a pose command.
 */
function evaluatePoseKeepoutZones(
  ctx: EvaluationContext,
  policy: RoboticsSafetyPolicy,
  x: number | null,
  y: number | null,
  z: number | null,
): void {
  if (!policy.keepoutZones || x === null || y === null || z === null) {
    return;
  }
  for (const zone of policy.keepoutZones) {
    if (!isInKeepoutZone(x, y, z, zone)) {
      continue;
    }
    ctx.pushViolation(
      "KEEPOUT_ZONE",
      zone.label ? `Pose enters keepout zone ${zone.label}` : `Pose enters keepout zone ${zone.id}`,
      zone.severity === "warn" ? "warning" : "error",
    );
  }
}

/**
 * Evaluate a robotics command against a safety policy.
 *
 * @param policy - Safety policy configuration.
 * @param commandType - Command type.
 * @param payload - Command payload.
 * @returns Evaluation result.
 */
export function evaluateRoboticsPolicy(
  policy: RoboticsSafetyPolicy,
  commandType: RoboticsCommandType,
  payload: Record<string, unknown>,
): RoboticsPolicyEvaluationResult {
  if (!policy.enabled) {
    return { allowed: true, violations: [] };
  }

  const violations: RoboticsSafetyViolation[] = [];

  const pushViolation = (
    code: string,
    message: string,
    severity: RoboticsSafetyViolation["severity"] = "error",
    field?: string,
  ): void => {
    violations.push({ code, message, severity, ...(field ? { field } : {}) });
  };

  const evaluateJointCommand = (evaluationContext: EvaluationContext): void => {
    const jointTargets = Array.isArray(payload.jointTargets) ? payload.jointTargets : [];
    for (const limit of policy.jointLimits) {
      const value = asOptionalNumber(jointTargets[limit.index]);
      if (value === null) {
        continue;
      }
      addRangeViolation(
        evaluationContext,
        "JOINT_LIMIT",
        value,
        { min: limit.min, max: limit.max },
        `Joint ${limit.index} target`,
        `jointTargets.${limit.index}`,
      );
    }
  };

  const evaluatePoseCommand = (evaluationContext: EvaluationContext): void => {
    const x = asOptionalNumber(payload.x);
    const y = asOptionalNumber(payload.y);
    const z = asOptionalNumber(payload.z);
    const roll = asOptionalNumber(payload.roll);
    const pitch = asOptionalNumber(payload.pitch);
    const yaw = asOptionalNumber(payload.yaw);
    const frameId = typeof payload.frameId === "string" ? payload.frameId.trim() : "";

    if (frameId && policy.allowedFrames?.length && !policy.allowedFrames.includes(frameId)) {
      evaluationContext.pushViolation(
        "FRAME_NOT_ALLOWED",
        `Frame '${frameId}' is not permitted by policy`,
        "error",
        "frameId",
      );
    }

    evaluatePoseWorkspaceBounds(evaluationContext, policy, x, y, z);
    evaluatePoseOrientationBounds(evaluationContext, policy, roll, pitch, yaw);
    evaluatePoseKeepoutZones(evaluationContext, policy, x, y, z);
  };

  const evaluateVelocityCommand = (evaluationContext: EvaluationContext): void => {
    const linear = asAxisValues(payload.linear);
    const angular = asAxisValues(payload.angular);
    const limits = policy.velocityLimits;
    if (!limits) {
      return;
    }

    addRangeViolations(
      evaluationContext,
      buildAxisPairsFromBounds(
        {
          x: linear.x === null ? null : Math.abs(linear.x),
          y: linear.y === null ? null : Math.abs(linear.y),
          z: linear.z === null ? null : Math.abs(linear.z),
        },
        {
          x: asOptionalNumber(limits.linear.x),
          y: asOptionalNumber(limits.linear.y),
          z: asOptionalNumber(limits.linear.z),
        },
        { code: "VELOCITY_LINEAR_X", label: "Linear.x", field: "linear.x" },
        { code: "VELOCITY_LINEAR_Y", label: "Linear.y", field: "linear.y" },
        { code: "VELOCITY_LINEAR_Z", label: "Linear.z", field: "linear.z" },
      ),
    );

    addRangeViolations(
      evaluationContext,
      buildAxisPairsFromBounds(
        {
          x: angular.x === null ? null : Math.abs(angular.x),
          y: angular.y === null ? null : Math.abs(angular.y),
          z: angular.z === null ? null : Math.abs(angular.z),
        },
        {
          x: asOptionalNumber(limits.angular.x),
          y: asOptionalNumber(limits.angular.y),
          z: asOptionalNumber(limits.angular.z),
        },
        { code: "VELOCITY_ANGULAR_X", label: "Angular.x", field: "angular.x" },
        { code: "VELOCITY_ANGULAR_Y", label: "Angular.y", field: "angular.y" },
        { code: "VELOCITY_ANGULAR_Z", label: "Angular.z", field: "angular.z" },
      ),
    );
  };

  if (commandType === "joint") {
    evaluateJointCommand({ pushViolation });
  }
  if (commandType === "pose") {
    evaluatePoseCommand({ pushViolation });
  }
  if (commandType === "velocity") {
    evaluateVelocityCommand({ pushViolation });
  }

  const allowed = violations.every((violation) => violation.severity !== "error");
  return { allowed, violations };
}

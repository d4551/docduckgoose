/**
 * Canonical math + cardinal-direction primitives shared across spatial,
 * scene-graph, and input domains.
 *
 * Pure data shapes — no methods, no IO, no allocation. Math/algebra helpers
 * live with their owners (annotation-spatial-geometry for spatial ops,
 * scene-asset-core for scene-graph ops). Three.js parity classes are kept in
 * three-bao and are distinct from these record shapes by design.
 *
 * @baohaus/bao-utils/vector
 */

/**
 * Readonly 2D vector record. Used for positions, sizes, movement deltas,
 * and any other cartesian pair without algebraic methods.
 */
export interface Vector2 {
  /** Horizontal coordinate. */
  readonly x: number;
  /** Vertical coordinate. */
  readonly y: number;
}

/**
 * Readonly 3D vector record. Used for positions, rotations (radians),
 * scale factors, and other cartesian triples without algebraic methods.
 */
export interface Vector3 {
  /** X coordinate. */
  readonly x: number;
  /** Y coordinate. */
  readonly y: number;
  /** Z coordinate. */
  readonly z: number;
}

/**
 * Movement deltas use the same shape as a 2D vector record.
 *
 * Distinct alias documents intent at call sites (input/command vs position).
 */
export type MovementVector = Vector2;

/**
 * Cardinal direction set used by input, animation, and NPC interaction logic.
 */
export const CARDINAL_DIRECTIONS = Object.freeze(["up", "down", "left", "right"] as const);

/**
 * Cardinal direction union derived from the canonical frozen list.
 */
export type Direction = (typeof CARDINAL_DIRECTIONS)[number];

/**
 * Facing alias for direction in animation / interaction contexts. Same value
 * domain as {@link Direction}; distinct name documents intent.
 */
export type Facing = Direction;

/**
 * Type guard for canonical {@link Direction} values.
 *
 * @param value Candidate string from input or persistence.
 * @returns True when the value is one of the four cardinal directions.
 */
export const isDirection = (value: string): value is Direction =>
  (CARDINAL_DIRECTIONS as readonly string[]).includes(value);

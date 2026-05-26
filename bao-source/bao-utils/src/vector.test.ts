import { describe, expect, test } from "bun:test";
import {
  CARDINAL_DIRECTIONS,
  type Direction,
  type Facing,
  isDirection,
  type MovementVector,
  type Vector2,
  type Vector3,
} from "./vector";

describe("vector primitives", () => {
  test("CARDINAL_DIRECTIONS is frozen and lists 4 values", () => {
    expect(Object.isFrozen(CARDINAL_DIRECTIONS)).toBe(true);
    expect(CARDINAL_DIRECTIONS).toEqual(["up", "down", "left", "right"]);
  });

  test("isDirection narrows cardinal strings", () => {
    expect(isDirection("up")).toBe(true);
    expect(isDirection("down")).toBe(true);
    expect(isDirection("northeast")).toBe(false);
    expect(isDirection("")).toBe(false);
  });

  test("Vector2 and Vector3 are structurally distinct via z requirement", () => {
    const v2: Vector2 = { x: 1, y: 2 };
    const v3: Vector3 = { x: 1, y: 2, z: 3 };
    expect(v2.x + v2.y).toBe(3);
    expect(v3.z).toBe(3);
  });

  test("MovementVector is structurally Vector2-compatible", () => {
    const move: MovementVector = { x: -1, y: 0 };
    const position: Vector2 = move;
    expect(position.x).toBe(-1);
  });

  test("Facing accepts Direction literals", () => {
    const direction: Direction = "up";
    const facing: Facing = direction;
    expect(facing).toBe("up");
  });
});

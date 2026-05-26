/**
 * Unit tests for the depreciation adjustment helper.
 */

import { describe, expect, it } from "bun:test";
import {
  computeDepreciationAdjustmentRate,
  FINANCE_DEPRECIATION_CRITICAL_ADJUSTMENT_RATE,
  FINANCE_DEPRECIATION_WARNING_ADJUSTMENT_RATE,
} from "./depreciation";

describe("computeDepreciationAdjustmentRate", () => {
  it("returns the identity multiplier when there are no findings", () => {
    expect(computeDepreciationAdjustmentRate(0, 0)).toBe(1);
  });

  it("adds the configured critical and warning rates per finding", () => {
    expect(computeDepreciationAdjustmentRate(1, 0)).toBeCloseTo(
      1 + FINANCE_DEPRECIATION_CRITICAL_ADJUSTMENT_RATE,
      10,
    );
    expect(computeDepreciationAdjustmentRate(0, 1)).toBeCloseTo(
      1 + FINANCE_DEPRECIATION_WARNING_ADJUSTMENT_RATE,
      10,
    );
  });

  it("combines critical and warning counts with the published 1% / 0.5% rates", () => {
    expect(computeDepreciationAdjustmentRate(2, 4)).toBeCloseTo(1 + 0.02 + 0.02, 10);
    expect(computeDepreciationAdjustmentRate(5, 10)).toBeCloseTo(1 + 0.05 + 0.05, 10);
  });
});

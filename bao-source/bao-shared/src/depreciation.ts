/**
 * Finance depreciation utilities. Single source of truth for adjustment
 * calculations consumed by finance routes, report PDFs, and analysis surfaces.
 *
 * The two underlying rate constants are inlined here to keep the module
 * self-contained without coupling to bao-shared's broader constants tree.
 */

/** Rate applied per CRITICAL or EMERGENCY prediction in the adjustment formula. */
export const FINANCE_DEPRECIATION_CRITICAL_ADJUSTMENT_RATE = 0.01;

/** Rate applied per WARNING prediction in the adjustment formula. */
export const FINANCE_DEPRECIATION_WARNING_ADJUSTMENT_RATE = 0.005;

/**
 * Computes the aggregate depreciation adjustment rate from critical and warning
 * prediction counts.
 *
 * @param criticalCount - Count of CRITICAL and EMERGENCY predictions.
 * @param warningCount - Count of WARNING predictions.
 * @returns Adjustment multiplier (1 + critical * 0.01 + warning * 0.005).
 */
export const computeDepreciationAdjustmentRate = (
  criticalCount: number,
  warningCount: number,
): number =>
  1 +
  criticalCount * FINANCE_DEPRECIATION_CRITICAL_ADJUSTMENT_RATE +
  warningCount * FINANCE_DEPRECIATION_WARNING_ADJUSTMENT_RATE;

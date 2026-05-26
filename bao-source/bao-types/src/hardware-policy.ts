/**
 * Hardware policy response types.
 *
 * Provides shared TypeScript types derived from hardware policy schemas.
 *
 * @shared/types/hardware-policy.ts
 */

import type {
  HardwarePolicySnapshot,
  HardwarePolicySnapshotResponse,
  HardwarePolicyStatus,
} from "@baohaus/bao-schemas/hardware-policy.schemas";

/** Inferred type from the HardwarePolicyStatusType schema. */
export type HardwarePolicyStatusType = HardwarePolicyStatus;
/** Inferred type from the HardwarePolicySnapshotType schema. */
export type HardwarePolicySnapshotType = HardwarePolicySnapshot;
/** Inferred type from the HardwarePolicySnapshotResponseType schema. */
export type HardwarePolicySnapshotResponseType = HardwarePolicySnapshotResponse;

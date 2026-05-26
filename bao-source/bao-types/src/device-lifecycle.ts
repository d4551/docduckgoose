/**
 * Device lifecycle API types.
 *
 * Exposes shared TypeScript types derived from device lifecycle schemas.
 *
 * @shared/types/device-lifecycle.ts
 */

import type {
  DeviceLifecycleAction,
  DeviceLifecycleDeviceSummary,
  DeviceLifecycleEnrollRequest,
  DeviceLifecycleProvisionRequest,
  DeviceLifecycleResponse,
} from "@baohaus/bao-schemas/device-lifecycle.schemas";

/** Inferred type from the DeviceLifecycleActionType schema. */
export type DeviceLifecycleActionType = DeviceLifecycleAction;
/** Inferred type from the DeviceLifecycleDeviceSummaryType schema. */
export type DeviceLifecycleDeviceSummaryType = DeviceLifecycleDeviceSummary;
/** Inferred type from the DeviceLifecycleEnrollRequestType schema. */
export type DeviceLifecycleEnrollRequestType = DeviceLifecycleEnrollRequest;
/** Inferred type from the DeviceLifecycleProvisionRequestType schema. */
export type DeviceLifecycleProvisionRequestType = DeviceLifecycleProvisionRequest;
/** Inferred type from the DeviceLifecycleResponseType schema. */
export type DeviceLifecycleResponseType = DeviceLifecycleResponse;

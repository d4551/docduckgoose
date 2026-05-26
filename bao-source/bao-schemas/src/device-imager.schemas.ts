/**
 * Device imager schemas.
 *
 * Re-exports imager capture options for device capture payloads.
 *
 * @shared/schemas/device-imager
 */

import type { Static } from "@baohaus/baobox/elysia";
import { ImagerCaptureOptionsSchema } from "./imager-source.schemas";

/**
 * Imager capture body schema for device capture requests.
 */
export const DeviceImagerCaptureBodySchema = ImagerCaptureOptionsSchema;

/** Inferred type from the DeviceImagerCaptureBody schema. */
export type DeviceImagerCaptureBody = Static<typeof DeviceImagerCaptureBodySchema>;

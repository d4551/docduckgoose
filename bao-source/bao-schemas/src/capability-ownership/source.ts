/**
 * Capability ownership source metadata schema.
 *
 * @shared/schemas/capability-ownership/source.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BunBuddyKindSchema } from "../bunbuddy.schemas.ts";
import { DriverRegistryScopeSchema } from "../driver-registry.schemas.ts";
import {
  LibraryCategorySchema,
  LibrarySourceSchema,
  LibraryStatusSchema,
} from "../library-registry.schemas.ts";
import { CapabilityOwnershipKindSchema } from "./enums.ts";

/**
 * Schema for ownership source metadata.
 */
export const CapabilityOwnershipSourceSchema = Type.Object(
  {
    kind: CapabilityOwnershipKindSchema,
    capabilityId: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Capability registry identifier when sourced from plugin/bunbuddy",
      }),
    ),
    bunbuddyKind: Type.Optional(BunBuddyKindSchema),
    library: Type.Optional(
      Type.Object(
        {
          name: Type.String({ minLength: 1 }),
          source: LibrarySourceSchema,
          runtime: Type.String({ minLength: 1 }),
          status: Type.Optional(LibraryStatusSchema),
          categories: Type.Optional(Type.Array(LibraryCategorySchema)),
        },
        { additionalProperties: false },
      ),
    ),
    driver: Type.Optional(
      Type.Object(
        {
          key: Type.String({ minLength: 1 }),
          packageName: Type.String({ minLength: 1 }),
          scope: DriverRegistryScopeSchema,
          notes: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
        },
        { additionalProperties: false },
      ),
    ),
    device: Type.Optional(
      Type.Object(
        {
          id: Type.String({ minLength: 1 }),
          deviceType: Type.String({ minLength: 1 }),
          status: Type.Optional(Type.String({ minLength: 1 })),
          transport: Type.Optional(Type.String({ minLength: 1 })),
          driverPackage: Type.Optional(Type.String({ minLength: 1 })),
          driverStatus: Type.Optional(Type.String({ minLength: 1 })),
          driverVersion: Type.Optional(Type.String({ minLength: 1 })),
          discoverySource: Type.Optional(Type.String({ minLength: 1 })),
          bunbuddyId: Type.Optional(Type.String({ minLength: 1 })),
          lastSeen: Type.Optional(Type.String({ format: "date-time" })),
          isSimulated: Type.Optional(Type.Boolean()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership sources.
 */
export type CapabilityOwnershipSource = Static<typeof CapabilityOwnershipSourceSchema>;

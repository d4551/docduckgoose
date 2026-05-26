/**
 * Shared Prisma-adjacent entity types.
 *
 * Only exports the shapes that are actively consumed outside the server Prisma
 * boundary. This keeps the shared layer tied to real contracts instead of
 * placeholder aliases.
 *
 * @shared/types/prisma.ts
 */

/** Shared enum shape used by generated Prisma enum values. */
export type $Enums = Record<string, Record<string, string>>;

/** JSON-compatible leaf value for Prisma JSON fields. */
type PrismaJsonLeaf = string | number | boolean | null;

/** JSON-compatible object shape for Prisma JSON fields. */
interface PrismaJsonObject {
  readonly [key: string]: PrismaJsonValue | undefined;
}

/** JSON-compatible value for Prisma JSON fields. */
type PrismaJsonValue = PrismaJsonLeaf | PrismaJsonObject | readonly PrismaJsonValue[];

/** Type-safe ID type for Prisma-backed entities. */
export type PrismaId = string;

/** Type-safe DateTime type for Prisma-backed entities. */
export type PrismaDateTime = Date;

/** Type-safe JSON value shared across Prisma-backed contracts. */
export type PrismaJson = PrismaJsonValue;

/**
 * Connected hardware or virtual device record exposed through the shared
 * capability-ownership surfaces.
 */
export interface Device {
  id: string;
  name: string;
  deviceType: string;
  status: string | null;
  transport: string;
  driverPackage: string | null;
  driverStatus: string | null;
  driverVersion: string | null;
  discoverySource: string | null;
  bunbuddyId: string | null;
  capabilitiesJson: string | null;
  discoveryMetadataJson: string | null;
  lastSeen: PrismaDateTime | null;
  isSimulated: boolean | null;
}

/**
 * Canonical model-registry row consumed by shared AI model normalization.
 */
export interface ModelRegistry {
  id: string;
  name: string;
  version: string | null;
  provider: string | null;
  type: string | null;
  accuracy: number | null;
  parameters: PrismaJson | null;
  status: string | null;
  source: string | null;
  runtime: string | null;
  requirements: string | null;
  loaded: boolean | null;
  deploymentEndpoint: string | null;
  storagePath: string | null;
  hfRevision: string | null;
  files: PrismaJson | null;
  bytes: bigint | null;
  metrics: PrismaJson | null;
  tags: PrismaJson | null;
  offlineReady?: boolean | number | null;
  offline_ready?: boolean | number | null;
  lastTrainedAt: PrismaDateTime | null;
  lastUsed: PrismaDateTime | null;
  createdAt: PrismaDateTime;
  updatedAt: PrismaDateTime;
}

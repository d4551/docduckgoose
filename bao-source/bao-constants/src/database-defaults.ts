/**
 * Canonical database defaults shared across scripts and runtime config.
 *
 * @shared/constants/database-defaults
 */

import { LOOPBACK_FALLBACK_HOST } from "./loopback-hosts";

/** Default PostgreSQL database name for Baohaus runtime deployments. */
export const DEFAULT_DATABASE_NAME = "baohaus_db";

/** Default PostgreSQL username for Baohaus runtime deployments. */
export const DEFAULT_DATABASE_USER = "postgres";

/** Default PostgreSQL host for Baohaus runtime deployments when no host is configured. */
export const DEFAULT_DATABASE_HOST: "127.0.0.1" = LOOPBACK_FALLBACK_HOST;

/** Default PostgreSQL port for Baohaus runtime deployments when no port is configured. */
export const DEFAULT_DATABASE_PORT = "5432";

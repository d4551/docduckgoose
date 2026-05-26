/**
 * @baohaus/prisma-libsql configuration seam.
 *
 * Centralizes all environment access for the LibSQL adapter.
 * No implementation path should read Bun.env directly.
 */

interface LibSQLConfig {
  readonly url: string;
  readonly authToken: string | undefined;
  readonly maxConnections: number;
}

function getLibSQLConfig(): LibSQLConfig {
  const url = getEnv("LIBSQL_URL") ?? "file:./db.sqlite";
  const authToken = getEnv("LIBSQL_AUTH_TOKEN");
  const maxConnections = Number.parseInt(getEnv("LIBSQL_MAX_CONNECTIONS") ?? "5", 10);

  return {
    url,
    authToken,
    maxConnections: Number.isFinite(maxConnections) && maxConnections > 0 ? maxConnections : 5,
  };
}

function getEnv(name: string): string | undefined {
  const value = Bun.env[name];
  if (value === undefined || value.length === 0) {
    return undefined;
  }
  return value;
}

export type { LibSQLConfig };
export { getLibSQLConfig };

import { afterEach, describe, expect, it } from "bun:test";
import { getBaoBossConfig } from "./env-platform.js";
import {
  getServerListenConfig,
  getWorkflowExecuteRateLimitPerMinute,
  isProductionEnvironment,
} from "./env-server.js";

const originalEnvironment = {
  BAO_BOSS_DATABASE_URL: Bun.env.BAO_BOSS_DATABASE_URL,
  BAO_BOSS_MAINTENANCE_INTERVAL_SECONDS: Bun.env.BAO_BOSS_MAINTENANCE_INTERVAL_SECONDS,
  HOST: Bun.env.HOST,
  NAVI_WORKFLOW_EXECUTE_RPM: Bun.env.NAVI_WORKFLOW_EXECUTE_RPM,
  NODE_ENV: Bun.env.NODE_ENV,
  PORT: Bun.env.PORT,
};
const DEFAULT_MAINTENANCE_INTERVAL_SECONDS = 120;

afterEach(() => {
  Bun.env.BAO_BOSS_DATABASE_URL = originalEnvironment.BAO_BOSS_DATABASE_URL;
  Bun.env.BAO_BOSS_MAINTENANCE_INTERVAL_SECONDS =
    originalEnvironment.BAO_BOSS_MAINTENANCE_INTERVAL_SECONDS;
  Bun.env.HOST = originalEnvironment.HOST;
  Bun.env.NAVI_WORKFLOW_EXECUTE_RPM = originalEnvironment.NAVI_WORKFLOW_EXECUTE_RPM;
  Bun.env.NODE_ENV = originalEnvironment.NODE_ENV;
  Bun.env.PORT = originalEnvironment.PORT;
});

describe("@baohaus/har-gow-config", () => {
  it("parses listen configuration from the environment", () => {
    Bun.env.HOST = "127.0.0.1";
    Bun.env.PORT = "19000";

    expect(getServerListenConfig()).toEqual({
      host: "127.0.0.1",
      port: 19000,
    });
  });

  it("falls back to defaults for invalid numeric configuration", () => {
    Bun.env.NAVI_WORKFLOW_EXECUTE_RPM = "invalid";
    Bun.env.BAO_BOSS_MAINTENANCE_INTERVAL_SECONDS = "invalid";

    expect(getWorkflowExecuteRateLimitPerMinute()).toBe(0);
    expect(getBaoBossConfig().maintenanceIntervalSeconds).toBe(
      DEFAULT_MAINTENANCE_INTERVAL_SECONDS,
    );
  });

  it("derives production mode and queue connection settings", () => {
    Bun.env.NODE_ENV = "production";
    Bun.env.BAO_BOSS_DATABASE_URL = "postgres://localhost:5432/baohaus";

    expect(isProductionEnvironment()).toBe(true);
    expect(getBaoBossConfig().connectionString).toBe("postgres://localhost:5432/baohaus");
  });
});

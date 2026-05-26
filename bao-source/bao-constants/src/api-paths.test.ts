import { describe, expect, test } from "bun:test";
import {
  API_BASE,
  API_PATHS,
  API_ROOT,
  API_V1_BAO_AUTHZ_CHECK,
  BAO_AUTHZ_CHECK_RELATIVE,
} from "./api-paths";
import { AUTH_ROUTE_DEFINITIONS } from "./auth-routes";

const REQUIRED_BAO_API_PATHS = [
  "baoAuthzCheck",
  "baoAuthzCheckRelative",
  "baoObservability",
  "baoObservabilityAlertStream",
  "baoArchiveAuthoringBase",
  "baoArchiveAuthoring",
  "baoArchiveAuthoringById",
  "baoArchiveAuthoringRun",
  "baoArchiveAuthoringRetry",
  "baoArchiveAuthoringAnalysis",
  "baoArchiveAuthoringMapping",
  "baoArchiveAuthoringVerify",
  "baoArchiveAuthoringInstall",
] as const;

describe("canonical API paths", () => {
  test("keeps .bao API paths rooted under the canonical API base", () => {
    expect(API_PATHS.root).toBe(API_ROOT);
    expect(API_PATHS.base).toBe(API_BASE);
    expect(API_PATHS.baoAuthzCheckRelative).toBe(BAO_AUTHZ_CHECK_RELATIVE);
    expect(API_PATHS.baoAuthzCheck).toBe(API_V1_BAO_AUTHZ_CHECK);

    for (const key of REQUIRED_BAO_API_PATHS) {
      expect(API_PATHS[key]).toBeTruthy();
    }
  });

  test("keeps Better Auth routes relative to the auth base path", () => {
    expect(AUTH_ROUTE_DEFINITIONS.length).toBeGreaterThan(0);

    for (const route of AUTH_ROUTE_DEFINITIONS) {
      expect(route.path.startsWith("/")).toBe(true);
      expect(route.path.startsWith(API_PATHS.authBase)).toBe(false);
    }
  });
});

import { describe, expect, test } from "bun:test";
import {
  type BaoDisposableResource,
  type BaoHealthcheckResult,
  type BaoLifecycleContext,
  type BaoTargetHandlerContext,
  type BaoTargetHandlerContract,
  type BaoTargetSchemaHandler,
  isTargetHandlerSuccess,
  targetHandlerFailure,
  targetHandlerSuccess,
} from "./target-handler.ts";

const TEST_LATENCY_MS = 5;

describe("target handler result builders", () => {
  test("targetHandlerSuccess → ok: true", () => {
    const r = targetHandlerSuccess({ message: "installed" });
    expect(r.ok).toBe(true);
    expect(r.message).toBe("installed");
  });

  test("targetHandlerSuccess w/ requiresRestart", () => {
    const r = targetHandlerSuccess({ message: "done", requiresRestart: true });
    expect(r.requiresRestart).toBe(true);
  });

  test("targetHandlerFailure → ok: false", () => {
    const r = targetHandlerFailure({ message: "bad", retryable: false, phase: "install" });
    expect(r.ok).toBe(false);
    expect(r.phase).toBe("install");
  });

  test("isTargetHandlerSuccess type guard", () => {
    const success = targetHandlerSuccess({ message: "ok" });
    const failure = targetHandlerFailure({ message: "err", retryable: true, phase: "validate" });
    expect(isTargetHandlerSuccess(success)).toBe(true);
    expect(isTargetHandlerSuccess(failure)).toBe(false);
  });
});

describe("lifecycle hooks contract", () => {
  test("target handler can implement onActivate returning disposable", async () => {
    let disposed = false;
    const targetHandler: BaoTargetHandlerContract = {
      kind: "test-target",
      displayName: "Test",
      hotInstallable: true,
      retryable: false,
      resolveIdentifier: (t) => String(t.target),
      install: async () => targetHandlerSuccess({ message: "ok" }),
      uninstall: async () => targetHandlerSuccess({ message: "ok" }),
      onActivate(_ctx: BaoLifecycleContext): Promise<BaoDisposableResource> {
        return Promise.resolve({
          dispose: () => {
            disposed = true;
          },
        });
      },
    };

    const ctx: BaoLifecycleContext = { targetId: "t1", kind: "test-target" };
    const onActivate = targetHandler.onActivate;
    if (onActivate === undefined) {
      throw new Error("Expected targetHandler.onActivate to be defined");
    }

    const resource = await onActivate(ctx);
    expect(resource).toBeDefined();
    await resource.dispose();
    expect(disposed).toBe(true);
  });

  test("target handler can implement healthcheck", async () => {
    const targetHandler: BaoTargetHandlerContract = {
      kind: "test-target",
      displayName: "Test",
      hotInstallable: true,
      retryable: false,
      resolveIdentifier: (t) => String(t.target),
      install: async () => targetHandlerSuccess({ message: "ok" }),
      uninstall: async () => targetHandlerSuccess({ message: "ok" }),
      healthcheck(_ctx: BaoLifecycleContext): Promise<BaoHealthcheckResult> {
        return Promise.resolve({ healthy: true, latencyMs: TEST_LATENCY_MS });
      },
    };

    const healthcheck = targetHandler.healthcheck;
    if (healthcheck === undefined) {
      throw new Error("Expected targetHandler.healthcheck to be defined");
    }

    const result = await healthcheck({ targetId: "t1", kind: "test-target" });
    expect(result.healthy).toBe(true);
    expect(result.latencyMs).toBe(TEST_LATENCY_MS);
  });

  test("target handler without lifecycle hooks still valid", () => {
    const targetHandler: BaoTargetHandlerContract = {
      kind: "minimal",
      displayName: "Minimal",
      hotInstallable: false,
      retryable: false,
      resolveIdentifier: (t) => String(t.target),
      install: async () => targetHandlerSuccess({ message: "ok" }),
      uninstall: async () => targetHandlerSuccess({ message: "ok" }),
    };

    expect(targetHandler.onActivate).toBeUndefined();
    expect(targetHandler.onDeactivate).toBeUndefined();
    expect(targetHandler.healthcheck).toBeUndefined();
  });

  test("install/uninstall receive structured BaoTargetHandlerContext", async () => {
    let observedTargetId = "";
    let observedManifestName = "";
    const targetHandler: BaoTargetHandlerContract = {
      kind: "context-target",
      displayName: "Context",
      hotInstallable: true,
      retryable: false,
      resolveIdentifier: (t) => String(t.target),
      async install(context: BaoTargetHandlerContext) {
        observedTargetId = String(context.target.target);
        observedManifestName = context.manifest.identity.name;
        return targetHandlerSuccess({ message: "installed" });
      },
      uninstall: async () => targetHandlerSuccess({ message: "uninstalled" }),
    };

    const context: BaoTargetHandlerContext = {
      target: { target: "t-1", kind: "context-target" },
      manifest: {
        schemaVersion: 1,
        specRevision: "2026-04-19",
        mediaType: "application/vnd.baohaus.bao.archive.v1+tar",
        formatKind: "archive",
        manifestEncoding: "json",
        identity: {
          packageId: "p",
          name: "sample",
          displayName: "S",
          version: "0.0.1",
          description: "",
          license: "MIT",
          authors: [],
          owners: [],
        },
        runtime: {
          engines: { bun: "1.x" },
          platforms: ["linux-x64"],
          architectures: ["x64"],
        },
        targets: [],
        payload: {},
        surfaces: {},
        security: {},
        integrity: {},
        release: {},
        archive: {},
        build: {},
      },
    };

    const result = await targetHandler.install(context);
    expect(result.ok).toBe(true);
    expect(observedTargetId).toBe("t-1");
    expect(observedManifestName).toBe("sample");
  });
});

describe("schema handler port", () => {
  test("BaoTargetSchemaHandler carries schema + optional validate()", () => {
    const handler: BaoTargetSchemaHandler = {
      kind: "schema-target",
      schema: { type: "object" },
      validate(target) {
        if (typeof target.providerId !== "string") {
          return [{ path: "providerId", message: "required", severity: "error" }];
        }
        return [];
      },
    };

    expect(handler.kind).toBe("schema-target");
    const issues = handler.validate?.({ target: "x", kind: "schema-target" }) ?? [];
    expect(issues.length).toBe(1);
    expect(issues[0]?.severity).toBe("error");
  });
});

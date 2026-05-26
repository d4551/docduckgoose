import { describe, expect, mock, test } from "bun:test";
import { createManagedPollingLifecycle } from "./managed-polling-lifecycle";

const silentLogger = () => ({
  info: mock(() => undefined),
  warn: mock(() => undefined),
});

describe("createManagedPollingLifecycle", () => {
  test("start triggers beforeStart and an immediate run when runOnStart is default", async () => {
    const logger = silentLogger();
    const beforeStart = mock(async () => undefined);
    const run = mock(async () => "value");

    const lifecycle = createManagedPollingLifecycle({
      name: "test-poller",
      logger,
      intervalMs: 1_000_000,
      startedEvent: "poller.started",
      stoppedEvent: "poller.stopped",
      failedEvent: "poller.failed",
      beforeStart,
      run,
    });

    await lifecycle.start();
    await lifecycle.stop();

    expect(beforeStart).toHaveBeenCalledTimes(1);
    expect(run).toHaveBeenCalledTimes(1);
  });

  test("runOnStart=false skips the immediate run", async () => {
    const logger = silentLogger();
    const run = mock(async () => undefined);

    const lifecycle = createManagedPollingLifecycle({
      name: "no-immediate",
      logger,
      intervalMs: 1_000_000,
      startedEvent: "poller.started",
      stoppedEvent: "poller.stopped",
      failedEvent: "poller.failed",
      run,
      runOnStart: false,
    });

    await lifecycle.start();
    await lifecycle.stop();

    expect(run).not.toHaveBeenCalled();
  });

  test("start is idempotent and only logs startedEvent once", async () => {
    const logger = silentLogger();
    let releaseBeforeStart: (() => void) | null = null;
    const beforeStartBarrier = new Promise<void>((resolve) => {
      releaseBeforeStart = resolve;
    });
    const beforeStart = mock(async () => {
      await beforeStartBarrier;
    });

    const lifecycle = createManagedPollingLifecycle({
      name: "idem",
      logger,
      intervalMs: 1_000_000,
      startedEvent: "poller.started",
      stoppedEvent: "poller.stopped",
      failedEvent: "poller.failed",
      beforeStart,
      run: async () => undefined,
      runOnStart: false,
    });

    const firstStart = lifecycle.start();
    const secondStart = lifecycle.start();
    releaseBeforeStart?.();
    await Promise.all([firstStart, secondStart]);
    await lifecycle.start();
    await lifecycle.stop();

    expect(beforeStart).toHaveBeenCalledTimes(1);
    const startedCount = logger.info.mock.calls.filter((c) => c[0] === "poller.started").length;
    expect(startedCount).toBe(1);
  });

  test("stop runs afterStop hook and emits stoppedEvent once", async () => {
    const logger = silentLogger();
    const afterStop = mock(async () => undefined);

    const lifecycle = createManagedPollingLifecycle({
      name: "with-after",
      logger,
      intervalMs: 1_000_000,
      startedEvent: "poller.started",
      stoppedEvent: "poller.stopped",
      failedEvent: "poller.failed",
      run: async () => undefined,
      afterStop,
      runOnStart: false,
    });

    await lifecycle.start();
    await lifecycle.stop();
    await lifecycle.stop();

    expect(afterStop).toHaveBeenCalledTimes(1);
    const stoppedCount = logger.info.mock.calls.filter((c) => c[0] === "poller.stopped").length;
    expect(stoppedCount).toBe(1);
  });

  test("stop awaits an in-flight run before resolving", async () => {
    const logger = silentLogger();
    let resolveRun: (() => void) | null = null;
    let runFinished = false;

    const lifecycle = createManagedPollingLifecycle({
      name: "await-inflight",
      logger,
      intervalMs: 1_000_000,
      startedEvent: "poller.started",
      stoppedEvent: "poller.stopped",
      failedEvent: "poller.failed",
      run: async () => {
        await new Promise<void>((resolve) => {
          resolveRun = resolve;
        });
        runFinished = true;
      },
    });

    await lifecycle.start();
    const stopPromise = lifecycle.stop();

    expect(runFinished).toBe(false);
    resolveRun?.();
    await stopPromise;
    expect(runFinished).toBe(true);
  });
});

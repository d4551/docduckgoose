import { describe, expect, mock, test } from "bun:test";
import {
  clearManagedInterval,
  executeManagedIntervalTask,
  type ManagedIntervalLogger,
} from "./managed-interval";

const silentLogger = (): {
  logger: ManagedIntervalLogger;
  info: ReturnType<typeof mock>;
  warn: ReturnType<typeof mock>;
} => {
  const info = mock(() => undefined);
  const warn = mock(() => undefined);
  return { logger: { info, warn }, info, warn };
};

describe("executeManagedIntervalTask", () => {
  test("short-circuits when isInFlight returns true", async () => {
    const { logger } = silentLogger();
    const run = mock(async () => "value");
    const setInFlight = mock(() => undefined);

    await executeManagedIntervalTask({
      isInFlight: () => true,
      setInFlight,
      logger,
      failureEvent: "tick.failed",
      run,
    });

    expect(run).not.toHaveBeenCalled();
    expect(setInFlight).not.toHaveBeenCalled();
  });

  test("success path calls onSuccess and toggles in-flight true then false", async () => {
    const { logger } = silentLogger();
    const onSuccess = mock((value: string) => {
      expect(value).toBe("ok");
    });
    const setInFlight = mock(() => undefined);

    await executeManagedIntervalTask({
      isInFlight: () => false,
      setInFlight,
      logger,
      failureEvent: "tick.failed",
      run: async () => "ok",
      onSuccess,
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(setInFlight).toHaveBeenCalledTimes(2);
    expect(setInFlight.mock.calls[0]?.[0]).toBe(true);
    expect(setInFlight.mock.calls[1]?.[0]).toBe(false);
  });

  test("failure path warns with mapFailureData payload", async () => {
    const { logger, warn } = silentLogger();
    const mapFailureData = mock((error: Error) => ({ detail: error.message }));

    await executeManagedIntervalTask({
      isInFlight: () => false,
      setInFlight: () => undefined,
      logger,
      failureEvent: "tick.failed",
      run: async () => {
        throw new Error("boom");
      },
      mapFailureData,
    });

    expect(warn).toHaveBeenCalledTimes(1);
    const [event, payload] = warn.mock.calls[0] ?? [];
    expect(event).toBe("tick.failed");
    expect(payload).toMatchObject({ message: "boom", detail: "boom" });
  });
});

describe("clearManagedInterval", () => {
  test("returns null when handle is already null", () => {
    expect(clearManagedInterval(null)).toBeNull();
  });

  test("clears live handle and returns null", () => {
    const handle = setInterval(() => undefined, 1_000_000);
    const result = clearManagedInterval(handle);
    expect(result).toBeNull();
  });
});

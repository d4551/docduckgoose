import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import {
  readLocalStorageResult,
  removeLocalStorageResult,
  type StorageError,
  writeLocalStorageResult,
} from "./storage-safe";

interface StorageBag {
  data: Map<string, string>;
  throwOnWrite?: Error;
  throwOnRead?: Error;
  throwOnRemove?: Error;
}

const installLocalStorage = (bag: StorageBag): void => {
  const fake: Storage = {
    get length() {
      return bag.data.size;
    },
    clear: () => bag.data.clear(),
    key: (index: number) => Array.from(bag.data.keys())[index] ?? null,
    getItem: (key: string) => {
      if (bag.throwOnRead) throw bag.throwOnRead;
      return bag.data.get(key) ?? null;
    },
    setItem: (key: string, value: string) => {
      if (bag.throwOnWrite) throw bag.throwOnWrite;
      bag.data.set(key, value);
    },
    removeItem: (key: string) => {
      if (bag.throwOnRemove) throw bag.throwOnRemove;
      bag.data.delete(key);
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: fake,
    writable: true,
    configurable: true,
  });
};

const removeLocalStorage = (): void => {
  Object.defineProperty(globalThis, "localStorage", {
    value: undefined,
    writable: true,
    configurable: true,
  });
};

const bag: StorageBag = { data: new Map() };

beforeEach(() => {
  bag.data = new Map();
  bag.throwOnRead = undefined;
  bag.throwOnWrite = undefined;
  bag.throwOnRemove = undefined;
  installLocalStorage(bag);
});

afterEach(() => {
  removeLocalStorage();
});

describe("readLocalStorageResult", () => {
  test("returns ok(null) for missing key", () => {
    const result = readLocalStorageResult("missing");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBeNull();
  });

  test("returns ok(value) for present key", () => {
    bag.data.set("bao.theme", "dark");
    const result = readLocalStorageResult("bao.theme");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe("dark");
  });

  test("returns err(unavailable) when localStorage absent", () => {
    removeLocalStorage();
    const result = readLocalStorageResult("any");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe("unavailable");
  });

  test("returns err(access-failed) when getter throws", () => {
    bag.throwOnRead = new Error("denied");
    const result = readLocalStorageResult("any");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      const error: StorageError = result.error;
      if (error.kind === "access-failed") {
        expect(error.detail).toBe("denied");
      } else {
        throw new Error(`expected access-failed, got ${error.kind}`);
      }
    }
  });
});

describe("writeLocalStorageResult", () => {
  test("returns ok and persists value", () => {
    const result = writeLocalStorageResult("bao.k", "v");
    expect(result.ok).toBe(true);
    expect(bag.data.get("bao.k")).toBe("v");
  });

  test("returns err(quota-exceeded) when QuotaExceededError thrown", () => {
    const quota = new Error("Out of quota");
    quota.name = "QuotaExceededError";
    bag.throwOnWrite = quota;
    const result = writeLocalStorageResult("bao.k", "v");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe("quota-exceeded");
  });

  test("returns err(quota-exceeded) when message contains 'quota'", () => {
    bag.throwOnWrite = new Error("storage quota reached");
    const result = writeLocalStorageResult("bao.k", "v");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe("quota-exceeded");
  });

  test("returns err(access-failed) for non-quota errors", () => {
    bag.throwOnWrite = new Error("SecurityError");
    const result = writeLocalStorageResult("bao.k", "v");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe("access-failed");
  });

  test("returns err(unavailable) when localStorage absent", () => {
    removeLocalStorage();
    const result = writeLocalStorageResult("bao.k", "v");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe("unavailable");
  });
});

describe("removeLocalStorageResult", () => {
  test("removes existing key and returns ok", () => {
    bag.data.set("bao.k", "v");
    const result = removeLocalStorageResult("bao.k");
    expect(result.ok).toBe(true);
    expect(bag.data.has("bao.k")).toBe(false);
  });

  test("returns err(unavailable) when localStorage absent", () => {
    removeLocalStorage();
    const result = removeLocalStorageResult("bao.k");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe("unavailable");
  });
});

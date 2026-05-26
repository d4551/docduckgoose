import { afterEach, describe, expect, it } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DocStore } from "../src/services/doc-store.ts";

const makeTempStore = (): { store: DocStore; dir: string } => {
  const dir = mkdtempSync(join(tmpdir(), "goose-word-pagination-"));
  const dbPath = join(dir, "docs.db");
  return { store: new DocStore(dbPath), dir };
};

describe("DocStore.list pagination", () => {
  let store: DocStore | null = null;
  let dir = "";

  afterEach(() => {
    if (store !== null) {
      store.close();
      store = null;
    }
    if (dir) {
      rmSync(dir, { recursive: true, force: true });
      dir = "";
    }
  });

  it("returns all docs when no limit/offset provided", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    store.create("Doc A", "body-a");
    store.create("Doc B", "body-b");
    store.create("Doc C", "body-c");
    const all = store.list();
    expect(all.length).toBe(3);
  });

  it("returns correct slice with limit and offset", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    for (let i = 0; i < 10; i++) {
      store.create(`Doc ${i}`, `body-${i}`);
    }
    const page = store.list(3, 0);
    expect(page.length).toBe(3);

    const page2 = store.list(3, 3);
    expect(page2.length).toBe(3);

    const ids1 = page.map((d) => d.id);
    const ids2 = page2.map((d) => d.id);
    const overlap = ids1.filter((id) => ids2.includes(id));
    expect(overlap.length).toBe(0);
  });

  it("returns empty array when offset exceeds total docs", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    store.create("Only Doc", "body");
    const result = store.list(10, 999);
    expect(result.length).toBe(0);
  });

  it("returns empty array when limit is 0", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    store.create("Some Doc", "body");
    const result = store.list(0, 0);
    expect(result.length).toBe(0);
  });

  it("orders results by updated_at descending", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    const first = store.create("First", "a");
    const second = store.create("Second", "b");
    const third = store.create("Third", "c");
    const all = store.list();
    expect(all[0]?.id).toBe(third.id);
    expect(all[1]?.id).toBe(second.id);
    expect(all[2]?.id).toBe(first.id);
  });

  it("returns remaining docs when limit exceeds available after offset", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    for (let i = 0; i < 5; i++) {
      store.create(`Doc ${i}`, `body-${i}`);
    }
    const result = store.list(100, 3);
    expect(result.length).toBe(2);
  });
});

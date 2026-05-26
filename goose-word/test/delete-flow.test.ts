import { afterEach, describe, expect, it } from "bun:test";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ROUTES } from "../src/config/routes.ts";
import { DocStore } from "../src/services/doc-store.ts";

const makeTempStore = (): { store: DocStore; dir: string } => {
  const dir = mkdtempSync(join(tmpdir(), "goose-word-delete-"));
  const dbPath = join(dir, "docs.db");
  return { store: new DocStore(dbPath), dir };
};

describe("delete flow", () => {
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

  it("delete route pattern exists in ROUTES", () => {
    expect(ROUTES.docs.deletePattern).toBe("/docs/:id/delete");
  });

  it("delete API route pattern exists in ROUTES", () => {
    expect(ROUTES.docs.apiPattern).toBe("/api/docs/:id");
  });

  it("delete removes doc from store", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    const doc = store.create("Delete Target", "content");
    expect(store.get(doc.id)).not.toBeNull();

    const deleted = store.delete(doc.id);
    expect(deleted).not.toBeNull();
    expect(deleted?.id).toBe(doc.id);
    expect(store.get(doc.id)).toBeNull();
  });

  it("delete removes mirrored markdown file", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    const doc = store.create("File Delete", "md content");
    expect(existsSync(doc.filePath)).toBe(true);

    store.delete(doc.id);
    expect(existsSync(doc.filePath)).toBe(false);
  });

  it("delete of non-existent doc returns null", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    const result = store.delete("non-existent-id");
    expect(result).toBeNull();
  });

  it("double delete returns null on second call", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    const doc = store.create("Double Delete", "x");
    store.delete(doc.id);
    const second = store.delete(doc.id);
    expect(second).toBeNull();
  });

  it("delete does not affect other docs", () => {
    const tmp = makeTempStore();
    store = tmp.store;
    dir = tmp.dir;
    const keep = store.create("Keep Me", "a");
    const remove = store.create("Remove Me", "b");
    store.delete(remove.id);

    expect(store.get(keep.id)).not.toBeNull();
    expect(store.list().length).toBe(1);
  });

  it("delete path helper produces correct URL", () => {
    expect(ROUTES.docs.delete("abc-123")).toBe("/docs/abc-123/delete");
  });
});

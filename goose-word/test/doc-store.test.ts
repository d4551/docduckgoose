import { expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DocStore } from "../src/services/doc-store.ts";

test("DocStore create and save mirrors markdown file", () => {
  const dir = mkdtempSync(join(tmpdir(), "goose-word-test-"));
  const dbPath = join(dir, "docs.db");
  const store = new DocStore(dbPath);
  const doc = store.create("Hello Pi");
  expect(doc.title).toBe("Hello Pi");
  expect(doc.slug).toBe("hello-pi");

  const saved = store.save(doc.id, "Hello Pi", "# Heading\n\nBody");
  expect(saved).not.toBeNull();
  expect(saved?.body).toContain("Heading");
  expect(saved?.filePath).toBe(join(dir, "documents", "hello-pi.md"));
  expect(existsSync(saved?.filePath ?? "")).toBe(true);
  expect(readFileSync(saved?.filePath ?? "", "utf8")).toContain("# Heading");

  const listed = store.list();
  expect(listed.length).toBe(1);
  expect(store.toJson()[0]?.id).toBe(doc.id);
  store.close();
  rmSync(dir, { recursive: true, force: true });
});

test("DocStore delete removes record and mirrored markdown", () => {
  const dir = mkdtempSync(join(tmpdir(), "goose-word-test-"));
  const dbPath = join(dir, "docs.db");
  const store = new DocStore(dbPath);
  const doc = store.create("Delete Me", "temporary");
  expect(existsSync(doc.filePath)).toBe(true);

  const deleted = store.delete(doc.id);
  expect(deleted?.id).toBe(doc.id);
  expect(store.get(doc.id)).toBeNull();
  expect(existsSync(doc.filePath)).toBe(false);
  expect(store.delete(doc.id)).toBeNull();

  store.close();
  rmSync(dir, { recursive: true, force: true });
});

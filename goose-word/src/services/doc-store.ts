import { Database } from "bun:sqlite";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { gooseWordDataDir, gooseWordDbPath, gooseWordDocumentsDir } from "../config/paths.ts";

export interface DocRecord {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly slug: string;
  readonly updatedAt: string;
  readonly filePath: string;
}

interface DocRow {
  id: string;
  title: string;
  body: string;
  slug: string;
  updated_at: string;
  file_path: string;
}

const slugify = (title: string): string => {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base.length > 0 ? base : `doc-${crypto.randomUUID().slice(0, 8)}`;
};

const rowToRecord = (row: DocRow): DocRecord => ({
  id: row.id,
  title: row.title,
  body: row.body,
  slug: row.slug,
  updatedAt: row.updated_at,
  filePath: row.file_path,
});

export class DocStore {
  readonly #db: Database;
  readonly #documentsDir: string;
  #lastUpdatedAtMs = 0;

  constructor(
    dbPath = gooseWordDbPath,
    documentsDir = join(dirname(dbPath), "documents"),
    dataDir = dirname(dbPath),
  ) {
    mkdirSync(dataDir, { recursive: true });
    mkdirSync(documentsDir, { recursive: true });
    this.#documentsDir = documentsDir;
    this.#db = new Database(dbPath);
    this.#db.run("PRAGMA journal_mode = WAL;");
    this.#db.run(`
      CREATE TABLE IF NOT EXISTS docs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL DEFAULT '',
        slug TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        file_path TEXT NOT NULL
      );
    `);
  }

  list(limit?: number, offset?: number): readonly DocRecord[] {
    const hasPage = typeof limit === "number" && typeof offset === "number";
    const rows = hasPage
      ? this.#db
          .query<DocRow, [number, number]>(
            "SELECT id, title, body, slug, updated_at, file_path FROM docs ORDER BY updated_at DESC LIMIT ? OFFSET ?",
          )
          .all(limit, offset)
      : this.#db
          .query<DocRow, []>(
            "SELECT id, title, body, slug, updated_at, file_path FROM docs ORDER BY updated_at DESC",
          )
          .all();
    return rows.map(rowToRecord);
  }

  get(id: string): DocRecord | null {
    const row = this.#db
      .query<DocRow, [string]>(
        "SELECT id, title, body, slug, updated_at, file_path FROM docs WHERE id = ? LIMIT 1",
      )
      .get(id);
    return row === null ? null : rowToRecord(row);
  }

  create(title: string, body = ""): DocRecord {
    const id = crypto.randomUUID();
    const slug = slugify(title);
    const updatedAt = this.#nextUpdatedAt();
    const filePath = this.#markdownPath(slug);
    this.#db.run(
      "INSERT INTO docs (id, title, body, slug, updated_at, file_path) VALUES (?, ?, ?, ?, ?, ?)",
      [id, title, body, slug, updatedAt, filePath],
    );
    const record: DocRecord = { id, title, body, slug, updatedAt, filePath };
    this.#mirrorToFile(record);
    return record;
  }

  save(id: string, title: string, body: string): DocRecord | null {
    return this.update(id, { title, body });
  }

  update(id: string, patch: Readonly<{ title?: string; body?: string }>): DocRecord | null {
    const existing = this.get(id);
    if (existing === null) {
      return null;
    }
    const title = patch.title ?? existing.title;
    const body = patch.body ?? existing.body;
    const slug = slugify(title);
    const updatedAt = this.#nextUpdatedAt();
    const filePath = this.#markdownPath(slug);
    this.#db.run(
      "UPDATE docs SET title = ?, body = ?, slug = ?, updated_at = ?, file_path = ? WHERE id = ?",
      [title, body, slug, updatedAt, filePath, id],
    );
    const record: DocRecord = { id, title, body, slug, updatedAt, filePath };
    this.#mirrorToFile(record);
    return record;
  }

  delete(id: string): DocRecord | null {
    const existing = this.get(id);
    if (existing === null) {
      return null;
    }
    this.#db.run("DELETE FROM docs WHERE id = ?", [id]);
    if (existsSync(existing.filePath)) {
      unlinkSync(existing.filePath);
    }
    return existing;
  }

  toJson(): readonly DocRecord[] {
    return this.list();
  }

  close(): void {
    this.#db.close();
  }

  #markdownPath(slug: string): string {
    return join(this.#documentsDir, `${slug}.md`);
  }

  #nextUpdatedAt(): string {
    const now = Date.now();
    const next = now <= this.#lastUpdatedAtMs ? this.#lastUpdatedAtMs + 1 : now;
    this.#lastUpdatedAtMs = next;
    return new Date(next).toISOString();
  }

  #mirrorToFile(record: DocRecord): void {
    mkdirSync(dirname(record.filePath), { recursive: true });
    const frontMatter = `---\ntitle: ${record.title}\nupdated: ${record.updatedAt}\n---\n\n`;
    writeFileSync(record.filePath, `${frontMatter}${record.body}`, "utf8");
  }
}

let defaultStore: DocStore | null = null;

const getDefaultStore = (): DocStore => {
  if (defaultStore === null) {
    defaultStore = new DocStore(gooseWordDbPath, gooseWordDocumentsDir, gooseWordDataDir);
  }
  return defaultStore;
};

export const listDocs = (limit?: number, offset?: number): readonly DocRecord[] =>
  getDefaultStore().list(limit, offset);

export const getDoc = (id: string): DocRecord | null => getDefaultStore().get(id);

export const createDoc = (title: string, body = ""): DocRecord =>
  getDefaultStore().create(title, body);

export const updateDoc = (
  id: string,
  patch: Readonly<{ title?: string; body?: string }>,
): DocRecord | null => getDefaultStore().update(id, patch);

export const deleteDoc = (id: string): DocRecord | null => getDefaultStore().delete(id);

export const closeDocStore = (): void => {
  if (defaultStore !== null) {
    defaultStore.close();
    defaultStore = null;
  }
};

export const resetDocStoreForTests = (dbPath: string, documentsDir?: string): void => {
  closeDocStore();
  defaultStore = new DocStore(dbPath, documentsDir ?? join(dirname(dbPath), "documents"));
};

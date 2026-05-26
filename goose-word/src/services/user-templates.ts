import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { isDraftStyleId, type DraftStyleId } from "./user-prefs.ts";
import { gooseWordTemplatesDbPath } from "../config/paths.ts";

export interface UserTemplateRecord {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly draftStyle: DraftStyleId;
  readonly updatedAt: string;
}

interface UserTemplateRow {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly draft_style: string;
  readonly updated_at: string;
}

const rowToRecord = (row: UserTemplateRow): UserTemplateRecord => ({
  id: row.id,
  title: row.title,
  description: row.description,
  body: row.body,
  draftStyle: isDraftStyleId(row.draft_style) ? row.draft_style : "",
  updatedAt: row.updated_at,
});

export class UserTemplateStore {
  readonly #db: Database;

  constructor(dbPath = gooseWordTemplatesDbPath) {
    mkdirSync(dirname(dbPath), { recursive: true });
    this.#db = new Database(dbPath);
    this.#db.run("PRAGMA journal_mode = WAL;");
    this.#db.run(`
      CREATE TABLE IF NOT EXISTS user_templates (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        body TEXT NOT NULL DEFAULT '',
        draft_style TEXT NOT NULL DEFAULT '',
        updated_at TEXT NOT NULL
      );
    `);
  }

  list(): readonly UserTemplateRecord[] {
    const rows = this.#db
      .query<UserTemplateRow, []>(
        "SELECT id, title, description, body, draft_style, updated_at FROM user_templates ORDER BY updated_at DESC",
      )
      .all();
    return rows.map(rowToRecord);
  }

  get(id: string): UserTemplateRecord | null {
    const row = this.#db
      .query<UserTemplateRow, [string]>(
        "SELECT id, title, description, body, draft_style, updated_at FROM user_templates WHERE id = ? LIMIT 1",
      )
      .get(id);
    return row === null ? null : rowToRecord(row);
  }

  create(input: {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly draftStyle: DraftStyleId;
  }): UserTemplateRecord {
    const id = crypto.randomUUID();
    const updatedAt = new Date().toISOString();
    this.#db
      .query(
        "INSERT INTO user_templates (id, title, description, body, draft_style, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      )
      .run(id, input.title, input.description, input.body, input.draftStyle, updatedAt);
    return {
      id,
      title: input.title,
      description: input.description,
      body: input.body,
      draftStyle: input.draftStyle,
      updatedAt,
    };
  }

  update(
    id: string,
    input: {
      readonly title: string;
      readonly description: string;
      readonly body: string;
      readonly draftStyle: DraftStyleId;
    },
  ): UserTemplateRecord | null {
    const existing = this.get(id);
    if (existing === null) {
      return null;
    }
    const updatedAt = new Date().toISOString();
    this.#db
      .query(
        "UPDATE user_templates SET title = ?, description = ?, body = ?, draft_style = ?, updated_at = ? WHERE id = ?",
      )
      .run(input.title, input.description, input.body, input.draftStyle, updatedAt, id);
    return {
      id,
      title: input.title,
      description: input.description,
      body: input.body,
      draftStyle: input.draftStyle,
      updatedAt,
    };
  }

  delete(id: string): UserTemplateRecord | null {
    const existing = this.get(id);
    if (existing === null) {
      return null;
    }
    this.#db.query("DELETE FROM user_templates WHERE id = ?").run(id);
    return existing;
  }

  close(): void {
    this.#db.close();
  }
}

let defaultStore: UserTemplateStore | null = null;

const getDefaultStore = (): UserTemplateStore => {
  if (defaultStore === null) {
    defaultStore = new UserTemplateStore();
  }
  return defaultStore;
};

export const listUserTemplates = (): readonly UserTemplateRecord[] => getDefaultStore().list();

export const getUserTemplate = (id: string): UserTemplateRecord | null => getDefaultStore().get(id);

export const createUserTemplate = (input: {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly draftStyle: DraftStyleId;
}): UserTemplateRecord => getDefaultStore().create(input);

export const updateUserTemplate = (
  id: string,
  input: {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly draftStyle: DraftStyleId;
  },
): UserTemplateRecord | null => getDefaultStore().update(id, input);

export const deleteUserTemplate = (id: string): UserTemplateRecord | null =>
  getDefaultStore().delete(id);

export const closeUserTemplateStore = (): void => {
  if (defaultStore !== null) {
    defaultStore.close();
    defaultStore = null;
  }
};

export const resetUserTemplateStoreForTests = (dbPath: string): void => {
  closeUserTemplateStore();
  defaultStore = new UserTemplateStore(dbPath);
};

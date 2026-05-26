import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ConnectionState, createConnection, type LibSQLConnection } from "./connection";
import { InteractiveTransaction, withTransaction } from "./transaction";

describe("InteractiveTransaction", () => {
  let dbPath: string;
  let conn: LibSQLConnection;

  beforeEach(() => {
    dbPath = join(tmpdir(), `tx-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
    conn = createConnection({ url: `file:${dbPath}` });
    conn.open();
    conn.executeRaw({ sql: "CREATE TABLE t (id INTEGER PRIMARY KEY, val TEXT)", args: [] });
  });

  afterEach(() => {
    if (conn.getState() !== ConnectionState.Closed) {
      conn.close();
    }
    if (existsSync(dbPath)) {
      unlinkSync(dbPath);
    }
  });

  describe("constructor", () => {
    it("creates a transaction with a unique id", () => {
      const tx1 = new InteractiveTransaction(conn);
      const tx2 = new InteractiveTransaction(conn);
      expect(tx1.id).not.toBe(tx2.id);
    });

    it("stores transaction options", () => {
      const tx = new InteractiveTransaction(conn, { isolationLevel: "Immediate" });
      expect(tx.options?.isolationLevel).toBe("Immediate");
    });
  });

  describe("commit", () => {
    it("commits changes made in transaction", () => {
      conn.beginTransaction();
      const tx = new InteractiveTransaction(conn);
      tx.executeRaw({ sql: "INSERT INTO t (val) VALUES (?)", args: ["committed"] });
      tx.commit();

      const r = conn.queryRaw({ sql: "SELECT val FROM t", args: [] });
      expect(r.rows.length).toBe(1);
      expect(r.rows[0]?.[0]).toBe("committed");
    });

    it("throws when committing completed transaction", () => {
      conn.beginTransaction();
      const tx = new InteractiveTransaction(conn);
      tx.commit();
      expect(() => tx.commit()).toThrow();
    });

    it("throws when committing rolled-back transaction", () => {
      conn.beginTransaction();
      const tx = new InteractiveTransaction(conn);
      tx.rollback();
      expect(() => tx.commit()).toThrow();
    });
  });

  describe("rollback", () => {
    it("rolls back changes", () => {
      conn.beginTransaction();
      const tx = new InteractiveTransaction(conn);
      tx.executeRaw({ sql: "INSERT INTO t (val) VALUES (?)", args: ["rolled-back"] });
      tx.rollback();

      const r = conn.queryRaw({ sql: "SELECT val FROM t", args: [] });
      expect(r.rows.length).toBe(0);
    });

    it("is idempotent: multiple rollbacks are safe", () => {
      conn.beginTransaction();
      const tx = new InteractiveTransaction(conn);
      tx.rollback();
      tx.rollback();
    });
  });

  describe("queryRaw", () => {
    it("reads data within transaction", () => {
      conn.executeRaw({ sql: "INSERT INTO t (val) VALUES ('before')", args: [] });
      conn.beginTransaction();
      const tx = new InteractiveTransaction(conn);
      tx.executeRaw({ sql: "INSERT INTO t (val) VALUES ('during')", args: [] });
      const r = tx.queryRaw({ sql: "SELECT val FROM t", args: [] });
      expect(r.rows.length).toBe(2);
      tx.commit();
    });

    it("throws after commit", () => {
      conn.beginTransaction();
      const tx = new InteractiveTransaction(conn);
      tx.commit();
      expect(() => tx.queryRaw({ sql: "SELECT 1", args: [] })).toThrow();
    });
  });
});

describe("withTransaction", () => {
  let dbPath: string;
  let conn: LibSQLConnection;

  beforeEach(() => {
    dbPath = join(tmpdir(), `wtx-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
    conn = createConnection({ url: `file:${dbPath}` });
    conn.open();
    conn.executeRaw({ sql: "CREATE TABLE t (id INTEGER PRIMARY KEY, val TEXT)", args: [] });
  });

  afterEach(() => {
    if (conn.getState() !== ConnectionState.Closed) {
      conn.close();
    }
    if (existsSync(dbPath)) {
      unlinkSync(dbPath);
    }
  });

  it("executes callback and commits", () => {
    const result = withTransaction(conn, (tx) => {
      tx.executeRaw({ sql: "INSERT INTO t (val) VALUES (?)", args: ["via-with"] });
      return 42;
    });
    expect(result).toBe(42);
    const r = conn.queryRaw({ sql: "SELECT val FROM t", args: [] });
    expect(r.rows[0]?.[0]).toBe("via-with");
  });

  it("rejects async callbacks", () => {
    expect(() => {
      withTransaction(conn, () => Promise.resolve(1));
    }).toThrow();
  });

  it("supports readOnly option", () => {
    const result = withTransaction(
      conn,
      (tx) => tx.queryRaw({ sql: "SELECT COUNT(*) as c FROM t", args: [] }),
      { readOnly: true },
    );
    expect(result.rows[0]?.[0]).toBe(0);
  });
});

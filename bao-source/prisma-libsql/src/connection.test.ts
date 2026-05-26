import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ConnectionState, createConnection, LibSQLConnection } from "./connection";

describe("LibSQLConnection", () => {
  let dbPath: string;

  beforeEach(() => {
    dbPath = join(tmpdir(), `conn-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
  });

  afterEach(() => {
    if (existsSync(dbPath)) {
      unlinkSync(dbPath);
    }
  });

  describe("createConnection", () => {
    it("returns a LibSQLConnection instance", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      expect(conn).toBeInstanceOf(LibSQLConnection);
    });

    it("starts in Disconnected state", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      expect(conn.getState()).toBe(ConnectionState.Disconnected);
    });
  });

  describe("state machine", () => {
    it("transitions: Disconnected -> Connected -> Closed", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      expect(conn.getState()).toBe(ConnectionState.Disconnected);
      conn.open();
      expect(conn.getState()).toBe(ConnectionState.Connected);
      conn.close();
      expect(conn.getState()).toBe(ConnectionState.Closed);
    });

    it("cannot reopen a closed connection", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      conn.open();
      conn.close();
      expect(() => conn.open()).toThrow();
    });

    it("open is idempotent when already open", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      conn.open();
      const state1 = conn.getState();
      conn.open();
      expect(conn.getState()).toBe(state1);
    });
  });

  describe("transaction state", () => {
    it("transitions to InTransaction on begin", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      conn.open();
      conn.beginTransaction();
      expect(conn.getState()).toBe(ConnectionState.InTransaction);
      conn.commit();
    });

    it("transitions back to Connected after commit", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      conn.open();
      conn.beginTransaction();
      conn.commit();
      expect(conn.getState()).toBe(ConnectionState.Connected);
    });

    it("transitions back to Connected after rollback", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      conn.open();
      conn.beginTransaction();
      conn.rollback();
      expect(conn.getState()).toBe(ConnectionState.Connected);
    });

    it("rolls back open transaction on close", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      conn.open();
      conn.executeRaw({ sql: "CREATE TABLE t (id INTEGER)", args: [] });
      conn.beginTransaction();
      conn.executeRaw({ sql: "INSERT INTO t VALUES (1)", args: [] });
      conn.close();

      const conn2 = createConnection({ url: `file:${dbPath}` });
      conn2.open();
      const r = conn2.queryRaw({ sql: "SELECT COUNT(*) as c FROM t", args: [] });
      expect(r.rows[0]?.[0]).toBe(0);
      conn2.close();
    });
  });

  describe("isOpen", () => {
    it("returns false when Disconnected", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      expect(conn.isOpen()).toBe(false);
    });

    it("returns true when Connected", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      conn.open();
      expect(conn.isOpen()).toBe(true);
    });

    it("returns false when Closed", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      conn.open();
      conn.close();
      expect(conn.isOpen()).toBe(false);
    });
  });

  describe("unique id", () => {
    it("generates unique ids per connection", () => {
      const c1 = createConnection({ url: `file:${dbPath}` });
      const c2 = createConnection({ url: `file:${dbPath}2` });
      expect(c1.getId()).not.toBe(c2.getId());
    });

    it("id is stable across state changes", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      const id1 = conn.getId();
      conn.open();
      const id2 = conn.getId();
      conn.close();
      expect(id1).toBe(id2);
    });
  });
});

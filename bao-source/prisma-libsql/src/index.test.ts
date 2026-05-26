import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ConnectionState, createConnection, createLibSQLAdapter, LibSQLConnection } from "./index";

describe("prisma-libsql", () => {
  let dbPath: string;

  beforeEach(() => {
    dbPath = join(tmpdir(), `test-libsql-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
  });

  afterEach(() => {
    if (existsSync(dbPath)) {
      unlinkSync(dbPath);
    }
  });

  describe("createLibSQLAdapter", () => {
    it("creates an adapter instance", () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      expect(adapter).toBeDefined();
      expect(adapter.adapterName).toBe("@baohaus/prisma-libsql");
      expect(adapter.provider).toBe("sqlite");
    });
  });

  describe("connection", () => {
    it("connects and returns a Queryable", async () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      const q = await adapter.connect();
      expect(q).toBeDefined();
      expect(q.provider).toBe("sqlite");
      expect(adapter.isConnected()).toBe(true);
    });

    it("creates database file on connect", async () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      await adapter.connect();
      expect(existsSync(dbPath)).toBe(true);
    });
  });

  describe("query execution", () => {
    it("executes SELECT via queryRaw", async () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      const q = await adapter.connect();
      await q.executeRaw({ sql: "CREATE TABLE t (id INTEGER PRIMARY KEY, name TEXT)", args: [] });
      await q.executeRaw({ sql: "INSERT INTO t (name) VALUES (?)", args: ["Alice"] });
      const r = await q.queryRaw({ sql: "SELECT * FROM t WHERE name = ?", args: ["Alice"] });
      expect(r.columns).toContain("id");
      expect(r.columns).toContain("name");
      expect(r.rows.length).toBe(1);
    });

    it("executes INSERT via executeRaw", async () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      const q = await adapter.connect();
      await q.executeRaw({ sql: "CREATE TABLE u (id INTEGER PRIMARY KEY, email TEXT)", args: [] });
      const r = await q.executeRaw({ sql: "INSERT INTO u (email) VALUES (?)", args: ["x@y.com"] });
      expect(r.rowCount).toBe(1);
    });

    it("handles parameterized queries", async () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      const q = await adapter.connect();
      await q.executeRaw({
        sql: "CREATE TABLE items (id INTEGER PRIMARY KEY, v INTEGER)",
        args: [],
      });
      await q.executeRaw({ sql: "INSERT INTO items (v) VALUES (100)", args: [] });
      await q.executeRaw({ sql: "INSERT INTO items (v) VALUES (200)", args: [] });
      const r = await q.queryRaw({ sql: "SELECT * FROM items WHERE v > ?", args: [150] });
      expect(r.rows.length).toBe(1);
    });
  });

  describe("transactions", () => {
    it("commits successfully", async () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      const q = await adapter.connect();
      await q.executeRaw({
        sql: "CREATE TABLE acct (id INTEGER PRIMARY KEY, bal INTEGER)",
        args: [],
      });
      await q.executeRaw({ sql: "INSERT INTO acct (bal) VALUES (1000)", args: [] });
      const tx = await adapter.startTransaction();
      tx.executeRaw({ sql: "UPDATE acct SET bal = bal - 100 WHERE id = 1", args: [] });
      tx.executeRaw({ sql: "INSERT INTO acct (bal) VALUES (100)", args: [] });
      await tx.commit();
      const r = await q.queryRaw({ sql: "SELECT * FROM acct", args: [] });
      expect(r.rows.length).toBe(2);
    });

    it("rolls back on demand", async () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      const q = await adapter.connect();
      await q.executeRaw({
        sql: "CREATE TABLE prod (id INTEGER PRIMARY KEY, name TEXT, price INTEGER)",
        args: [],
      });
      await q.executeRaw({ sql: "INSERT INTO prod (name, price) VALUES ('W', 100)", args: [] });
      const tx = await adapter.startTransaction();
      tx.executeRaw({ sql: "UPDATE prod SET price = 200 WHERE id = 1", args: [] });
      await tx.rollback();
      const r = await q.queryRaw({ sql: "SELECT price FROM prod WHERE id = 1", args: [] });
      expect(r.rows[0]?.[0]).toBe(100);
    });

    it("supports callback-based transactions", async () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      const q = await adapter.connect();
      await q.executeRaw({
        sql: "CREATE TABLE ord (id INTEGER PRIMARY KEY, total INTEGER)",
        args: [],
      });
      adapter.transaction((tx: any) => {
        tx.executeRaw({ sql: "INSERT INTO ord (total) VALUES (100)", args: [] });
        tx.executeRaw({ sql: "INSERT INTO ord (total) VALUES (200)", args: [] });
      });
      const r = await q.queryRaw({ sql: "SELECT COUNT(*) as c FROM ord", args: [] });
      expect(r.rows.length).toBe(1);
    });
  });

  describe("connection lifecycle", () => {
    it("closes and becomes disconnected", async () => {
      const adapter = createLibSQLAdapter({ url: `file:${dbPath}` });
      await adapter.connect();
      expect(adapter.isConnected()).toBe(true);
      await adapter.close();
      expect(adapter.isConnected()).toBe(false);
    });
  });

  describe("error mapping", () => {
    it("maps SQLITE_CONSTRAINT_UNIQUE to P2002", () => {
      const { mapLibSQLError } = require("./errors");
      const shape = mapLibSQLError(new Error("SQLITE_CONSTRAINT_UNIQUE: UNIQUE constraint failed"));
      expect(shape.fields.code).toBe("P2002");
    });

    it("maps SQLITE_BUSY to P1017", () => {
      const { mapLibSQLError } = require("./errors");
      const shape = mapLibSQLError(new Error("SQLITE_BUSY: database is locked"));
      expect(shape.fields.code).toBe("P1017");
    });

    it("defaults to P1000 for unknown errors", () => {
      const { mapLibSQLError } = require("./errors");
      const shape = mapLibSQLError(new Error("Unknown error"));
      expect(shape.fields.code).toBe("P1000");
    });
  });

  describe("standalone LibSQLConnection", () => {
    it("manages connection state", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      expect(conn.getState()).toBe(ConnectionState.Disconnected);
      conn.open();
      expect(conn.getState()).toBe(ConnectionState.Connected);
      conn.close();
      expect(conn.getState()).toBe(ConnectionState.Closed);
    });

    it("executes raw queries", () => {
      const conn = createConnection({ url: `file:${dbPath}` });
      conn.open();
      conn.executeRaw({ sql: "CREATE TABLE raw_t (id INTEGER PRIMARY KEY, v TEXT)", args: [] });
      conn.executeRaw({ sql: "INSERT INTO raw_t (v) VALUES (?)", args: ["hi"] });
      const r = conn.queryRaw({ sql: "SELECT * FROM raw_t", args: [] });
      expect(r.rows.length).toBe(1);
      conn.close();
    });

    it("generates unique ids", () => {
      const c1 = createConnection({ url: `file:${dbPath}` });
      const c2 = createConnection({ url: `file:${dbPath}` });
      expect(c1.getId()).not.toBe(c2.getId());
    });
  });
});

/**
 * Canonical coverage for the cross-peer event dispatcher consumed by
 * every Bao app's federation orchestrator + federation pull cache.
 *
 * Asserts the two distinct routing semantics:
 *   - Known publisher peer-id → surgical sink called exactly once.
 *   - Unknown / missing peer-id → fallback sink fan-out per known peer,
 *     or silent drop when no fallback supplied.
 */

import { describe, expect, it } from "bun:test";
import { dispatchPeerEvent } from "../src/peer-invalidation.ts";

const KNOWN: ReadonlySet<string> = new Set(["registry", "forge", "bao-ai-gateway"]);

describe("dispatchPeerEvent — surgical path", () => {
  it("invokes the surgical sink exactly once with the publisher peer-id", () => {
    const surgical: string[] = [];
    const fallback: string[] = [];
    dispatchPeerEvent(
      { originPeerId: "forge" },
      KNOWN,
      (p) => surgical.push(p),
      (p) => fallback.push(p),
    );
    expect(surgical).toEqual(["forge"]);
    expect(fallback).toEqual([]);
  });
});

describe("dispatchPeerEvent — fallback path", () => {
  it("fans out to every known peer through onFallback when originPeerId is unknown", () => {
    const surgical: string[] = [];
    const fallback: string[] = [];
    dispatchPeerEvent(
      { originPeerId: "stranger" },
      KNOWN,
      (p) => surgical.push(p),
      (p) => fallback.push(p),
    );
    expect(surgical).toEqual([]);
    expect(new Set(fallback)).toEqual(KNOWN);
    expect(fallback.length).toBe(KNOWN.size);
  });

  it("fans out to every known peer through onFallback when originPeerId is missing", () => {
    const surgical: string[] = [];
    const fallback: string[] = [];
    dispatchPeerEvent(
      {},
      KNOWN,
      (p) => surgical.push(p),
      (p) => fallback.push(p),
    );
    expect(surgical).toEqual([]);
    expect(new Set(fallback)).toEqual(KNOWN);
  });
});

describe("dispatchPeerEvent — skip-on-unknown policy (no onFallback)", () => {
  it("drops events with unknown peer-id silently", () => {
    const surgical: string[] = [];
    dispatchPeerEvent({ originPeerId: "stranger" }, KNOWN, (p) => surgical.push(p));
    expect(surgical).toEqual([]);
  });

  it("drops events without peer-id silently", () => {
    const surgical: string[] = [];
    dispatchPeerEvent({}, KNOWN, (p) => surgical.push(p));
    expect(surgical).toEqual([]);
  });

  it("still routes surgically when peer-id IS known", () => {
    const surgical: string[] = [];
    dispatchPeerEvent({ originPeerId: "registry" }, KNOWN, (p) => surgical.push(p));
    expect(surgical).toEqual(["registry"]);
  });
});

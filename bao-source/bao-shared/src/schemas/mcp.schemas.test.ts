/**
 * Unit tests for the Bao MCP descriptor metadata schema.
 */

import { describe, expect, it } from "bun:test";
import { Value } from "@baohaus/baobox/elysia";
import {
  type BaoMcpMetadata,
  BaoMcpMetadataAttributeValueSchema,
  BaoMcpMetadataSchema,
} from "./mcp.schemas";

describe("BaoMcpMetadataSchema", () => {
  it("validates a representative MCP server descriptor", () => {
    const metadata: BaoMcpMetadata = {
      description: "Filesystem MCP server",
      docsPath: "docs/mcp/filesystem.md",
      tags: ["filesystem", "read-only"],
      attributes: {
        version: "1.4.2",
        sandboxed: true,
        maxConnections: 8,
      },
    };

    expect(Value.Check(BaoMcpMetadataSchema, metadata)).toBe(true);
  });

  it("accepts an empty descriptor (every field is optional)", () => {
    expect(Value.Check(BaoMcpMetadataSchema, {})).toBe(true);
  });

  it("rejects unknown top-level descriptor fields", () => {
    expect(Value.Check(BaoMcpMetadataSchema, { extraneous: "value" })).toBe(false);
  });

  it("rejects empty strings on metadata fields", () => {
    expect(Value.Check(BaoMcpMetadataSchema, { description: "" })).toBe(false);
    expect(Value.Check(BaoMcpMetadataSchema, { docsPath: "" })).toBe(false);
  });

  it("rejects empty tag lists", () => {
    expect(Value.Check(BaoMcpMetadataSchema, { tags: [] })).toBe(false);
  });
});

describe("BaoMcpMetadataAttributeValueSchema", () => {
  it("permits boolean, number, and string scalar attribute values", () => {
    expect(Value.Check(BaoMcpMetadataAttributeValueSchema, true)).toBe(true);
    expect(Value.Check(BaoMcpMetadataAttributeValueSchema, 42)).toBe(true);
    expect(Value.Check(BaoMcpMetadataAttributeValueSchema, "value")).toBe(true);
  });

  it("rejects array and object attribute values", () => {
    expect(Value.Check(BaoMcpMetadataAttributeValueSchema, ["nested"])).toBe(false);
    expect(Value.Check(BaoMcpMetadataAttributeValueSchema, { nested: true })).toBe(false);
  });
});

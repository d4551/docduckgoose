import { describe, expect, it } from "bun:test";
import {
  docsListHref,
  docsListOffset,
  docsListTotalPages,
  parseDocsListQuery,
} from "../src/http/docs-query.ts";

describe("parseDocsListQuery", () => {
  it("defaults sort to updated desc and page 1", () => {
    const query = parseDocsListQuery({});
    expect(query.sort).toBe("updated");
    expect(query.dir).toBe("desc");
    expect(query.page).toBe(1);
    expect(query.pageSize).toBe(20);
  });

  it("parses title asc sort", () => {
    const query = parseDocsListQuery({ sort: "title", dir: "asc" });
    expect(query.sort).toBe("title");
    expect(query.dir).toBe("asc");
  });

  it("includes sort and page in docs list href", () => {
    const query = parseDocsListQuery({ sort: "title", dir: "asc", q: "alpha", page: "2" });
    expect(docsListHref(query)).toBe("/docs?q=alpha&page=2&sort=title&dir=asc");
  });

  it("maps legacy offset to page", () => {
    const query = parseDocsListQuery({ offset: "20" });
    expect(query.page).toBe(2);
    expect(docsListOffset(query)).toBe(20);
  });

  it("computes total pages from server total", () => {
    expect(docsListTotalPages(99, 20)).toBe(5);
    expect(docsListTotalPages(0, 20)).toBe(1);
  });
});

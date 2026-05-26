import { describe, expect, it } from "bun:test";
import { renderDataTable } from "./data-table.js";
import { renderDefinitionGrid } from "./definition-grid.js";
import { renderEntityHeader } from "./entity-header.js";
import { renderFilterBar } from "./filter-bar.js";
import { renderMetricRow } from "./metric-row.js";
import { renderSectionCard } from "./section-card.js";
import { renderStatCard } from "./stat-card.js";
import { renderTabStrip } from "./tab-strip.js";
import type { TranslateFn } from "./types.js";

const FIXTURE_TRANSLATIONS: Record<string, string> = {
  "common.actions.search": "Search",
  "common.actions.resetFilters": "Reset filters",
  "common.a11y.pageSection": "Section tabs",
  "common.a11y.selectAllRows": "Select all rows",
  "common.a11y.selectRow": "Select row",
  "common.a11y.sortAscending": "Sort {column} ascending",
  "common.a11y.sortDescending": "Sort {column} descending",
  "common.a11y.tableScrollable": "Scrollable table",
  "common.aria.openRow": "Open row",
  "common.placeholders.emptyValue": "—",
  "common.skeleton.loadingContent": "Loading content",
  "common.status.noResults": "No results found",
};

const fixtureTranslate: TranslateFn = (key, params) => {
  const base = FIXTURE_TRANSLATIONS[key] ?? key;
  if (!params) {
    return base;
  }
  let out = base;
  for (const [k, v] of Object.entries(params)) {
    out = out.replaceAll(`{${k}}`, String(v));
  }
  return out;
};

describe("stat-card", () => {
  it("renders stat block with title, value, and trend", () => {
    const html = renderStatCard({
      title: "Open cases",
      value: "127",
      trend: "up",
      trendLabel: "+12%",
      accent: "primary",
    });
    expect(html).toContain("stat-title");
    expect(html).toContain(">Open cases<");
    expect(html).toContain(">127<");
    expect(html).toContain("text-success");
    expect(html).toContain("+12%");
    expect(html).toContain("text-primary");
  });

  it("renders skeleton when loading=true", () => {
    const html = renderStatCard({ title: "Loading", value: "", loading: true });
    expect(html).toContain("skeleton");
    expect(html).not.toContain(">Loading<");
  });

  it("inlines provided icon SVG into stat-figure", () => {
    const html = renderStatCard({
      title: "Revenue",
      value: "$10K",
      iconSvg: '<svg aria-hidden="true"><path d="M0 0"/></svg>',
    });
    expect(html).toContain("stat-figure");
    expect(html).toContain('<svg class="inline-block h-8 w-8 stroke-current"');
  });
});

describe("metric-row", () => {
  it("returns empty string for no stats", () => {
    expect(renderMetricRow({ stats: [] })).toBe("");
  });

  it("wraps stat cards in stats container with horizontal lg variant", () => {
    const html = renderMetricRow({
      stats: [
        { title: "Open", value: "12" },
        { title: "Closed", value: "98" },
      ],
    });
    expect(html).toContain("stats stats-vertical");
    expect(html).toContain("lg:stats-horizontal");
    expect(html).toContain(">Open<");
    expect(html).toContain(">Closed<");
  });
});

describe("section-card", () => {
  it("renders heading + body when title provided", () => {
    const html = renderSectionCard({
      title: "Recent activity",
      description: "Last 24 hours",
      body: '<p class="text-sm">events here</p>',
    });
    expect(html).toContain("<h2");
    expect(html).toContain("Recent activity");
    expect(html).toContain("Last 24 hours");
    expect(html).toContain("events here");
  });

  it("renders skeleton body when loading=true and translator provided", () => {
    const html = renderSectionCard({
      title: "Loading section",
      body: "ignored",
      loading: true,
      translate: fixtureTranslate,
    });
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain("skeleton-shimmer");
    expect(html).not.toContain("ignored");
  });

  it("falls back to body when loading is true but no translator supplied", () => {
    const html = renderSectionCard({
      title: "Loading section",
      body: "fallback body",
      loading: true,
    });
    expect(html).toContain("fallback body");
  });

  it("emits aria-labelledby when headingId is implied by id+title", () => {
    const html = renderSectionCard({
      id: "summary",
      title: "Summary",
      body: "body",
    });
    expect(html).toContain('id="summary"');
    expect(html).toContain('aria-labelledby="summary-title"');
    expect(html).toContain('id="summary-title"');
  });
});

describe("filter-bar", () => {
  it("renders search input + filter selects + reset", () => {
    const html = renderFilterBar({
      actionHref: "/cases",
      targetId: "case-list",
      translate: fixtureTranslate,
      filters: [
        {
          key: "status",
          label: "Status",
          options: [
            { label: "Open", value: "open", selected: true },
            { label: "Closed", value: "closed" },
          ],
        },
      ],
    });
    expect(html).toContain('role="search"');
    expect(html).toContain('hx-trigger="input changed delay:300ms, search"');
    expect(html).toContain('hx-get="/cases"');
    expect(html).toContain('hx-target="#case-list"');
    expect(html).toContain('name="status"');
    expect(html).toContain('value="open" selected');
    expect(html).toContain('aria-label="Reset filters"');
  });

  it("respects pushUrl=false", () => {
    const html = renderFilterBar({
      actionHref: "/items",
      targetId: "items",
      translate: fixtureTranslate,
      pushUrl: false,
    });
    expect(html).toContain('hx-push-url="false"');
  });
});

describe("definition-grid", () => {
  it("renders <dl> with terms and value markup", () => {
    const html = renderDefinitionGrid({
      items: [
        { label: "Owner", valueHtml: "<dd>Brandon</dd>" },
        { label: "Status", valueHtml: '<dd><span class="badge">Active</span></dd>' },
      ],
      columns: 3,
    });
    expect(html).toContain("<dl");
    expect(html).toContain("md:grid-cols-2");
    expect(html).toContain("xl:grid-cols-3");
    expect(html).toContain("<dt");
    expect(html).toContain(">Owner<");
    expect(html).toContain('badge">Active');
  });
});

describe("entity-header", () => {
  it("renders title, status badge, metadata, and actions", () => {
    const html = renderEntityHeader({
      title: "CASE-42",
      status: "Open",
      statusVariant: "success",
      metadata: [
        { label: "Owner", value: "Brandon" },
        { label: "Created", value: "2026-01-15" },
      ],
      actions: [
        { label: "Edit", href: "/cases/42/edit", variant: "primary" },
        {
          label: "Archive",
          href: "/cases/42/archive",
          variant: "error",
          method: "post",
          confirm: "Archive this case?",
        },
      ],
    });
    expect(html).toContain("<h1");
    expect(html).toContain("CASE-42");
    expect(html).toContain("badge-success");
    expect(html).toContain("Owner");
    expect(html).toContain("Brandon");
    expect(html).toContain('hx-get="/cases/42/edit"');
    expect(html).toContain('hx-post="/cases/42/archive"');
    expect(html).toContain('hx-confirm="Archive this case?"');
    expect(html).toContain("btn-error");
  });

  it("includes pre-rendered breadcrumbs slot", () => {
    const html = renderEntityHeader({
      title: "X",
      breadcrumbs: '<nav aria-label="Breadcrumb"><ul><li>X</li></ul></nav>',
    });
    expect(html).toContain('aria-label="Breadcrumb"');
  });
});

describe("tab-strip", () => {
  it("renders tablist with active state and HTMX targeting", () => {
    const html = renderTabStrip({
      tabs: [
        { id: "overview", label: "Overview", href: "/cases/42/overview", active: true },
        { id: "history", label: "History", href: "/cases/42/history" },
      ],
      contentTargetId: "tab-content",
      translate: fixtureTranslate,
    });
    expect(html).toContain('role="tablist"');
    expect(html).toContain('aria-label="Section tabs"');
    expect(html).toContain('id="tab-overview"');
    expect(html).toContain("tab-active");
    expect(html).toContain('aria-selected="true"');
    expect(html).toContain('aria-selected="false"');
    expect(html).toContain('id="tab-content"');
    expect(html).toContain('aria-labelledby="tab-overview"');
    expect(html).toContain('hx-target="#tab-content"');
    expect(html).toContain('hx-push-url="false"');
  });
});

describe("data-table", () => {
  it("emits scope=col headers, aria-sort, and zebra class when requested", () => {
    const html = renderDataTable({
      translate: fixtureTranslate,
      tableId: "cases-table",
      ariaLabel: "Cases table",
      sortHref: "/cases",
      sortKey: "name",
      sortDir: "asc",
      zebra: true,
      columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name", sortable: true },
        { key: "amount", label: "Amount", align: "right" },
      ],
      rows: [
        { id: "C-1", name: "Acme", amount: 120 },
        { id: "C-2", name: "Globex", amount: 240 },
      ],
    });
    expect(html).toContain('aria-label="Cases table"');
    expect(html).toContain('id="cases-table"');
    expect(html).toContain("table-zebra");
    expect(html).toContain('scope="col"');
    expect(html).toContain('aria-sort="ascending"');
    expect(html).toContain('href="/cases?sort=name&amp;dir=desc"');
    expect(html).toContain("text-right");
    expect(html).toContain(">C-1<");
    expect(html).toContain(">Acme<");
  });

  it("renders empty placeholder row when rows are empty", () => {
    const html = renderDataTable({
      translate: fixtureTranslate,
      columns: [{ key: "id", label: "ID" }],
      rows: [],
    });
    expect(html).toContain("No results found");
    expect(html).toContain('role="status"');
  });

  it("renders skeleton rows when loading=true", () => {
    const html = renderDataTable({
      translate: fixtureTranslate,
      columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
      ],
      rows: [{ id: "x", name: "y" }],
      loading: true,
    });
    expect(html).toContain("skeleton-shimmer");
    expect(html).not.toContain(">x<");
  });

  it("substitutes empty-value placeholder when cell is null/undefined", () => {
    const html = renderDataTable({
      translate: fixtureTranslate,
      columns: [
        { key: "id", label: "ID" },
        { key: "owner", label: "Owner" },
      ],
      rows: [{ id: "1", owner: null }],
    });
    expect(html).toContain(">—<");
  });

  it("includes bulk-select column and rowHref navigation when configured", () => {
    const html = renderDataTable({
      translate: fixtureTranslate,
      bulkSelect: true,
      columns: [{ key: "id", label: "ID" }],
      rows: [{ id: "1" }],
      rowHref: (row) => `/cases/${String(row.id ?? "")}`,
    });
    expect(html).toContain("data-bulk-select-all");
    expect(html).toContain('name="selected"');
    expect(html).toContain('value="1"');
    expect(html).toContain('role="link"');
    expect(html).toContain('hx-get="/cases/1"');
  });
});

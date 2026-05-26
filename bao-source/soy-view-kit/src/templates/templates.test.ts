import { describe, expect, it } from "bun:test";
import { renderAlert } from "./alert.js";
import { renderBreadcrumbs, renderShellBreadcrumbOob } from "./breadcrumbs.js";
import { resolveTemplateActionLabel, resolveTemplateButtonClasses } from "./buttons.js";
import { renderConfirmDialog, SHELL_CONFIRM_DIALOG_ID } from "./confirm-dialog.js";
import { resolveStaggerClass, STAGGER_DELAY_CLASSES } from "./design-tokens.js";
import { renderEmptyState } from "./empty-state.js";
import { buildShellHtmxNavigationAttributes, htmxExtensionsAttr } from "./htmx.js";
import { renderIcon, renderTemplateIconForId } from "./icons.js";
import { renderPageHeader } from "./page-header.js";
import { emptyState, errorState, loadingSkeleton, successState } from "./page-states.js";
import { renderPagination } from "./pagination.js";
import { renderCardSkeleton, renderTableRowSkeleton, renderTableSkeleton } from "./skeleton.js";
import { renderStatusBadge } from "./status-badge.js";
import { renderToastContainer, TOAST_CONTAINER_ID } from "./toast-container.js";
import type { TranslateFn } from "./types.js";

const FIXTURE_TRANSLATIONS: Record<string, string> = {
  "common.actions.cancel": "Cancel",
  "common.actions.close": "Close",
  "common.actions.confirm": "Confirm",
  "common.actions.closeIcon": "✕",
  "common.actions.next": "Next",
  "common.actions.previous": "Previous",
  "common.actions.retry": "Retry",
  "common.actions.submit": "Save changes",
  "common.a11y.loadingIndicator": "Loading data",
  "common.a11y.notifications": "Notifications",
  "common.aria.breadcrumb": "Breadcrumb",
  "common.confirm.defaultMessage": "Are you sure you want to continue?",
  "common.skeleton.loadingContent": "Loading content",
  "common.skeleton.loadingList": "Loading list",
  "common.pagination.pageNavigation": "Pagination",
  "common.pagination.previousPage": "Previous page",
  "common.pagination.nextPage": "Next page",
};

const fixtureTranslate: TranslateFn = (key, params) => {
  const base = FIXTURE_TRANSLATIONS[key] ?? key;
  if (!params) {
    return base;
  }
  if (key === "common.pagination.page") {
    return `Page ${String(params.page)}`;
  }
  return base;
};

describe("design-tokens", () => {
  it("exposes a 6-slot stagger ladder with empty leading slot", () => {
    expect(STAGGER_DELAY_CLASSES).toHaveLength(6);
    expect(STAGGER_DELAY_CLASSES[0]).toBe("");
    expect(resolveStaggerClass(0)).toBe("");
    expect(resolveStaggerClass(undefined)).toBe("");
    expect(resolveStaggerClass(2)).toBe("animation-delay-120");
    expect(resolveStaggerClass(99)).toBe("");
  });
});

describe("icons", () => {
  it("renders daisyUI button sizing by default", () => {
    const html = renderIcon("save");
    expect(html).toContain('class="inline-block shrink-0 align-middle pointer-events-none size-4"');
    expect(html).toContain('stroke-width="2.5"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('focusable="false"');
  });

  it("maps template ids through the registry", () => {
    expect(renderTemplateIconForId("formal-letter")).toContain("size-6");
    expect(renderTemplateIconForId("novel-manuscript")).toContain("<svg");
    expect(renderTemplateIconForId("quick-notes")).toContain("<svg");
  });
});

describe("buttons", () => {
  it("composes daisyUI variant + size + join utilities", () => {
    const cls = resolveTemplateButtonClasses({
      variant: "primary",
      size: "compact",
      joinItem: true,
      className: "shadow-sm",
    });
    expect(cls).toContain("btn-primary");
    expect(cls).toContain("btn-sm");
    expect(cls).toContain("join-item");
    expect(cls).toContain("shadow-sm");
    expect(cls).toContain("focus-visible:outline");
  });

  it("falls back to ghost+default when no options supplied", () => {
    const cls = resolveTemplateButtonClasses();
    expect(cls).toContain("btn-ghost");
    expect(cls).not.toContain("btn-sm");
    expect(cls).not.toContain("join-item");
  });

  it("keeps icon-only controls square with a shared touch target", () => {
    const cls = resolveTemplateButtonClasses({ size: "icon-compact" });
    expect(cls).toContain("btn-square");
    expect(cls).toContain("min-h-11");
    expect(cls).toContain("min-w-11");
    expect(cls).toContain("place-items-center");
    expect(cls).toContain("overflow-hidden");
  });

  it("prefers explicit label, then labelKey, then fallback", () => {
    expect(
      resolveTemplateActionLabel({
        label: "Send invoice",
        fallbackLabelKey: "common.actions.submit",
        translate: fixtureTranslate,
      }),
    ).toBe("Send invoice");

    expect(
      resolveTemplateActionLabel({
        labelKey: "common.actions.cancel",
        fallbackLabelKey: "common.actions.submit",
        translate: fixtureTranslate,
      }),
    ).toBe("Cancel");

    expect(
      resolveTemplateActionLabel({
        fallbackLabelKey: "common.actions.submit",
        translate: fixtureTranslate,
      }),
    ).toBe("Save changes");
  });
});

describe("htmx", () => {
  it("emits navigation attributes with defaults", () => {
    const attrs = buildShellHtmxNavigationAttributes("/dashboard");
    expect(attrs).toContain('hx-get="/dashboard"');
    expect(attrs).toContain('hx-target="#main-content"');
    expect(attrs).toContain('hx-push-url="true"');
    expect(attrs).toContain('hx-swap="innerHTML"');
    expect(attrs).toContain('hx-indicator="#shell-loading-indicator"');
    expect(attrs).toContain('hx-preload="mouseover"');
  });

  it("respects pushUrl=false and disables preload when requested", () => {
    const attrs = buildShellHtmxNavigationAttributes("/auth/login", {
      pushUrl: false,
      preload: false,
    });
    expect(attrs).toContain('hx-push-url="false"');
    expect(attrs).not.toContain("hx-preload=");
  });

  it("ships the canonical extension list and appends extras", () => {
    const attr = htmxExtensionsAttr(["sse"]);
    expect(attr.startsWith(' hx-ext="')).toBe(true);
    expect(attr).toContain("morph");
    expect(attr).toContain("response-targets");
    expect(attr).toContain("head-support");
    expect(attr).toContain("preload");
    expect(attr).toContain("class-tools");
    expect(attr).toContain("remove-me");
    expect(attr).toContain("loading-states");
    expect(attr).toContain("sse");
  });
});

describe("alert", () => {
  it("renders error alert with icon, role, and aria-live", () => {
    const html = renderAlert("error", "Service unavailable", "Retry in 30 seconds");
    expect(html).toContain('role="alert"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("alert-error");
    expect(html).toContain("Service unavailable");
    expect(html).toContain("Retry in 30 seconds");
  });

  it("escapes message and details to prevent injection", () => {
    const html = renderAlert("info", "<script>alert(1)</script>", "<img src=x onerror=alert(2)>");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img ");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;img");
  });

  it("applies soft style by default for info/success only", () => {
    expect(renderAlert("info", "ok")).toContain("alert-soft");
    expect(renderAlert("success", "ok")).toContain("alert-soft");
    expect(renderAlert("warning", "ok")).not.toContain("alert-soft");
    expect(renderAlert("error", "ok")).not.toContain("alert-soft");
  });
});

describe("status-badge", () => {
  it("renders a span with badge classes and escaped status text", () => {
    const html = renderStatusBadge("Active", "success");
    expect(html.startsWith("<span")).toBe(true);
    expect(html).toContain("badge-success");
    expect(html).toContain(">Active<");
  });

  it("supports announce + atomic + custom attributes", () => {
    const html = renderStatusBadge("Processing", "warning", {
      announce: true,
      atomic: true,
      id: "case-status",
      attributes: { "data-case-id": "CASE-42", "data-active": true },
    });
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('aria-atomic="true"');
    expect(html).toContain('id="case-status"');
    expect(html).toContain('data-case-id="CASE-42"');
    expect(html).toContain(" data-active");
  });

  it("emits no badge-* class for null variant", () => {
    const html = renderStatusBadge("Custom", null, {
      className: "badge-outline",
    });
    expect(html).toContain("badge-outline");
    expect(html).not.toContain("badge-ghost");
  });
});

describe("breadcrumbs", () => {
  it("renders an empty string when items is empty", () => {
    expect(renderBreadcrumbs({ items: [], translate: fixtureTranslate })).toBe("");
  });

  it("includes navigation attributes for non-active items and aria-current for active", () => {
    const html = renderBreadcrumbs({
      items: [
        { label: "Dashboard", href: "/" },
        { label: "Cases", href: "/cases" },
        { label: "CASE-42", active: true },
      ],
      translate: fixtureTranslate,
    });
    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain('href="/cases"');
    expect(html).toContain('hx-get="/cases"');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain("CASE-42");
  });

  it("renders OOB shell breadcrumb fragment with stable id", () => {
    const oob = renderShellBreadcrumbOob(
      [
        { label: "Dashboard", href: "/" },
        { label: "Settings", active: true },
      ],
      fixtureTranslate,
    );
    expect(oob).toContain('id="shell-breadcrumbs"');
    expect(oob).toContain('hx-swap-oob="true"');
    expect(oob).toContain("Settings");
  });
});

describe("page-header", () => {
  it("renders one h1 with optional description and slots", () => {
    const html = renderPageHeader({
      title: "Cases",
      description: "Track and resolve customer cases.",
      actions: '<button type="button" class="btn btn-primary">Create case</button>',
      breadcrumbs: '<nav aria-label="Breadcrumb"><ul><li>Cases</li></ul></nav>',
    });
    const h1Count = (html.match(/<h1\b/g) ?? []).length;
    expect(h1Count).toBe(1);
    expect(html).toContain("Cases");
    expect(html).toContain("Track and resolve customer cases.");
    expect(html).toContain("Create case");
    expect(html).toContain("Breadcrumb");
  });
});

describe("skeleton", () => {
  it("renders matching column count for table row skeletons", () => {
    const row = renderTableRowSkeleton(5);
    const cellCount = (row.match(/<td>/g) ?? []).length;
    expect(cellCount).toBe(5);
  });

  it("renders 5 rows by default for table skeletons", () => {
    const tbody = renderTableSkeleton(3);
    const rowCount = (tbody.match(/<tr\b/g) ?? []).length;
    expect(rowCount).toBe(5);
  });

  it("includes aria-busy on card skeletons via translator", () => {
    const html = renderCardSkeleton(fixtureTranslate);
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('aria-label="Loading content"');
  });
});

describe("page-states", () => {
  it("loadingSkeleton (table) builds a table.role=status with aria-busy", () => {
    const html = loadingSkeleton({
      translate: fixtureTranslate,
      variant: "table",
      columns: 4,
    });
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('aria-label="Loading data"');
    expect(html).toContain("<table");
  });

  it("loadingSkeleton (spinner) renders the daisyUI spinner with sr-only label", () => {
    const html = loadingSkeleton({
      translate: fixtureTranslate,
      variant: "spinner",
    });
    expect(html).toContain("loading-spinner");
    expect(html).toContain("sr-only");
  });

  it("emptyState exposes the page-state token via renderEmptyState", () => {
    const html = emptyState({
      message: "No invoices yet",
      description: "Invoices track payments from your customers.",
      actionLabel: "Create first invoice",
      actionHref: "/invoices/new",
    });
    expect(html).toContain("No invoices yet");
    expect(html).toContain("Create first invoice");
    expect(html).toContain('href="/invoices/new"');
  });

  it("errorState renders an alert without retry, and adds retry link when href provided", () => {
    const noRetry = errorState({
      title: "Could not load cases",
      translate: fixtureTranslate,
    });
    expect(noRetry).toContain("alert-error");
    expect(noRetry).not.toContain("hx-get=");

    const withRetry = errorState({
      title: "Could not load cases",
      description: "Network is unreachable.",
      retryHref: "/cases",
      translate: fixtureTranslate,
    });
    expect(withRetry).toContain('hx-get="/cases"');
    expect(withRetry).toContain('hx-target="#main-content"');
    expect(withRetry).toContain("Retry");
  });

  it("successState marks region with data-page-state=ready", () => {
    const html = successState({ contentHtml: "<p>ok</p>", ariaLabel: "Cases" });
    expect(html).toContain('data-page-state="ready"');
    expect(html).toContain('aria-label="Cases"');
    expect(html).toContain("<p>ok</p>");
  });
});

describe("empty-state", () => {
  it("renders icon + message + description + CTA", () => {
    const html = renderEmptyState({
      message: "Nothing to see",
      description: "Yet.",
      icon: "automation",
      actionLabel: "Create automation",
      actionHref: "/automations/new",
    });
    expect(html).toContain("Nothing to see");
    expect(html).toContain("Yet.");
    expect(html).toContain("Create automation");
    expect(html).toContain('aria-label="Create automation"');
    expect(html).toContain('hx-get="/automations/new"');
  });

  it("falls back to default glyph for unknown icon name", () => {
    const html = renderEmptyState({ message: "Empty", icon: "unknown-glyph" });
    expect(html).toContain("<svg");
  });
});

describe("toast-container", () => {
  it("emits stable id, live region, and optional hx-ext", () => {
    const html = renderToastContainer({
      translate: fixtureTranslate,
      hxExt: "remove-me",
    });
    expect(html).toContain(`id="${TOAST_CONTAINER_ID}"`);
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('aria-label="Notifications"');
    expect(html).toContain('hx-ext="remove-me"');
  });
});

describe("confirm-dialog", () => {
  it("uses default labels from the translator and exposes ARIA wiring", () => {
    const html = renderConfirmDialog({ translate: fixtureTranslate });
    expect(html).toContain(`id="${SHELL_CONFIRM_DIALOG_ID}"`);
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-labelledby="ui-shell-confirm-dialog-title"');
    expect(html).toContain('aria-describedby="ui-shell-confirm-dialog-message"');
    expect(html).toContain("Confirm");
    expect(html).toContain("Cancel");
    expect(html).toContain("Are you sure you want to continue?");
    expect(html).toContain("btn-error");
  });

  it("respects explicit overrides", () => {
    const html = renderConfirmDialog({
      translate: fixtureTranslate,
      title: "Delete 3 invoices?",
      message: "This cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Keep",
    });
    expect(html).toContain("Delete 3 invoices?");
    expect(html).toContain("This cannot be undone.");
    expect(html).toContain("Delete");
    expect(html).toContain("Keep");
  });
});

describe("pagination", () => {
  it("renders nothing for single-page result sets", () => {
    expect(
      renderPagination({
        page: 1,
        totalPages: 1,
        baseUrl: "/cases",
        translate: fixtureTranslate,
      }),
    ).toBe("");
  });

  it("disables previous on page 1 and next on last page", () => {
    const first = renderPagination({
      page: 1,
      totalPages: 3,
      baseUrl: "/cases",
      translate: fixtureTranslate,
    });
    expect(first).toContain('aria-disabled="true"');
    expect(first).toContain("Previous");
    expect(first).toContain('href="/cases?page=2"');

    const last = renderPagination({
      page: 3,
      totalPages: 3,
      baseUrl: "/cases?sort=name",
      translate: fixtureTranslate,
    });
    expect(last).toContain('href="/cases?sort=name&amp;page=2"');
    expect(last).toContain("Next");
    expect(last).toContain('aria-disabled="true"');
  });

  it("emits the current-page status indicator", () => {
    const html = renderPagination({
      page: 2,
      totalPages: 5,
      baseUrl: "/cases",
      translate: fixtureTranslate,
    });
    expect(html).toContain("Page 2");
    expect(html).toContain("/ 5");
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-current="page"');
  });
});

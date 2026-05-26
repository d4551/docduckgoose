import { describe, expect, it } from "bun:test";
import { renderErrorBoundaryTemplates } from "./error-boundary.js";
import {
  renderFormActions,
  renderFormGroup,
  renderFormSelect,
  renderFormTextarea,
} from "./form-group.js";
import { renderButtonLoadingIndicator, renderLoadingIndicator } from "./loading-indicator.js";
import { renderSidebar } from "./sidebar.js";
import type { TranslateFn } from "./types.js";

const FIXTURE_TRANSLATIONS: Record<string, string> = {
  "brand.name": "Baohaus",
  "common.actions.cancel": "Cancel",
  "common.actions.submit": "Save changes",
  "common.a11y.closeSidebar": "Close sidebar",
  "common.a11y.loadingIndicator": "Loading data",
  "common.a11y.mainNavigation": "Main navigation",
  "ui.errorBoundary.auth.title": "Sign-in required",
  "ui.errorBoundary.auth.message401": "Sign in to continue.",
  "ui.errorBoundary.auth.message403": "You don't have access.",
  "ui.errorBoundary.client.title": "Request rejected",
  "ui.errorBoundary.client.message": "Adjust the request and try again.",
  "ui.errorBoundary.maxRetriesReached": "Max retries reached",
  "ui.errorBoundary.network.title": "Network unreachable",
  "ui.errorBoundary.network.message": "Check your connection.",
  "ui.errorBoundary.rateLimit.title": "Rate limit hit",
  "ui.errorBoundary.rateLimit.message": "Wait before retrying.",
  "ui.errorBoundary.retry": "Retry",
  "ui.errorBoundary.retryAria": "Retry the failed request",
  "ui.errorBoundary.server.title": "Service is having a problem",
  "ui.errorBoundary.server.message": "Try again in a moment.",
  "ui.errorBoundary.unknown.title": "Something went wrong",
  "ui.errorBoundary.unknown.message": "Try again or contact support.",
};

const fixtureTranslate: TranslateFn = (key) => FIXTURE_TRANSLATIONS[key] ?? key;

describe("loading-indicator", () => {
  it("renders htmx-indicator span with role=status and translated sr-only label", () => {
    const html = renderLoadingIndicator("save-indicator", fixtureTranslate, { size: "md" });
    expect(html).toContain('id="save-indicator"');
    expect(html).toContain("htmx-indicator");
    expect(html).toContain("loading-spinner");
    expect(html).toContain("loading-md");
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("Loading data");
  });

  it("button-level indicator can be made always visible", () => {
    const visible = renderButtonLoadingIndicator(fixtureTranslate, {
      alwaysVisible: true,
      variant: "dots",
    });
    expect(visible).not.toContain("htmx-indicator");
    expect(visible).toContain("loading-dots");
  });
});

describe("error-boundary", () => {
  it("renders all 7 fallback templates with stable data attributes", () => {
    const html = renderErrorBoundaryTemplates(fixtureTranslate);
    for (const key of [
      "auth-401",
      "auth-403",
      "rate-limit",
      "server",
      "client",
      "unknown",
      "network",
    ]) {
      expect(html).toContain(`data-error-boundary-template="${key}"`);
      expect(html).toContain(`data-error-boundary-state="${key}"`);
    }
    expect(html).toContain("alert-warning");
    expect(html).toContain("alert-error");
    expect(html).toContain("data-error-boundary-retry");
  });

  it("omits retry on auth fallbacks and status code on network fallback", () => {
    const html = renderErrorBoundaryTemplates(fixtureTranslate);
    const auth401Block = html.split('data-error-boundary-template="auth-401"')[1] ?? "";
    expect(auth401Block.split("</template>")[0]).not.toContain("data-error-boundary-retry");
    const networkBlock = html.split('data-error-boundary-template="network"')[1] ?? "";
    expect(networkBlock.split("</template>")[0]).not.toContain("data-error-boundary-code");
  });
});

describe("sidebar", () => {
  it("renders nav landmark with active leaf marked aria-current", () => {
    const html = renderSidebar({
      drawerId: "shell-drawer",
      translate: fixtureTranslate,
      currentPath: "/cases",
      items: [
        { label: "Dashboard", href: "/" },
        { label: "Cases", href: "/cases" },
        { label: "Reports", href: "/reports" },
      ],
    });
    expect(html).toContain('for="shell-drawer"');
    expect(html).toContain('aria-label="Close sidebar"');
    expect(html).toContain('aria-label="Main navigation"');
    expect(html).toContain("/cases");
    expect(html).toContain('aria-current="page"');
    expect(html).toContain("Baohaus");
  });

  it("opens collapsed group when an active child matches", () => {
    const html = renderSidebar({
      drawerId: "shell-drawer",
      translate: fixtureTranslate,
      currentPath: "/automations/123",
      items: [
        {
          label: "Workflow",
          href: "/automations",
          children: [
            { label: "Automations", href: "/automations" },
            { label: "Schedules", href: "/automations/schedules" },
          ],
        },
      ],
    });
    expect(html).toContain("<details open");
    expect(html).toContain("Schedules");
  });
});

describe("form-group", () => {
  it("renders fieldset+legend+input with describedby wiring", () => {
    const html = renderFormGroup({
      id: "email",
      label: "Email address",
      type: "email",
      required: true,
      helpText: "We never share your email.",
      autocomplete: "email",
      placeholder: "jane@company.com",
    });
    expect(html).toContain("<fieldset");
    expect(html).toContain('id="email-legend"');
    expect(html).toContain("Email address");
    expect(html).toContain('type="email"');
    expect(html).toContain('aria-required="true"');
    expect(html).toContain('autocomplete="email"');
    expect(html).toContain('aria-describedby="email-hint"');
    expect(html).toContain("We never share your email.");
  });

  it("renders error block + input-error class when error is supplied", () => {
    const html = renderFormGroup({
      id: "email",
      label: "Email",
      error: "Email is required.",
    });
    expect(html).toContain("input-error");
    expect(html).toContain('id="email-error"');
    expect(html).toContain("Email is required.");
  });

  it("renderFormSelect renders selected option + select-error on error", () => {
    const html = renderFormSelect({
      id: "country",
      label: "Country",
      options: [
        { value: "us", label: "United States", selected: true },
        { value: "uk", label: "United Kingdom" },
      ],
      error: "Pick a country.",
    });
    expect(html).toContain('value="us" selected');
    expect(html).toContain("select-error");
    expect(html).toContain("Pick a country.");
  });

  it("renderFormTextarea respects rows and value", () => {
    const html = renderFormTextarea({
      id: "notes",
      label: "Notes",
      rows: 6,
      value: "Hello & world",
    });
    expect(html).toContain('rows="6"');
    expect(html).toContain("Hello &amp; world");
  });

  it("renderFormActions emits submit + cancel with HTMX wiring + loading indicator", () => {
    const html = renderFormActions({
      translate: fixtureTranslate,
      cancelHref: "/cases",
      submitVariant: "primary",
    });
    expect(html).toContain('hx-get="/cases"');
    expect(html).toContain("Cancel");
    expect(html).toContain("Save changes");
    expect(html).toContain("htmx-indicator");
    expect(html).toContain("data-loading-disable");
    expect(html).toContain("btn-primary");
  });
});

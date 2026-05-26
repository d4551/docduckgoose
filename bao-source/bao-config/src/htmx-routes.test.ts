import { describe, expect, test } from "bun:test";
import {
  buildDefaultHtmxSidebarItems,
  HTMX_ROUTES,
  type HtmxRouteItem,
  isRealtimeFragmentsPathname,
} from "./htmx-routes";

const BAO_COMPOSER_ROUTE_KEYS = [
  "baoComposer",
  "baoComposerPreview",
  "baoComposerImprove",
  "baoComposerGenerate",
  "baoComposerInstall",
] as const;

function findSidebarItemByLabel(
  items: readonly HtmxRouteItem[],
  labelKey: HtmxRouteItem["labelKey"],
): HtmxRouteItem | undefined {
  for (const item of items) {
    if (item.labelKey === labelKey) {
      return item;
    }
    const child = findSidebarItemByLabel(item.children ?? [], labelKey);
    if (child) {
      return child;
    }
  }
  return undefined;
}

describe("canonical HTMX routes", () => {
  test("notification, observability, and BaoDown route builders return non-empty paths", () => {
    expect(HTMX_ROUTES.hub.notificationRead("abc")).toMatch(/abc/);
    expect(HTMX_ROUTES.observability.root).toMatch(/^\//);
    expect(HTMX_ROUTES.automation.baodownDefinition("def")).toMatch(/def/);
    expect(HTMX_ROUTES.automation.baodownVersionRun("def", "ver")).toMatch(/def.*ver/);
  });

  test("Bao Composer automation routes are defined", () => {
    for (const key of BAO_COMPOSER_ROUTE_KEYS) {
      const route = HTMX_ROUTES.automation[key];
      expect(typeof route).toBe("string");
      expect(route).toMatch(/^\//);
    }
  });

  test(".bao archive authoring routes are defined", () => {
    expect(HTMX_ROUTES.automation.baoArchiveAuthoring).toMatch(/^\//);
    expect(HTMX_ROUTES.automation.baoArchiveAuthoringNew).toMatch(/^\//);
    expect(HTMX_ROUTES.automation.baoArchiveAuthoringJob("job")).toMatch(/job/);
    expect(HTMX_ROUTES.automation.baoArchiveAuthoringJobStatus("job")).toMatch(/job/);
    expect(HTMX_ROUTES.automation.baoArchiveAuthoringJobResults("job")).toMatch(/job/);
  });

  test("documentation sidebar entry routes to the built docs root", () => {
    const docsItem = findSidebarItemByLabel(buildDefaultHtmxSidebarItems(), "nav.docs");
    expect(docsItem?.href).toBe(HTMX_ROUTES.docs.root);
  });

  test("realtime fragment pathPrefix matches all fragment routes", () => {
    const { pathPrefix, heartbeat, ecosystemEventsSse } = HTMX_ROUTES.realtime.fragments;
    expect(heartbeat.startsWith(pathPrefix)).toBe(true);
    expect(ecosystemEventsSse.startsWith(pathPrefix)).toBe(true);
    expect(isRealtimeFragmentsPathname(heartbeat)).toBe(true);
    expect(isRealtimeFragmentsPathname(ecosystemEventsSse)).toBe(true);
    expect(isRealtimeFragmentsPathname("/dashboard")).toBe(false);
  });
});

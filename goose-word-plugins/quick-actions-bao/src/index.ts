import type { Elysia } from "elysia";
import { QUICK_ACTIONS_API_ROUTE, QUICK_ACTIONS_SETTINGS_TAB_ROUTE } from "./routes.ts";

interface SettingsTabRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly section: string;
  readonly position: number;
  readonly labelKey: string;
  readonly contentUrl: string;
}

const ACTIONS = [
  {
    id: "insert-meeting-notes",
    label: "Meeting notes",
    insert: "## Notes\n\n- \n\n## Decisions\n\n- ",
  },
  {
    id: "insert-daily-log",
    label: "Daily log",
    insert: "## Today\n\n- \n\n## Next\n\n- ",
  },
  { id: "clean-markdown", label: "Clean markdown", insert: "" },
] as const;

const renderPanel = (): string => `<section>
  <h3>Quick actions</h3>
  <p>Reusable local document actions and snippets.</p>
</section>`;

const plugin = {
  id: "quick-actions-bao",
  createSettingsTabRegistrations(): readonly SettingsTabRegistration[] {
    return [
      {
        id: "quick-actions-bao:settings",
        extensionId: "quick-actions-bao",
        section: "advanced",
        position: 30,
        labelKey: "toolbar.markdown",
        contentUrl: QUICK_ACTIONS_SETTINGS_TAB_ROUTE,
      },
    ];
  },
  registerElysia(app: Elysia) {
    app
      .get(
        QUICK_ACTIONS_SETTINGS_TAB_ROUTE,
        () =>
          new Response(renderPanel(), {
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
      )
      .get(QUICK_ACTIONS_API_ROUTE, () => ({ actions: ACTIONS }));
  },
};

export default plugin;

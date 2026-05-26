import type { Elysia } from "elysia";
import { SPELLCHECK_API_ROUTE, SPELLCHECK_SETTINGS_TAB_ROUTE } from "./routes.ts";

const DICTIONARY = new Set([
  "the",
  "and",
  "markdown",
  "goose",
  "word",
  "document",
  "offline",
  "raspberry",
  "pi",
]);

export interface SettingsTabRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly section: string;
  readonly position: number;
  readonly labelKey: string;
  readonly contentUrl: string;
}

export interface SpellcheckPlugin {
  readonly id: string;
  readonly labelKey: string;
  createSettingsTabRegistrations: () => readonly SettingsTabRegistration[];
  registerElysia: (app: Elysia) => void;
  renderSettingsPanel: () => string;
}

function countUnknownWords(text: string): number {
  const tokens = text.toLowerCase().match(/[a-z']+/g) ?? [];
  let unknown = 0;
  for (const token of tokens) {
    if (!DICTIONARY.has(token)) {
      unknown += 1;
    }
  }
  return unknown;
}

const spellcheckPlugin: SpellcheckPlugin = {
  id: "spellcheck-bao",
  labelKey: "plugin.spellcheck.title",
  createSettingsTabRegistrations() {
    return [
      {
        id: "spellcheck-bao:settings",
        extensionId: "spellcheck-bao",
        section: "features",
        position: 0,
        labelKey: "plugin.spellcheck.title",
        contentUrl: SPELLCHECK_SETTINGS_TAB_ROUTE,
      },
    ];
  },
  registerElysia(app) {
    app
      .get(
        SPELLCHECK_SETTINGS_TAB_ROUTE,
        () =>
          new Response(spellcheckPlugin.renderSettingsPanel(), {
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
      )
      .post(SPELLCHECK_API_ROUTE, async ({ request }) => {
        const form = await request.formData();
        const body = form.get("body");
        const text = typeof body === "string" ? body : "";
        return {
          unknownWords: countUnknownWords(text),
          dictionarySize: DICTIONARY.size,
        };
      });
  },
  renderSettingsPanel() {
    return `<section>
      <h3>Spellcheck</h3>
      <p>Local dictionary with ${DICTIONARY.size} words.</p>
      <p>Use the spellcheck API route with a body field to check markdown.</p>
    </section>`;
  },
};

export default spellcheckPlugin;

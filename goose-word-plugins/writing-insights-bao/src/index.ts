import type { Elysia } from "elysia";
import {
  WRITING_INSIGHTS_ANALYZE_API_ROUTE,
  WRITING_INSIGHTS_SETTINGS_TAB_ROUTE,
} from "./routes.ts";

interface SettingsTabRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly section: string;
  readonly position: number;
  readonly labelKey: string;
  readonly contentUrl: string;
}

const countSyllables = (word: string): number => {
  const matches = word.toLowerCase().match(/[aeiouy]+/g);
  return Math.max(1, matches?.length ?? 1);
};

const analyzeText = (text: string) => {
  const words = text.match(/[A-Za-z']+/g) ?? [];
  const sentences = text.split(/[.!?]+/).filter((item) => item.trim().length > 0);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 220));
  const readingEase =
    wordCount === 0
      ? 100
      : Math.round(206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount));
  return {
    wordCount,
    sentenceCount: sentences.length,
    readingMinutes,
    readingEase: Math.max(0, Math.min(100, readingEase)),
  };
};

const renderPanel = (): string => `<section>
  <h3>Writing insights</h3>
  <p>Calculate word count, reading time, and reading ease locally.</p>
</section>`;

const plugin = {
  id: "writing-insights-bao",
  createSettingsTabRegistrations(): readonly SettingsTabRegistration[] {
    return [
      {
        id: "writing-insights-bao:settings",
        extensionId: "writing-insights-bao",
        section: "advanced",
        position: 10,
        labelKey: "settings.capabilities.title",
        contentUrl: WRITING_INSIGHTS_SETTINGS_TAB_ROUTE,
      },
    ];
  },
  registerElysia(app: Elysia) {
    app
      .get(
        WRITING_INSIGHTS_SETTINGS_TAB_ROUTE,
        () =>
          new Response(renderPanel(), {
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
      )
      .post(WRITING_INSIGHTS_ANALYZE_API_ROUTE, async ({ request }) => {
        const form = await request.formData();
        const body = form.get("body");
        return analyzeText(typeof body === "string" ? body : "");
      });
  },
  createEnterpriseContextRegistrations() {
    return [
      {
        id: "writing-insights-bao:personal",
        extensionId: "writing-insights-bao",
        labelKey: "enterprise.context.writingInsights.personal" as const,
        type: "user" as const,
      },
      {
        id: "writing-insights-bao:team",
        extensionId: "writing-insights-bao",
        labelKey: "enterprise.context.writingInsights.team" as const,
        type: "workspace" as const,
      },
      {
        id: "writing-insights-bao:workplace",
        extensionId: "writing-insights-bao",
        labelKey: "enterprise.context.writingInsights.workplace" as const,
        type: "workplace" as const,
      },
      {
        id: "writing-insights-bao:admin",
        extensionId: "writing-insights-bao",
        labelKey: "enterprise.context.writingInsights.admin" as const,
        type: "admin" as const,
      },
      {
        id: "writing-insights-bao:corp",
        extensionId: "writing-insights-bao",
        labelKey: "enterprise.context.writingInsights.corp" as const,
        type: "enterprise" as const,
      },
    ];
  },
};

export default plugin;

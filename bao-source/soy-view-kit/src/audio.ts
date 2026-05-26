import { CLIENT_ASSET_PATH } from "@baohaus/har-gow-config/routes";
import {
  escapeAttr,
  escapeHtml,
  renderAlert,
  renderPageShell,
  renderToastContainer,
} from "./html.js";
import { resolveLocale, translate } from "./i18n.js";
import { renderSectionCard } from "./templates/section-card.js";

export type AudioUiRouteMap = {
  readonly audioHealthPartial: string;
  readonly audioTranscribeFile: string;
};

export const AUDIO_UI_ROUTE: AudioUiRouteMap = Object.freeze({
  audioHealthPartial: "/ui/partials/audio-health",
  audioTranscribeFile: "/ui/transcribe-file",
});

function renderRequestIndicator(id: string): string {
  return `<span id="${escapeAttr(id)}" class="loading loading-spinner loading-sm htmx-indicator" aria-hidden="true"></span>`;
}

export function renderAudioHealthCard(input: {
  cacheDir: string;
  locale?: string;
  model: string;
  runtime: string;
  status: string;
}): string {
  const locale = resolveLocale(input.locale);
  return renderSectionCard({
    title: translate(locale, "ui.audioHealthTitle"),
    body: `
    <p><strong>${escapeHtml(translate(locale, "ui.statusLabel"))}</strong>: ${escapeHtml(input.status)}</p>
    <p><strong>${escapeHtml(translate(locale, "ui.runtimeLabel"))}</strong>: ${escapeHtml(input.runtime)}</p>
    <p><strong>${escapeHtml(translate(locale, "ui.modelLabel"))}</strong>: <code>${escapeHtml(input.model)}</code></p>
    <p><strong>${escapeHtml(translate(locale, "ui.cacheLabel"))}</strong>: <code>${escapeHtml(input.cacheDir)}</code></p>`,
  });
}

export function renderTranscriptResult(input: {
  code?: string;
  locale?: string;
  message?: string;
  model?: string;
  text?: string;
}): string {
  const locale = resolveLocale(input.locale);
  if (input.text === undefined || input.model === undefined) {
    const message = input.message ?? input.code ?? translate(locale, "ui.errorTitle");
    return renderAlert({
      locale,
      message: `${translate(locale, "ui.errorTitle")}: ${message}`,
      variant: "error",
    });
  }

  return `<section class="space-y-2">
  <p><strong>${escapeHtml(translate(locale, "ui.transcriptTitle"))}</strong>: ${escapeHtml(
    input.text.length > 0 ? input.text : translate(locale, "ui.emptyTranscript"),
  )}</p>
  <p><small>${escapeHtml(translate(locale, "ui.modelLabel"))}: ${escapeHtml(input.model)}</small></p>
</section>`;
}

export function renderTranscribePage(input: {
  audioHealthMarkup: string;
  locale?: string;
  routeMap?: AudioUiRouteMap;
  stylesheetHref: string;
}): string {
  const locale = resolveLocale(input.locale);
  const routeMap = input.routeMap ?? AUDIO_UI_ROUTE;
  return renderPageShell({
    body: `<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
  <header class="space-y-2">
    <h1 class="text-3xl font-bold">${escapeHtml(translate(locale, "app.name"))}</h1>
    <p class="text-base-content/60">${escapeHtml(translate(locale, "app.tagline"))}</p>
  </header>
  <section id="audio-health" hx-get="${escapeAttr(
    routeMap.audioHealthPartial,
  )}" hx-trigger="load, every 10s" hx-target="#audio-health" hx-swap="innerHTML" hx-indicator="#audio-health-indicator">
    ${input.audioHealthMarkup}
  </section>
  <div class="flex justify-center">
    ${renderRequestIndicator("audio-health-indicator")}
  </div>
  ${renderSectionCard({
    title: translate(locale, "ui.transcribeTitle"),
    description: translate(locale, "ui.transcribeIntro"),
    body: `
      <form hx-post="${escapeAttr(
        routeMap.audioTranscribeFile,
      )}" hx-encoding="multipart/form-data" hx-target="#tx-result" hx-target-error="#tx-error" hx-swap="innerHTML" hx-indicator="#transcribe-submit-indicator" aria-label="${escapeAttr(translate(locale, "ui.transcribeFormAriaLabel"))}" class="space-y-4">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">${escapeHtml(translate(locale, "ui.uploadLabel"))}</legend>
          <input class="file-input file-input-md w-full" type="file" name="file" accept=".wav,audio/wav,audio/x-wav" required aria-describedby="transcribe-upload-hint" />
          <p id="transcribe-upload-hint" class="label">${escapeHtml(translate(locale, "ui.uploadHint"))}</p>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">${escapeHtml(translate(locale, "ui.languageLabel"))}</legend>
          <input class="input input-md w-full" name="language" type="text" maxlength="32" placeholder="${escapeAttr(translate(locale, "ui.languagePlaceholder"))}" aria-describedby="transcribe-language-hint"/>
          <p id="transcribe-language-hint" class="label">${escapeHtml(translate(locale, "ui.languageHint"))}</p>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">${escapeHtml(translate(locale, "ui.modelInputLabel"))}</legend>
          <input class="input input-md w-full" name="model" type="text" maxlength="128" placeholder="${escapeAttr(translate(locale, "ui.modelPlaceholder"))}" aria-describedby="transcribe-model-hint"/>
          <p id="transcribe-model-hint" class="label">${escapeHtml(translate(locale, "ui.modelHint"))}</p>
        </fieldset>
        <button class="btn btn-primary btn-md" type="submit">
          ${renderRequestIndicator("transcribe-submit-indicator")}
          <span>${escapeHtml(translate(locale, "ui.transcribeAction"))}</span>
        </button>
      </form>
      <div id="tx-error" class="empty:hidden" role="alert" aria-live="assertive"></div>
      <div id="tx-result" aria-live="polite"></div>`,
  })}
  ${renderToastContainer()}
</main>`,
    description: translate(locale, "app.tagline"),
    locale,
    scripts: [CLIENT_ASSET_PATH.HTMX_JS],
    stylesheets: [input.stylesheetHref],
    title: translate(locale, "app.name"),
  });
}

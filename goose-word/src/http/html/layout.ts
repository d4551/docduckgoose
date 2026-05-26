import { GOOSE_WORD_CLIENT_ASSETS } from "@baohaus/goose-word-ui-bao/manifest";
import { HTMX_CORE_RELATIVE_PATH } from "@baohaus/htmx-vendor-bao/manifest";
import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { renderIcon } from "@baohaus/soy-view-kit/templates/icons";
import packageJson from "../../../package.json" with { type: "json" };
import { EDITOR_FONT_CATALOG, editorFontById } from "../../config/editor-fonts.ts";
import {
  docListPath,
  healthApiPath,
  preferencesApiPath,
  ROUTES,
  settingsPath,
} from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import {
  getActiveEnterpriseContext,
  gooseWordContributionSurfaces,
} from "../../install/contribution-surfaces.ts";
import { getUserPreferences } from "../../services/user-prefs.ts";
import { escapeHtml } from "./escape-html.ts";

export interface PageShellOptions {
  readonly locale: LocaleCode;
  readonly titleKey: Parameters<typeof translate>[1];
  readonly bodyHtml: string;
  readonly activeNav?: "docs" | "settings";
}

const escapeAttr = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const glassLensSeedFromLocale = (locale: LocaleCode): number => {
  let hash = 5381;
  for (let index = 0; index < locale.length; index += 1) {
    hash = (hash * 33) ^ locale.charCodeAt(index);
  }
  return (Math.abs(hash) % 999) + 1;
};

const renderGlassLensFilter = (locale: LocaleCode): string => {
  const seed = glassLensSeedFromLocale(locale);
  return `<svg class="sr-only" aria-hidden="true"><defs>
    <filter id="bao-glass-lens" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="2" seed="${seed}" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs></svg>`;
};

const UI_ASSET_REVISION = "fluid-flow-4";

export const renderEnterpriseChip = (locale: LocaleCode): string => {
  const activeId = getActiveEnterpriseContext();
  const regs = gooseWordContributionSurfaces.enterpriseContext.snapshot();
  const current = regs.find((r) => r.id === activeId) ?? regs[0];
  const currentLabel = current ? translate(locale, current.labelKey) : "Personal";
  const currentType = current?.type ?? "user";
  const icon = renderIcon(
    currentType === "enterprise"
      ? "crown"
      : currentType === "admin" || currentType === "workplace"
        ? "building"
        : "plugins",
    { size: "compact", className: "size-3.5" },
  );
  const badgeColor =
    currentType === "enterprise"
      ? "badge-success"
      : currentType === "admin"
        ? "badge-warning"
        : currentType === "workplace"
          ? "badge-secondary"
          : currentType === "workspace"
            ? "badge-primary"
            : "badge-info";
  return `<a id="gw-enterprise-chip" href="${settingsPath}" class="btn btn-ghost btn-xs gap-1 px-1.5 mr-1" aria-label="Current enterprise context: ${escapeAttr(currentLabel)}" data-current-id="${escapeAttr(current?.id ?? "")}">
    ${icon}<span class="badge badge-xs ${badgeColor} font-mono truncate max-w-[5.5rem]">${escapeHtml(currentLabel)}</span>
  </a>`;
};

export const renderPageShell = (options: PageShellOptions): string => {
  const title = translate(options.locale, options.titleKey);
  const appTitle = translate(options.locale, "app.title");
  const docsLabel = translate(options.locale, "nav.docs");
  const settingsLabel = translate(options.locale, "nav.settings");
  const deviceLabel = translate(options.locale, "connectivity.local");
  const offlineLabel = translate(options.locale, "connectivity.offlineNetwork");
  const recoveredLabel = translate(options.locale, "connectivity.recovered");
  const inputStatusAria = translate(options.locale, "input.status.aria");
  const keyboardPending = translate(options.locale, "input.keyboard.pending");
  const pointerPending = translate(options.locale, "input.pointer.pending");
  const powerPending = translate(options.locale, "input.power.pending");
  const speechUnavailable = translate(options.locale, "speech.unavailable");
  const speechTranscribeUnavailable = translate(options.locale, "speech.transcribeUnavailable");
  const docsActive = options.activeNav === "docs" ? "dock-active" : "";
  const settingsActive = options.activeNav === "settings" ? "dock-active" : "";
  const prefs = getUserPreferences();
  const editorFont = editorFontById(prefs.editorFont);
  const uiFont = editorFontById(prefs.uiFont);
  const mermaidError = translate(options.locale, "editor.mermaidError");
  const typographySaved = translate(options.locale, "typography.saved");
  const fontFaceCss = EDITOR_FONT_CATALOG.map(
    (font) =>
      `@font-face{font-family:"${font.cssFamily}";src:url("${ROUTES.static.font(font.id, font.woff2File)}") format("woff2");font-display:swap;}`,
  ).join("");

  const clientScript = (asset: string): string =>
    `${ROUTES.static.clientFile(asset)}?v=${packageJson.version}-${UI_ASSET_REVISION}`;

  const inputChipClass = resolveTemplateButtonClasses({
    variant: "ghost",
    size: "icon-compact",
    className: "gw-input-chip sr-only",
  });

  return `<!DOCTYPE html>
<html lang="${options.locale}" class="gw-shell" data-bao-glass-lens="" data-theme="${escapeAttr(prefs.theme)}" data-bao-ui-tokens="baohaus-aurora" data-bao-ui-density="baohaus-aurora" data-bao-ui-density-profile="compact"
  data-gw-editor-font="${escapeAttr(prefs.editorFont)}"
  data-gw-editor-font-family="${escapeAttr(editorFont.cssFamily)}"
  data-gw-editor-font-style="${escapeAttr(prefs.editorFontStyle)}"
  data-gw-ui-font="${escapeAttr(prefs.uiFont)}"
  data-gw-ui-font-family="${escapeAttr(uiFont.cssFamily)}"
  data-gw-default-draft-style="${escapeAttr(prefs.defaultDraftStyle)}"
  data-gw-preferences-url="${preferencesApiPath}"
  data-gw-mermaid-vendor="${ROUTES.static.mermaid}"
  data-gw-mermaid-error="${escapeAttr(mermaidError)}"
  data-gw-typography-saved="${escapeAttr(typographySaved)}"
  data-gw-connectivity-ping-url="${healthApiPath}"
  data-gw-connectivity-local="${escapeAttr(deviceLabel)}"
  data-gw-connectivity-offline-network="${escapeAttr(offlineLabel)}"
  data-gw-connectivity-recovered="${escapeAttr(recoveredLabel)}"
  data-gw-speech-unavailable="${escapeAttr(speechUnavailable)}"
  data-gw-speech-transcribe-unavailable="${escapeAttr(speechTranscribeUnavailable)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="oklch(62% 0.18 200)" />
  <link rel="manifest" href="${ROUTES.static.manifest}" />
  <title>${escapeAttr(title)} · ${escapeAttr(appTitle)}</title>
  <link rel="stylesheet" href="${ROUTES.static.tokens}" />
  <link rel="stylesheet" href="${ROUTES.static.density}" />
  <link rel="stylesheet" href="${ROUTES.static.daisy}" />
  <link rel="stylesheet" href="${ROUTES.static.appStyles}" />
  <style>${fontFaceCss}</style>
  ${renderGlassLensFilter(options.locale)}
  <script src="${ROUTES.static.htmx}" defer data-vendor="${HTMX_CORE_RELATIVE_PATH}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.offlineController)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.inputCapabilities)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.touchToolbar)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.localSpeech)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.gooseChibi)}"></script>
  <script src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.typography)}"></script>
  <script src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.mermaidRender)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.glassSpecular)}"></script>
</head>
<body class="min-h-dvh bg-base-200 text-base-content" data-gw-scrollport>
  <div class="gw-shell-frame mx-auto relative flex min-h-dvh w-full flex-col border-x border-base-300 bg-base-100">
    <header class="navbar sticky top-0 min-h-11 shrink-0 border-b border-base-300 bg-base-100/95 px-2 z-30">
      <div class="navbar-start gap-2">
        <span class="gw-goose-chibi tooltip tooltip-bottom" tabindex="0" data-goose-mood="idle" data-tip="${escapeAttr(appTitle)}" aria-label="Animated goose mascot" role="img">
          <span class="gw-goose-shadow" aria-hidden="true"></span>
          <span class="gw-goose-tail" aria-hidden="true"></span>
          <span class="gw-goose-wing" aria-hidden="true"></span>
          <span class="gw-goose-body" aria-hidden="true">
            <span class="gw-goose-eye"></span>
            <span class="gw-goose-beak"></span>
            <span class="gw-goose-cheek"></span>
          </span>
          <span class="gw-goose-spark" aria-hidden="true"></span>
          <span class="gw-goose-foot gw-goose-foot-left" aria-hidden="true"></span>
          <span class="gw-goose-foot gw-goose-foot-right" aria-hidden="true"></span>
        </span>
        <span class="gw-brand gw-handwriting truncate text-sm font-bold">${escapeAttr(appTitle)}</span>
      </div>
      <div class="navbar-end">
        <a href="${settingsPath}" class="gw-context-link" aria-label="${escapeAttr(translate(options.locale, "nav.settings"))}">
          ${renderIcon("settings", { size: "compact" })}
        </a>
        <div class="sr-only" aria-label="${escapeAttr(inputStatusAria)}">
          <span class="${inputChipClass}" data-gw-input-chip="keyboard" data-tip="${escapeAttr(keyboardPending)}" aria-label="${escapeAttr(keyboardPending)}" aria-live="polite" role="status">${renderIcon("keyboard", { size: "device" })}<span class="indicator-item status status-xs status-neutral" aria-hidden="true"></span></span>
          <span class="${inputChipClass}" data-gw-input-chip="pointer" data-tip="${escapeAttr(pointerPending)}" aria-label="${escapeAttr(pointerPending)}" aria-live="polite" role="status">${renderIcon("pointer", { size: "device" })}<span class="indicator-item status status-xs status-neutral" aria-hidden="true"></span></span>
          <span class="${inputChipClass}" data-gw-input-chip="power" data-tip="${escapeAttr(powerPending)}" aria-label="${escapeAttr(powerPending)}" aria-live="polite" role="status">${renderIcon("power", { size: "device" })}<span class="indicator-item status status-xs status-neutral" aria-hidden="true"></span></span>
        </div>
      </div>
    </header>
    <main class="gw-main flex-1 p-3 pb-28" id="gw-main">${options.bodyHtml}</main>
    <nav class="dock dock-md bao-glass fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[var(--gw-shell-max-width)]" aria-label="${escapeAttr(translate(options.locale, "dock.aria"))}">
      <a href="${docListPath}" class="bao-glass__content tooltip tooltip-top ${docsActive}" data-tip="${escapeAttr(docsLabel)}" aria-label="${escapeAttr(docsLabel)}"${options.activeNav === "docs" ? ' aria-current="page"' : ""}>
        ${renderIcon("docs", { size: "dock" })}
        <span class="dock-label sr-only">${escapeAttr(docsLabel)}</span>
      </a>
      <a href="${settingsPath}" class="bao-glass__content tooltip tooltip-top ${settingsActive}" data-tip="${escapeAttr(settingsLabel)}" aria-label="${escapeAttr(settingsLabel)}"${options.activeNav === "settings" ? ' aria-current="page"' : ""}>
        ${renderIcon("settings", { size: "dock" })}
        <span class="dock-label sr-only">${escapeAttr(settingsLabel)}</span>
      </a>
    </nav>
    <output id="gw-offline-toast" class="gw-offline-toast" role="status" aria-live="polite"></output>
  </div>
</body>
</html>`;
};

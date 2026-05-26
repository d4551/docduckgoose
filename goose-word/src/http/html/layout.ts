import { GOOSE_WORD_CLIENT_ASSETS } from "@baohaus/goose-word-ui-bao/manifest";
import { HTMX_CORE_RELATIVE_PATH } from "@baohaus/htmx-vendor-bao/manifest";
import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { renderIcon } from "@baohaus/soy-view-kit/templates/icons";
import packageJson from "../../../package.json" with { type: "json" };
import { GOOSE_WORD_PORT } from "../../config/paths.ts";
import { editorFontById } from "../../config/editor-fonts.ts";
import {
  CLIENT_API_ROUTES,
  docListPath,
  healthApiPath,
  preferencesApiPath,
  ROUTES,
  settingsPath,
} from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import { getUserPreferences } from "../../services/user-prefs.ts";
import { renderEnterpriseContextChip } from "./enterprise-context-chip.ts";
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

const UI_ASSET_REVISION = "htmx-fragment-locale-1";

export const renderDockNav = (
  locale: LocaleCode,
  activeNav: PageShellOptions["activeNav"],
): string => {
  const docsLabel = translate(locale, "nav.docs");
  const settingsLabel = translate(locale, "nav.settings");
  const docsActive = activeNav === "docs" ? "dock-active" : "";
  const settingsActive = activeNav === "settings" ? "dock-active" : "";
  const dockShown = translate(locale, "dock.toggle.shown");
  const dockHidden = translate(locale, "dock.toggle.hidden");
  return `<nav id="gw-dock-nav" class="dock dock-md bao-glass fixed inset-x-0 bottom-0 z-40 mx-auto" aria-label="${escapeAttr(translate(locale, "dock.aria"))}" aria-keyshortcuts="Control+Shift+D">
      <a href="${docListPath}" class="bao-glass__content tooltip tooltip-top ${docsActive}" data-tip="${escapeAttr(docsLabel)}" aria-label="${escapeAttr(docsLabel)}"${activeNav === "docs" ? ' aria-current="page"' : ""}>
        ${renderIcon("docs", { size: "dock" })}
        <span class="dock-label sr-only">${escapeAttr(docsLabel)}</span>
      </a>
      <a href="${settingsPath}" class="bao-glass__content tooltip tooltip-top ${settingsActive}" data-tip="${escapeAttr(settingsLabel)}" aria-label="${escapeAttr(settingsLabel)}"${activeNav === "settings" ? ' aria-current="page"' : ""}>
        ${renderIcon("settings", { size: "dock" })}
        <span class="dock-label sr-only">${escapeAttr(settingsLabel)}</span>
      </a>
    </nav>
    <span id="gw-dock-labels" hidden aria-hidden="true" data-gw-dock-shown="${escapeAttr(dockShown)}" data-gw-dock-hidden="${escapeAttr(dockHidden)}" hx-swap-oob="true"></span>`;
};

export const renderPageShell = (options: PageShellOptions): string => {
  const title = translate(options.locale, options.titleKey);
  const appTitle = translate(options.locale, "app.title");
  const deviceLabel = translate(options.locale, "connectivity.local");
  const offlineLabel = translate(options.locale, "connectivity.offlineNetwork");
  const recoveredLabel = translate(options.locale, "connectivity.recovered");
  const inputStatusAria = translate(options.locale, "input.status.aria");
  const dockShown = translate(options.locale, "dock.toggle.shown");
  const dockHidden = translate(options.locale, "dock.toggle.hidden");
  const dockToggleLabel = translate(options.locale, "dock.toggle.action");
  const keyboardPending = translate(options.locale, "input.keyboard.pending");
  const pointerPending = translate(options.locale, "input.pointer.pending");
  const powerPending = translate(options.locale, "input.power.pending");
  const speechUnavailable = translate(options.locale, "speech.unavailable");
  const speechTranscribeUnavailable = translate(options.locale, "speech.transcribeUnavailable");
  const prefs = getUserPreferences();
  const editorFont = editorFontById(prefs.editorFont);
  const uiFont = editorFontById(prefs.uiFont);
  const mermaidError = translate(options.locale, "editor.mermaidError");
  const typographySaved = translate(options.locale, "typography.saved");
  const typographySaving = translate(options.locale, "typography.saving");
  const typographyError = translate(options.locale, "typography.error");
  const deviceShellChecking = translate(options.locale, "device.shell.status.checking");
  const deviceShellOnline = translate(options.locale, "device.shell.status.online");
  const deviceShellOffline = translate(options.locale, "device.shell.status.offline");
  const clientScript = (asset: string): string =>
    `${ROUTES.static.clientFile(asset)}?v=${packageJson.version}-${UI_ASSET_REVISION}`;

  const inputChipClass = resolveTemplateButtonClasses({
    variant: "ghost",
    size: "icon-compact",
    className: "gw-input-chip sr-only",
  });

  return `<!DOCTYPE html>
<html lang="${options.locale}" class="gw-shell" data-bao-glass-lens="" data-theme="${escapeAttr(prefs.theme)}" data-gw-active-nav="${escapeAttr(options.activeNav ?? "")}" data-gw-locale="${escapeAttr(options.locale)}" data-bao-ui-tokens="baohaus-aurora" data-bao-ui-density="baohaus-aurora" data-bao-ui-density-profile="compact"
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
  data-gw-typography-saving="${escapeAttr(typographySaving)}"
  data-gw-typography-error="${escapeAttr(typographyError)}"
  data-gw-loopback-port="${String(GOOSE_WORD_PORT)}"
  data-gw-device-shell-checking="${escapeAttr(deviceShellChecking)}"
  data-gw-device-shell-online="${escapeAttr(deviceShellOnline)}"
  data-gw-device-shell-offline="${escapeAttr(deviceShellOffline)}"
  data-gw-connectivity-ping-url="${healthApiPath}"
  data-gw-connectivity-local="${escapeAttr(deviceLabel)}"
  data-gw-connectivity-offline-network="${escapeAttr(offlineLabel)}"
  data-gw-connectivity-recovered="${escapeAttr(recoveredLabel)}"
  data-gw-speech-unavailable="${escapeAttr(speechUnavailable)}"
  data-gw-speech-transcribe-unavailable="${escapeAttr(speechTranscribeUnavailable)}"
  data-gw-dock="shown"
  data-gw-dock-shown="${escapeAttr(dockShown)}"
  data-gw-dock-hidden="${escapeAttr(dockHidden)}"
  data-gw-client-api-routes="${escapeAttr(JSON.stringify(CLIENT_API_ROUTES))}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="oklch(62% 0.18 200)" />
  <link rel="manifest" href="${ROUTES.static.manifest}" />
  <title id="gw-document-title">${escapeAttr(title)} · ${escapeAttr(appTitle)}</title>
  <link rel="stylesheet" href="${ROUTES.static.tokens}" />
  <link rel="stylesheet" href="${ROUTES.static.density}" />
  <link rel="stylesheet" href="${ROUTES.static.daisy}" />
  <link rel="stylesheet" href="${ROUTES.static.appStyles}" />
  <link rel="stylesheet" href="${ROUTES.static.fontFaces}" />
  ${renderGlassLensFilter(options.locale)}
  <script src="${ROUTES.static.htmx}" defer data-vendor="${HTMX_CORE_RELATIVE_PATH}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.offlineController)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.viewportDevice)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.inputCapabilities)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.touchToolbar)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.localSpeech)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.gooseChibi)}"></script>
  <script src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.typography)}"></script>
  <script src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.settingsShell)}"></script>
  <script src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.dockToggle)}"></script>
  <script src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.mermaidRender)}"></script>
  <script type="module" src="${clientScript(GOOSE_WORD_CLIENT_ASSETS.glassSpecular)}"></script>
</head>
<body class="min-h-dvh bg-base-200 text-base-content" data-gw-scrollport>
  <div class="gw-shell-frame mx-auto relative flex min-h-dvh w-full flex-col border-x border-base-300 bg-base-100">
    <span id="global-indicator" class="htmx-indicator loading loading-spinner loading-xs pointer-events-none absolute end-2 top-2 z-50" aria-hidden="true"></span>
    <header class="navbar gw-topbar sticky top-0 shrink-0 border-b border-base-300 bg-base-100/95 z-30">
      <div class="flex-1 gw-topbar__start gap-2 min-w-0 flex items-center">
        <span class="gw-goose-chibi tooltip tooltip-bottom" tabindex="0" data-goose-mood="idle" data-tip="${escapeAttr(appTitle)}" aria-label="${escapeAttr(translate(options.locale, "layout.mascot.aria"))}" role="img">
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
      <div class="flex-none gw-topbar__end flex items-center gap-1">
        <button type="button" class="${resolveTemplateButtonClasses({ variant: "ghost", size: "icon-compact", className: "tooltip tooltip-bottom" })}" data-gw-dock-toggle aria-label="${escapeAttr(dockToggleLabel)}" data-tip="${escapeAttr("Ctrl+Shift+D")}" aria-keyshortcuts="Control+Shift+D" aria-pressed="false">${renderIcon("sidebar-default", { size: "compact", ariaHidden: true })}</button>
        ${renderEnterpriseContextChip(options.locale)}
      </div>
    </header>
    <div class="sr-only" aria-label="${escapeAttr(inputStatusAria)}">
      <span class="${inputChipClass}" data-gw-input-chip="keyboard" data-tip="${escapeAttr(keyboardPending)}" aria-label="${escapeAttr(keyboardPending)}" aria-live="polite" role="status">${renderIcon("keyboard", { size: "device" })}<span class="indicator-item status status-xs status-neutral" aria-hidden="true"></span></span>
      <span class="${inputChipClass}" data-gw-input-chip="pointer" data-tip="${escapeAttr(pointerPending)}" aria-label="${escapeAttr(pointerPending)}" aria-live="polite" role="status">${renderIcon("pointer", { size: "device" })}<span class="indicator-item status status-xs status-neutral" aria-hidden="true"></span></span>
      <span class="${inputChipClass}" data-gw-input-chip="power" data-tip="${escapeAttr(powerPending)}" aria-label="${escapeAttr(powerPending)}" aria-live="polite" role="status">${renderIcon("power", { size: "device" })}<span class="indicator-item status status-xs status-neutral" aria-hidden="true"></span></span>
    </div>
    <main class="gw-main flex-1" id="gw-main">${options.bodyHtml}</main>
    ${renderDockNav(options.locale, options.activeNav)}
    <output id="gw-dock-toggle-status" class="sr-only" role="status" aria-live="polite">${escapeHtml(dockShown)}</output>
    <output id="gw-offline-toast" class="gw-offline-toast" role="status" aria-live="polite"></output>
  </div>
</body>
</html>`;
};

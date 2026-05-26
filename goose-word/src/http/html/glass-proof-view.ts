import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import { escapeHtml } from "./escape-html.ts";
import { renderPageShell } from "./layout.ts";

export const renderGlassProofPage = (locale: LocaleCode): string =>
  renderPageShell({
    locale,
    titleKey: "app.title",
    activeNav: "docs",
    bodyHtml: `
    <section class="gw-glass-proof" aria-label="${escapeHtml(translate(locale, "glass.proof.aria"))}">
      <div class="gw-glass-proof__strip gw-glass-proof__light">
        <div class="gw-glass-proof__copy">
          <h1 class="text-sm font-semibold">${escapeHtml(translate(locale, "glass.proof.light.title"))}</h1>
          <p class="text-xs text-base-content/70">${escapeHtml(translate(locale, "glass.proof.light.desc"))}</p>
        </div>
      </div>
      <div class="gw-glass-proof__strip gw-glass-proof__dark">
        <div class="gw-glass-proof__copy">
          <h2 class="text-sm font-semibold">${escapeHtml(translate(locale, "glass.proof.dark.title"))}</h2>
          <p class="text-xs text-base-content/70">${escapeHtml(translate(locale, "glass.proof.dark.desc"))}</p>
        </div>
	      </div>
	      <div class="gw-glass-proof__strip gw-glass-proof__busy">
	        <img class="gw-glass-proof__media" alt="" aria-hidden="true" data-gw-backdrop-media src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 360'%3E%3Crect width='720' height='360' fill='%230d1117'/%3E%3Ccircle cx='112' cy='98' r='88' fill='%23ffcf5a'/%3E%3Ccircle cx='278' cy='196' r='132' fill='%2300c2a8'/%3E%3Ccircle cx='520' cy='112' r='110' fill='%237c5cff'/%3E%3Cpath d='M0 270 C120 210 190 330 320 250 S550 280 720 190 V360 H0Z' fill='%23f05d5e'/%3E%3Cg opacity='.58' stroke='%23fff' stroke-width='8'%3E%3Cpath d='M30 36 690 332'/%3E%3Cpath d='M88 338 650 42'/%3E%3Cpath d='M0 180 H720'/%3E%3C/g%3E%3C/svg%3E" />
	        <div class="gw-glass-proof__copy">
          <h2 class="text-sm font-semibold">${escapeHtml(translate(locale, "glass.proof.busy.title"))}</h2>
          <p class="text-xs text-base-content/70">${escapeHtml(translate(locale, "glass.proof.busy.desc"))}</p>
        </div>
      </div>
    </section>`,
  });

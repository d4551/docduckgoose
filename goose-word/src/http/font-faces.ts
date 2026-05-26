import { EDITOR_FONT_CATALOG } from "../config/editor-fonts.ts";
import { ROUTES } from "../config/routes.ts";

/** Server-generated @font-face rules for the editor font catalog (SSOT). */
export const renderFontFaceCss = (): string =>
  EDITOR_FONT_CATALOG.map(
    (font) =>
      `@font-face{font-family:"${font.cssFamily}";src:url("${ROUTES.static.font(font.id, font.woff2File)}") format("woff2");font-display:swap;}`,
  ).join("");

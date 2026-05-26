export const EDITOR_FONT_IDS = [
  "goose-handwriting",
  "inter",
  "jetbrains-mono",
  "ibm-plex-mono",
  "dm-sans",
  "playfair-display",
  "instrument-serif",
  "syne",
] as const;

export type EditorFontId = (typeof EDITOR_FONT_IDS)[number];

export interface EditorFontDefinition {
  readonly id: EditorFontId;
  readonly cssFamily: string;
  readonly woff2File: string;
  readonly labelKey: `typography.font.${EditorFontId}`;
}

export const EDITOR_FONT_CATALOG: readonly EditorFontDefinition[] = [
  {
    id: "goose-handwriting",
    cssFamily: "Goose Hand",
    woff2File: "goose-hand-latin-400-normal.woff2",
    labelKey: "typography.font.goose-handwriting",
  },
  {
    id: "inter",
    cssFamily: "Inter",
    woff2File: "inter-latin-ext-opsz-normal.woff2",
    labelKey: "typography.font.inter",
  },
  {
    id: "jetbrains-mono",
    cssFamily: "JetBrains Mono",
    woff2File: "jetbrains-mono-latin-ext-wght-normal.woff2",
    labelKey: "typography.font.jetbrains-mono",
  },
  {
    id: "ibm-plex-mono",
    cssFamily: "IBM Plex Mono",
    woff2File: "ibm-plex-mono-latin-100-normal.woff2",
    labelKey: "typography.font.ibm-plex-mono",
  },
  {
    id: "dm-sans",
    cssFamily: "DM Sans",
    woff2File: "dm-sans-latin-100-normal.woff2",
    labelKey: "typography.font.dm-sans",
  },
  {
    id: "playfair-display",
    cssFamily: "Playfair Display",
    woff2File: "playfair-display-latin-400-normal.woff2",
    labelKey: "typography.font.playfair-display",
  },
  {
    id: "instrument-serif",
    cssFamily: "Instrument Serif",
    woff2File: "instrument-serif-latin-400-normal.woff2",
    labelKey: "typography.font.instrument-serif",
  },
  {
    id: "syne",
    cssFamily: "Syne",
    woff2File: "syne-latin-400-normal.woff2",
    labelKey: "typography.font.syne",
  },
];

export const editorFontById = (id: EditorFontId): EditorFontDefinition => {
  for (const entry of EDITOR_FONT_CATALOG) {
    if (entry.id === id) {
      return entry;
    }
  }
  const fallback = EDITOR_FONT_CATALOG[0];
  if (fallback === undefined) {
    throw new Error("EDITOR_FONT_CATALOG is empty");
  }
  return fallback;
};

export const isEditorFontId = (value: string): value is EditorFontId =>
  (EDITOR_FONT_IDS as readonly string[]).includes(value);

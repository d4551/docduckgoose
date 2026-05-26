/**
 * Centralized regex patterns for all validators.
 * Single source of truth — no pattern duplication across repos.
 */

export const DESIGN_TOKEN_FILE_PATTERN = /\.(?<ext>ts|html)$/;
export const LOCAL_STYLE_PATTERN = /<style[\s>]/;
export const INLINE_STYLE_PATTERN = /\sstyle=(?:"[^"]*"|'[^']*')/;
export const HARDCODED_USER_STRING_PATTERN = />[A-Za-z][^<>{$]{2,}/;
export const HARDCODED_ATTRIBUTE_STRING_PATTERN =
  /\b(?:placeholder|aria-label|title|alt)=(["'])[A-Za-z][^"'`{}$]{2,}\1/;
export const DIRECT_ROUTE_PATTERN =
  /hx-get="\/(?![$`{])|hx-post="\/(?![$`{])|hx-put="\/(?![$`{])|hx-delete="\/(?![$`{])|["'`]\/packages\/|["'`]\/publish\/|["'`]\/admin\/|["'`]\/account[/"']|["'`]\/sign-in|["'`]\/register|["'`]\/forgot-password|["'`]\/namespaces\/|["'`]\/fragments\/|["'`]\/api\/v1\/|["'`]\/v2\/|["'`]\/jobs(?:\/|["'`])|["'`]\/devices(?:\/|["'`])|["'`]\/hardware(?:\/|["'`])|["'`]\/robotics(?:\/|["'`])|["'`]\/uav(?:\/|["'`])|["'`]\/vehicles(?:\/|["'`])|["'`]\/apps\/|["'`]\/operations\//;
export const DIRECT_ENV_ACCESS_PATTERN =
  /\b(?<envAccess>Bun\.env|process\.env|import\.meta\.env)\b/;
export const RAW_FETCH_PATTERN = /\bfetch\s*\(/;
export const UNSAFE_STORAGE_PATTERN = /\b(?<storage>localStorage|sessionStorage)\b/;
export const SOURCE_FILE_PATTERN = /\.(?<ext>ts|js)$/;
export const RETIRED_PATTERN =
  /\bbottom-nav\b|modal-toggle|checkbox.*modal|anchor.*modal|tailwind\.config\.(?<ext>js|ts)|\.modal-open|input\[type="checkbox"\].*modal/;
export const ARBITRARY_SPACING_PATTERN =
  /\b(?<prop>p|m|gap|pt|pb|pl|pr|px|py|mt|mb|ml|mr|mx|my|w|h|top|left|right|bottom|inset)-\[\d/;
export const CONSOLE_PATTERN = /\bconsole\.(?<method>log|warn|error|debug|info|trace|dir)\b/;
export const DEBUG_MARKER_PATTERN = /\b(?<marker>TODO|FIXME|HACK|TEMP|XXX)\b/;
export const TRY_BLOCK_PATTERN = /\btry\s*\{/;
export const SUPPRESSION_DIRECTIVE_PATTERN = new RegExp(
  `@ts-(?:ignore|expect-error|nocheck)|${"biome"}-${"ignore"}(?:-all)?|${"biome"}-${"disable"}|${"eslint"}-${"disable"}`,
);
export const UNKNOWN_CAST_PATTERN = /\bas\s+(?:any|unknown)\b/;
export const UNKNOWN_INGRESS_PATTERN =
  /(?:catch\s*\([^)]*:\s*unknown|:\s*unknown\b|Record\s*<\s*string\s*,\s*unknown\s*>)/;
export const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}(?=[;"'\s,)])/;
export const NODE_IMPORT_PATTERN = /from\s+["']node:/;
export const RAW_PALETTE_PATTERN =
  /\b(?<token>text-gray|bg-gray|text-slate|bg-slate|text-zinc|bg-zinc|text-neutral|bg-neutral|text-stone|bg-stone|text-red|bg-red|text-orange|bg-orange|text-amber|bg-amber|text-yellow|bg-yellow|text-lime|bg-lime|text-green|bg-green|text-emerald|bg-emerald|text-teal|bg-teal|text-cyan|bg-cyan|text-sky|bg-sky|text-blue|bg-blue|text-indigo|bg-indigo|text-violet|bg-violet|text-purple|bg-purple|text-fuchsia|bg-fuchsia|text-pink|bg-pink|text-rose|bg-rose|border-red|border-green|border-blue|border-yellow|border-orange|border-gray|ring-red|ring-green|ring-blue)-\d/;

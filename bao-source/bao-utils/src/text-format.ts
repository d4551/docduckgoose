/**
 * Whitespace and character normalization helpers.
 *
 * Intended for user-facing labels and AI-provided strings where we want:
 * - predictable whitespace (NBSP/control chars/zero-width chars)
 * - optional Unicode normalization
 * - optional single-line collapse
 *
 * @baohaus/bao-utils/text-format
 */

/** Unicode C0/C1 control character boundary constants. */
const C0_START = 0x00;
const C0_END = 0x08;
const VT_CHAR = 0x0b;
const FF_CHAR = 0x0c;
const C0_TAIL_START = 0x0e;
const C0_TAIL_END = 0x1f;
const C1_START = 0x7f;
const C1_END = 0x9f;

/**
 * Options for {@link formatWhitespaceAndCharacters}.
 */
export interface FormatWhitespaceAndCharactersOptions {
  /**
   * Apply Unicode normalization using String.prototype.normalize.
   * Use `'NFKC'` to reduce visually-confusable output from AI/user input.
   * Set to `null` to skip normalization.
   */
  unicodeNormalizeForm?: "NFC" | "NFD" | "NFKC" | "NFKD" | null;

  /**
   * When true, remove line breaks and treat them as spaces.
   */
  singleLine?: boolean;

  /**
   * When true, collapse all whitespace sequences into a single ASCII space.
   */
  collapseWhitespace?: boolean;

  /**
   * When true, trim leading/trailing whitespace.
   */
  trim?: boolean;
}

/**
 * Normalize whitespace and strip non-printing characters from a string.
 *
 * This is meant for display labels and persisted annotation labels to prevent:
 * - unexpected layout shifts from NBSP and zero-width characters
 * - invisible control characters from AI/model outputs
 * - multi-line labels in single-line UI affordances
 *
 * @param input - Raw string input.
 * @param options - Formatting behavior options.
 * @returns Normalized string.
 */
export function formatWhitespaceAndCharacters(
  input: string,
  options: FormatWhitespaceAndCharactersOptions = {},
): string {
  const {
    unicodeNormalizeForm = "NFKC",
    singleLine = true,
    collapseWhitespace = true,
    trim = true,
  } = options;

  let value = input;

  if (unicodeNormalizeForm) {
    value = value.normalize(unicodeNormalizeForm);
  }

  // Convert NBSP to space, and strip common zero-width characters.
  value = value
    .replaceAll("\u00A0", " ")
    .replaceAll("\u200B", "")
    .replaceAll("\u200C", "")
    .replaceAll("\u200D", "")
    .replaceAll("\uFEFF", "");

  // Remove control characters (C0 and C1 controls). Keep tab/newline handling below.
  // Character-by-character filter avoids both noControlCharactersInRegex and useRegexLiterals.
  value = stripC0C1Controls(value);

  if (singleLine) {
    // Normalize all line separators into spaces for single-line UI.
    value = value.replace(/[\r\n\u2028\u2029]/g, " ");
  }

  if (collapseWhitespace) {
    value = value.replace(/\s+/g, " ");
  }

  if (trim) {
    value = value.trim();
  }

  return value;
}

/**
 * Returns true for C0 (0x00-0x08, 0x0B, 0x0C, 0x0E-0x1F) and C1 (0x7F-0x9F)
 * control characters. Preserves tab (0x09), newline (0x0A), and carriage return (0x0D).
 */
function isC0C1Control(code: number): boolean {
  return (
    (code >= C0_START && code <= C0_END) ||
    code === VT_CHAR ||
    code === FF_CHAR ||
    (code >= C0_TAIL_START && code <= C0_TAIL_END) ||
    (code >= C1_START && code <= C1_END)
  );
}

/** Strip C0/C1 control characters from a string, preserving tab/newline/CR. */
function stripC0C1Controls(str: string): string {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (!isC0C1Control(code)) {
      result += str[i];
    }
  }
  return result;
}

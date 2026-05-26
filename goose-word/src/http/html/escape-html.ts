const HTML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export const escapeHtml = (value: string): string => {
  let result = "";
  for (const char of value) {
    result += HTML_ESCAPE[char] ?? char;
  }
  return result;
};

export const escapeAttr = (value: string): string => escapeHtml(value);

/** BMP code points use one UTF-16 code unit; supplementary planes use a surrogate pair (two units). */
export const SUPPLEMENTARY_PLANE_THRESHOLD = 65_536;

export const utf16Advance = (code: number): number =>
  code >= SUPPLEMENTARY_PLANE_THRESHOLD ? 2 : 1;

/**
 * Centralized network helper exports.
 *
 * Keeps all network utility imports consistent and discoverable.
 *
 * @packageDocumentation
 */

const DIGITS_ONLY_RE: RegExp = /^\d+$/;
const HEX_SEGMENT_RE: RegExp = /^[0-9A-Fa-f]{1,4}$/;
const MAX_BYTE_VALUE = 255;
const IPV4_OCTET_COUNT = 4;
const IPV4_TYPE = 4;
const IPV6_SEGMENT_COUNT = 8;
const IPV6_TYPE = 6;
const IPV6_MAX_HEX_LENGTH = 4;
const IPV6_MAPPED_MAX_SEGMENTS = 6;

function isSafeByte(segment: string): boolean {
  if (!DIGITS_ONLY_RE.test(segment)) {
    return false;
  }
  const value = Number.parseInt(segment, 10);
  return Number.isInteger(value) && value >= 0 && value <= MAX_BYTE_VALUE;
}

function isIPv4(value: string): boolean {
  const parts = value.split(".");
  if (parts.length !== IPV4_OCTET_COUNT) {
    return false;
  }
  return parts.every(isSafeByte);
}

function isValidIPv6Segment(segment: string): boolean {
  if (segment.length === 0 || segment.length > IPV6_MAX_HEX_LENGTH) {
    return false;
  }
  return HEX_SEGMENT_RE.test(segment);
}

function isIPv6(value: string): boolean {
  if (!value) {
    return false;
  }

  const normalized = value.toLowerCase();
  if (normalized === "::") {
    return true;
  }

  const compressionCount = normalized.split("::").length - 1;
  if (compressionCount > 1) {
    return false;
  }

  if (normalized.includes(".")) {
    return isEmbeddedIPv4InIPv6(normalized);
  }

  if (compressionCount === 0) {
    const segments = normalized.split(":");
    if (segments.length !== IPV6_SEGMENT_COUNT) {
      return false;
    }
    return segments.every((segment) => isValidIPv6Segment(segment));
  }

  const compressionIndex = normalized.indexOf("::");
  const leftSide = normalized.slice(0, compressionIndex);
  const rightSide = normalized.slice(compressionIndex + 2);
  const leftSegments = leftSide.length === 0 ? [] : leftSide.split(":");
  const rightSegments = rightSide.length === 0 ? [] : rightSide.split(":");
  if (leftSegments.length + rightSegments.length >= IPV6_SEGMENT_COUNT) {
    return false;
  }
  return leftSegments.every(isValidIPv6Segment) && rightSegments.every(isValidIPv6Segment);
}

function isEmbeddedIPv4InIPv6(value: string): boolean {
  const withoutCompression = value.includes("::")
    ? value.split("::").filter(Boolean).join(":")
    : value;
  const lastColon = withoutCompression.lastIndexOf(":");
  if (lastColon < 0) {
    return false;
  }

  const prefix = withoutCompression.slice(0, lastColon);
  const ipv4 = withoutCompression.slice(lastColon + 1);
  if (!isIPv4(ipv4)) {
    return false;
  }

  if (prefix.length === 0) {
    return false;
  }
  const segments = prefix.split(":");
  if (segments.length > IPV6_MAPPED_MAX_SEGMENTS) {
    return false;
  }
  return segments.every((segment) => isValidIPv6Segment(segment));
}

/**
 * Basic IP version parser used by Bun-native networking flows.
 *
 * @param value - Candidate IP address string.
 * @returns `4` for IPv4, `6` for IPv6, `0` when unsupported.
 */
export function isIP(value: string): 0 | 4 | 6 {
  if (!value) {
    return 0;
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    return isIPv6(value.slice(1, -1)) ? IPV6_TYPE : 0;
  }

  if (isIPv4(value)) {
    return IPV4_TYPE;
  }
  if (isIPv6(value)) {
    return IPV6_TYPE;
  }
  return 0;
}

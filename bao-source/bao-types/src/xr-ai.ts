/**
 * XR AI integration types — quota, placement, overlay, USD generation.
 * Extracted from xr.ts to keep module size under 400 lines.
 */

export type XrTransform = {
  position?: [number, number, number];
  rotation?: [number, number, number] | [number, number, number, number];
  scale?: number | [number, number, number];
};

export interface AiQuotaInfo {
  tokensUsed: number;
  requestsToday: number;
  tokensRemaining: number | null;
  requestsRemaining: number | null;
  resetsAt: string;
}

export interface AiQuotaExceededResult {
  ok: false;
  error: string;
  code: string;
  quota: AiQuotaInfo;
}

export interface XrAiPlacementSuggestion {
  transform: XrTransform;
  confidence: number;
  rationale: string;
}

export interface XrAiPlacementSuggestionsBody {
  deviceHint?: string;
  mode?: string;
  maxSuggestions?: number;
  cameraPose?: {
    position?: [number, number, number];
    rotation?: [number, number, number, number];
  };
  notes?: string;
}

export interface XrAiPlacementSuggestionsResponseData {
  provider: string;
  suggestions: XrAiPlacementSuggestion[];
}

export interface XrAiPlacementSuggestionsResponse {
  ok: true;
  data: XrAiPlacementSuggestionsResponseData;
  timestamp: string;
  correlationId?: string;
  requestId?: string;
}

export interface XrAiOverlayPrimitive {
  id: string;
  label: string;
  kind: "label" | "billboard" | "marker";
  confidence: number;
  transform?: XrTransform;
}

export interface XrAiOverlayBody {
  notes: string;
}

export interface XrAiOverlayResponseData {
  provider: string;
  primitives: XrAiOverlayPrimitive[];
}

export interface XrAiOverlayResponse {
  ok: true;
  data: XrAiOverlayResponseData;
  timestamp: string;
  correlationId?: string;
  requestId?: string;
}

export interface XrAiUsdGenerateBody {
  prompt: string;
  name?: string;
  role?: string;
  deviceId?: string;
  deviceHint?: string;
}

export interface XrAiUsdGenerateResponseData {
  provider: string;
  usdAssetId: string;
  linkId?: string;
  offline?: boolean;
}

export interface XrAiUsdGenerateResponse {
  ok: true;
  data: XrAiUsdGenerateResponseData;
  timestamp: string;
  correlationId?: string;
  requestId?: string;
}

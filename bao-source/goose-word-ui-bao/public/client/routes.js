// SSOT reader for client routes.
// Values are injected by the server shell (layout.ts) via data-gw-client-api-routes attribute.
// This is the single place client code obtains route knowledge.
// No raw literals for API paths should exist elsewhere in client assets.
const root = document.documentElement;
const raw = root.getAttribute("data-gw-client-api-routes") || "{}";
const parsed = JSON.parse(raw);

export const gooseWordRoutes = Object.freeze({
  health: parsed.health,
  speech: parsed.speech,
  transcribe: parsed.transcribe,
  speak: parsed.speak,
});

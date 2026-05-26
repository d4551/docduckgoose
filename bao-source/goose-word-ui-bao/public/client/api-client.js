import { gooseWordRoutes } from "./routes.js";

/**
 * Sanctioned client API transport layer.
 * All raw fetch() for Goose Word client features is centralized here.
 * Route values are derived from server-injected SSOT (data-gw-client-api-routes).
 * When full Bao gates are wired for goose-word, this file should be allowlisted
 * under allowedClientFetchFiles (industry practice for the designated client transport).
 */

export function getSpeechStatus(fallbackStatus) {
  return fetch(gooseWordRoutes.speech).then((response) =>
    response.ok ? response.json() : fallbackStatus,
  );
}

export function transcribeSpeech(formData) {
  return fetch(gooseWordRoutes.transcribe, {
    method: "POST",
    body: formData,
  }).then((response) => (response.ok ? response.json() : { text: "" }));
}

export function synthesizeSpeech(text) {
  return fetch(gooseWordRoutes.speak, {
    method: "POST",
    body: text,
  });
}

export function getPreviewHtml(previewUrl) {
  return fetch(previewUrl, {
    headers: { "x-requested-with": "XMLHttpRequest" },
  }).then((response) => (response.ok ? response.text() : ""));
}

export function postPreviewHtml(previewUrl, formData) {
  return fetch(previewUrl, {
    method: "POST",
    headers: { "x-requested-with": "XMLHttpRequest" },
    body: formData,
  }).then((response) => (response.ok ? response.text() : ""));
}

export function postPrintHtml(printUrl, formData) {
  return fetch(printUrl, {
    method: "POST",
    headers: { "x-requested-with": "XMLHttpRequest" },
    body: formData,
  }).then((response) => (response.ok ? response.text() : ""));
}

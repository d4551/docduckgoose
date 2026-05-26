import { gooseWordRoutes } from "./routes.js";

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

import type { Elysia } from "elysia";
import {
  speechStatusApiPath,
  speechToTextApiPath,
  textToSpeechApiPath,
} from "../../config/routes.ts";
import {
  getSpeechStatus,
  speechResultText,
  synthesizeSpeech,
  transcribeAudioFile,
} from "../../services/speech-service.ts";

type RouteHost = Elysia;

export const registerSpeechApiRoutes = (app: RouteHost): void => {
  app
    .get(speechStatusApiPath, () => getSpeechStatus())
    .post(speechToTextApiPath, async ({ request }) => {
      const form = await request.formData();
      const audio = form.get("audio") ?? form.get("file");
      if (!(audio instanceof File)) {
        return new Response("Missing audio file", { status: 400 });
      }
      const language = form.get("language");
      const lang = typeof language === "string" ? language : undefined;
      const result = await transcribeAudioFile(audio, lang);
      if (!result.ok) {
        return Response.json(
          { error: result.stderr, status: result.status },
          { status: result.status === null ? 503 : 502 },
        );
      }
      return { text: speechResultText(result) };
    })
    .post(textToSpeechApiPath, async ({ request }) => {
      const text = await request.text();
      if (text.trim().length === 0) {
        return new Response("Missing text", { status: 400 });
      }
      const result = await synthesizeSpeech(text);
      if (!result.ok) {
        return Response.json(
          { error: result.stderr, status: result.status },
          { status: result.status === null ? 503 : 502 },
        );
      }
      const audioBody = result.stdout.slice().buffer;
      return new Response(audioBody, {
        headers: { "content-type": "audio/wav" },
      });
    });
};

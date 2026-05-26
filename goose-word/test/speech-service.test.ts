import { expect, test } from "bun:test";
import {
  speechResultText,
  synthesizeSpeech,
  transcribeAudioBytes,
} from "../src/services/speech-service.ts";

test("speech service reports disabled when command is missing", async () => {
  const result = await synthesizeSpeech("hello", null);
  expect(result.ok).toBe(false);
  expect(result.status).toBeNull();
  expect(result.stderr).toContain("not configured");
});

test("speech service sends text to configured local tts command", async () => {
  const result = await synthesizeSpeech("hello pi", "/bin/cat");
  expect(result.ok).toBe(true);
  expect(speechResultText(result)).toBe("hello pi");
});

test("speech service shells out with an audio file path for stt", async () => {
  const result = await transcribeAudioBytes(
    new TextEncoder().encode("audio"),
    ".wav",
    undefined,
    "/bin/echo ok",
  );
  expect(result.ok).toBe(true);
  expect(speechResultText(result)).toContain("ok");
  expect(speechResultText(result)).toContain(".wav");
});

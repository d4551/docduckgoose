const readEnvValue = (key: string): string | null => {
  const value = Bun.env[key];
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const gooseWordSpeechConfig = Object.freeze({
  speechToTextCommand: readEnvValue("GOOSE_WORD_STT_COMMAND"),
  textToSpeechCommand: readEnvValue("GOOSE_WORD_TTS_COMMAND"),
});

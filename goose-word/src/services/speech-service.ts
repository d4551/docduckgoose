import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { gooseWordSpeechConfig } from "../config/speech.ts";

export type SpeechFeatureMode = "browser-api-first" | "browser-speech-synthesis-first" | "command";

export interface SpeechFeatureStatus {
  readonly enabled: boolean;
  readonly command: string | null;
  readonly mode: SpeechFeatureMode;
}

export interface SpeechStatus {
  readonly speechToText: SpeechFeatureStatus;
  readonly textToSpeech: SpeechFeatureStatus;
}

export interface SpeechCommandResult {
  readonly ok: boolean;
  readonly status: number | null;
  readonly stdout: Uint8Array;
  readonly stderr: string;
}

const splitCommand = (command: string): readonly string[] =>
  command.match(/"[^"]*"|'[^']*'|\S+/g)?.map((part) => {
    if (
      (part.startsWith('"') && part.endsWith('"')) ||
      (part.startsWith("'") && part.endsWith("'"))
    ) {
      return part.slice(1, -1);
    }
    return part;
  }) ?? [];

const runCommand = async (
  command: string,
  extraArgs: readonly string[],
  stdin?: string | Uint8Array,
): Promise<SpeechCommandResult> => {
  const cmd = [...splitCommand(command), ...extraArgs];
  if (cmd.length === 0) {
    return {
      ok: false,
      status: null,
      stdout: new Uint8Array(),
      stderr: "Speech command is empty",
    };
  }
  const process = Bun.spawn({
    cmd,
    stdin: stdin === undefined ? "ignore" : "pipe",
    stdout: "pipe",
    stderr: "pipe",
  });
  if (stdin !== undefined && process.stdin !== undefined) {
    process.stdin.write(stdin);
    process.stdin.end();
  }
  const [status, stdout, stderr] = await Promise.all([
    process.exited,
    new Response(process.stdout).bytes(),
    new Response(process.stderr).text(),
  ]);
  return {
    ok: status === 0,
    status,
    stdout,
    stderr: stderr.trim(),
  };
};

export const getSpeechStatus = (): SpeechStatus => ({
  speechToText: {
    enabled: true,
    command: gooseWordSpeechConfig.speechToTextCommand,
    mode: "browser-api-first",
  },
  textToSpeech: {
    enabled: true,
    command: gooseWordSpeechConfig.textToSpeechCommand,
    mode: "browser-speech-synthesis-first",
  },
});

export const transcribeAudioFile = async (
  audio: File,
  language?: string,
  command = gooseWordSpeechConfig.speechToTextCommand,
): Promise<SpeechCommandResult> => {
  if (command === null) {
    return {
      ok: false,
      status: null,
      stdout: new Uint8Array(),
      stderr: "Speech-to-text is not configured",
    };
  }
  const tempDir = mkdtempSync(join(tmpdir(), "goose-word-stt-"));
  const sourceName = audio.name.length > 0 ? audio.name : "audio.wav";
  const audioPath = join(tempDir, `input${extname(sourceName) || ".wav"}`);
  writeFileSync(audioPath, Buffer.from(await audio.arrayBuffer()));
  const extra: string[] = [audioPath];
  const normalizedLanguage = language?.trim();
  if (normalizedLanguage) {
    extra.push("--language", normalizedLanguage);
  }
  const result = await runCommand(command, extra);
  rmSync(tempDir, { recursive: true, force: true });
  return result;
};

export const transcribeAudioBytes = async (
  audio: Uint8Array,
  extension = ".wav",
  language?: string,
  command = gooseWordSpeechConfig.speechToTextCommand,
): Promise<SpeechCommandResult> => {
  if (command === null) {
    return {
      ok: false,
      status: null,
      stdout: new Uint8Array(),
      stderr: "Speech-to-text is not configured",
    };
  }
  const suffix = extension.startsWith(".") ? extension : `.${extension}`;
  const tempDir = mkdtempSync(join(tmpdir(), "goose-word-stt-"));
  const audioPath = join(tempDir, `input${suffix}`);
  writeFileSync(audioPath, audio);
  const extra: string[] = [audioPath];
  const normalizedLanguage = language?.trim();
  if (normalizedLanguage) {
    extra.push("--language", normalizedLanguage);
  }
  const result = await runCommand(command, extra);
  rmSync(tempDir, { recursive: true, force: true });
  return result;
};

export const synthesizeSpeech = async (
  text: string,
  command = gooseWordSpeechConfig.textToSpeechCommand,
): Promise<SpeechCommandResult> => {
  if (command === null) {
    return {
      ok: false,
      status: null,
      stdout: new Uint8Array(),
      stderr: "Text-to-speech is not configured",
    };
  }
  return runCommand(command, [], text);
};

export const speechResultText = (result: SpeechCommandResult): string =>
  new TextDecoder().decode(result.stdout).trim();

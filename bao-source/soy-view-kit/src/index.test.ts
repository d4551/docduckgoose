import { describe, expect, it } from "bun:test";
import {
  AUDIO_UI_ROUTE,
  renderAudioHealthCard,
  renderTranscribePage,
  renderTranscriptResult,
} from "./audio.js";
import { resolveLocale, translate } from "./html.js";

describe("@baohaus/soy-wrapper-views", () => {
  it("resolves korean locale from request headers", () => {
    const headers = new Headers({
      "accept-language": "ko-KR,ko;q=0.9,en;q=0.8",
    });

    expect(resolveLocale(headers)).toBe("ko");
  });

  it("renders translated transcribe page labels", () => {
    const html = renderTranscribePage({
      audioHealthMarkup: "<section>ready</section>",
      locale: "ko",
      stylesheetHref: "/static/app.css",
    });

    expect(html).toContain(translate("ko", "ui.transcribeAction"));
    expect(html).toContain(translate("ko", "ui.languageLabel"));
    expect(html).toContain("/static/app.css");
    expect(html).toContain(AUDIO_UI_ROUTE.audioHealthPartial);
    expect(html).toContain(AUDIO_UI_ROUTE.audioTranscribeFile);
    expect(html).toContain('hx-indicator="#transcribe-submit-indicator"');
    expect(html).toContain('aria-describedby="transcribe-upload-hint"');
  });

  it("renders transcript errors as alert markup", () => {
    const html = renderTranscriptResult({
      code: "ASR_FAILED",
      locale: "en",
      message: "decoder failed",
    });

    expect(html).toContain("alert-error");
    expect(html).toContain("decoder failed");
  });

  it("renders localized audio health details", () => {
    const html = renderAudioHealthCard({
      cacheDir: "/tmp/models",
      locale: "en",
      model: "Xenova/whisper-tiny.en",
      runtime: "bun-typescript",
      status: "ok",
    });

    expect(html).toContain(translate("en", "ui.audioHealthTitle"));
    expect(html).toContain(translate("en", "ui.cacheLabel"));
    expect(html).toContain("/tmp/models");
  });
});

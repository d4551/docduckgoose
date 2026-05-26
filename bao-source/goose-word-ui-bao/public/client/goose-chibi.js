const goose = document.querySelector("[data-goose-mood], .gw-goose-chibi");

if (goose) {
  goose.dataset.gooseMood ||= "idle";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const root = document.documentElement;
  const state = {
    lastActivityAt: Date.now(),
    lastInputAt: 0,
    lastPointerAt: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    temporaryMoodUntil: 0,
    idleLook: false,
    resetTimer: 0,
    typingBursts: [],
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const setMood = (mood, duration = 0) => {
    if (goose.dataset.gooseMood !== mood) {
      goose.dataset.gooseMood = mood;
      if (typeof CustomEvent === "function") {
        document.dispatchEvent(new CustomEvent("gw:goose", { detail: { mood, at: Date.now() } }));
      }
    }
    state.temporaryMoodUntil = duration > 0 ? Date.now() + duration : 0;
    window.clearTimeout(state.resetTimer);
    if (duration > 0) {
      state.resetTimer = window.setTimeout(() => {
        state.temporaryMoodUntil = 0;
        setMood("idle");
      }, duration);
    }
  };

  const noteActivity = (mood, duration) => {
    state.lastActivityAt = Date.now();
    setMood(mood, duration);
  };

  const setEyeTarget = (event) => {
    const centerX = 44;
    const centerY = 28;
    const x = clamp((event.clientX - centerX) / 180, -1, 1);
    const y = clamp((event.clientY - centerY) / 140, -1, 1);
    const now = Date.now();
    const dx = event.clientX - state.lastPointerX;
    const dy = event.clientY - state.lastPointerY;
    const speed =
      state.lastPointerAt === 0 ? 0 : Math.hypot(dx, dy) / Math.max(1, now - state.lastPointerAt);

    state.lastPointerAt = now;
    state.lastPointerX = event.clientX;
    state.lastPointerY = event.clientY;

    goose.style.setProperty("--gw-goose-eye-x", `${(x * 0.13).toFixed(3)}rem`);
    goose.style.setProperty("--gw-goose-eye-y", `${(y * 0.09).toFixed(3)}rem`);
    goose.style.setProperty("--gw-goose-neck-turn", `${(x * 6).toFixed(1)}deg`);
    goose.style.setProperty("--gw-goose-head-lift", `${(-y * 0.08).toFixed(3)}rem`);
    goose.style.setProperty("--gw-goose-pointer-speed", speed.toFixed(2));

    return speed;
  };

  const recordTyping = (event) => {
    const now = Date.now();
    state.lastInputAt = now;
    state.typingBursts = state.typingBursts.filter((time) => now - time < 2200);
    state.typingBursts.push(now);

    const cadence = state.typingBursts.length;
    const inputType = event && event.inputType ? event.inputType : "";
    const isDelete = inputType.includes("delete");
    const isLongText = event && typeof event.data === "string" && event.data.length > 1;
    const mood = isDelete ? "erase" : isLongText || cadence > 12 ? "typing-fast" : "typing";
    const intensity = clamp(cadence / 16, 0, 1);

    goose.style.setProperty("--gw-goose-type-intensity", intensity.toFixed(2));
    noteActivity(mood, cadence > 12 ? 1250 : 1050);
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      const speed = setEyeTarget(event);
      if (Date.now() > state.temporaryMoodUntil) {
        noteActivity(speed > 1.1 ? "chase" : "watch", speed > 1.1 ? 700 : 900);
      } else {
        state.lastActivityAt = Date.now();
      }
    },
    { passive: true },
  );
  document.addEventListener(
    "pointerleave",
    () => {
      goose.style.setProperty("--gw-goose-eye-x", "0rem");
      goose.style.setProperty("--gw-goose-eye-y", "0rem");
      goose.style.setProperty("--gw-goose-neck-turn", "0deg");
      goose.style.setProperty("--gw-goose-head-lift", "0rem");
    },
    { passive: true },
  );

  document.addEventListener("pointerover", (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest("a, button, select, input, textarea")
    ) {
      noteActivity("perch", 1100);
    }
  });

  document.addEventListener("focusin", (event) => {
    if (event.target instanceof Element && event.target.matches("input, textarea")) {
      noteActivity("ready", 1200);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      noteActivity("keyboard", 950);
      return;
    }
    if (event.key === "Backspace" || event.key === "Delete") {
      recordTyping({ inputType: "deleteContentBackward" });
      return;
    }
    if (event.key.length === 1 || event.key === "Enter") {
      recordTyping({ inputType: "insertText", data: event.key });
    }
  });

  document.addEventListener("input", recordTyping);
  document.addEventListener("pointerdown", () => noteActivity("happy", 900));
  document.body.addEventListener("htmx:beforeRequest", () => noteActivity("working", 1800));
  document.body.addEventListener("htmx:afterRequest", () => noteActivity("happy", 1600));

  document.addEventListener("gw:activity", (event) => {
    const detail = event.detail || {};
    if (detail.kind === "shortcut" || detail.kind === "keyboard") {
      noteActivity(detail.action === "save" ? "working" : "keyboard", 1100);
      return;
    }
    if (detail.kind === "speech") {
      noteActivity("talk", 1400);
    }
  });

  window.setInterval(() => {
    if (reducedMotion.matches || Date.now() < state.temporaryMoodUntil) {
      return;
    }

    const quietFor = Date.now() - state.lastActivityAt;
    if (root.dataset.power === "low" && quietFor > 7000) {
      setMood("idle");
      return;
    }
    if (quietFor > 26000) {
      setMood("sleep");
      return;
    }
    if (quietFor > 12000) {
      setMood("thinking");
      return;
    }

    state.idleLook = !state.idleLook;
    setMood(state.idleLook ? "look" : "idle");
  }, 3200);
}

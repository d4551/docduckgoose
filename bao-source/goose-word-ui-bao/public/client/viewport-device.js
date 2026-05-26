(function initViewportDevice() {
  const root = document.documentElement;
  const body = document.body;
  const landscapeMq = window.matchMedia("(orientation: landscape)");
  const portraitMq = window.matchMedia("(orientation: portrait)");
  const coarsePointer = window.matchMedia("(pointer: coarse)");
  const hoverNone = window.matchMedia("(hover: none)");

  const readTokenPx = (varName, fallback) => {
    const raw = getComputedStyle(root).getPropertyValue(varName).trim();
    if (raw.length === 0) {
      return fallback;
    }
    if (raw.endsWith("rem")) {
      return Math.round(parseFloat(raw) * 16);
    }
    if (raw.endsWith("px")) {
      return Math.round(parseFloat(raw));
    }
    return fallback;
  };

  const compactMaxPx = readTokenPx("--gw-viewport-compact-max-width", 420);
  const compactHeightPx = readTokenPx("--gw-viewport-compact-max-height", 420);
  const tabletMinPx = readTokenPx("--gw-viewport-tablet-min-dim", 600);
  const tabletMaxPx = readTokenPx("--gw-viewport-tablet-max-dim", 900);
  const desktopMinPx = readTokenPx("--gw-viewport-desktop-min-width", 1024);
  const embeddedMaxPx = readTokenPx("--gw-viewport-embedded-max-screen", 720);

  const narrowMq = window.matchMedia(`(max-width: ${String(compactMaxPx)}px)`);
  const shortMq = window.matchMedia(`(max-height: ${String(compactHeightPx)}px)`);

  const orientationFromAngle = (angle) => {
    if (angle === 90 || angle === -270) {
      return "landscape-primary";
    }
    if (angle === 270 || angle === -90) {
      return "landscape-secondary";
    }
    if (angle === 180 || angle === -180) {
      return "portrait-secondary";
    }
    return "portrait-primary";
  };

  const readOrientation = () => {
    const screenOrientation = screen.orientation;
    if (landscapeMq.matches && !portraitMq.matches) {
      return "landscape-primary";
    }
    if (portraitMq.matches && !landscapeMq.matches) {
      return "portrait-primary";
    }
    if (landscapeMq.matches) {
      const angle =
        screenOrientation && typeof screenOrientation.angle === "number"
          ? screenOrientation.angle
          : typeof window.orientation === "number"
            ? window.orientation
            : 90;
      return orientationFromAngle(angle);
    }
    if (portraitMq.matches) {
      const angle =
        screenOrientation && typeof screenOrientation.angle === "number"
          ? screenOrientation.angle
          : typeof window.orientation === "number"
            ? window.orientation
            : 0;
      return orientationFromAngle(angle);
    }
    if (screenOrientation && typeof screenOrientation.type === "string") {
      const type = screenOrientation.type;
      if (
        type === "portrait-primary" ||
        type === "portrait-secondary" ||
        type === "landscape-primary" ||
        type === "landscape-secondary"
      ) {
        return type;
      }
    }
    return "portrait-primary";
  };

  const readLayoutDims = () => {
    const visualViewport = window.visualViewport;
    const width =
      visualViewport && typeof visualViewport.width === "number"
        ? Math.round(visualViewport.width)
        : window.innerWidth;
    const height =
      visualViewport && typeof visualViewport.height === "number"
        ? Math.round(visualViewport.height)
        : window.innerHeight;
    return {
      minDim: Math.min(width, height),
      maxDim: Math.max(width, height),
    };
  };

  const readUa = () => navigator.userAgent || "";
  const readPlatform = () => navigator.platform || "";

  const detectDevice = () => {
    const ua = readUa();
    const platform = readPlatform();
    const uaData = navigator.userAgentData;
    const maxTouch = navigator.maxTouchPoints || 0;

    if (uaData && typeof uaData.platform === "string") {
      if (uaData.platform === "iOS") {
        return "ios";
      }
      if (uaData.platform === "Android") {
        return "android";
      }
      if (uaData.platform === "Chrome OS") {
        return "chromeos";
      }
      if (
        uaData.platform === "Windows" ||
        uaData.platform === "macOS" ||
        uaData.platform === "Linux"
      ) {
        return "desktop";
      }
    }

    if (/iPhone|iPad|iPod/i.test(ua)) {
      return "ios";
    }
    if (platform === "MacIntel" && maxTouch > 1) {
      return "ios";
    }
    if (/Android/i.test(ua)) {
      return "android";
    }
    if (/CrOS/i.test(ua)) {
      return "chromeos";
    }
    if (/Raspberry Pi/i.test(ua)) {
      return "embedded";
    }

    const linuxArm =
      (/Linux/i.test(platform) || /Linux/i.test(ua)) &&
      (/armv|aarch64|arm64/i.test(ua) || /arm/i.test(platform));
    const minScreen = Math.min(screen.width, screen.height);
    const embeddedSurface =
      linuxArm &&
      !/Android/i.test(ua) &&
      (minScreen <= embeddedMaxPx || (coarsePointer.matches && hoverNone.matches));

    if (embeddedSurface) {
      return "embedded";
    }

    if (/Mobile|Phone/i.test(ua)) {
      return "unknown-mobile";
    }

    return "desktop";
  };

  const detectFormFactor = (device) => {
    const resolved = device || detectDevice();
    const { minDim, maxDim } = readLayoutDims();

    if (resolved === "embedded") {
      return "embedded";
    }
    if (resolved === "desktop" || resolved === "chromeos") {
      if (maxDim >= desktopMinPx) {
        return "desktop";
      }
      if (minDim >= tabletMinPx) {
        return "tablet";
      }
      return "phone";
    }
    if (resolved === "ios" || resolved === "android" || resolved === "unknown-mobile") {
      if (minDim >= tabletMinPx || maxDim >= tabletMaxPx) {
        return "tablet";
      }
      return "phone";
    }
    return minDim < tabletMinPx ? "phone" : "tablet";
  };

  const readViewportLayout = () => {
    if (narrowMq.matches || (landscapeMq.matches && shortMq.matches)) {
      return "compact";
    }
    if (landscapeMq.matches) {
      return "landscape";
    }
    return "roomy";
  };

  const setFlag = (name, value) => {
    root.dataset[name] = value;
    Array.from(body.classList)
      .filter((className) => className.startsWith(`gw-${name}-`))
      .forEach((className) => body.classList.remove(className));
    body.classList.add(`gw-${name}-${value}`);
  };

  const apply = () => {
    const device = detectDevice();
    const orientation = readOrientation();
    const formFactor = detectFormFactor(device);
    const viewportLayout = readViewportLayout();

    setFlag("device", device);
    setFlag("orientation", orientation);
    setFlag("formFactor", formFactor);
    setFlag("viewportLayout", viewportLayout);

    root.dataset.viewport = viewportLayout === "compact" ? "compact" : "roomy";
    body.classList.toggle("gw-viewport-compact", viewportLayout === "compact");
    body.classList.toggle("gw-viewport-landscape", viewportLayout === "landscape");
    body.classList.toggle("gw-viewport-roomy", viewportLayout === "roomy");
    body.classList.toggle("gw-orientation-landscape", orientation.startsWith("landscape"));
    body.classList.toggle("gw-orientation-portrait", orientation.startsWith("portrait"));

    if (typeof CustomEvent === "function") {
      document.dispatchEvent(
        new CustomEvent("gw:viewport", {
          detail: { device, orientation, formFactor, viewportLayout },
        }),
      );
    }
  };

  apply();

  const onChange = () => {
    apply();
  };

  landscapeMq.addEventListener?.("change", onChange);
  portraitMq.addEventListener?.("change", onChange);
  narrowMq.addEventListener?.("change", onChange);
  shortMq.addEventListener?.("change", onChange);

  if (screen.orientation && typeof screen.orientation.addEventListener === "function") {
    screen.orientation.addEventListener("change", onChange);
  } else {
    window.addEventListener("orientationchange", onChange, { passive: true });
  }

  window.addEventListener("resize", onChange, { passive: true });
  const visualViewport = window.visualViewport;
  if (visualViewport && typeof visualViewport.addEventListener === "function") {
    visualViewport.addEventListener("resize", onChange);
  }
  document.body.addEventListener("htmx:afterSwap", onChange);
})();

const TILT_CLAMP = 3;
const POINTER_CLAMP = 6;
const POINTER_SCALE = 0.012;
const SCROLL_SCALE = 0.008;
const TILT_BLEND = 0.5;
const POINTER_MOVE_THRESHOLD = 4;
const BACKDROP_CANDIDATE_SELECTOR = "[style*='--gw-backdrop-dominant'], .gw-glass-proof__strip";
const BACKDROP_THRESHOLDS = [0, 0.25, 0.5, 0.75, 1];

const root = document.documentElement;
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const transparencyQuery = window.matchMedia("(prefers-reduced-transparency: reduce)");
const contrastQuery = window.matchMedia("(prefers-contrast: more)");
const controller = new AbortController();
const listenerOptions = { signal: controller.signal };
const tintCanvas = document.createElement("canvas");
const tintContext = tintCanvas.getContext("2d", { willReadFrequently: true });

let rafId = 0;
let px = 0;
let py = 0;
let lastMoveX = null;
let lastMoveY = null;
let sy = 0;
let tx = 0;
let ty = 0;
let lensMapEl = null;
let tiltHandler = null;
let currentTint = "";
let cachedDisplacementScale = null;
let backdropObserver = null;
const backdropVisibility = new Map();

tintCanvas.width = 12;
tintCanvas.height = 12;

function readDisplacementScale() {
  if (cachedDisplacementScale === null) {
    const dispStr = getComputedStyle(root)
      .getPropertyValue("--bao-glass-displacement-scale")
      .trim();
    const parsed = Number.parseFloat(dispStr);
    cachedDisplacementScale = Number.isFinite(parsed) ? parsed : 12;
  }
  return cachedDisplacementScale;
}

function invalidateDisplacementScale() {
  cachedDisplacementScale = null;
  syncLensScale();
}

function readDefaultTint() {
  const tintDefault = getComputedStyle(root).getPropertyValue("--bao-glass-tint-default").trim();
  if (tintDefault) {
    return tintDefault;
  }
  const tintFallback = getComputedStyle(root)
    .getPropertyValue("--bao-glass-tint-default-fallback")
    .trim();
  if (tintFallback) {
    return tintFallback;
  }
  return "#fafafa";
}

function syncLensScale() {
  if (!lensMapEl) {
    return;
  }
  lensMapEl.setAttribute("scale", readDisplacementScale().toFixed(1));
}

function applyBackdropTint(nextTint) {
  if (nextTint !== currentTint) {
    currentTint = nextTint;
    root.style.setProperty("--bao-glass-tint", nextTint);
  }
}

function readCandidateTint(element) {
  const media = element.querySelector("[data-gw-backdrop-media]");
  if (
    tintContext &&
    media instanceof HTMLImageElement &&
    media.complete &&
    media.naturalWidth > 0 &&
    media.naturalHeight > 0
  ) {
    tintContext.drawImage(media, 0, 0, tintCanvas.width, tintCanvas.height);
    const pixels = tintContext.getImageData(0, 0, tintCanvas.width, tintCanvas.height).data;
    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;
    for (let index = 0; index < pixels.length; index += 4) {
      const alpha = pixels[index + 3] ?? 0;
      if (alpha > 0) {
        r += pixels[index] ?? 0;
        g += pixels[index + 1] ?? 0;
        b += pixels[index + 2] ?? 0;
        count += 1;
      }
    }
    if (count > 0) {
      return `rgb(${Math.round(r / count)} ${Math.round(g / count)} ${Math.round(b / count)})`;
    }
  }
  const tint = getComputedStyle(element).getPropertyValue("--gw-backdrop-dominant").trim();
  return tint || readDefaultTint();
}

function syncBackdropTint() {
  let bestTint = readDefaultTint();
  let bestRatio = 0;
  for (const item of backdropVisibility.values()) {
    if (item.ratio >= bestRatio) {
      bestRatio = item.ratio;
      bestTint = item.tint;
    }
  }
  applyBackdropTint(bestTint);
}

function installBackdropObserver() {
  const scrollport = document.querySelector("[data-gw-scrollport]");
  const rootScrolls =
    scrollport === document.body ||
    scrollport === document.documentElement ||
    (scrollport && scrollport.scrollHeight <= scrollport.clientHeight);
  if (backdropObserver) {
    backdropObserver.disconnect();
    backdropVisibility.clear();
  }
  if (!scrollport || typeof IntersectionObserver !== "function") {
    applyBackdropTint(readDefaultTint());
    return;
  }
  backdropObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          backdropVisibility.set(entry.target, {
            ratio: entry.intersectionRatio,
            tint: readCandidateTint(entry.target),
          });
        } else {
          backdropVisibility.delete(entry.target);
        }
      }
      syncBackdropTint();
    },
    {
      root: rootScrolls ? null : scrollport,
      threshold: BACKDROP_THRESHOLDS,
    },
  );
  for (const element of scrollport.querySelectorAll(BACKDROP_CANDIDATE_SELECTOR)) {
    backdropObserver.observe(element);
    const media = element.querySelector("[data-gw-backdrop-media]");
    if (media instanceof HTMLImageElement && !media.complete) {
      media.addEventListener("load", installBackdropObserver, {
        once: true,
        ...listenerOptions,
      });
    }
  }
  syncBackdropTint();
}

function update() {
  rafId = 0;
  if (motionQuery.matches) {
    root.style.removeProperty("--bao-glass-spec-x");
    root.style.removeProperty("--bao-glass-spec-y");
    return;
  }
  const pointerX = (px - window.innerWidth * 0.5) * POINTER_SCALE;
  const pointerY = (py - window.innerHeight * 0.5) * POINTER_SCALE + sy * SCROLL_SCALE;
  const nx = Math.max(-POINTER_CLAMP, Math.min(POINTER_CLAMP, pointerX + tx * TILT_BLEND));
  const ny = Math.max(-POINTER_CLAMP, Math.min(POINTER_CLAMP, pointerY + ty * TILT_BLEND));
  root.style.setProperty("--bao-glass-spec-x", `${nx.toFixed(2)}px`);
  root.style.setProperty("--bao-glass-spec-y", `${ny.toFixed(2)}px`);
}

function schedule() {
  if (!rafId) {
    rafId = requestAnimationFrame(update);
  }
}

function readScrollTop(target) {
  if (target === document.body || target === document.documentElement) {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  if (target && typeof target.scrollTop === "number") {
    return target.scrollTop;
  }
  return window.scrollY;
}

lensMapEl = document.querySelector("#bao-glass-lens feDisplacementMap");
syncLensScale();

if ("DeviceOrientationEvent" in window) {
  tiltHandler = (event) => {
    if (motionQuery.matches) {
      return;
    }
    if (typeof event.gamma === "number") {
      tx = Math.max(-TILT_CLAMP, Math.min(TILT_CLAMP, event.gamma / 30));
    }
    if (typeof event.beta === "number") {
      ty = Math.max(-TILT_CLAMP, Math.min(TILT_CLAMP, event.beta / 30));
    }
    schedule();
  };
  window.addEventListener("deviceorientation", tiltHandler, {
    passive: true,
    ...listenerOptions,
  });
}

document.addEventListener(
  "pointermove",
  (event) => {
    if (motionQuery.matches) {
      return;
    }
    if (lastMoveX !== null && lastMoveY !== null) {
      const dx = event.clientX - lastMoveX;
      const dy = event.clientY - lastMoveY;
      if (dx * dx + dy * dy < POINTER_MOVE_THRESHOLD * POINTER_MOVE_THRESHOLD) {
        return;
      }
    }
    lastMoveX = event.clientX;
    lastMoveY = event.clientY;
    px = event.clientX;
    py = event.clientY;
    schedule();
  },
  { passive: true, ...listenerOptions },
);

for (const scrollport of document.querySelectorAll("[data-gw-scrollport]")) {
  const scrollTarget =
    scrollport === document.body || scrollport === document.documentElement ? window : scrollport;
  scrollTarget.addEventListener(
    "scroll",
    (event) => {
      sy = readScrollTop(scrollport === document.body ? document.documentElement : event.target);
      schedule();
    },
    { passive: true, ...listenerOptions },
  );
}

motionQuery.addEventListener(
  "change",
  (event) => {
    if (event.matches) {
      root.style.removeProperty("--bao-glass-spec-x");
      root.style.removeProperty("--bao-glass-spec-y");
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (tiltHandler) {
        window.removeEventListener("deviceorientation", tiltHandler);
        tiltHandler = null;
      }
      tx = 0;
      ty = 0;
    }
    syncBackdropTint();
    schedule();
  },
  listenerOptions,
);

transparencyQuery.addEventListener("change", schedule, listenerOptions);
contrastQuery.addEventListener(
  "change",
  () => {
    invalidateDisplacementScale();
    schedule();
  },
  listenerOptions,
);
window.addEventListener(
  "resize",
  () => {
    invalidateDisplacementScale();
    syncBackdropTint();
    schedule();
  },
  { passive: true, ...listenerOptions },
);

document.body.addEventListener("htmx:afterSwap", installBackdropObserver, listenerOptions);

window.addEventListener(
  "pagehide",
  () => {
    controller.abort();
  },
  listenerOptions,
);

installBackdropObserver();
schedule();

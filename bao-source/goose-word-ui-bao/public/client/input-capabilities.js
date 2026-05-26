(function initInputCapabilities() {
  const root = document.documentElement;
  const body = document.body;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reducedTransparency = window.matchMedia("(prefers-reduced-transparency: reduce)");
  const coarsePointer = window.matchMedia("(pointer: coarse)");
  const hoverCapable = window.matchMedia("(hover: hover)");
  const compactWidth = window.matchMedia("(max-width: 420px)");
  const chipCopy = {
    keyboard: {
      hardware: { icon: "⌨", label: "Hardware keyboard active" },
      usb: { icon: "⌘", label: "USB keyboard active" },
      bluetooth: { icon: "⌘", label: "Bluetooth keyboard active" },
      shortcut: { icon: "⌘", label: "Keyboard shortcut active" },
      unknown: { icon: "⌨", label: "Keyboard pending" },
      virtual: { icon: "⌨", label: "Touch keyboard active" },
    },
    pointer: {
      coarse: { icon: "◎", label: "Touch pointer active" },
      fine: { icon: "◉", label: "Precision pointer active" },
    },
    power: {
      low: { icon: "◌", label: "Reduced transparency or lighter rendering" },
      normal: { icon: "⚡", label: "Full motion and rendering" },
    },
  };
  const lowPower =
    reducedTransparency.matches ||
    Boolean(connection && (connection.saveData || /2g/.test(connection.effectiveType || "")));

  const updateChip = (name, value) => {
    const chip = document.querySelector(`[data-gw-input-chip="${name}"]`);
    const copy = chipCopy[name] && chipCopy[name][value];
    if (!chip || !copy) {
      return;
    }
    const statusDot = chip.querySelector(".status");
    if (statusDot) {
      statusDot.classList.remove(
        "status-success",
        "status-warning",
        "status-neutral",
        "status-info",
      );
      if (value === "low" || value === "virtual" || value === "coarse") {
        statusDot.classList.add("status-warning");
      } else if (value === "unknown") {
        statusDot.classList.add("status-neutral");
      } else {
        statusDot.classList.add("status-success");
      }
    }
    chip.dataset.state = value;
    chip.dataset.label = copy.label;
    chip.setAttribute("data-tip", copy.label);
    chip.setAttribute("aria-label", copy.label);
    chip.setAttribute("title", copy.label);
  };

  const setFlag = (name, value) => {
    root.dataset[name] = value;
    Array.from(body.classList)
      .filter((className) => className.startsWith(`gw-${name}-`))
      .forEach((className) => body.classList.remove(className));
    body.classList.add(`gw-${name}-${value}`);
    updateChip(name, value);
  };

  setFlag("pointer", coarsePointer.matches ? "coarse" : "fine");
  setFlag("hover", hoverCapable.matches ? "available" : "none");
  setFlag("motion", reducedMotion.matches ? "reduced" : "full");
  setFlag("power", lowPower ? "low" : "normal");
  setFlag("viewport", compactWidth.matches ? "compact" : "roomy");
  setFlag("keyboard", "unknown");

  if (lowPower) {
    body.classList.add("gw-input-low-power");
  }
  if (coarsePointer.matches) {
    body.classList.add("gw-input-touch");
  }
  if (hoverCapable.matches) {
    body.classList.add("gw-input-hover");
  }

  const announceKeyboard = (kind) => {
    root.dataset.keyboard = kind;
    updateChip("keyboard", kind);
    if (typeof CustomEvent === "function") {
      document.dispatchEvent(
        new CustomEvent("gw:activity", {
          detail: { kind: "keyboard", input: kind },
        }),
      );
    }
  };

  document.addEventListener(
    "keydown",
    (event) => {
      if (!event.isComposing) {
        const current = root.dataset.keyboard;
        const isSpecificHardware =
          current === "usb" || current === "bluetooth" || current === "hardware";
        if (!isSpecificHardware) {
          announceKeyboard(
            event.metaKey || event.ctrlKey || event.altKey ? "shortcut" : "hardware",
          );
        } else if (event.metaKey || event.ctrlKey || event.altKey) {
          announceKeyboard("shortcut");
          setTimeout(() => {
            if (root.dataset.keyboard === "shortcut") {
              announceKeyboard(current);
            }
          }, 420);
        }
      }
    },
    { passive: true },
  );

  document.addEventListener(
    "pointerdown",
    (event) => {
      root.dataset.lastPointer = event.pointerType || "pointer";
      const current = root.dataset.keyboard;
      const isExternal = current === "usb" || current === "bluetooth";
      if (event.pointerType === "touch" && !isExternal) {
        announceKeyboard("virtual");
      }
    },
    { passive: true },
  );

  if (navigator.keyboard && typeof navigator.keyboard.getLayoutMap === "function") {
    root.dataset.keyboardApi = "present";
  }

  const supportsHID = typeof navigator !== "undefined" && "hid" in navigator;
  const supportsBluetooth = typeof navigator !== "undefined" && "bluetooth" in navigator;
  root.dataset.hidSupport = supportsHID ? "true" : "false";
  root.dataset.bluetoothSupport = supportsBluetooth ? "true" : "false";

  function attachHIDListeners() {
    if (supportsHID) {
      navigator.hid.addEventListener("connect", () => {
        announceKeyboard("usb");
      });
      navigator.hid.addEventListener("disconnect", () => {
        if (root.dataset.keyboard === "usb") {
          announceKeyboard("hardware");
        }
      });
    }
  }

  window.gwRequestUSBKeyboard = async function gwRequestUSBKeyboard() {
    if (!supportsHID) {
      return false;
    }
    const devices = await navigator.hid.requestDevice({
      filters: [{ usagePage: 0x01, usage: 0x06 }],
    });
    if (devices.length > 0) {
      announceKeyboard("usb");
      return true;
    }
    return false;
  };

  window.gwRequestBluetoothKeyboard = async function gwRequestBluetoothKeyboard() {
    if (!supportsBluetooth) {
      return false;
    }
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [0x1812] }],
      optionalServices: [0x1812],
    });
    if (device) {
      announceKeyboard("bluetooth");
      return true;
    }
    return false;
  };

  attachHIDListeners();

  const updateViewport = () => {
    setFlag("viewport", compactWidth.matches ? "compact" : "roomy");
  };

  compactWidth.addEventListener?.("change", updateViewport);
  coarsePointer.addEventListener?.("change", () => {
    setFlag("pointer", coarsePointer.matches ? "coarse" : "fine");
    body.classList.toggle("gw-input-touch", coarsePointer.matches);
  });
  hoverCapable.addEventListener?.("change", () => {
    setFlag("hover", hoverCapable.matches ? "available" : "none");
    body.classList.toggle("gw-input-hover", hoverCapable.matches);
  });
  reducedMotion.addEventListener?.("change", () => {
    const motion = reducedMotion.matches ? "reduced" : "full";
    setFlag("motion", motion);
    const nextLowPower =
      reducedTransparency.matches ||
      Boolean(connection && (connection.saveData || /2g/.test(connection.effectiveType || "")));
    setFlag("power", nextLowPower ? "low" : "normal");
    body.classList.toggle("gw-input-low-power", root.dataset.power === "low");
  });
  reducedTransparency.addEventListener?.("change", () => {
    const nextLowPower =
      reducedTransparency.matches ||
      Boolean(connection && (connection.saveData || /2g/.test(connection.effectiveType || "")));
    setFlag("power", nextLowPower ? "low" : "normal");
    body.classList.toggle("gw-input-low-power", root.dataset.power === "low");
  });

  const markOptimizedNodes = () => {
    document.querySelectorAll(".gw-doc-link, .gw-preview, .gw-editor-form").forEach((node) => {
      node.setAttribute("data-gw-optimized", "true");
    });
  };

  markOptimizedNodes();
  document.body.addEventListener("htmx:afterSwap", markOptimizedNodes);
})();

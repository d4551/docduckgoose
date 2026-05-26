(function initSettingsShell() {
  var root = document.documentElement;

  var readLabels = function (section) {
    var raw = section.getAttribute("data-gw-device-labels");
    if (!raw) {
      return {};
    }
    var parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  };

  var setShellStatus = function (statusEl, state, labels) {
    if (!(statusEl instanceof HTMLElement)) {
      return;
    }
    statusEl.classList.remove("badge-success", "badge-error", "badge-warning", "badge-neutral");
    if (state === "online") {
      statusEl.classList.add("badge-success");
      statusEl.textContent = labels.online || "Online";
    } else if (state === "offline") {
      statusEl.classList.add("badge-error");
      statusEl.textContent = labels.offline || "Offline";
    } else {
      statusEl.classList.add("badge-warning");
      statusEl.textContent = labels.checking || "Checking";
    }
    statusEl.setAttribute("aria-label", statusEl.textContent || "");
  };

  var probeHealth = function (url, statusEl, labels) {
    setShellStatus(statusEl, "checking", labels);
    fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    }).then(
      function (response) {
        setShellStatus(statusEl, response.ok ? "online" : "offline", labels);
      },
      function () {
        setShellStatus(statusEl, "offline", labels);
      },
    );
  };

  var resolveHealthUrl = function (row) {
    var raw = row.getAttribute("data-gw-health-url");
    if (!raw || raw.length === 0) {
      return "";
    }
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return raw;
    }
    return new URL(raw, window.location.origin).toString();
  };

  var updateLocalPlatformLabel = function (section, labels) {
    var row = section.querySelector('[data-gw-shell-row="local"]');
    if (!(row instanceof HTMLElement)) {
      return;
    }
    var badge = row.querySelector("[data-gw-shell-platform-label]");
    if (!(badge instanceof HTMLElement)) {
      return;
    }
    var device = root.dataset.device || "desktop";
    var labelKey = device;
    if (device === "ios" || device === "android" || device === "embedded" || device === "desktop") {
      badge.textContent = labels[labelKey] || labels.local || badge.textContent;
    } else {
      badge.textContent = labels.local || badge.textContent;
    }
    var hostCell = row.querySelector("[data-gw-shell-host]");
    if (hostCell instanceof HTMLElement) {
      hostCell.textContent = window.location.hostname || "—";
    }
  };

  document.addEventListener("gw:viewport", function () {
    wireDeviceShell();
  });

  var wireDeviceShell = function () {
    var section = document.getElementById("gw-device-shell-section");
    if (!(section instanceof HTMLElement)) {
      return;
    }
    var labels = readLabels(section);
    updateLocalPlatformLabel(section, labels);
    var rows = section.querySelectorAll("[data-gw-shell-row]");
    rows.forEach(function (row) {
      if (!(row instanceof HTMLElement)) {
        return;
      }
      var statusEl = row.querySelector("[data-gw-shell-status]");
      var url = resolveHealthUrl(row);
      if (url.length > 0 && statusEl instanceof HTMLElement) {
        probeHealth(url, statusEl, labels);
      }
    });
  };

  var setHtmxBusy = function (elt, busy) {
    if (!(elt instanceof HTMLElement)) {
      return;
    }
    if (busy) {
      elt.setAttribute("aria-busy", "true");
    } else {
      elt.removeAttribute("aria-busy");
    }
    if (elt instanceof HTMLButtonElement) {
      elt.disabled = busy;
    }
    if (elt instanceof HTMLFormElement) {
      var submit = elt.querySelector('button[type="submit"]');
      if (submit instanceof HTMLButtonElement) {
        submit.disabled = busy;
      }
    }
  };

  document.body.addEventListener("htmx:beforeRequest", function (event) {
    var detail = event.detail;
    if (!detail || detail.target !== document.getElementById("gw-main")) {
      return;
    }
    var main = document.getElementById("gw-main");
    if (main instanceof HTMLElement) {
      main.setAttribute("aria-busy", "true");
    }
    if (detail.elt instanceof HTMLElement) {
      setHtmxBusy(detail.elt, true);
    }
  });

  document.body.addEventListener("htmx:afterSwap", function (event) {
    var detail = event.detail;
    if (!detail || detail.target !== document.getElementById("gw-main")) {
      return;
    }
    var main = document.getElementById("gw-main");
    if (main instanceof HTMLElement) {
      main.removeAttribute("aria-busy");
    }
    if (detail.elt instanceof HTMLElement) {
      setHtmxBusy(detail.elt, false);
    }
    wireDeviceShell();
    document.dispatchEvent(new CustomEvent("gw:settings:sync"));
  });

  document.addEventListener("gw:viewport", function () {
    wireDeviceShell();
  });

  document.body.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-gw-remove-arm]");
    if (!trigger) {
      return;
    }
    var pluginId = trigger.getAttribute("data-gw-remove-id");
    if (!pluginId) {
      return;
    }
    var panel = document.getElementById("gw-plugin-remove-confirm");
    if (!panel) {
      return;
    }
    var form = panel.querySelector("[data-gw-remove-form]");
    if (form) {
      form.setAttribute("hx-post", "/settings/plugins/" + encodeURIComponent(pluginId) + "/remove");
      if (typeof htmx !== "undefined") {
        htmx.process(form);
      }
    }
    var submit = panel.querySelector("[data-gw-remove-submit]");
    if (submit) {
      submit.setAttribute("aria-label", trigger.getAttribute("aria-label") || "");
    }
    panel.hidden = false;
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  document.addEventListener("DOMContentLoaded", wireDeviceShell);
})();

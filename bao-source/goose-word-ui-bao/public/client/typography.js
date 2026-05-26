(function initTypography() {
  var prefsUrl =
    document.documentElement.getAttribute("data-gw-preferences-url") || "/api/preferences";

  function readFormPrefs(form) {
    var editorFont = form.elements.namedItem("editorFont");
    var editorFontStyle = form.elements.namedItem("editorFontStyle");
    var uiFont = form.elements.namedItem("uiFont");
    var defaultDraftStyle = form.elements.namedItem("defaultDraftStyle");
    var theme = form.elements.namedItem("theme");
    return {
      editorFont: editorFont instanceof HTMLSelectElement ? editorFont.value : "",
      editorFontStyle:
        editorFontStyle instanceof HTMLSelectElement ? editorFontStyle.value : "normal",
      uiFont: uiFont instanceof HTMLSelectElement ? uiFont.value : "",
      defaultDraftStyle:
        defaultDraftStyle instanceof HTMLSelectElement ? defaultDraftStyle.value : "",
      theme: theme instanceof HTMLSelectElement ? theme.value : "",
    };
  }

  function applyPrefs(prefs) {
    var root = document.documentElement;
    if (!prefs || typeof prefs !== "object") {
      return;
    }
    if (prefs.editorFont) {
      root.setAttribute("data-gw-editor-font", prefs.editorFont);
    }
    if (prefs.editorFontStyle) {
      root.setAttribute("data-gw-editor-font-style", prefs.editorFontStyle);
    }
    if (prefs.uiFont) {
      root.setAttribute("data-gw-ui-font", prefs.uiFont);
    }
    if (typeof prefs.defaultDraftStyle === "string") {
      root.setAttribute("data-gw-default-draft-style", prefs.defaultDraftStyle);
    }
    if (prefs.theme) {
      root.setAttribute("data-theme", prefs.theme);
      document.dispatchEvent(
        new CustomEvent("bao:theme:apply", {
          detail: { dataTheme: prefs.theme },
        }),
      );
    }
    var editor = document.getElementById("gw-editor-panel");
    if (editor instanceof HTMLElement && prefs.defaultDraftStyle) {
      editor.setAttribute("data-draft-style", prefs.defaultDraftStyle);
    }
  }

  function showSavedToast() {
    var toast = document.getElementById("gw-offline-toast");
    if (toast === null) {
      return;
    }
    var label =
      document.documentElement.getAttribute("data-gw-typography-saved") || "Typography saved";
    toast.textContent = label;
  }

  function loadInitialPrefs() {
    fetch(prefsUrl, { method: "GET", headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((prefs) => {
        applyPrefs(prefs);
      });
  }

  document.addEventListener("submit", (event) => {
    var form = event.target;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    if (!form.hasAttribute("data-gw-typography-form")) {
      return;
    }
    event.preventDefault();
    var body = readFormPrefs(form);
    fetch(prefsUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((prefs) => {
        if (prefs === null) {
          return;
        }
        applyPrefs(prefs);
        showSavedToast();
      });
  });

  document.addEventListener("change", (event) => {
    var target = event.target;
    if (!(target instanceof HTMLSelectElement)) {
      return;
    }
    if (!target.hasAttribute("data-gw-pref")) {
      return;
    }
    var form = target.closest("[data-gw-typography-form]");
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    var body = readFormPrefs(form);
    fetch(prefsUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((prefs) => {
        if (prefs === null) {
          return;
        }
        applyPrefs(prefs);
      });
  });

  loadInitialPrefs();
})();

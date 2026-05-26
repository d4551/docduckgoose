(function initTypography() {
  var routesRaw = document.documentElement.getAttribute("data-gw-client-api-routes");
  var routes = routesRaw ? JSON.parse(routesRaw) : {};
  var prefsUrl =
    document.documentElement.getAttribute("data-gw-preferences-url") || routes.preferences;
  var savingLabel = document.documentElement.getAttribute("data-gw-typography-saving") || "Saving…";
  var errorLabel =
    document.documentElement.getAttribute("data-gw-typography-error") ||
    "Could not save typography";

  function readFormPrefs(form) {
    var editorFont = form.elements.namedItem("editorFont");
    var editorFontStyle = form.elements.namedItem("editorFontStyle");
    var uiFont = form.elements.namedItem("uiFont");
    var defaultDraftStyle = form.elements.namedItem("defaultDraftStyle");
    var theme = form.elements.namedItem("theme");
    var locale = form.elements.namedItem("locale");
    var favoriteEditorFonts = form.elements.namedItem("favoriteEditorFonts");
    return {
      editorFont: editorFont instanceof HTMLSelectElement ? editorFont.value : "",
      editorFontStyle:
        editorFontStyle instanceof HTMLSelectElement ? editorFontStyle.value : "normal",
      uiFont: uiFont instanceof HTMLSelectElement ? uiFont.value : "",
      favoriteEditorFonts:
        favoriteEditorFonts instanceof HTMLInputElement && favoriteEditorFonts.value.length > 0
          ? favoriteEditorFonts.value.split(",").filter(function (value) {
              return value.length > 0;
            })
          : [],
      defaultDraftStyle:
        defaultDraftStyle instanceof HTMLSelectElement ? defaultDraftStyle.value : "",
      theme: theme instanceof HTMLSelectElement ? theme.value : "",
      locale: locale instanceof HTMLSelectElement ? locale.value : "",
    };
  }

  function localeAcceptHeader(locale) {
    if (locale === "zh-Hans") {
      return "zh-CN,zh;q=0.9";
    }
    return locale + "," + locale.split("-")[0] + ";q=0.9";
  }

  function syncDocumentTitleFromMain() {
    var marker = document.querySelector("#gw-main [data-gw-page-title]");
    if (marker instanceof HTMLElement) {
      var nextTitle = marker.getAttribute("data-gw-page-title");
      if (typeof nextTitle === "string" && nextTitle.length > 0) {
        document.title = nextTitle;
        var titleNode = document.getElementById("gw-document-title");
        if (titleNode !== null) {
          titleNode.textContent = nextTitle;
        }
      }
    }
  }

  function syncDockToggleLabelsFromFragment() {
    var labels = document.getElementById("gw-dock-labels");
    if (!(labels instanceof HTMLElement)) {
      return;
    }
    var shown = labels.getAttribute("data-gw-dock-shown");
    var hidden = labels.getAttribute("data-gw-dock-hidden");
    if (typeof shown === "string" && shown.length > 0) {
      document.documentElement.setAttribute("data-gw-dock-shown", shown);
    }
    if (typeof hidden === "string" && hidden.length > 0) {
      document.documentElement.setAttribute("data-gw-dock-hidden", hidden);
    }
    var status = document.getElementById("gw-dock-toggle-status");
    if (status instanceof HTMLElement) {
      var dockState = document.documentElement.getAttribute("data-gw-dock");
      status.textContent =
        dockState === "hidden" ? hidden || status.textContent : shown || status.textContent;
    }
  }

  function refreshLocalizedSurfaces(locale) {
    if (typeof locale !== "string" || locale.length === 0) {
      return;
    }
    document.documentElement.lang = locale;
    document.documentElement.setAttribute("data-gw-locale", locale);
    if (typeof htmx === "undefined") {
      return;
    }
    var headers = { "Accept-Language": localeAcceptHeader(locale) };
    var activeNav = document.documentElement.getAttribute("data-gw-active-nav") || "docs";
    var path = window.location.pathname + window.location.search;
    var dockFragment = routes.dockNavFragment || "/fragments/dock-nav";
    var chipFragment = routes.enterpriseContextChip || "/fragments/enterprise-context";
    htmx.ajax("GET", path, { target: "#gw-main", swap: "innerHTML", headers: headers });
    htmx.ajax("GET", chipFragment, {
      target: "#gw-enterprise-chip",
      swap: "outerHTML",
      headers: headers,
    });
    htmx.ajax("GET", dockFragment + "?activeNav=" + encodeURIComponent(activeNav), {
      target: "#gw-dock-nav",
      swap: "outerHTML",
      headers: headers,
    });
  }

  document.addEventListener("htmx:afterSwap", function (event) {
    var detail = event.detail;
    if (!detail || typeof detail !== "object") {
      return;
    }
    var target = detail.target;
    if (target instanceof HTMLElement && target.id === "gw-main") {
      syncDocumentTitleFromMain();
    }
    if (target instanceof HTMLElement && target.id === "gw-dock-nav") {
      syncDockToggleLabelsFromFragment();
    }
  });

  function setTypographyStatus(message, isError) {
    var status = document.getElementById("gw-typography-status");
    if (!(status instanceof HTMLElement)) {
      return;
    }
    status.textContent = message;
    status.classList.toggle("text-error", isError === true);
    status.classList.toggle("text-success", isError === false && message.length > 0);
  }

  function setTypographyBusy(form, busy) {
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    var controls = form.querySelectorAll("[data-gw-pref], button[type='submit']");
    controls.forEach(function (control) {
      if (control instanceof HTMLElement) {
        control.setAttribute("aria-busy", busy ? "true" : "false");
        if (control instanceof HTMLButtonElement || control instanceof HTMLSelectElement) {
          control.disabled = busy;
        }
      }
    });
    if (busy) {
      setTypographyStatus(savingLabel, false);
    }
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
    if (prefs.locale) {
      root.setAttribute("data-gw-locale", prefs.locale);
      root.lang = prefs.locale;
    }
    var editor = document.getElementById("gw-editor-panel");
    if (editor instanceof HTMLElement && prefs.defaultDraftStyle) {
      editor.setAttribute("data-draft-style", prefs.defaultDraftStyle);
    }
  }

  function syncFormFromRoot(form) {
    var root = document.documentElement;
    var pairs = [
      ["editorFont", "data-gw-editor-font"],
      ["editorFontStyle", "data-gw-editor-font-style"],
      ["uiFont", "data-gw-ui-font"],
      ["defaultDraftStyle", "data-gw-default-draft-style"],
      ["theme", "data-theme"],
    ];
    pairs.forEach(function (pair) {
      var field = form.elements.namedItem(pair[0]);
      var value = root.getAttribute(pair[1]);
      if (field instanceof HTMLSelectElement && typeof value === "string" && value.length > 0) {
        field.value = value;
      }
    });
  }

  function favoriteList(form) {
    var hidden = form.elements.namedItem("favoriteEditorFonts");
    if (!(hidden instanceof HTMLInputElement) || hidden.value.length === 0) {
      return [];
    }
    return hidden.value.split(",").filter(function (value) {
      return value.length > 0;
    });
  }

  function writeFavoriteList(form, values) {
    var hidden = form.elements.namedItem("favoriteEditorFonts");
    if (hidden instanceof HTMLInputElement) {
      hidden.value = values.join(",");
    }
  }

  function syncFontFavorite(form) {
    var editorFont = form.elements.namedItem("editorFont");
    var favorite = form.elements.namedItem("favoriteEditorFont");
    if (!(editorFont instanceof HTMLSelectElement) || !(favorite instanceof HTMLInputElement)) {
      return;
    }
    var values = favoriteList(form);
    favorite.value = editorFont.value;
    favorite.checked = values.includes(editorFont.value);
  }

  function filterFonts(input) {
    var targetName = input.getAttribute("data-gw-font-target") || "editorFont";
    var form = input.closest("[data-gw-typography-form]");
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    var field = form.elements.namedItem(targetName);
    if (!(field instanceof HTMLSelectElement)) {
      return;
    }
    var query = input.value.trim().toLowerCase();
    for (var index = 0; index < field.options.length; index += 1) {
      var option = field.options[index];
      var label = (
        option.getAttribute("data-gw-font-label") ||
        option.textContent ||
        ""
      ).toLowerCase();
      option.hidden = query.length > 0 && !label.includes(query);
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

  function persistPrefs(form, showToastOnSuccess) {
    var body = readFormPrefs(form);
    setTypographyBusy(form, true);
    fetch(prefsUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(function (response) {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then(function (prefs) {
        setTypographyBusy(form, false);
        if (prefs === null) {
          setTypographyStatus(errorLabel, true);
          return;
        }
        var priorLocale = document.documentElement.getAttribute("data-gw-locale") || "";
        applyPrefs(prefs);
        syncFormFromRoot(form);
        syncFontFavorite(form);
        setTypographyStatus(
          document.documentElement.getAttribute("data-gw-typography-saved") || "",
          false,
        );
        if (prefs.locale && prefs.locale !== priorLocale) {
          refreshLocalizedSurfaces(prefs.locale);
        }
        if (showToastOnSuccess) {
          showSavedToast();
        }
      });
  }

  function loadInitialPrefs() {
    fetch(prefsUrl, { method: "GET", headers: { Accept: "application/json" } })
      .then(function (response) {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then(function (prefs) {
        applyPrefs(prefs);
        var form = document.querySelector("[data-gw-typography-form]");
        if (form instanceof HTMLFormElement) {
          syncFormFromRoot(form);
          syncFontFavorite(form);
        }
      });
  }

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    if (!form.hasAttribute("data-gw-typography-form")) {
      return;
    }
    event.preventDefault();
    persistPrefs(form, true);
  });

  document.addEventListener("change", function (event) {
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
    syncFontFavorite(form);
    persistPrefs(form, false);
  });

  document.addEventListener("input", function (event) {
    var target = event.target;
    if (target instanceof HTMLInputElement && target.hasAttribute("data-gw-font-filter")) {
      filterFonts(target);
    }
  });

  document.addEventListener("change", function (event) {
    var target = event.target;
    if (!(target instanceof HTMLInputElement) || !target.hasAttribute("data-gw-font-favorite")) {
      return;
    }
    var form = target.closest("[data-gw-typography-form]");
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    var values = favoriteList(form).filter(function (value) {
      return value !== target.value;
    });
    if (target.checked) {
      values.unshift(target.value);
    }
    writeFavoriteList(form, values);
    persistPrefs(form, true);
  });

  document.addEventListener("gw:settings:sync", function () {
    var form = document.querySelector("[data-gw-typography-form]");
    if (form instanceof HTMLFormElement) {
      syncFormFromRoot(form);
      syncFontFavorite(form);
    }
    loadInitialPrefs();
  });

  loadInitialPrefs();
})();

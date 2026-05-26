import { getPreviewHtml, postPreviewHtml, postPrintHtml } from "./api-client.js";

(function initTouchToolbar() {
  var lastSnapshot = null;
  var shortcutLabel =
    navigator.platform && /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl";

  function getTextarea(from) {
    var toolbar = from?.closest ? from.closest("[data-target]") : null;
    var targetId = toolbar ? toolbar.getAttribute("data-target") : "";
    return document.getElementById(targetId || "gw-body-textarea");
  }

  function emitActivity(detail) {
    if (typeof CustomEvent === "function") {
      document.dispatchEvent(new CustomEvent("gw:activity", { detail: detail || {} }));
    }
  }

  function dispatchInput(textarea) {
    if (typeof Event === "function") {
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }

  function insertAtCursor(textarea, insert) {
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var value = textarea.value;
    var next = value.slice(0, start) + insert + value.slice(end);
    lastSnapshot = value;
    textarea.value = next;
    textarea.focus();
    var cursor = start + insert.length;
    textarea.setSelectionRange(cursor, cursor);
    dispatchInput(textarea);
    emitActivity({ kind: "shortcut", action: "insert", insert: insert });
  }

  function wrapSelection(textarea, before, after) {
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var value = textarea.value;
    var selected = value.slice(start, end);
    lastSnapshot = value;
    textarea.value = value.slice(0, start) + before + selected + after + value.slice(end);
    textarea.focus();
    textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    dispatchInput(textarea);
    emitActivity({ kind: "shortcut", action: "wrap" });
  }

  function submitEditorForm() {
    var form = document.querySelector(".gw-editor-form");
    if (form === null) {
      return false;
    }
    if (typeof form.requestSubmit === "function") {
      form.requestSubmit();
    } else {
      if (typeof Event === "function") {
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      }
    }
    emitActivity({ kind: "shortcut", action: "save" });
    return true;
  }

  function decorateKeyboardShortcuts() {
    [
      ["[data-md-insert='# ']", `${shortcutLabel}+Alt+1`],
      ["[data-md-insert='**']", `${shortcutLabel}+B`],
      ["[data-md-insert='- ']", `${shortcutLabel}+Shift+8`],
      ["[data-md-insert='[]()']", `${shortcutLabel}+K`],
      ["[data-md-undo]", `${shortcutLabel}+Z`],
      ["[data-preview-toggle]", `${shortcutLabel}+Enter`],
      ["button[type='submit']", `${shortcutLabel}+S`],
    ].forEach((binding) => {
      var node = document.querySelector(binding[0]);
      if (node === null) {
        return;
      }
      node.setAttribute("aria-keyshortcuts", binding[1].replaceAll("+", " "));
      node.setAttribute("title", binding[1]);
      node.setAttribute("data-shortcut", binding[1]);
    });
  }

  function setPreviewState(button, open) {
    var targetId = button.getAttribute("data-preview-target");
    var pane = targetId ? document.getElementById(targetId) : null;
    if (pane === null) {
      return;
    }
    pane.hidden = !open;
    button.setAttribute("aria-expanded", open ? "true" : "false");
    var openLabel = button.getAttribute("data-preview-open-label");
    var closedLabel = button.getAttribute("data-preview-closed-label");
    var nextLabel = open ? openLabel : closedLabel;
    if (nextLabel) {
      button.setAttribute("aria-label", nextLabel);
      button.setAttribute("data-tip", nextLabel);
    }
  }

  function loadPreview(button) {
    var targetId = button.getAttribute("data-preview-target");
    var pane = targetId ? document.getElementById(targetId) : null;
    var previewUrl = button.getAttribute("hx-post") || button.getAttribute("hx-get");
    if (pane === null || previewUrl === null || previewUrl === "") {
      return;
    }
    var form = button.closest("form");
    var previewRequest =
      form instanceof HTMLFormElement
        ? postPreviewHtml(previewUrl, new FormData(form))
        : getPreviewHtml(previewUrl);
    previewRequest.then((html) => {
      if (html.length > 0) {
        pane.innerHTML = html;
        setPreviewState(button, true);
        document.dispatchEvent(new CustomEvent("gw:preview:updated", { detail: { pane: pane } }));
      } else {
        setPreviewState(button, false);
      }
    });
  }

  function openCurrentPrint(button) {
    var printUrl = button.getAttribute("data-print-url");
    var form = button.closest("form");
    if (!(form instanceof HTMLFormElement) || printUrl === null || printUrl === "") {
      return;
    }
    var targetName = "goose-word-print-" + String(Date.now());
    var printWindow = window.open("", targetName);
    if (printWindow === null) {
      return;
    }
    printWindow.opener = null;
    postPrintHtml(printUrl, new FormData(form)).then((html) => {
      if (html.length === 0) {
        printWindow.close();
        return;
      }
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
    });
  }

  document.addEventListener("click", async (event) => {
    var target = event.target;
    if (!target || typeof target.closest !== "function") {
      return;
    }
    var printButton = target.closest("[data-print-current]");
    if (printButton !== null) {
      event.preventDefault();
      openCurrentPrint(printButton);
      return;
    }
    var deleteToggle = target.closest("[data-delete-toggle]");
    if (deleteToggle !== null) {
      event.preventDefault();
      var deleteHref = deleteToggle.getAttribute("data-delete-href");
      if (deleteToggle.dataset.confirming === "true" && deleteHref) {
        window.location.href = deleteHref;
        return;
      }
      document
        .querySelectorAll("[data-delete-toggle][data-confirming='true']")
        .forEach((button) => {
          button.dataset.confirming = "false";
          button.classList.remove("gw-delete-armed");
          button.setAttribute("aria-label", button.getAttribute("data-delete-label") || "Delete");
        });
      deleteToggle.dataset.confirming = "true";
      deleteToggle.classList.add("gw-delete-armed");
      deleteToggle.setAttribute(
        "aria-label",
        deleteToggle.getAttribute("data-confirm-label") || "Confirm delete",
      );
      return;
    }
    var previewButton = target.closest("[data-preview-toggle]");
    if (previewButton !== null) {
      event.preventDefault();
      event.stopPropagation();
      var targetId = previewButton.getAttribute("data-preview-target");
      var pane = targetId ? document.getElementById(targetId) : null;
      if (pane !== null && !pane.hidden) {
        event.preventDefault();
        event.stopPropagation();
        setPreviewState(previewButton, false);
        return;
      }
      setPreviewState(previewButton, true);
      loadPreview(previewButton);
      return;
    }
    var toolbarButton = target.closest("[data-md-insert], [data-md-undo], [data-mermaid-insert]");
    if (toolbarButton === null) {
      return;
    }
    var textarea = getTextarea(toolbarButton);
    if (textarea === null) {
      return;
    }
    if (toolbarButton.hasAttribute("data-mermaid-insert")) {
      event.preventDefault();
      insertAtCursor(textarea, "```mermaid\nflowchart LR\n  A[Start] --> B[End]\n```\n");
      return;
    }
    var insert = toolbarButton.getAttribute("data-md-insert");
    if (insert !== null) {
      event.preventDefault();
      insertAtCursor(textarea, insert);
      return;
    }
    if (toolbarButton.hasAttribute("data-md-undo") && lastSnapshot !== null) {
      event.preventDefault();
      textarea.value = lastSnapshot;
      lastSnapshot = null;
      dispatchInput(textarea);
      emitActivity({ kind: "shortcut", action: "undo" });
    }
  });

  document.addEventListener("keydown", (event) => {
    const mod = event.metaKey || event.ctrlKey;
    if (!mod) {
      return;
    }

    if ((event.key === "s" || event.key === "S") && submitEditorForm()) {
      event.preventDefault();
      return;
    }

    const textarea = getTextarea(event.target?.closest ? event.target : null);
    if (textarea === null) {
      return;
    }

    if (event.key === "b" || event.key === "B") {
      event.preventDefault();
      wrapSelection(textarea, "**", "**");
      return;
    }

    if (event.key === "k" || event.key === "K") {
      event.preventDefault();
      wrapSelection(textarea, "[", "]()");
      return;
    }

    if (event.shiftKey && event.key === "8") {
      event.preventDefault();
      insertAtCursor(textarea, "- ");
      return;
    }

    if (event.altKey && event.key === "1") {
      event.preventDefault();
      insertAtCursor(textarea, "# ");
      return;
    }

    if (event.key === "Enter") {
      const previewButton = document.querySelector("[data-preview-toggle]");
      if (previewButton !== null) {
        event.preventDefault();
        previewButton.click();
        emitActivity({ kind: "shortcut", action: "preview" });
      }
    }

    if (event.key.toLowerCase() === "t") {
      event.preventDefault();
      const tplTrigger = document.querySelector(
        "[data-template-trigger], .gw-templates a, [data-bao-templates]",
      );
      if (tplTrigger) {
        tplTrigger.focus();
        tplTrigger.click();
      } else if (typeof CustomEvent === "function") {
        document.dispatchEvent(new CustomEvent("bao:templates:request"));
      }
    }
  });

  decorateKeyboardShortcuts();
  document.body.addEventListener("htmx:afterSwap", decorateKeyboardShortcuts);

  document.addEventListener("bao:theme:apply", (e) => {
    const d = e?.detail || {};
    if (d.dataTheme) {
      document.documentElement.setAttribute("data-theme", d.dataTheme);
      document.dispatchEvent(new CustomEvent("bao:ui:reload", { detail: { reason: "theme" } }));
    }
  });
})();

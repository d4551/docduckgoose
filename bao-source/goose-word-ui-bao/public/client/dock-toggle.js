(function initDockToggle() {
  var root = document.documentElement;
  var shownLabel = root.getAttribute("data-gw-dock-shown") || "Navigation shown";
  var hiddenLabel = root.getAttribute("data-gw-dock-hidden") || "Navigation hidden";

  function setDockHidden(hidden) {
    root.setAttribute("data-gw-dock", hidden ? "hidden" : "shown");
    var status = document.getElementById("gw-dock-toggle-status");
    if (status instanceof HTMLElement) {
      status.textContent = hidden ? hiddenLabel : shownLabel;
    }
    document.querySelectorAll("[data-gw-dock-toggle]").forEach(function (button) {
      if (button instanceof HTMLElement) {
        button.setAttribute("aria-pressed", hidden ? "true" : "false");
      }
    });
  }

  function toggleDock() {
    setDockHidden(root.getAttribute("data-gw-dock") !== "hidden");
  }

  document.addEventListener("keydown", function (event) {
    if (!(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d")) {
      return;
    }
    if (event.metaKey || event.altKey) {
      return;
    }
    event.preventDefault();
    toggleDock();
  });

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || typeof target.closest !== "function") {
      return;
    }
    if (target.closest("[data-gw-dock-toggle]") === null) {
      return;
    }
    event.preventDefault();
    toggleDock();
  });

  setDockHidden(false);
})();

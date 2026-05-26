(function initPrintView() {
  function printDocument() {
    window.print();
  }

  document.addEventListener("click", (event) => {
    var target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest("[data-print-trigger]") !== null) {
      printDocument();
    }
  });

  if (new URL(window.location.href).searchParams.get("print") === "1") {
    window.addEventListener("load", printDocument, { once: true });
  }
})();

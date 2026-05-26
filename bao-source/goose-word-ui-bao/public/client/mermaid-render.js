(function initGooseMermaid(global) {
  var vendorUrl =
    document.documentElement.getAttribute("data-gw-mermaid-vendor");
  var errorLabel =
    document.documentElement.getAttribute("data-gw-mermaid-error") ||
    "Diagram could not be rendered";
  var loadPromise = null;

  function loadMermaid() {
    if (global.mermaid) {
      return Promise.resolve(global.mermaid);
    }
    if (loadPromise !== null) {
      return loadPromise;
    }
    loadPromise = new Promise((resolve, reject) => {
      var script = document.createElement("script");
      script.src = vendorUrl;
      script.defer = true;
      script.onload = () => {
        if (global.mermaid) {
          resolve(global.mermaid);
          return;
        }
        reject(new Error("mermaid missing"));
      };
      script.onerror = () => {
        reject(new Error("mermaid load failed"));
      };
      document.head.appendChild(script);
    });
    return loadPromise;
  }

  function themeVariables() {
    var styles = getComputedStyle(document.documentElement);
    var fontFamily =
      document.documentElement.getAttribute("data-gw-editor-font-family") ||
      styles.fontFamily ||
      "system-ui";
    return {
      darkMode: false,
      fontFamily: fontFamily,
      fontSize: "14px",
      textColor: "#1e293b",
      primaryTextColor: "#1e293b",
      lineColor: "#94a3b8",
      backgroundColor: "#f8fafc",
      primaryColor: "#0d9488",
      secondaryColor: "#e2e8f0",
      tertiaryColor: "#cbd5e1",
      mainBkg: "#f8fafc",
    };
  }

  function restoreSource(node, source) {
    var alert = document.createElement("div");
    alert.className = "alert alert-warning mb-2";
    alert.setAttribute("role", "alert");
    var text = document.createElement("span");
    text.textContent = errorLabel;
    alert.appendChild(text);
    var pre = document.createElement("pre");
    var code = document.createElement("code");
    code.className = "language-mermaid";
    code.textContent = source;
    pre.appendChild(code);
    var fallback = document.createElement("div");
    fallback.append(alert, pre);
    node.replaceWith(fallback);
  }

  function renderIn(root) {
    if (!(root instanceof HTMLElement)) {
      return Promise.resolve();
    }
    var blocks = root.querySelectorAll("pre > code.language-mermaid");
    if (blocks.length === 0) {
      return Promise.resolve();
    }
    return loadMermaid().then((mermaid) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: themeVariables(),
      });
      var pending = [];
      var sourceByNode = new Map();
      for (var i = 0; i < blocks.length; i += 1) {
        var code = blocks[i];
        var pre = code.parentElement;
        var diagram = document.createElement("div");
        diagram.className = "mermaid gw-mermaid";
        var source = code.textContent || "";
        diagram.textContent = source;
        if (pre) {
          pre.replaceWith(diagram);
        }
        sourceByNode.set(diagram, source);
        pending.push(diagram);
      }
      if (pending.length === 0) {
        return;
      }
      return mermaid
        .run({ nodes: pending, suppressErrors: true })
        .then(() => undefined)
        .then(
          () => undefined,
          () => {
            for (var j = 0; j < pending.length; j += 1) {
              var node = pending[j];
              var src = sourceByNode.get(node);
              if (src) {
                restoreSource(node, src);
              }
            }
          },
        );
    });
  }

  global.GooseWordMermaid = {
    render: renderIn,
  };

  document.addEventListener("gw:preview:updated", (event) => {
    var detail = event.detail || {};
    if (detail.pane instanceof HTMLElement) {
      renderIn(detail.pane);
    }
  });
})(window);

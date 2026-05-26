(function initOfflineController() {
  var toast = document.getElementById("gw-offline-toast");
  var localLabel =
    document.documentElement.getAttribute("data-gw-connectivity-local") || "Local workspace";
  var offlineLabel =
    document.documentElement.getAttribute("data-gw-connectivity-offline-network") || localLabel;
  var recoveredLabel =
    document.documentElement.getAttribute("data-gw-connectivity-recovered") || localLabel;

  function showToast(message) {
    if (toast === null) {
      return;
    }
    toast.textContent = message;
    toast.hidden = message.length === 0;
  }

  function refreshState() {
    showToast(navigator.onLine ? "" : offlineLabel);
  }

  document.addEventListener("DOMContentLoaded", refreshState);
  window.addEventListener("online", () => {
    showToast(recoveredLabel);
    setTimeout(() => {
      showToast("");
    }, 2200);
  });
  window.addEventListener("offline", refreshState);
})();

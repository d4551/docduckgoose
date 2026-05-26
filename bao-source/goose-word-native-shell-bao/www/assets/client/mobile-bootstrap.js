const boot = document.getElementById("gw-mobile-boot");
const navigate = () => {
  globalThis.location.replace("http://127.0.0.1:8080/docs");
};
if (boot) {
  boot.setAttribute("aria-busy", "true");
}
navigate();

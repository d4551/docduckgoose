import type { Elysia } from "elysia";
import { BLUETOOTH_KEYBOARD_API_ROUTE, BLUETOOTH_KEYBOARD_SETTINGS_TAB_ROUTE } from "./routes.ts";

interface SettingsTabRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly section: string;
  readonly position: number;
  readonly labelKey: string;
  readonly contentUrl: string;
}

const renderPanel = (): string => `
<section>
  <h3>Bluetooth Keyboard Support</h3>
  <p>Pair Bluetooth Low Energy (BLE) HID keyboards via Web Bluetooth for direct status and future advanced input handling.</p>
  <div style="margin: 0.75rem 0; display:flex; gap:0.5rem; flex-wrap:wrap;">
    <button type="button" class="btn btn-sm btn-primary" onclick="if(window.gwRequestBluetoothKeyboard){window.gwRequestBluetoothKeyboard().then(ok=>alert(ok?'Bluetooth keyboard paired! Check device chip.':'Pairing cancelled or unsupported'));}else{alert('Keyboard support module not loaded');}">Pair Bluetooth keyboard</button>
    <button type="button" class="btn btn-sm btn-ghost" onclick="location.reload()">Refresh status</button>
  </div>
  <p class="gw-empty" style="font-size:0.75rem; padding:0.25rem 0;">Status shows 🅱 in the top device strip when active. Classic Bluetooth keyboards are usually surfaced by the OS as hardware input.</p>
  <small>Web Bluetooth support: <span data-gw-bt-status>checking…</span></small>
  <script>
    (function(){
      const el = document.currentScript && document.currentScript.parentElement ? document.currentScript.parentElement.querySelector('[data-gw-bt-status]') : null;
      if (el) {
        const supported = !!(navigator && navigator.bluetooth);
        el.textContent = supported ? 'available' : 'unavailable in this browser';
        el.style.color = supported ? 'var(--gw-primary, #2a7)' : 'var(--gw-muted)';
      }
    })();
  </script>
</section>`;

const plugin = {
  id: "bluetooth-keyboard-bao",
  createSettingsTabRegistrations(): readonly SettingsTabRegistration[] {
    return [
      {
        id: "bluetooth-keyboard-bao:settings",
        extensionId: "bluetooth-keyboard-bao",
        section: "input",
        position: 20,
        labelKey: "plugin.bluetooth-keyboard.title",
        contentUrl: BLUETOOTH_KEYBOARD_SETTINGS_TAB_ROUTE,
      },
    ];
  },
  registerElysia(app: Elysia) {
    app
      .get(
        BLUETOOTH_KEYBOARD_SETTINGS_TAB_ROUTE,
        () =>
          new Response(renderPanel(), {
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
      )
      .get(BLUETOOTH_KEYBOARD_API_ROUTE, () => ({
        supported: typeof navigator !== "undefined" && "bluetooth" in navigator,
        kind: "ble-hid",
      }));
  },
};

export default plugin;

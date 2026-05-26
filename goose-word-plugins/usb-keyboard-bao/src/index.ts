import type { Elysia } from "elysia";
import { USB_KEYBOARD_API_ROUTE, USB_KEYBOARD_SETTINGS_TAB_ROUTE } from "./routes.ts";

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
  <h3>USB Keyboard Support</h3>
  <p>Pair USB HID keyboards for direct low-latency input, macros, and special keys. Uses WebHID when available in the browser.</p>
  <div class="gw-plugin-actions">
    <button type="button" class="btn btn-sm btn-primary" onclick="if(window.gwRequestUSBKeyboard){window.gwRequestUSBKeyboard().then(ok=>alert(ok?'USB keyboard paired! Check device chip.':'Pairing cancelled or unsupported'));}else{alert('Keyboard support module not loaded');}">Pair USB keyboard</button>
    <button type="button" class="btn btn-sm btn-ghost" onclick="location.reload()">Refresh status</button>
  </div>
  <p class="gw-plugin-note">Status updates appear in the top device strip (🔌 icon for USB). Works alongside normal OS keyboard input.</p>
  <small>WebHID support: <span data-gw-hid-status>checking…</span></small>
  <script>
    (function(){
      const el = document.currentScript && document.currentScript.parentElement ? document.currentScript.parentElement.querySelector('[data-gw-hid-status]') : null;
      if (el) {
        const supported = !!(navigator && navigator.hid);
        el.textContent = supported ? 'available' : 'unavailable in this browser';
        el.className = supported ? 'badge badge-success badge-xs' : 'badge badge-warning badge-xs';
      }
    })();
  </script>
</section>`;

const plugin = {
  id: "usb-keyboard-bao",
  createSettingsTabRegistrations(): readonly SettingsTabRegistration[] {
    return [
      {
        id: "usb-keyboard-bao:settings",
        extensionId: "usb-keyboard-bao",
        section: "input",
        position: 10,
        labelKey: "plugin.usb-keyboard.title",
        contentUrl: USB_KEYBOARD_SETTINGS_TAB_ROUTE,
      },
    ];
  },
  registerElysia(app: Elysia) {
    app
      .get(
        USB_KEYBOARD_SETTINGS_TAB_ROUTE,
        () =>
          new Response(renderPanel(), {
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
      )
      .get(USB_KEYBOARD_API_ROUTE, () => ({
        supported: typeof navigator !== "undefined" && "hid" in navigator,
        kind: "usb-hid",
      }));
  },
};

export default plugin;

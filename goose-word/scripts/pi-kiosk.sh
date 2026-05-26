#!/usr/bin/env bash
set -euo pipefail

UNIT=/etc/systemd/system/goose-word-kiosk.service
KIOSK_USER="${1:-pi}"
APP_URL="${2:-http://localhost:8080}"
KIOSK_HOME="$(getent passwd "$KIOSK_USER" | cut -d: -f6)"
CHROMIUM="$(command -v chromium-browser || command -v chromium || true)"

if [ -z "$CHROMIUM" ]; then
  echo "Chromium is required: sudo apt install chromium-browser" >&2
  exit 1
fi

if [ -z "$KIOSK_HOME" ]; then
  echo "Cannot resolve home directory for $KIOSK_USER" >&2
  exit 1
fi

sudo tee "$UNIT" >/dev/null <<EOF
[Unit]
Description=Goose Word Chromium kiosk
After=graphical.target goose-word.service
Wants=graphical.target

[Service]
User=$KIOSK_USER
Environment=DISPLAY=:0
Environment=XAUTHORITY=$KIOSK_HOME/.Xauthority
ExecStart=$CHROMIUM --kiosk --app=$APP_URL --noerrdialogs --disable-infobars --disable-session-crashed-bubble --check-for-update-interval=31536000
Restart=on-failure
RestartSec=5

[Install]
WantedBy=graphical.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable goose-word-kiosk.service
echo "Enabled goose-word-kiosk.service. Start with: sudo systemctl start goose-word-kiosk.service"

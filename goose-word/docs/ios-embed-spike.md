# iOS embedded Goose Word server — spike verdict

## Tooling evidence

| Target | Bun 1.3.14 `bun build --compile` |
|--------|-----------------------------------|
| `bun-linux-arm64-android` | **Supported** — ELF for Android bionic |
| `bun-ios-arm64` | **Unsupported** — compile rejects target |
| `bun-darwin-arm64` | Supported for macOS / Mac Catalyst only |

App Store policy blocks spawning an arbitrary sidecar Mach-O like desktop/Pi.

## Approved v1 paths

1. **Android** — compiled `goose-word-android-arm64` in APK assets; foreground service exec with `GOOSE_WORD_DATA_DIR` / `GOOSE_WORD_PORT`.
2. **iOS (device)** — **in-process loopback host** at native boundary (`GooseWordServerPlugin` Swift): SQLite doc store + minimal HTTP for `/api/health` and `/api/docs` CRUD; WebView loads `http://127.0.0.1:8080/docs` when full Bun host unavailable.
3. **iOS (Mac Catalyst)** — may exec `goose-word-darwin-arm64` where platform allows.

## Blocker if removed

Shipping LAN-only or remote-only shell labeled `embedded` is **FAILED** per release gates.

## Next upstream dependency

Official Bun iOS framework / `bun-ios-arm64` compile would collapse (2) into the same Elysia+SQLite stack as desktop without Swift HTTP duplication.

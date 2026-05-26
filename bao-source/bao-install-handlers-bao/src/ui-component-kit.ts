/**
 * @baohaus/bao-install-handlers-bao/ui-component-kit
 *
 * Canonical install-target handler for the `ui-component-kit` kind.
 * Lifted from `bao-runtime/.../handlers/ui-component-kit.handler.ts`
 * during Cycle 1 #59 phase 2.
 *
 * Filesystem I/O reads the host-owned driver-registry directory via
 * `hostContext.resolveDriverRegistryDir()`; the canonical handler never
 * reaches into the host's install-config seam directly. Filesystem
 * writes use `@baohaus/bao-utils/bun-fs` + `Bun.write` — these are
 * canonical Bao surfaces and are the same primitives the host would use
 * (no shim).
 */

import { BaoUiComponentKitTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type {
  BaoInstallHandlerLoggerPort,
  BaoInstallTargetHandlerContract,
  BaoInstallTargetHandlerHostContext,
  BaoInstallTargetHandlerResult,
  BaoInstallTargetRecord,
} from "@baohaus/bao-sdk/install-target-handler";
import {
  targetHandlerFailure,
  targetHandlerSuccess,
} from "@baohaus/bao-sdk/install-target-handler";
import { getErrorMessage, toResultAsync } from "@baohaus/bao-utils/async-result";
import { mkdir } from "@baohaus/bao-utils/bun-fs";
import { path } from "@baohaus/bao-utils/bun-path";
import type { TSchema } from "@baohaus/baobox/elysia";

const UI_COMPONENT_KIT_KIND = "ui-component-kit";
const KIT_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
const KIT_ID_FILESYSTEM_PATTERN = /[^a-z0-9_-]/gi;

const UI_COMPONENT_CATEGORIES = [
  "action",
  "data-display",
  "data-entry",
  "feedback",
  "layout",
  "navigation",
  "overlay",
  "typography",
] as const;
type UiComponentCategory = (typeof UI_COMPONENT_CATEGORIES)[number];

interface UiComponentDescriptor {
  readonly name: string;
  readonly entrypoint: string;
  readonly displayName: string;
  readonly category: UiComponentCategory;
}

const isUiComponentCategory = (value: unknown): value is UiComponentCategory => {
  return (
    typeof value === "string" && (UI_COMPONENT_CATEGORIES as readonly string[]).includes(value)
  );
};

const isObjectRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const parseComponent = (entry: unknown): UiComponentDescriptor | null => {
  if (!isObjectRecord(entry)) {
    return null;
  }
  const name = typeof entry.name === "string" ? entry.name : "";
  const entrypoint = typeof entry.entrypoint === "string" ? entry.entrypoint : "";
  const displayName = typeof entry.displayName === "string" ? entry.displayName : "";
  const category = entry.category;
  if (name.length === 0 || entrypoint.length === 0 || displayName.length === 0) {
    return null;
  }
  if (!isUiComponentCategory(category)) {
    return null;
  }
  if (!KIT_ID_PATTERN.test(name)) {
    return null;
  }
  return { name, entrypoint, displayName, category };
};

const parseComponents = (raw: unknown): readonly UiComponentDescriptor[] | null => {
  if (!Array.isArray(raw)) {
    return null;
  }
  const parsed: UiComponentDescriptor[] = [];
  for (const entry of raw) {
    const descriptor = parseComponent(entry);
    if (descriptor === null) {
      return null;
    }
    parsed.push(descriptor);
  }
  return parsed;
};

const parseThemes = (raw: unknown): readonly string[] => {
  if (!Array.isArray(raw)) {
    return [];
  }
  const out: string[] = [];
  for (const entry of raw) {
    if (typeof entry === "string" && entry.length > 0) {
      out.push(entry);
    }
  }
  return out;
};

export class UiComponentKitTargetHandler implements BaoInstallTargetHandlerContract {
  readonly kind = UI_COMPONENT_KIT_KIND;
  readonly displayName = "UI Component Kit";
  readonly hotInstallable = true;
  readonly retryable = true;
  readonly abiVersion = 1;
  readonly targetSchema: TSchema = BaoUiComponentKitTargetSchema;

  private readonly hostContext: BaoInstallTargetHandlerHostContext;

  constructor(hostContext: BaoInstallTargetHandlerHostContext) {
    this.hostContext = hostContext;
  }

  resolveIdentifier(target: BaoInstallTargetRecord): string {
    return typeof target.kitId === "string" ? target.kitId : String(target.target ?? "");
  }

  async install(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    const logger = this.resolveLogger();
    if (target.kind !== UI_COMPONENT_KIT_KIND) {
      return targetHandlerFailure({
        message: "Invalid target kind for UiComponentKitTargetHandler",
        retryable: this.retryable,
        phase: "install",
      });
    }
    const kitId = String(target.kitId ?? "");
    const daisyRange = String(target.daisyUiVersionRange ?? "");
    const tailwindRange = String(target.tailwindVersionRange ?? "");
    const components = parseComponents(target.components);
    const themes = parseThemes(target.themes);
    if (kitId.length === 0 || !KIT_ID_PATTERN.test(kitId)) {
      return targetHandlerFailure({
        message: `Invalid kitId "${kitId}"`,
        retryable: false,
        phase: "install",
      });
    }
    if (components === null || components.length === 0) {
      return targetHandlerFailure({
        message: "components array must contain at least one valid component descriptor",
        retryable: false,
        phase: "install",
      });
    }
    logger.info("Registering UI component kit", {
      kitId,
      daisyRange,
      tailwindRange,
      componentCount: String(components.length),
      themeCount: String(themes.length),
    });
    const writeResult = await toResultAsync(
      (async () => {
        const registryDir = this.resolveKitRegistryDir();
        const registryPath = this.resolveKitRegistryPath(kitId);
        await mkdir(registryDir, { recursive: true });
        await Bun.write(
          registryPath,
          JSON.stringify(
            {
              kitId,
              daisyUiVersionRange: daisyRange,
              tailwindVersionRange: tailwindRange,
              components,
              themes,
              installedAt: new Date().toISOString(),
            },
            null,
            2,
          ),
        );
        return { registryPath };
      })(),
    );
    if (!writeResult.ok) {
      return targetHandlerFailure({
        message: `UI kit registration failed: ${getErrorMessage(writeResult.error)}`,
        retryable: this.retryable,
        phase: "install",
      });
    }
    return targetHandlerSuccess({
      message: `UI component kit "${kitId}" registered (${components.length} components)`,
      requiresRestart: false,
    });
  }

  async uninstall(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== UI_COMPONENT_KIT_KIND) {
      return targetHandlerFailure({
        message: "Invalid target kind for UiComponentKitTargetHandler",
        retryable: this.retryable,
        phase: "uninstall",
      });
    }
    const kitId = String(target.kitId ?? "");
    const registryPath = this.resolveKitRegistryPath(kitId);
    const registryFile = Bun.file(registryPath);
    if (await registryFile.exists()) {
      await registryFile.delete();
    }
    return targetHandlerSuccess({
      message: `UI component kit "${kitId}" deregistered`,
      requiresRestart: false,
    });
  }

  validate(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult> {
    if (target.kind !== UI_COMPONENT_KIT_KIND) {
      return Promise.resolve(
        targetHandlerFailure({
          message: "Invalid target kind for UiComponentKitTargetHandler",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    const kitId = String(target.kitId ?? "");
    if (kitId.length === 0 || !KIT_ID_PATTERN.test(kitId)) {
      return Promise.resolve(
        targetHandlerFailure({
          message: `Invalid kitId "${kitId}"`,
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (typeof target.daisyUiVersionRange !== "string" || target.daisyUiVersionRange.length === 0) {
      return Promise.resolve(
        targetHandlerFailure({
          message: "daisyUiVersionRange must be a non-empty string",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    if (
      typeof target.tailwindVersionRange !== "string" ||
      target.tailwindVersionRange.length === 0
    ) {
      return Promise.resolve(
        targetHandlerFailure({
          message: "tailwindVersionRange must be a non-empty string",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    const components = parseComponents(target.components);
    if (components === null || components.length === 0) {
      return Promise.resolve(
        targetHandlerFailure({
          message:
            "components must be a non-empty array of {name, entrypoint, displayName, category}",
          retryable: false,
          phase: "validate",
        }),
      );
    }
    return Promise.resolve(
      targetHandlerSuccess({
        message: `ui-component-kit target "${String(target.target)}" is valid`,
      }),
    );
  }

  private resolveLogger(): BaoInstallHandlerLoggerPort {
    return this.hostContext.logger;
  }

  private resolveKitRegistryDir(): string {
    const baseDir = this.hostContext.resolveDriverRegistryDir();
    return path.join(path.dirname(baseDir), "ui-component-kits");
  }

  private resolveKitRegistryPath(kitId: string): string {
    const safe = kitId.replace(KIT_ID_FILESYSTEM_PATTERN, "_");
    return path.join(this.resolveKitRegistryDir(), `${safe}.json`);
  }
}

import type { LocaleCode } from "../i18n/runtime.ts";
import type { MessageKey } from "../i18n/strings.ts";

import type {
  HotLoadState,
  TenancyTier,
} from "@baohaus/contribution-registry-bao/enterprise-tenancy";
import {
  isEnterpriseTenancyHotLoadAllowed as isTenancyHotLoadAllowedInRegistry,
  isTenancyTier,
} from "@baohaus/contribution-registry-bao/enterprise-tenancy";

export interface SettingsTabRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly section: string;
  readonly position: number;
  readonly labelKey: MessageKey;
  readonly contentUrl: string;
}

export interface DocumentTemplateRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly labelKey: MessageKey;
  readonly descriptionKey?: MessageKey;
  getInitialContent: (locale: LocaleCode) => {
    title?: string;
    body: string;
    draftStyle?: string;
  };
}

const createListHost = <T extends { readonly id: string; readonly extensionId?: string }>() => {
  const rows = new Map<string, T>();
  return {
    register(registration: T) {
      rows.set(registration.id, registration);
      return { ok: true as const, id: registration.id };
    },
    unregister(id: string): boolean {
      return rows.delete(id);
    },
    unregisterByOwner(extensionId: string): number {
      let removed = 0;
      for (const [id, registration] of rows) {
        if (registration.extensionId === extensionId) {
          rows.delete(id);
          removed += 1;
        }
      }
      return removed;
    },
    snapshot(): readonly T[] {
      return [...rows.values()].sort((a, b) => a.id.localeCompare(b.id));
    },
    size(): number {
      return rows.size;
    },
    resetForTests(): void {
      rows.clear();
    },
  };
};

export interface EnterpriseContextRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly labelKey: MessageKey;
  readonly type: "user" | "workspace" | "workplace" | "admin" | "enterprise";
  // Real enterprise tenancy (subtask 2 cutover): tenantId from .bao fabric matrix / contribution-registry.
  // null = global (visible to all). Enables hot-load scoped to tenant.
  readonly tenantId?: string | null | undefined;
  readonly hotLoadState?: HotLoadState;
}

export interface ThemeRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly labelKey: MessageKey;
  readonly descriptionKey?: MessageKey;
  readonly dataTheme: string;
  readonly cssHref?: string;
}

export const gooseWordContributionSurfaces = Object.freeze({
  sidebar: createListHost(),
  settingsTab: createListHost<SettingsTabRegistration>(),
  paletteEntryGroup: createListHost(),
  apiGroup: createListHost(),
  tileGroup: createListHost(),
  topbar: createListHost(),
  documentTemplate: createListHost<DocumentTemplateRegistration>(),
  enterpriseContext: createListHost<EnterpriseContextRegistration>(),
  theme: createListHost<ThemeRegistration>(),
});

export const clearGooseWordContributionSurfaces = (): void => {
  for (const surface of Object.values(gooseWordContributionSurfaces)) {
    for (const registration of surface.snapshot()) {
      surface.unregister(registration.id);
    }
  }
  activeEnterpriseId = null;
};

let activeEnterpriseId: string | null = null;

export const setActiveEnterpriseContext = (id: string): boolean => {
  const registration = gooseWordContributionSurfaces.enterpriseContext
    .snapshot()
    .find((row) => row.id === id);
  if (registration === undefined) {
    return false;
  }
  if (!isTenancyTier(registration.type)) {
    return false;
  }
  const hotLoadState = registration.hotLoadState ?? "idle";
  if (!isTenancyHotLoadAllowedInRegistry(registration.type, hotLoadState)) {
    return false;
  }
  activeEnterpriseId = id;
  return true;
};

export const getActiveEnterpriseContext = (): string | null => activeEnterpriseId;

export const isEnterpriseTenancyHotLoadAllowed = (
  tier: TenancyTier,
  hotLoadState: HotLoadState,
): boolean => isTenancyHotLoadAllowedInRegistry(tier, hotLoadState);

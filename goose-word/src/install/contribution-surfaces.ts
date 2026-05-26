import type { LocaleCode } from "../i18n/runtime.ts";
import type { MessageKey } from "../i18n/strings.ts";

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
  documentTemplate: createListHost<DocumentTemplateRegistration>(),
  enterpriseContext: createListHost<EnterpriseContextRegistration>(),
  theme: createListHost<ThemeRegistration>(),
});

let activeEnterpriseId: string | null = null;

export const setActiveEnterpriseContext = (id: string): boolean => {
  const exists = gooseWordContributionSurfaces.enterpriseContext
    .snapshot()
    .some((r) => r.id === id);
  if (exists) {
    activeEnterpriseId = id;
    return true;
  }
  return false;
};

export const getActiveEnterpriseContext = (): string | null => activeEnterpriseId;

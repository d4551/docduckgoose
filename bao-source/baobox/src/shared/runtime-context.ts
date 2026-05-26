import type { SchemaIssueCatalog } from "../error/catalog-types.js";
import { enUSCatalog } from "../error/locales/en.js";
import { LocaleCatalogEntries } from "../locale/index.js";
import { LocaleCodes, type LocaleIdentifier } from "./locale.js";
import type { SettingsOptions, TypeSystemPolicyOptions, TypeValidatorEntry } from "./registries.js";

type FormatValidator = (value: string) => boolean;

export interface RuntimeContextOptions {
  formats?: Iterable<readonly [string, FormatValidator]>;
  locale?: LocaleIdentifier;
  localeCatalogs?: Iterable<readonly [LocaleIdentifier, SchemaIssueCatalog]>;
  settings?: Partial<SettingsOptions>;
  typePolicy?: Partial<TypeSystemPolicyOptions>;
  types?: Iterable<readonly [string, TypeValidatorEntry]>;
}

const builtinLocaleCatalogEntries = LocaleCatalogEntries();

const defaultTypePolicy: TypeSystemPolicyOptions = {
  AllowNaN: false,
  AllowArrayObject: false,
  AllowNullVoid: true,
};

const defaultSettings: SettingsOptions = {
  correctiveParse: false,
};

let runtimeContextCounter = 0;

function cloneEntries<TValue>(
  entries: Iterable<readonly [string, TValue]>,
): Array<readonly [string, TValue]> {
  return Array.from(entries, ([key, value]) => [key, value] as const);
}

export class RuntimeContext {
  private readonly id = ++runtimeContextCounter;
  private revision = 0;
  private activeLocale: LocaleIdentifier;
  private readonly formatValidators = new Map<string, FormatValidator>();
  private readonly localeCatalogs = new Map<LocaleIdentifier, SchemaIssueCatalog>();
  private runtimeSettings: SettingsOptions;
  private readonly typeValidators = new Map<string, TypeValidatorEntry>();
  private typePolicy: TypeSystemPolicyOptions;

  readonly formatRegistry = {
    clear: (): void => {
      this.formatValidators.clear();
      this.touch();
    },
    delete: (name: string): boolean => {
      const deleted = this.formatValidators.delete(name);
      if (deleted) {
        this.touch();
      }
      return deleted;
    },
    entries: (): [string, FormatValidator][] => Array.from(this.formatValidators.entries()),
    get: (name: string): FormatValidator | undefined => this.formatValidators.get(name),
    has: (name: string): boolean => this.formatValidators.has(name),
    set: (name: string, validator: FormatValidator): void => {
      this.formatValidators.set(name, validator);
      this.touch();
    },
  };

  readonly locale = {
    ...LocaleCodes,
    entries: (): [LocaleIdentifier, SchemaIssueCatalog][] =>
      Array.from(this.localeCatalogs.entries()),
    get: (): LocaleIdentifier => this.activeLocale,
    getCatalog: (locale: LocaleIdentifier = this.activeLocale): SchemaIssueCatalog =>
      this.localeCatalogs.get(locale) ?? this.localeCatalogs.get(LocaleCodes.enUs) ?? enUSCatalog,
    has: (locale: LocaleIdentifier): boolean => this.localeCatalogs.has(locale),
    register: (locale: LocaleIdentifier, catalog: SchemaIssueCatalog): void => {
      this.localeCatalogs.set(locale, catalog);
      this.touch();
    },
    reset: (): void => {
      this.activeLocale = LocaleCodes.enUs;
      this.touch();
    },
    set: (locale: LocaleIdentifier): void => {
      this.activeLocale = locale;
      this.touch();
    },
  };

  readonly settings = {
    get: (): Readonly<SettingsOptions> => this.runtimeSettings,
    reset: (): void => {
      this.runtimeSettings = { ...defaultSettings };
      this.touch();
    },
    set: (options: Partial<SettingsOptions>): void => {
      this.runtimeSettings = { ...this.runtimeSettings, ...options };
      this.touch();
    },
  };

  readonly typeRegistry = {
    clear: (): void => {
      this.typeValidators.clear();
      this.touch();
    },
    delete: (kind: string): boolean => {
      const deleted = this.typeValidators.delete(kind);
      if (deleted) {
        this.touch();
      }
      return deleted;
    },
    entries: (): [string, TypeValidatorEntry][] => Array.from(this.typeValidators.entries()),
    get: (kind: string): TypeValidatorEntry | undefined => this.typeValidators.get(kind),
    has: (kind: string): boolean => this.typeValidators.has(kind),
    set: (kind: string, validator: TypeValidatorEntry): void => {
      this.typeValidators.set(kind, validator);
      this.touch();
    },
  };

  readonly typeSystemPolicy = {
    get: (): Readonly<TypeSystemPolicyOptions> => this.typePolicy,
    reset: (): void => {
      this.typePolicy = { ...defaultTypePolicy };
      this.touch();
    },
    set: (options: Partial<TypeSystemPolicyOptions>): void => {
      this.typePolicy = { ...this.typePolicy, ...options };
      this.touch();
    },
  };

  constructor(options: RuntimeContextOptions = {}) {
    this.activeLocale = options.locale ?? LocaleCodes.enUs;
    this.runtimeSettings = { ...defaultSettings, ...options.settings };
    this.typePolicy = { ...defaultTypePolicy, ...options.typePolicy };
    for (const [locale, catalog] of builtinLocaleCatalogEntries) {
      this.localeCatalogs.set(locale, catalog);
    }
    for (const [locale, catalog] of options.localeCatalogs ?? []) {
      this.localeCatalogs.set(locale, catalog);
    }
    for (const [name, validator] of options.formats ?? []) {
      this.formatValidators.set(name, validator);
    }
    for (const [kind, validator] of options.types ?? []) {
      this.typeValidators.set(kind, validator);
    }
  }

  clone(options: RuntimeContextOptions = {}): RuntimeContext {
    return new RuntimeContext({
      formats: [...cloneEntries(this.formatValidators.entries()), ...(options.formats ?? [])],
      locale: options.locale ?? this.activeLocale,
      localeCatalogs: [
        ...cloneEntries(this.localeCatalogs.entries()),
        ...(options.localeCatalogs ?? []),
      ],
      settings: { ...this.runtimeSettings, ...options.settings },
      typePolicy: { ...this.typePolicy, ...options.typePolicy },
      types: [...cloneEntries(this.typeValidators.entries()), ...(options.types ?? [])],
    });
  }

  cacheKey(namespace = "runtime"): string {
    return `${namespace}:${this.id}:${this.revision}`;
  }

  private touch(): void {
    this.revision += 1;
  }
}

const defaultRuntimeContext = new RuntimeContext();

export interface RuntimeContextCarrier {
  context?: RuntimeContext;
}

export type RuntimeContextArg = RuntimeContext | RuntimeContextCarrier | undefined;

export function CreateRuntimeContext(options: RuntimeContextOptions = {}): RuntimeContext {
  return new RuntimeContext(options);
}

export function getDefaultRuntimeContext(): RuntimeContext {
  return defaultRuntimeContext;
}

export function resolveRuntimeContext(context: RuntimeContextArg): RuntimeContext {
  if (context instanceof RuntimeContext) {
    return context;
  }
  return context?.context ?? defaultRuntimeContext;
}

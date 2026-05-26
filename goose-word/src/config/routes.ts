export const routePaths = {
  home: "/",
  docList: "/docs",
  docNew: "/docs/new",
  docEditPattern: "/docs/:id",
  docEdit: (id: string) => `/docs/${id}`,
  docPrintPattern: "/docs/:id/print",
  docPrint: (id: string) => `/docs/${id}/print`,
  docPreviewPattern: "/docs/:id/preview",
  docPreview: (id: string) => `/docs/${id}/preview`,
  docSavePattern: "/docs/:id/save",
  docSave: (id: string) => `/docs/${id}/save`,
  docDeletePattern: "/docs/:id/delete",
  docDelete: (id: string) => `/docs/${id}/delete`,
  docApiPattern: "/api/docs/:id",
  docApi: (id: string) => `/api/docs/${id}`,
  docsApi: "/api/docs",
  docsRowsFragment: "/fragments/docs-rows",
  settings: "/settings",
  settingsPlugins: "/settings/plugins",
  settingsPluginPanelPattern: "/settings/plugins/:id",
  settingsPluginPanel: (id: string) => `/settings/plugins/${id}`,
  settingsTabPattern: "/settings/tabs/:id",
  settingsTab: (id: string) => `/settings/tabs/${id}`,
  settingsEnterpriseActivatePattern: "/settings/enterprise/activate/:id",
  settingsEnterpriseActivate: (id: string) =>
    `/settings/enterprise/activate/${encodeURIComponent(id)}`,
  glassProof: "/glass-proof",
  enterpriseContextChip: "/fragments/enterprise-context",
  enterpriseSwitchPattern: "/fragments/enterprise-context/switch/:id",
  enterpriseSwitch: (id: string) =>
    `/fragments/enterprise-context/switch/${encodeURIComponent(id)}`,
  healthApi: "/api/health",
  speechStatusApi: "/api/speech",
  speechToTextApi: "/api/speech/transcribe",
  textToSpeechApi: "/api/speech/speak",
  spellcheckApi: "/api/spellcheck",
  preferencesApi: "/api/preferences",
  staticHtmx: "/vendor/htmx.min.js",
  staticDaisy: "/assets/goose-daisy.css",
  staticAppStyles: "/assets/goose-app.css",
  staticStyles: "/assets/goose-app.css",
  staticTokens: "/assets/baohaus-aurora-tokens.css",
  staticDensity: "/assets/baohaus-aurora-density.css",
  staticFont: (family: string, file: string) => `/assets/fonts/${family}/${file}`,
  staticFontPattern: "/assets/fonts/:family/:file",
  staticManifest: "/manifest.webmanifest",
  staticFavicon: "/favicon.ico",
  staticMermaid: "/vendor/mermaid.min.js",
  staticClient: "/assets/client",
  staticClientFile: (file: string) => `/assets/client/${file}`,
  staticClientPattern: "/assets/client/:file",
} as const;

export const docListPath = routePaths.docList;
export const docNewPath = routePaths.docNew;
export const docEditPath = routePaths.docEdit;
export const docPrintPath = routePaths.docPrint;
export const docPreviewPath = routePaths.docPreview;
export const docSavePath = routePaths.docSave;
export const docDeletePath = routePaths.docDelete;
export const docApiPath = routePaths.docApi;
export const docsApiPath = routePaths.docsApi;
export const docsRowsFragmentPath = routePaths.docsRowsFragment;
export const settingsPath = routePaths.settings;
export const settingsPluginsPath = routePaths.settingsPlugins;
export const settingsEnterpriseActivatePath = routePaths.settingsEnterpriseActivatePattern;
export const settingsEnterpriseActivate = routePaths.settingsEnterpriseActivate;
export const enterpriseContextChipPath = routePaths.enterpriseContextChip;
export const enterpriseSwitchPath = routePaths.enterpriseSwitchPattern;
export const enterpriseSwitch = routePaths.enterpriseSwitch;
export const healthApiPath = routePaths.healthApi;
export const speechStatusApiPath = routePaths.speechStatusApi;
export const speechToTextApiPath = routePaths.speechToTextApi;
export const textToSpeechApiPath = routePaths.textToSpeechApi;
export const preferencesApiPath = routePaths.preferencesApi;

export const ROUTES = {
  home: routePaths.home,
  docs: {
    list: routePaths.docList,
    new: routePaths.docNew,
    editPattern: routePaths.docEditPattern,
    edit: routePaths.docEdit,
    printPattern: routePaths.docPrintPattern,
    print: routePaths.docPrint,
    savePattern: routePaths.docSavePattern,
    save: routePaths.docSave,
    deletePattern: routePaths.docDeletePattern,
    delete: routePaths.docDelete,
    previewPattern: routePaths.docPreviewPattern,
    preview: routePaths.docPreview,
    create: routePaths.docsApi,
    rowsFragment: routePaths.docsRowsFragment,
    apiPattern: routePaths.docApiPattern,
  },
  settings: {
    home: routePaths.settings,
    plugins: routePaths.settingsPlugins,
    pluginPanelPattern: routePaths.settingsPluginPanelPattern,
    pluginPanel: routePaths.settingsPluginPanel,
    tabPattern: routePaths.settingsTabPattern,
    tab: routePaths.settingsTab,
    enterpriseActivatePattern: routePaths.settingsEnterpriseActivatePattern,
    enterpriseActivate: routePaths.settingsEnterpriseActivate,
    enterpriseContextChip: routePaths.enterpriseContextChip,
    enterpriseSwitchPattern: routePaths.enterpriseSwitchPattern,
    enterpriseSwitch: routePaths.enterpriseSwitch,
  },
  glassProof: routePaths.glassProof,
  api: {
    health: routePaths.healthApi,
    speech: routePaths.speechStatusApi,
    transcribe: routePaths.speechToTextApi,
    speak: routePaths.textToSpeechApi,
    spellcheck: routePaths.spellcheckApi,
    preferences: routePaths.preferencesApi,
  },
  static: {
    htmx: routePaths.staticHtmx,
    client: routePaths.staticClient,
    clientFile: routePaths.staticClientFile,
    clientPattern: routePaths.staticClientPattern,
    daisy: routePaths.staticDaisy,
    appStyles: routePaths.staticAppStyles,
    styles: routePaths.staticStyles,
    tokens: routePaths.staticTokens,
    density: routePaths.staticDensity,
    font: routePaths.staticFont,
    fontPattern: routePaths.staticFontPattern,
    manifest: routePaths.staticManifest,
    favicon: routePaths.staticFavicon,
    mermaid: routePaths.staticMermaid,
  },
} as const;

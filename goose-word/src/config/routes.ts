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
  docTemplateCreatePattern: "/docs/:id/templates",
  docTemplateCreate: (id: string) => `/docs/${id}/templates`,
  docDeletePattern: "/docs/:id/delete",
  docDelete: (id: string) => `/docs/${id}/delete`,
  userTemplateDeletePattern: "/templates/:id/delete",
  userTemplateDelete: (id: string) => `/templates/${id}/delete`,
  userTemplateEditPattern: "/templates/:id/edit",
  userTemplateEdit: (id: string) => `/templates/${id}/edit`,
  docApiPattern: "/api/docs/:id",
  docApi: (id: string) => `/api/docs/${id}`,
  docsApi: "/api/docs",
  settings: "/settings",
  settingsPlugins: "/settings/plugins",
  settingsPluginTogglePattern: "/settings/plugins/:id/toggle",
  settingsPluginToggle: (id: string) => `/settings/plugins/${encodeURIComponent(id)}/toggle`,
  settingsPluginPanelPattern: "/settings/plugins/:id",
  settingsPluginPanel: (id: string) => `/settings/plugins/${id}`,
  settingsTabPattern: "/settings/tabs/:id",
  settingsTab: (id: string) => `/settings/tabs/${id}`,
  settingsEnterpriseActivatePattern: "/settings/enterprise/activate/:id",
  settingsEnterpriseActivate: (id: string) =>
    `/settings/enterprise/activate/${encodeURIComponent(id)}`,
  glassProof: "/glass-proof",
  dockNavFragment: "/fragments/dock-nav",
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
  pluginDispatchPattern: "/*",
  staticHtmx: "/vendor/htmx.min.js",
  staticDaisy: "/assets/goose-daisy.css",
  staticAppStyles: "/assets/goose-app.css",
  staticStyles: "/assets/goose-app.css",
  staticTokens: "/assets/baohaus-aurora-tokens.css",
  staticDensity: "/assets/baohaus-aurora-density.css",
  staticFont: (family: string, file: string) => `/assets/fonts/${family}/${file}`,
  staticFontPattern: "/assets/fonts/:family/:file",
  staticFontFaces: "/assets/font-faces.css",
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
export const docTemplateCreatePath = routePaths.docTemplateCreate;
export const docDeletePath = routePaths.docDelete;
export const userTemplateDeletePath = routePaths.userTemplateDelete;
export const userTemplateEditPath = routePaths.userTemplateEdit;
export const docApiPath = routePaths.docApi;
export const docsApiPath = routePaths.docsApi;
export const settingsPath = routePaths.settings;
export const settingsPluginsPath = routePaths.settingsPlugins;
export const settingsPluginTogglePath = routePaths.settingsPluginTogglePattern;
export const settingsPluginToggle = routePaths.settingsPluginToggle;
export const settingsEnterpriseActivatePath = routePaths.settingsEnterpriseActivatePattern;
export const settingsEnterpriseActivate = routePaths.settingsEnterpriseActivate;
export const dockNavFragmentPath = routePaths.dockNavFragment;
export const enterpriseContextChipPath = routePaths.enterpriseContextChip;
export const enterpriseSwitchPath = routePaths.enterpriseSwitchPattern;
export const enterpriseSwitch = routePaths.enterpriseSwitch;
export const healthApiPath = routePaths.healthApi;
export const speechStatusApiPath = routePaths.speechStatusApi;
export const speechToTextApiPath = routePaths.speechToTextApi;
export const textToSpeechApiPath = routePaths.textToSpeechApi;
export const preferencesApiPath = routePaths.preferencesApi;

/**
 * SSOT subset of API routes intended for client-side consumption.
 * Injected into the page shell via data attributes. Client JS must read from
 * the DOM (never hardcode or maintain a parallel map).
 */
export const CLIENT_API_ROUTES = Object.freeze({
  health: healthApiPath,
  speech: speechStatusApiPath,
  transcribe: speechToTextApiPath,
  speak: textToSpeechApiPath,
  preferences: preferencesApiPath,
  dockNavFragment: dockNavFragmentPath,
  enterpriseContextChip: enterpriseContextChipPath,
});

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
    templateCreatePattern: routePaths.docTemplateCreatePattern,
    templateCreate: routePaths.docTemplateCreate,
    deletePattern: routePaths.docDeletePattern,
    delete: routePaths.docDelete,
    userTemplateDeletePattern: routePaths.userTemplateDeletePattern,
    userTemplateDelete: routePaths.userTemplateDelete,
    userTemplateEditPattern: routePaths.userTemplateEditPattern,
    userTemplateEdit: routePaths.userTemplateEdit,
    previewPattern: routePaths.docPreviewPattern,
    preview: routePaths.docPreview,
    create: routePaths.docsApi,
    apiPattern: routePaths.docApiPattern,
  },
  settings: {
    home: routePaths.settings,
    plugins: routePaths.settingsPlugins,
    pluginTogglePattern: routePaths.settingsPluginTogglePattern,
    pluginToggle: routePaths.settingsPluginToggle,
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
  plugins: {
    dispatchPattern: routePaths.pluginDispatchPattern,
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
    fontFaces: routePaths.staticFontFaces,
    manifest: routePaths.staticManifest,
    favicon: routePaths.staticFavicon,
    mermaid: routePaths.staticMermaid,
  },
} as const;

export interface ThemeRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly labelKey: string;
  readonly descriptionKey?: string;
  readonly dataTheme: string;
  readonly cssHref?: string;
}

const plugin = {
  createThemeRegistrations() {
    return [
      {
        id: "theme-aurora-glass-bao:glass",
        extensionId: "theme-aurora-glass-bao",
        labelKey: "theme.glass",
        descriptionKey: "theme.glass.desc",
        dataTheme: "bao-aurora-glass",
      },
    ];
  },
};

export default plugin;

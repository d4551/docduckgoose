export const BAO_ECOSYSTEM_LEXICON = {
  composer: ".bao Composer",
  intelligence: ".bao Intelligence",
  intelligenceApi: ".bao Intelligence API",
  intelligenceGateway: ".bao Intelligence Gateway",
  intelligenceHub: ".bao Intelligence Hub",
  intelligenceModels: ".bao models",
  intelligencePlayground: ".bao playground",
  intelligenceProviders: ".bao providers",
  systemIntelligence: ".bao system intelligence",
  systemIntelligenceConfigurator: ".bao system intelligence configurator",
} as const;

export type BaoEcosystemLexiconKey = keyof typeof BAO_ECOSYSTEM_LEXICON;

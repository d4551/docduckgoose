import type { SchemaIssueCatalog } from "../error/catalog-types.js";
import { deDECatalog } from "../error/locales/de.js";
import { enUSCatalog } from "../error/locales/en.js";
import { esESCatalog } from "../error/locales/es.js";
import { frFRCatalog } from "../error/locales/fr.js";
import { jaJPCatalog } from "../error/locales/ja.js";
import { koKRCatalog } from "../error/locales/ko.js";
import { ptBRCatalog } from "../error/locales/pt.js";
import { zhHansCatalog, zhHantCatalog } from "../error/locales/zh.js";
import { type LocaleCode, LocaleCodes } from "../shared/locale.js";

export const ar001: SchemaIssueCatalog = enUSCatalog;
export const bnBd: SchemaIssueCatalog = enUSCatalog;
export const csCz: SchemaIssueCatalog = enUSCatalog;
export const deDe: SchemaIssueCatalog = deDECatalog;
export const elGr: SchemaIssueCatalog = enUSCatalog;
export const enUs: SchemaIssueCatalog = enUSCatalog;
export const es419: SchemaIssueCatalog = esESCatalog;
export const esAr: SchemaIssueCatalog = esESCatalog;
export const esEs: SchemaIssueCatalog = esESCatalog;
export const esMx: SchemaIssueCatalog = esESCatalog;
export const faIr: SchemaIssueCatalog = enUSCatalog;
export const filPh: SchemaIssueCatalog = enUSCatalog;
export const frCa: SchemaIssueCatalog = frFRCatalog;
export const frFr: SchemaIssueCatalog = frFRCatalog;
export const haNg: SchemaIssueCatalog = enUSCatalog;
export const hiIn: SchemaIssueCatalog = enUSCatalog;
export const huHu: SchemaIssueCatalog = enUSCatalog;
export const idId: SchemaIssueCatalog = enUSCatalog;
export const itIt: SchemaIssueCatalog = enUSCatalog;
export const jaJp: SchemaIssueCatalog = jaJPCatalog;
export const koKr: SchemaIssueCatalog = koKRCatalog;
export const msMy: SchemaIssueCatalog = enUSCatalog;
export const nlNl: SchemaIssueCatalog = enUSCatalog;
export const plPl: SchemaIssueCatalog = enUSCatalog;
export const ptBr: SchemaIssueCatalog = ptBRCatalog;
export const ptPt: SchemaIssueCatalog = ptBRCatalog;
export const roRo: SchemaIssueCatalog = enUSCatalog;
export const ruRu: SchemaIssueCatalog = enUSCatalog;
export const svSe: SchemaIssueCatalog = enUSCatalog;
export const swTz: SchemaIssueCatalog = enUSCatalog;
export const thTh: SchemaIssueCatalog = enUSCatalog;
export const trTr: SchemaIssueCatalog = enUSCatalog;
export const ukUa: SchemaIssueCatalog = enUSCatalog;
export const urPk: SchemaIssueCatalog = enUSCatalog;
export const viVn: SchemaIssueCatalog = enUSCatalog;
export const yoNg: SchemaIssueCatalog = enUSCatalog;
export const zhHans: SchemaIssueCatalog = zhHansCatalog;
export const zhHant: SchemaIssueCatalog = zhHantCatalog;

export const OfficialLocaleCatalogs = {
  [LocaleCodes.ar001]: ar001,
  [LocaleCodes.bnBd]: bnBd,
  [LocaleCodes.csCz]: csCz,
  [LocaleCodes.deDe]: deDe,
  [LocaleCodes.elGr]: elGr,
  [LocaleCodes.enUs]: enUs,
  [LocaleCodes.es419]: es419,
  [LocaleCodes.esAr]: esAr,
  [LocaleCodes.esEs]: esEs,
  [LocaleCodes.esMx]: esMx,
  [LocaleCodes.faIr]: faIr,
  [LocaleCodes.filPh]: filPh,
  [LocaleCodes.frCa]: frCa,
  [LocaleCodes.frFr]: frFr,
  [LocaleCodes.haNg]: haNg,
  [LocaleCodes.hiIn]: hiIn,
  [LocaleCodes.huHu]: huHu,
  [LocaleCodes.idId]: idId,
  [LocaleCodes.itIt]: itIt,
  [LocaleCodes.jaJp]: jaJp,
  [LocaleCodes.koKr]: koKr,
  [LocaleCodes.msMy]: msMy,
  [LocaleCodes.nlNl]: nlNl,
  [LocaleCodes.plPl]: plPl,
  [LocaleCodes.ptBr]: ptBr,
  [LocaleCodes.ptPt]: ptPt,
  [LocaleCodes.roRo]: roRo,
  [LocaleCodes.ruRu]: ruRu,
  [LocaleCodes.svSe]: svSe,
  [LocaleCodes.swTz]: swTz,
  [LocaleCodes.thTh]: thTh,
  [LocaleCodes.trTr]: trTr,
  [LocaleCodes.ukUa]: ukUa,
  [LocaleCodes.urPk]: urPk,
  [LocaleCodes.viVn]: viVn,
  [LocaleCodes.yoNg]: yoNg,
  [LocaleCodes.zhHans]: zhHans,
  [LocaleCodes.zhHant]: zhHant,
} satisfies Record<LocaleCode, SchemaIssueCatalog>;

export function LocaleCatalogEntries(): [LocaleCode, SchemaIssueCatalog][] {
  return Object.values(LocaleCodes).map((locale) => [locale, OfficialLocaleCatalogs[locale]]);
}

export const LocalePacks = {
  ar001,
  bnBd,
  csCz,
  deDe,
  elGr,
  enUs,
  es419,
  esAr,
  esEs,
  esMx,
  faIr,
  filPh,
  frCa,
  frFr,
  haNg,
  hiIn,
  huHu,
  idId,
  itIt,
  jaJp,
  koKr,
  msMy,
  nlNl,
  plPl,
  ptBr,
  ptPt,
  roRo,
  ruRu,
  svSe,
  swTz,
  thTh,
  trTr,
  ukUa,
  urPk,
  viVn,
  yoNg,
  zhHans,
  zhHant,
} as const satisfies Record<keyof typeof LocaleCodes, SchemaIssueCatalog>;

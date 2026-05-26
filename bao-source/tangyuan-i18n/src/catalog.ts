import type { SupportedLocale } from "./bcp47.js";

export type MessageCatalog = Readonly<Record<string, string>>;

export type CatalogBundle = Readonly<Record<SupportedLocale, MessageCatalog>>;

const EN_GB: MessageCatalog = {
  "validation.required": "This field is required.",
  "validation.email": "Enter a valid email address.",
  "validation.tooShort": "Value is too short (minimum {min, number} characters).",
  "validation.tooLong": "Value is too long (maximum {max, number} characters).",
  "pagination.summary":
    "{count, plural, =0 {No results} one {# result} other {# results}} of {total, number}.",
};

const EN_US: MessageCatalog = {
  ...EN_GB,
  "validation.tooShort": "Value is too short (minimum {min, number} characters).",
};

const FR_FR: MessageCatalog = {
  "validation.required": "Ce champ est obligatoire.",
  "validation.email": "Saisissez une adresse e-mail valide.",
  "validation.tooShort": "Valeur trop courte (minimum {min, number} caractères).",
  "validation.tooLong": "Valeur trop longue (maximum {max, number} caractères).",
  "pagination.summary":
    "{count, plural, =0 {Aucun résultat} one {# résultat} other {# résultats}} sur {total, number}.",
};

const DE_DE: MessageCatalog = {
  "validation.required": "Dieses Feld ist erforderlich.",
  "validation.email": "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  "validation.tooShort": "Wert zu kurz (mindestens {min, number} Zeichen).",
  "validation.tooLong": "Wert zu lang (maximal {max, number} Zeichen).",
  "pagination.summary":
    "{count, plural, =0 {Keine Ergebnisse} one {# Ergebnis} other {# Ergebnisse}} von {total, number}.",
};

const ES_ES: MessageCatalog = {
  "validation.required": "Este campo es obligatorio.",
  "validation.email": "Introduzca una dirección de correo válida.",
  "validation.tooShort": "Valor demasiado corto (mínimo {min, number} caracteres).",
  "validation.tooLong": "Valor demasiado largo (máximo {max, number} caracteres).",
  "pagination.summary":
    "{count, plural, =0 {Sin resultados} one {# resultado} other {# resultados}} de {total, number}.",
};

const IT_IT: MessageCatalog = {
  "validation.required": "Questo campo è obbligatorio.",
  "validation.email": "Inserisci un indirizzo email valido.",
  "validation.tooShort": "Valore troppo corto (minimo {min, number} caratteri).",
  "validation.tooLong": "Valore troppo lungo (massimo {max, number} caratteri).",
  "pagination.summary":
    "{count, plural, =0 {Nessun risultato} one {# risultato} other {# risultati}} su {total, number}.",
};

const JA_JP: MessageCatalog = {
  "validation.required": "この項目は必須です。",
  "validation.email": "有効なメールアドレスを入力してください。",
  "validation.tooShort": "値が短すぎます（最小{min, number}文字）。",
  "validation.tooLong": "値が長すぎます（最大{max, number}文字）。",
  "pagination.summary": "{total, number}件中{count, number}件の結果。",
};

const ZH_CN: MessageCatalog = {
  "validation.required": "此字段为必填项。",
  "validation.email": "请输入有效的电子邮件地址。",
  "validation.tooShort": "值过短（最少 {min, number} 个字符）。",
  "validation.tooLong": "值过长（最多 {max, number} 个字符）。",
  "pagination.summary": "共 {total, number} 条中的 {count, number} 条结果。",
};

export const SEED_CATALOGS: CatalogBundle = {
  "en-GB": EN_GB,
  "en-US": EN_US,
  "fr-FR": FR_FR,
  "de-DE": DE_DE,
  "es-ES": ES_ES,
  "it-IT": IT_IT,
  "ja-JP": JA_JP,
  "zh-CN": ZH_CN,
};

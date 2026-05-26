export const BAO_CHAT_BUBBLE_I18N_NAMESPACE = "ai.chat.bubble";

export function resolveBaoChatBubbleI18nKey(
  suffix: string,
): `${typeof BAO_CHAT_BUBBLE_I18N_NAMESPACE}.${string}` {
  return `${BAO_CHAT_BUBBLE_I18N_NAMESPACE}.${suffix}`;
}

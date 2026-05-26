package com.google.ai.edge.gallery.ui.common.textandvoiceinput

import java.util.Locale

/** Availability state for Android speech recognition on the current device/runtime. */
data class SpeechRecognitionSupportState(
  val available: Boolean,
  val selectedLocaleTag: String,
  val supportedLocaleTags: List<String>,
  val status: SpeechRecognitionSupportStatus,
)

/** Deterministic status codes for speech-recognition readiness. */
enum class SpeechRecognitionSupportStatus {
  AVAILABLE,
  UNAVAILABLE,
}

/** Resolve a stable speech-recognition support state from platform and preference inputs. */
fun resolveSpeechRecognitionSupportState(
  recognitionAvailable: Boolean,
  savedLanguageTag: String,
  supportedLanguageTags: List<String>,
  defaultLocaleTag: String = Locale.getDefault().toLanguageTag(),
): SpeechRecognitionSupportState {
  val normalizedSupportedLocaleTags =
    supportedLanguageTags
      .map { languageTag -> Locale.forLanguageTag(languageTag).toLanguageTag() }
      .filter { languageTag ->
        languageTag.isNotBlank() && Locale.forLanguageTag(languageTag).language.isNotBlank()
      }
      .distinct()
      .sorted()
  if (!recognitionAvailable) {
    return SpeechRecognitionSupportState(
      available = false,
      selectedLocaleTag = "",
      supportedLocaleTags = listOf(),
      status = SpeechRecognitionSupportStatus.UNAVAILABLE,
    )
  }
  val normalizedSavedTag = Locale.forLanguageTag(savedLanguageTag.trim()).toLanguageTag()
  val fallbackLocaleTag = Locale.forLanguageTag(defaultLocaleTag).toLanguageTag()
  val selectedLocaleTag =
    when {
      normalizedSavedTag.isNotBlank() && normalizedSupportedLocaleTags.contains(normalizedSavedTag) -> normalizedSavedTag
      normalizedSupportedLocaleTags.contains(fallbackLocaleTag) -> fallbackLocaleTag
      normalizedSupportedLocaleTags.isNotEmpty() -> normalizedSupportedLocaleTags.first()
      else -> fallbackLocaleTag
    }
  return SpeechRecognitionSupportState(
    available = true,
    selectedLocaleTag = selectedLocaleTag,
    supportedLocaleTags = normalizedSupportedLocaleTags.ifEmpty { listOf(fallbackLocaleTag) },
    status = SpeechRecognitionSupportStatus.AVAILABLE,
  )
}

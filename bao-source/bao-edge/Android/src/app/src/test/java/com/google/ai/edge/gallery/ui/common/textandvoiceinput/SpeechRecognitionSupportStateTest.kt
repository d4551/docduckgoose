package com.google.ai.edge.gallery.ui.common.textandvoiceinput

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class SpeechRecognitionSupportStateTest {
  @Test
  fun resolveSpeechRecognitionSupportState_returnsUnavailableWhenRecognizerMissing() {
    val state =
      resolveSpeechRecognitionSupportState(
        recognitionAvailable = false,
        savedLanguageTag = "fr-FR",
        supportedLanguageTags = listOf("en-US", "fr-FR"),
      )

    assertFalse(state.available)
    assertEquals("", state.selectedLocaleTag)
    assertTrue(state.supportedLocaleTags.isEmpty())
    assertEquals(SpeechRecognitionSupportStatus.UNAVAILABLE, state.status)
  }

  @Test
  fun resolveSpeechRecognitionSupportState_prefersSavedLocaleWhenSupported() {
    val state =
      resolveSpeechRecognitionSupportState(
        recognitionAvailable = true,
        savedLanguageTag = "fr-FR",
        supportedLanguageTags = listOf("en-US", "fr-FR"),
        defaultLocaleTag = "en-US",
      )

    assertTrue(state.available)
    assertEquals("fr-FR", state.selectedLocaleTag)
    assertEquals(listOf("en-US", "fr-FR"), state.supportedLocaleTags)
  }

  @Test
  fun resolveSpeechRecognitionSupportState_fallsBackToDefaultThenFirstSupportedLocale() {
    val defaultFallback =
      resolveSpeechRecognitionSupportState(
        recognitionAvailable = true,
        savedLanguageTag = "de-DE",
        supportedLanguageTags = listOf("en-US", "fr-FR"),
        defaultLocaleTag = "fr-FR",
      )
    val firstSupportedFallback =
      resolveSpeechRecognitionSupportState(
        recognitionAvailable = true,
        savedLanguageTag = "de-DE",
        supportedLanguageTags = listOf("en-US", "fr-FR"),
        defaultLocaleTag = "es-ES",
      )

    assertEquals("fr-FR", defaultFallback.selectedLocaleTag)
    assertEquals("en-US", firstSupportedFallback.selectedLocaleTag)
  }
}

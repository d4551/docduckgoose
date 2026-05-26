/*
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.google.ai.edge.gallery.ui.common.textandvoiceinput

import android.app.Activity
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import androidx.core.os.bundleOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.data.PreferencesStore
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import java.util.Locale
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlin.coroutines.resume

private const val TAG = "AGHTD"

private const val AUDIO_METER_MIN_DB = -2.0f
private const val AUDIO_METER_MAX_DB = 100.0f

/** The UI state of the HoldToDictateViewModel. */
data class HoldToDictateUiState(
  val recognizing: Boolean = false,
  val recognizedText: String = "",
  val recognitionAvailable: Boolean = false,
  val selectedLanguageTag: String = "",
  val supportedLanguageTags: List<String> = listOf(),
  val statusMessage: String = "",
)

/** Manages the shared speech-recognition availability and dictation state. */
@HiltViewModel
class HoldToDictateViewModel
@Inject
constructor(
  @ApplicationContext private val context: Context,
  private val preferencesStore: PreferencesStore,
) : ViewModel(), RecognitionListener {
  protected val _uiState = MutableStateFlow(HoldToDictateUiState())
  val uiState = _uiState.asStateFlow()

  private var speechRecognizer: SpeechRecognizer? = null
  private var onRecognitionDone: ((String) -> Unit)? = null
  private var onAmplitudeChanged: ((Int) -> Unit)? = null

  init {
    refreshRecognitionSupport()
  }

  /** Refreshes recognizer availability and its supported language list. */
  fun refreshRecognitionSupport() {
    viewModelScope.launch {
      if (!SpeechRecognizer.isRecognitionAvailable(context)) {
        val supportState =
          resolveSpeechRecognitionSupportState(
            recognitionAvailable = false,
            savedLanguageTag = "",
            supportedLanguageTags = listOf(),
          )
        _uiState.update {
          it.copy(
            recognitionAvailable = supportState.available,
            selectedLanguageTag = supportState.selectedLocaleTag,
            supportedLanguageTags = supportState.supportedLocaleTags,
            statusMessage = context.getString(R.string.settings_dictation_language_unavailable),
          )
        }
        speechRecognizer?.destroy()
        speechRecognizer = null
        return@launch
      }

      if (speechRecognizer == null) {
        speechRecognizer =
          runCatching {
            SpeechRecognizer.createSpeechRecognizer(context).apply {
              setRecognitionListener(this@HoldToDictateViewModel)
            }
          }.getOrNull()
      }

      if (speechRecognizer == null) {
        val supportState =
          resolveSpeechRecognitionSupportState(
            recognitionAvailable = false,
            savedLanguageTag = "",
            supportedLanguageTags = listOf(),
          )
        _uiState.update {
          it.copy(
            recognitionAvailable = supportState.available,
            selectedLanguageTag = supportState.selectedLocaleTag,
            supportedLanguageTags = supportState.supportedLocaleTags,
            statusMessage = context.getString(R.string.settings_dictation_language_unavailable),
          )
        }
        return@launch
      }

      val operatorPreferences = preferencesStore.readOperatorPreferences()
      val supportState =
        resolveSpeechRecognitionSupportState(
          recognitionAvailable = true,
          savedLanguageTag = operatorPreferences.speechRecognitionLanguageTag,
          supportedLanguageTags = resolveSupportedLanguageTags(),
        )
      _uiState.update {
        it.copy(
          recognitionAvailable = supportState.available,
          selectedLanguageTag = supportState.selectedLocaleTag,
          supportedLanguageTags = supportState.supportedLocaleTags,
          statusMessage = "",
        )
      }
    }
  }

  /** Persists the preferred recognition language and updates the active UI state. */
  fun updateRecognitionLanguage(languageTag: String) {
    val normalizedTag =
      resolveSpeechRecognitionSupportState(
        recognitionAvailable = true,
        savedLanguageTag = languageTag,
        supportedLanguageTags = uiState.value.supportedLanguageTags,
      ).selectedLocaleTag
    _uiState.update { it.copy(selectedLanguageTag = normalizedTag) }
    viewModelScope.launch {
      preferencesStore.saveSpeechRecognitionLanguageTag(languageTag = normalizedTag)
    }
  }

  /** Starts recognition when the runtime supports speech input. */
  fun startSpeechRecognition(onDone: (String) -> Unit, onAmplitudeChanged: (Int) -> Unit) {
    onRecognitionDone = onDone
    this.onAmplitudeChanged = onAmplitudeChanged
    val recognizer = speechRecognizer
    if (recognizer == null || !uiState.value.recognitionAvailable) {
      refreshRecognitionSupport()
      return
    }

    runCatching {
      recognizer.startListening(createRecognizerIntent(languageTag = uiState.value.selectedLanguageTag))
    }.onSuccess {
      setRecognizedText(text = "")
      setRecognizing(recognizing = true)
    }.onFailure {
      speechRecognizer?.destroy()
      speechRecognizer = null
      _uiState.update {
        it.copy(
          recognitionAvailable = false,
          statusMessage = context.getString(R.string.settings_dictation_language_unavailable),
        )
      }
    }
  }

  /** Stops the active recognition session after the press gesture ends. */
  fun stopSpeechRecognition() {
    viewModelScope.launch {
      delay(500)
      speechRecognizer?.stopListening()
      setRecognizing(recognizing = false)
    }
  }

  /** Cancels the active recognition gesture without submitting text. */
  fun cancelSpeechRecognition() {
    speechRecognizer?.cancel()
    setRecognizing(recognizing = false)
  }

  /** Updates the transient recognition state. */
  fun setRecognizing(recognizing: Boolean) {
    _uiState.update { uiState.value.copy(recognizing = recognizing) }
  }

  /** Updates the currently recognized partial or final transcript. */
  fun setRecognizedText(text: String) {
    _uiState.update { uiState.value.copy(recognizedText = text) }
  }

  override fun onReadyForSpeech(params: Bundle?) {}

  override fun onBeginningOfSpeech() {}

  override fun onRmsChanged(rmsdB: Float) {
    onAmplitudeChanged?.invoke(convertRmsDbToAmplitude(rmsdB = rmsdB))
  }

  override fun onBufferReceived(buffer: ByteArray?) {}

  override fun onEndOfSpeech() {}

  override fun onError(error: Int) {
    setRecognizing(recognizing = false)
  }

  override fun onResults(results: Bundle?) {
    val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
    if (matches != null && matches.size > 0) {
      setRecognizedText(matches.get(0) ?: "")
    } else {
      setRecognizedText("")
    }

    val curOnRecognitionDone = onRecognitionDone
    if (curOnRecognitionDone != null) {
      curOnRecognitionDone(uiState.value.recognizedText)
    }

    setRecognizing(recognizing = false)
  }

  override fun onPartialResults(partialResults: Bundle?) {
    val matches = partialResults?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
    if (matches != null && matches.size > 0) {
      setRecognizedText(matches.get(0) ?: "")
    } else {
      setRecognizedText("")
    }
  }

  override fun onEvent(eventType: Int, params: Bundle?) {}

  override fun onCleared() {
    speechRecognizer?.destroy()
    speechRecognizer = null
    super.onCleared()
  }

  private fun createRecognizerIntent(languageTag: String): Intent =
    Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
      putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
      if (languageTag.isNotBlank()) {
        putExtra(RecognizerIntent.EXTRA_LANGUAGE, languageTag)
      }
      putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
      putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
    }

  private suspend fun resolveSupportedLanguageTags(): List<String> {
    val languageTags =
      fetchRecognizerLanguageTags().ifEmpty {
        listOf(Locale.getDefault().toLanguageTag())
      }
    return languageTags
      .map { languageTag -> Locale.forLanguageTag(languageTag).toLanguageTag() }
      .filter { tag -> tag.isNotBlank() && Locale.forLanguageTag(tag).language.isNotBlank() }
      .distinct()
      .sorted()
  }

  private suspend fun fetchRecognizerLanguageTags(): List<String> =
    kotlinx.coroutines.suspendCancellableCoroutine { continuation ->
      val receiver =
        object : BroadcastReceiver() {
          override fun onReceive(context: Context?, intent: Intent?) {
            if (!continuation.isActive) {
              return
            }
            val extras = getResultExtras(true) ?: bundleOf()
            val supportedLanguages =
              extras.getStringArrayList(RecognizerIntent.EXTRA_SUPPORTED_LANGUAGES).orEmpty()
            continuation.resume(supportedLanguages)
          }
        }
      context.sendOrderedBroadcast(
        Intent(RecognizerIntent.ACTION_GET_LANGUAGE_DETAILS),
        null,
        receiver,
        Handler(Looper.getMainLooper()),
        Activity.RESULT_OK,
        null,
        null,
      )
    }
}

private fun convertRmsDbToAmplitude(rmsdB: Float): Int {
  // Clamp the input value to the defined range
  var clampedRmsdB = Math.max(rmsdB, AUDIO_METER_MIN_DB)
  clampedRmsdB = Math.min(clampedRmsdB, AUDIO_METER_MAX_DB)

  // Linear scaling to a 0-65535 range
  return ((clampedRmsdB - AUDIO_METER_MIN_DB) * 65535f / (AUDIO_METER_MAX_DB - AUDIO_METER_MIN_DB))
    .toInt()
}

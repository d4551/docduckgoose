package com.google.ai.edge.gallery.data

import android.content.Context
import androidx.core.content.edit
import com.google.ai.edge.gallery.common.BaoEdgeRuntimeConfig
import com.google.gson.Gson
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

private const val OPERATOR_PREFERENCES_NAME = "bao_edge_operator_preferences"
private const val KEY_CONTROL_PLANE_BASE_URL = "control_plane_base_url"
private const val KEY_RUNTIME_ASSIGNMENTS = "runtime_assignments"
private const val KEY_CLOUD_MODEL_SOURCE = "cloud_model_source"
private const val KEY_PROVIDER_BASE_URL = "provider_base_url"
private const val KEY_PROVIDER_PROFILES = "provider_profiles"
private const val KEY_ACTIVE_PROVIDER_PROFILES = "active_provider_profiles"
private const val KEY_CLOUD_PULL_SOURCE = "cloud_pull_source"
private const val KEY_CLOUD_PULL_TIMEOUT_MS = "cloud_pull_timeout_ms"
private const val KEY_CLOUD_PULL_FORCE = "cloud_pull_force"
private const val KEY_CLOUD_CHAT_REQUEST_TTS = "cloud_chat_request_tts"
private const val KEY_CLOUD_CHAT_TTS_OUTPUT_MIME_TYPE = "cloud_chat_tts_output_mime_type"
private const val KEY_CLOUD_CHAT_TTS_VOICE = "cloud_chat_tts_voice"
private const val KEY_SPEECH_RECOGNITION_LANGUAGE_TAG = "speech_recognition_language_tag"

/** Stable capability usages that can bind to different cloud/local runtimes. */
enum class OperatorRuntimeUsage(val wireValue: String) {
  /** Primary conversation thread replies. */
  CHAT("chat"),

  /** Automation planning and execution requests. */
  AUTOMATION("automation"),

  /** Image-capable generation or analysis requests. */
  IMAGE("image"),

  /** Flow-generation authoring requests. */
  FLOW_GENERATION("flow_generation"),

  /** Speech-to-text or speech-understanding requests. */
  SPEECH_INPUT("speech_input"),

  /** Text-to-speech or voiced reply requests. */
  SPEECH_OUTPUT("speech_output");

  companion object {
    /** Ordered settings presentation for runtime assignments. */
    val ordered: List<OperatorRuntimeUsage> =
      listOf(CHAT, AUTOMATION, IMAGE, FLOW_GENERATION, SPEECH_INPUT, SPEECH_OUTPUT)
  }
}

/** Per-capability runtime binding persisted by operator settings. */
data class OperatorRuntimeAssignment(
  val provider: String = "",
  val model: String = "",
  val source: String = BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
)

/** Non-secret provider profile metadata persisted outside secure storage. */
data class OperatorProviderProfile(
  val providerId: String,
  val profileId: String,
  val displayName: String,
  val baseUrl: String = "",
)

/** Persisted capability-scoped runtime bindings for the native operator shell. */
data class OperatorRuntimeAssignments(
  val chat: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
  val automation: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
  val image: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
  val flowGeneration: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
  val speechInput: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
  val speechOutput: OperatorRuntimeAssignment = OperatorRuntimeAssignment(),
) {
  /** Resolve the persisted assignment for a capability usage. */
  fun assignmentFor(usage: OperatorRuntimeUsage): OperatorRuntimeAssignment =
    when (usage) {
      OperatorRuntimeUsage.CHAT -> chat
      OperatorRuntimeUsage.AUTOMATION -> automation
      OperatorRuntimeUsage.IMAGE -> image
      OperatorRuntimeUsage.FLOW_GENERATION -> flowGeneration
      OperatorRuntimeUsage.SPEECH_INPUT -> speechInput
      OperatorRuntimeUsage.SPEECH_OUTPUT -> speechOutput
    }

  /** Return a copy with one capability assignment replaced. */
  fun withAssignment(
    usage: OperatorRuntimeUsage,
    assignment: OperatorRuntimeAssignment,
  ): OperatorRuntimeAssignments =
    when (usage) {
      OperatorRuntimeUsage.CHAT -> copy(chat = assignment)
      OperatorRuntimeUsage.AUTOMATION -> copy(automation = assignment)
      OperatorRuntimeUsage.IMAGE -> copy(image = assignment)
      OperatorRuntimeUsage.FLOW_GENERATION -> copy(flowGeneration = assignment)
      OperatorRuntimeUsage.SPEECH_INPUT -> copy(speechInput = assignment)
      OperatorRuntimeUsage.SPEECH_OUTPUT -> copy(speechOutput = assignment)
    }
}

/** Persisted non-secret operator preferences that back AI settings and runtime defaults. */
data class OperatorPreferences(
  val controlPlaneBaseUrl: String = BaoEdgeRuntimeConfig.controlPlaneBaseUrl,
  val runtimeAssignments: OperatorRuntimeAssignments = OperatorRuntimeAssignments(),
  val providerProfiles: List<OperatorProviderProfile> = listOf(),
  val activeProviderProfileIds: Map<String, String> = mapOf(),
  val cloudModelSource: String = BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
  val providerBaseUrl: String = "",
  val cloudPullSource: String = BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
  val cloudPullTimeoutMsText: String = BaoEdgeRuntimeConfig.controlPlaneDefaultPullTimeoutMs.toString(),
  val cloudPullForce: Boolean = false,
  val cloudChatRequestTts: Boolean = false,
  val cloudChatTtsOutputMimeType: String = "",
  val cloudChatTtsVoice: String = "",
  val speechRecognitionLanguageTag: String = "",
) {
  /** Active chat provider assignment derived from capability-scoped runtime settings. */
  val activeChatProvider: String
    get() = runtimeAssignments.chat.provider

  /** Active chat model assignment derived from capability-scoped runtime settings. */
  val activeChatModel: String
    get() = runtimeAssignments.chat.model

  /** Returns the active provider profile id for a provider. */
  fun activeProfileIdFor(providerId: String): String {
    val normalizedProvider = providerId.trim()
    if (normalizedProvider.isEmpty()) {
      return ""
    }
    return activeProviderProfileIds[normalizedProvider].orEmpty().ifBlank {
      providerProfiles
        .firstOrNull { profile -> profile.providerId.equals(normalizedProvider, ignoreCase = true) }
        ?.profileId
        .orEmpty()
    }
  }

  /** Returns all saved profiles for a provider. */
  fun profilesFor(providerId: String): List<OperatorProviderProfile> {
    val normalizedProvider = providerId.trim()
    if (normalizedProvider.isEmpty()) {
      return listOf()
    }
    return providerProfiles.filter { profile ->
      profile.providerId.equals(normalizedProvider, ignoreCase = true)
    }
  }

  /** Returns the active provider profile metadata when available. */
  fun activeProfileFor(providerId: String): OperatorProviderProfile? {
    val profileId = activeProfileIdFor(providerId)
    if (profileId.isBlank()) {
      return null
    }
    return profilesFor(providerId).firstOrNull { profile ->
      profile.profileId.equals(profileId, ignoreCase = true)
    }
  }
}

/** Owner for persisted non-secret operator preferences. */
interface PreferencesStore {
  /** Reads the current operator preferences snapshot. */
  suspend fun readOperatorPreferences(): OperatorPreferences

  /** Persists the control-plane base URL override. */
  suspend fun saveControlPlaneBaseUrl(baseUrl: String)

  /** Persists a capability-scoped runtime assignment. */
  suspend fun saveRuntimeAssignment(usage: OperatorRuntimeUsage, assignment: OperatorRuntimeAssignment)

  /** Persists a non-secret provider profile metadata row and makes it active for that provider. */
  suspend fun saveProviderProfile(profile: OperatorProviderProfile)

  /** Persists the active provider profile for a provider. */
  suspend fun saveActiveProviderProfile(providerId: String, profileId: String)

  /** Deletes provider profile metadata for a provider/profile pair. */
  suspend fun deleteProviderProfile(providerId: String, profileId: String)

  /** Persists the selected model source default. */
  suspend fun saveCloudModelSource(source: String)

  /** Persists the provider base URL override. */
  suspend fun saveProviderBaseUrl(baseUrl: String)

  /** Persists the pull source. */
  suspend fun saveCloudPullSource(source: String)

  /** Persists the pull timeout. */
  suspend fun saveCloudPullTimeoutMs(timeoutMsText: String)

  /** Persists whether force-pull is enabled. */
  suspend fun saveCloudPullForce(force: Boolean)

  /** Persists the default request-TTS preference. */
  suspend fun saveCloudChatRequestTts(requestTts: Boolean)

  /** Persists the preferred TTS output MIME type. */
  suspend fun saveCloudChatTtsOutputMimeType(mimeType: String)

  /** Persists the preferred TTS voice. */
  suspend fun saveCloudChatTtsVoice(voice: String)

  /** Persists the preferred speech-recognition locale tag. */
  suspend fun saveSpeechRecognitionLanguageTag(languageTag: String)
}

/** SharedPreferences-backed implementation of [PreferencesStore]. */
@Singleton
class SharedPreferencesStore
@Inject
constructor(
  @ApplicationContext context: Context,
) : PreferencesStore {
  private val gson = Gson()
  private val sharedPreferences =
    context.getSharedPreferences(OPERATOR_PREFERENCES_NAME, Context.MODE_PRIVATE)

  private fun readRuntimeAssignments(): OperatorRuntimeAssignments {
    val rawAssignments = sharedPreferences.getString(KEY_RUNTIME_ASSIGNMENTS, "").orEmpty().trim()
    if (rawAssignments.isEmpty()) {
      return OperatorRuntimeAssignments()
    }
    return runCatching {
      gson.fromJson(rawAssignments, OperatorRuntimeAssignments::class.java)
    }.getOrDefault(OperatorRuntimeAssignments())
  }

  private fun readProviderProfiles(): List<OperatorProviderProfile> {
    val rawProfiles = sharedPreferences.getString(KEY_PROVIDER_PROFILES, "").orEmpty().trim()
    if (rawProfiles.isEmpty()) {
      return listOf()
    }
    return runCatching {
      gson.fromJson(rawProfiles, Array<OperatorProviderProfile>::class.java)?.toList().orEmpty()
    }.getOrDefault(listOf())
      .filter { profile ->
        profile.providerId.isNotBlank() && profile.profileId.isNotBlank()
      }
      .distinctBy { profile -> "${profile.providerId.lowercase()}:${profile.profileId.lowercase()}" }
  }

  private fun persistProviderProfiles(profiles: List<OperatorProviderProfile>) {
    sharedPreferences.edit {
      putString(KEY_PROVIDER_PROFILES, gson.toJson(profiles))
    }
  }

  private fun readActiveProviderProfiles(): Map<String, String> {
    val rawProfiles = sharedPreferences.getString(KEY_ACTIVE_PROVIDER_PROFILES, "").orEmpty().trim()
    if (rawProfiles.isEmpty()) {
      return mapOf()
    }
    val mapType = object : com.google.gson.reflect.TypeToken<Map<String, String>>() {}.type
    return runCatching {
      gson.fromJson<Map<String, String>>(rawProfiles, mapType).orEmpty()
    }.getOrDefault(mapOf())
      .mapKeys { entry -> entry.key.trim() }
      .mapValues { entry -> entry.value.trim() }
      .filterKeys { key -> key.isNotBlank() }
      .filterValues { value -> value.isNotBlank() }
  }

  private fun persistActiveProviderProfiles(activeProfiles: Map<String, String>) {
    sharedPreferences.edit {
      putString(KEY_ACTIVE_PROVIDER_PROFILES, gson.toJson(activeProfiles))
    }
  }

  private fun persistRuntimeAssignments(assignments: OperatorRuntimeAssignments) {
    sharedPreferences.edit { putString(KEY_RUNTIME_ASSIGNMENTS, gson.toJson(assignments)) }
  }

  override suspend fun readOperatorPreferences(): OperatorPreferences {
    val runtimeAssignments = readRuntimeAssignments()
    val providerProfiles = readProviderProfiles()
    val activeProviderProfiles = readActiveProviderProfiles()
    return OperatorPreferences(
      controlPlaneBaseUrl =
        sharedPreferences.getString(
          KEY_CONTROL_PLANE_BASE_URL,
          BaoEdgeRuntimeConfig.controlPlaneBaseUrl,
        ) ?: BaoEdgeRuntimeConfig.controlPlaneBaseUrl,
      runtimeAssignments = runtimeAssignments,
      providerProfiles = providerProfiles,
      activeProviderProfileIds = activeProviderProfiles,
      cloudModelSource =
        sharedPreferences.getString(
          KEY_CLOUD_MODEL_SOURCE,
          BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
        ) ?: BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
      providerBaseUrl = sharedPreferences.getString(KEY_PROVIDER_BASE_URL, "").orEmpty(),
      cloudPullSource =
        sharedPreferences.getString(
          KEY_CLOUD_PULL_SOURCE,
          BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
        ) ?: BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
      cloudPullTimeoutMsText =
        sharedPreferences.getString(
          KEY_CLOUD_PULL_TIMEOUT_MS,
          BaoEdgeRuntimeConfig.controlPlaneDefaultPullTimeoutMs.toString(),
        ) ?: BaoEdgeRuntimeConfig.controlPlaneDefaultPullTimeoutMs.toString(),
      cloudPullForce = sharedPreferences.getBoolean(KEY_CLOUD_PULL_FORCE, false),
      cloudChatRequestTts = sharedPreferences.getBoolean(KEY_CLOUD_CHAT_REQUEST_TTS, false),
      cloudChatTtsOutputMimeType =
        sharedPreferences.getString(KEY_CLOUD_CHAT_TTS_OUTPUT_MIME_TYPE, "").orEmpty(),
      cloudChatTtsVoice = sharedPreferences.getString(KEY_CLOUD_CHAT_TTS_VOICE, "").orEmpty(),
      speechRecognitionLanguageTag =
        sharedPreferences.getString(KEY_SPEECH_RECOGNITION_LANGUAGE_TAG, "").orEmpty(),
    )
  }

  override suspend fun saveControlPlaneBaseUrl(baseUrl: String) {
    sharedPreferences.edit { putString(KEY_CONTROL_PLANE_BASE_URL, baseUrl) }
  }

  override suspend fun saveRuntimeAssignment(
    usage: OperatorRuntimeUsage,
    assignment: OperatorRuntimeAssignment,
  ) {
    persistRuntimeAssignments(readRuntimeAssignments().withAssignment(usage, assignment))
  }

  override suspend fun saveProviderProfile(profile: OperatorProviderProfile) {
    val normalizedProviderId = profile.providerId.trim()
    val normalizedProfileId = profile.profileId.trim()
    if (normalizedProviderId.isEmpty() || normalizedProfileId.isEmpty()) {
      return
    }
    val normalizedProfile =
      profile.copy(
        providerId = normalizedProviderId,
        profileId = normalizedProfileId,
        displayName = profile.displayName.trim().ifBlank { normalizedProfileId },
        baseUrl = profile.baseUrl.trim(),
      )
    val existingProfiles = readProviderProfiles()
    val nextProfiles =
      (existingProfiles.filterNot { existing ->
        existing.providerId.equals(normalizedProviderId, ignoreCase = true)
          && existing.profileId.equals(normalizedProfileId, ignoreCase = true)
      } + normalizedProfile)
        .sortedWith(compareBy<OperatorProviderProfile>({ it.providerId.lowercase() }, { it.displayName.lowercase() }, { it.profileId.lowercase() }))
    persistProviderProfiles(nextProfiles)
    saveActiveProviderProfile(normalizedProviderId, normalizedProfileId)
  }

  override suspend fun saveActiveProviderProfile(providerId: String, profileId: String) {
    val normalizedProviderId = providerId.trim()
    val normalizedProfileId = profileId.trim()
    if (normalizedProviderId.isEmpty() || normalizedProfileId.isEmpty()) {
      return
    }
    persistActiveProviderProfiles(readActiveProviderProfiles() + (normalizedProviderId to normalizedProfileId))
  }

  override suspend fun deleteProviderProfile(providerId: String, profileId: String) {
    val normalizedProviderId = providerId.trim()
    val normalizedProfileId = profileId.trim()
    if (normalizedProviderId.isEmpty() || normalizedProfileId.isEmpty()) {
      return
    }
    val remainingProfiles =
      readProviderProfiles().filterNot { profile ->
        profile.providerId.equals(normalizedProviderId, ignoreCase = true)
          && profile.profileId.equals(normalizedProfileId, ignoreCase = true)
      }
    persistProviderProfiles(remainingProfiles)
    val activeProfiles = readActiveProviderProfiles().toMutableMap()
    val activeProfileId = activeProfiles[normalizedProviderId]
    if (activeProfileId != null && activeProfileId.equals(normalizedProfileId, ignoreCase = true)) {
      val replacementProfileId =
        remainingProfiles.firstOrNull { profile ->
          profile.providerId.equals(normalizedProviderId, ignoreCase = true)
        }?.profileId
      if (replacementProfileId == null) {
        activeProfiles.remove(normalizedProviderId)
      } else {
        activeProfiles[normalizedProviderId] = replacementProfileId
      }
      persistActiveProviderProfiles(activeProfiles)
    }
  }

  override suspend fun saveCloudModelSource(source: String) {
    sharedPreferences.edit { putString(KEY_CLOUD_MODEL_SOURCE, source) }
  }

  override suspend fun saveProviderBaseUrl(baseUrl: String) {
    sharedPreferences.edit { putString(KEY_PROVIDER_BASE_URL, baseUrl) }
  }

  override suspend fun saveCloudPullSource(source: String) {
    sharedPreferences.edit { putString(KEY_CLOUD_PULL_SOURCE, source) }
  }

  override suspend fun saveCloudPullTimeoutMs(timeoutMsText: String) {
    sharedPreferences.edit { putString(KEY_CLOUD_PULL_TIMEOUT_MS, timeoutMsText) }
  }

  override suspend fun saveCloudPullForce(force: Boolean) {
    sharedPreferences.edit { putBoolean(KEY_CLOUD_PULL_FORCE, force) }
  }

  override suspend fun saveCloudChatRequestTts(requestTts: Boolean) {
    sharedPreferences.edit { putBoolean(KEY_CLOUD_CHAT_REQUEST_TTS, requestTts) }
  }

  override suspend fun saveCloudChatTtsOutputMimeType(mimeType: String) {
    sharedPreferences.edit { putString(KEY_CLOUD_CHAT_TTS_OUTPUT_MIME_TYPE, mimeType) }
  }

  override suspend fun saveCloudChatTtsVoice(voice: String) {
    sharedPreferences.edit { putString(KEY_CLOUD_CHAT_TTS_VOICE, voice) }
  }

  override suspend fun saveSpeechRecognitionLanguageTag(languageTag: String) {
    sharedPreferences.edit { putString(KEY_SPEECH_RECOGNITION_LANGUAGE_TAG, languageTag.trim()) }
  }
}

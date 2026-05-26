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

package com.google.ai.edge.gallery.ui.modelmanager

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import androidx.activity.result.ActivityResult
import androidx.core.net.toUri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.ai.edge.gallery.AppLifecycleProvider
import com.google.ai.edge.gallery.BuildConfig
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.common.ProjectConfig
import com.google.ai.edge.gallery.common.StructuredLog
import com.google.ai.edge.gallery.common.BaoEdgeRuntimeConfig
import com.google.ai.edge.gallery.common.JsonObjAndTextContent
import com.google.ai.edge.gallery.common.normalizeAppLocaleTag
import com.google.ai.edge.gallery.common.getJsonResponseWithRetry
import com.google.ai.edge.gallery.customtasks.common.CustomTask
import com.google.ai.edge.gallery.data.Accelerator
import com.google.ai.edge.gallery.data.BuiltInTaskId
import com.google.ai.edge.gallery.data.Category
import com.google.ai.edge.gallery.data.CategoryInfo
import com.google.ai.edge.gallery.data.CloudControlPlaneClient
import com.google.ai.edge.gallery.data.CloudModelDescriptor
import com.google.ai.edge.gallery.data.CloudModelPullEnvelope
import com.google.ai.edge.gallery.data.CloudModelPullRequest
import com.google.ai.edge.gallery.data.CloudModelSourceDescriptor
import com.google.ai.edge.gallery.data.CloudOperatorProviderDescriptor
import com.google.ai.edge.gallery.data.Config
import com.google.ai.edge.gallery.data.ConfigKeys
import com.google.ai.edge.gallery.data.AccessTokenRecord
import com.google.ai.edge.gallery.data.CredentialStore
import com.google.ai.edge.gallery.data.DataStoreRepository
import com.google.ai.edge.gallery.data.DEFAULT_ACCELERATORS
import com.google.ai.edge.gallery.data.DeviceAiProtocolLaunchRequest
import com.google.ai.edge.gallery.data.DeviceAiProtocolRunRequest
import com.google.ai.edge.gallery.data.DeviceAiProtocolRunResult
import com.google.ai.edge.gallery.data.DeviceAiProtocolRunner
import com.google.ai.edge.gallery.data.DeviceAiProtocolTerminalState
import com.google.ai.edge.gallery.data.DeviceAiProtocolTrigger
import com.google.ai.edge.gallery.data.DownloadRepository
import com.google.ai.edge.gallery.data.EMPTY_MODEL
import com.google.ai.edge.gallery.data.IMPORTS_DIR
import com.google.ai.edge.gallery.data.Model
import com.google.ai.edge.gallery.data.ModelAllowlist
import com.google.ai.edge.gallery.data.ModelDownloadStatus
import com.google.ai.edge.gallery.data.ModelDownloadStatusType
import com.google.ai.edge.gallery.data.NumberSliderConfig
import com.google.ai.edge.gallery.data.PreferencesStore
import com.google.ai.edge.gallery.data.OperatorRuntimeAssignment
import com.google.ai.edge.gallery.data.OperatorRuntimeAssignments
import com.google.ai.edge.gallery.data.OperatorRuntimeUsage
import com.google.ai.edge.gallery.data.OperatorProviderProfile
import com.google.ai.edge.gallery.data.SOC
import com.google.ai.edge.gallery.data.TMP_FILE_EXT
import com.google.ai.edge.gallery.data.Task
import com.google.ai.edge.gallery.data.ValueType
import com.google.ai.edge.gallery.data.createLlmChatConfigs
import com.google.ai.edge.gallery.data.createLlmChatConfigsForNpuModel
import com.google.ai.edge.gallery.proto.ImportedModel
import com.google.ai.edge.gallery.proto.Theme
import com.google.ai.edge.gallery.ui.theme.ThemeSettings
import com.google.gson.Gson
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import javax.inject.Inject
import kotlin.collections.sortedWith
import kotlinx.coroutines.delay
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import net.openid.appauth.AuthorizationException
import net.openid.appauth.AuthorizationRequest
import net.openid.appauth.AuthorizationResponse
import net.openid.appauth.AuthorizationService
import net.openid.appauth.ResponseTypeValues
import com.baohaus.baoedge.core.flow.FlowExecutionState

private const val TAG = "AGModelManagerViewModel"
private const val TEXT_INPUT_HISTORY_MAX_SIZE = 50
private const val MODEL_ALLOWLIST_FILENAME = "model_allowlist.json"
private const val MODEL_ALLOWLIST_TEST_FILENAME = "model_allowlist_test.json"
private const val MODEL_ALLOWLIST_ASSET_SCHEME = "asset://"

private const val TEST_MODEL_ALLOW_LIST = ""

data class ModelInitializationStatus(
  val status: ModelInitializationStatusType,
  var error: String = "",
)

enum class ModelInitializationStatusType {
  NOT_INITIALIZED,
  INITIALIZING,
  INITIALIZED,
  ERROR,
}

enum class TokenStatus {
  NOT_STORED,
  EXPIRED,
  NOT_EXPIRED,
}

enum class TokenRequestResultType {
  FAILED,
  SUCCEEDED,
  USER_CANCELLED,
}

data class TokenStatusAndData(val status: TokenStatus, val data: AccessTokenRecord?)

data class TokenRequestResult(val status: TokenRequestResultType, val errorMessage: String? = null)

/** External overlay state owned by the operator shell. */
enum class OperatorExternalOverlayState {
  NONE,
  MODEL_IMPORT_PICKER,
}

/** Canonical readiness state for the required device model. */
enum class RequiredModelReadinessState {
  NOT_INSTALLED,
  DOWNLOADING,
  VERIFYING,
  READY,
  IN_USE,
  FAILED,
}

/** Capability badge rendered by operator runtime surfaces. */
data class OperatorRuntimeCapability(
  val key: String,
  val label: String,
  val available: Boolean,
)

/** Required-model readiness summary rendered by operator runtime surfaces. */
data class RequiredModelReadiness(
  val state: RequiredModelReadinessState,
  val title: String,
  val detail: String,
  val actionLabel: String,
)

/** Shared runtime summary rendered by operator home, bubble, and admin surfaces. */
data class OperatorRuntimeSummary(
  val activeProvider: String,
  val activeCloudModel: String,
  val activeLocalModel: String,
  val runtimeReady: Boolean,
  val providerState: FlowExecutionState,
  val modelState: FlowExecutionState,
  val pullState: FlowExecutionState,
  val capabilities: List<OperatorRuntimeCapability>,
  /** Whether the active chat model supports image input (vision). */
  val supportsImageInput: Boolean = false,
  /** Whether the active chat model supports audio input (ASR). */
  val supportsAudioInput: Boolean = false,
)

data class ModelManagerUiState(
  /** A list of tasks available in the application. */
  val tasks: List<Task>,

  /** Tasks grouped by category. */
  val tasksByCategory: Map<String, List<Task>>,

  /** A map that tracks the download status of each model, indexed by model name. */
  val modelDownloadStatus: Map<String, ModelDownloadStatus>,

  /** A map that tracks the initialization status of each model, indexed by model name. */
  val modelInitializationStatus: Map<String, ModelInitializationStatus>,

  /** Whether the app is loading and processing the model allowlist. */
  val loadingModelAllowlist: Boolean = true,

  /** The error message when loading the model allowlist. */
  val loadingModelAllowlistError: String = "",

  /** The currently selected model. */
  val selectedModel: Model = EMPTY_MODEL,

  /** Cloud control-plane base URL override. */
  val controlPlaneBaseUrl: String = BaoEdgeRuntimeConfig.controlPlaneBaseUrl,

  /** Provider registry state. */
  val isLoadingProviderRegistry: Boolean = false,
  val providerRegistryState: FlowExecutionState = FlowExecutionState.IDLE,
  val providerRegistryMessage: String = "",
  val providerOptions: List<String> = listOf(),
  val providerDisplayNames: Map<String, String> = mapOf(),
  val providerSupportsBaseUrlOverride: Set<String> = emptySet(),
  val runtimeAssignments: OperatorRuntimeAssignments = OperatorRuntimeAssignments(),
  val providerProfiles: List<OperatorProviderProfile> = listOf(),
  val activeProviderProfileIds: Map<String, String> = mapOf(),
  val activeChatProvider: String = "",
  val selectedProviderProfileId: String = "",
  val selectedProviderProfileLabel: String = "",

  /** Provider model registry state. */
  val isLoadingCloudModels: Boolean = false,
  val cloudModelListState: FlowExecutionState = FlowExecutionState.IDLE,
  val cloudModelListMessage: String = "",
  val cloudModelOptionsProvider: String = "",
  val cloudModelDescriptors: List<CloudModelDescriptor> = listOf(),
  val cloudModelDisplayNames: Map<String, String> = mapOf(),
  val cloudModelOptions: List<String> = listOf(),
  val activeChatModel: String = "",
  val modelSourceOptions: List<CloudModelSourceDescriptor> = listOf(),
  val cloudModelSource: String = "",
  val providerApiKey: String = "",
  val providerApiKeyMasked: String = "",
  val hasStoredProviderApiKey: Boolean = false,
  val providerBaseUrl: String = "",

  /** Pull job state. */
  val cloudPullModelRef: String = "",
  val cloudPullSource: String = "",
  val cloudPullTimeoutMsText: String = "",
  val cloudPullForce: Boolean = false,
  val cloudPullJobId: String? = null,
  val cloudPullState: FlowExecutionState = FlowExecutionState.IDLE,
  val cloudPullMessage: String = "",
  val isSubmittingCloudPull: Boolean = false,
  val isPollingCloudPull: Boolean = false,

  /** Shared output preferences for cloud chat and operator shell replies. */
  val cloudChatRequestTts: Boolean = false,
  val cloudChatTtsOutputMimeType: String = "",
  val cloudChatTtsVoice: String = "",

  /** Device AI protocol state. */
  val deviceAiModelRef: String = BaoEdgeRuntimeConfig.deviceAiRequiredModelRef,
  val deviceAiModelRevision: String = BaoEdgeRuntimeConfig.deviceAiRequiredModelRevision,
  val deviceAiModelFileName: String = BaoEdgeRuntimeConfig.deviceAiRequiredModelFileName,
  val deviceAiExpectedSha256: String = BaoEdgeRuntimeConfig.deviceAiRequiredModelSha256,
  val deviceAiState: FlowExecutionState = FlowExecutionState.IDLE,
  val deviceAiStateMessage: String = "",
  val deviceAiCorrelationId: String = "",
  val deviceAiArtifactPath: String = "",
  val deviceAiArtifactSha256: String = "",
  val deviceAiArtifactSizeBytes: Long = 0L,
  val isRunningDeviceAiProtocol: Boolean = false,

  /** Persisted app language override shared with the settings surface. */
  val appLocaleTag: String = "",

  /** External overlay state shared with model-management surfaces. */
  val operatorExternalOverlayState: OperatorExternalOverlayState = OperatorExternalOverlayState.NONE,

  /** The history of text inputs entered by the user. */
  val textInputHistory: List<String> = listOf(),
  val configValuesUpdateTrigger: Long = 0L,
  // Updated when model is imported of an imported model is deleted.
  val modelImportingUpdateTrigger: Long = 0L,
) {
  fun isModelInitialized(model: Model): Boolean {
    return modelInitializationStatus[model.name]?.status ==
      ModelInitializationStatusType.INITIALIZED
  }

  fun isModelInitializing(model: Model): Boolean {
    return modelInitializationStatus[model.name]?.status ==
      ModelInitializationStatusType.INITIALIZING
  }
}

private fun CloudModelDescriptor.supportsRuntimeUsage(usage: OperatorRuntimeUsage): Boolean =
  when (usage) {
    OperatorRuntimeUsage.CHAT ->
      supportsText || capabilityModes.contains(OperatorRuntimeUsage.CHAT.wireValue)
    OperatorRuntimeUsage.AUTOMATION ->
      supportsAutomation ||
        supportsAgent ||
        capabilityModes.contains(OperatorRuntimeUsage.AUTOMATION.wireValue)
    OperatorRuntimeUsage.IMAGE ->
      supportsImageInput ||
        supportsImageGeneration ||
        capabilityModes.contains(OperatorRuntimeUsage.IMAGE.wireValue)
    OperatorRuntimeUsage.FLOW_GENERATION ->
      supportsFlowGeneration ||
        capabilityModes.contains(OperatorRuntimeUsage.FLOW_GENERATION.wireValue)
    OperatorRuntimeUsage.SPEECH_INPUT ->
      supportsAudioInput ||
        capabilityModes.contains(OperatorRuntimeUsage.SPEECH_INPUT.wireValue)
    OperatorRuntimeUsage.SPEECH_OUTPUT ->
      supportsSpeechOutput ||
        capabilityModes.contains(OperatorRuntimeUsage.SPEECH_OUTPUT.wireValue)
  }

private fun filterCatalogForUsage(
  descriptors: List<CloudModelDescriptor>,
  usage: OperatorRuntimeUsage,
): List<CloudModelDescriptor> {
  val normalizedDescriptors =
    descriptors
      .filter { descriptor -> descriptor.id.isNotBlank() }
      .distinctBy { descriptor -> descriptor.id.lowercase() }
  val filtered = normalizedDescriptors.filter { descriptor -> descriptor.supportsRuntimeUsage(usage) }
  return if (filtered.isNotEmpty()) filtered else normalizedDescriptors
}

private fun CloudModelDescriptor.optionLabel(): String =
  displayName.trim().ifBlank { id }

private fun resolveActiveProviderProfileId(
  providerId: String,
  profiles: List<OperatorProviderProfile>,
  activeProfileIds: Map<String, String>,
): String {
  val normalizedProviderId = providerId.trim()
  if (normalizedProviderId.isEmpty()) {
    return ""
  }
  val activeProfileId = activeProfileIds[normalizedProviderId].orEmpty().trim()
  if (activeProfileId.isNotEmpty()) {
    return activeProfileId
  }
  return profiles.firstOrNull { profile ->
    profile.providerId.equals(normalizedProviderId, ignoreCase = true)
  }?.profileId.orEmpty()
}

private fun resolveActiveProviderProfile(
  providerId: String,
  profiles: List<OperatorProviderProfile>,
  activeProfileIds: Map<String, String>,
): OperatorProviderProfile? {
  val profileId = resolveActiveProviderProfileId(providerId, profiles, activeProfileIds)
  if (profileId.isBlank()) {
    return null
  }
  return profiles.firstOrNull { profile ->
    profile.providerId.equals(providerId.trim(), ignoreCase = true)
      && profile.profileId.equals(profileId, ignoreCase = true)
  }
}

private fun parseFlowExecutionState(rawValue: String): FlowExecutionState =
  runCatching { FlowExecutionState.valueOf(rawValue.trim().uppercase()) }
    .getOrDefault(FlowExecutionState.IDLE)

private val RESET_CONVERSATION_TURN_COUNT_CONFIG =
  NumberSliderConfig(
    key = ConfigKeys.RESET_CONVERSATION_TURN_COUNT,
    sliderMin = 1f,
    sliderMax = 30f,
    defaultValue = 3f,
    valueType = ValueType.INT,
  )

private val PREDEFINED_LLM_TASK_ORDER =
  listOf(
    BuiltInTaskId.LLM_PROMPT_LAB,
    BuiltInTaskId.LLM_TINY_GARDEN,
    BuiltInTaskId.LLM_MOBILE_ACTIONS,
    // BuiltInTaskId.MP_SCRAPBOOK,
  )

private val CONVERGED_OPERATOR_TASK_IDS =
  setOf(
    BuiltInTaskId.LLM_CHAT,
    BuiltInTaskId.LLM_ASK_IMAGE,
    BuiltInTaskId.LLM_ASK_AUDIO,
  )

/**
 * ViewModel responsible for managing models, their download status, and initialization.
 *
 * This ViewModel handles model-related operations such as downloading, deleting, initializing, and
 * cleaning up models. It also manages the UI state for model management, including the list of
 * tasks, models, download statuses, and initialization statuses.
 */
@HiltViewModel
open class ModelManagerViewModel
@Inject
constructor(
  private val downloadRepository: DownloadRepository,
  private val dataStoreRepository: DataStoreRepository,
  private val credentialStore: CredentialStore,
  private val preferencesStore: PreferencesStore,
  private val lifecycleProvider: AppLifecycleProvider,
  private val customTasks: Set<@JvmSuppressWildcards CustomTask>,
  private val cloudControlPlaneClient: CloudControlPlaneClient,
  private val deviceAiProtocolRunner: DeviceAiProtocolRunner,
  @ApplicationContext private val context: Context,
) : ViewModel() {
  private val externalFilesDir: File = context.getExternalFilesDir(null) ?: context.filesDir
  protected val _uiState = MutableStateFlow(createEmptyUiState())
  val uiState = _uiState.asStateFlow()
  private val _tokenStatusAndData =
    MutableStateFlow(TokenStatusAndData(status = TokenStatus.NOT_STORED, data = null))
  val tokenStatusAndData = _tokenStatusAndData.asStateFlow()

  private val modelLifecycleMutexes = mutableMapOf<String, Mutex>()
  private fun modelMutex(modelName: String): Mutex =
    synchronized(modelLifecycleMutexes) { modelLifecycleMutexes.getOrPut(modelName) { Mutex() } }

  val authService = AuthorizationService(context)
  var curAccessToken: String = ""

  init {
    refreshTokenStatus()
    refreshStoredProviderCredentialState()
  }

  private fun stringResource(resourceId: Int): String = context.getString(resourceId)

  private fun stringResource(resourceId: Int, vararg args: Any): String {
    return context.getString(resourceId, *args)
  }

  override fun onCleared() {
    authService.dispose()
  }

  fun getTaskById(id: String): Task? {
    return uiState.value.tasks.find { it.id == id }
      ?: customTasks.firstOrNull { customTask -> customTask.task.id == id }?.task
  }

  fun selectDefaultModelForTask(taskId: String) {
    val task = getTaskById(id = taskId) ?: return
    val downloadedModel =
      task.models.firstOrNull { model ->
        uiState.value.modelDownloadStatus[model.name]?.status == ModelDownloadStatusType.SUCCEEDED
      }
    val selected = downloadedModel ?: task.models.firstOrNull() ?: return
    _uiState.update { it.copy(selectedModel = selected) }
  }

  /** Returns the preferred model for a task, preferring fully downloaded models first. */
  fun getPreferredModelForTask(taskId: String): Model? {
    val task = getTaskById(id = taskId) ?: return null
    return task.models.firstOrNull { model ->
      uiState.value.modelDownloadStatus[model.name]?.status == ModelDownloadStatusType.SUCCEEDED
    } ?: task.models.firstOrNull()
  }

  fun getTasksByIds(ids: Set<String>): List<Task> {
    return uiState.value.tasks.filter { ids.contains(it.id) }
  }

  fun getCustomTaskByTaskId(id: String): CustomTask? {
    return customTasks.find { it.task.id == id }
  }

  fun getModelByName(name: String): Model? {
    for (task in uiState.value.tasks) {
      for (model in task.models) {
        if (model.name == name) {
          return model
        }
      }
    }
    return null
  }

  fun getAllModels(): List<Model> {
    val allModels = mutableSetOf<Model>()
    for (task in uiState.value.tasks) {
      for (model in task.models) {
        allModels.add(model)
      }
    }
    return allModels.toList().sortedBy { it.getDisplayName(context = context) }
  }

  fun getAllDownloadedModels(): List<Model> {
    return getAllModels().filter {
      uiState.value.modelDownloadStatus[it.name]?.status == ModelDownloadStatusType.SUCCEEDED &&
        it.isLlm
    }
  }

  private fun surfacedTasks(): List<Task> =
    customTasks
      .map { it.task }
      .filterNot { task -> CONVERGED_OPERATOR_TASK_IDS.contains(task.id) }

  fun processTasks() {
    val curTasks = surfacedTasks()
    for (task in curTasks) {
      for (model in task.models) {
        model.preProcess()
      }
      // Move the model that is best for this task to the front.
      val bestModel = task.models.find { it.bestForTaskIds.contains(task.id) }
      if (bestModel != null) {
        task.models.remove(bestModel)
        task.models.add(0, bestModel)
      }
    }
  }

  fun setControlPlaneBaseUrl(baseUrl: String) {
    _uiState.update {
      val clearedChatAssignment =
        it.runtimeAssignments.withAssignment(
          OperatorRuntimeUsage.CHAT,
          it.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.CHAT).copy(model = ""),
        )
      it.copy(
        controlPlaneBaseUrl = baseUrl,
        providerRegistryState = FlowExecutionState.IDLE,
        providerRegistryMessage = "",
        cloudModelListState = FlowExecutionState.IDLE,
        cloudModelListMessage = "",
        cloudModelOptionsProvider = "",
        cloudModelOptions = listOf(),
        runtimeAssignments = clearedChatAssignment,
        activeChatModel = "",
        modelSourceOptions = listOf(),
        cloudPullState = FlowExecutionState.IDLE,
        cloudPullMessage = "",
        cloudPullJobId = null,
      )
    }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveControlPlaneBaseUrl(baseUrl = baseUrl)
      preferencesStore.saveRuntimeAssignment(
        usage = OperatorRuntimeUsage.CHAT,
        assignment = uiState.value.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.CHAT),
      )
    }
  }

  fun ensureCloudProvidersLoaded() {
    val state = uiState.value
    if (state.isLoadingProviderRegistry || state.providerOptions.isNotEmpty()) {
      return
    }
    loadCloudProviders()
  }

  /** Updates the active external overlay shared with model-management flows. */
  fun setOperatorExternalOverlayState(state: OperatorExternalOverlayState) {
    _uiState.update { it.copy(operatorExternalOverlayState = state) }
  }

  /** Clears any external overlay tracked by model-management flows. */
  fun clearOperatorExternalOverlayState() {
    _uiState.update { it.copy(operatorExternalOverlayState = OperatorExternalOverlayState.NONE) }
  }

  /** Builds the shared runtime summary used across operator surfaces. */
  fun buildOperatorRuntimeSummary(): OperatorRuntimeSummary {
    val localAutomationModel = getPreferredModelForTask(BuiltInTaskId.LLM_MOBILE_ACTIONS)
    val state = uiState.value
    val activeProviderId = state.activeChatProvider.trim()
    val activeProviderLabel = state.providerDisplayNames[activeProviderId].orEmpty().ifBlank { activeProviderId }
    val cloudRuntimeReady = activeProviderId.isNotEmpty() && state.activeChatModel.trim().isNotEmpty()
    val activeDescriptor =
      state.cloudModelDescriptors
        .firstOrNull { it.provider == activeProviderId && (it.id == state.activeChatModel || it.displayName == state.activeChatModel) }
    return OperatorRuntimeSummary(
      activeProvider = activeProviderLabel,
      activeCloudModel = state.activeChatModel,
      activeLocalModel = localAutomationModel?.displayName?.ifBlank { localAutomationModel.name }.orEmpty(),
      runtimeReady = cloudRuntimeReady || localAutomationModel != null,
      providerState = state.providerRegistryState,
      modelState = state.cloudModelListState,
      pullState = state.cloudPullState,
      supportsImageInput = activeDescriptor?.supportsImageInput == true,
      supportsAudioInput = activeDescriptor?.supportsAudioInput == true,
      capabilities =
        listOf(
          OperatorRuntimeCapability(
            key = "chat",
            label = stringResource(R.string.operator_capability_chat),
            available = true,
          ),
          OperatorRuntimeCapability(
            key = "automation",
            label = stringResource(R.string.operator_capability_automation),
            available = localAutomationModel?.llmSupportMobileActions == true,
          ),
          OperatorRuntimeCapability(
            key = "voice_in",
            label = stringResource(R.string.operator_capability_voice_input),
            available = true,
          ),
          OperatorRuntimeCapability(
            key = "voice_out",
            label = stringResource(R.string.operator_capability_voice_output),
            available = true,
          ),
        ),
    )
  }

  /** Builds the required-model readiness summary used across operator surfaces. */
  fun buildRequiredModelReadiness(): RequiredModelReadiness {
    val state = uiState.value
    val activeProvider = state.activeChatProvider.trim()
    val activeModel = state.activeChatModel.trim()
    if (activeProvider.isNotEmpty() && activeModel.isNotEmpty()) {
      return RequiredModelReadiness(
        state = RequiredModelReadinessState.IN_USE,
        title = stringResource(R.string.operator_runtime_cloud_ready),
        detail = "${activeProvider} · $activeModel",
        actionLabel = stringResource(R.string.operator_readiness_in_use),
      )
    }
    val artifactFile = state.deviceAiArtifactPath.takeIf(String::isNotBlank)?.let(::File)
    val artifactExists = artifactFile?.exists() == true
    if (artifactExists && state.deviceAiState == FlowExecutionState.SUCCESS) {
      return RequiredModelReadiness(
        state = RequiredModelReadinessState.READY,
        title = stringResource(R.string.operator_required_model_ready_title),
        detail = state.deviceAiStateMessage.ifBlank {
          stringResource(R.string.operator_required_model_ready_detail)
        },
        actionLabel = stringResource(R.string.operator_required_model_verify_action),
      )
    }
    if (state.isRunningDeviceAiProtocol) {
      val state =
        if (artifactExists) {
          RequiredModelReadinessState.VERIFYING
        } else {
          RequiredModelReadinessState.DOWNLOADING
        }
      return RequiredModelReadiness(
        state = state,
        title = stringResource(R.string.operator_required_model_in_progress_title),
        detail = uiState.value.deviceAiStateMessage.ifBlank {
          stringResource(R.string.operator_required_model_in_progress_detail)
        },
        actionLabel = stringResource(R.string.operator_required_model_running_action),
      )
    }
    if (
      state.deviceAiState == FlowExecutionState.ERROR_RETRYABLE ||
        state.deviceAiState == FlowExecutionState.ERROR_NON_RETRYABLE ||
        state.deviceAiState == FlowExecutionState.UNAUTHORIZED
    ) {
      return RequiredModelReadiness(
        state = RequiredModelReadinessState.FAILED,
        title = stringResource(R.string.operator_required_model_failed_title),
        detail = state.deviceAiStateMessage.ifBlank {
          stringResource(R.string.operator_required_model_failed_detail)
        },
        actionLabel = stringResource(R.string.operator_required_model_retry_action),
      )
    }
    return RequiredModelReadiness(
      state = RequiredModelReadinessState.NOT_INSTALLED,
      title = stringResource(R.string.operator_required_model_missing_title),
      detail = stringResource(R.string.operator_required_model_missing_detail),
      actionLabel = stringResource(R.string.operator_required_model_download_action),
    )
  }

  fun setActiveChatProvider(provider: String) {
    _uiState.update {
      val nextProfile =
        resolveActiveProviderProfile(
          providerId = provider,
          profiles = it.providerProfiles,
          activeProfileIds = it.activeProviderProfileIds,
        )
      val nextAssignment =
        it.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.CHAT).copy(
          provider = provider,
          model = "",
          source =
            it.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.CHAT).source.ifBlank {
              it.cloudModelSource
            },
        )
      it.copy(
        runtimeAssignments = it.runtimeAssignments.withAssignment(OperatorRuntimeUsage.CHAT, nextAssignment),
        activeChatProvider = provider,
        selectedProviderProfileId = nextProfile?.profileId.orEmpty(),
        selectedProviderProfileLabel = nextProfile?.displayName.orEmpty(),
        providerBaseUrl = nextProfile?.baseUrl.orEmpty(),
        cloudModelListState = FlowExecutionState.IDLE,
        cloudModelListMessage = "",
        cloudModelOptionsProvider = "",
        cloudModelDescriptors = listOf(),
        cloudModelDisplayNames = mapOf(),
        cloudModelOptions = listOf(),
        activeChatModel = "",
        cloudPullMessage = "",
        cloudPullState = FlowExecutionState.IDLE,
      )
    }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveRuntimeAssignment(
        usage = OperatorRuntimeUsage.CHAT,
        assignment = uiState.value.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.CHAT),
      )
      refreshStoredProviderCredentialState()
    }
  }

  fun setSelectedProviderProfileId(profileId: String) {
    val activeChatProvider = uiState.value.activeChatProvider.trim()
    if (activeChatProvider.isEmpty()) {
      return
    }
    val normalizedProfileId = profileId.trim()
    val selectedProfile =
      uiState.value.providerProfiles.firstOrNull { profile ->
        profile.providerId.equals(activeChatProvider, ignoreCase = true)
          && profile.profileId.equals(normalizedProfileId, ignoreCase = true)
      }
    _uiState.update {
      it.copy(
        selectedProviderProfileId = normalizedProfileId,
        selectedProviderProfileLabel = selectedProfile?.displayName.orEmpty().ifBlank {
          it.selectedProviderProfileLabel
        },
        providerBaseUrl = selectedProfile?.baseUrl.orEmpty(),
      )
    }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveActiveProviderProfile(providerId = activeChatProvider, profileId = normalizedProfileId)
      refreshStoredProviderCredentialState()
    }
  }

  fun setSelectedProviderProfileLabel(label: String) {
    _uiState.update { it.copy(selectedProviderProfileLabel = label) }
  }

  private fun activeProviderProfileIdFor(providerId: String): String =
    resolveActiveProviderProfileId(
      providerId = providerId,
      profiles = uiState.value.providerProfiles,
      activeProfileIds = uiState.value.activeProviderProfileIds,
    ).ifBlank { "default" }

  private fun activeProviderProfileFor(providerId: String): OperatorProviderProfile? =
    resolveActiveProviderProfile(
      providerId = providerId,
      profiles = uiState.value.providerProfiles,
      activeProfileIds = uiState.value.activeProviderProfileIds,
    )

  /** Persist the source binding for a capability usage. */
  fun setRuntimeAssignmentSource(usage: OperatorRuntimeUsage, source: String) {
    val resolvedSource =
      resolveModelSourceSelection(
        candidate = source,
        options = uiState.value.modelSourceOptions,
        fallback =
          uiState.value.runtimeAssignments.assignmentFor(usage).source.ifBlank {
            uiState.value.cloudModelSource
          },
        canonicalFallback = BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
      )
    _uiState.update {
      val nextAssignment =
        it.runtimeAssignments.assignmentFor(usage).copy(
          source = resolvedSource,
        )
      it.copy(
        runtimeAssignments = it.runtimeAssignments.withAssignment(usage, nextAssignment),
        cloudModelSource = if (usage == OperatorRuntimeUsage.CHAT) resolvedSource else it.cloudModelSource,
      )
    }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveRuntimeAssignment(
        usage = usage,
        assignment = uiState.value.runtimeAssignments.assignmentFor(usage),
      )
      if (usage == OperatorRuntimeUsage.CHAT) {
        preferencesStore.saveCloudModelSource(source = resolvedSource)
      }
    }
  }

  fun setProviderApiKey(apiKey: String) {
    _uiState.update { it.copy(providerApiKey = apiKey) }
  }

  fun setProviderBaseUrl(baseUrl: String) {
    _uiState.update { it.copy(providerBaseUrl = baseUrl) }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveProviderBaseUrl(baseUrl = baseUrl)
    }
  }

  /** Persists the pending provider key draft and clears the raw input from UI state. */
  fun saveProviderApiKey() {
    val pendingApiKey = uiState.value.providerApiKey.trim()
    val providerId = uiState.value.activeChatProvider.trim()
    val profileId = uiState.value.selectedProviderProfileId.trim().ifBlank { "default" }
    val profileLabel = uiState.value.selectedProviderProfileLabel.trim().ifBlank { profileId }
    val baseUrl = uiState.value.providerBaseUrl.trim()
    viewModelScope.launch(Dispatchers.IO) {
      if (providerId.isBlank()) {
        return@launch
      }
      preferencesStore.saveProviderProfile(
        profile =
          OperatorProviderProfile(
            providerId = providerId,
            profileId = profileId,
            displayName = profileLabel,
            baseUrl = baseUrl,
          ),
      )
      if (pendingApiKey.isBlank()) {
        credentialStore.clearProviderApiKey(providerId = providerId, profileId = profileId)
      } else {
        credentialStore.saveProviderApiKey(providerId = providerId, profileId = profileId, apiKey = pendingApiKey)
      }
      _uiState.update {
        val nextProfiles =
          (it.providerProfiles.filterNot { profile ->
            profile.providerId.equals(providerId, ignoreCase = true)
              && profile.profileId.equals(profileId, ignoreCase = true)
          } + OperatorProviderProfile(
            providerId = providerId,
            profileId = profileId,
            displayName = profileLabel,
            baseUrl = baseUrl,
          )).sortedWith(compareBy(OperatorProviderProfile::providerId, OperatorProviderProfile::displayName, OperatorProviderProfile::profileId))
        it.copy(
          providerApiKey = "",
          providerProfiles = nextProfiles,
          activeProviderProfileIds = it.activeProviderProfileIds + (providerId to profileId),
          selectedProviderProfileId = profileId,
          selectedProviderProfileLabel = profileLabel,
          providerApiKeyMasked = maskStoredSecret(pendingApiKey),
          hasStoredProviderApiKey = pendingApiKey.isNotBlank(),
        )
      }
    }
  }

  /** Clears the stored provider API key. */
  fun clearProviderApiKey() {
    val providerId = uiState.value.activeChatProvider.trim()
    val profileId = uiState.value.selectedProviderProfileId.trim().ifBlank { "default" }
    viewModelScope.launch(Dispatchers.IO) {
      if (providerId.isBlank()) {
        return@launch
      }
      credentialStore.clearProviderApiKey(providerId = providerId, profileId = profileId)
      _uiState.update {
        it.copy(
          providerApiKey = "",
          providerApiKeyMasked = "",
          hasStoredProviderApiKey = false,
        )
      }
    }
  }

  fun setActiveChatModel(model: String) {
    _uiState.update {
      val nextAssignment =
        it.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.CHAT).copy(
          model = model,
          source =
            it.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.CHAT).source.ifBlank {
              it.cloudModelSource
            },
        )
      it.copy(
        runtimeAssignments = it.runtimeAssignments.withAssignment(OperatorRuntimeUsage.CHAT, nextAssignment),
        activeChatModel = model,
      )
    }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveRuntimeAssignment(
        usage = OperatorRuntimeUsage.CHAT,
        assignment = uiState.value.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.CHAT),
      )
    }
  }

  /** Resolve the persisted runtime assignment for a capability usage. */
  fun getRuntimeAssignment(usage: OperatorRuntimeUsage): OperatorRuntimeAssignment =
    uiState.value.runtimeAssignments.assignmentFor(usage)

  /** Persist the provider binding for a capability usage. */
  fun setRuntimeAssignmentProvider(usage: OperatorRuntimeUsage, provider: String) {
    if (usage == OperatorRuntimeUsage.CHAT) {
      setActiveChatProvider(provider)
      return
    }
    _uiState.update {
      val nextAssignment =
        it.runtimeAssignments.assignmentFor(usage).copy(
          provider = provider,
          model = "",
          source =
            it.runtimeAssignments.assignmentFor(usage).source.ifBlank {
              it.cloudModelSource
            },
        )
      it.copy(runtimeAssignments = it.runtimeAssignments.withAssignment(usage, nextAssignment))
    }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveRuntimeAssignment(
        usage = usage,
        assignment = uiState.value.runtimeAssignments.assignmentFor(usage),
      )
    }
  }

  /** Persist the model binding for a capability usage. */
  fun setRuntimeAssignmentModel(usage: OperatorRuntimeUsage, model: String) {
    if (usage == OperatorRuntimeUsage.CHAT) {
      setActiveChatModel(model)
      return
    }
    _uiState.update {
      val nextAssignment =
        it.runtimeAssignments.assignmentFor(usage).copy(
          model = model,
          source =
            it.runtimeAssignments.assignmentFor(usage).source.ifBlank {
              it.cloudModelSource
            },
        )
      it.copy(runtimeAssignments = it.runtimeAssignments.withAssignment(usage, nextAssignment))
    }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveRuntimeAssignment(
        usage = usage,
        assignment = uiState.value.runtimeAssignments.assignmentFor(usage),
      )
    }
  }

  fun setCloudPullModelRef(modelRef: String) {
    _uiState.update { it.copy(cloudPullModelRef = modelRef) }
  }

  fun setCloudPullSource(source: String) {
    val resolvedSource =
      resolveModelSourceSelection(
        candidate = source,
        options = uiState.value.modelSourceOptions,
        fallback = uiState.value.cloudModelSource,
        canonicalFallback = BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
      )
    _uiState.update { it.copy(cloudPullSource = resolvedSource) }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveCloudPullSource(source = resolvedSource)
    }
  }

  fun setCloudPullTimeoutMs(timeoutMs: String) {
    _uiState.update { it.copy(cloudPullTimeoutMsText = timeoutMs) }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveCloudPullTimeoutMs(timeoutMsText = timeoutMs)
    }
  }

  fun setCloudPullForce(force: Boolean) {
    _uiState.update { it.copy(cloudPullForce = force) }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveCloudPullForce(force = force)
    }
  }

  fun setCloudChatRequestTts(requestTts: Boolean) {
    _uiState.update { it.copy(cloudChatRequestTts = requestTts) }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveCloudChatRequestTts(requestTts = requestTts)
    }
  }

  fun setCloudChatTtsOutputMimeType(mimeType: String) {
    _uiState.update { it.copy(cloudChatTtsOutputMimeType = mimeType) }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveCloudChatTtsOutputMimeType(mimeType = mimeType)
    }
  }

  fun setCloudChatTtsVoice(voice: String) {
    _uiState.update { it.copy(cloudChatTtsVoice = voice) }
    viewModelScope.launch(Dispatchers.IO) {
      preferencesStore.saveCloudChatTtsVoice(voice = voice)
    }
  }

  fun runDeviceAiProtocol() {
    launchDeviceAiProtocol(
      launchRequest =
        DeviceAiProtocolLaunchRequest(
          modelRef = uiState.value.deviceAiModelRef,
          revision = uiState.value.deviceAiModelRevision,
          fileName = uiState.value.deviceAiModelFileName,
          expectedSha256 = uiState.value.deviceAiExpectedSha256,
          trigger = DeviceAiProtocolTrigger.UI,
        )
    )
  }

  fun runDeviceAiProtocolFromAutomationLaunch(launchRequest: DeviceAiProtocolLaunchRequest) {
    launchDeviceAiProtocol(launchRequest = launchRequest)
  }

  suspend fun awaitModelAllowlistLoaded() {
    if (!uiState.value.loadingModelAllowlist) {
      return
    }
    uiState.first { !it.loadingModelAllowlist }
  }

  private fun launchDeviceAiProtocol(launchRequest: DeviceAiProtocolLaunchRequest) {
    val currentState = uiState.value
    if (currentState.isRunningDeviceAiProtocol) {
      return
    }

    val request =
      buildDeviceAiProtocolRunRequest(
        launchRequest = launchRequest,
        currentState = currentState,
      )
    _uiState.update {
      it.copy(
        deviceAiModelRef = request.modelRef,
        deviceAiModelRevision = request.revision,
        deviceAiModelFileName = request.fileName,
        deviceAiExpectedSha256 = request.expectedSha256,
        deviceAiState = FlowExecutionState.LOADING,
        deviceAiStateMessage = stringResource(R.string.device_ai_protocol_running),
        deviceAiCorrelationId = request.correlationId,
        deviceAiArtifactPath = "",
        deviceAiArtifactSha256 = "",
        deviceAiArtifactSizeBytes = 0L,
        isRunningDeviceAiProtocol = true,
      )
    }

    viewModelScope.launch(Dispatchers.IO) {
      awaitModelAllowlistLoaded()
      StructuredLog.d(
        TAG,
        "device_ai_protocol_started",
        "correlationId" to request.correlationId,
        "modelRef" to request.modelRef,
        "fileName" to request.fileName,
        "trigger" to request.trigger.name.lowercase(),
      )
      val result = deviceAiProtocolRunner.run(request = request, availableModels = getAllModels())
      if (result.terminalState == DeviceAiProtocolTerminalState.SUCCESS) {
        StructuredLog.d(
          TAG,
          "device_ai_protocol_succeeded",
          "correlationId" to result.correlationId,
          "artifactPath" to result.artifactPath,
          "sizeBytes" to result.artifactSizeBytes,
          "reportPath" to result.reportPath,
        )
      } else {
        StructuredLog.w(
          TAG,
          "device_ai_protocol_failed",
          "correlationId" to result.correlationId,
          "code" to result.code,
          "state" to result.terminalState.name,
          "reportPath" to result.reportPath,
        )
      }
      _uiState.update {
        it.copy(
          deviceAiState = deviceAiState(result),
          deviceAiStateMessage = deviceAiStateMessage(result),
          deviceAiCorrelationId = result.correlationId,
          deviceAiArtifactPath = result.artifactPath,
          deviceAiArtifactSha256 = result.artifactSha256,
          deviceAiArtifactSizeBytes = result.artifactSizeBytes,
          isRunningDeviceAiProtocol = false,
        )
      }
    }
  }

  fun loadCloudProviders() {
    val baseUrl = resolveControlPlaneBaseUrl()
    val candidateBaseUrls = BaoEdgeRuntimeConfig.resolveControlPlaneCandidateBaseUrls(baseUrl)
    val currentState = uiState.value.providerRegistryState
    if (currentState == FlowExecutionState.LOADING) return

    viewModelScope.launch(Dispatchers.IO) {
      StructuredLog.d(
        TAG,
        "cloud_provider_registry_request_resolved",
        "candidateCount" to candidateBaseUrls.size,
        "candidates" to candidateBaseUrls.joinToString(separator = ","),
      )
      _uiState.update {
        it.copy(
          isLoadingProviderRegistry = true,
          providerRegistryState = FlowExecutionState.LOADING,
          providerRegistryMessage = stringResource(R.string.cloud_provider_registry_loading),
        )
      }

      try {
        val sourceEnvelope = cloudControlPlaneClient.fetchModelSources(baseUrl = baseUrl)
        val sourceOptions =
          sourceEnvelope?.data?.sources
            ?.mapNotNull { source ->
              val sourceId = source.id.trim()
              if (sourceId.isBlank()) {
                return@mapNotNull null
              }
              source.copy(
                id = sourceId,
                displayName = source.displayName.trim(),
                aliases = source.aliases
                  .map(String::trim)
                  .filter(String::isNotBlank)
                  .distinct(),
              )
            }
            ?.filter { it.id.isNotBlank() }
            ?.distinctBy { it.id.lowercase() }
            ?.sortedBy { it.displayName.lowercase() }
            .orEmpty()
        val sourceFallbackId =
          sourceEnvelope?.data?.defaultSource?.trim().orEmpty()
        val canonicalSourceFallback = resolveModelSourceSelection(
          candidate = sourceFallbackId,
          options = sourceOptions,
          fallback = _uiState.value.cloudModelSource,
          canonicalFallback = BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
        )

        val settingsSnapshot = cloudControlPlaneClient.fetchOperatorSettings(baseUrl = baseUrl)
        val aiSettings = settingsSnapshot.aiSettings
        val providerDescriptors =
          aiSettings.providers
            .mapNotNull(::normalizeOperatorProviderDescriptor)
        val providers = providerDescriptors.map(CloudOperatorProviderDescriptor::id)
        val providerDisplayNames = providerDescriptors.associate { provider ->
          provider.id to provider.displayName.ifBlank { provider.id }
        }
        val providerSupportsBaseUrlOverride =
          providerDescriptors
            .filter { it.hasBaseUrlConfig }
            .map(CloudOperatorProviderDescriptor::id)
            .toSet()
        _uiState.update {
          val serverChatAssignment = aiSettings.modeAssignments[OperatorRuntimeUsage.CHAT.wireValue]
          val resolvedProvider =
            it.activeChatProvider.takeIf { selected -> providers.contains(selected) }
              ?: serverChatAssignment?.provider?.takeIf { provider -> providers.contains(provider) }
              ?: providerDescriptors.firstOrNull { descriptor -> descriptor.configured }?.id
              ?: ""
          val nextAssignments =
            OperatorRuntimeUsage.ordered.fold(it.runtimeAssignments) { assignments, usage ->
              val currentAssignment = assignments.assignmentFor(usage)
              val serverAssignment = aiSettings.modeAssignments[usage.wireValue]
              val resolvedAssignmentProvider =
                currentAssignment.provider.takeIf { provider -> providers.contains(provider) }
                  ?: serverAssignment?.provider?.takeIf { provider -> providers.contains(provider) }
                  ?: if (usage == OperatorRuntimeUsage.CHAT) resolvedProvider else ""
              val resolvedAssignmentSource =
                resolveModelSourceSelection(
                  candidate = currentAssignment.source,
                  options = sourceOptions,
                  fallback = aiSettings.defaultModelSource.ifBlank { it.cloudModelSource },
                  canonicalFallback = BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
                )
              assignments.withAssignment(
                usage,
                currentAssignment.copy(
                  provider = resolvedAssignmentProvider,
                  model = currentAssignment.model.ifBlank { serverAssignment?.model.orEmpty() },
                  source = resolvedAssignmentSource,
                ),
              )
            }
          val nextChatAssignment =
            nextAssignments.assignmentFor(OperatorRuntimeUsage.CHAT).copy(
              provider = resolvedProvider,
              model =
                nextAssignments.assignmentFor(OperatorRuntimeUsage.CHAT).model.ifBlank {
                  aiSettings.defaultModel.orEmpty()
                },
            )
          val resolvedModelSource =
            resolveModelSourceSelection(
              candidate = nextChatAssignment.source,
              options = sourceOptions,
              fallback = aiSettings.defaultModelSource.ifBlank { canonicalSourceFallback },
              canonicalFallback = BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
            )
          val resolvedPullSource =
            resolveModelSourceSelection(
              candidate = it.cloudPullSource,
              options = sourceOptions,
              fallback = resolvedModelSource,
              canonicalFallback = canonicalSourceFallback,
            )
          it.copy(
            isLoadingProviderRegistry = false,
            providerOptions = providers,
            providerDisplayNames = providerDisplayNames,
            providerSupportsBaseUrlOverride = providerSupportsBaseUrlOverride,
            runtimeAssignments = nextAssignments.withAssignment(OperatorRuntimeUsage.CHAT, nextChatAssignment),
            activeChatProvider = resolvedProvider,
            activeChatModel = nextChatAssignment.model,
            modelSourceOptions = sourceOptions,
            cloudModelSource = resolvedModelSource,
            cloudPullSource = resolvedPullSource,
            cloudChatTtsVoice = it.cloudChatTtsVoice.ifBlank { aiSettings.ttsVoice },
            cloudChatTtsOutputMimeType = it.cloudChatTtsOutputMimeType.ifBlank { aiSettings.ttsOutputFormat },
            providerRegistryState = if (providers.isEmpty()) FlowExecutionState.EMPTY else FlowExecutionState.SUCCESS,
            providerRegistryMessage =
              if (providers.isEmpty()) {
                stringResource(R.string.cloud_provider_registry_empty)
              } else {
                stringResource(R.string.cloud_provider_registry_loaded, providers.size)
              },
          )
        }
        OperatorRuntimeUsage.ordered.forEach { usage ->
          preferencesStore.saveRuntimeAssignment(
            usage = usage,
            assignment = uiState.value.runtimeAssignments.assignmentFor(usage),
          )
        }
        preferencesStore.saveCloudModelSource(source = uiState.value.cloudModelSource)
        preferencesStore.saveCloudPullSource(source = uiState.value.cloudPullSource)
        if (uiState.value.cloudChatTtsVoice.isNotBlank()) {
          preferencesStore.saveCloudChatTtsVoice(voice = uiState.value.cloudChatTtsVoice)
        }
        if (uiState.value.cloudChatTtsOutputMimeType.isNotBlank()) {
          preferencesStore.saveCloudChatTtsOutputMimeType(mimeType = uiState.value.cloudChatTtsOutputMimeType)
        }
      } catch (error: Exception) {
        StructuredLog.e(TAG, "cloud_provider_registry_load_failed", error)
        _uiState.update {
          it.copy(
            isLoadingProviderRegistry = false,
            providerRegistryState = FlowExecutionState.ERROR_RETRYABLE,
            providerRegistryMessage = error.message.orEmpty().ifBlank {
              stringResource(R.string.cloud_provider_registry_load_failed)
            },
          )
        }
      }
    }
  }

  fun loadCloudModelsForSelectedProvider() {
    loadCloudModelsForRuntimeUsage(usage = OperatorRuntimeUsage.CHAT)
  }

  /** Loads provider models for the requested capability usage without expanding chat controls. */
  fun loadCloudModelsForRuntimeUsage(usage: OperatorRuntimeUsage) {
    val assignment = uiState.value.runtimeAssignments.assignmentFor(usage)
    val provider =
      if (usage == OperatorRuntimeUsage.CHAT) {
        uiState.value.activeChatProvider.trim()
      } else {
        assignment.provider.trim()
      }
    val baseUrl = resolveControlPlaneBaseUrl()
    if (provider.isEmpty()) {
      _uiState.update {
        it.copy(
          cloudModelListState = FlowExecutionState.ERROR_NON_RETRYABLE,
          cloudModelListMessage = stringResource(R.string.cloud_models_select_provider_before_loading),
        )
      }
      return
    }

    val currentState = uiState.value.cloudModelListState
    if (currentState == FlowExecutionState.LOADING) return

    viewModelScope.launch(Dispatchers.IO) {
      _uiState.update {
        it.copy(
          isLoadingCloudModels = true,
          cloudModelListState = FlowExecutionState.LOADING,
          cloudModelListMessage = stringResource(R.string.cloud_models_loading_for_provider, provider),
        )
      }

      try {
        val selectedModelHint =
          if (usage == OperatorRuntimeUsage.CHAT) {
            uiState.value.activeChatModel.ifBlank { null }
          } else {
            uiState.value.runtimeAssignments.assignmentFor(usage).model.ifBlank { null }
          }
        val result =
          cloudControlPlaneClient.fetchProviderModelCatalog(
            baseUrl = baseUrl,
            provider = provider,
            selectedModel = selectedModelHint,
            apiKey = credentialStore.readProviderApiKey(provider, activeProviderProfileIdFor(provider)),
            providerBaseUrl = activeProviderProfileFor(provider)?.baseUrl?.ifBlank { null } ?: uiState.value.providerBaseUrl.ifBlank { null },
          )
        val filteredDescriptors = filterCatalogForUsage(result.models, usage)
        val optionIds = filteredDescriptors.map(CloudModelDescriptor::id).distinct().sorted()
        val optionLabels =
          filteredDescriptors.associate { descriptor ->
            descriptor.id to descriptor.optionLabel()
          }
        val selectedModel =
          result.selectedModel?.ifBlank { null }?.takeIf { selected ->
            optionIds.contains(selected)
          }
            ?: selectedModelHint?.takeIf { selected -> optionIds.contains(selected) }
            ?: optionIds.firstOrNull()
            ?: ""
        _uiState.update {
          val nextAssignments =
            it.runtimeAssignments.withAssignment(
              usage,
              it.runtimeAssignments.assignmentFor(usage).copy(
                provider = provider,
                model = selectedModel,
                source =
                  it.runtimeAssignments.assignmentFor(usage).source.ifBlank {
                    it.cloudModelSource
                  },
              ),
            )
          it.copy(
            isLoadingCloudModels = false,
            cloudModelOptionsProvider = provider,
            cloudModelDescriptors = filteredDescriptors,
            cloudModelDisplayNames = optionLabels,
            cloudModelOptions = optionIds,
            runtimeAssignments = nextAssignments,
            activeChatProvider = if (usage == OperatorRuntimeUsage.CHAT) provider else it.activeChatProvider,
            activeChatModel = if (usage == OperatorRuntimeUsage.CHAT) selectedModel else it.activeChatModel,
            cloudModelListState = parseFlowExecutionState(result.state),
            cloudModelListMessage = if (result.message.isNotBlank()) {
              result.message
            } else if (optionIds.isEmpty()) {
              stringResource(R.string.cloud_models_none_for_provider)
            } else {
              stringResource(R.string.cloud_models_loaded, optionIds.size)
            },
          )
        }
        preferencesStore.saveRuntimeAssignment(
          usage = usage,
          assignment = uiState.value.runtimeAssignments.assignmentFor(usage),
        )
      } catch (error: Exception) {
        StructuredLog.e(TAG, "cloud_model_list_load_failed", error, "provider" to provider)
        _uiState.update {
          it.copy(
            isLoadingCloudModels = false,
            cloudModelOptionsProvider = provider,
            cloudModelListState = FlowExecutionState.ERROR_RETRYABLE,
            cloudModelDescriptors = listOf(),
            cloudModelDisplayNames = mapOf(),
            cloudModelOptions = listOf(),
            activeChatModel = if (usage == OperatorRuntimeUsage.CHAT) "" else it.activeChatModel,
            cloudModelListMessage = error.message.orEmpty().ifBlank {
              stringResource(R.string.cloud_models_load_failed)
            },
          )
        }
      }
    }
  }

  private fun normalizeOperatorProviderDescriptor(
    descriptor: CloudOperatorProviderDescriptor,
  ): CloudOperatorProviderDescriptor? {
    val id = descriptor.id.trim()
    if (id.isBlank()) {
      return null
    }
    return descriptor.copy(
      id = id,
      displayName = descriptor.displayName.trim().ifBlank { id },
      defaultModels = descriptor.defaultModels.map(String::trim).filter(String::isNotBlank).distinct(),
    )
  }

  fun pullCloudModel() {
    val state = uiState.value
    val requestModelRef = state.cloudPullModelRef.ifBlank { state.activeChatModel }.trim()
    if (requestModelRef.isEmpty()) {
      _uiState.update {
        it.copy(
          cloudPullState = FlowExecutionState.ERROR_NON_RETRYABLE,
          cloudPullMessage = stringResource(R.string.cloud_pull_model_ref_required),
          isSubmittingCloudPull = false,
        )
      }
      return
    }

    val provider = state.activeChatProvider.trim()
    if (provider.isEmpty()) {
      _uiState.update {
        it.copy(
          cloudPullState = FlowExecutionState.ERROR_NON_RETRYABLE,
          cloudPullMessage = stringResource(R.string.cloud_pull_provider_required),
          isSubmittingCloudPull = false,
        )
      }
      return
    }

    val baseUrl = resolveControlPlaneBaseUrl()
    val modelSource =
      resolveModelSourceSelection(
        candidate = state.cloudPullSource,
        options = state.modelSourceOptions,
        fallback = state.cloudModelSource,
        canonicalFallback = BaoEdgeRuntimeConfig.controlPlaneDefaultModelSource,
      )
    val timeoutMs =
      parsePositiveInt(state.cloudPullTimeoutMsText)
        ?: BaoEdgeRuntimeConfig.controlPlaneDefaultPullTimeoutMs
    val request = CloudModelPullRequest(
      modelRef = requestModelRef,
      source = modelSource,
      platform = null,
      force = state.cloudPullForce,
      timeoutMs = timeoutMs,
      correlationId = null,
    )

    viewModelScope.launch(Dispatchers.IO) {
      _uiState.update {
        it.copy(
          isSubmittingCloudPull = true,
          isPollingCloudPull = false,
          cloudPullState = FlowExecutionState.LOADING,
          cloudPullMessage = stringResource(R.string.cloud_pull_submit_request),
          cloudPullJobId = null,
        )
      }
      try {
        val envelope = cloudControlPlaneClient.startModelPull(baseUrl = baseUrl, request = request)
        applyCloudPullEnvelope(envelope)

        val terminalState = envelope.state
        val jobId = envelope.jobId
        if (!isTerminalCloudState(terminalState) && !jobId.isNullOrBlank()) {
          pollCloudModelPull(baseUrl = baseUrl, jobId = jobId)
        } else {
          _uiState.update {
            it.copy(isSubmittingCloudPull = false, isPollingCloudPull = false)
          }
        }
      } catch (error: Exception) {
        StructuredLog.e(TAG, "cloud_model_pull_request_failed", error, "modelRef" to requestModelRef)
        _uiState.update {
          it.copy(
            isSubmittingCloudPull = false,
            isPollingCloudPull = false,
            cloudPullState = FlowExecutionState.ERROR_RETRYABLE,
            cloudPullMessage = error.message.orEmpty().ifBlank {
              stringResource(R.string.cloud_pull_submit_failed)
            },
          )
        }
      }
    }
  }

  private fun pollCloudModelPull(baseUrl: String, jobId: String) {
    viewModelScope.launch(Dispatchers.IO) {
      var attempts = 0
      _uiState.update {
        it.copy(
          isPollingCloudPull = true,
          cloudPullState = FlowExecutionState.LOADING,
          cloudPullMessage = stringResource(R.string.cloud_pull_poll_job, jobId),
        )
      }

      var state = uiState.value.cloudPullState
      while (attempts < BaoEdgeRuntimeConfig.controlPlanePollAttempts && !isTerminalCloudState(state)) {
        if (attempts > 0) {
          delay(BaoEdgeRuntimeConfig.controlPlanePollIntervalMs.toLong())
        }
        attempts++
        try {
          val envelope = cloudControlPlaneClient.pollModelPull(baseUrl = baseUrl, jobId = jobId)
          applyCloudPullEnvelope(envelope)
          state = envelope.state
        } catch (error: Exception) {
          StructuredLog.e(TAG, "cloud_model_pull_poll_failed", error, "jobId" to jobId)
          _uiState.update {
            it.copy(
              isPollingCloudPull = false,
              isSubmittingCloudPull = false,
              cloudPullState = FlowExecutionState.ERROR_RETRYABLE,
              cloudPullMessage =
                error.message.orEmpty().ifBlank {
                  stringResource(R.string.cloud_pull_polling_failed)
                },
            )
          }
          return@launch
        }
      }

      if (!isTerminalCloudState(state)) {
        _uiState.update {
          it.copy(
            isPollingCloudPull = false,
            isSubmittingCloudPull = false,
            cloudPullState = FlowExecutionState.ERROR_RETRYABLE,
            cloudPullMessage = stringResource(R.string.cloud_pull_timeout),
          )
        }
        return@launch
      }
      _uiState.update {
        it.copy(isPollingCloudPull = false, isSubmittingCloudPull = false)
      }
    }
  }

  private fun applyCloudPullEnvelope(envelope: CloudModelPullEnvelope) {
    val data = envelope.data
    val message =
      when {
        data != null -> {
          val requested = data.requestedModelRef
          val normalized = data.normalizedModelRef
          val status = data.status.ifBlank { stringResource(R.string.cloud_model_status_unknown) }
          val elapsed = if (data.elapsedMs > 0) stringResource(R.string.cloud_pull_elapsed_ms, data.elapsedMs) else ""
          val artifact = data.artifactPath?.ifBlank { null }?.let { stringResource(R.string.cloud_pull_artifact, it) } ?: ""
          stringResource(R.string.cloud_pull_job_status, requested, normalized, status, elapsed, artifact)
        }
        envelope.mismatches.isNotEmpty() -> envelope.mismatches.joinToString(" ")
        envelope.error != null -> envelope.error.reason
        else -> stringResource(R.string.cloud_pull_status_updated)
      }
    _uiState.update {
      it.copy(
        cloudPullJobId = envelope.jobId ?: it.cloudPullJobId,
        cloudPullState = envelope.state,
        cloudPullMessage = message,
      )
    }
    if (isTerminalCloudState(envelope.state)) {
      StructuredLog.d(
        TAG,
        "cloud_pull_terminal_state_observed",
        "state" to envelope.state.name,
        "message" to message,
      )
    }
  }

  private fun isTerminalCloudState(state: FlowExecutionState): Boolean {
    return when (state) {
      FlowExecutionState.SUCCESS,
      FlowExecutionState.ERROR_RETRYABLE,
      FlowExecutionState.ERROR_NON_RETRYABLE,
      FlowExecutionState.UNAUTHORIZED -> true

      FlowExecutionState.IDLE,
      FlowExecutionState.LOADING,
      FlowExecutionState.EMPTY -> false
    }
  }

  private fun parsePositiveInt(rawTimeout: String): Int? {
    val timeout = rawTimeout.trim().toLongOrNull()
    return timeout
      ?.takeIf { it in 1..Int.MAX_VALUE.toLong() }
      ?.toInt()
  }

  private fun deviceAiState(result: DeviceAiProtocolRunResult): FlowExecutionState {
    return when (result.terminalState) {
      DeviceAiProtocolTerminalState.SUCCESS -> FlowExecutionState.SUCCESS
      DeviceAiProtocolTerminalState.ERROR_RETRYABLE -> FlowExecutionState.ERROR_RETRYABLE
      DeviceAiProtocolTerminalState.ERROR_NON_RETRYABLE -> FlowExecutionState.ERROR_NON_RETRYABLE
      DeviceAiProtocolTerminalState.UNAUTHORIZED -> FlowExecutionState.UNAUTHORIZED
    }
  }

  private fun deviceAiStateMessage(result: DeviceAiProtocolRunResult): String {
    return when (result.code) {
      "MODEL_REF_REQUIRED" -> stringResource(R.string.device_ai_model_ref_required)
      "MODEL_FILE_REQUIRED" -> stringResource(R.string.device_ai_model_file_required)
      "MODEL_NOT_ALLOWLISTED" -> stringResource(R.string.device_ai_model_not_allowlisted)
      "CAPABILITIES_MISSING" -> stringResource(R.string.device_ai_capabilities_missing)
      else ->
        when (result.terminalState) {
          DeviceAiProtocolTerminalState.SUCCESS -> stringResource(R.string.device_ai_protocol_success)
          DeviceAiProtocolTerminalState.ERROR_RETRYABLE -> stringResource(R.string.device_ai_protocol_failed_retryable)
          DeviceAiProtocolTerminalState.ERROR_NON_RETRYABLE,
          DeviceAiProtocolTerminalState.UNAUTHORIZED -> stringResource(R.string.device_ai_protocol_failed)
        }
    }
  }

  private fun buildDeviceAiProtocolRunRequest(
    launchRequest: DeviceAiProtocolLaunchRequest,
    currentState: ModelManagerUiState,
  ): DeviceAiProtocolRunRequest {
    return DeviceAiProtocolRunRequest(
      correlationId =
        launchRequest.correlationId?.trim().orEmpty().ifBlank {
          "android-device-ai-${System.currentTimeMillis()}"
        },
      modelRef =
        launchRequest.modelRef?.trim().orEmpty().ifBlank {
          currentState.deviceAiModelRef.trim().ifBlank { BaoEdgeRuntimeConfig.deviceAiRequiredModelRef }
        },
      revision =
        launchRequest.revision?.trim().orEmpty().ifBlank {
          currentState.deviceAiModelRevision.trim().ifBlank {
            BaoEdgeRuntimeConfig.deviceAiRequiredModelRevision
          }
        },
      fileName =
        launchRequest.fileName?.trim().orEmpty().ifBlank {
          currentState.deviceAiModelFileName.trim().ifBlank {
            BaoEdgeRuntimeConfig.deviceAiRequiredModelFileName
          }
        },
      expectedSha256 =
        launchRequest.expectedSha256?.trim().orEmpty().ifBlank {
          currentState.deviceAiExpectedSha256.trim().ifBlank {
            BaoEdgeRuntimeConfig.deviceAiRequiredModelSha256
          }
        },
      token = BaoEdgeRuntimeConfig.deviceAiHfToken.ifBlank { null },
      trigger = launchRequest.trigger,
      timeoutMs = BaoEdgeRuntimeConfig.deviceAiProtocolTimeoutMs.toLong(),
    )
  }

  private fun resolveModelSourceSelection(
    candidate: String,
    options: List<CloudModelSourceDescriptor>,
    fallback: String,
    canonicalFallback: String,
  ): String {
    val trimmedCandidate = candidate.trim()
    if (!trimmedCandidate.isBlank()) {
      val direct = resolveKnownModelSourceId(trimmedCandidate, options)
      if (!direct.isNullOrBlank()) {
        return direct
      }
    }

    val trimmedFallback = fallback.trim()
    if (!trimmedFallback.isBlank()) {
      val fallbackMatch = resolveKnownModelSourceId(trimmedFallback, options)
      if (!fallbackMatch.isNullOrBlank()) {
        return fallbackMatch
      }
    }

    val trimmedCanonicalFallback = canonicalFallback.trim()
    if (!trimmedCanonicalFallback.isBlank()) {
      val canonicalMatch = resolveKnownModelSourceId(trimmedCanonicalFallback, options)
      if (!canonicalMatch.isNullOrBlank()) {
        return canonicalMatch
      }
    }

    if (options.isEmpty()) {
      return trimmedCanonicalFallback.ifBlank { trimmedFallback }
    }

    return options.firstOrNull { it.id.isNotBlank() }?.id?.trim().orEmpty()
      .ifBlank { trimmedCanonicalFallback.ifBlank { trimmedFallback } }
  }

  private fun resolveKnownModelSourceId(
    rawSource: String,
    options: List<CloudModelSourceDescriptor>,
  ): String? {
    val trimmedSource = rawSource.trim()
    if (trimmedSource.isBlank()) {
      return null
    }
    val direct = options.firstOrNull { option ->
      option.id.equals(trimmedSource, ignoreCase = true)
    }?.id
    if (!direct.isNullOrBlank()) {
      return direct
    }
    val alias = options.firstOrNull { option ->
      option.aliases.any { alias -> alias.equals(trimmedSource, ignoreCase = true) }
    }?.id
    if (!alias.isNullOrBlank()) {
      return alias
    }
    return null
  }

  private fun resolveControlPlaneBaseUrl(): String {
    return uiState.value.controlPlaneBaseUrl.ifBlank { BaoEdgeRuntimeConfig.controlPlaneBaseUrl }
  }

  fun updateConfigValuesUpdateTrigger() {
    _uiState.update { _uiState.value.copy(configValuesUpdateTrigger = System.currentTimeMillis()) }
  }

  fun selectModel(model: Model) {
    if (_uiState.value.selectedModel.name != model.name) {
      _uiState.update { _uiState.value.copy(selectedModel = model) }
    }
  }

  fun downloadModel(task: Task?, model: Model) {
    // Update status.
    setDownloadStatus(
      curModel = model,
      status = ModelDownloadStatus(status = ModelDownloadStatusType.IN_PROGRESS),
    )

    // Delete the model files first.
    deleteModel(model = model)

    // Start to send download request.
    downloadRepository.downloadModel(
      task = task,
      model = model,
      onStatusUpdated = this::setDownloadStatus,
    )
  }

  fun cancelDownloadModel(model: Model) {
    downloadRepository.cancelDownloadModel(model)
    deleteModel(model = model)
  }

  fun deleteModel(model: Model) {
    if (model.imported) {
      deleteFilesFromImportDir(model.downloadFileName)
    } else {
      deleteDirFromExternalFilesDir(model.normalizedName)
    }

    // Update model download status to NotDownloaded.
    val curModelDownloadStatus = uiState.value.modelDownloadStatus.toMutableMap()
    curModelDownloadStatus[model.name] =
      ModelDownloadStatus(status = ModelDownloadStatusType.NOT_DOWNLOADED)

    // Delete model from the list if model is imported as a local model.
    if (model.imported) {
      for (curTask in uiState.value.tasks) {
        val index = curTask.models.indexOf(model)
        if (index >= 0) {
          curTask.models.removeAt(index)
        }
        curTask.updateTrigger.value = System.currentTimeMillis()
      }
      curModelDownloadStatus.remove(model.name)

      // Update data store asynchronously.
      viewModelScope.launch(Dispatchers.IO) {
        val importedModels = dataStoreRepository.readImportedModels().toMutableList()
        val importedModelIndex = importedModels.indexOfFirst { it.fileName == model.name }
        if (importedModelIndex >= 0) {
          importedModels.removeAt(importedModelIndex)
        }
        dataStoreRepository.saveImportedModels(importedModels = importedModels)
      }
    }
    val newUiState =
      uiState.value.copy(
        modelDownloadStatus = curModelDownloadStatus,
        tasks = uiState.value.tasks.toList(),
        modelImportingUpdateTrigger = System.currentTimeMillis(),
      )
    _uiState.update { newUiState }
  }

  fun initializeModel(context: Context, task: Task, model: Model, force: Boolean = false) {
    viewModelScope.launch(Dispatchers.Default) {
      modelMutex(model.name).withLock {
        if (
          !force &&
            uiState.value.modelInitializationStatus[model.name]?.status ==
              ModelInitializationStatusType.INITIALIZED
        ) {
          StructuredLog.d(TAG, "model_initialization_skipped", "model" to model.name, "reason" to "already_initialized")
          return@withLock
        }

        if (model.initializing) {
          model.cleanUpAfterInit = false
          StructuredLog.d(TAG, "model_initialization_skipped", "model" to model.name, "reason" to "already_initializing")
          return@withLock
        }

        cleanupModelLocked(context = context, task = task, model = model)

        StructuredLog.d(TAG, "model_initialization_started", "model" to model.name, "taskId" to task.id)
        model.initializing = true
        updateModelInitializationStatus(
          model = model,
          status = ModelInitializationStatusType.INITIALIZING,
        )

        val onDone: (error: String) -> Unit = { error ->
          model.initializing = false
          if (model.instance != null) {
            StructuredLog.d(TAG, "model_initialization_succeeded", "model" to model.name)
            updateModelInitializationStatus(
              model = model,
              status = ModelInitializationStatusType.INITIALIZED,
            )
            if (model.cleanUpAfterInit) {
              StructuredLog.d(TAG, "model_cleanup_deferred_after_init", "model" to model.name)
              cleanupModel(context = context, task = task, model = model)
            }
          } else if (error.isNotEmpty()) {
            StructuredLog.w(TAG, "model_initialization_failed", "model" to model.name)
            updateModelInitializationStatus(
              model = model,
              status = ModelInitializationStatusType.ERROR,
              error = error,
            )
          }
        }

        getCustomTaskByTaskId(id = task.id)
          ?.initializeModelFn(
            context = context,
            coroutineScope = viewModelScope,
            model = model,
            onDone = onDone,
          )
      }
    }
  }

  fun cleanupModel(context: Context, task: Task, model: Model, onDone: () -> Unit = {}) {
    viewModelScope.launch(Dispatchers.Default) {
      modelMutex(model.name).withLock {
        cleanupModelLocked(context, task, model, onDone)
      }
    }
  }

  private fun cleanupModelLocked(
    context: Context,
    task: Task,
    model: Model,
    onDone: () -> Unit = {},
  ) {
    if (model.instance != null) {
      model.cleanUpAfterInit = false
      StructuredLog.d(TAG, "model_cleanup_started", "model" to model.name, "taskId" to task.id)
      val onDone: () -> Unit = {
        model.instance = null
        model.initializing = false
        updateModelInitializationStatus(
          model = model,
          status = ModelInitializationStatusType.NOT_INITIALIZED,
        )
        StructuredLog.d(TAG, "model_cleanup_completed", "model" to model.name, "taskId" to task.id)
        onDone()
      }
      getCustomTaskByTaskId(id = task.id)
        ?.cleanUpModelFn(
          context = context,
          coroutineScope = viewModelScope,
          model = model,
          onDone = onDone,
        )
    } else {
      if (model.initializing) {
        StructuredLog.d(
          TAG,
          "model_cleanup_deferred",
          "model" to model.name,
        )
        model.cleanUpAfterInit = true
      }
    }
  }

  fun setDownloadStatus(curModel: Model, status: ModelDownloadStatus) {
    // Update model download progress.
    val curModelDownloadStatus = uiState.value.modelDownloadStatus.toMutableMap()
    curModelDownloadStatus[curModel.name] = status
    val newUiState = uiState.value.copy(modelDownloadStatus = curModelDownloadStatus)

    // Delete downloaded file if status is failed or not_downloaded.
    if (
      status.status == ModelDownloadStatusType.FAILED ||
        status.status == ModelDownloadStatusType.NOT_DOWNLOADED
    ) {
      deleteFileFromExternalFilesDir(curModel.downloadFileName)
    }

    _uiState.update { newUiState }
  }

  fun setInitializationStatus(model: Model, status: ModelInitializationStatus) {
    val curStatus = uiState.value.modelInitializationStatus.toMutableMap()
    if (curStatus.containsKey(model.name)) {
      curStatus[model.name] = status
      _uiState.update { _uiState.value.copy(modelInitializationStatus = curStatus) }
    }
  }

  fun addTextInputHistory(text: String) {
    if (uiState.value.textInputHistory.indexOf(text) < 0) {
      val newHistory = uiState.value.textInputHistory.toMutableList()
      newHistory.add(0, text)
      if (newHistory.size > TEXT_INPUT_HISTORY_MAX_SIZE) {
        newHistory.removeAt(newHistory.size - 1)
      }
      _uiState.update { _uiState.value.copy(textInputHistory = newHistory) }
      val history = _uiState.value.textInputHistory
      viewModelScope.launch { dataStoreRepository.saveTextInputHistory(history) }
    } else {
      promoteTextInputHistoryItem(text)
    }
  }

  fun promoteTextInputHistoryItem(text: String) {
    val index = uiState.value.textInputHistory.indexOf(text)
    if (index >= 0) {
      val newHistory = uiState.value.textInputHistory.toMutableList()
      newHistory.removeAt(index)
      newHistory.add(0, text)
      _uiState.update { _uiState.value.copy(textInputHistory = newHistory) }
      val history = _uiState.value.textInputHistory
      viewModelScope.launch { dataStoreRepository.saveTextInputHistory(history) }
    }
  }

  fun deleteTextInputHistory(text: String) {
    val index = uiState.value.textInputHistory.indexOf(text)
    if (index >= 0) {
      val newHistory = uiState.value.textInputHistory.toMutableList()
      newHistory.removeAt(index)
      _uiState.update { _uiState.value.copy(textInputHistory = newHistory) }
      val history = _uiState.value.textInputHistory
      viewModelScope.launch { dataStoreRepository.saveTextInputHistory(history) }
    }
  }

  fun clearTextInputHistory() {
    _uiState.update { _uiState.value.copy(textInputHistory = mutableListOf()) }
    viewModelScope.launch { dataStoreRepository.saveTextInputHistory(emptyList()) }
  }

  fun readThemeOverride(): Theme {
    return ThemeSettings.themeOverride.value
  }

  fun saveThemeOverride(theme: Theme) {
    viewModelScope.launch { dataStoreRepository.saveTheme(theme = theme) }
  }

  fun saveAppLocale(appLocaleTag: String) {
    val normalized = normalizeAppLocaleTag(appLocaleTag)
    _uiState.update { it.copy(appLocaleTag = normalized) }
    viewModelScope.launch { dataStoreRepository.saveAppLocale(localeTag = normalized) }
  }

  fun getModelUrlResponse(model: Model, accessToken: String? = null): Int {
    try {
      val url = URL(model.url)
      val connection = url.openConnection() as HttpURLConnection
      if (accessToken != null) {
        connection.setRequestProperty("Authorization", "Bearer $accessToken")
      }
      connection.connect()

      // Report the result.
      return connection.responseCode
    } catch (e: Exception) {
      StructuredLog.e(TAG, "model_url_response_failed", e, "model" to model.name)
      return -1
    }
  }

  fun addImportedLlmModel(info: ImportedModel) {
    StructuredLog.d(
      TAG,
      "imported_llm_model_added",
      "fileName" to info.fileName,
      "fileSize" to info.fileSize,
    )

    // Create model.
    val model = createModelFromImportedModelInfo(info = info)

    for (task in
      getTasksByIds(
        ids =
          setOf(
            BuiltInTaskId.LLM_CHAT,
            BuiltInTaskId.LLM_ASK_IMAGE,
            BuiltInTaskId.LLM_ASK_AUDIO,
            BuiltInTaskId.LLM_PROMPT_LAB,
            BuiltInTaskId.LLM_TINY_GARDEN,
            BuiltInTaskId.LLM_MOBILE_ACTIONS,
          )
      )) {
      // Remove duplicated imported model if existed.
      val modelIndex = task.models.indexOfFirst { info.fileName == it.name && it.imported }
      if (modelIndex >= 0) {
        StructuredLog.d(TAG, "imported_model_duplicate_removed_from_task", "taskId" to task.id)
        task.models.removeAt(modelIndex)
      }
      if (
        (task.id == BuiltInTaskId.LLM_ASK_IMAGE && model.llmSupportImage) ||
          (task.id == BuiltInTaskId.LLM_ASK_AUDIO && model.llmSupportAudio) ||
          (task.id == BuiltInTaskId.LLM_TINY_GARDEN && model.llmSupportTinyGarden) ||
          (task.id == BuiltInTaskId.LLM_MOBILE_ACTIONS && model.llmSupportMobileActions) ||
          (task.id != BuiltInTaskId.LLM_ASK_IMAGE &&
            task.id != BuiltInTaskId.LLM_ASK_AUDIO &&
            task.id != BuiltInTaskId.LLM_TINY_GARDEN &&
            task.id != BuiltInTaskId.LLM_MOBILE_ACTIONS)
      ) {
        task.models.add(model)
        if (task.id == BuiltInTaskId.LLM_TINY_GARDEN) {
          val newConfigs = model.configs.toMutableList()
          newConfigs.add(RESET_CONVERSATION_TURN_COUNT_CONFIG)
          model.configs = newConfigs
          model.preProcess()
        }
      }
      task.updateTrigger.value = System.currentTimeMillis()
    }

    // Add initial status and states.
    val modelDownloadStatus = uiState.value.modelDownloadStatus.toMutableMap()
    val modelInstances = uiState.value.modelInitializationStatus.toMutableMap()
    modelDownloadStatus[model.name] =
      ModelDownloadStatus(
        status = ModelDownloadStatusType.SUCCEEDED,
        receivedBytes = info.fileSize,
        totalBytes = info.fileSize,
      )
    modelInstances[model.name] =
      ModelInitializationStatus(status = ModelInitializationStatusType.NOT_INITIALIZED)

    // Update ui state.
    _uiState.update {
      uiState.value.copy(
        tasks = uiState.value.tasks.toList(),
        modelDownloadStatus = modelDownloadStatus,
        modelInitializationStatus = modelInstances,
        modelImportingUpdateTrigger = System.currentTimeMillis(),
      )
    }

    // Add to data store.
    viewModelScope.launch(Dispatchers.IO) {
      val importedModels = dataStoreRepository.readImportedModels().toMutableList()
      val importedModelIndex = importedModels.indexOfFirst { info.fileName == it.fileName }
      if (importedModelIndex >= 0) {
        StructuredLog.d(TAG, "imported_model_duplicate_removed_from_store", "fileName" to info.fileName)
        importedModels.removeAt(importedModelIndex)
      }
      importedModels.add(info)
      dataStoreRepository.saveImportedModels(importedModels = importedModels)
    }
  }

  fun getTokenStatusAndData(): TokenStatusAndData {
    return _tokenStatusAndData.value
  }

  suspend fun getLatestTokenStatusAndData(): TokenStatusAndData {
    return loadTokenStatusAndData()
  }

  fun refreshTokenStatus() {
    viewModelScope.launch(Dispatchers.IO) { loadTokenStatusAndData() }
  }

  /** Refreshes masked provider credential metadata for AI settings surfaces. */
  fun refreshStoredProviderCredentialState() {
    viewModelScope.launch(Dispatchers.IO) {
      val activeChatProvider = uiState.value.activeChatProvider.trim()
      if (activeChatProvider.isEmpty()) {
        _uiState.update {
          it.copy(
            providerApiKeyMasked = "",
            hasStoredProviderApiKey = false,
          )
        }
        return@launch
      }
      val apiKey =
        credentialStore.readProviderApiKey(
          providerId = activeChatProvider,
          profileId = uiState.value.selectedProviderProfileId.ifBlank { "default" },
        ).orEmpty()
      _uiState.update {
        it.copy(
          providerApiKeyMasked = maskStoredSecret(apiKey),
          hasStoredProviderApiKey = apiKey.isNotBlank(),
        )
      }
    }
  }

  private suspend fun loadTokenStatusAndData(): TokenStatusAndData {
    return withContext(Dispatchers.IO) {
      var tokenStatus = TokenStatus.NOT_STORED
      StructuredLog.d(TAG, "token_status_read_started")
      val tokenData = credentialStore.readAccessTokenData()

      // Token exists.
      if (tokenData != null && tokenData.accessToken.isNotEmpty()) {
        StructuredLog.d(TAG, "token_loaded")

        // Check expiration (with 5-minute buffer).
        val curTs = System.currentTimeMillis()
        val expirationTs = tokenData.expiresAtMs - 5 * 60
        StructuredLog.d(
          TAG,
          "token_expiration_check",
          "currentTs" to curTs,
          "expirationTs" to expirationTs,
        )
        if (curTs >= expirationTs) {
          StructuredLog.w(TAG, "token_expired")
          tokenStatus = TokenStatus.EXPIRED
        } else {
          StructuredLog.d(TAG, "token_valid")
          tokenStatus = TokenStatus.NOT_EXPIRED
          curAccessToken = tokenData.accessToken
        }
      } else {
        StructuredLog.d(TAG, "token_missing")
      }

      val resolved = TokenStatusAndData(status = tokenStatus, data = tokenData)
      _tokenStatusAndData.value = resolved
      resolved
    }
  }

  fun getAuthorizationRequest(): AuthorizationRequest {
    return AuthorizationRequest.Builder(
        ProjectConfig.authServiceConfig,
        ProjectConfig.clientId,
        ResponseTypeValues.CODE,
        ProjectConfig.redirectUri.toUri(),
      )
      .setScope("read-repos")
      .build()
  }

  fun handleAuthResult(result: ActivityResult, onTokenRequested: (TokenRequestResult) -> Unit) {
    val dataIntent = result.data
    if (dataIntent == null) {
      onTokenRequested(
        TokenRequestResult(
          status = TokenRequestResultType.FAILED,
          errorMessage = "Empty auth result",
        )
      )
      return
    }

    val response = AuthorizationResponse.fromIntent(dataIntent)
    val exception = AuthorizationException.fromIntent(dataIntent)

    when {
      response?.authorizationCode != null -> {
        // Authorization successful, exchange the code for tokens
        var errorMessage: String? = null
        authService.performTokenRequest(response.createTokenExchangeRequest()) {
          tokenResponse,
          tokenEx ->
          if (tokenResponse != null) {
            if (tokenResponse.accessToken == null) {
              errorMessage = "Empty access token"
            } else if (tokenResponse.refreshToken == null) {
              errorMessage = "Empty refresh token"
            } else if (tokenResponse.accessTokenExpirationTime == null) {
              errorMessage = "Empty expiration time"
            } else {
              // Token exchange successful. Store the tokens securely
              StructuredLog.d(TAG, "token_exchange_succeeded")
              saveAccessToken(
                accessToken = tokenResponse.accessToken!!,
                refreshToken = tokenResponse.refreshToken!!,
                expiresAt = tokenResponse.accessTokenExpirationTime!!,
              )
              curAccessToken = tokenResponse.accessToken!!
              StructuredLog.d(TAG, "token_saved")
            }
          } else if (tokenEx != null) {
            errorMessage = "Token exchange failed: ${tokenEx.message}"
          } else {
            errorMessage = "Token exchange failed"
          }
          if (errorMessage == null) {
            onTokenRequested(TokenRequestResult(status = TokenRequestResultType.SUCCEEDED))
          } else {
            onTokenRequested(
              TokenRequestResult(
                status = TokenRequestResultType.FAILED,
                errorMessage = errorMessage,
              )
            )
          }
        }
      }

      exception != null -> {
        onTokenRequested(
          TokenRequestResult(
            status =
              if (exception.message == "User cancelled flow") TokenRequestResultType.USER_CANCELLED
              else TokenRequestResultType.FAILED,
            errorMessage = exception.message,
          )
        )
      }

      else -> {
        onTokenRequested(TokenRequestResult(status = TokenRequestResultType.USER_CANCELLED))
      }
    }
  }

  fun saveAccessToken(accessToken: String, refreshToken: String, expiresAt: Long) {
    viewModelScope.launch(Dispatchers.IO) {
      credentialStore.saveAccessTokenData(
        AccessTokenRecord(
          accessToken = accessToken,
          refreshToken = refreshToken,
          expiresAtMs = expiresAt,
        ),
      )
      loadTokenStatusAndData()
    }
  }

  fun clearAccessToken() {
    viewModelScope.launch(Dispatchers.IO) {
      credentialStore.clearAccessTokenData()
      loadTokenStatusAndData()
    }
  }

  private fun processPendingDownloads() {
    // Cancel all pending downloads for the retrieved models.
    downloadRepository.cancelAll {
      StructuredLog.d(TAG, "pending_downloads_cancelled")

      viewModelScope.launch(Dispatchers.Main) {
        val checkedModelNames = mutableSetOf<String>()
        val tokenStatusAndData = getLatestTokenStatusAndData()
        for (task in uiState.value.tasks) {
          for (model in task.models) {
            if (checkedModelNames.contains(model.name)) {
              continue
            }

            // Start download for partially downloaded models.
            val downloadStatus = uiState.value.modelDownloadStatus[model.name]?.status
            if (downloadStatus == ModelDownloadStatusType.PARTIALLY_DOWNLOADED) {
              if (
                tokenStatusAndData.status == TokenStatus.NOT_EXPIRED &&
                  tokenStatusAndData.data != null
              ) {
                model.accessToken = tokenStatusAndData.data.accessToken
              }
              StructuredLog.d(TAG, "pending_download_resumed", "model" to model.name)
              downloadRepository.downloadModel(
                task = task,
                model = model,
                onStatusUpdated = this@ModelManagerViewModel::setDownloadStatus,
              )
            }

            checkedModelNames.add(model.name)
          }
        }
      }
    }
  }

  fun loadModelAllowlist() {
    _uiState.update {
      uiState.value.copy(loadingModelAllowlist = true, loadingModelAllowlistError = "")
    }

    viewModelScope.launch(Dispatchers.IO) {
      try {
        // Load model allowlist json.
        var modelAllowlist: ModelAllowlist? = null

        // Try to read the test allowlist first.
        StructuredLog.d(TAG, "model_allowlist_test_load_started")
        modelAllowlist = readModelAllowlistFromDisk(fileName = MODEL_ALLOWLIST_TEST_FILENAME)

        // Local test only.
        if (TEST_MODEL_ALLOW_LIST.isNotEmpty()) {
          StructuredLog.d(TAG, "model_allowlist_local_test_override_loaded")
          val gson = Gson()
          modelAllowlist = gson.fromJson(TEST_MODEL_ALLOW_LIST, ModelAllowlist::class.java)
        }

        if (modelAllowlist == null) {
          val url = getAllowlistUrl()
          if (!isModelAllowlistAssetUrl(url) && !isNetworkAvailable(context)) {
            StructuredLog.w(TAG, "model_allowlist_network_unavailable")
            modelAllowlist = readModelAllowlistFromDisk()
            if (modelAllowlist == null) {
              _uiState.update {
                uiState.value.copy(
                  loadingModelAllowlist = false,
                  loadingModelAllowlistError = "You are offline. Connect to the internet to load the model list."
                )
              }
              return@launch
            }
          } else {
            // Load from configured source when no local override is present.
            StructuredLog.d(TAG, "model_allowlist_remote_load_started")
            val data = loadConfiguredModelAllowlist(url = url)
            modelAllowlist = data?.jsonObj

            if (modelAllowlist == null) {
              StructuredLog.w(TAG, "model_allowlist_remote_load_failed_using_disk_fallback")
              modelAllowlist = readModelAllowlistFromDisk()
            } else {
              StructuredLog.d(TAG, "model_allowlist_remote_load_succeeded")
              saveModelAllowlistToDisk(modelAllowlistContent = data?.textContent ?: "{}")
            }
          }
        } else {
          // Refresh from configured source when a local test override exists.
          val url = getAllowlistUrl()
          StructuredLog.d(TAG, "model_allowlist_remote_load_started")
          val data = loadConfiguredModelAllowlist(url = url)
          modelAllowlist = data?.jsonObj

          if (modelAllowlist == null) {
            StructuredLog.w(TAG, "model_allowlist_remote_load_failed_using_disk_fallback")
            modelAllowlist = readModelAllowlistFromDisk()
          } else {
            StructuredLog.d(TAG, "model_allowlist_remote_load_succeeded")
            saveModelAllowlistToDisk(modelAllowlistContent = data?.textContent ?: "{}")
          }
        }

        if (modelAllowlist == null) {
          _uiState.update {
            uiState.value.copy(
              loadingModelAllowlist = false,
              loadingModelAllowlistError = stringResource(R.string.model_allowlist_load_failed),
            )
          }
          return@launch
        }

        StructuredLog.d(TAG, "model_allowlist_loaded", "modelCount" to modelAllowlist.models.size)

        // Convert models in the allowlist.
        val curTasks = surfacedTasks()
        val nameToModel = mutableMapOf<String, Model>()
        for (allowedModel in modelAllowlist.models) {
          if (allowedModel.disabled == true) {
            continue
          }

          // Ignore the allowedModel if its accelerator is only npu and this device's soc is not in
          // its socToModelFiles.
          val accelerators = allowedModel.defaultConfig.accelerators ?: ""
          val acceleratorList = accelerators.split(",").map { it.trim() }.filter { it.isNotEmpty() }
            if (acceleratorList.size == 1 && acceleratorList[0] == "npu") {
              val socToModelFiles = allowedModel.socToModelFiles
              if (socToModelFiles != null && !socToModelFiles.containsKey(SOC)) {
              StructuredLog.d(
                TAG,
                "model_allowlist_entry_skipped",
                "model" to allowedModel.name,
                "reason" to "unsupported_soc",
              )
              continue
            }
          }

          val model = allowedModel.toModel()
          nameToModel.put(model.name, model)
          for (taskType in allowedModel.taskTypes) {
            val task = curTasks.find { it.id == taskType }
            task?.models?.add(model)

            if (task?.id == BuiltInTaskId.LLM_TINY_GARDEN) {
              val newConfigs = model.configs.toMutableList()
              newConfigs.add(RESET_CONVERSATION_TURN_COUNT_CONFIG)
              model.configs = newConfigs
            }
          }
        }

        // Find models from allowlist if a task's `modelNames` field is not empty.
        for (task in curTasks) {
          if (task.modelNames.isNotEmpty()) {
            for (modelName in task.modelNames) {
              val model = nameToModel[modelName]
              if (model == null) {
                StructuredLog.w(
                  TAG,
                  "task_model_missing_from_allowlist",
                  "taskId" to task.id,
                  "model" to modelName,
                )
                continue
              }
              task.models.add(model)
            }
          }
        }

        // Process all tasks.
        processTasks()

        // Update UI state.
        val refreshedState =
          createUiState()
            .copy(
              loadingModelAllowlist = false,
              tasks = curTasks,
              tasksByCategory = groupTasksByCategory(),
            )
        _uiState.update { refreshedState }

        // Process pending downloads.
        processPendingDownloads()
      } catch (e: Exception) {
        StructuredLog.e(TAG, "model_allowlist_load_failed", e)
        _uiState.update {
          it.copy(
            loadingModelAllowlist = false,
            loadingModelAllowlistError = stringResource(R.string.model_allowlist_load_failed),
          )
        }
      }
    }
  }

  fun clearLoadModelAllowlistError() {
    val curTasks = surfacedTasks()
    processTasks()
    viewModelScope.launch(Dispatchers.IO) {
      val refreshedState =
        createUiState()
          .copy(
            loadingModelAllowlist = false,
            tasks = curTasks,
            loadingModelAllowlistError = "",
            tasksByCategory = groupTasksByCategory(),
          )
      _uiState.update { refreshedState }
    }
  }

  fun setAppInForeground(foreground: Boolean) {
    lifecycleProvider.isAppInForeground = foreground
  }

  private fun isNetworkAvailable(context: Context): Boolean {
    val connectivityManager =
      context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    val network = connectivityManager.activeNetwork ?: return false
    val capabilities = connectivityManager.getNetworkCapabilities(network) ?: return false
    return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
  }

  private fun loadConfiguredModelAllowlist(url: String): JsonObjAndTextContent<ModelAllowlist>? {
    if (!isModelAllowlistAssetUrl(url)) {
      return getJsonResponseWithRetry<ModelAllowlist>(
        url = url,
        maxAttempts = 3,
        initialDelayMs = 1000,
      )
    }

    val assetPath = url.removePrefix(MODEL_ALLOWLIST_ASSET_SCHEME).trimStart('/')
    val content = context.assets.open(assetPath).bufferedReader().use { it.readText() }
    val gson = Gson()
    return JsonObjAndTextContent(
      jsonObj = gson.fromJson(content, ModelAllowlist::class.java),
      textContent = content,
    )
  }

  private fun isModelAllowlistAssetUrl(url: String): Boolean {
    return url.startsWith(MODEL_ALLOWLIST_ASSET_SCHEME)
  }

  private fun saveModelAllowlistToDisk(modelAllowlistContent: String) {
    try {
      StructuredLog.d(TAG, "model_allowlist_disk_write_started")
      val file = File(externalFilesDir, MODEL_ALLOWLIST_FILENAME)
      file.writeText(modelAllowlistContent)
      StructuredLog.d(TAG, "model_allowlist_disk_write_completed")
    } catch (e: Exception) {
      StructuredLog.e(TAG, "model_allowlist_disk_write_failed", e)
    }
  }

  private fun readModelAllowlistFromDisk(
    fileName: String = MODEL_ALLOWLIST_FILENAME
  ): ModelAllowlist? {
    try {
      StructuredLog.d(TAG, "model_allowlist_disk_read_started", "fileName" to fileName)
      val baseDir =
        if (fileName == MODEL_ALLOWLIST_TEST_FILENAME) File("/data/local/tmp") else externalFilesDir
      val file = File(baseDir, fileName)
      if (file.exists()) {
        val content = file.readText()
        StructuredLog.d(TAG, "model_allowlist_disk_read_completed", "fileName" to fileName)

        val gson = Gson()
        return gson.fromJson(content, ModelAllowlist::class.java)
      }
    } catch (e: Exception) {
      StructuredLog.e(TAG, "model_allowlist_disk_read_failed", e, "fileName" to fileName)
      return null
    }

    return null
  }

  private fun isModelPartiallyDownloaded(model: Model): Boolean {
    if (model.localModelFilePathOverride.isNotEmpty()) {
      return false
    }

    // A model is partially downloaded when the tmp file exists.
    val tmpFilePath =
      model.getPath(context = context, fileName = "${model.downloadFileName}.$TMP_FILE_EXT")
    return File(tmpFilePath).exists()
  }

  private fun createEmptyUiState(): ModelManagerUiState {
    return ModelManagerUiState(
      tasks = listOf(),
      tasksByCategory = mapOf(),
      modelDownloadStatus = mapOf(),
      modelInitializationStatus = mapOf(),
      deviceAiStateMessage = stringResource(R.string.device_ai_protocol_idle),
    )
  }

  private suspend fun createUiState(): ModelManagerUiState {
    val operatorPreferences = preferencesStore.readOperatorPreferences()
    val activeChatProvider = operatorPreferences.activeChatProvider
    val activeProviderProfile = operatorPreferences.activeProfileFor(activeChatProvider)
    val storedProviderApiKey =
      credentialStore.readProviderApiKey(
        providerId = activeChatProvider,
        profileId = activeProviderProfile?.profileId.orEmpty().ifBlank { "default" },
      ).orEmpty()
    val modelDownloadStatus: MutableMap<String, ModelDownloadStatus> = mutableMapOf()
    val modelInstances: MutableMap<String, ModelInitializationStatus> = mutableMapOf()
    val tasks: MutableMap<String, Task> = mutableMapOf()
    val checkedModelNames = mutableSetOf<String>()
    for (customTask in customTasks) {
      val task = customTask.task
      tasks.put(key = task.id, value = task)
      for (model in task.models) {
        if (checkedModelNames.contains(model.name)) {
          continue
        }
        modelDownloadStatus[model.name] = getModelDownloadStatus(model = model)
        modelInstances[model.name] =
          ModelInitializationStatus(status = ModelInitializationStatusType.NOT_INITIALIZED)
        checkedModelNames.add(model.name)
      }
    }

    // Load imported models.
    for (importedModel in dataStoreRepository.readImportedModels()) {
      StructuredLog.d(
        TAG,
        "stored_imported_model_loaded",
        "fileName" to importedModel.fileName,
        "fileSize" to importedModel.fileSize,
      )

      // Create model.
      val model = createModelFromImportedModelInfo(info = importedModel)

      // Add to task.
      tasks.get(key = BuiltInTaskId.LLM_CHAT)?.models?.add(model)
      tasks.get(key = BuiltInTaskId.LLM_PROMPT_LAB)?.models?.add(model)
      if (model.llmSupportImage) {
        tasks.get(key = BuiltInTaskId.LLM_ASK_IMAGE)?.models?.add(model)
      }
      if (model.llmSupportAudio) {
        tasks.get(key = BuiltInTaskId.LLM_ASK_AUDIO)?.models?.add(model)
      }
      if (model.llmSupportTinyGarden) {
        tasks.get(key = BuiltInTaskId.LLM_TINY_GARDEN)?.models?.add(model)
        val newConfigs = model.configs.toMutableList()
        newConfigs.add(RESET_CONVERSATION_TURN_COUNT_CONFIG)
        model.configs = newConfigs
        model.preProcess()
      }
      if (model.llmSupportMobileActions) {
        tasks.get(key = BuiltInTaskId.LLM_MOBILE_ACTIONS)?.models?.add(model)
      }

      // Update status.
      modelDownloadStatus[model.name] =
        ModelDownloadStatus(
          status = ModelDownloadStatusType.SUCCEEDED,
          receivedBytes = importedModel.fileSize,
          totalBytes = importedModel.fileSize,
        )
    }

    val textInputHistory = dataStoreRepository.readTextInputHistory()
    val appLocaleTag = normalizeAppLocaleTag(dataStoreRepository.readAppLocale())
    StructuredLog.d(
      TAG,
      "model_manager_ui_state_loaded",
      "textInputHistoryCount" to textInputHistory.size,
      "modelDownloadStatusCount" to modelDownloadStatus.size,
      "appLocaleTag" to appLocaleTag,
    )
    return ModelManagerUiState(
      tasks = surfacedTasks(),
      tasksByCategory = mapOf(),
      modelDownloadStatus = modelDownloadStatus,
      modelInitializationStatus = modelInstances,
      controlPlaneBaseUrl = operatorPreferences.controlPlaneBaseUrl,
      runtimeAssignments = operatorPreferences.runtimeAssignments,
      providerProfiles = operatorPreferences.providerProfiles,
      activeProviderProfileIds = operatorPreferences.activeProviderProfileIds,
      activeChatProvider = activeChatProvider,
      selectedProviderProfileId = activeProviderProfile?.profileId.orEmpty(),
      selectedProviderProfileLabel = activeProviderProfile?.displayName.orEmpty(),
      activeChatModel = operatorPreferences.activeChatModel,
      cloudModelSource =
        operatorPreferences.runtimeAssignments.assignmentFor(OperatorRuntimeUsage.CHAT).source.ifBlank {
          operatorPreferences.cloudModelSource
        },
      providerApiKeyMasked = maskStoredSecret(storedProviderApiKey),
      hasStoredProviderApiKey = storedProviderApiKey.isNotBlank(),
      providerBaseUrl = activeProviderProfile?.baseUrl ?: operatorPreferences.providerBaseUrl,
      cloudPullSource = operatorPreferences.cloudPullSource,
      cloudPullTimeoutMsText = operatorPreferences.cloudPullTimeoutMsText,
      cloudPullForce = operatorPreferences.cloudPullForce,
      cloudChatRequestTts = operatorPreferences.cloudChatRequestTts,
      cloudChatTtsOutputMimeType = operatorPreferences.cloudChatTtsOutputMimeType,
      cloudChatTtsVoice = operatorPreferences.cloudChatTtsVoice,
      appLocaleTag = appLocaleTag,
      textInputHistory = textInputHistory,
    )
  }

  private fun maskStoredSecret(secret: String): String {
    if (secret.isBlank()) {
      return ""
    }
    if (secret.length <= 8) {
      return context.getString(R.string.secret_stored_chars, secret.length)
    }
    return "${secret.take(4)}••••${secret.takeLast(4)}"
  }

  private fun createModelFromImportedModelInfo(info: ImportedModel): Model {
    val accelerators =
      info.llmConfig.compatibleAcceleratorsList
        .mapNotNull { acceleratorLabel ->
          when (acceleratorLabel.trim()) {
            Accelerator.GPU.label -> Accelerator.GPU
            Accelerator.CPU.label -> Accelerator.CPU
            Accelerator.NPU.label -> Accelerator.NPU
            else -> null // Ignore unknown accelerator labels
          }
        }
        .toMutableList()
        .ifEmpty { DEFAULT_ACCELERATORS.toMutableList() }
    val llmMaxToken = info.llmConfig.defaultMaxTokens
    val npuOnly = accelerators.size == 1 && accelerators[0] == Accelerator.NPU
    val configs: MutableList<Config> =
      (
          if (npuOnly) {
            createLlmChatConfigsForNpuModel(
              defaultMaxToken = llmMaxToken,
              accelerators = accelerators,
            )
          } else {
            createLlmChatConfigs(
              defaultMaxToken = llmMaxToken,
              defaultTopK = info.llmConfig.defaultTopk,
              defaultTopP = info.llmConfig.defaultTopp,
              defaultTemperature = info.llmConfig.defaultTemperature,
              accelerators = accelerators,
            )
          }
        )
        .toMutableList()
    val llmSupportImage = info.llmConfig.supportImage
    val llmSupportAudio = info.llmConfig.supportAudio
    val llmSupportTinyGarden = info.llmConfig.supportTinyGarden
    val llmSupportMobileActions = info.llmConfig.supportMobileActions
    val model =
      Model(
        name = info.fileName,
        url = "",
        configs = configs,
        sizeInBytes = info.fileSize,
        downloadFileName = "$IMPORTS_DIR/${info.fileName}",
        showBenchmarkButton = false,
        showRunAgainButton = false,
        imported = true,
        llmSupportImage = llmSupportImage,
        llmSupportAudio = llmSupportAudio,
        llmSupportTinyGarden = llmSupportTinyGarden,
        llmSupportMobileActions = llmSupportMobileActions,
        llmMaxToken = llmMaxToken,
        accelerators = accelerators,
        // We assume all imported models are LLM for now.
        isLlm = true,
      )
    model.preProcess()

    return model
  }

  private fun groupTasksByCategory(): Map<String, List<Task>> {
    val tasks = surfacedTasks()

    val categoryMap: Map<String, CategoryInfo> =
      tasks.associateBy { it.category.id }.mapValues { it.value.category }

    val groupedTasks = tasks.groupBy { it.category.id }
    val groupedSortedTasks: MutableMap<String, List<Task>> = mutableMapOf()
    // Sort the tasks in categories by pre-defined order. Sort other tasks by label.
    for (categoryId in groupedTasks.keys) {
      val sortedTasks =
        groupedTasks[categoryId]!!.sortedWith { a, b ->
          if (categoryId == Category.LLM.id) {
            val order: List<String> =
              when (categoryId) {
                Category.LLM.id -> PREDEFINED_LLM_TASK_ORDER
                else -> listOf()
              }
            val indexA = order.indexOf(a.id)
            val indexB = order.indexOf(b.id)
            if (indexA != -1 && indexB != -1) {
              indexA.compareTo(indexB)
            } else if (indexA != -1) {
              -1
            } else if (indexB != -1) {
              1
            } else {
              val ca = categoryMap[a.id]!!
              val cb = categoryMap[b.id]!!
              val caLabel = getCategoryLabel(context = context, category = ca)
              val cbLabel = getCategoryLabel(context = context, category = cb)
              caLabel.compareTo(cbLabel)
            }
          } else {
            a.label.compareTo(b.label)
          }
        }
      for ((index, task) in sortedTasks.withIndex()) {
        task.index = index
      }
      groupedSortedTasks[categoryId] = sortedTasks
    }

    return groupedSortedTasks
  }

  private fun getCategoryLabel(context: Context, category: CategoryInfo): String {
    val stringRes = category.labelStringRes
    val label = category.label
    if (stringRes != null) {
      return context.getString(stringRes)
    } else if (label != null) {
      return label
    }
    return context.getString(R.string.category_unlabeled)
  }

  /**
   * Retrieves the download status of a model.
   *
   * This function determines the download status of a given model by checking if it's fully
   * downloaded, partially downloaded, or not downloaded at all. It also retrieves the received and
   * total bytes for partially downloaded models.
   */
  private fun getModelDownloadStatus(model: Model): ModelDownloadStatus {
    StructuredLog.d(TAG, "model_download_status_check_started", "model" to model.name)

    if (model.localFileRelativeDirPathOverride.isNotEmpty()) {
      StructuredLog.d(TAG, "model_download_status_local_override", "model" to model.name)
      return ModelDownloadStatus(
        status = ModelDownloadStatusType.SUCCEEDED,
        receivedBytes = 0,
        totalBytes = 0,
      )
    }

    var status = ModelDownloadStatusType.NOT_DOWNLOADED
    var receivedBytes = 0L
    var totalBytes = 0L

    // Partially downloaded.
    if (isModelPartiallyDownloaded(model = model)) {
      status = ModelDownloadStatusType.PARTIALLY_DOWNLOADED
      val tmpFilePath =
        model.getPath(context = context, fileName = "${model.downloadFileName}.$TMP_FILE_EXT")
      val tmpFile = File(tmpFilePath)
      receivedBytes = tmpFile.length()
      totalBytes = model.totalBytes
      StructuredLog.d(
        TAG,
        "model_download_status_partial",
        "model" to model.name,
        "receivedBytes" to receivedBytes,
        "totalBytes" to totalBytes,
      )
    }
    // Fully downloaded.
    else if (isModelDownloaded(model = model)) {
      status = ModelDownloadStatusType.SUCCEEDED
      StructuredLog.d(TAG, "model_download_status_succeeded", "model" to model.name)
    }
    // Not downloaded.
    else {
      StructuredLog.d(TAG, "model_download_status_missing", "model" to model.name)
    }

    return ModelDownloadStatus(
      status = status,
      receivedBytes = receivedBytes,
      totalBytes = totalBytes,
    )
  }

  private fun isFileInExternalFilesDir(fileName: String): Boolean {
    val file = File(externalFilesDir, fileName)
    return file.exists()
  }

  private fun isFileInDataLocalTmpDir(fileName: String): Boolean {
    val file = File("/data/local/tmp", fileName)
    return file.exists()
  }

  private fun deleteFileFromExternalFilesDir(fileName: String) {
    if (isFileInExternalFilesDir(fileName)) {
      val file = File(externalFilesDir, fileName)
      file.delete()
    }
  }

  /**
   * Deletes files from the the model imports directory whose absolute paths start with a given
   * prefix.
   */
  private fun deleteFilesFromImportDir(fileName: String) {
    val dir = File(externalFilesDir, IMPORTS_DIR)
    val prefixAbsolutePath = "${externalFilesDir.absolutePath}${File.separator}$fileName"
    val filesToDelete =
      dir.listFiles { dirFile, name ->
        File(dirFile, name).absolutePath.startsWith(prefixAbsolutePath)
      } ?: arrayOf()
    for (file in filesToDelete) {
      StructuredLog.d(TAG, "imported_model_file_deleted", "fileName" to file.name)
      file.delete()
    }
  }

  private fun deleteDirFromExternalFilesDir(dir: String) {
    if (isFileInExternalFilesDir(dir)) {
      val file = File(externalFilesDir, dir)
      file.deleteRecursively()
    }
  }

  private fun updateModelInitializationStatus(
    model: Model,
    status: ModelInitializationStatusType,
    error: String = "",
  ) {
    val curModelInstance = uiState.value.modelInitializationStatus.toMutableMap()
    curModelInstance[model.name] = ModelInitializationStatus(status = status, error = error)
    val newUiState = uiState.value.copy(modelInitializationStatus = curModelInstance)
    _uiState.update { newUiState }
  }

  private fun isModelDownloaded(model: Model): Boolean {
    val modelRelativePath =
      listOf(model.normalizedName, model.version, model.downloadFileName)
        .joinToString(File.separator)
    val downloadedFileExists =
      model.downloadFileName.isNotEmpty() &&
        ((model.localModelFilePathOverride.isEmpty() &&
          isFileInExternalFilesDir(modelRelativePath)) ||
          (model.localModelFilePathOverride.isNotEmpty() &&
            File(model.localModelFilePathOverride).exists()))

    val unzippedDirectoryExists =
      model.isZip &&
        model.unzipDir.isNotEmpty() &&
        isFileInExternalFilesDir(
          listOf(model.normalizedName, model.version, model.unzipDir).joinToString(File.separator)
        )

    return downloadedFileExists || unzippedDirectoryExists
  }

}

private fun getAllowlistUrl(): String {
  val version = BuildConfig.VERSION_NAME.replace(".", "_")

  return "${BaoEdgeRuntimeConfig.modelAllowlistBaseUrl}/${version}.json"
}

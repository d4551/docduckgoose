/*
 * Copyright 2026 Google LLC
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

package com.google.ai.edge.gallery.data

import com.google.ai.edge.gallery.common.StructuredLog
import com.google.ai.edge.gallery.common.BaoEdgeRuntimeConfig
import com.google.gson.Gson
import com.google.gson.JsonSyntaxException
import com.google.gson.reflect.TypeToken
import com.baohaus.baoedge.core.flow.FlowExecutionState
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.BufferedInputStream
import java.io.BufferedOutputStream
import java.net.HttpURLConnection
import java.net.InetSocketAddress
import java.net.Socket
import java.net.URL
import java.net.URLEncoder
import java.util.regex.Pattern
import kotlin.text.Charsets.UTF_8

/**
 * Contract payload returned from all control-plane POST/GET endpoints used by this feature.
 */
data class CloudControlPlaneEnvelope<T>(
  val route: String,
  val state: FlowExecutionState,
  val jobId: String? = null,
  val data: T? = null,
  val error: CloudControlPlaneErrorPayload? = null,
  val mismatches: List<String> = emptyList(),
)

/**
 * Error payload surfaced by control-plane endpoints.
 */
data class CloudControlPlaneErrorPayload(
  val commandIndex: Int? = null,
  val code: String? = null,
  val category: String? = null,
  val command: String? = null,
  val commandType: String? = null,
  val reason: String,
  val retryable: Boolean,
  val correlationId: String? = null,
  val surface: String? = null,
  val resource: String? = null,
)

/**
 * Error type for transport/parse failures when calling the control-plane.
 */
sealed class CloudControlPlaneError(message: String, cause: Throwable? = null) :
  Exception(message, cause) {
  class InvalidBaseUrl(message: String) : CloudControlPlaneError(message)
  class RequestFailed(message: String) : CloudControlPlaneError(message)
  class EnvelopeMissing(message: String) : CloudControlPlaneError(message)
  class EnvelopeDecodeFailed(message: String, cause: Throwable?) : CloudControlPlaneError(message, cause)
}

/**
 * Shared model used for `/api/ai/chat` responses.
 */
data class CloudChatResolution(
  val provider: String,
  val requestedModel: String? = null,
  val effectiveModel: String,
  val reply: String,
  val speech: CloudChatSpeechResolution? = null,
  val tts: CloudChatSpeechReply? = null,
)

data class CloudChatSpeechResolution(
  val transcript: String,
  val language: String? = null,
)

data class CloudChatSpeechReply(
  val mimeType: String,
  val data: String,
)

data class CloudChatAudioPayload(
  val mimeType: String,
  val data: String,
)

typealias CloudChatEnvelope = CloudControlPlaneEnvelope<CloudChatResolution>

/**
 * Shared model used for `/api/ai/chat` requests.
 */
data class CloudChatRequest(
  val provider: String,
  val model: String? = null,
  val message: String? = null,
  val speechInput: CloudChatAudioPayload? = null,
  val requestTts: Boolean? = null,
  val ttsOutputMimeType: String? = null,
  val ttsVoice: String? = null,
  val apiKey: String? = null,
  val baseUrl: String? = null,
)

/** Single image input for vision models (base64-encoded). */
data class AiWorkflowImageInput(
  val mimeType: String,
  val data: String,
)

/** Optional STT audio payload; when set the transcript replaces message. */
data class AiWorkflowSpeechInput(
  val mimeType: String,
  val data: String,
)

/**
 * Request payload for `/api/ai/workflows/run` (mode=chat).
 */
data class AiWorkflowRequest(
  val mode: String = "chat",
  val provider: String? = null,
  val model: String? = null,
  val message: String,
  val apiKey: String? = null,
  val baseUrl: String? = null,
  val correlationId: String? = null,
  val conversationId: String? = null,
  val imageInput: List<AiWorkflowImageInput>? = null,
  val speechInput: AiWorkflowSpeechInput? = null,
)

/**
 * Workflow result payload within AiWorkflowJobEnvelope.data.result.
 */
data class AiWorkflowJobResultData(
  val mode: String? = null,
  val requestedProvider: String? = null,
  val providerPath: String? = null,
  val requestedModel: String? = null,
  val effectiveModel: String? = null,
  val reply: String = "",
  val conversationId: String? = null,
)

/**
 * Job data payload within AiWorkflowJobEnvelope.data.
 */
data class AiWorkflowJobData(
  val jobId: String = "",
  val status: String = "",
  val correlationId: String = "",
  val result: AiWorkflowJobResultData? = null,
  val stdout: String = "",
  val stderr: String = "",
  val elapsedMs: Long = 0,
  val reason: String? = null,
)

/**
 * Response envelope from `/api/ai/workflows/run` and `/api/ai/workflows/jobs/:jobId`.
 * Uses String for state to support control-plane kebab-case wire format.
 */
data class AiWorkflowJobEnvelope(
  val route: String = "",
  val state: String = "",
  val jobId: String = "",
  val data: AiWorkflowJobData? = null,
  val error: CloudControlPlaneErrorPayload? = null,
  val mismatches: List<String> = emptyList(),
)

/**
 * Shared model used for `/api/models/pull` requests.
 */
data class CloudModelPullRequest(
  val modelRef: String,
  val source: String? = null,
  val platform: String? = null,
  val force: Boolean? = null,
  val timeoutMs: Int? = null,
  val correlationId: String? = null,
)

/**
 * Shared model used for `/api/models/pull` and `/api/models/pull/{jobId}` payloads.
 */
data class CloudModelPullResolution(
  val requestedModelRef: String,
  val normalizedModelRef: String,
  val status: String,
  val exitCode: Int? = null,
  val stdout: String,
  val stderr: String,
  val artifactPath: String? = null,
  val elapsedMs: Int,
  val platform: String? = null,
)

typealias CloudModelPullEnvelope = CloudControlPlaneEnvelope<CloudModelPullResolution>

/**
 * Parsed model options returned from `/api/ai/models`.
 */
data class CloudModelOptionsResult(
  val models: List<String>,
  val selectedModel: String? = null,
  val state: FlowExecutionState,
  val message: String,
)

/**
 * Structured provider model descriptor returned by `/api/ai/models/catalog`.
 */
data class CloudModelDescriptor(
  val id: String,
  val displayName: String,
  val provider: String,
  val source: String,
  val capabilityModes: List<String> = emptyList(),
  val supportsText: Boolean = false,
  val supportsImageInput: Boolean = false,
  val supportsImageGeneration: Boolean = false,
  val supportsAudioInput: Boolean = false,
  val supportsSpeechOutput: Boolean = false,
  val supportsAutomation: Boolean = false,
  val supportsFlowGeneration: Boolean = false,
  val supportsAgent: Boolean = false,
  val supportsLocalDownload: Boolean = false,
  val pipelineTag: String? = null,
  val capabilities: List<String> = emptyList(),
)

/**
 * Structured provider model catalog returned by `/api/ai/models/catalog`.
 */
data class CloudModelCatalogResult(
  val provider: String,
  val displayName: String,
  val models: List<CloudModelDescriptor> = emptyList(),
  val selectedModel: String? = null,
  val source: String,
  val state: String,
  val message: String,
  val error: String? = null,
)

/**
 * Source descriptor returned by `/api/models/sources`.
 */
data class CloudModelSourceDescriptor(
  val id: String,
  val displayName: String,
  val description: String? = null,
  val modelRefPlaceholder: String? = null,
  val modelRefHint: String? = null,
  val modelRefValidation: String? = null,
  val canonicalHost: String? = null,
  val ramalamaTransportPrefix: String? = null,
  val aliases: List<String> = emptyList(),
  val enforceAllowlist: Boolean = false,
)

/**
 * Source registry payload returned by `/api/models/sources`.
 */
data class CloudModelSourceRegistry(
  val defaultSource: String,
  val sources: List<CloudModelSourceDescriptor> = emptyList(),
)

typealias CloudModelSourceRegistryEnvelope = CloudControlPlaneEnvelope<CloudModelSourceRegistry>

/**
 * General settings snapshot returned by `/api/operator/settings`.
 */
data class CloudOperatorGeneralSettingsSnapshot(
  val theme: String = "",
  val locale: String = "",
  val appVersion: String = "",
)

/**
 * Capability-mode assignment returned by `/api/operator/settings`.
 */
data class CloudOperatorModeAssignment(
  val provider: String = "",
  val model: String = "",
)

/**
 * Provider descriptor returned by `/api/operator/settings`.
 */
data class CloudOperatorProviderDescriptor(
  val id: String,
  val displayName: String,
  val source: String,
  val requiresKey: Boolean,
  val hasBaseUrlConfig: Boolean = false,
  val configured: Boolean,
  val credentialState: String,
  val maskedKey: String? = null,
  val baseUrl: String? = null,
  val docsUrl: String,
  val defaultModels: List<String> = emptyList(),
  val updatedAt: String? = null,
)

/**
 * AI settings snapshot returned by `/api/operator/settings`.
 */
data class CloudOperatorAiSettingsSnapshot(
  val defaultModel: String? = null,
  val defaultModelSource: String = "",
  val defaultModelSourceLabel: String = "",
  val ttsVoice: String = "",
  val ttsOutputFormat: String = "",
  val sttLanguage: String = "",
  val ttsProvider: String? = null,
  val modeAssignments: Map<String, CloudOperatorModeAssignment?> = emptyMap(),
  val providers: List<CloudOperatorProviderDescriptor> = emptyList(),
)

/**
 * Operator settings snapshot returned by `/api/operator/settings`.
 */
data class CloudOperatorSettingsSnapshot(
  val general: CloudOperatorGeneralSettingsSnapshot = CloudOperatorGeneralSettingsSnapshot(),
  val aiSettings: CloudOperatorAiSettingsSnapshot = CloudOperatorAiSettingsSnapshot(),
)

/**
 * Runtime binding returned by `/api/operator/conversations` and related routes.
 */
data class CloudOperatorRuntimeBinding(
  val source: String,
  val provider: String,
  val model: String,
  val voiceInput: Boolean? = null,
  val voiceOutput: Boolean? = null,
  val automation: Boolean? = null,
)

/**
 * Conversation summary returned by `/api/operator/conversations`.
 */
data class CloudOperatorConversationSummary(
  val id: String,
  val title: String? = null,
  val activeRuntime: CloudOperatorRuntimeBinding? = null,
  val updatedAt: String? = null,
)

/**
 * Conversation history index returned by `/api/operator/conversations`.
 */
data class CloudOperatorConversationIndex(
  val conversations: List<CloudOperatorConversationSummary> = emptyList(),
  val total: Int = 0,
)

/**
 * Single message in `/api/operator/conversations/:id`.
 */
data class CloudOperatorConversationMessage(
  val id: String,
  val role: String,
  val content: String,
  val runId: String? = null,
  val timestamp: String? = null,
)

/**
 * Execution event in `/api/operator/conversations/:id`.
 */
data class CloudOperatorExecutionEvent(
  val id: String,
  val runId: String,
  val state: String,
  val summary: String? = null,
  val timestamp: String? = null,
)

/**
 * Approval request returned by `/api/operator/conversations/:id`.
 */
data class CloudOperatorApprovalRequest(
  val id: String,
  val runId: String,
  val summary: String? = null,
  val requestedAt: String? = null,
)

/**
 * Artifact returned by `/api/operator/conversations/:id`.
 */
data class CloudOperatorConversationArtifact(
  val id: String,
  val runId: String,
  val mimeType: String,
  val summary: String? = null,
)

/**
 * Conversation orchestration returned by `/api/operator/conversations/:id`.
 */
data class CloudOperatorConversationOrchestration(
  val id: String,
  val title: String? = null,
  val activeRuntime: CloudOperatorRuntimeBinding? = null,
  val messages: List<CloudOperatorConversationMessage> = emptyList(),
  val executionEvents: List<CloudOperatorExecutionEvent> = emptyList(),
  val approvalRequests: List<CloudOperatorApprovalRequest> = emptyList(),
  val artifacts: List<CloudOperatorConversationArtifact> = emptyList(),
)

/**
 * Domain contract for all Android control-plane interactions used by model/chat operations.
 */
interface CloudControlPlaneClient {
  suspend fun fetchModelSources(baseUrl: String): CloudModelSourceRegistryEnvelope

  suspend fun fetchOperatorSettings(baseUrl: String): CloudOperatorSettingsSnapshot

  suspend fun fetchOperatorConversations(baseUrl: String, limit: Int = 20, offset: Int = 0): CloudOperatorConversationIndex

  suspend fun fetchOperatorConversation(baseUrl: String, conversationId: String): CloudOperatorConversationOrchestration

  suspend fun updateOperatorConversationRuntimeBinding(
    baseUrl: String,
    conversationId: String,
    binding: CloudOperatorRuntimeBinding,
  ): CloudOperatorConversationOrchestration

  suspend fun deleteOperatorConversation(baseUrl: String, conversationId: String)

  suspend fun fetchProviderModels(
    baseUrl: String,
    provider: String,
    selectedModel: String? = null,
    apiKey: String? = null,
    providerBaseUrl: String? = null,
  ): CloudModelOptionsResult

  suspend fun fetchProviderModelCatalog(
    baseUrl: String,
    provider: String,
    selectedModel: String? = null,
    apiKey: String? = null,
    providerBaseUrl: String? = null,
  ): CloudModelCatalogResult

  suspend fun startModelPull(baseUrl: String, request: CloudModelPullRequest): CloudModelPullEnvelope

  suspend fun pollModelPull(baseUrl: String, jobId: String): CloudModelPullEnvelope

  suspend fun sendChat(baseUrl: String, request: CloudChatRequest): CloudChatEnvelope

  suspend fun startAiWorkflowJob(baseUrl: String, request: AiWorkflowRequest): AiWorkflowJobEnvelope

  suspend fun getAiWorkflowJobEnvelope(baseUrl: String, jobId: String): AiWorkflowJobEnvelope
}

/**
 * HTTP implementation backed by `HttpURLConnection`.
 */
class HttpControlPlaneClient(
  private val connectTimeoutMs: Int = BaoEdgeRuntimeConfig.controlPlaneConnectTimeoutMs,
  private val readTimeoutMs: Int = BaoEdgeRuntimeConfig.controlPlaneReadTimeoutMs,
) : CloudControlPlaneClient {
  private val gson = Gson()

  override suspend fun fetchModelSources(baseUrl: String): CloudModelSourceRegistryEnvelope =
    withContext(Dispatchers.IO) {
      val response = executeGetRequest(baseUrl = baseUrl, path = "/api/models/sources")
      parseEnvelope(response, type = CloudModelSourceRegistry::class.java)
    }

  override suspend fun fetchOperatorSettings(baseUrl: String): CloudOperatorSettingsSnapshot =
    withContext(Dispatchers.IO) {
      val response = executeGetRequest(baseUrl = baseUrl, path = "/api/operator/settings")
      try {
        gson.fromJson(response, CloudOperatorSettingsSnapshot::class.java)
      } catch (error: JsonSyntaxException) {
        throw CloudControlPlaneError.EnvelopeDecodeFailed("Failed to decode operator settings snapshot.", error)
      }
    }

  override suspend fun fetchOperatorConversations(
    baseUrl: String,
    limit: Int,
    offset: Int,
  ): CloudOperatorConversationIndex =
    withContext(Dispatchers.IO) {
      val response =
        executeGetRequest(
          baseUrl = baseUrl,
          path = "/api/operator/conversations",
          query =
            mapOf(
              "limit" to limit.toString(),
              "offset" to offset.toString(),
            ),
          acceptJson = true,
        )
      try {
        gson.fromJson(response, CloudOperatorConversationIndex::class.java)
      } catch (error: JsonSyntaxException) {
        throw CloudControlPlaneError.EnvelopeDecodeFailed("Failed to decode operator conversation index.", error)
      }
    }

  override suspend fun fetchOperatorConversation(
    baseUrl: String,
    conversationId: String,
  ): CloudOperatorConversationOrchestration =
    withContext(Dispatchers.IO) {
      val response =
        executeGetRequest(
          baseUrl = baseUrl,
          path = "/api/operator/conversations/${urlEncode(conversationId)}",
          acceptJson = true,
        )
      try {
        gson.fromJson(response, CloudOperatorConversationOrchestration::class.java)
      } catch (error: JsonSyntaxException) {
        throw CloudControlPlaneError.EnvelopeDecodeFailed("Failed to decode operator conversation orchestration.", error)
      }
    }

  override suspend fun updateOperatorConversationRuntimeBinding(
    baseUrl: String,
    conversationId: String,
    binding: CloudOperatorRuntimeBinding,
  ): CloudOperatorConversationOrchestration =
    withContext(Dispatchers.IO) {
      val response =
        executePostRequest(
          baseUrl = baseUrl,
          path = "/api/operator/conversations/${urlEncode(conversationId)}/runtime-binding",
          payload = gson.toJson(binding),
          method = "PUT",
          acceptJson = true,
        )
      try {
        gson.fromJson(response, CloudOperatorConversationOrchestration::class.java)
      } catch (error: JsonSyntaxException) {
        throw CloudControlPlaneError.EnvelopeDecodeFailed("Failed to decode updated operator conversation orchestration.", error)
      }
    }

  override suspend fun deleteOperatorConversation(baseUrl: String, conversationId: String) {
    withContext(Dispatchers.IO) {
      executeRequest(
        baseUrl = baseUrl,
        path = "/api/operator/conversations/${urlEncode(conversationId)}",
        method = "DELETE",
        acceptJson = true,
      )
    }
  }

  override suspend fun fetchProviderModels(
    baseUrl: String,
    provider: String,
    selectedModel: String?,
    apiKey: String?,
    providerBaseUrl: String?,
  ): CloudModelOptionsResult =
    withContext(Dispatchers.IO) {
      val stateId = "${BaoEdgeRuntimeConfig.controlPlaneModelStateIdPrefix}-${provider.lowercase()}"
      val queryParameters =
        mutableMapOf<String, String>().apply {
          put("provider", provider)
          if (!selectedModel.isNullOrBlank()) put("selectedModel", selectedModel)
          if (!apiKey.isNullOrBlank()) put("apiKey", apiKey)
          if (!providerBaseUrl.isNullOrBlank()) put("baseUrl", providerBaseUrl)
          put("stateId", stateId)
        }
      val response =
        executeGetRequest(
          baseUrl = baseUrl,
          path = "/api/ai/models",
          query = queryParameters,
        )
      val statePair = ControlPlaneResponseParser.parseStateMessage(response = response, stateId = stateId)
      val models = ControlPlaneResponseParser.parseOptionValues(response = response)

      CloudModelOptionsResult(
        models = models.distinct(),
        selectedModel = ControlPlaneResponseParser.extractSelectedOption(response),
        state = statePair.first,
        message = statePair.second,
      )
    }

  override suspend fun fetchProviderModelCatalog(
    baseUrl: String,
    provider: String,
    selectedModel: String?,
    apiKey: String?,
    providerBaseUrl: String?,
  ): CloudModelCatalogResult =
    withContext(Dispatchers.IO) {
      val queryParameters =
        mutableMapOf<String, String>().apply {
          put("provider", provider)
          if (!selectedModel.isNullOrBlank()) put("selectedModel", selectedModel)
          if (!apiKey.isNullOrBlank()) put("apiKey", apiKey)
          if (!providerBaseUrl.isNullOrBlank()) put("baseUrl", providerBaseUrl)
        }
      val response =
        executeGetRequest(
          baseUrl = baseUrl,
          path = "/api/ai/models/catalog",
          query = queryParameters,
          acceptJson = true,
        )
      try {
        gson.fromJson(response, CloudModelCatalogResult::class.java)
      } catch (error: JsonSyntaxException) {
        throw CloudControlPlaneError.EnvelopeDecodeFailed("Failed to decode provider model catalog.", error)
      }
    }

  override suspend fun startModelPull(
    baseUrl: String,
    request: CloudModelPullRequest,
  ): CloudModelPullEnvelope =
    withContext(Dispatchers.IO) {
      val payload = gson.toJson(request)
      val response = executePostRequest(
        baseUrl = baseUrl,
        path = "/api/models/pull",
        payload = payload,
      )
      parseEnvelope(response, type = CloudModelPullResolution::class.java)
    }

  override suspend fun pollModelPull(baseUrl: String, jobId: String): CloudModelPullEnvelope =
    withContext(Dispatchers.IO) {
      val response =
        executeGetRequest(
          baseUrl = baseUrl,
          path = "/api/models/pull/$jobId",
        )
      parseEnvelope(response, type = CloudModelPullResolution::class.java)
    }

  override suspend fun sendChat(baseUrl: String, request: CloudChatRequest): CloudChatEnvelope =
    withContext(Dispatchers.IO) {
      val payload = gson.toJson(request)
      val response =
        executePostRequest(
          baseUrl = baseUrl,
          path = "/api/ai/chat",
          payload = payload,
        )
      parseEnvelope(response, type = CloudChatResolution::class.java)
    }

  override suspend fun startAiWorkflowJob(baseUrl: String, request: AiWorkflowRequest): AiWorkflowJobEnvelope =
    withContext(Dispatchers.IO) {
      val payload = gson.toJson(request)
      val response = executePostRequest(
        baseUrl = baseUrl,
        path = "/api/ai/workflows/run",
        payload = payload,
        acceptJson = true,
      )
      gson.fromJson(response, AiWorkflowJobEnvelope::class.java)
    }

  override suspend fun getAiWorkflowJobEnvelope(baseUrl: String, jobId: String): AiWorkflowJobEnvelope =
    withContext(Dispatchers.IO) {
      val response = executeGetRequest(
        baseUrl = baseUrl,
        path = "/api/ai/workflows/jobs/$jobId",
        acceptJson = true,
      )
      gson.fromJson(response, AiWorkflowJobEnvelope::class.java)
    }

  private fun <T : Any> parseEnvelope(
    response: String,
    type: Class<T>,
  ): CloudControlPlaneEnvelope<T> {
    val rawJson = ControlPlaneResponseParser.parseEnvelopeBody(response)
    val envelopeType = TypeToken.getParameterized(CloudControlPlaneEnvelope::class.java, type).type
    return runCatching<CloudControlPlaneEnvelope<T>> {
      gson.fromJson<CloudControlPlaneEnvelope<T>>(rawJson, envelopeType)
    }.getOrElse { error ->
      val decodeError = error as? JsonSyntaxException
      throw CloudControlPlaneError.EnvelopeDecodeFailed(
        decodeError?.message ?: "Failed to decode envelope",
        error,
      )
    }
  }

  private fun urlEncode(value: String): String = URLEncoder.encode(value, UTF_8.name())

  private fun executeGetRequest(
    baseUrl: String,
    path: String,
    query: Map<String, String>? = null,
    acceptJson: Boolean = false,
  ): String {
    return executeAcrossCandidateUrls(
      buildUrls(baseUrl = baseUrl, path = path, query = query)
    ) { urlString ->
      executeGetRequestAgainstUrl(urlString = urlString, acceptJson = acceptJson)
    }
  }

  private fun executeGetRequestAgainstUrl(urlString: String, acceptJson: Boolean = false): String {
    var connection: HttpURLConnection? = null
    try {
      val url = parseUrl(urlString)
      connection = (url.openConnection() as HttpURLConnection).apply {
        requestMethod = "GET"
        connectTimeout = connectTimeoutMs
        readTimeout = readTimeoutMs
        if (acceptJson) setRequestProperty("Accept", "application/json")
      }
      return readConnectionResponse(connection = connection)
    } finally {
      connection?.disconnect()
    }
  }

  private fun executePostRequest(
    baseUrl: String,
    path: String,
    payload: String,
    method: String = "POST",
    acceptJson: Boolean = false,
  ): String {
    return executeAcrossCandidateUrls(
      buildUrls(baseUrl = baseUrl, path = path)
    ) { urlString ->
      executePostRequestAgainstUrl(urlString = urlString, payload = payload, method = method, acceptJson = acceptJson)
    }
  }

  private fun executePostRequestAgainstUrl(
    urlString: String,
    payload: String,
    method: String = "POST",
    acceptJson: Boolean = false,
  ): String {
    var connection: HttpURLConnection? = null
    try {
      val url = parseUrl(urlString)
      connection = (url.openConnection() as HttpURLConnection).apply {
        requestMethod = method
        doInput = true
        doOutput = true
        connectTimeout = connectTimeoutMs
        readTimeout = readTimeoutMs
        setRequestProperty("Content-Type", "application/json")
        setRequestProperty("Accept", if (acceptJson) "application/json" else "application/json, text/html")
      }

      BufferedOutputStream(connection.outputStream).use { output ->
        val bytes = payload.toByteArray(UTF_8)
        output.write(bytes)
        output.flush()
      }

      return readConnectionResponse(connection = connection)
    } finally {
      connection?.disconnect()
    }
  }

  private fun executeRequest(
    baseUrl: String,
    path: String,
    method: String,
    acceptJson: Boolean = false,
  ): String {
    return executeAcrossCandidateUrls(
      buildUrls(baseUrl = baseUrl, path = path)
    ) { urlString ->
      executeRequestAgainstUrl(urlString = urlString, method = method, acceptJson = acceptJson)
    }
  }

  private fun executeRequestAgainstUrl(
    urlString: String,
    method: String,
    acceptJson: Boolean = false,
  ): String {
    var connection: HttpURLConnection? = null
    try {
      val url = parseUrl(urlString)
      connection = (url.openConnection() as HttpURLConnection).apply {
        requestMethod = method
        doInput = true
        connectTimeout = connectTimeoutMs
        readTimeout = readTimeoutMs
        if (acceptJson) setRequestProperty("Accept", "application/json")
      }
      return readConnectionResponse(connection = connection)
    } finally {
      connection?.disconnect()
    }
  }

  private fun readConnectionResponse(connection: HttpURLConnection): String {
    val statusCode = connection.responseCode
    val sourceStream =
      if (statusCode in 200..299) {
        BufferedInputStream(connection.inputStream)
      } else {
        BufferedInputStream(connection.errorStream ?: connection.inputStream)
      }

    sourceStream.use { stream ->
      val body = stream.readBytes().toString(UTF_8)
      if (statusCode !in 200..299) {
        throw CloudControlPlaneError.RequestFailed("Request failed with status=$statusCode: $body")
      }
      return body
    }
  }

  private fun parseUrl(urlString: String): URL {
    return runCatching {
      URL(urlString)
    }.getOrElse { error ->
      throw CloudControlPlaneError.InvalidBaseUrl(error.message ?: "Invalid control-plane URL")
    }
  }

  private fun buildUrls(
    baseUrl: String,
    path: String,
    query: Map<String, String>? = null,
  ): List<String> {
    if (baseUrl.isBlank()) {
      throw CloudControlPlaneError.InvalidBaseUrl("Missing control-plane base URL")
    }
    val normalizedPath = if (path.startsWith('/')) path else "/$path"
    val normalizedBases = BaoEdgeRuntimeConfig.resolveControlPlaneCandidateBaseUrls(baseUrl)
    if (query.isNullOrEmpty()) {
      return normalizedBases.map { normalizedBase -> "${normalizedBase.trim().trimEnd('/')}$normalizedPath" }
    }

    val encoded = StringBuilder()
    for ((index, entry) in query.entries.withIndex()) {
      if (index > 0) {
        encoded.append('&')
      }
      encoded.append(URLEncoder.encode(entry.key, UTF_8.name()))
      encoded.append('=')
      encoded.append(URLEncoder.encode(entry.value, UTF_8.name()))
    }
    return normalizedBases.map { normalizedBase ->
      "${normalizedBase.trim().trimEnd('/')}$normalizedPath?${encoded.toString()}"
    }
  }

  private fun executeAcrossCandidateUrls(
    urls: List<String>,
    operation: (String) -> String,
  ): String {
    val prioritizedUrls = prioritizeReachableCandidates(urls)
    var lastError: Exception? = null
    val sanitizedCandidates = prioritizedUrls.map(::sanitizeUrlForLog).distinct()
    StructuredLog.d(
      TAG,
      "control_plane_host_candidates_resolved",
      "candidateCount" to sanitizedCandidates.size,
      "candidates" to sanitizedCandidates.joinToString(separator = ","),
    )
    for ((index, url) in prioritizedUrls.withIndex()) {
      try {
        if (index > 0) {
          StructuredLog.w(
            TAG,
            "control_plane_host_candidate_attempt",
            "candidateIndex" to index,
            "baseUrl" to sanitizeUrlForLog(url),
          )
        }
        return operation(url)
      } catch (error: Exception) {
        lastError = error
        if (!shouldTryNextCandidate(error) || index == prioritizedUrls.lastIndex) {
          break
        }
      }
    }

    val terminalError = lastError
    if (terminalError is CloudControlPlaneError) {
      throw terminalError
    }
    throw CloudControlPlaneError.RequestFailed(
      "Unable to reach control plane using candidates=${sanitizedCandidates.joinToString(separator = ",")}: ${terminalError?.message ?: "unknown error"}"
    )
  }

  private fun shouldTryNextCandidate(error: Exception): Boolean {
    return error !is CloudControlPlaneError.InvalidBaseUrl &&
      error !is CloudControlPlaneError.RequestFailed &&
      error !is CloudControlPlaneError.EnvelopeMissing &&
      error !is CloudControlPlaneError.EnvelopeDecodeFailed
  }

  private fun sanitizeUrlForLog(urlString: String): String {
    return runCatching {
      val url = URL(urlString)
      buildString {
        append(url.protocol)
        append("://")
        append(url.host)
        if (url.port >= 0) {
          append(':')
          append(url.port)
        }
      }
    }.getOrDefault("invalid")
  }

  private fun prioritizeReachableCandidates(urls: List<String>): List<String> {
    if (urls.size <= 2) {
      return urls
    }
    val primaryUrl = urls.first()
    val fallbackUrls = urls.drop(1)
    val reachable = mutableListOf<String>()
    val unreachable = mutableListOf<String>()
    for (url in fallbackUrls) {
      if (isReachableCandidate(url)) {
        reachable.add(url)
      } else {
        unreachable.add(url)
      }
    }
    return buildList {
      add(primaryUrl)
      addAll(reachable)
      addAll(unreachable)
    }
  }

  private fun isReachableCandidate(urlString: String): Boolean {
    val url = runCatching { URL(urlString) }.getOrNull() ?: return false
    val port = url.port.takeIf { it >= 0 } ?: url.defaultPort.takeIf { it >= 0 } ?: return false
    return runCatching {
      Socket().use { socket ->
        socket.connect(InetSocketAddress(url.host, port), minOf(connectTimeoutMs, LOCAL_DEV_HOST_PROBE_TIMEOUT_MS))
      }
      true
    }.getOrDefault(false)
  }

  private companion object {
    const val TAG = "AGControlPlaneClient"
    const val LOCAL_DEV_HOST_PROBE_TIMEOUT_MS = 300
  }
}

/**
 * Shared HTML and envelope parsing logic for Android control-plane responses.
 */
internal object ControlPlaneResponseParser {
  fun parseEnvelopeBody(response: String): String {
    val trimmed = response.trim()
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      return trimmed
    }
    val matcher = DATA_ENVELOPE_PATTERN.matcher(response)
    if (!matcher.find() || matcher.groupCount() < 1) {
      throw CloudControlPlaneError.EnvelopeMissing("Missing data-envelope in control-plane payload")
    }
    return unescapeHtmlEntities(
      matcher.group(1) ?: throw CloudControlPlaneError.EnvelopeMissing("Missing encoded envelope payload")
    )
  }

  fun parseStateMessage(response: String, stateId: String): Pair<FlowExecutionState, String> {
    val escapedStateId = Pattern.quote(stateId)
    val statePattern =
      Pattern.compile(
        "<div[^>]*id=\"$escapedStateId\"[^>]*data-state=\"([^\"]+)\"[^>]*>(.*?)</div>",
        Pattern.DOTALL + Pattern.CASE_INSENSITIVE,
      )
    val stateMatcher = statePattern.matcher(response)
    if (!stateMatcher.find() || stateMatcher.groupCount() < 2) {
      return FlowExecutionState.ERROR_NON_RETRYABLE to ""
    }
    val rawState = stateMatcher.group(1)?.trim().orEmpty()
    val rawMessage = stripHtml(response = stateMatcher.group(2).orEmpty()).trim()
    return toFlowExecutionState(rawState) to if (rawMessage.isNotBlank()) rawMessage else ""
  }

  fun parseOptionValues(response: String): List<String> {
    val matches = OPTION_PATTERN.matcher(response)
    val values = mutableListOf<String>()
    while (matches.find()) {
      val decoded = unescapeHtmlEntities(matches.group(1).orEmpty())
      if (decoded.isNotBlank()) {
        values.add(decoded)
      }
    }
    return values
  }

  fun extractSelectedOption(response: String): String? {
    val matches = SELECTED_OPTION_PATTERN.matcher(response)
    if (!matches.find()) {
      return null
    }
    val selectedValue = matches.group(1).orEmpty()
    return selectedValue.takeIf(String::isNotBlank)?.let(::unescapeHtmlEntities)
  }

  private fun toFlowExecutionState(rawState: String): FlowExecutionState {
    return when (rawState.lowercase()) {
      "idle" -> FlowExecutionState.IDLE
      "loading" -> FlowExecutionState.LOADING
      "success" -> FlowExecutionState.SUCCESS
      "empty" -> FlowExecutionState.EMPTY
      "error-retryable" -> FlowExecutionState.ERROR_RETRYABLE
      "error-non-retryable" -> FlowExecutionState.ERROR_NON_RETRYABLE
      "unauthorized" -> FlowExecutionState.UNAUTHORIZED
      else -> FlowExecutionState.ERROR_NON_RETRYABLE
    }
  }

  private fun unescapeHtmlEntities(value: String): String {
    return value
      .replace("&quot;", "\"")
      .replace("&#39;", "'")
      .replace("&apos;", "'")
      .replace("&lt;", "<")
      .replace("&gt;", ">")
      .replace("&amp;", "&")
  }

  private fun stripHtml(response: String): String {
    val noBreaks = response.replace("<br>", " ").replace("<br/>", " ")
    return TAG_PATTERN.matcher(noBreaks).replaceAll("")
  }

  private val DATA_ENVELOPE_PATTERN =
    Pattern.compile("<section[^>]+data-envelope=\"([^\"]+)\"", Pattern.CASE_INSENSITIVE)
  private val OPTION_PATTERN =
    Pattern.compile(
      "<option\\s+[^>]*value=\"([^\"]+)\"[^>]*>.*?</option>",
      Pattern.CASE_INSENSITIVE + Pattern.DOTALL,
    )
  private val SELECTED_OPTION_PATTERN =
    Pattern.compile(
      "<option\\s+[^>]*value=\"([^\"]+)\"[^>]*selected[^>]*>.*?</option>",
      Pattern.CASE_INSENSITIVE + Pattern.DOTALL,
    )
  private val TAG_PATTERN = Pattern.compile("<[^>]+>")
}

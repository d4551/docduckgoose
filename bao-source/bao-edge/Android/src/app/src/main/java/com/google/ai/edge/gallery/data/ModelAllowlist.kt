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

package com.google.ai.edge.gallery.data

import android.os.Build
import com.google.ai.edge.gallery.common.StructuredLog
import com.google.ai.edge.gallery.common.BaoEdgeRuntimeConfig
import com.google.ai.edge.gallery.common.isPixel10
import com.google.gson.annotations.SerializedName

private const val TAG = "AGModelAllowlist"

data class DefaultConfig(
  @SerializedName("topK") val topK: Int?,
  @SerializedName("topP") val topP: Float?,
  @SerializedName("temperature") val temperature: Float?,
  @SerializedName("accelerators") val accelerators: String?,
  @SerializedName("maxTokens") val maxTokens: Int?,
)

/** A model file on HF for a specific SOC. */
data class SocModelFile(
  @SerializedName("modelFile") val modelFile: String?,
  @SerializedName("url") val url: String?,
  @SerializedName("commitHash") val commitHash: String?,
  @SerializedName("sizeInBytes") val sizeInBytes: Long?,
)

/** A model in the model allowlist. */
data class AllowedModel(
  val name: String,
  val modelId: String,
  val modelFile: String,
  val description: String,
  val sizeInBytes: Long,
  @SerializedName(value = "commitHash", alternate = ["version"]) val commitHash: String = "",
  val defaultConfig: DefaultConfig,
  val taskTypes: List<String>,
  val source: String? = null,
  val sha256: String? = null,
  val disabled: Boolean? = null,
  val llmSupportImage: Boolean? = null,
  val llmSupportAudio: Boolean? = null,
  val llmSupportTinyGarden: Boolean? = null,
  val llmSupportMobileActions: Boolean? = null,
  val deviceAiSupportMobileActions: Boolean? = null,
  val deviceAiSupportRpaControls: Boolean? = null,
  val deviceAiSupportFlowCommands: Boolean? = null,
  val minDeviceMemoryInGb: Int? = null,
  val bestForTaskTypes: List<String>? = null,
  val localModelFilePathOverride: String? = null,
  val url: String? = null,
  val socToModelFiles: Map<String, SocModelFile>? = null,
) {
  fun toModel(): Model {
    val sourceDownloadBaseUrl = BaoEdgeRuntimeConfig.modelDownloadBaseUrl
    var resolvedVersion = commitHash.ifBlank { "main" }
    var resolvedDownloadFileName = modelFile
    var resolvedDownloadUrl =
      url
        ?: "${sourceDownloadBaseUrl}/$modelId/resolve/$resolvedVersion/$resolvedDownloadFileName?download=true"
    var resolvedSizeInBytes = sizeInBytes

    // Handle per-soc model files.
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      if (socToModelFiles?.isNotEmpty() == true) {
        socToModelFiles.get(SOC)?.let { info ->
          StructuredLog.d(
            TAG,
            "soc_specific_model_file_resolved",
            "model_name" to name,
            "soc" to SOC,
            "has_override_url" to !info.url.isNullOrBlank(),
            "has_override_commit_hash" to !info.commitHash.isNullOrBlank(),
          )
          val socCommitHash = info.commitHash?.takeIf { it.isNotBlank() } ?: resolvedVersion
          val socModelFile = info.modelFile?.takeIf { it.isNotBlank() } ?: resolvedDownloadFileName
          resolvedVersion = socCommitHash
          resolvedDownloadFileName = socModelFile
          resolvedDownloadUrl =
            info.url?.takeIf { it.isNotBlank() }
              ?: "${sourceDownloadBaseUrl}/$modelId/resolve/$socCommitHash/$socModelFile?download=true"
          resolvedSizeInBytes = info.sizeInBytes ?: resolvedSizeInBytes
        }
      }
    }

    // Config.
    val isLlmModel =
      taskTypes.contains(BuiltInTaskId.LLM_CHAT) ||
        taskTypes.contains(BuiltInTaskId.LLM_PROMPT_LAB) ||
        taskTypes.contains(BuiltInTaskId.LLM_ASK_AUDIO) ||
        taskTypes.contains(BuiltInTaskId.LLM_ASK_IMAGE) ||
        taskTypes.contains(BuiltInTaskId.LLM_MOBILE_ACTIONS) ||
        taskTypes.contains(BuiltInTaskId.LLM_TINY_GARDEN)
    var configs: MutableList<Config> = mutableListOf()
    var llmMaxToken = 1024
    var accelerators: List<Accelerator> = DEFAULT_ACCELERATORS
    if (isLlmModel) {
      val defaultTopK: Int = defaultConfig.topK ?: DEFAULT_TOPK
      val defaultTopP: Float = defaultConfig.topP ?: DEFAULT_TOPP
      val defaultTemperature: Float = defaultConfig.temperature ?: DEFAULT_TEMPERATURE
      llmMaxToken = defaultConfig.maxTokens ?: 1024
      if (defaultConfig.accelerators != null) {
        val items = defaultConfig.accelerators.split(",")
        accelerators = mutableListOf()
        for (item in items) {
          if (item == "cpu") {
            accelerators.add(Accelerator.CPU)
          } else if (item == "gpu") {
            accelerators.add(Accelerator.GPU)
          } else if (item == "npu") {
            accelerators.add(Accelerator.NPU)
          }
        }
        // Remove GPU from pixel 10 devices.
        if (isPixel10()) {
          accelerators.remove(Accelerator.GPU)
        }
      }
      val npuOnly = accelerators.size == 1 && accelerators[0] == Accelerator.NPU
      configs =
        if (npuOnly) {
            createLlmChatConfigsForNpuModel(
              defaultMaxToken = llmMaxToken,
              accelerators = accelerators,
            )
          } else {
            createLlmChatConfigs(
              defaultTopK = defaultTopK,
              defaultTopP = defaultTopP,
              defaultTemperature = defaultTemperature,
              defaultMaxToken = llmMaxToken,
              accelerators = accelerators,
            )
          }
          .toMutableList()
    }

    // Misc.
    var showBenchmarkButton = true
    var showRunAgainButton = true
    if (isLlmModel) {
      showBenchmarkButton = false
      showRunAgainButton = false
    }

    return Model(
      name = name,
      version = resolvedVersion,
      info = description,
      url = resolvedDownloadUrl,
      modelRef = modelId,
      source = source?.trim()?.takeIf { it.isNotBlank() } ?: "",
      sizeInBytes = resolvedSizeInBytes,
      sha256 = sha256 ?: "",
      minDeviceMemoryInGb = minDeviceMemoryInGb,
      configs = configs,
      downloadFileName = resolvedDownloadFileName,
      showBenchmarkButton = showBenchmarkButton,
      showRunAgainButton = showRunAgainButton,
      learnMoreUrl = "${sourceDownloadBaseUrl}/$modelId",
      llmSupportImage = llmSupportImage == true,
      llmSupportAudio = llmSupportAudio == true,
      llmSupportTinyGarden = llmSupportTinyGarden == true,
      llmSupportMobileActions = llmSupportMobileActions == true,
      deviceAiSupportMobileActions = deviceAiSupportMobileActions == true,
      deviceAiSupportRpaControls = deviceAiSupportRpaControls == true,
      deviceAiSupportFlowCommands = deviceAiSupportFlowCommands == true,
      llmMaxToken = llmMaxToken,
      accelerators = accelerators,
      bestForTaskIds = bestForTaskTypes ?: listOf(),
      localModelFilePathOverride = localModelFilePathOverride ?: "",
      isLlm = isLlmModel,
    )
  }

  override fun toString(): String {
    return "$modelId/$modelFile"
  }
}

/** The model allowlist. */
data class ModelAllowlist(val models: List<AllowedModel>)

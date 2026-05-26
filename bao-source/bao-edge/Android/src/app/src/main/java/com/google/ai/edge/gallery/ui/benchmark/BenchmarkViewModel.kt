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
package com.google.ai.edge.gallery.ui.benchmark

import android.content.Context
import androidx.annotation.StringRes
import androidx.lifecycle.ViewModel
import com.google.ai.edge.gallery.R
import androidx.lifecycle.viewModelScope
import com.google.ai.edge.gallery.BuildConfig
import com.google.ai.edge.gallery.common.StructuredLog
import com.google.ai.edge.gallery.data.DataStoreRepository
import com.google.ai.edge.gallery.data.Model
import com.google.ai.edge.gallery.proto.BenchmarkResult
import com.google.ai.edge.gallery.proto.LlmBenchmarkBasicInfo
import com.google.ai.edge.gallery.proto.LlmBenchmarkResult
import com.google.ai.edge.gallery.proto.LlmBenchmarkStats
import com.google.ai.edge.gallery.proto.ValueSeries
import com.google.ai.edge.litertlm.Backend
import com.google.ai.edge.litertlm.ExperimentalApi
import com.google.ai.edge.litertlm.benchmark
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import java.io.File
import java.util.UUID
import javax.inject.Inject
import kotlin.math.ceil
import kotlin.math.floor
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

private const val TAG = "AGBenchmarkVM"

enum class Aggregation(val label: String, @StringRes val labelResId: Int) {
  AVG(label = "avg", labelResId = R.string.stat_avg),
  MEDIAN(label = "median", labelResId = R.string.stat_median),
  MIN(label = "min", labelResId = R.string.stat_min),
  MAX(label = "max", labelResId = R.string.stat_max),
  // P25(label = "p25"),
  // P75(label = "p75"),
}

data class BenchmarkResultInfo(
  val id: String,
  val benchmarkResult: BenchmarkResult,
  val expanded: Boolean = false,
  val basicInfoExpanded: Boolean = true,
  val statsExpanded: Boolean = true,
  val aggregation: Aggregation = Aggregation.AVG,
)

data class BenchmarkUiState(
  val results: List<BenchmarkResultInfo> = listOf(),
  val baselineResult: BenchmarkResultInfo? = null,
  val showResultsViewer: Boolean = false,
  val running: Boolean = false,
  val totalRunCount: Int = 0,
  val completedRunCount: Int = 0,
  val benchmarkError: String? = null,
)

@HiltViewModel
class BenchmarkViewModel
@Inject
constructor(
  @ApplicationContext private val appContext: Context,
  val dataStoreRepository: DataStoreRepository,
) : ViewModel() {
  protected val _uiState = MutableStateFlow(BenchmarkUiState())
  val uiState = _uiState.asStateFlow()

  init {
    viewModelScope.launch {
      // Load results from storage asynchronously.
      val storedResults = withContext(Dispatchers.IO) { dataStoreRepository.getAllBenchmarkResults() }
      StructuredLog.d(
        TAG,
        "benchmark_results_loaded",
        "result_count" to storedResults.size,
      )
      setBenchmarkResults(results = storedResults)
      collapseAll()
    }
  }

  @OptIn(ExperimentalApi::class)
  fun runBenchmark(
    model: Model,
    accelerator: String,
    prefillTokens: Int,
    decodeTokens: Int,
    runCount: Int,
  ) {
    viewModelScope.launch(Dispatchers.Default) {
      clearBenchmarkError()
      setRunning(running = true)
      setRunProgress(completedRunCount = 0)
      setTotalRunCount(totalRunCount = runCount)
      setShowResultsViewer(showResultsViewer = true)

      StructuredLog.d(
        TAG,
        "benchmark_run_started",
        "model_name" to model.name,
        "accelerator" to accelerator,
        "prefill_tokens" to prefillTokens,
        "decode_tokens" to decodeTokens,
        "run_count" to runCount,
      )

      var benchmarkCacheDir: File? = null
      try {
        val startMs = System.currentTimeMillis()
        val prefillSpeeds = mutableListOf<Double>()
        val decodeSpeeds = mutableListOf<Double>()
        val timesToFirstToken = mutableListOf<Double>()
        var firstInitTime = 0.0
        val nonFirstInitTimes = mutableListOf<Double>()
        val timestamp = System.currentTimeMillis()
        var needCleanUpCacheDir = true
        benchmarkCacheDir = File(appContext.cacheDir, "benchmark_$timestamp")
        var cacheDirPath = benchmarkCacheDir.absolutePath
        if (!benchmarkCacheDir.mkdirs()) {
          StructuredLog.w(
            TAG,
            "benchmark_cache_dir_create_failed",
            "uses_app_cache_dir" to true,
          )
          cacheDirPath = appContext.cacheDir.absolutePath
          needCleanUpCacheDir = false
        }
        StructuredLog.d(
          TAG,
          "benchmark_cache_dir_selected",
          "uses_temp_dir" to needCleanUpCacheDir,
        )
        val backend: Backend =
          when (accelerator.lowercase()) {
            "gpu" -> Backend.GPU()
            "npu" -> Backend.NPU()
            else -> Backend.CPU()
          }
        val modelPath = model.getPath(context = appContext)
        for (i in 0 until runCount) {
          StructuredLog.d(
            TAG,
            "benchmark_iteration_started",
            "run_index" to i,
            "run_count" to runCount,
          )
          val benchmarkInfo =
            benchmark(
              modelPath = modelPath,
              backend = backend,
              prefillTokens = prefillTokens,
              decodeTokens = decodeTokens,
              cacheDir = cacheDirPath,
            )
          StructuredLog.d(
            TAG,
            "benchmark_iteration_completed",
            "run_index" to i,
            "run_count" to runCount,
          )

          val initTimeMs = benchmarkInfo.initTimeInSecond * 1000.0
          if (i == 0) {
            firstInitTime = initTimeMs
          } else {
            nonFirstInitTimes.add(initTimeMs)
          }
          prefillSpeeds.add(benchmarkInfo.lastPrefillTokensPerSecond)
          decodeSpeeds.add(benchmarkInfo.lastDecodeTokensPerSecond)
          timesToFirstToken.add(benchmarkInfo.timeToFirstTokenInSecond)

          setRunProgress(completedRunCount = i + 1)
        }
        val endMs = System.currentTimeMillis()
        if (needCleanUpCacheDir) {
          benchmarkCacheDir.deleteRecursively()
          benchmarkCacheDir = null
          StructuredLog.d(
            TAG,
            "benchmark_cache_dir_cleaned",
            "uses_temp_dir" to true,
          )
        }

        val basicInfo =
          LlmBenchmarkBasicInfo.newBuilder()
            .setStartMs(startMs)
            .setEndMs(endMs)
            .setModelName(model.name)
            .setAccelerator(accelerator)
            .setPrefillTokens(prefillTokens)
            .setDecodeTokens(decodeTokens)
            .setNumberOfRuns(runCount)
            .setAppVersion(BuildConfig.VERSION_NAME)
            .build()
        val stats =
          LlmBenchmarkStats.newBuilder()
            .setPrefillSpeed(calculateValueSeries(prefillSpeeds))
            .setDecodeSpeed(calculateValueSeries(decodeSpeeds))
            .setTimeToFirstToken(calculateValueSeries(timesToFirstToken))
            .setFirstInitTimeMs(firstInitTime)
            .setNonFirstInitTimeMs(calculateValueSeries(nonFirstInitTimes))
            .build()

        val result =
          BenchmarkResult.newBuilder()
            .setLlmResult(
              LlmBenchmarkResult.newBuilder().setBaiscInfo(basicInfo).setStats(stats).build()
            )
            .build()
        val newId = addBenchmarkResult(result = result)
        collapseAll()
        setExpanded(id = newId, expanded = true)
      } catch (e: Exception) {
        StructuredLog.e(
          TAG,
          "benchmark_run_failed",
          e,
          "model_name" to model.name,
          "accelerator" to accelerator,
        )
        _uiState.update { it.copy(benchmarkError = e.message ?: appContext.getString(R.string.benchmark_run_failed)) }
      } finally {
        benchmarkCacheDir?.let {
          if (it.exists()) it.deleteRecursively()
        }
        setRunning(running = false)
      }
    }
  }

  fun clearBenchmarkError() {
    _uiState.update { it.copy(benchmarkError = null) }
  }

  fun setShowResultsViewer(showResultsViewer: Boolean) {
    _uiState.update { _uiState.value.copy(showResultsViewer = showResultsViewer) }
  }

  fun setRunning(running: Boolean) {
    _uiState.update { _uiState.value.copy(running = running) }
  }

  fun setTotalRunCount(totalRunCount: Int) {
    _uiState.update { _uiState.value.copy(totalRunCount = totalRunCount) }
  }

  fun setRunProgress(completedRunCount: Int) {
    _uiState.update { _uiState.value.copy(completedRunCount = completedRunCount) }
  }

  suspend fun addBenchmarkResult(result: BenchmarkResult): String {
    val newResults = _uiState.value.results.toMutableList()
    // Add the new result to the beginning of the list.
    val newId = UUID.randomUUID().toString()
    newResults.add(
      0,
      BenchmarkResultInfo(
        benchmarkResult = result,
        id = newId,
        basicInfoExpanded = true,
        statsExpanded = true,
      ),
    )
    _uiState.update { _uiState.value.copy(results = newResults) }

    // Save to storage.
    dataStoreRepository.addBenchmarkResult(result)

    return newId
  }

  fun setBenchmarkResults(results: List<BenchmarkResult>) {
    _uiState.update {
      _uiState.value.copy(
        results =
          results.map { result ->
            BenchmarkResultInfo(
              benchmarkResult = result,
              expanded = false,
              id = UUID.randomUUID().toString(),
              basicInfoExpanded = false,
              statsExpanded = true,
            )
          }
      )
    }
  }

  fun deleteBenchmarkResult(id: String) {
    val newResults = _uiState.value.results.toMutableList()
    val index = newResults.indexOfFirst { it.id == id }
    if (index != -1) {
      val deletedResult = newResults.removeAt(index)
      _uiState.update { _uiState.value.copy(results = newResults) }
      if (deletedResult.id == uiState.value.baselineResult?.id) {
        _uiState.update { _uiState.value.copy(baselineResult = null) }
      }

      // Update storage.
      viewModelScope.launch { dataStoreRepository.deleteBenchmarkResult(index = index) }
    } else {
      StructuredLog.w(TAG, "benchmark_result_missing", "result_id" to id)
    }
  }

  fun setBaseline(id: String) {
    if (id == uiState.value.baselineResult?.id) {
      clearBaseline()
    } else {
      val result = _uiState.value.results.firstOrNull { it.id == id }
      if (result == null) {
        StructuredLog.w(TAG, "benchmark_result_missing", "result_id" to id)
        return
      }
      _uiState.update { _uiState.value.copy(baselineResult = result) }
    }
  }

  fun clearBaseline() {
    _uiState.update { _uiState.value.copy(baselineResult = null) }
  }

  fun setExpanded(id: String, expanded: Boolean) {
    val newResults = _uiState.value.results.toMutableList()
    val index = newResults.indexOfFirst { it.id == id }
    if (index != -1) {
      newResults[index] =
        newResults[index].copy(
          expanded = expanded,
          basicInfoExpanded = expanded,
          statsExpanded = expanded,
        )
      _uiState.update { _uiState.value.copy(results = newResults) }
    } else {
      StructuredLog.w(TAG, "benchmark_result_missing", "result_id" to id)
    }
  }

  fun setBasicInfoExpanded(id: String, expanded: Boolean) {
    val newResults = _uiState.value.results.toMutableList()
    val index = newResults.indexOfFirst { it.id == id }
    if (index != -1) {
      newResults[index] = newResults[index].copy(basicInfoExpanded = expanded)
      _uiState.update { _uiState.value.copy(results = newResults) }
    } else {
      StructuredLog.w(TAG, "benchmark_result_missing", "result_id" to id)
    }
  }

  fun setStatsExpanded(id: String, expanded: Boolean) {
    val newResults = _uiState.value.results.toMutableList()
    val index = newResults.indexOfFirst { it.id == id }
    if (index != -1) {
      newResults[index] = newResults[index].copy(statsExpanded = expanded)
      _uiState.update { _uiState.value.copy(results = newResults) }
    } else {
      StructuredLog.w(TAG, "benchmark_result_missing", "result_id" to id)
    }
  }

  fun expandAll() {
    val newResults = _uiState.value.results.toMutableList()
    for (i in newResults.indices) {
      newResults[i] =
        newResults[i].copy(expanded = true, statsExpanded = true, basicInfoExpanded = true)
    }
    _uiState.update { _uiState.value.copy(results = newResults) }
  }

  fun collapseAll() {
    val newResults = _uiState.value.results.toMutableList()
    for (i in newResults.indices) {
      newResults[i] =
        newResults[i].copy(expanded = false, statsExpanded = false, basicInfoExpanded = false)
    }
    _uiState.update { _uiState.value.copy(results = newResults) }
  }

  fun setAggregation(id: String, aggregation: Aggregation) {
    val newResults = _uiState.value.results.toMutableList()
    val index = newResults.indexOfFirst { it.id == id }
    if (index >= 0) {
      newResults[index] = newResults[index].copy(aggregation = aggregation)
      if (uiState.value.baselineResult?.id == newResults[index].id) {
        _uiState.update { _uiState.value.copy(baselineResult = newResults[index]) }
      }
    }
    _uiState.update { _uiState.value.copy(results = newResults) }
  }

  private fun calculateValueSeries(values: List<Double>): ValueSeries {
    if (values.isEmpty()) {
      return ValueSeries.getDefaultInstance()
    }

    val sortedValues = values.sorted()
    val size = sortedValues.size

    val min = sortedValues.first()
    val max = sortedValues.last()
    val avg = values.average()

    // Helper function to get the value at a specific percentile (0.0 to 1.0)
    fun getPercentile(p: Double): Double {
      if (size == 1) return sortedValues[0]
      val index = p * (size - 1)
      val lower = floor(index).toInt()
      val upper = ceil(index).toInt()
      if (lower == upper) {
        return sortedValues[lower]
      }
      val weight = index - lower
      return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight
    }

    val median = getPercentile(0.5)
    val pct25 = getPercentile(0.25)
    val pct75 = getPercentile(0.75)

    return ValueSeries.newBuilder()
      .addAllValue(values)
      .setMin(min)
      .setMax(max)
      .setAvg(avg)
      .setMedium(median) // Proto field is named 'medium'
      .setPct25(pct25)
      .setPct75(pct75)
      .build()
  }
}

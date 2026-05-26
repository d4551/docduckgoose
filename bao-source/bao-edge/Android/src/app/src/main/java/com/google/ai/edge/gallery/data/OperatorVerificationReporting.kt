package com.google.ai.edge.gallery.data

import android.content.Context
import com.google.gson.Gson
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import java.io.File
import java.time.Instant
import javax.inject.Inject
import javax.inject.Singleton

private const val OPERATOR_VERIFICATION_DIRECTORY_NAME = "bao-edge-operator-verification"
private const val OPERATOR_VERIFICATION_LATEST_FILE_NAME = "latest.json"
private const val OPERATOR_VERIFICATION_RUNS_DIRECTORY_NAME = "runs"
private const val OPERATOR_VERIFICATION_SCHEMA_VERSION = "1.0"

/** Stable verification scenarios shared with control-plane readers. */
enum class OperatorVerificationScenario(val wireValue: String) {
  CLOUD_CHAT("cloud_chat"),
  LOCAL_DEVICE_AI("local_device_ai"),
  CALENDAR_NATIVE_ACTION("calendar_native_action"),
  WEB_RESEARCH_RPA("web_research_rpa"),
  AUTOMATION_SCHEDULE("automation_schedule"),
}

/** Stable verification usages shared with control-plane readers. */
enum class OperatorVerificationUsage(val wireValue: String) {
  CHAT("chat"),
  AUTOMATION("automation"),
  RESEARCH_RPA("research_rpa"),
  NATIVE_ACTION("native_action"),
  SPEECH_INPUT("speech_input"),
  SPEECH_OUTPUT("speech_output"),
  LOCAL_DEVICE_AI("local_device_ai"),
}

/** Trigger sources for app-owned verification runs. */
enum class OperatorVerificationTriggerSource(val wireValue: String) {
  USER("user"),
  LAUNCH_INJECTION("launch_injection"),
  BACKGROUND_SCHEDULE("background_schedule"),
  DEVICE_AI_PROTOCOL("device_ai_protocol"),
  NATIVE_INTENT("native_intent"),
}

/** Runtime transport written into app-owned verification reports. */
enum class OperatorVerificationRuntimeTransport(val wireValue: String) {
  LOCAL("local"),
  CLOUD("cloud"),
}

/** Terminal state written into app-owned verification reports. */
enum class OperatorVerificationTerminalState(val wireValue: String) {
  IDLE("idle"),
  LOADING("loading"),
  SUCCESS("success"),
  EMPTY("empty"),
  ERROR_RETRYABLE("error-retryable"),
  ERROR_NON_RETRYABLE("error-non-retryable"),
  UNAUTHORIZED("unauthorized");

  companion object {
    /** Map native flow state into the canonical verification terminal state. */
    fun fromFlowState(state: com.baohaus.baoedge.core.flow.FlowExecutionState): OperatorVerificationTerminalState =
      when (state) {
        com.baohaus.baoedge.core.flow.FlowExecutionState.IDLE -> IDLE
        com.baohaus.baoedge.core.flow.FlowExecutionState.LOADING -> LOADING
        com.baohaus.baoedge.core.flow.FlowExecutionState.SUCCESS -> SUCCESS
        com.baohaus.baoedge.core.flow.FlowExecutionState.EMPTY -> EMPTY
        com.baohaus.baoedge.core.flow.FlowExecutionState.ERROR_RETRYABLE -> ERROR_RETRYABLE
        com.baohaus.baoedge.core.flow.FlowExecutionState.ERROR_NON_RETRYABLE -> ERROR_NON_RETRYABLE
        com.baohaus.baoedge.core.flow.FlowExecutionState.UNAUTHORIZED -> UNAUTHORIZED
      }
  }
}

/** Runtime binding metadata written into app-owned verification reports. */
data class OperatorVerificationRuntimeBinding(
  val usage: String,
  val transport: String,
  val provider: String? = null,
  val model: String? = null,
  val source: String? = null,
  val localModelName: String? = null,
  val targetPlatform: String? = null,
)

/** Request summary written into app-owned verification reports. */
data class OperatorVerificationRequestSummary(
  val prompt: String,
  val metadata: Map<String, String> = mapOf(),
)

/** Reply summary written into app-owned verification reports. */
data class OperatorVerificationReplySummary(
  val message: String,
  val state: String,
  val provenance: String,
  val sources: List<String> = listOf(),
)

/** Evidence row written into app-owned verification reports. */
data class OperatorVerificationEvidence(
  val kind: String,
  val status: String,
  val summary: String,
  val value: String? = null,
  val artifactPath: String? = null,
  val metadata: Map<String, String> = mapOf(),
)

/** Persisted target identifiers written into app-owned verification reports. */
data class OperatorVerificationTargetIds(
  val appId: String? = null,
  val scheduleId: String? = null,
  val eventId: String? = null,
  val calendarId: String? = null,
  val conversationId: String? = null,
  val deviceId: String? = null,
)

/** Canonical app-owned verification report persisted by Android operator flows. */
data class OperatorVerificationReport(
  val schemaVersion: String = OPERATOR_VERIFICATION_SCHEMA_VERSION,
  val correlationId: String,
  val platform: String = "android",
  val scenario: String,
  val runtime: OperatorVerificationRuntimeBinding,
  val triggerSource: String,
  val request: OperatorVerificationRequestSummary,
  val terminalState: String,
  val reply: OperatorVerificationReplySummary,
  val evidence: List<OperatorVerificationEvidence> = listOf(),
  val targetIds: OperatorVerificationTargetIds? = null,
  val artifactPaths: List<String> = listOf(),
  val startedAt: String,
  val completedAt: String,
)

/** Owner for app-managed verification-report persistence. */
interface OperatorVerificationReporter {
  /** Persist the latest verification report and an archived per-run copy. */
  fun persist(report: OperatorVerificationReport): File
}

/** File-backed reporter used by Android operator flows and native intents. */
@Singleton
class FileOperatorVerificationReporter
@Inject
constructor(
  @ApplicationContext private val context: Context,
) : OperatorVerificationReporter {
  private val gson = Gson()

  override fun persist(report: OperatorVerificationReport): File {
    val rootDirectory = File(context.getExternalFilesDir(null) ?: context.filesDir, OPERATOR_VERIFICATION_DIRECTORY_NAME)
    val runsDirectory = File(rootDirectory, OPERATOR_VERIFICATION_RUNS_DIRECTORY_NAME)
    rootDirectory.mkdirs()
    runsDirectory.mkdirs()
    val archivedFile = File(runsDirectory, "${report.correlationId}.json")
    val latestFile = File(rootDirectory, OPERATOR_VERIFICATION_LATEST_FILE_NAME)
    val json = gson.toJson(report)
    archivedFile.writeText(json)
    latestFile.writeText(json)
    return latestFile
  }
}

/** Shared helpers for building canonical Android verification reports. */
object OperatorVerificationReports {
  /** Build one canonical report with ISO8601 timestamps when callers already resolved the terminal state. */
  fun create(
    correlationId: String,
    scenario: OperatorVerificationScenario,
    runtime: OperatorVerificationRuntimeBinding,
    triggerSource: OperatorVerificationTriggerSource,
    request: OperatorVerificationRequestSummary,
    terminalState: OperatorVerificationTerminalState,
    reply: OperatorVerificationReplySummary,
    evidence: List<OperatorVerificationEvidence> = listOf(),
    targetIds: OperatorVerificationTargetIds? = null,
    artifactPaths: List<String> = listOf(),
    startedAt: String = Instant.now().toString(),
    completedAt: String = Instant.now().toString(),
  ): OperatorVerificationReport =
    OperatorVerificationReport(
      correlationId = correlationId,
      scenario = scenario.wireValue,
      runtime = runtime,
      triggerSource = triggerSource.wireValue,
      request = request,
      terminalState = terminalState.wireValue,
      reply = reply,
      evidence = evidence,
      targetIds = targetIds,
      artifactPaths = artifactPaths,
      startedAt = startedAt,
      completedAt = completedAt,
    )
}

@Module
@InstallIn(SingletonComponent::class)
internal abstract class OperatorVerificationReporterModule {
  @Binds
  abstract fun bindOperatorVerificationReporter(
    implementation: FileOperatorVerificationReporter,
  ): OperatorVerificationReporter
}

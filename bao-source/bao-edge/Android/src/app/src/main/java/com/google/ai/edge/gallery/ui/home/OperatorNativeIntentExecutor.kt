package com.google.ai.edge.gallery.ui.home

import android.Manifest
import android.content.ContentValues
import android.content.Context
import android.content.pm.PackageManager
import android.net.Uri
import android.provider.CalendarContract
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.core.content.ContextCompat
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.common.StructuredLog
import com.google.ai.edge.gallery.common.BaoEdgeRuntimeConfig
import com.google.ai.edge.gallery.data.OperatorVerificationEvidence
import com.google.ai.edge.gallery.data.OperatorVerificationReplySummary
import com.google.ai.edge.gallery.data.OperatorVerificationReporter
import com.google.ai.edge.gallery.data.OperatorVerificationReports
import com.google.ai.edge.gallery.data.OperatorVerificationRequestSummary
import com.google.ai.edge.gallery.data.OperatorVerificationRuntimeBinding
import com.google.ai.edge.gallery.data.OperatorVerificationRuntimeTransport
import com.google.ai.edge.gallery.data.OperatorVerificationScenario
import com.google.ai.edge.gallery.data.OperatorVerificationTargetIds
import com.google.ai.edge.gallery.data.OperatorVerificationTerminalState
import com.google.ai.edge.gallery.data.OperatorVerificationTriggerSource
import com.google.ai.edge.gallery.data.OperatorVerificationUsage
import com.google.gson.JsonElement
import com.google.gson.JsonParser
import com.baohaus.baoedge.core.flow.FlowExecutionState
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import java.text.NumberFormat
import java.time.DayOfWeek
import java.time.Instant
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeFormatterBuilder
import java.time.format.FormatStyle
import java.time.temporal.TemporalAdjusters
import java.util.Locale
import java.util.TimeZone
import java.util.UUID
import javax.inject.Inject
import javax.inject.Singleton
import kotlin.coroutines.resume
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import kotlinx.coroutines.withTimeout

private const val TAG = "AGOperatorNativeIntent"

/** Executes Android-native operator intents that should run on-device before cloud fallback. */
interface OperatorNativeIntentExecutor {
  /** Returns true when the prompt matches one of the Android-native intents handled on-device. */
  fun supports(prompt: String): Boolean

  /** Returns a native result when the prompt matches a supported Android-only intent. */
  suspend fun executeIfSupported(prompt: String): OperatorNativeIntentResult?
}

/** One native Android operator execution result. */
data class OperatorNativeIntentResult(
  val state: FlowExecutionState,
  val message: String,
)

private sealed interface ParsedOperatorNativeIntent {
  data class CalendarEvent(val draft: CalendarEventDraft) : ParsedOperatorNativeIntent

  data object CalendarMissingDateTime : ParsedOperatorNativeIntent

  data object AppleMacBookPricingResearch : ParsedOperatorNativeIntent
}

/** Parsed calendar event draft derived from an operator prompt. */
internal data class CalendarEventDraft(
  val title: String,
  val description: String,
  val startAt: ZonedDateTime,
  val endAt: ZonedDateTime,
)

private data class WritableCalendar(
  val id: Long,
  val displayName: String,
)

private data class AppOwnedLocalCalendar(
  val accountName: String,
  val accountType: String,
  val displayName: String,
  val ownerAccount: String,
  val timeZoneId: String,
)

/** Parsed Apple pricing snapshot extracted from the live buy page bootstrap payload. */
internal data class ApplePricingResearchSnapshot(
  val pageTitle: String,
  val pageUrl: String,
  val schemaHighPrice: Double?,
  val highestBasePrice: Double?,
  val highestBasePriceKey: String,
  val options: List<ApplePricingResearchOption>,
)

/** One top-end Apple configuration option extracted from the live buy page. */
internal data class ApplePricingResearchOption(
  val groupKey: String,
  val label: String,
)

@Singleton
internal class AndroidOperatorNativeIntentExecutor
@Inject
constructor(
  @ApplicationContext private val appContext: Context,
  private val verificationReporter: OperatorVerificationReporter,
) : OperatorNativeIntentExecutor {
  override fun supports(prompt: String): Boolean = parseOperatorNativeIntent(prompt = prompt.trim()) != null

  override suspend fun executeIfSupported(prompt: String): OperatorNativeIntentResult? {
    val normalizedPrompt = prompt.trim()
    if (normalizedPrompt.isBlank()) {
      return null
    }

    return when (val intent = parseOperatorNativeIntent(prompt = normalizedPrompt)) {
      is ParsedOperatorNativeIntent.CalendarEvent -> saveCalendarEvent(draft = intent.draft)
      ParsedOperatorNativeIntent.CalendarMissingDateTime ->
        OperatorNativeIntentResult(
          state = FlowExecutionState.ERROR_NON_RETRYABLE,
          message = appContext.getString(R.string.operator_native_calendar_parse_failed),
        )
      ParsedOperatorNativeIntent.AppleMacBookPricingResearch -> researchApplePricingOnDevice()
      null -> null
    }
  }

  private suspend fun saveCalendarEvent(draft: CalendarEventDraft): OperatorNativeIntentResult =
    withContext(Dispatchers.IO) {
      val resolvedTitle =
        draft.title.ifBlank {
          appContext.getString(R.string.operator_native_calendar_default_title)
        }
      if (!hasCalendarPermission()) {
        return@withContext OperatorNativeIntentResult(
          state = FlowExecutionState.ERROR_NON_RETRYABLE,
          message = appContext.getString(R.string.operator_native_calendar_permission_required),
        )
      }

      val calendar = queryWritableCalendar() ?: ensureWritableCalendar()
      if (calendar == null) {
        return@withContext OperatorNativeIntentResult(
          state = FlowExecutionState.ERROR_NON_RETRYABLE,
          message = appContext.getString(R.string.operator_native_calendar_no_writable_calendar),
        )
      }

      val values =
        ContentValues().apply {
          put(CalendarContract.Events.CALENDAR_ID, calendar.id)
          put(CalendarContract.Events.TITLE, resolvedTitle)
          put(CalendarContract.Events.DESCRIPTION, draft.description)
          put(CalendarContract.Events.DTSTART, draft.startAt.toInstant().toEpochMilli())
          put(CalendarContract.Events.DTEND, draft.endAt.toInstant().toEpochMilli())
          put(CalendarContract.Events.EVENT_TIMEZONE, draft.startAt.zone.id)
          put(CalendarContract.Events.EVENT_END_TIMEZONE, draft.endAt.zone.id)
        }

      val insertedUri = runCatching {
        appContext.contentResolver.insert(CalendarContract.Events.CONTENT_URI, values)
      }.getOrElse { error ->
        StructuredLog.e(
          TAG,
          "operator_native_calendar_insert_failed",
          error,
          "title_length" to resolvedTitle.length,
        )
        return@withContext OperatorNativeIntentResult(
          state = FlowExecutionState.ERROR_RETRYABLE,
          message = error.message.orEmpty().ifBlank {
            appContext.getString(R.string.operator_native_calendar_save_failed)
          },
        )
      }

      val eventId = insertedUri?.lastPathSegment.orEmpty()
      val dateFormatter =
        DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM).withLocale(Locale.getDefault())
      val timeRange =
        buildString {
          append(dateFormatter.format(draft.startAt))
          append(" → ")
          append(dateFormatter.format(draft.endAt))
        }
      val message = appContext.getString(
        R.string.operator_native_calendar_saved,
        resolvedTitle,
        calendar.displayName,
        timeRange,
        eventId.ifBlank {
          appContext.getString(R.string.operator_native_identifier_unavailable)
        },
      )
      persistNativeVerificationReport(
        scenario = OperatorVerificationScenario.CALENDAR_NATIVE_ACTION,
        usage = OperatorVerificationUsage.NATIVE_ACTION,
        prompt = draft.description,
        terminalState = OperatorVerificationTerminalState.SUCCESS,
        summary = message,
        targetIds = OperatorVerificationTargetIds(
          eventId = eventId.ifBlank { null },
          calendarId = calendar.id.toString(),
        ),
        evidence = listOf(
          OperatorVerificationEvidence(
            kind = "calendar_event",
            status = "captured",
            summary = "$resolvedTitle ($timeRange)",
            value = eventId.ifBlank { null },
          ),
        ),
      )
      OperatorNativeIntentResult(
        state = FlowExecutionState.SUCCESS,
        message = message,
      )
    }

  private suspend fun researchApplePricingOnDevice(): OperatorNativeIntentResult =
    withContext(Dispatchers.Main.immediate) {
      val timeoutMs = BaoEdgeRuntimeConfig.operatorNativeWebResearchTimeoutMs.toLong()
      val pollIntervalMs = BaoEdgeRuntimeConfig.operatorNativeWebResearchPollIntervalMs.toLong()
      val researchOutcome =
        runCatching {
          withTimeout(timeoutMs) {
            loadApplePricingSnapshot(pollIntervalMs = pollIntervalMs)
          }
        }
      val snapshot = researchOutcome.getOrElse { error ->
        StructuredLog.e(
          TAG,
          "operator_native_apple_research_failed",
          error,
          "url" to BaoEdgeRuntimeConfig.operatorAppleMacBookProBuyUrl,
        )
        return@withContext OperatorNativeIntentResult(
          state = FlowExecutionState.ERROR_RETRYABLE,
          message = appContext.getString(R.string.operator_native_research_load_failed),
        )
      }

      if (snapshot == null) {
        return@withContext OperatorNativeIntentResult(
          state = FlowExecutionState.ERROR_RETRYABLE,
          message = appContext.getString(R.string.operator_native_research_unavailable),
        )
      }

      val pricingSummary = buildApplePricingSummary(snapshot = snapshot)
      persistNativeVerificationReport(
        scenario = OperatorVerificationScenario.WEB_RESEARCH_RPA,
        usage = OperatorVerificationUsage.RESEARCH_RPA,
        prompt = "Research Apple MacBook Pro pricing",
        terminalState = OperatorVerificationTerminalState.SUCCESS,
        summary = pricingSummary,
        evidence = listOf(
          OperatorVerificationEvidence(
            kind = "url_visit",
            status = "captured",
            summary = snapshot.pageTitle.ifBlank { snapshot.pageUrl },
            value = snapshot.pageUrl,
          ),
        ),
      )
      OperatorNativeIntentResult(
        state = FlowExecutionState.SUCCESS,
        message = pricingSummary,
      )
    }

  private fun persistNativeVerificationReport(
    scenario: OperatorVerificationScenario,
    usage: OperatorVerificationUsage,
    prompt: String,
    terminalState: OperatorVerificationTerminalState,
    summary: String,
    targetIds: OperatorVerificationTargetIds? = null,
    evidence: List<OperatorVerificationEvidence> = emptyList(),
  ) {
    try {
      val correlationId = UUID.randomUUID().toString()
      val now = Instant.now().toString()
      val report = OperatorVerificationReports.create(
        correlationId = correlationId,
        scenario = scenario,
        runtime = OperatorVerificationRuntimeBinding(
          usage = usage.wireValue,
          transport = OperatorVerificationRuntimeTransport.LOCAL.wireValue,
        ),
        triggerSource = OperatorVerificationTriggerSource.NATIVE_INTENT,
        request = OperatorVerificationRequestSummary(prompt = prompt),
        terminalState = terminalState,
        reply = OperatorVerificationReplySummary(
          message = summary,
          state = terminalState.wireValue,
          provenance = "local",
        ),
        targetIds = targetIds,
        evidence = evidence,
        startedAt = now,
      )
      verificationReporter.persist(report)
    } catch (e: Exception) {
      StructuredLog.w(TAG, "operator_native_verification_report_failed", "error" to e.message.orEmpty())
    }
  }

  private suspend fun loadApplePricingSnapshot(
    pollIntervalMs: Long,
  ): ApplePricingResearchSnapshot? =
    suspendCancellableCoroutine { continuation ->
      val webView = WebView(appContext)
      var finished = false
      val maxAttempts =
        (BaoEdgeRuntimeConfig.operatorNativeWebResearchTimeoutMs / pollIntervalMs.toInt()).coerceAtLeast(1)

      fun finish(snapshot: ApplePricingResearchSnapshot?) {
        if (finished) {
          return
        }
        finished = true
        webView.stopLoading()
        webView.destroy()
        continuation.resume(snapshot)
      }

      fun pollSnapshot(attempt: Int) {
        if (finished) {
          return
        }
        webView.evaluateJavascript(APPLE_BUY_PAGE_EXTRACTION_SCRIPT) { rawResult ->
          val snapshot =
            runCatching {
              parseApplePricingResearchSnapshot(rawResult)
            }.getOrElse { error ->
              StructuredLog.w(
                TAG,
                "operator_native_apple_research_parse_failed",
                "error" to error.message.orEmpty(),
                "attempt" to attempt,
              )
              null
            }
          if (snapshot != null) {
            finish(snapshot)
          } else if (attempt >= maxAttempts) {
            StructuredLog.w(
              TAG,
              "operator_native_apple_research_bootstrap_missing",
              "attempts" to attempt,
              "url" to BaoEdgeRuntimeConfig.operatorAppleMacBookProBuyUrl,
            )
            finish(null)
          } else {
            webView.postDelayed(
              { pollSnapshot(attempt + 1) },
              pollIntervalMs,
            )
          }
        }
      }

      webView.settings.javaScriptEnabled = true
      webView.settings.domStorageEnabled = true
      webView.settings.loadsImagesAutomatically = false
      webView.settings.blockNetworkImage = true
      webView.settings.javaScriptCanOpenWindowsAutomatically = false
      webView.settings.allowContentAccess = false
      webView.settings.allowFileAccess = false
      webView.webViewClient =
        object : WebViewClient() {
          override fun onPageFinished(view: WebView, url: String) {
            if (!finished) {
              pollSnapshot(attempt = 1)
            }
          }

          override fun onReceivedError(
            view: WebView,
            request: WebResourceRequest,
            error: WebResourceError,
          ) {
            if (request.isForMainFrame) {
              StructuredLog.w(
                TAG,
                "operator_native_apple_research_page_error",
                "error_code" to error.errorCode,
                "description" to error.description,
              )
              finish(null)
            }
          }

          @Deprecated("Deprecated in Java")
          override fun onReceivedError(
            view: WebView,
            errorCode: Int,
            description: String?,
            failingUrl: String?,
          ) {
            StructuredLog.w(
              TAG,
              "operator_native_apple_research_page_error_legacy",
              "error_code" to errorCode,
              "description" to description.orEmpty(),
              "url" to failingUrl.orEmpty(),
            )
            finish(null)
          }
        }

      continuation.invokeOnCancellation {
        if (!finished) {
          finished = true
          webView.stopLoading()
          webView.destroy()
        }
      }

      webView.loadUrl(BaoEdgeRuntimeConfig.operatorAppleMacBookProBuyUrl)
    }

  private fun hasCalendarPermission(): Boolean {
    return ContextCompat.checkSelfPermission(appContext, Manifest.permission.READ_CALENDAR) ==
      PackageManager.PERMISSION_GRANTED &&
      ContextCompat.checkSelfPermission(appContext, Manifest.permission.WRITE_CALENDAR) ==
        PackageManager.PERMISSION_GRANTED
  }

  private fun ensureWritableCalendar(): WritableCalendar? {
    val appOwnedCalendar = appOwnedLocalCalendar()
    queryAppOwnedCalendar(appOwnedCalendar)?.let { existingCalendar ->
      return existingCalendar
    }

    val insertValues =
      ContentValues().apply {
        put(CalendarContract.Calendars.ACCOUNT_NAME, appOwnedCalendar.accountName)
        put(CalendarContract.Calendars.ACCOUNT_TYPE, appOwnedCalendar.accountType)
        put(CalendarContract.Calendars.NAME, appOwnedCalendar.displayName)
        put(CalendarContract.Calendars.CALENDAR_DISPLAY_NAME, appOwnedCalendar.displayName)
        put(CalendarContract.Calendars.CALENDAR_COLOR, ContextCompat.getColor(appContext, R.color.bao_edge_gold))
        put(CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL, CalendarContract.Calendars.CAL_ACCESS_OWNER)
        put(CalendarContract.Calendars.OWNER_ACCOUNT, appOwnedCalendar.ownerAccount)
        put(CalendarContract.Calendars.VISIBLE, 1)
        put(CalendarContract.Calendars.SYNC_EVENTS, 1)
        put(CalendarContract.Calendars.CALENDAR_TIME_ZONE, appOwnedCalendar.timeZoneId)
        put(CalendarContract.Calendars.CAN_ORGANIZER_RESPOND, 1)
      }

    val insertedUri =
      runCatching {
        appContext.contentResolver.insert(
          asCalendarSyncAdapterUri(
            uri = CalendarContract.Calendars.CONTENT_URI,
            accountName = appOwnedCalendar.accountName,
            accountType = appOwnedCalendar.accountType,
          ),
          insertValues,
        )
      }.getOrElse { error ->
        StructuredLog.e(
          TAG,
          "operator_native_calendar_local_calendar_create_failed",
          error,
          "account_name" to appOwnedCalendar.accountName,
          "account_type" to appOwnedCalendar.accountType,
        )
        return null
      }

    queryAppOwnedCalendar(appOwnedCalendar)?.let { createdCalendar ->
      StructuredLog.d(
        TAG,
        "operator_native_calendar_local_calendar_ready",
        "calendar_id" to createdCalendar.id,
        "account_name" to appOwnedCalendar.accountName,
      )
      return createdCalendar
    }

    val insertedCalendarId = insertedUri?.lastPathSegment?.toLongOrNull() ?: return null
    StructuredLog.d(
      TAG,
      "operator_native_calendar_local_calendar_ready",
      "calendar_id" to insertedCalendarId,
      "account_name" to appOwnedCalendar.accountName,
    )
    return WritableCalendar(
      id = insertedCalendarId,
      displayName = appOwnedCalendar.displayName,
    )
  }

  private fun queryWritableCalendar(): WritableCalendar? {
    val projection =
      arrayOf(
        CalendarContract.Calendars._ID,
        CalendarContract.Calendars.CALENDAR_DISPLAY_NAME,
      )
    val selection =
      buildString {
        append("${CalendarContract.Calendars.VISIBLE} = 1")
        append(" AND ${CalendarContract.Calendars.SYNC_EVENTS} = 1")
        append(" AND ${CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL} >= ${CalendarContract.Calendars.CAL_ACCESS_CONTRIBUTOR}")
      }
    val sortOrder =
      "${CalendarContract.Calendars.IS_PRIMARY} DESC, ${CalendarContract.Calendars._ID} ASC"
    return runCatching {
      appContext.contentResolver.query(
        CalendarContract.Calendars.CONTENT_URI,
        projection,
        selection,
        null,
        sortOrder,
      )
    }.getOrNull()?.use { cursor ->
      if (!cursor.moveToFirst()) {
        return@use null
      }
      val idIndex = cursor.getColumnIndexOrThrow(CalendarContract.Calendars._ID)
      val nameIndex = cursor.getColumnIndexOrThrow(CalendarContract.Calendars.CALENDAR_DISPLAY_NAME)
      WritableCalendar(
        id = cursor.getLong(idIndex),
        displayName =
          cursor.getString(nameIndex).orEmpty().ifBlank {
            appContext.getString(R.string.operator_native_calendar_default_calendar_name)
          },
      )
    }
  }

  private fun queryAppOwnedCalendar(appOwnedCalendar: AppOwnedLocalCalendar): WritableCalendar? {
    val projection =
      arrayOf(
        CalendarContract.Calendars._ID,
        CalendarContract.Calendars.CALENDAR_DISPLAY_NAME,
      )
    val selection =
      buildString {
        append("${CalendarContract.Calendars.ACCOUNT_NAME} = ?")
        append(" AND ${CalendarContract.Calendars.ACCOUNT_TYPE} = ?")
        append(" AND ${CalendarContract.Calendars.OWNER_ACCOUNT} = ?")
      }
    val selectionArgs =
      arrayOf(
        appOwnedCalendar.accountName,
        appOwnedCalendar.accountType,
        appOwnedCalendar.ownerAccount,
      )
    return runCatching {
      appContext.contentResolver.query(
        CalendarContract.Calendars.CONTENT_URI,
        projection,
        selection,
        selectionArgs,
        "${CalendarContract.Calendars._ID} ASC",
      )
    }.getOrNull()?.use { cursor ->
      if (!cursor.moveToFirst()) {
        return@use null
      }
      val idIndex = cursor.getColumnIndexOrThrow(CalendarContract.Calendars._ID)
      val nameIndex = cursor.getColumnIndexOrThrow(CalendarContract.Calendars.CALENDAR_DISPLAY_NAME)
      WritableCalendar(
        id = cursor.getLong(idIndex),
        displayName =
          cursor.getString(nameIndex).orEmpty().ifBlank {
            appOwnedCalendar.displayName
          },
      )
    }
  }

  private fun appOwnedLocalCalendar(): AppOwnedLocalCalendar {
    val displayName = appContext.getString(R.string.operator_native_calendar_app_owned_calendar_name)
    val accountName = buildAppOwnedCalendarAccountName(appContext.packageName)
    return AppOwnedLocalCalendar(
      accountName = accountName,
      accountType = CalendarContract.ACCOUNT_TYPE_LOCAL,
      displayName = displayName,
      ownerAccount = accountName,
      timeZoneId = TimeZone.getDefault().id,
    )
  }

  private fun buildApplePricingSummary(snapshot: ApplePricingResearchSnapshot): String {
    val currencyFormatter = NumberFormat.getCurrencyInstance(Locale.US)
    val lines = mutableListOf<String>()
    lines += appContext.getString(R.string.operator_native_research_intro)
    snapshot.schemaHighPrice?.let { highPrice ->
      lines += "- ${appContext.getString(R.string.operator_native_research_top_price_label)}: ${currencyFormatter.format(highPrice)}"
    }
    snapshot.highestBasePrice?.let { highestBasePrice ->
      lines += "- ${appContext.getString(R.string.operator_native_research_base_price_label)}: ${currencyFormatter.format(highestBasePrice)}"
    }
    if (snapshot.options.isNotEmpty()) {
      lines += "- ${appContext.getString(R.string.operator_native_research_top_options_label)}:"
      snapshot.options.forEach { option ->
        lines += "  - ${resolveAppleOptionGroupLabel(option.groupKey)}: ${option.label}"
      }
    }
    lines += "- ${appContext.getString(R.string.operator_native_research_source_label)}: ${snapshot.pageUrl}"
    return lines.joinToString(separator = "\n")
  }

  private fun resolveAppleOptionGroupLabel(groupKey: String): String {
    return when {
      groupKey.contains("processor", ignoreCase = true) || groupKey.contains("chip", ignoreCase = true) ->
        appContext.getString(R.string.operator_native_research_group_chip)
      groupKey.contains("memory", ignoreCase = true) ->
        appContext.getString(R.string.operator_native_research_group_memory)
      groupKey.contains("storage", ignoreCase = true) || groupKey.contains("capacity", ignoreCase = true) ->
        appContext.getString(R.string.operator_native_research_group_storage)
      groupKey.contains("display", ignoreCase = true) || groupKey.contains("texture", ignoreCase = true) ->
        appContext.getString(R.string.operator_native_research_group_display)
      groupKey.contains("color", ignoreCase = true) || groupKey.contains("finish", ignoreCase = true) ->
        appContext.getString(R.string.operator_native_research_group_finish)
      groupKey.contains("power", ignoreCase = true) || groupKey.contains("adapter", ignoreCase = true) ->
        appContext.getString(R.string.operator_native_research_group_power_adapter)
      groupKey.contains("logic", ignoreCase = true) ->
        appContext.getString(R.string.operator_native_research_group_logic_pro)
      groupKey.contains("final", ignoreCase = true) ->
        appContext.getString(R.string.operator_native_research_group_final_cut)
      else -> groupKey.replace('-', ' ').replace('_', ' ')
    }
  }
}

private fun parseOperatorNativeIntent(
  prompt: String,
  now: ZonedDateTime = ZonedDateTime.now(),
): ParsedOperatorNativeIntent? {
  return when {
    looksLikeCalendarRequest(prompt) -> {
      parseCalendarEventDraft(prompt = prompt, now = now)?.let(ParsedOperatorNativeIntent::CalendarEvent)
        ?: ParsedOperatorNativeIntent.CalendarMissingDateTime
    }
    looksLikeApplePricingResearch(prompt) -> ParsedOperatorNativeIntent.AppleMacBookPricingResearch
    else -> null
  }
}

internal fun looksLikeCalendarRequest(prompt: String): Boolean {
  val normalized = prompt.lowercase(Locale.US)
  val calendarIntentWords =
    listOf("calendar", "event", "invite", "meeting", "appointment")
  val actionWords = listOf("schedule", "create", "add", "save")
  return calendarIntentWords.any(normalized::contains) && actionWords.any(normalized::contains)
}

internal fun looksLikeApplePricingResearch(prompt: String): Boolean {
  val normalized = prompt.lowercase(Locale.US)
  val targetWords = listOf("macbook", "macbook pro", "apple")
  val pricingWords = listOf("price", "prices", "pricing", "cost", "research", "buy")
  return targetWords.any(normalized::contains) && pricingWords.any(normalized::contains)
}

internal fun parseCalendarEventDraft(
  prompt: String,
  now: ZonedDateTime,
): CalendarEventDraft? {
  val date = parseCalendarDate(prompt = prompt, now = now) ?: return null
  val startTime = parseClockTime(prompt = prompt, prefixes = listOf("from", "at")) ?: return null
  val startAt = ZonedDateTime.of(date, startTime, now.zone)
  val endAt =
    parseClockTime(prompt = prompt, prefixes = listOf("to", "until", "ending at", "ends at"))
      ?.let { ZonedDateTime.of(date, it, now.zone) }
      ?.takeIf { it.isAfter(startAt) }
      ?: parseDuration(prompt = prompt)?.let(startAt::plus)
      ?: startAt.plusMinutes(BaoEdgeRuntimeConfig.operatorCalendarDefaultDurationMinutes.toLong())
  return CalendarEventDraft(
    title = extractCalendarTitle(prompt = prompt),
    description = prompt,
    startAt = startAt,
    endAt = endAt,
  )
}

private fun parseCalendarDate(
  prompt: String,
  now: ZonedDateTime,
): LocalDate? {
  val normalized = prompt.lowercase(Locale.US)
  if ("tomorrow" in normalized) {
    return now.toLocalDate().plusDays(1)
  }
  if ("today" in normalized) {
    return now.toLocalDate()
  }

  ISO_DATE_REGEX.find(normalized)?.let { match ->
    return LocalDate.parse(match.value, DateTimeFormatter.ISO_LOCAL_DATE)
  }

  MONTH_DAY_REGEX.find(prompt)?.let { match ->
    val monthValue = MONTHS[match.groupValues[1].lowercase(Locale.US)] ?: return@let
    val day = match.groupValues[2].toInt()
    val year =
      match.groupValues[3]
        .takeIf(String::isNotBlank)
        ?.toInt()
        ?: now.year
    return LocalDate.of(year, monthValue, day)
  }

  WEEKDAY_REGEX.find(normalized)?.let { match ->
    val nextExplicitlyRequested = match.groupValues[1].isNotBlank()
    val targetDay = WEEKDAYS[match.groupValues[2]] ?: return@let
    val candidate =
      now.toLocalDate().with(TemporalAdjusters.nextOrSame(targetDay)).let { resolved ->
        if (nextExplicitlyRequested && resolved == now.toLocalDate()) {
          resolved.plusWeeks(1)
        } else {
          resolved
        }
      }
    return candidate
  }

  return null
}

private fun parseClockTime(
  prompt: String,
  prefixes: List<String>,
): LocalTime? {
  val prefixPattern = prefixes.joinToString(separator = "|") { Regex.escape(it) }
  val regex =
    Regex(
      pattern =
        "\\b(?:$prefixPattern)\\s+(\\d{1,2}(?::\\d{2})?\\s*(?:a\\.m\\.|p\\.m\\.|am|pm)|\\d{1,2}:\\d{2})\\b",
      options = setOf(RegexOption.IGNORE_CASE),
    )
  val rawValue = regex.find(prompt)?.groupValues?.getOrNull(1)?.trim().orEmpty()
  if (rawValue.isBlank()) {
    return null
  }
  val normalized =
    rawValue
      .lowercase(Locale.US)
      .replace("a.m.", "am")
      .replace("p.m.", "pm")
      .replace(" ", "")
  return AM_PM_TIME_FORMATTERS.firstNotNullOfOrNull { formatter ->
    runCatching { LocalTime.parse(normalized, formatter) }.getOrNull()
  }
}

private fun parseDuration(prompt: String): java.time.Duration? {
  val match =
    DURATION_REGEX.find(prompt.lowercase(Locale.US))
      ?: return null
  val value = match.groupValues[1].toLongOrNull() ?: return null
  return when {
    match.groupValues[2].startsWith("hour") || match.groupValues[2].startsWith("hr") ->
      java.time.Duration.ofHours(value)
    else -> java.time.Duration.ofMinutes(value)
  }
}

private fun extractCalendarTitle(prompt: String): String {
  QUOTED_TITLE_REGEX.find(prompt)?.groupValues?.getOrNull(2)?.trim()?.takeIf(String::isNotBlank)?.let {
    return it
  }

  TITLE_AFTER_KEYWORD_REGEX.find(prompt)?.groupValues?.getOrNull(1)?.trim()?.trimEnd('.', ',')
    ?.takeIf(String::isNotBlank)?.let {
      return it
    }

  return prompt
    .replace(ISO_DATE_REGEX, "")
    .replace(MONTH_DAY_REGEX, "")
    .replace(WEEKDAY_REGEX, "")
    .replace(DURATION_REGEX, "")
    .replace(TIME_PHRASE_REGEX, "")
    .replace(CALENDAR_COMMAND_REGEX, "")
    .replace(Regex("\\s+"), " ")
    .trim()
    .trim('.', ',', '"', '\'')
}

internal fun parseApplePricingResearchSnapshot(rawJavascriptResult: String?): ApplePricingResearchSnapshot? {
  val payload = unwrapJavascriptResult(rawJavascriptResult).takeIf(String::isNotBlank) ?: return null
  val json = runCatching { JsonParser.parseString(payload).asJsonObject }.getOrNull() ?: return null
  val optionsJson = json.getAsJsonArray("options")
  val options =
    buildList {
      if (optionsJson != null) {
        for (item in optionsJson) {
          val optionObject = item.asJsonObject
          add(
            ApplePricingResearchOption(
              groupKey = optionObject.get("groupKey")?.asString.orEmpty(),
              label = optionObject.get("label")?.asString.orEmpty(),
            ),
          )
        }
      }
    }.filter { it.groupKey.isNotBlank() && it.label.isNotBlank() }
  val pageUrl = json.get("pageUrl")?.asString.orEmpty()
  if (pageUrl.isBlank()) {
    return null
  }
  return ApplePricingResearchSnapshot(
    pageTitle = json.get("pageTitle")?.asString.orEmpty(),
    pageUrl = pageUrl,
    schemaHighPrice = json.get("schemaHighPrice").positiveDoubleOrNull(),
    highestBasePrice = json.get("highestBasePrice").positiveDoubleOrNull(),
    highestBasePriceKey = json.get("highestBasePriceKey")?.asString.orEmpty(),
    options = options,
  )
}

private fun JsonElement?.positiveDoubleOrNull(): Double? {
  val element = this ?: return null
  if (element.isJsonNull || !element.isJsonPrimitive || !element.asJsonPrimitive.isNumber) {
    return null
  }
  return element.asDouble.takeIf { it > 0.0 }
}

private fun unwrapJavascriptResult(rawJavascriptResult: String?): String {
  if (rawJavascriptResult.isNullOrBlank() || rawJavascriptResult == "null") {
    return ""
  }
  val parsed = runCatching { JsonParser.parseString(rawJavascriptResult) }.getOrNull() ?: return rawJavascriptResult
  return when {
    parsed.isJsonNull -> ""
    parsed.isJsonPrimitive && parsed.asJsonPrimitive.isString -> parsed.asString
    else -> parsed.toString()
  }
}

internal fun buildAppOwnedCalendarAccountName(packageName: String): String =
  "${packageName.trim()}.operator.calendar"

internal fun asCalendarSyncAdapterUri(
  uri: Uri,
  accountName: String,
  accountType: String,
): Uri =
  uri
    .buildUpon()
    .appendQueryParameter(CalendarContract.CALLER_IS_SYNCADAPTER, "true")
    .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_NAME, accountName)
    .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_TYPE, accountType)
    .build()

private val ISO_DATE_REGEX = Regex("\\b\\d{4}-\\d{2}-\\d{2}\\b")
private val WEEKDAY_REGEX =
  Regex("\\b(next\\s+)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\\b")
private val MONTH_DAY_REGEX =
  Regex(
    pattern =
      "\\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sep|october|oct|november|nov|december|dec)\\s+(\\d{1,2})(?:,\\s*(\\d{4}))?\\b",
    options = setOf(RegexOption.IGNORE_CASE),
  )
private val DURATION_REGEX =
  Regex("\\bfor\\s+(\\d+)\\s*(minutes?|hours?|hrs?|hr)\\b", RegexOption.IGNORE_CASE)
private val QUOTED_TITLE_REGEX = Regex("([\"'])(.+?)\\1")
private val TITLE_AFTER_KEYWORD_REGEX =
  Regex(
    pattern =
      "\\b(?:for|called|named|titled)\\s+(.+?)(?=\\b(?:at|from|on|today|tomorrow|next|monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sep|october|oct|november|nov|december|dec|\\d{4}-\\d{2}-\\d{2})\\b|$)",
    options = setOf(RegexOption.IGNORE_CASE),
  )
private val TIME_PHRASE_REGEX =
  Regex(
    pattern =
      "\\b(?:from|at|to|until|ending at|ends at)\\s+\\d{1,2}(?::\\d{2})?\\s*(?:a\\.m\\.|p\\.m\\.|am|pm)?\\b",
    options = setOf(RegexOption.IGNORE_CASE),
  )
private val CALENDAR_COMMAND_REGEX =
  Regex(
    pattern =
      "\\b(?:schedule|create|add|save|calendar|event|invite|meeting|appointment)\\b",
    options = setOf(RegexOption.IGNORE_CASE),
  )

private val AM_PM_TIME_FORMATTERS =
  listOf(
    DateTimeFormatterBuilder().parseCaseInsensitive().appendPattern("h:mma").toFormatter(Locale.US),
    DateTimeFormatterBuilder().parseCaseInsensitive().appendPattern("ha").toFormatter(Locale.US),
    DateTimeFormatterBuilder().parseCaseInsensitive().appendPattern("HH:mm").toFormatter(Locale.US),
  )

private val MONTHS =
  mapOf(
    "jan" to 1,
    "january" to 1,
    "feb" to 2,
    "february" to 2,
    "mar" to 3,
    "march" to 3,
    "apr" to 4,
    "april" to 4,
    "may" to 5,
    "jun" to 6,
    "june" to 6,
    "jul" to 7,
    "july" to 7,
    "aug" to 8,
    "august" to 8,
    "sep" to 9,
    "september" to 9,
    "oct" to 10,
    "october" to 10,
    "nov" to 11,
    "november" to 11,
    "dec" to 12,
    "december" to 12,
  )

private val WEEKDAYS =
  mapOf(
    "monday" to DayOfWeek.MONDAY,
    "tuesday" to DayOfWeek.TUESDAY,
    "wednesday" to DayOfWeek.WEDNESDAY,
    "thursday" to DayOfWeek.THURSDAY,
    "friday" to DayOfWeek.FRIDAY,
    "saturday" to DayOfWeek.SATURDAY,
    "sunday" to DayOfWeek.SUNDAY,
  )

private val APPLE_BUY_PAGE_EXTRACTION_SCRIPT =
  """
  (() => {
    const parseJsonSafe = (value) => {
      try {
        return JSON.parse(value);
      } catch (error) {
        return null;
      }
    };
    const bootstrapRoot = window.PRODUCT_SELECTION_BOOTSTRAP || null;
    const productSelectionData = bootstrapRoot && bootstrapRoot.productSelectionData ? bootstrapRoot.productSelectionData : bootstrapRoot;
    if (!productSelectionData) {
      return null;
    }

    const priceEntries = Object.entries(productSelectionData.mainDisplayValues?.prices || {})
      .map(([key, value]) => ({
        key,
        amount: Number(value?.currentPrice?.raw_amount || value?.raw_amount || 0),
      }))
      .filter((entry) => Number.isFinite(entry.amount) && entry.amount > 0)
      .sort((left, right) => left.amount - right.amount);
    const highestBase = priceEntries.length > 0 ? priceEntries[priceEntries.length - 1] : null;

    const optionGroups = Object.entries(productSelectionData.configDisplayValues || {})
      .map(([groupKey, value]) => {
        const variantOrder = Array.isArray(value?.variantOrder) ? value.variantOrder : [];
        if (variantOrder.length === 0) {
          return null;
        }
        const maxVariantKey = variantOrder[variantOrder.length - 1];
        const candidate = value?.variants?.[maxVariantKey] || value?.displayValues?.[maxVariantKey] || value?.values?.[maxVariantKey] || null;
        const label = candidate?.label || candidate?.displayValue || candidate?.title || String(maxVariantKey);
        return {
          groupKey,
          label: String(label),
        };
      })
      .filter(Boolean);

    let schemaHighPrice = null;
    for (const scriptNode of Array.from(document.querySelectorAll('script[type="application/ld+json"]'))) {
      const parsed = parseJsonSafe(scriptNode.textContent || '');
      if (!parsed) {
        continue;
      }
      const stack = Array.isArray(parsed) ? parsed.slice() : (Array.isArray(parsed['@graph']) ? parsed['@graph'].slice() : [parsed]);
      while (stack.length > 0) {
        const current = stack.shift();
        if (!current || typeof current !== 'object') {
          continue;
        }
        if (current.offers?.highPrice) {
          schemaHighPrice = Number(current.offers.highPrice);
        }
        if (Array.isArray(current['@graph'])) {
          stack.push(...current['@graph']);
        }
      }
    }

    return JSON.stringify({
      pageTitle: document.title || '',
      pageUrl: window.location.href || '',
      schemaHighPrice,
      highestBasePrice: highestBase ? highestBase.amount : null,
      highestBasePriceKey: highestBase ? highestBase.key : '',
      options: optionGroups,
    });
  })();
  """.trimIndent()

@Module
@InstallIn(SingletonComponent::class)
internal abstract class OperatorNativeIntentExecutorModule {
  @Binds
  abstract fun bindOperatorNativeIntentExecutor(
    implementation: AndroidOperatorNativeIntentExecutor,
  ): OperatorNativeIntentExecutor
}

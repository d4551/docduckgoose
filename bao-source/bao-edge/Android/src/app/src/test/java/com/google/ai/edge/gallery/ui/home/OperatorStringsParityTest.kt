package com.google.ai.edge.gallery.ui.home

import java.io.File
import org.junit.Assert.assertTrue
import org.junit.Test

class OperatorStringsParityTest {
  private val requiredKeys =
    setOf(
      "operator_message_placeholder_image",
      "operator_message_placeholder_audio",
      "operator_message_placeholder_automation",
      "operator_setup_ready_compact",
      "operator_automation_save_flow",
      "operator_automation_open_workspace",
      "operator_automation_section_drafts",
      "operator_automation_section_runs",
      "operator_automation_section_schedules",
      "operator_automation_section_approvals",
      "operator_automation_drafts_title",
      "operator_automation_drafts_empty",
      "operator_automation_schedules_title",
      "operator_automation_schedules_empty",
      "operator_automation_schedule_daily",
      "operator_automation_schedule_weekly",
      "operator_automation_schedule_pause",
      "operator_automation_schedule_resume",
      "settings_dictation_language",
      "settings_dictation_language_hint",
      "settings_dictation_language_unavailable",
    )

  @Test
  fun localizedOperatorAndSpeechStrings_existInAllSupportedLocales() {
    val localeDirectories = listOf("values-es", "values-fr", "values-zh-rCN")
    val baseDirectory = File("src/main/res")

    localeDirectories.forEach { localeDirectory ->
      val localizedKeys =
        extractStringKeys(File(baseDirectory, "$localeDirectory/strings.xml"))
      requiredKeys.forEach { key ->
        assertTrue("Missing $key in $localeDirectory", localizedKeys.contains(key))
      }
    }
  }

  private fun extractStringKeys(file: File): Set<String> {
    val content = file.readText()
    return Regex("""<string name="([^"]+)"""")
      .findAll(content)
      .map { match -> match.groupValues[1] }
      .toSet()
  }
}

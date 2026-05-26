package com.google.ai.edge.gallery.ui.home

import java.io.File
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class OperatorLocaleConfigTest {
  @Test
  fun manifestReferencesLocaleConfig_andShippedLocalesMatchSupportedSet() {
    val manifest =
      File("src/main/AndroidManifest.xml").readText()
    val localeConfig =
      File("src/main/res/xml/locale_config.xml").readText()

    assertTrue(
      "Manifest must reference locale_config.xml",
      manifest.contains("""android:localeConfig="@xml/locale_config""""),
    )

    val locales =
      Regex("""android:name="([^"]+)"""")
        .findAll(localeConfig)
        .map { match -> match.groupValues[1] }
        .toList()

    assertEquals(listOf("en", "es", "fr", "zh-CN"), locales)
  }
}

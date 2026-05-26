package com.google.ai.edge.gallery.common

import android.app.LocaleManager
import android.content.Context
import android.os.Build
import android.os.LocaleList
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.os.LocaleListCompat
import java.util.Locale

/** Sentinel tag that defers locale resolution back to the system language. */
internal const val APP_LOCALE_SYSTEM = "system"

/** Normalize arbitrary locale input to a canonical persisted tag. */
internal fun normalizeAppLocaleTag(rawTag: String?): String {
  val normalized =
    rawTag
      ?.trim()
      ?.replace('_', '-')
      .orEmpty()
  if (normalized.isEmpty() || normalized.equals(APP_LOCALE_SYSTEM, ignoreCase = true)) {
    return APP_LOCALE_SYSTEM
  }
  val resolvedLocale = Locale.forLanguageTag(normalized)
  return if (resolvedLocale.language.isBlank() || resolvedLocale.language == "und") {
    APP_LOCALE_SYSTEM
  } else {
    resolvedLocale.toLanguageTag()
  }
}

/** Apply the persisted locale contract to the process-wide app configuration. */
internal fun applyAppLocale(context: Context, appLocaleTag: String) {
  val normalized = normalizeAppLocaleTag(appLocaleTag)
  val localeList =
    if (normalized == APP_LOCALE_SYSTEM) {
      LocaleListCompat.getEmptyLocaleList()
    } else {
      LocaleListCompat.forLanguageTags(normalized)
    }
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
    val frameworkLocales =
      if (normalized == APP_LOCALE_SYSTEM) {
        LocaleList.getEmptyLocaleList()
      } else {
        LocaleList.forLanguageTags(normalized)
      }
    context.getSystemService(LocaleManager::class.java)?.applicationLocales = frameworkLocales
  }
  AppCompatDelegate.setApplicationLocales(localeList)
}

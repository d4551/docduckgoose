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

package com.google.ai.edge.gallery.ui.theme

import androidx.compose.ui.text.font.Font
import androidx.compose.material3.Typography
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.google.ai.edge.gallery.R

/** Body font — Syne per shared/brand-tokens.json typography.codebase.body */
val baoEdgeBodyFontFamily =
  FontFamily(
    Font(R.font.syne_variable, FontWeight.Normal),
    Font(R.font.syne_variable, FontWeight.Medium),
    Font(R.font.syne_variable, FontWeight.SemiBold),
    Font(R.font.syne_variable, FontWeight.Bold),
  )

/** Display font — Instrument Serif per brand-tokens.json typography.codebase.display */
val baoEdgeDisplayFontFamily = FontFamily(
  Font(R.font.instrument_serif_regular, FontWeight.Normal),
  Font(R.font.instrument_serif_italic, FontWeight.Normal),
)

/** Code font — IBM Plex Mono per brand-tokens.json typography.codebase.code */
val baoEdgeCodeFontFamily =
  FontFamily(
    Font(R.font.ibm_plex_mono_regular, FontWeight.Normal),
    Font(R.font.ibm_plex_mono_medium, FontWeight.Medium),
    Font(R.font.ibm_plex_mono_semibold, FontWeight.SemiBold),
  )

/** @deprecated Use baoEdgeBodyFontFamily */
val appFontFamily = baoEdgeBodyFontFamily

/** @deprecated Use baoEdgeDisplayFontFamily */
val serifDisplayFontFamily = baoEdgeDisplayFontFamily

val baseline = Typography()

/** Brand typography — display: Instrument Serif, body: Syne, code: IBM Plex Mono (brand-tokens.json) */
val AppTypography =
  Typography(
    displayLarge = baseline.displayLarge.copy(fontFamily = baoEdgeDisplayFontFamily, letterSpacing = (-0.5).sp),
    displayMedium = baseline.displayMedium.copy(fontFamily = baoEdgeDisplayFontFamily, letterSpacing = (-0.25).sp),
    displaySmall = baseline.displaySmall.copy(fontFamily = baoEdgeBodyFontFamily),
    headlineLarge = baseline.headlineLarge.copy(fontFamily = baoEdgeBodyFontFamily),
    headlineMedium = baseline.headlineMedium.copy(fontFamily = baoEdgeBodyFontFamily),
    headlineSmall = baseline.headlineSmall.copy(fontFamily = baoEdgeBodyFontFamily),
    titleLarge = baseline.titleLarge.copy(fontFamily = baoEdgeBodyFontFamily),
    titleMedium = baseline.titleMedium.copy(fontFamily = baoEdgeBodyFontFamily),
    titleSmall = baseline.titleSmall.copy(fontFamily = baoEdgeBodyFontFamily),
    bodyLarge = baseline.bodyLarge.copy(fontFamily = baoEdgeBodyFontFamily),
    bodyMedium = baseline.bodyMedium.copy(fontFamily = baoEdgeBodyFontFamily),
    bodySmall = baseline.bodySmall.copy(fontFamily = baoEdgeBodyFontFamily),
    labelLarge = baseline.labelLarge.copy(fontFamily = baoEdgeBodyFontFamily),
    labelMedium = baseline.labelMedium.copy(fontFamily = baoEdgeBodyFontFamily),
    labelSmall = baseline.labelSmall.copy(fontFamily = baoEdgeBodyFontFamily),
  )

val titleMediumNarrow =
  baseline.titleMedium.copy(fontFamily = baoEdgeBodyFontFamily, letterSpacing = 0.0.sp)

val titleSmaller =
  baseline.titleSmall.copy(
    fontFamily = baoEdgeBodyFontFamily,
    fontSize = 12.sp,
    fontWeight = FontWeight.Bold,
  )

val labelSmallNarrow = baseline.labelSmall.copy(fontFamily = baoEdgeBodyFontFamily, letterSpacing = 0.0.sp)

val labelSmallNarrowMedium =
  baseline.labelSmall.copy(
    fontFamily = baoEdgeBodyFontFamily,
    fontWeight = FontWeight.Medium,
    letterSpacing = 0.0.sp,
  )

val bodySmallNarrow = baseline.bodySmall.copy(fontFamily = baoEdgeBodyFontFamily, letterSpacing = 0.0.sp)

val bodySmallMediumNarrow =
  baseline.bodySmall.copy(fontFamily = baoEdgeBodyFontFamily, letterSpacing = 0.0.sp, fontSize = 14.sp)

val bodySmallMediumNarrowBold =
  baseline.bodySmall.copy(
    fontFamily = baoEdgeBodyFontFamily,
    letterSpacing = 0.0.sp,
    fontSize = 14.sp,
    fontWeight = FontWeight.Bold,
  )

val homePageTitleStyle =
  baseline.displayMedium.copy(
    fontFamily = baoEdgeBodyFontFamily,
    fontSize = 48.sp,
    lineHeight = 48.sp,
    letterSpacing = -1.sp,
    fontWeight = FontWeight.Medium,
  )

val bodyLargeNarrow = baseline.bodyLarge.copy(fontFamily = baoEdgeBodyFontFamily, letterSpacing = 0.2.sp)

val headlineLargeMedium = baseline.headlineLarge.copy(fontFamily = baoEdgeBodyFontFamily, fontWeight = FontWeight.Medium)

/** Monospaced section index label — IBM Plex Mono per brand-tokens. */
val baoEdgeSectionLabel =
  baseline.labelSmall.copy(
    fontFamily = baoEdgeCodeFontFamily,
    fontSize = 11.sp,
    fontWeight = FontWeight.Medium,
    letterSpacing = 3.sp,
  )

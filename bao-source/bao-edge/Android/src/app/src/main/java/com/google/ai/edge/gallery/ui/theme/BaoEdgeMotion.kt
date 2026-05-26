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

import android.provider.Settings
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext

/** Motion tokens aligned with shared/brand-tokens.json animation block. */
object BaoEdgeMotion {
  const val DURATION_FAST_MS: Int = 150
  const val DURATION_MEDIUM_MS: Int = 300
  const val DURATION_SLOW_MS: Int = 500
  const val PULSE_INTERVAL_MS: Int = 4000
}

@Composable
fun rememberBaoEdgeReduceMotion(): Boolean {
  val context = LocalContext.current
  return remember(context) {
    Settings.Global.getFloat(
      context.contentResolver,
      Settings.Global.ANIMATOR_DURATION_SCALE,
      1f,
    ) == 0f
  }
}

@Composable
fun baoEdgeAnimationDurationMs(baseMs: Int): Int {
  return if (rememberBaoEdgeReduceMotion()) 0 else baseMs
}

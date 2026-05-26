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

package com.google.ai.edge.gallery.ui.common

import android.os.Bundle
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.LinkAnnotation
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextLinkStyles
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.withLink
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.firebaseAnalytics
import com.google.ai.edge.gallery.ui.theme.customColors

/** Builds a tracked clickable URL annotation for inline use in localized rich text. */
@Composable
fun buildTrackableUrlAnnotatedString(url: String, linkText: String): AnnotatedString {
  val uriHandler = LocalUriHandler.current
  return buildAnnotatedString {
    withLink(
      link =
        LinkAnnotation.Url(
          url = url,
          styles =
            TextLinkStyles(
              style =
                SpanStyle(
                  color = MaterialTheme.customColors.linkColor,
                  textDecoration = TextDecoration.Underline,
                )
            ),
          linkInteractionListener = {
            uriHandler.openUri(url)
            firebaseAnalytics?.logEvent(
              "resource_link_click",
              Bundle().apply { putString("link_destination", url) },
            )
          },
        )
    ) {
      append(linkText)
    }
  }
}

/**
 * Builds localized text with optional bold spans and an optional tracked inline link.
 *
 * The caller provides the final localized sentence so translated word order remains the source of
 * truth, and this helper only decorates the matching substrings.
 */
@Composable
fun buildLocalizedAnnotatedText(
  text: String,
  emphasizedTexts: List<String> = emptyList(),
  trackedLinkText: String? = null,
  trackedLinkUrl: String? = null,
): AnnotatedString {
  val trackedLink =
    if (!trackedLinkText.isNullOrBlank() && !trackedLinkUrl.isNullOrBlank()) {
      buildTrackableUrlAnnotatedString(url = trackedLinkUrl, linkText = trackedLinkText)
    } else {
      null
    }
  val fragments =
    buildList {
      for (value in emphasizedTexts) {
        if (value.isNotBlank()) {
          add(LocalizedTextFragment(text = value, style = LocalizedTextStyle.EMPHASIS))
        }
      }
      if (!trackedLinkText.isNullOrBlank()) {
        add(LocalizedTextFragment(text = trackedLinkText, style = LocalizedTextStyle.LINK))
      }
    }

  return buildAnnotatedString {
    var cursor = 0
    while (cursor < text.length) {
      val nextFragment =
        fragments
          .mapNotNull { fragment ->
            val index = text.indexOf(fragment.text, startIndex = cursor)
            if (index >= 0) {
              index to fragment
            } else {
              null
            }
          }
          .minByOrNull { it.first }
      if (nextFragment == null) {
        append(text.substring(cursor))
        break
      }

      val (index, fragment) = nextFragment
      if (index > cursor) {
        append(text.substring(cursor, index))
      }
      when (fragment.style) {
        LocalizedTextStyle.EMPHASIS ->
          withStyle(SpanStyle(fontWeight = FontWeight.Bold)) { append(fragment.text) }
        LocalizedTextStyle.LINK -> append(trackedLink ?: AnnotatedString(fragment.text))
      }
      cursor = index + fragment.text.length
    }
  }
}

/** Displays a tracked clickable link using the shared inline link styling. */
@Composable
fun ClickableLink(
  url: String,
  linkText: String,
  modifier: Modifier = Modifier,
  icon: ImageVector? = null,
) {
  val annotatedText = buildTrackableUrlAnnotatedString(url, linkText)

  Row(
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.Center,
    modifier = modifier,
  ) {
    if (icon != null) {
      Icon(icon, contentDescription = stringResource(R.string.cd_link), modifier = Modifier.size(16.dp))
    }
    Text(
      text = annotatedText,
      textAlign = TextAlign.Center,
      style = MaterialTheme.typography.bodyMedium,
      modifier = Modifier.padding(start = 6.dp),
    )
  }
}

private data class LocalizedTextFragment(
  val text: String,
  val style: LocalizedTextStyle,
)

private enum class LocalizedTextStyle {
  EMPHASIS,
  LINK,
}

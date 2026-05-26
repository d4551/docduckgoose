package com.google.ai.edge.gallery.ui.home

import org.junit.Assert.assertEquals
import org.junit.Test

class BaoEdgeOperatorComponentsTest {
  @Test
  fun shouldRenderOperatorTimelineBodyAsMarkdown_disablesMarkdownForUserEntries() {
    assertEquals(false, shouldRenderOperatorTimelineBodyAsMarkdown(OperatorTimelineRole.USER))
  }

  @Test
  fun shouldRenderOperatorTimelineBodyAsMarkdown_enablesMarkdownForAssistantEntries() {
    assertEquals(true, shouldRenderOperatorTimelineBodyAsMarkdown(OperatorTimelineRole.ASSISTANT))
  }

  @Test
  fun filterBaoEdgeChoiceOptions_returnsAllOptionsUntilSearchIsEdited() {
    val options =
      listOf(
        BaoEdgeChoiceOption(value = "system", label = "System"),
        BaoEdgeChoiceOption(value = "en", label = "English"),
        BaoEdgeChoiceOption(value = "es", label = "Spanish"),
      )

    val filtered =
      filterBaoEdgeChoiceOptions(
        options = options,
        query = "System",
        hasEditedQuery = false,
      )

    assertEquals(options, filtered)
  }

  @Test
  fun filterBaoEdgeChoiceOptions_filtersOnceSearchQueryIsEdited() {
    val options =
      listOf(
        BaoEdgeChoiceOption(value = "system", label = "System"),
        BaoEdgeChoiceOption(value = "en", label = "English"),
        BaoEdgeChoiceOption(value = "es", label = "Spanish"),
      )

    val filtered =
      filterBaoEdgeChoiceOptions(
        options = options,
        query = "spa",
        hasEditedQuery = true,
      )

    assertEquals(listOf(BaoEdgeChoiceOption(value = "es", label = "Spanish")), filtered)
  }
}

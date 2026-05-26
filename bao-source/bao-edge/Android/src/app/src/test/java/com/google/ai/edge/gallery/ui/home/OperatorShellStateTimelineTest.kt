package com.google.ai.edge.gallery.ui.home

import com.google.ai.edge.gallery.data.CloudOperatorConversationOrchestration
import com.google.gson.Gson
import org.junit.Assert.assertTrue
import org.junit.Test

class OperatorShellStateTimelineTest {
  private val gson = Gson()

  @Test
  fun buildOperatorTimeline_toleratesNullCollectionsFromJson() {
    val orchestration =
      gson.fromJson(
        """
        {
          "id": "conv_nulls",
          "title": "Null lists",
          "messages": null,
          "executionEvents": null,
          "approvalRequests": null,
          "artifacts": null
        }
        """.trimIndent(),
        CloudOperatorConversationOrchestration::class.java,
      )

    val timeline =
      buildOperatorTimeline(
        orchestration = orchestration,
        untitledConversationLabel = "Untitled",
        userTitle = "User",
        assistantTitle = "Assistant",
        runtimeTitle = "Runtime",
        approvalTitle = "Approval",
      )

    assertTrue(timeline.isEmpty())
  }
}

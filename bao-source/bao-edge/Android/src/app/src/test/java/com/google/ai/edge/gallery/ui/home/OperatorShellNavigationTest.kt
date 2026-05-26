package com.google.ai.edge.gallery.ui.home

import com.google.ai.edge.gallery.data.BuiltInTaskId
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class OperatorShellNavigationTest {
  @Test
  fun legacyTaskIds_redirectIntoConvergedOperatorShellModes() {
    assertEquals(
      OperatorShellEntryRequest(
        destination = OperatorShellDestination.CHAT,
        composerMode = OperatorComposerMode.CHAT,
      ),
      legacyTaskIdToOperatorEntryRequest(BuiltInTaskId.LLM_CHAT),
    )
    assertEquals(
      OperatorShellEntryRequest(
        destination = OperatorShellDestination.CHAT,
        composerMode = OperatorComposerMode.IMAGE,
      ),
      legacyTaskIdToOperatorEntryRequest(BuiltInTaskId.LLM_ASK_IMAGE),
    )
    assertEquals(
      OperatorShellEntryRequest(
        destination = OperatorShellDestination.CHAT,
        composerMode = OperatorComposerMode.AUDIO,
      ),
      legacyTaskIdToOperatorEntryRequest(BuiltInTaskId.LLM_ASK_AUDIO),
    )
  }

  @Test
  fun nonLegacyTaskId_doesNotRedirect() {
    assertNull(legacyTaskIdToOperatorEntryRequest(BuiltInTaskId.LLM_MOBILE_ACTIONS))
    assertNull(legacyTaskIdToOperatorEntryRequest("custom_task"))
  }
}

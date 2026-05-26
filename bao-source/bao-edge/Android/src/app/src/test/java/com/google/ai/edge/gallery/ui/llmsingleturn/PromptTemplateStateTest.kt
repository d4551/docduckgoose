package com.google.ai.edge.gallery.ui.llmsingleturn

import com.google.ai.edge.gallery.data.Model
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class PromptTemplateStateTest {
  @Test
  fun updateResponse_keysResponsesByTemplateId() {
    val viewModel = LlmSingleTurnViewModel()
    val model = Model(name = "prompt-lab-test-model")

    viewModel.updateResponse(
      model = model,
      promptTemplateType = PromptTemplateType.CODE_SNIPPET,
      response = "ok",
    )

    val responses = viewModel.uiState.value.responsesByModel[model.name].orEmpty()
    assertEquals("ok", responses[PromptTemplateType.CODE_SNIPPET.id])
    assertTrue(PromptTemplateType.CODE_SNIPPET.label !in responses.keys)
  }

  @Test
  fun genFullPrompt_usesStableEditorIdsForPromptValues() {
    val prompt =
      PromptTemplateType.REWRITE_TONE.genFullPrompt(
        "Please review this note.",
        mapOf(InputEditorLabel.TONE.id to RewriteToneType.CASUAL.id),
      )

    assertEquals(
      "Rewrite the following text using a casual tone: Please review this note.",
      prompt.text,
    )
  }
}

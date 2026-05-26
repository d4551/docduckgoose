package com.baohaus.baoedge.core

import com.baohaus.baoedge.core.model.ModelManifestEntryV1
import com.baohaus.baoedge.core.model.ModelSource
import kotlin.test.Test
import kotlin.test.assertEquals

class ModelManifestV1Test {
  @Test
  fun sourceDefaultsToHuggingFace() {
    val entry =
      ModelManifestEntryV1(
        name = "Gemma 3",
        modelId = "google/gemma-3",
        modelFile = "gemma3.task",
        description = "Test",
        sizeInBytes = 1,
        estimatedPeakMemoryInBytes = 2,
        taskTypes = listOf("llm_chat"),
      )

    assertEquals(ModelSource.HUGGINGFACE, entry.source)
  }
}

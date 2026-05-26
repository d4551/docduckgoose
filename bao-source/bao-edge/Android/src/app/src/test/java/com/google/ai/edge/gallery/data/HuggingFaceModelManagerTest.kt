package com.google.ai.edge.gallery.data

import java.io.File
import java.nio.file.Files
import java.security.MessageDigest
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class HuggingFaceModelManagerTest {
  @Test
  fun downloadModel_reusesExistingVerifiedArtifactWithoutNetworkDownload() {
    val rootDirectory = Files.createTempDirectory("hf-model-manager-").toFile()
    val destinationDirectory = File(rootDirectory, "models").apply { mkdirs() }
    val destinationFile = File(destinationDirectory, "AutoGLM.gguf")
    val artifactBytes = "device-ai-model".encodeToByteArray()
    destinationFile.writeBytes(artifactBytes)
    val partialFile = File("${destinationFile.absolutePath}.part").apply {
      writeBytes("stale-partial".encodeToByteArray())
    }
    val model =
      Model(
        name = "AutoGLM-Phone-9B-Multilingual",
        url = "https://huggingface.co/example/model/resolve/main/AutoGLM.gguf",
        sizeInBytes = artifactBytes.size.toLong(),
        downloadFileName = "AutoGLM.gguf",
        version = "rev-123",
        sha256 = sha256Hex(artifactBytes),
      )
    val manager = HuggingFaceModelManager()

    val result =
      runBlocking {
        manager.downloadModel(
          model = model,
          destination = destinationFile,
        )
      }

    assertTrue(result is ModelDownloadResult.Success)
    val success = result as ModelDownloadResult.Success
    assertEquals(destinationFile.absolutePath, success.file.absolutePath)
    assertEquals(artifactBytes.size.toLong(), success.file.length())
    assertFalse(partialFile.exists())
  }

  private fun sha256Hex(bytes: ByteArray): String {
    val digest = MessageDigest.getInstance("SHA-256")
    digest.update(bytes)
    return digest.digest().joinToString(separator = "") { "%02x".format(it) }
  }
}

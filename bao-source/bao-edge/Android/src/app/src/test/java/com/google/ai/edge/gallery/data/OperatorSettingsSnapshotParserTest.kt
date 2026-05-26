package com.google.ai.edge.gallery.data

import com.google.gson.Gson
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Test

class OperatorSettingsSnapshotParserTest {
  private val gson = Gson()

  @Test
  fun gson_parsesFullOperatorSettingsSnapshot() {
    val snapshot =
      gson.fromJson(
        """
        {
          "general": {
            "theme": "night",
            "locale": "fr",
            "appVersion": "1.2.3"
          },
          "aiSettings": {
            "defaultModel": "gpt-4.1",
            "defaultModelSource": "huggingface",
            "defaultModelSourceLabel": "Hugging Face",
            "ttsVoice": "alloy",
            "ttsOutputFormat": "mp3",
            "sttLanguage": "fr-FR",
            "ttsProvider": "openai",
            "modeAssignments": {
              "chat": {
                "provider": "openai",
                "model": "gpt-4.1"
              },
              "automation": {
                "provider": "anthropic",
                "model": "claude-sonnet-4"
              }
            },
            "providers": [
              {
                "id": "openai",
                "displayName": "OpenAI",
                "source": "cloud",
                "requiresKey": true,
                "hasBaseUrlConfig": true,
                "configured": true,
                "credentialState": "configured",
                "maskedKey": "sk-****",
                "baseUrl": "https://api.openai.com",
                "docsUrl": "https://platform.openai.com/docs",
                "defaultModels": ["gpt-4.1"],
                "updatedAt": "2026-03-09T09:00:00.000Z"
              }
            ]
          }
        }
        """.trimIndent(),
        CloudOperatorSettingsSnapshot::class.java,
      )

    assertEquals("night", snapshot.general.theme)
    assertEquals("fr", snapshot.general.locale)
    assertEquals("1.2.3", snapshot.general.appVersion)
    assertEquals("gpt-4.1", snapshot.aiSettings.defaultModel)
    assertEquals("huggingface", snapshot.aiSettings.defaultModelSource)
    assertEquals("Hugging Face", snapshot.aiSettings.defaultModelSourceLabel)
    assertEquals("alloy", snapshot.aiSettings.ttsVoice)
    assertEquals("mp3", snapshot.aiSettings.ttsOutputFormat)
    assertEquals("fr-FR", snapshot.aiSettings.sttLanguage)
    assertEquals("openai", snapshot.aiSettings.ttsProvider)
    assertEquals("openai", snapshot.aiSettings.modeAssignments["chat"]?.provider)
    assertEquals("claude-sonnet-4", snapshot.aiSettings.modeAssignments["automation"]?.model)
    assertEquals(1, snapshot.aiSettings.providers.size)
    assertEquals("openai", snapshot.aiSettings.providers.first().id)
    assertNotNull(snapshot.aiSettings.providers.first().updatedAt)
  }
}

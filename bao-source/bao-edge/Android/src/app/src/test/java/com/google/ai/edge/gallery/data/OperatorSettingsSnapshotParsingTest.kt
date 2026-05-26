package com.google.ai.edge.gallery.data

import com.google.gson.Gson
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test

class OperatorSettingsSnapshotParsingTest {
  private val gson = Gson()

  @Test
  fun parseOperatorSettingsSnapshot_readsGeneralDefaultsAndModeAssignments() {
    val payload =
      """
      {
        "general": {
          "theme": "dark",
          "locale": "fr-FR",
          "appVersion": "1.2.3"
        },
        "aiSettings": {
          "defaultModel": "gpt-4.1",
          "defaultModelSource": "huggingface",
          "defaultModelSourceLabel": "Hugging Face",
          "ttsVoice": "alloy",
          "ttsOutputFormat": "mp3",
          "sttLanguage": "es-ES",
          "ttsProvider": "openai",
          "modeAssignments": {
            "chat": {
              "provider": "openai",
              "model": "gpt-4.1"
            },
            "image": {
              "provider": "openai",
              "model": "gpt-image-1"
            },
            "agent": null
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
              "maskedKey": "sk-••••",
              "baseUrl": "https://api.openai.com/v1",
              "docsUrl": "https://platform.openai.com/docs",
              "defaultModels": ["gpt-4.1", "gpt-image-1"],
              "updatedAt": "2026-03-09T08:00:00.000Z"
            }
          ]
        }
      }
      """.trimIndent()

    val snapshot = gson.fromJson(payload, CloudOperatorSettingsSnapshot::class.java)

    assertEquals("dark", snapshot.general.theme)
    assertEquals("fr-FR", snapshot.general.locale)
    assertEquals("1.2.3", snapshot.general.appVersion)
    assertEquals("gpt-4.1", snapshot.aiSettings.defaultModel)
    assertEquals("huggingface", snapshot.aiSettings.defaultModelSource)
    assertEquals("Hugging Face", snapshot.aiSettings.defaultModelSourceLabel)
    assertEquals("alloy", snapshot.aiSettings.ttsVoice)
    assertEquals("mp3", snapshot.aiSettings.ttsOutputFormat)
    assertEquals("es-ES", snapshot.aiSettings.sttLanguage)
    assertEquals("openai", snapshot.aiSettings.ttsProvider)
    assertEquals("openai", snapshot.aiSettings.modeAssignments["chat"]?.provider)
    assertEquals("gpt-image-1", snapshot.aiSettings.modeAssignments["image"]?.model)
    assertTrue(snapshot.aiSettings.modeAssignments.containsKey("agent"))
    assertEquals(1, snapshot.aiSettings.providers.size)
    assertEquals("openai", snapshot.aiSettings.providers.first().id)
  }

  @Test
  fun parseOperatorConversation_readsApprovalsAndArtifacts() {
    val payload =
      """
      {
        "id": "conv_123",
        "title": "Trip planning",
        "activeRuntime": {
          "source": "cloud",
          "provider": "openai",
          "model": "gpt-4.1",
          "voiceInput": true,
          "voiceOutput": false,
          "automation": true
        },
        "messages": [
          {
            "id": "msg_1",
            "role": "user",
            "content": "Plan a trip",
            "timestamp": "2026-03-09T08:00:00.000Z"
          }
        ],
        "executionEvents": [
          {
            "id": "event_1",
            "runId": "run_1",
            "state": "running",
            "summary": "Searching flights",
            "timestamp": "2026-03-09T08:00:01.000Z"
          }
        ],
        "approvalRequests": [
          {
            "id": "approval_1",
            "runId": "run_1",
            "summary": "Approve purchase",
            "requestedAt": "2026-03-09T08:00:02.000Z"
          }
        ],
        "artifacts": [
          {
            "id": "artifact_1",
            "runId": "run_1",
            "mimeType": "image/png",
            "summary": "Generated itinerary card"
          }
        ]
      }
      """.trimIndent()

    val orchestration = gson.fromJson(payload, CloudOperatorConversationOrchestration::class.java)

    assertEquals("conv_123", orchestration.id)
    assertEquals(1, orchestration.approvalRequests.size)
    assertEquals("Approve purchase", orchestration.approvalRequests.first().summary)
    assertEquals(1, orchestration.artifacts.size)
    assertEquals("image/png", orchestration.artifacts.first().mimeType)
    assertNotNull(orchestration.activeRuntime)
  }
}

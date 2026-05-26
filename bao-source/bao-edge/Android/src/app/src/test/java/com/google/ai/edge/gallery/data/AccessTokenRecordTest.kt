package com.google.ai.edge.gallery.data

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Test

class AccessTokenRecordTest {
  private val json = Json {
    encodeDefaults = true
    ignoreUnknownKeys = false
  }

  @Test
  fun accessTokenRecord_roundTripsThroughJsonWithoutProtoFallback() {
    val record =
      AccessTokenRecord(
        accessToken = "hf-access-token",
        refreshToken = "hf-refresh-token",
        expiresAtMs = 1_746_000_000_000,
      )

    val decoded = json.decodeFromString(
      AccessTokenRecord.serializer(),
      json.encodeToString(AccessTokenRecord.serializer(), record),
    )

    assertEquals(record, decoded)
  }
}

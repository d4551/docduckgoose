package com.google.ai.edge.gallery.ui.home

import java.time.ZoneId
import java.time.ZonedDateTime
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class OperatorNativeIntentExecutorTest {
  @Test
  fun looksLikeCalendarRequest_matchesCalendarInvitePrompts() {
    assertTrue(
      looksLikeCalendarRequest(
        "Schedule a calendar invite tomorrow at 3 PM for \"Team sync\"",
      ),
    )
    assertFalse(looksLikeCalendarRequest("Research MacBook Pro prices"))
  }

  @Test
  fun looksLikeApplePricingResearch_matchesPricingPrompts() {
    assertTrue(looksLikeApplePricingResearch("Research new MacBook M5 16 Pro prices"))
    assertFalse(looksLikeApplePricingResearch("Create a calendar event tomorrow at 3 PM"))
  }

  @Test
  fun parseCalendarEventDraft_extractsRelativeDateTimeAndDuration() {
    val now = ZonedDateTime.of(2026, 3, 10, 9, 0, 0, 0, ZoneId.of("Asia/Hong_Kong"))

    val draft =
      parseCalendarEventDraft(
        prompt = "Create a calendar event tomorrow at 3:30 PM for 90 minutes for \"Team sync\"",
        now = now,
      )

    assertNotNull(draft)
    assertEquals("Team sync", draft?.title)
    assertEquals(2026, draft?.startAt?.year)
    assertEquals(3, draft?.startAt?.monthValue)
    assertEquals(11, draft?.startAt?.dayOfMonth)
    assertEquals(15, draft?.startAt?.hour)
    assertEquals(30, draft?.startAt?.minute)
    assertEquals(17, draft?.endAt?.hour)
    assertEquals(0, draft?.endAt?.minute)
  }

  @Test
  fun parseCalendarEventDraft_returnsNullWithoutDateTime() {
    val now = ZonedDateTime.of(2026, 3, 10, 9, 0, 0, 0, ZoneId.of("Asia/Hong_Kong"))

    val draft =
      parseCalendarEventDraft(
        prompt = "Create a calendar event for \"Team sync\"",
        now = now,
      )

    assertNull(draft)
  }

  @Test
  fun parseApplePricingResearchSnapshot_decodesJavascriptQuotedJson() {
    val snapshot =
      parseApplePricingResearchSnapshot(
        "\"{\\\"pageTitle\\\":\\\"MacBook Pro\\\",\\\"pageUrl\\\":\\\"https://www.apple.com/shop/buy-mac/macbook-pro/16-inch\\\",\\\"schemaHighPrice\\\":7848.98,\\\"highestBasePrice\\\":4049.0,\\\"highestBasePriceKey\\\":\\\"16inch-spaceblack-nano_texture-m5max-18-32\\\",\\\"options\\\":[{\\\"groupKey\\\":\\\"memory-dimensionMemory\\\",\\\"label\\\":\\\"128GB\\\"},{\\\"groupKey\\\":\\\"storage-dimensionCapacity\\\",\\\"label\\\":\\\"8TB\\\"}]}\"",
      )

    assertNotNull(snapshot)
    assertEquals("MacBook Pro", snapshot?.pageTitle)
    assertEquals(7848.98, snapshot?.schemaHighPrice ?: 0.0, 0.001)
    assertEquals(4049.0, snapshot?.highestBasePrice ?: 0.0, 0.001)
    assertEquals(2, snapshot?.options?.size)
    assertEquals("128GB", snapshot?.options?.first()?.label)
  }

  @Test
  fun parseApplePricingResearchSnapshot_treatsJsonNullNumbersAsMissing() {
    val snapshot =
      parseApplePricingResearchSnapshot(
        "\"{\\\"pageTitle\\\":\\\"MacBook Pro\\\",\\\"pageUrl\\\":\\\"https://www.apple.com/shop/buy-mac/macbook-pro/16-inch\\\",\\\"schemaHighPrice\\\":null,\\\"highestBasePrice\\\":null,\\\"highestBasePriceKey\\\":\\\"\\\",\\\"options\\\":[]}\"",
      )

    assertNotNull(snapshot)
    assertNull(snapshot?.schemaHighPrice)
    assertNull(snapshot?.highestBasePrice)
    assertTrue(snapshot?.options?.isEmpty() == true)
  }

  @Test
  fun buildAppOwnedCalendarAccountName_scopesCalendarToPackage() {
    assertEquals(
      "com.baohaus.baoedge.operator.calendar",
      buildAppOwnedCalendarAccountName("com.baohaus.baoedge"),
    )
  }
}

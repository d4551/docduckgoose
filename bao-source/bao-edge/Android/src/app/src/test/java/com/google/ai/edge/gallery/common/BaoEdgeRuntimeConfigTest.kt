package com.google.ai.edge.gallery.common

import org.junit.Assert.assertEquals
import org.junit.Test

class BaoEdgeRuntimeConfigTest {
  @Test
  fun resolveControlPlaneCandidateBaseUrls_expandsLoopbackHostsForEmulatorAliases() {
    val candidates =
      BaoEdgeRuntimeConfig.resolveControlPlaneCandidateBaseUrls(
        baseUrl = "http://127.0.0.1:3310",
        localHostAliases = listOf("10.0.3.2", "10.0.2.2"),
      )

    assertEquals(
      listOf(
        "http://127.0.0.1:3310",
        "http://10.0.3.2:3310",
        "http://10.0.2.2:3310",
      ),
      candidates,
    )
  }

  @Test
  fun resolveControlPlaneCandidateBaseUrls_returnsRemoteHostUnchanged() {
    val candidates =
      BaoEdgeRuntimeConfig.resolveControlPlaneCandidateBaseUrls(
        baseUrl = "https://control.bao-edge.test:3310",
        localHostAliases = listOf("10.0.3.2", "10.0.2.2"),
      )

    assertEquals(listOf("https://control.bao-edge.test:3310"), candidates)
  }

  @Test
  fun resolveControlPlaneCandidateBaseUrls_preservesDirectEmulatorHostOverrides() {
    val candidates =
      BaoEdgeRuntimeConfig.resolveControlPlaneCandidateBaseUrls(
        baseUrl = "http://10.0.3.2:3310",
        localHostAliases = listOf("10.0.3.2", "10.0.2.2"),
      )

    assertEquals(listOf("http://10.0.3.2:3310"), candidates)
  }
}

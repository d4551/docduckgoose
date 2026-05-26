package com.google.ai.edge.gallery.data

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test

class OperatorRuntimeAssignmentsTest {
  @Test
  fun withAssignment_updatesOnlyRequestedUsage() {
    val initialAssignments = OperatorRuntimeAssignments()
    val nextAssignment =
      OperatorRuntimeAssignment(
        provider = "openai",
        model = "gpt-4.1",
        source = "cloud",
      )

    val updatedAssignments =
      initialAssignments.withAssignment(
        usage = OperatorRuntimeUsage.AUTOMATION,
        assignment = nextAssignment,
      )

    assertEquals(nextAssignment, updatedAssignments.assignmentFor(OperatorRuntimeUsage.AUTOMATION))
    assertEquals(initialAssignments.assignmentFor(OperatorRuntimeUsage.CHAT), updatedAssignments.assignmentFor(OperatorRuntimeUsage.CHAT))
    assertNotEquals(initialAssignments, updatedAssignments)
  }
}

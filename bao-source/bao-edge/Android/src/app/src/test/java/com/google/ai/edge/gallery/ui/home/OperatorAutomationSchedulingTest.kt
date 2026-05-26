package com.google.ai.edge.gallery.ui.home

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class OperatorAutomationSchedulingTest {
  @Test
  fun claimDueScheduledAutomation_stagesPendingRunAndAdvancesRecurringTrigger() {
    val nowMs = 1_000_000L
    val snapshot =
      OperatorAutomationWorkspaceSnapshot(
        savedFlows =
          listOf(
            OperatorAutomationFlowSummary(
              id = "flow-1",
              title = "Research pricing",
              goal = "Open Apple and collect the highest MacBook Pro configuration price.",
            ),
          ),
        schedules =
          listOf(
            OperatorAutomationScheduleSummary(
              id = "schedule-1",
              flowId = "flow-1",
              flowTitle = "Research pricing",
              trigger =
                OperatorAutomationTrigger(
                  type = OperatorAutomationTriggerType.DAILY,
                  nextRunAtMs = nowMs - 500L,
                ),
            ),
          ),
      )

    val claimed = claimDueScheduledAutomation(snapshot = snapshot, nowMs = nowMs)

    assertEquals("schedule-1", claimed.claimedScheduleId)
    assertNotNull(claimed.pendingScheduledRun)
    assertEquals("flow-1", claimed.pendingScheduledRun?.flowId)
    assertEquals("Research pricing", claimed.pendingScheduledRun?.flowTitle)
    assertTrue(claimed.snapshot.schedules.single().trigger.nextRunAtMs > nowMs)
  }

  @Test
  fun resolveNextAutomationScheduleDelayMs_returnsNullWhenPendingRunAlreadyExists() {
    val delayMs =
      resolveNextAutomationScheduleDelayMs(
        snapshot =
          OperatorAutomationWorkspaceSnapshot(
            pendingScheduledRun =
              OperatorPendingScheduledRun(
                scheduleId = "schedule-1",
                flowId = "flow-1",
                flowTitle = "Scheduled flow",
                prompt = "Run the scheduled flow.",
              ),
          ),
        nowMs = 1_000L,
      )

    assertNull(delayMs)
  }

  @Test
  fun resolveNextAutomationScheduleDelayMs_usesEarliestActiveSchedule() {
    val nowMs = 5_000L
    val delayMs =
      resolveNextAutomationScheduleDelayMs(
        snapshot =
          OperatorAutomationWorkspaceSnapshot(
            savedFlows =
              listOf(
                OperatorAutomationFlowSummary(id = "flow-1", title = "Earliest", goal = "Do the first task."),
                OperatorAutomationFlowSummary(id = "flow-2", title = "Later", goal = "Do the second task."),
              ),
            schedules =
              listOf(
                OperatorAutomationScheduleSummary(
                  id = "schedule-2",
                  flowId = "flow-2",
                  flowTitle = "Later",
                  trigger = OperatorAutomationTrigger(nextRunAtMs = nowMs + 9_000L),
                ),
                OperatorAutomationScheduleSummary(
                  id = "schedule-1",
                  flowId = "flow-1",
                  flowTitle = "Earliest",
                  trigger = OperatorAutomationTrigger(nextRunAtMs = nowMs + 2_000L),
                ),
              ),
          ),
        nowMs = nowMs,
      )

    assertEquals(2_000L, delayMs)
  }
}

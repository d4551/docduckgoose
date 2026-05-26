import Foundation

/// Supported schedule cadences for saved operator flows.
public enum OperatorAutomationTriggerType: String, Codable, Sendable {
    case oneOff = "one_off"
    case daily
    case weekly
}

/// Status values shown for saved schedules.
public enum OperatorAutomationScheduleStatus: String, Codable, Sendable {
    case active
    case paused
    case failed
    case needsAttention = "needs_attention"
}

/// Execution phase tracked for crash recovery of durable scheduled runs.
public enum OperatorAutomationExecutionPhase: String, Codable, Sendable {
    /// Claimed but not yet dispatched to the executor.
    case claimed
    /// Currently running inside the executor.
    case running
}

/// Saved reusable automation flow surfaced in the Automations workspace.
public struct OperatorAutomationFlowSummary: Codable, Sendable, Identifiable {
    public let id: String
    public var title: String
    public var goal: String
    public var updatedAtMs: Int64

    public init(id: String, title: String, goal: String, updatedAtMs: Int64 = Int64(Date().timeIntervalSince1970 * 1000)) {
        self.id = id
        self.title = title
        self.goal = goal
        self.updatedAtMs = updatedAtMs
    }
}

/// Trigger contract for one recurring or one-time automation schedule.
public struct OperatorAutomationTrigger: Codable, Sendable {
    public var type: OperatorAutomationTriggerType
    public var nextRunAtMs: Int64
    public var dayOfWeek: Int?

    public init(
        type: OperatorAutomationTriggerType = .oneOff,
        nextRunAtMs: Int64 = 0,
        dayOfWeek: Int? = nil
    ) {
        self.type = type
        self.nextRunAtMs = nextRunAtMs
        self.dayOfWeek = dayOfWeek
    }
}

/// Saved schedule attached to one reusable automation flow.
public struct OperatorAutomationScheduleSummary: Codable, Sendable, Identifiable {
    public let id: String
    public var flowId: String
    public var flowTitle: String
    public var status: OperatorAutomationScheduleStatus
    public var trigger: OperatorAutomationTrigger
    public var lastRunAtMs: Int64

    public init(
        id: String,
        flowId: String,
        flowTitle: String,
        status: OperatorAutomationScheduleStatus = .active,
        trigger: OperatorAutomationTrigger = OperatorAutomationTrigger(),
        lastRunAtMs: Int64 = 0
    ) {
        self.id = id
        self.flowId = flowId
        self.flowTitle = flowTitle
        self.status = status
        self.trigger = trigger
        self.lastRunAtMs = lastRunAtMs
    }
}

/// Pending due schedule handoff consumed by the iOS background task runner.
public struct OperatorPendingScheduledRun: Codable, Sendable {
    public var scheduleId: String
    public var flowId: String
    public var flowTitle: String
    public var prompt: String
    public var phase: OperatorAutomationExecutionPhase
    public var correlationId: String
    public var claimedAtMs: Int64

    public init(
        scheduleId: String,
        flowId: String,
        flowTitle: String,
        prompt: String,
        phase: OperatorAutomationExecutionPhase = .claimed,
        correlationId: String = "",
        claimedAtMs: Int64 = Int64(Date().timeIntervalSince1970 * 1000)
    ) {
        self.scheduleId = scheduleId
        self.flowId = flowId
        self.flowTitle = flowTitle
        self.prompt = prompt
        self.phase = phase
        self.correlationId = correlationId
        self.claimedAtMs = claimedAtMs
    }
}

/// Summary row for one automation execution or queued run.
public struct OperatorAutomationRunSummary: Codable, Sendable, Identifiable {
    public let id: String
    public var flowId: String
    public var title: String
    public var summary: String
    public var state: FlowExecutionState
    public var updatedAtMs: Int64

    public init(
        id: String,
        flowId: String = "",
        title: String,
        summary: String,
        state: FlowExecutionState,
        updatedAtMs: Int64 = Int64(Date().timeIntervalSince1970 * 1000)
    ) {
        self.id = id
        self.flowId = flowId
        self.title = title
        self.summary = summary
        self.state = state
        self.updatedAtMs = updatedAtMs
    }
}

/// Durable workspace snapshot persisted between app launches for automation state.
public struct OperatorAutomationWorkspaceSnapshot: Codable, Sendable {
    public var savedFlows: [OperatorAutomationFlowSummary]
    public var schedules: [OperatorAutomationScheduleSummary]
    public var runHistory: [OperatorAutomationRunSummary]
    public var pendingScheduledRun: OperatorPendingScheduledRun?

    public init(
        savedFlows: [OperatorAutomationFlowSummary] = [],
        schedules: [OperatorAutomationScheduleSummary] = [],
        runHistory: [OperatorAutomationRunSummary] = [],
        pendingScheduledRun: OperatorPendingScheduledRun? = nil
    ) {
        self.savedFlows = savedFlows
        self.schedules = schedules
        self.runHistory = runHistory
        self.pendingScheduledRun = pendingScheduledRun
    }
}

/// Pure function that claims the next due scheduled automation from a snapshot.
public func claimDueScheduledAutomation(
    _ snapshot: OperatorAutomationWorkspaceSnapshot,
    nowMs: Int64
) -> (snapshot: OperatorAutomationWorkspaceSnapshot, claimed: Bool) {
    guard snapshot.pendingScheduledRun == nil else {
        return (snapshot, false)
    }
    guard let dueSchedule = snapshot.schedules.first(where: { schedule in
        schedule.status == .active
            && schedule.trigger.nextRunAtMs > 0
            && schedule.trigger.nextRunAtMs <= nowMs
            && snapshot.savedFlows.contains(where: { $0.id == schedule.flowId })
    }) else {
        return (snapshot, false)
    }
    guard let flow = snapshot.savedFlows.first(where: { $0.id == dueSchedule.flowId }) else {
        return (snapshot, false)
    }
    let pending = OperatorPendingScheduledRun(
        scheduleId: dueSchedule.id,
        flowId: dueSchedule.flowId,
        flowTitle: dueSchedule.flowTitle,
        prompt: flow.goal,
        correlationId: UUID().uuidString,
        claimedAtMs: nowMs
    )
    var updated = snapshot
    updated.pendingScheduledRun = pending
    return (updated, true)
}

/// Resolve the earliest active schedule that still needs a background wake-up.
public func resolveNextAutomationScheduleDelayMs(
    snapshot: OperatorAutomationWorkspaceSnapshot,
    nowMs: Int64
) -> Int64? {
    guard snapshot.pendingScheduledRun == nil else { return nil }
    let nextRunAtMs = snapshot.schedules
        .filter { schedule in
            schedule.status == .active
                && schedule.trigger.nextRunAtMs > 0
                && snapshot.savedFlows.contains(where: { $0.id == schedule.flowId })
        }
        .map(\.trigger.nextRunAtMs)
        .min()
    guard let nextRunAtMs else { return nil }
    return max(0, nextRunAtMs - nowMs)
}

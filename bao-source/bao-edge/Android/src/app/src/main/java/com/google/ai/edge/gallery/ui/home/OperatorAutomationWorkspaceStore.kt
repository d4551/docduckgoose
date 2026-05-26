package com.google.ai.edge.gallery.ui.home

import android.content.Context
import androidx.core.content.edit
import com.google.gson.Gson
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Inject
import javax.inject.Singleton
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

private const val OPERATOR_AUTOMATION_WORKSPACE_PREFERENCES_NAME = "bao_edge_operator_automation_workspace"
private const val KEY_OPERATOR_AUTOMATION_WORKSPACE = "workspace_snapshot"

/** Durable snapshot of the Android operator automation workspace. */
data class OperatorAutomationWorkspaceSnapshot(
  val savedFlows: List<OperatorAutomationFlowSummary> = emptyList(),
  val schedules: List<OperatorAutomationScheduleSummary> = emptyList(),
  val runHistory: List<OperatorAutomationRunSummary> = emptyList(),
  val selectedFlowId: String = "",
  val pendingScheduledRun: OperatorPendingScheduledRun? = null,
)

/** Owner for durable Android operator automation state. */
interface OperatorAutomationWorkspaceStateStore {
  /** Reads the latest persisted automation workspace snapshot. */
  fun load(): OperatorAutomationWorkspaceSnapshot

  /** Emits the latest persisted workspace snapshot whenever it changes. */
  fun observe(): Flow<OperatorAutomationWorkspaceSnapshot>

  /** Persists the automation workspace snapshot for later shell sessions. */
  fun save(snapshot: OperatorAutomationWorkspaceSnapshot)

  /** Applies one atomic snapshot mutation and persists the result. */
  fun update(transform: (OperatorAutomationWorkspaceSnapshot) -> OperatorAutomationWorkspaceSnapshot): OperatorAutomationWorkspaceSnapshot
}

/** SharedPreferences-backed owner for durable Android operator automation state. */
@Singleton
class OperatorAutomationWorkspaceStore
@Inject
constructor(
  @ApplicationContext context: Context,
) : OperatorAutomationWorkspaceStateStore {
  private val gson = Gson()
  private val sharedPreferences =
    context.getSharedPreferences(
      OPERATOR_AUTOMATION_WORKSPACE_PREFERENCES_NAME,
      Context.MODE_PRIVATE,
    )
  private val snapshots = MutableStateFlow(readPersistedSnapshot())

  @Synchronized
  override fun load(): OperatorAutomationWorkspaceSnapshot {
    return snapshots.value
  }

  override fun observe(): Flow<OperatorAutomationWorkspaceSnapshot> = snapshots.asStateFlow()

  @Synchronized
  override fun save(snapshot: OperatorAutomationWorkspaceSnapshot) {
    snapshots.value = snapshot
    sharedPreferences.edit {
      putString(KEY_OPERATOR_AUTOMATION_WORKSPACE, gson.toJson(snapshot))
    }
  }

  private fun readPersistedSnapshot(): OperatorAutomationWorkspaceSnapshot {
    val rawSnapshot = sharedPreferences.getString(KEY_OPERATOR_AUTOMATION_WORKSPACE, "").orEmpty().trim()
    if (rawSnapshot.isEmpty()) {
      return OperatorAutomationWorkspaceSnapshot()
    }
    return runCatching {
      gson.fromJson(rawSnapshot, OperatorAutomationWorkspaceSnapshot::class.java)
    }.getOrDefault(OperatorAutomationWorkspaceSnapshot())
  }

  @Synchronized
  override fun update(transform: (OperatorAutomationWorkspaceSnapshot) -> OperatorAutomationWorkspaceSnapshot): OperatorAutomationWorkspaceSnapshot {
    val updated = transform(load())
    save(updated)
    return updated
  }
}

@Module
@InstallIn(SingletonComponent::class)
internal abstract class OperatorAutomationWorkspaceStoreModule {
  @Binds
  abstract fun bindOperatorAutomationWorkspaceStateStore(
    implementation: OperatorAutomationWorkspaceStore,
  ): OperatorAutomationWorkspaceStateStore
}

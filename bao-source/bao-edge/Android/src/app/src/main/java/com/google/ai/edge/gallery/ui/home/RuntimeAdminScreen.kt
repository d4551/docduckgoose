@file:OptIn(ExperimentalLayoutApi::class)

package com.google.ai.edge.gallery.ui.home

import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.ArrowOutward
import androidx.compose.material.icons.rounded.AutoMode
import androidx.compose.material.icons.rounded.CloudDownload
import androidx.compose.material.icons.rounded.Memory
import androidx.compose.material.icons.rounded.Public
import androidx.compose.material.icons.rounded.SettingsEthernet
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.google.ai.edge.gallery.GalleryTopAppBar
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.data.AppBarAction
import com.google.ai.edge.gallery.data.AppBarActionType
import com.google.ai.edge.gallery.data.Model
import com.google.ai.edge.gallery.data.ModelDownloadStatus
import com.google.ai.edge.gallery.data.ModelDownloadStatusType
import com.google.ai.edge.gallery.data.OperatorRuntimeAssignments
import com.google.ai.edge.gallery.data.OperatorRuntimeUsage
import com.google.ai.edge.gallery.ui.modelmanager.ModelManagerViewModel
import com.google.ai.edge.gallery.ui.modelmanager.OperatorRuntimeSummary
import com.google.ai.edge.gallery.ui.modelmanager.RequiredModelReadiness

private fun List<String>.toRuntimeChoiceOptions(providerDisplayNames: Map<String, String>): List<BaoEdgeChoiceOption> =
  map { providerId ->
    BaoEdgeChoiceOption(
      value = providerId,
      label = providerDisplayNames[providerId].orEmpty().ifBlank { providerId },
    )
  }

private enum class OperatorModelsPane {
  READY,
  CATALOG,
  DOWNLOADS,
  INSTALLED,
}

/** Legacy route kept as a full-screen wrapper for the dedicated Models workspace. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RuntimeAdminScreen(
  modelManagerViewModel: ModelManagerViewModel,
  onNavigateUp: () -> Unit,
  onModelsClicked: () -> Unit,
  modifier: Modifier = Modifier,
) {
  OperatorModelsScreen(
    modelManagerViewModel = modelManagerViewModel,
    onOpenFullModelManager = onModelsClicked,
    onOpenSettings = null,
    onNavigateUp = onNavigateUp,
    modifier = modifier,
  )
}

/** Dedicated Models workspace that owns readiness, downloads, catalogs, and installed models. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OperatorModelsScreen(
  modelManagerViewModel: ModelManagerViewModel,
  onOpenFullModelManager: () -> Unit,
  onOpenSettings: (() -> Unit)?,
  onNavigateUp: (() -> Unit)? = null,
  modifier: Modifier = Modifier,
) {
  val uiState by modelManagerViewModel.uiState.collectAsState()
  val context = LocalContext.current
  val runtimeSummary = modelManagerViewModel.buildOperatorRuntimeSummary()
  val requiredModelReadiness = modelManagerViewModel.buildRequiredModelReadiness()
  val downloadedModels = modelManagerViewModel.getAllDownloadedModels()
  val allModelsByName = uiState.tasks.flatMap { it.models }.associateBy { it.name }
  var selectedPane by rememberSaveable { mutableStateOf(OperatorModelsPane.CATALOG) }

  LaunchedEffect(Unit) {
    modelManagerViewModel.ensureCloudProvidersLoaded()
  }
  LaunchedEffect(selectedPane, uiState.activeChatProvider, uiState.cloudModelOptionsProvider) {
    if (
      selectedPane == OperatorModelsPane.CATALOG &&
        uiState.activeChatProvider.isNotBlank() &&
        !uiState.isLoadingCloudModels &&
        uiState.cloudModelOptionsProvider != uiState.activeChatProvider
    ) {
      modelManagerViewModel.loadCloudModelsForSelectedProvider()
    }
  }

  BaoEdgeScaffold(
    modifier = modifier,
    topBar = {
      GalleryTopAppBar(
        title = stringResource(R.string.models_workspace_title),
        subtitle = "",
        leftAction = onNavigateUp?.let { AppBarAction(AppBarActionType.NAVIGATE_UP, it) },
      )
    },
  ) { innerPadding ->
    LazyColumn(
      modifier = Modifier.fillMaxSize(),
      contentPadding = PaddingValues(
        start = 16.dp,
        end = 16.dp,
        top = innerPadding.calculateTopPadding() + 12.dp,
        bottom = innerPadding.calculateBottomPadding() + 24.dp,
      ),
      verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
      item(key = "models-overview") {
        SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
          val panes =
            listOf(
              OperatorModelsPane.READY to R.string.models_workspace_overview_title,
              OperatorModelsPane.CATALOG to R.string.models_workspace_catalog_title,
              OperatorModelsPane.DOWNLOADS to R.string.models_workspace_downloads_title,
              OperatorModelsPane.INSTALLED to R.string.models_workspace_installed_title,
            )
          panes.forEachIndexed { index, (pane, labelResId) ->
            SegmentedButton(
              shape = SegmentedButtonDefaults.itemShape(index = index, count = panes.size),
              selected = selectedPane == pane,
              onClick = { selectedPane = pane },
              label = { Text(stringResource(labelResId)) },
            )
          }
        }
      }
      item(key = "models-pane-content") {
        when (selectedPane) {
          OperatorModelsPane.READY ->
            ModelsWorkspaceOverviewCard(
              runtimeSummary = runtimeSummary,
              requiredModelReadiness = requiredModelReadiness,
              assignments = uiState.runtimeAssignments,
              providerDisplayNames = uiState.providerDisplayNames,
              onVerifyDeviceModel = modelManagerViewModel::runDeviceAiProtocol,
              onOpenFullModelManager = onOpenFullModelManager,
              onOpenSettings = onOpenSettings,
            )

          OperatorModelsPane.INSTALLED ->
            InstalledModelsCard(
              downloadedModels = downloadedModels,
              onOpenFullModelManager = onOpenFullModelManager,
              context = context,
            )

          OperatorModelsPane.DOWNLOADS ->
            Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
              DownloadLifecycleCard(
                downloadStatuses = uiState.modelDownloadStatus,
                modelsByName = allModelsByName,
                onRetryDownload = { model -> modelManagerViewModel.downloadModel(task = null, model = model) },
                onCancelDownload = modelManagerViewModel::cancelDownloadModel,
                onDeleteArtifact = modelManagerViewModel::deleteModel,
              )
              CloudPullWorkspaceCard(
                modelRef = uiState.cloudPullModelRef,
                source = uiState.cloudPullSource,
                timeoutMs = uiState.cloudPullTimeoutMsText,
                forcePull = uiState.cloudPullForce,
                pullMessage = uiState.cloudPullMessage,
                isPulling = uiState.isSubmittingCloudPull || uiState.isPollingCloudPull,
                onModelRefChanged = modelManagerViewModel::setCloudPullModelRef,
                onSourceChanged = modelManagerViewModel::setCloudPullSource,
                onTimeoutChanged = modelManagerViewModel::setCloudPullTimeoutMs,
                onForceChanged = modelManagerViewModel::setCloudPullForce,
                onPull = {
                  if (uiState.cloudPullModelRef.isBlank() && uiState.activeChatModel.isNotBlank()) {
                    modelManagerViewModel.setCloudPullModelRef(uiState.activeChatModel)
                  }
                  if (uiState.cloudPullSource.isBlank() && uiState.cloudModelSource.isNotBlank()) {
                    modelManagerViewModel.setCloudPullSource(uiState.cloudModelSource)
                  }
                  modelManagerViewModel.pullCloudModel()
                },
              )
            }

          OperatorModelsPane.CATALOG -> {
            val activeChatAssignment =
              uiState.runtimeAssignments.assignmentFor(com.google.ai.edge.gallery.data.OperatorRuntimeUsage.CHAT)
            CloudCatalogCard(
              providerOptions = uiState.providerOptions.toRuntimeChoiceOptions(uiState.providerDisplayNames),
              selectedProvider = uiState.activeChatProvider,
              selectedProviderLabel =
                uiState.providerDisplayNames[uiState.activeChatProvider].orEmpty().ifBlank {
                  uiState.activeChatProvider
                },
              selectedSource = activeChatAssignment.source,
              selectedSourceLabel =
                uiState.modelSourceOptions.firstOrNull { it.id == activeChatAssignment.source }?.displayName
                  ?.ifBlank { activeChatAssignment.source }
                  ?: activeChatAssignment.source,
              selectedCloudModel = uiState.activeChatModel,
              modelDescriptors = uiState.cloudModelDescriptors,
              modelDisplayNames = uiState.cloudModelDisplayNames,
              providerMessage = uiState.providerRegistryMessage,
              modelMessage = uiState.cloudModelListMessage,
              isLoadingProviders = uiState.isLoadingProviderRegistry,
              isLoadingModels = uiState.isLoadingCloudModels,
              onLoadProviders = modelManagerViewModel::loadCloudProviders,
              onLoadModels = modelManagerViewModel::loadCloudModelsForSelectedProvider,
              onProviderSelected = modelManagerViewModel::setActiveChatProvider,
              onModelSelected = modelManagerViewModel::setActiveChatModel,
              onSourceSelected = { source ->
                modelManagerViewModel.setRuntimeAssignmentSource(OperatorRuntimeUsage.CHAT, source)
              },
              sourceOptions = uiState.modelSourceOptions,
              onOpenSettings = onOpenSettings,
            )
          }
        }
      }
    }
  }
}

@Composable
private fun DownloadLifecycleCard(
  downloadStatuses: Map<String, ModelDownloadStatus>,
  modelsByName: Map<String, Model>,
  onRetryDownload: (Model) -> Unit,
  onCancelDownload: (Model) -> Unit,
  onDeleteArtifact: (Model) -> Unit,
) {
  val grouped = downloadStatuses.entries.groupBy { it.value.status }
  val actionableEntries =
    downloadStatuses.entries.filter { entry ->
      entry.value.status == ModelDownloadStatusType.FAILED ||
        entry.value.status == ModelDownloadStatusType.PARTIALLY_DOWNLOADED ||
        entry.value.status == ModelDownloadStatusType.IN_PROGRESS
    }.sortedBy { it.key }

  BaoEdgePanel(
    title = stringResource(R.string.models_workspace_downloads_lifecycle_title),
    subtitle = null,
  ) {
    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
      DownloadStatusChip(
        label = stringResource(R.string.models_workspace_download_state_in_progress),
        count = grouped[ModelDownloadStatusType.IN_PROGRESS]?.size ?: 0,
      )
      DownloadStatusChip(
        label = stringResource(R.string.models_workspace_download_state_partial),
        count = grouped[ModelDownloadStatusType.PARTIALLY_DOWNLOADED]?.size ?: 0,
      )
      DownloadStatusChip(
        label = stringResource(R.string.models_workspace_download_state_failed),
        count = grouped[ModelDownloadStatusType.FAILED]?.size ?: 0,
      )
      DownloadStatusChip(
        label = stringResource(R.string.models_workspace_download_state_ready),
        count = grouped[ModelDownloadStatusType.SUCCEEDED]?.size ?: 0,
      )
    }

    if (actionableEntries.isEmpty()) {
      Text(
        text = stringResource(R.string.models_workspace_downloads_lifecycle_empty),
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    } else {
      Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        actionableEntries.take(8).forEach { entry ->
          val model = modelsByName[entry.key]
          Column(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(
              text = entry.key,
              style = MaterialTheme.typography.titleMedium,
              fontWeight = FontWeight.SemiBold,
            )
            Text(
              text = downloadStatusSummary(entry.value),
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            if (model != null) {
              FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                if (entry.value.status == ModelDownloadStatusType.FAILED || entry.value.status == ModelDownloadStatusType.PARTIALLY_DOWNLOADED) {
                  BaoEdgeIconActionButton(
                    label = stringResource(R.string.models_workspace_download_retry),
                    icon = Icons.Rounded.CloudDownload,
                    onClick = { onRetryDownload(model) },
                  )
                }
                if (entry.value.status == ModelDownloadStatusType.IN_PROGRESS) {
                  BaoEdgeIconActionButton(
                    label = stringResource(R.string.models_workspace_download_cancel),
                    icon = Icons.Rounded.CloudDownload,
                    onClick = { onCancelDownload(model) },
                  )
                }
                BaoEdgeIconActionButton(
                  label = stringResource(R.string.models_workspace_download_delete),
                  icon = Icons.Rounded.Memory,
                  onClick = { onDeleteArtifact(model) },
                )
              }
            }
          }
        }
      }
    }
  }
}

@Composable
private fun DownloadStatusChip(
  label: String,
  count: Int,
) {
  BaoEdgeChip(
    label = "$label: $count",
    active = count > 0,
    leadingIcon = Icons.Rounded.CloudDownload,
  )
}

@Composable
private fun runtimeUsageLabel(usage: OperatorRuntimeUsage): String =
  when (usage) {
    OperatorRuntimeUsage.CHAT -> stringResource(R.string.settings_runtime_usage_chat)
    OperatorRuntimeUsage.AUTOMATION -> stringResource(R.string.settings_runtime_usage_automation)
    OperatorRuntimeUsage.IMAGE -> stringResource(R.string.settings_runtime_usage_image)
    OperatorRuntimeUsage.FLOW_GENERATION -> stringResource(R.string.settings_runtime_usage_flow_generation)
    OperatorRuntimeUsage.SPEECH_INPUT -> stringResource(R.string.settings_runtime_usage_speech_input)
    OperatorRuntimeUsage.SPEECH_OUTPUT -> stringResource(R.string.settings_runtime_usage_speech_output)
  }

@Composable
private fun downloadStatusSummary(status: ModelDownloadStatus): String =
  when (status.status) {
    ModelDownloadStatusType.NOT_DOWNLOADED -> stringResource(R.string.models_workspace_download_summary_not_downloaded)
    ModelDownloadStatusType.PARTIALLY_DOWNLOADED ->
      stringResource(
        R.string.models_workspace_download_summary_partial,
        status.receivedBytes,
        status.totalBytes,
      )
    ModelDownloadStatusType.IN_PROGRESS ->
      stringResource(
        R.string.models_workspace_download_summary_in_progress,
        status.receivedBytes,
        status.totalBytes,
      )
    ModelDownloadStatusType.UNZIPPING -> stringResource(R.string.models_workspace_download_summary_unpacking)
    ModelDownloadStatusType.SUCCEEDED -> stringResource(R.string.models_workspace_download_summary_ready)
    ModelDownloadStatusType.FAILED ->
      status.errorMessage.ifBlank { stringResource(R.string.models_workspace_download_summary_failed) }
  }

@Composable
private fun ModelsWorkspaceOverviewCard(
  runtimeSummary: OperatorRuntimeSummary,
  requiredModelReadiness: RequiredModelReadiness,
  assignments: OperatorRuntimeAssignments,
  providerDisplayNames: Map<String, String>,
  onVerifyDeviceModel: () -> Unit,
  onOpenFullModelManager: () -> Unit,
  onOpenSettings: (() -> Unit)?,
) {
  val isReady = requiredModelReadiness.state == com.google.ai.edge.gallery.ui.modelmanager.RequiredModelReadinessState.READY ||
    requiredModelReadiness.state == com.google.ai.edge.gallery.ui.modelmanager.RequiredModelReadinessState.IN_USE

  Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
    BaoEdgePanel(
      title = stringResource(R.string.models_workspace_readiness_title),
      subtitle = requiredModelReadiness.detail,
    ) {
      Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        BaoEdgeChip(
          label = requiredModelReadiness.title,
          active = isReady,
          leadingIcon = Icons.Rounded.CloudDownload,
        )
        Text(
          text = stringResource(
            R.string.runtime_admin_readiness_summary,
            runtimeSummary.activeProvider.ifBlank { stringResource(R.string.operator_not_set) },
            runtimeSummary.activeCloudModel.ifBlank { stringResource(R.string.operator_not_set) },
            runtimeSummary.activeLocalModel.ifBlank { stringResource(R.string.operator_not_set) },
          ),
          style = MaterialTheme.typography.bodyMedium,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
      }
      BaoEdgePrimaryButton(
        label = requiredModelReadiness.actionLabel,
        onClick = onVerifyDeviceModel,
        modifier = Modifier.fillMaxWidth(),
        leadingIcon = Icons.Rounded.CloudDownload,
      )
      FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        BaoEdgeIconActionButton(
          label = stringResource(R.string.models_workspace_open_full_manager),
          icon = Icons.Rounded.Memory,
          onClick = onOpenFullModelManager,
        )
        if (onOpenSettings != null) {
          BaoEdgeIconActionButton(
            label = stringResource(R.string.operator_open_ai_settings),
            icon = Icons.Rounded.SettingsEthernet,
            onClick = onOpenSettings,
          )
        }
      }
    }

    var capabilityMatrixExpanded by rememberSaveable { mutableStateOf(false) }
    BaoEdgePanel(
      title = stringResource(R.string.models_workspace_assignments_title),
      subtitle = stringResource(R.string.models_workspace_runtime_matrix_subtitle),
    ) {
      BaoEdgeSecondaryButton(
        label = if (capabilityMatrixExpanded) stringResource(R.string.collapse_all) else stringResource(R.string.expand_all),
        onClick = { capabilityMatrixExpanded = !capabilityMatrixExpanded },
        leadingIcon = Icons.Rounded.AutoMode,
        modifier = Modifier.fillMaxWidth(),
      )
      if (capabilityMatrixExpanded) {
        OperatorRuntimeUsage.ordered.forEach { usage ->
          val assignment = assignments.assignmentFor(usage)
          val providerLabel = providerDisplayNames[assignment.provider].orEmpty().ifBlank {
            assignment.provider.ifBlank { stringResource(R.string.operator_not_set) }
          }
          val modelLabel = assignment.model.ifBlank { stringResource(R.string.operator_not_set) }
          val sourceLabel = assignment.source.ifBlank { stringResource(R.string.operator_not_set) }
          Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(
              text = runtimeUsageLabel(usage),
              style = MaterialTheme.typography.titleSmall,
              fontWeight = FontWeight.SemiBold,
            )
            Text(
              text = stringResource(
                R.string.runtime_admin_assignment_summary,
                providerLabel,
                modelLabel,
                sourceLabel,
              ),
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
          }
        }
      }
    }
  }
}

@Composable
private fun CloudCatalogCard(
  providerOptions: List<BaoEdgeChoiceOption>,
  selectedProvider: String,
  selectedProviderLabel: String,
  selectedSource: String,
  selectedSourceLabel: String,
  selectedCloudModel: String,
  modelDescriptors: List<com.google.ai.edge.gallery.data.CloudModelDescriptor>,
  modelDisplayNames: Map<String, String>,
  providerMessage: String,
  modelMessage: String,
  isLoadingProviders: Boolean,
  isLoadingModels: Boolean,
  onLoadProviders: () -> Unit,
  onLoadModels: () -> Unit,
  onProviderSelected: (String) -> Unit,
  onModelSelected: (String) -> Unit,
  onSourceSelected: (String) -> Unit,
  sourceOptions: List<com.google.ai.edge.gallery.data.CloudModelSourceDescriptor>,
  onOpenSettings: (() -> Unit)?,
) {
  var query by rememberSaveable(selectedProvider, selectedCloudModel) { mutableStateOf("") }
  val filteredModels =
    modelDescriptors.filter { descriptor ->
      query.isBlank() ||
        descriptor.displayName.contains(query, ignoreCase = true) ||
        descriptor.id.contains(query, ignoreCase = true)
    }
  BaoEdgePanel(
    title = stringResource(R.string.models_workspace_catalog_title),
    subtitle = stringResource(R.string.models_workspace_catalog_subtitle),
  ) {
    BaoEdgeSearchableChoiceField(
      label = stringResource(R.string.settings_workspace_connection_provider_title),
      options = providerOptions,
      selectedValue = selectedProvider,
      onOptionSelected = onProviderSelected,
      placeholder = stringResource(R.string.operator_not_set),
    )
    BaoEdgeSearchableChoiceField(
      label = stringResource(R.string.models_workspace_source_title),
      options =
        sourceOptions.map { source ->
          BaoEdgeChoiceOption(value = source.id, label = source.displayName.ifBlank { source.id })
        },
      selectedValue = selectedSource,
      onOptionSelected = onSourceSelected,
      placeholder = stringResource(R.string.operator_not_set),
    )
    BaoEdgeInput(
      value = query,
      onValueChange = { query = it },
      label = stringResource(R.string.operator_runtime_picker_search_label),
      placeholder = stringResource(R.string.operator_runtime_picker_search_placeholder),
      modifier = Modifier.fillMaxWidth(),
      singleLine = true,
    )
    FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
      BaoEdgeIconActionButton(
        label = stringResource(R.string.load_configured_providers),
        icon = Icons.Rounded.Public,
        onClick = onLoadProviders,
        enabled = !isLoadingProviders,
      )
      BaoEdgeIconActionButton(
        label = stringResource(R.string.runtime_admin_load_models),
        icon = Icons.Rounded.AutoMode,
        onClick = onLoadModels,
        enabled = selectedProviderLabel.isNotBlank() && !isLoadingModels,
      )
      if (onOpenSettings != null) {
        BaoEdgeIconActionButton(
          label = stringResource(R.string.operator_open_ai_settings),
          icon = Icons.Rounded.SettingsEthernet,
          onClick = onOpenSettings,
        )
      }
    }

    if (isLoadingProviders || isLoadingModels) {
      Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
        CircularProgressIndicator(strokeWidth = 2.dp)
        Text(
          text = stringResource(R.string.operator_state_loading),
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
      }
    }

    if (providerMessage.isNotBlank() || modelMessage.isNotBlank()) {
      Text(
        text = listOf(providerMessage, modelMessage).filter(String::isNotBlank).joinToString(" · "),
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    }

    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
      BaoEdgeChip(
        label = stringResource(
          R.string.runtime_admin_provider_value,
          selectedProviderLabel.ifBlank { stringResource(R.string.operator_not_set) },
        ),
        active = selectedProviderLabel.isNotBlank(),
        leadingIcon = Icons.Rounded.Public,
      )
      BaoEdgeChip(
        label = stringResource(
          R.string.models_workspace_source_value,
          selectedSourceLabel.ifBlank { stringResource(R.string.operator_not_set) },
        ),
        active = selectedSourceLabel.isNotBlank(),
        leadingIcon = Icons.Rounded.ArrowOutward,
      )
      BaoEdgeChip(
        label = stringResource(
          R.string.runtime_admin_model_value,
          selectedCloudModel.ifBlank { stringResource(R.string.operator_not_set) },
        ),
        active = selectedCloudModel.isNotBlank(),
        leadingIcon = Icons.Rounded.AutoMode,
      )
    }
    if (filteredModels.isEmpty()) {
      Text(
        text = stringResource(R.string.operator_runtime_picker_no_models),
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    } else {
      Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        filteredModels.take(24).forEach { model ->
          BaoEdgePanel(
            title = model.displayName.ifBlank { model.id },
            subtitle = model.provider,
          ) {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
              BaoEdgeChip(
                label = model.source.ifBlank { selectedSourceLabel },
                active = model.source.isNotBlank(),
                leadingIcon = Icons.Rounded.ArrowOutward,
              )
              model.capabilityModes.take(4).forEach { capability ->
                BaoEdgeChip(label = capability, active = true, leadingIcon = Icons.Rounded.AutoMode)
              }
            }
            BaoEdgePrimaryButton(
              label =
                if (selectedCloudModel == model.id) {
                  stringResource(R.string.operator_runtime_picker_selected)
                } else {
                  stringResource(R.string.operator_runtime_picker_use_model)
                },
              onClick = { onModelSelected(model.id) },
              modifier = Modifier.fillMaxWidth(),
              leadingIcon = Icons.Rounded.AutoMode,
            )
          }
        }
      }
    }
  }
}

@Composable
private fun CloudPullWorkspaceCard(
  modelRef: String,
  source: String,
  timeoutMs: String,
  forcePull: Boolean,
  pullMessage: String,
  isPulling: Boolean,
  onModelRefChanged: (String) -> Unit,
  onSourceChanged: (String) -> Unit,
  onTimeoutChanged: (String) -> Unit,
  onForceChanged: (Boolean) -> Unit,
  onPull: () -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.models_workspace_downloads_title),
    subtitle = null,
  ) {
    BaoEdgeInput(
      value = modelRef,
      onValueChange = onModelRefChanged,
      label = stringResource(R.string.cloud_pull_model_reference),
      modifier = Modifier.fillMaxWidth(),
      singleLine = true,
    )
    BaoEdgeInput(
      value = source,
      onValueChange = onSourceChanged,
      label = stringResource(R.string.cloud_pull_source),
      modifier = Modifier.fillMaxWidth(),
      singleLine = true,
    )
    BaoEdgeInput(
      value = timeoutMs,
      onValueChange = onTimeoutChanged,
      label = stringResource(R.string.cloud_pull_timeout_ms),
      modifier = Modifier.fillMaxWidth(),
      singleLine = true,
    )
    BaoEdgeSwitchRow(
      label = stringResource(R.string.cloud_pull_force),
      checked = forcePull,
      onCheckedChange = onForceChanged,
    )
    BaoEdgePrimaryButton(
      label = stringResource(R.string.runtime_admin_pull_model),
      onClick = onPull,
      enabled = !isPulling,
      leadingIcon = Icons.Rounded.CloudDownload,
    )
    if (isPulling) {
      CircularProgressIndicator(strokeWidth = 2.dp)
    }
    if (pullMessage.isNotBlank()) {
      Text(
        text = pullMessage,
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    }
  }
}

@Composable
private fun InstalledModelsCard(
  downloadedModels: List<Model>,
  context: android.content.Context,
  onOpenFullModelManager: () -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.models_workspace_installed_title),
    subtitle = stringResource(R.string.models_workspace_installed_subtitle),
  ) {
    if (downloadedModels.isEmpty()) {
      Text(
        text = stringResource(R.string.models_workspace_installed_empty),
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    } else {
      Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        downloadedModels.take(20).forEach { model ->
          BaoEdgePanel(
            title = model.getDisplayName(context = context),
            subtitle = model.name,
          ) {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
              BaoEdgeChip(
                label = if (model.imported) stringResource(R.string.models_workspace_installed_imported) else stringResource(R.string.models_workspace_installed_downloaded),
                active = true,
                leadingIcon = Icons.Rounded.Memory,
              )
              BaoEdgeChip(
                label = if (model.isLlm) stringResource(R.string.category_llm) else stringResource(R.string.models_workspace_installed_local_artifact),
                active = true,
                leadingIcon = Icons.Rounded.AutoMode,
              )
            }
          }
        }
      }
    }
    FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
      BaoEdgeIconActionButton(
        label = stringResource(R.string.models_workspace_open_full_manager),
        icon = Icons.Rounded.Memory,
        onClick = onOpenFullModelManager,
      )
    }
  }
}

package com.google.ai.edge.gallery.ui.home

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.AutoAwesome
import androidx.compose.material.icons.rounded.CloudDownload
import androidx.compose.material.icons.rounded.Memory
import androidx.compose.material.icons.rounded.Public
import androidx.compose.material.icons.rounded.SettingsEthernet
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.data.CloudModelDescriptor
import com.google.ai.edge.gallery.data.CloudModelSourceDescriptor
import com.google.ai.edge.gallery.data.Model
import com.google.ai.edge.gallery.data.OperatorRuntimeUsage
import com.google.ai.edge.gallery.ui.modelmanager.RequiredModelReadiness

/** Shared runtime picker sheet used by chat and AI settings. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun OperatorRuntimePickerSheet(
  pickerState: OperatorRuntimePickerUiState,
  providerOptions: List<BaoEdgeChoiceOption>,
  sourceOptions: List<CloudModelSourceDescriptor>,
  selectedProvider: String,
  selectedSource: String,
  selectedModel: String,
  modelOptions: List<String>,
  modelDisplayNames: Map<String, String>,
  modelDescriptors: List<CloudModelDescriptor>,
  downloadedModels: List<Model>,
  requiredModelReadiness: RequiredModelReadiness,
  onDismiss: () -> Unit,
  onProviderSelected: (String) -> Unit,
  onSourceSelected: (String) -> Unit,
  onLoadModels: () -> Unit,
  onModelSelected: (String) -> Unit,
  onOpenModels: () -> Unit,
) {
  if (!pickerState.visible) {
    return
  }

  val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
  val selectedModelDescriptor = modelDescriptors.firstOrNull { descriptor -> descriptor.id == selectedModel }
  val downloadedModelIds = remember(downloadedModels) { downloadedModels.map { it.name }.toSet() }
  var query by rememberSaveable(pickerState.target.name, selectedProvider, selectedModel) { mutableStateOf("") }
  val filteredProviders =
    providerOptions.filter { option ->
      query.isBlank() ||
        option.label.contains(query, ignoreCase = true) ||
        option.value.contains(query, ignoreCase = true)
    }
  val filteredModels =
    modelOptions.filter { modelId ->
      val label = modelDisplayNames[modelId].orEmpty().ifBlank { modelId }
      query.isBlank() || label.contains(query, ignoreCase = true) || modelId.contains(query, ignoreCase = true)
    }

  ModalBottomSheet(
    onDismissRequest = onDismiss,
    sheetState = sheetState,
  ) {
    LazyColumn(
      modifier = Modifier.fillMaxWidth(),
      verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
      item(key = "runtime-picker-header") {
        Column(
          modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp),
          verticalArrangement = Arrangement.spacedBy(10.dp),
        ) {
          Text(
            text = runtimePickerTitle(target = pickerState.target),
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.SemiBold,
          )
          Text(
            text = stringResource(R.string.operator_runtime_picker_body),
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
          )
          BaoEdgeInput(
            value = query,
            onValueChange = { query = it },
            label = stringResource(R.string.operator_runtime_picker_search_label),
            singleLine = true,
            placeholder = stringResource(R.string.operator_runtime_picker_search_placeholder),
            modifier = Modifier.fillMaxWidth(),
          )
        }
      }

      item(key = "runtime-picker-summary") {
        BaoEdgePanel(
          title = stringResource(R.string.operator_runtime_picker_summary_title),
          modifier = Modifier.padding(horizontal = 20.dp),
        ) {
          FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
          ) {
            BaoEdgeChip(
              label = providerOptions.firstOrNull { it.value == selectedProvider }?.label
                ?: selectedProvider.ifBlank { stringResource(R.string.operator_runtime_cta_provider_missing) },
              active = selectedProvider.isNotBlank(),
              leadingIcon = Icons.Rounded.Public,
            )
            BaoEdgeChip(
              label = sourceOptions.firstOrNull { it.id == selectedSource }?.displayName
                ?.ifBlank { selectedSource }
                ?: selectedSource.ifBlank { stringResource(R.string.operator_not_set) },
              active = selectedSource.isNotBlank(),
              leadingIcon = Icons.Rounded.SettingsEthernet,
            )
            BaoEdgeChip(
              label = modelDisplayNames[selectedModel].orEmpty().ifBlank {
                selectedModel.ifBlank { stringResource(R.string.operator_runtime_cta_model_missing) }
              },
              active = selectedModel.isNotBlank(),
              leadingIcon = Icons.Rounded.Memory,
            )
          }
          if (selectedModelDescriptor != null) {
            FlowRow(
              horizontalArrangement = Arrangement.spacedBy(8.dp),
              verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
              modelCapabilityLabels(selectedModelDescriptor).forEach { capability ->
                BaoEdgeChip(
                  label = capability,
                  active = true,
                  leadingIcon = Icons.Rounded.AutoAwesome,
                )
              }
            }
          }
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.CenterVertically,
          ) {
            BaoEdgeChip(
              label = requiredModelReadiness.title,
              active = requiredModelReadiness.state != com.google.ai.edge.gallery.ui.modelmanager.RequiredModelReadinessState.FAILED,
              leadingIcon = Icons.Rounded.CloudDownload,
            )
            if (selectedModel.isNotBlank()) {
              BaoEdgeChip(
                label =
                  if (downloadedModelIds.contains(selectedModel)) {
                    stringResource(R.string.operator_runtime_picker_model_installed)
                  } else {
                    stringResource(R.string.operator_runtime_picker_model_remote)
                  },
                active = downloadedModelIds.contains(selectedModel),
                leadingIcon = Icons.Rounded.Memory,
              )
            }
          }
        }
      }

      item(key = "runtime-picker-source") {
        BaoEdgePanel(
          title = stringResource(R.string.models_workspace_source_title),
          modifier = Modifier.padding(horizontal = 20.dp),
        ) {
          sourceOptions.forEach { source ->
            BaoEdgeRadioChoiceRow(
              label = source.displayName.ifBlank { source.id },
              selected = source.id == selectedSource,
              onClick = { onSourceSelected(source.id) },
            )
          }
        }
      }

      item(key = "runtime-picker-provider") {
        BaoEdgePanel(
          title = stringResource(R.string.operator_provider_picker_title),
          modifier = Modifier.padding(horizontal = 20.dp),
        ) {
          if (filteredProviders.isEmpty()) {
            Text(
              text = stringResource(R.string.operator_runtime_picker_no_results),
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
          } else {
            filteredProviders.forEach { provider ->
              BaoEdgeRadioChoiceRow(
                label = provider.label,
                selected = provider.value == selectedProvider,
                onClick = { onProviderSelected(provider.value) },
              )
            }
          }
        }
      }

      item(key = "runtime-picker-models") {
        BaoEdgePanel(
          title = stringResource(R.string.operator_model_picker_title),
          subtitle = stringResource(R.string.operator_runtime_picker_model_subtitle),
          modifier = Modifier.padding(horizontal = 20.dp),
        ) {
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.CenterVertically,
          ) {
            BaoEdgePrimaryButton(
              label = stringResource(R.string.runtime_admin_load_models),
              onClick = onLoadModels,
              leadingIcon = Icons.Rounded.CloudDownload,
              modifier = Modifier.weight(1f),
              enabled = selectedProvider.isNotBlank(),
            )
            BaoEdgeSecondaryButton(
              label = stringResource(R.string.operator_open_models),
              onClick = onOpenModels,
              leadingIcon = Icons.Rounded.Memory,
              modifier = Modifier.weight(1f),
            )
          }
          if (filteredModels.isEmpty()) {
            Text(
              text = stringResource(R.string.operator_runtime_picker_no_models),
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
          } else {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
              filteredModels.take(24).forEach { modelId ->
                val modelDescriptor = modelDescriptors.firstOrNull { descriptor -> descriptor.id == modelId }
                OperatorRuntimeModelRow(
                  title = modelDisplayNames[modelId].orEmpty().ifBlank { modelId },
                  subtitle = modelDescriptor?.provider.orEmpty().ifBlank { selectedProvider },
                  sourceLabel = modelDescriptor?.source.orEmpty().ifBlank { selectedSource },
                  selected = modelId == selectedModel,
                  downloaded = downloadedModelIds.contains(modelId),
                  capabilityLabels = modelDescriptor?.let { modelCapabilityLabels(it) }.orEmpty(),
                  onSelect = { onModelSelected(modelId) },
                )
              }
            }
          }
        }
      }

      item(key = "runtime-picker-footer") {
        Row(
          modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp, vertical = 8.dp),
          horizontalArrangement = Arrangement.spacedBy(10.dp),
        ) {
          BaoEdgePrimaryButton(
            label = stringResource(R.string.done),
            onClick = onDismiss,
            modifier = Modifier.weight(1f),
          )
        }
      }
    }
  }
}

@Composable
private fun runtimePickerTitle(target: OperatorRuntimePickerTarget): String =
  when (target) {
    OperatorRuntimePickerTarget.DEFAULT,
    OperatorRuntimePickerTarget.CHAT -> stringResource(R.string.operator_runtime_picker_default_title)
    OperatorRuntimePickerTarget.AUTOMATION -> stringResource(R.string.settings_runtime_usage_automation)
    OperatorRuntimePickerTarget.IMAGE -> stringResource(R.string.settings_runtime_usage_image)
    OperatorRuntimePickerTarget.FLOW_GENERATION -> stringResource(R.string.settings_runtime_usage_flow_generation)
    OperatorRuntimePickerTarget.SPEECH_INPUT -> stringResource(R.string.settings_runtime_usage_speech_input)
    OperatorRuntimePickerTarget.SPEECH_OUTPUT -> stringResource(R.string.settings_runtime_usage_speech_output)
  }

@Composable
private fun OperatorRuntimeModelRow(
  title: String,
  subtitle: String,
  sourceLabel: String,
  selected: Boolean,
  downloaded: Boolean,
  capabilityLabels: List<String>,
  onSelect: () -> Unit,
) {
  BaoEdgePanel(
    title = title,
    subtitle = subtitle,
  ) {
    FlowRow(
      horizontalArrangement = Arrangement.spacedBy(8.dp),
      verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
      BaoEdgeChip(
        label = sourceLabel.ifBlank { stringResource(R.string.operator_not_set) },
        active = sourceLabel.isNotBlank(),
        leadingIcon = Icons.Rounded.SettingsEthernet,
      )
      BaoEdgeChip(
        label =
          if (downloaded) {
            stringResource(R.string.operator_runtime_picker_model_installed)
          } else {
            stringResource(R.string.operator_runtime_picker_model_remote)
          },
        active = downloaded,
        leadingIcon = Icons.Rounded.Memory,
      )
      capabilityLabels.take(4).forEach { label ->
        BaoEdgeChip(label = label, active = true, leadingIcon = Icons.Rounded.AutoAwesome)
      }
    }
    BaoEdgePrimaryButton(
      label =
        if (selected) {
          stringResource(R.string.operator_runtime_picker_selected)
        } else {
          stringResource(R.string.operator_runtime_picker_use_model)
        },
      onClick = onSelect,
      modifier = Modifier.fillMaxWidth(),
      leadingIcon = Icons.Rounded.Memory,
    )
  }
}

@Composable
private fun modelCapabilityLabels(descriptor: CloudModelDescriptor): List<String> =
  buildList {
    if (descriptor.supportsText) add(stringResource(R.string.operator_capability_chat))
    if (descriptor.supportsImageInput || descriptor.supportsImageGeneration) add(stringResource(R.string.operator_capability_image))
    if (descriptor.supportsAudioInput) add(stringResource(R.string.operator_capability_speech))
    if (descriptor.supportsAutomation) add(stringResource(R.string.operator_capability_automation_chip))
    if (descriptor.supportsFlowGeneration) add(stringResource(R.string.operator_capability_flow))
    descriptor.capabilities
      .map(String::trim)
      .filter(String::isNotBlank)
      .forEach { capability ->
        if (capability !in this) {
          add(capability)
        }
      }
  }

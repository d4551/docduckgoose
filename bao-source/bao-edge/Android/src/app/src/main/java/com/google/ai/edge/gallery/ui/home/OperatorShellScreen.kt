@file:OptIn(ExperimentalLayoutApi::class)

package com.google.ai.edge.gallery.ui.home

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.AutoAwesome
import androidx.compose.material.icons.rounded.CalendarMonth
import androidx.compose.material.icons.rounded.ChatBubbleOutline
import androidx.compose.material.icons.rounded.CheckCircle
import androidx.compose.material.icons.rounded.History
import androidx.compose.material.icons.rounded.Memory
import androidx.compose.material.icons.rounded.PhoneAndroid
import androidx.compose.material.icons.rounded.Schedule
import androidx.compose.material.icons.rounded.SettingsEthernet
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.NavigationRail
import androidx.compose.material3.NavigationRailItem
import androidx.compose.material3.NavigationRailItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import com.google.ai.edge.gallery.GalleryTopAppBar
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.customtasks.mobileactions.MobileActionsViewModel
import com.google.ai.edge.gallery.data.BuiltInTaskId
import com.google.ai.edge.gallery.data.OperatorRuntimeUsage
import com.google.ai.edge.gallery.ui.common.tos.AppTosDialog
import com.google.ai.edge.gallery.ui.modelmanager.ModelManagerViewModel
import com.google.ai.edge.gallery.ui.modelmanager.RequiredModelReadinessState
import com.baohaus.baoedge.core.flow.FlowExecutionState
import java.text.DateFormat
import java.util.Date
import kotlinx.coroutines.launch

private fun OperatorShellDestination.labelRes(): Int =
  when (this) {
    OperatorShellDestination.CHAT -> R.string.operator_shell_chat
    OperatorShellDestination.AUTOMATIONS -> R.string.operator_shell_automations
    OperatorShellDestination.MODELS -> R.string.operator_shell_models
    OperatorShellDestination.SETTINGS -> R.string.operator_shell_settings
  }

private fun OperatorShellDestination.icon(): androidx.compose.ui.graphics.vector.ImageVector =
  when (this) {
    OperatorShellDestination.CHAT -> Icons.Rounded.ChatBubbleOutline
    OperatorShellDestination.AUTOMATIONS -> Icons.Rounded.Schedule
    OperatorShellDestination.MODELS -> Icons.Rounded.Memory
    OperatorShellDestination.SETTINGS -> Icons.Rounded.SettingsEthernet
  }

/** Top-level Android shell for the conversation-first operator IA. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OperatorShellScreen(
  modelManagerViewModel: ModelManagerViewModel,
  tosViewModel: com.google.ai.edge.gallery.ui.common.tos.TosViewModel,
  onOpenFullModelManager: () -> Unit,
  initialEntryRequest: OperatorShellEntryRequest = OperatorShellEntryRequest(),
  modifier: Modifier = Modifier,
  mobileActionsViewModel: MobileActionsViewModel = hiltViewModel(),
  operatorShellViewModel: OperatorShellViewModel = hiltViewModel(),
) {
  val shellUiState by operatorShellViewModel.uiState.collectAsState()
  val modelUiState by modelManagerViewModel.uiState.collectAsState()
  val requiredModelReadiness = modelManagerViewModel.buildRequiredModelReadiness()
  val downloadedModels = modelManagerViewModel.getAllDownloadedModels()
  val isLargeScreen = LocalConfiguration.current.screenWidthDp >= 840
  val tosAccepted by tosViewModel.isTosAccepted.collectAsState()
  val pendingScheduledRun = shellUiState.pendingScheduledRun
  val assistantTimelineTitle = stringResource(R.string.operator_timeline_assistant_title)
  val planTimelineTitle = stringResource(R.string.operator_timeline_plan_title)
  val phoneTimelineTitle = stringResource(R.string.operator_timeline_phone_title)
  val phoneModelMissingMessage = stringResource(R.string.operator_phone_model_missing)

  LaunchedEffect(initialEntryRequest, modelUiState.controlPlaneBaseUrl) {
    operatorShellViewModel.applyEntryRequest(initialEntryRequest)
    operatorShellViewModel.ensureConversationHistoryLoaded(
      baseUrl = modelUiState.controlPlaneBaseUrl,
    )
  }

  LaunchedEffect(pendingScheduledRun?.scheduleId) {
    val scheduledRun = pendingScheduledRun ?: return@LaunchedEffect
    operatorShellViewModel.beginScheduledRun(
      scheduleId = scheduledRun.scheduleId,
      prompt = scheduledRun.prompt,
    )
    val automationModel = modelManagerViewModel.getPreferredModelForTask(BuiltInTaskId.LLM_MOBILE_ACTIONS)
    if (automationModel == null) {
      operatorShellViewModel.failScheduledRun(
        scheduleId = scheduledRun.scheduleId,
        message = phoneModelMissingMessage,
      )
      return@LaunchedEffect
    }
    val result =
      mobileActionsViewModel.executeOperatorPrompt(
        model = automationModel,
        userPrompt = scheduledRun.prompt,
        modelManagerViewModel = modelManagerViewModel,
      )
    operatorShellViewModel.applyAutomationResult(
      result = result,
      assistantTitle = assistantTimelineTitle,
      planTitle = planTimelineTitle,
      phoneTitle = phoneTimelineTitle,
    )
    operatorShellViewModel.finishScheduledRun(
      scheduleId = scheduledRun.scheduleId,
      resultState = result.state,
      requiresAttention =
        result.executions.any { execution -> execution.approvalRequest != null } ||
          result.state == FlowExecutionState.ERROR_RETRYABLE ||
          result.state == FlowExecutionState.ERROR_NON_RETRYABLE ||
          result.state == FlowExecutionState.UNAUTHORIZED,
    )
  }

  if (!tosAccepted) {
    AppTosDialog(onTosAccepted = tosViewModel::acceptTos)
    return
  }

  @Composable
  fun RenderDestination(contentModifier: Modifier = Modifier) {
    when (shellUiState.destination) {
      OperatorShellDestination.CHAT ->
        OperatorHomeScreen(
          modelManagerViewModel = modelManagerViewModel,
          operatorShellViewModel = operatorShellViewModel,
          onOpenModels = { operatorShellViewModel.selectDestination(OperatorShellDestination.MODELS) },
          onOpenSettings = { operatorShellViewModel.selectDestination(OperatorShellDestination.SETTINGS) },
          modifier = contentModifier,
        )

      OperatorShellDestination.AUTOMATIONS ->
        OperatorAutomationsScreen(
          modelManagerViewModel = modelManagerViewModel,
          operatorShellViewModel = operatorShellViewModel,
          mobileActionsViewModel = mobileActionsViewModel,
          onOpenChat = { operatorShellViewModel.selectDestination(OperatorShellDestination.CHAT) },
          onOpenModels = { operatorShellViewModel.selectDestination(OperatorShellDestination.MODELS) },
          modifier = contentModifier,
        )

      OperatorShellDestination.MODELS ->
        OperatorModelsScreen(
          modelManagerViewModel = modelManagerViewModel,
          onOpenFullModelManager = onOpenFullModelManager,
          onOpenSettings = { operatorShellViewModel.selectDestination(OperatorShellDestination.SETTINGS) },
          modifier = contentModifier,
        )

      OperatorShellDestination.SETTINGS ->
        OperatorSettingsScreen(
          modelManagerViewModel = modelManagerViewModel,
          operatorShellViewModel = operatorShellViewModel,
          modifier = contentModifier,
        )
    }
  }

  if (isLargeScreen) {
    Row(modifier = modifier.fillMaxSize()) {
      NavigationRail(
        containerColor = MaterialTheme.colorScheme.surface,
      ) {
        OperatorShellDestination.entries.forEach { destination ->
          NavigationRailItem(
            selected = destination == shellUiState.destination,
            onClick = { operatorShellViewModel.selectDestination(destination) },
            icon = {
              DestinationBadgeIcon(
                destination = destination,
                pendingApproval = shellUiState.pendingApproval != null,
                setupProgress = shellUiState.setupProgress,
                isAutomationRunning = shellUiState.isRunningPhoneAutomation,
              )
            },
            label = { Text(text = stringResource(destination.labelRes())) },
            colors = NavigationRailItemDefaults.colors(
              selectedIconColor = MaterialTheme.colorScheme.primary,
              selectedTextColor = MaterialTheme.colorScheme.primary,
              indicatorColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.12f),
            ),
          )
        }
      }
      Box(modifier = Modifier.weight(1f)) {
        RenderDestination(Modifier.fillMaxSize())
      }
      if (shellUiState.destination == OperatorShellDestination.CHAT ||
        shellUiState.destination == OperatorShellDestination.AUTOMATIONS
      ) {
        OperatorShellUtilityPane(
          runtimeContext = shellUiState.runtimeContext,
          setupProgress = shellUiState.setupProgress,
          pendingApproval = shellUiState.pendingApproval != null,
          automationState = shellUiState.phoneAutomationState,
          onOpenRuntime = { operatorShellViewModel.openRuntimePicker(OperatorRuntimePickerTarget.DEFAULT) },
          onOpenModels = { operatorShellViewModel.selectDestination(OperatorShellDestination.MODELS) },
          modifier = Modifier.width(320.dp).fillMaxHeight(),
        )
      }
    }
  } else {
    Scaffold(
      modifier = modifier.fillMaxSize(),
      bottomBar = {
        NavigationBar(
          containerColor = MaterialTheme.colorScheme.surface,
        ) {
          OperatorShellDestination.entries.forEach { destination ->
            NavigationBarItem(
              selected = destination == shellUiState.destination,
              onClick = { operatorShellViewModel.selectDestination(destination) },
              icon = {
                DestinationBadgeIcon(
                  destination = destination,
                  pendingApproval = shellUiState.pendingApproval != null,
                  setupProgress = shellUiState.setupProgress,
                  isAutomationRunning = shellUiState.isRunningPhoneAutomation,
                )
              },
              label = { Text(text = stringResource(destination.labelRes())) },
              colors = NavigationBarItemDefaults.colors(
                selectedIconColor = MaterialTheme.colorScheme.primary,
                selectedTextColor = MaterialTheme.colorScheme.primary,
                indicatorColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.12f),
              ),
            )
          }
        }
      },
    ) { innerPadding ->
      RenderDestination(
        Modifier
          .fillMaxSize()
          .padding(innerPadding),
      )
    }
  }

  val runtimePickerTarget = shellUiState.runtimePicker.target
  val runtimePickerUsage = runtimePickerTarget.usage
  val runtimeAssignment = modelUiState.runtimeAssignments.assignmentFor(runtimePickerUsage)
  val selectedProvider =
    if (runtimePickerTarget == OperatorRuntimePickerTarget.DEFAULT) {
      modelUiState.activeChatProvider
    } else {
      runtimeAssignment.provider
    }
  val selectedModel =
    if (runtimePickerTarget == OperatorRuntimePickerTarget.DEFAULT) {
      modelUiState.activeChatModel
    } else {
      runtimeAssignment.model
    }
  val selectedSource =
    runtimeAssignment.source.ifBlank {
      if (runtimePickerUsage == OperatorRuntimeUsage.CHAT) modelUiState.cloudModelSource else ""
    }
  OperatorRuntimePickerSheet(
    pickerState = shellUiState.runtimePicker,
    providerOptions = modelUiState.providerOptions.map { providerId ->
      BaoEdgeChoiceOption(
        value = providerId,
        label = modelUiState.providerDisplayNames[providerId].orEmpty().ifBlank { providerId },
      )
    },
    sourceOptions = modelUiState.modelSourceOptions,
    selectedProvider = selectedProvider,
    selectedSource = selectedSource,
    selectedModel = selectedModel,
    modelOptions =
      if (modelUiState.cloudModelOptionsProvider == selectedProvider) {
        modelUiState.cloudModelOptions
      } else {
        emptyList()
      },
    modelDisplayNames = modelUiState.cloudModelDisplayNames,
    modelDescriptors = modelUiState.cloudModelDescriptors,
    downloadedModels = downloadedModels,
    requiredModelReadiness = requiredModelReadiness,
    onDismiss = operatorShellViewModel::closeRuntimePicker,
    onProviderSelected = { provider ->
      modelManagerViewModel.setRuntimeAssignmentProvider(runtimePickerUsage, provider)
    },
    onSourceSelected = { source ->
      modelManagerViewModel.setRuntimeAssignmentSource(runtimePickerUsage, source)
    },
    onLoadModels = { modelManagerViewModel.loadCloudModelsForRuntimeUsage(runtimePickerUsage) },
    onModelSelected = { model ->
      modelManagerViewModel.setRuntimeAssignmentModel(runtimePickerUsage, model)
      operatorShellViewModel.closeRuntimePicker()
    },
    onOpenModels = {
      operatorShellViewModel.closeRuntimePicker()
      operatorShellViewModel.selectDestination(OperatorShellDestination.MODELS)
    },
  )
}

@Composable
private fun DestinationBadgeIcon(
  destination: OperatorShellDestination,
  pendingApproval: Boolean,
  setupProgress: OperatorSetupProgress,
  isAutomationRunning: Boolean,
) {
  val badgeCount =
    when (destination) {
      OperatorShellDestination.CHAT -> if (setupProgress.isReady) 0 else 1
      OperatorShellDestination.AUTOMATIONS -> if (pendingApproval || isAutomationRunning) 1 else 0
      OperatorShellDestination.MODELS -> if (setupProgress.deviceReady) 0 else 1
      OperatorShellDestination.SETTINGS -> if (setupProgress.providerConnected && setupProgress.modelSelected) 0 else 1
    }
  BadgedBox(
    badge = {
      if (badgeCount > 0) {
        Badge { Text(badgeCount.toString()) }
      }
    },
  ) {
    Icon(destination.icon(), contentDescription = null)
  }
}

@Composable
private fun OperatorShellUtilityPane(
  runtimeContext: OperatorRuntimeContext,
  setupProgress: OperatorSetupProgress,
  pendingApproval: Boolean,
  automationState: FlowExecutionState,
  onOpenRuntime: () -> Unit,
  onOpenModels: () -> Unit,
  modifier: Modifier = Modifier,
) {
  LazyColumn(
    modifier = modifier.padding(horizontal = 12.dp, vertical = 16.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp),
  ) {
    item(key = "utility-runtime") {
      BaoEdgePanel(
        title = stringResource(R.string.operator_runtime_summary_title),
      ) {
        FlowRow(
          horizontalArrangement = Arrangement.spacedBy(8.dp),
          verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
          BaoEdgeChip(
            label = runtimeContext.provider.ifBlank { stringResource(R.string.operator_runtime_cta_provider_missing) },
            active = runtimeContext.provider.isNotBlank(),
            leadingIcon = Icons.Rounded.SettingsEthernet,
          )
          BaoEdgeChip(
            label = runtimeContext.model.ifBlank { stringResource(R.string.operator_runtime_cta_model_missing) },
            active = runtimeContext.model.isNotBlank(),
            leadingIcon = Icons.Rounded.Memory,
          )
        }
        BaoEdgePrimaryButton(
          label = stringResource(R.string.operator_runtime_picker_default_title),
          onClick = onOpenRuntime,
          leadingIcon = Icons.Rounded.AutoAwesome,
          modifier = Modifier.fillMaxWidth(),
        )
      }
    }
    item(key = "utility-status") {
      BaoEdgePanel(
        title = stringResource(R.string.operator_status_title),
      ) {
        BaoEdgeStatusCard(
          title = stringResource(R.string.operator_shell_chat),
          state = if (setupProgress.isReady) FlowExecutionState.SUCCESS else FlowExecutionState.LOADING,
          detail = stringResource(R.string.operator_runtime_cta_subtitle),
        )
        BaoEdgeStatusCard(
          title = stringResource(R.string.operator_shell_automations),
          state =
            when {
              pendingApproval -> FlowExecutionState.LOADING
              automationState != FlowExecutionState.IDLE -> automationState
              else -> FlowExecutionState.IDLE
            },
          detail =
            if (pendingApproval) {
              stringResource(R.string.operator_approval_title)
            } else {
              stringResource(R.string.operator_timeline_phone_title)
            },
        )
        BaoEdgeSecondaryButton(
          label = stringResource(R.string.operator_open_models),
          onClick = onOpenModels,
          leadingIcon = Icons.Rounded.Memory,
          modifier = Modifier.fillMaxWidth(),
        )
      }
    }
  }
}

private fun formatOperatorTimestamp(timestampMs: Long): String {
  if (timestampMs <= 0L) {
    return ""
  }
  return DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.SHORT).format(Date(timestampMs))
}

/** Dedicated Automations workspace for approvals, execution state, and recent run history. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun OperatorAutomationsScreen(
  modelManagerViewModel: ModelManagerViewModel,
  operatorShellViewModel: OperatorShellViewModel,
  mobileActionsViewModel: MobileActionsViewModel,
  onOpenChat: () -> Unit,
  onOpenModels: () -> Unit,
  modifier: Modifier = Modifier,
) {
  val shellUiState by operatorShellViewModel.uiState.collectAsState()
  val scope = rememberCoroutineScope()
  val automationWorkspace = shellUiState.automationWorkspace
  val phoneTimelineTitle = stringResource(R.string.operator_timeline_phone_title)
  val assistantTimelineTitle = stringResource(R.string.operator_timeline_assistant_title)
  val planTimelineTitle = stringResource(R.string.operator_timeline_plan_title)
  val phoneApprovalSubmittingMessage = stringResource(R.string.operator_phone_approval_submitting)
  val phoneApprovalDismissedMessage = stringResource(R.string.operator_phone_approval_dismissed)
  val userTimelineTitle = stringResource(R.string.operator_timeline_user_title)
  val runtimeTimelineTitle = stringResource(R.string.operator_timeline_runtime_title)
  val phoneStartingMessage = stringResource(R.string.operator_phone_starting)
  val phoneModelMissingMessage = stringResource(R.string.operator_phone_model_missing)
  val automationModel = modelManagerViewModel.getPreferredModelForTask(BuiltInTaskId.LLM_MOBILE_ACTIONS)
  val starterActions =
    listOf(
      OperatorStarterAction(
        id = "capture-flow",
        title = stringResource(R.string.operator_automation_recipe_capture),
        prompt = stringResource(R.string.operator_automation_recipe_capture_prompt),
        composerMode = OperatorComposerMode.AUTOMATION,
      ),
      OperatorStarterAction(
        id = "settings-check",
        title = stringResource(R.string.operator_automation_recipe_settings),
        prompt = stringResource(R.string.operator_automation_recipe_settings_prompt),
        composerMode = OperatorComposerMode.AUTOMATION,
      ),
      OperatorStarterAction(
        id = "plan",
        title = stringResource(R.string.operator_quick_start_plan),
        prompt = stringResource(R.string.operator_quick_start_automation_prompt),
        composerMode = OperatorComposerMode.AUTOMATION,
      ),
    )

  BaoEdgeScaffold(
    modifier = modifier,
    topBar = {
      GalleryTopAppBar(
        title = stringResource(R.string.operator_shell_automations),
        subtitle = "",
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
      val pendingApproval = shellUiState.pendingApproval
      if (pendingApproval != null) {
        item(key = "automation-alert") {
          BaoEdgePanel(
            title = stringResource(R.string.operator_approval_title),
            subtitle = stringResource(R.string.operator_approval_summary, pendingApproval.riskLevel.ifBlank { stringResource(R.string.operator_not_set) }, pendingApproval.commandCount),
          ) {
            Text(
              text = stringResource(R.string.operator_automation_approval_body),
              style = MaterialTheme.typography.bodyMedium,
              color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            OperatorApprovalCard(
              approval = pendingApproval,
              isSubmitting = shellUiState.isRunningPhoneAutomation,
              onApprove = {
                scope.launch {
                  operatorShellViewModel.startAutomation(phoneApprovalSubmittingMessage)
                  operatorShellViewModel.addTimelineEntry(
                    role = OperatorTimelineRole.RUN,
                    title = phoneTimelineTitle,
                    body = phoneApprovalSubmittingMessage,
                    state = FlowExecutionState.LOADING,
                  )
                  val result = mobileActionsViewModel.approveOperatorPrompt(approval = pendingApproval)
                  operatorShellViewModel.applyAutomationResult(
                    result = result,
                    assistantTitle = assistantTimelineTitle,
                    planTitle = planTimelineTitle,
                    phoneTitle = phoneTimelineTitle,
                  )
                }
              },
              onDismiss = { operatorShellViewModel.clearPendingApproval(phoneApprovalDismissedMessage) },
            )
          }
        }
      }

      item(key = "automation-sections") {
        BaoEdgePanel(title = null) {
          SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
            OperatorAutomationSection.entries.forEachIndexed { index, section ->
              SegmentedButton(
                shape =
                  SegmentedButtonDefaults.itemShape(
                    index = index,
                    count = OperatorAutomationSection.entries.size,
                  ),
                selected = automationWorkspace.activeSection == section,
                onClick = { operatorShellViewModel.selectAutomationSection(section) },
                label = {
                  Text(
                    when (section) {
                      OperatorAutomationSection.DRAFTS -> stringResource(R.string.operator_automation_section_drafts)
                      OperatorAutomationSection.RUNS -> stringResource(R.string.operator_automation_section_runs)
                      OperatorAutomationSection.SCHEDULES -> stringResource(R.string.operator_automation_section_schedules)
                      OperatorAutomationSection.APPROVALS -> stringResource(R.string.operator_automation_section_approvals)
                    },
                  )
                },
                icon = {
                  Icon(
                    when (section) {
                      OperatorAutomationSection.DRAFTS -> Icons.Rounded.AutoAwesome
                      OperatorAutomationSection.RUNS -> Icons.Rounded.History
                      OperatorAutomationSection.SCHEDULES -> Icons.Rounded.CalendarMonth
                      OperatorAutomationSection.APPROVALS -> Icons.Rounded.CheckCircle
                    },
                    contentDescription = null,
                  )
                },
              )
            }
          }
        }
      }

      item(key = "automation-plan") {
        BaoEdgePanel(
          title = stringResource(R.string.operator_automation_plan_title),
          subtitle = stringResource(R.string.operator_automation_plan_subtitle),
        ) {
          FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
          ) {
            starterActions.forEach { starter ->
              BaoEdgeChip(
                label = starter.title,
                active = false,
                leadingIcon = Icons.Rounded.AutoAwesome,
                onClick = {
                  operatorShellViewModel.setAutomationPrompt(starter.prompt)
                  operatorShellViewModel.setComposerMode(starter.composerMode)
                },
              )
            }
          }
          BaoEdgeInput(
            value = shellUiState.automationWorkspace.prompt.ifBlank { shellUiState.automationPrompt },
            onValueChange = operatorShellViewModel::setAutomationPrompt,
            label = stringResource(R.string.operator_automation_goal_label),
            placeholder = stringResource(R.string.operator_message_placeholder_automation),
            modifier = Modifier.fillMaxWidth(),
            minLines = 4,
          )
          FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
          ) {
            BaoEdgeSecondaryButton(
              label = stringResource(R.string.operator_automation_save_flow),
              onClick = { operatorShellViewModel.saveAutomationFlow(shellUiState.automationPrompt) },
              enabled = shellUiState.automationPrompt.isNotBlank(),
              leadingIcon = Icons.Rounded.AutoAwesome,
            )
            BaoEdgeSecondaryButton(
              label = stringResource(R.string.operator_shell_chat),
              onClick = onOpenChat,
              leadingIcon = Icons.Rounded.ChatBubbleOutline,
            )
            BaoEdgeSecondaryButton(
              label = stringResource(R.string.operator_shell_models),
              onClick = onOpenModels,
              leadingIcon = Icons.Rounded.Memory,
            )
          }
          if (automationModel == null) {
            Text(
              text = phoneModelMissingMessage,
              color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            BaoEdgeSecondaryButton(
              label = stringResource(R.string.operator_open_models),
              onClick = onOpenModels,
              leadingIcon = Icons.Rounded.Memory,
              modifier = Modifier.fillMaxWidth(),
            )
          } else {
            FlowRow(
              horizontalArrangement = Arrangement.spacedBy(8.dp),
              verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
              BaoEdgeChip(
                label = stringResource(R.string.operator_runtime_local_model_value, automationModel.name),
                active = true,
                leadingIcon = Icons.Rounded.Memory,
              )
              BaoEdgeChip(
                label = stringResource(R.string.operator_status_phone),
                active = shellUiState.phoneAutomationState == FlowExecutionState.SUCCESS,
                leadingIcon = Icons.Rounded.PhoneAndroid,
              )
            }
          }
          BaoEdgePrimaryButton(
            label = stringResource(R.string.operator_automation_run_cta),
            onClick = {
              val outboundPrompt = shellUiState.automationPrompt.trim()
              if (outboundPrompt.isBlank()) {
                return@BaoEdgePrimaryButton
              }
              operatorShellViewModel.addTimelineEntry(
                role = OperatorTimelineRole.USER,
                title = userTimelineTitle,
                body = outboundPrompt,
                state = FlowExecutionState.SUCCESS,
              )
              scope.launch {
                val activeAutomationModel = modelManagerViewModel.getPreferredModelForTask(BuiltInTaskId.LLM_MOBILE_ACTIONS)
                if (activeAutomationModel == null) {
                  operatorShellViewModel.clearPendingApproval(statusMessage = phoneModelMissingMessage)
                  operatorShellViewModel.addTimelineEntry(
                    role = OperatorTimelineRole.RUN,
                    title = phoneTimelineTitle,
                    body = phoneModelMissingMessage,
                    state = FlowExecutionState.ERROR_NON_RETRYABLE,
                  )
                  return@launch
                }
                operatorShellViewModel.startAutomation(phoneStartingMessage)
                operatorShellViewModel.addTimelineEntry(
                  role = OperatorTimelineRole.RUN,
                  title = runtimeTimelineTitle,
                  body = phoneStartingMessage,
                  state = FlowExecutionState.LOADING,
                )
                val result =
                  mobileActionsViewModel.executeOperatorPrompt(
                    model = activeAutomationModel,
                    userPrompt = outboundPrompt,
                    modelManagerViewModel = modelManagerViewModel,
                  )
                operatorShellViewModel.applyAutomationResult(
                  result = result,
                  assistantTitle = assistantTimelineTitle,
                  planTitle = planTimelineTitle,
                  phoneTitle = phoneTimelineTitle,
                )
              }
            },
            enabled = !shellUiState.isRunningPhoneAutomation && shellUiState.automationPrompt.isNotBlank() && automationModel != null,
            leadingIcon = Icons.Rounded.PhoneAndroid,
            modifier = Modifier.fillMaxWidth(),
          )
        }
      }

      when (automationWorkspace.activeSection) {
        OperatorAutomationSection.DRAFTS -> {
          item(key = "automation-drafts") {
            OperatorAutomationDraftsPanel(
              flows = automationWorkspace.savedFlows,
              onOpenFlow = { operatorShellViewModel.openAutomationFlow(it) },
              onScheduleDaily = {
                operatorShellViewModel.openAutomationFlow(
                  flowId = it,
                  section = OperatorAutomationSection.SCHEDULES,
                )
                operatorShellViewModel.createScheduleForSelectedFlow(OperatorAutomationTriggerType.DAILY)
              },
              onScheduleWeekly = {
                operatorShellViewModel.openAutomationFlow(
                  flowId = it,
                  section = OperatorAutomationSection.SCHEDULES,
                )
                operatorShellViewModel.createScheduleForSelectedFlow(OperatorAutomationTriggerType.WEEKLY)
              },
            )
          }
        }

        OperatorAutomationSection.RUNS -> {
          item(key = "automation-runs") {
            if (shellUiState.timeline.isEmpty()) {
              BaoEdgePanel(title = stringResource(R.string.operator_timeline_title)) {
                Text(
                  text = stringResource(R.string.operator_automation_empty),
                  style = MaterialTheme.typography.bodyMedium,
                  color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
              }
            } else {
              OperatorTimelineCard(entries = shellUiState.timeline)
            }
          }
        }

        OperatorAutomationSection.SCHEDULES -> {
          item(key = "automation-schedules") {
            OperatorAutomationSchedulesPanel(
              selectedFlow =
                automationWorkspace.savedFlows.firstOrNull {
                  it.id == automationWorkspace.selectedFlowId
                },
              schedules = automationWorkspace.schedules,
              onCreateDaily = {
                operatorShellViewModel.createScheduleForSelectedFlow(OperatorAutomationTriggerType.DAILY)
              },
              onCreateWeekly = {
                operatorShellViewModel.createScheduleForSelectedFlow(OperatorAutomationTriggerType.WEEKLY)
              },
              onToggleSchedule = operatorShellViewModel::toggleScheduleStatus,
              onOpenDrafts = { operatorShellViewModel.selectAutomationSection(OperatorAutomationSection.DRAFTS) },
            )
          }
        }

        OperatorAutomationSection.APPROVALS -> {
          item(key = "automation-controls") {
            BaoEdgePanel(
              title = stringResource(R.string.operator_automation_controls_title),
            ) {
              if (pendingApproval == null) {
                Text(
                  text = stringResource(R.string.operator_automation_approvals_empty),
                  style = MaterialTheme.typography.bodyMedium,
                  color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
              } else {
                OperatorApprovalCard(
                  approval = pendingApproval,
                  isSubmitting = shellUiState.isRunningPhoneAutomation,
                  onApprove = {
                    scope.launch {
                      operatorShellViewModel.startAutomation(phoneApprovalSubmittingMessage)
                      operatorShellViewModel.addTimelineEntry(
                        role = OperatorTimelineRole.RUN,
                        title = phoneTimelineTitle,
                        body = phoneApprovalSubmittingMessage,
                        state = FlowExecutionState.LOADING,
                      )
                      val result = mobileActionsViewModel.approveOperatorPrompt(approval = pendingApproval)
                      operatorShellViewModel.applyAutomationResult(
                        result = result,
                        assistantTitle = assistantTimelineTitle,
                        planTitle = planTimelineTitle,
                        phoneTitle = phoneTimelineTitle,
                      )
                    }
                  },
                  onDismiss = { operatorShellViewModel.clearPendingApproval(phoneApprovalDismissedMessage) },
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
private fun OperatorAutomationDraftsPanel(
  flows: List<OperatorAutomationFlowSummary>,
  onOpenFlow: (String) -> Unit,
  onScheduleDaily: (String) -> Unit,
  onScheduleWeekly: (String) -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.operator_automation_drafts_title),
    subtitle = stringResource(R.string.operator_automation_drafts_subtitle),
  ) {
    if (flows.isEmpty()) {
      Text(
        text = stringResource(R.string.operator_automation_drafts_empty),
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    } else {
      Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        flows.forEach { flow ->
          BaoEdgePanel(title = flow.title) {
            Text(
              text = flow.goal,
              style = MaterialTheme.typography.bodyMedium,
              color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            FlowRow(
              horizontalArrangement = Arrangement.spacedBy(8.dp),
              verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
              BaoEdgeSecondaryButton(
                label = stringResource(R.string.operator_automation_open_draft),
                onClick = { onOpenFlow(flow.id) },
                leadingIcon = Icons.Rounded.AutoAwesome,
              )
              BaoEdgeSecondaryButton(
                label = stringResource(R.string.operator_automation_schedule_daily),
                onClick = { onScheduleDaily(flow.id) },
                leadingIcon = Icons.Rounded.Schedule,
              )
              BaoEdgeSecondaryButton(
                label = stringResource(R.string.operator_automation_schedule_weekly),
                onClick = { onScheduleWeekly(flow.id) },
                leadingIcon = Icons.Rounded.CalendarMonth,
              )
            }
          }
        }
      }
    }
  }
}

@Composable
private fun OperatorAutomationSchedulesPanel(
  selectedFlow: OperatorAutomationFlowSummary?,
  schedules: List<OperatorAutomationScheduleSummary>,
  onCreateDaily: () -> Unit,
  onCreateWeekly: () -> Unit,
  onToggleSchedule: (String) -> Unit,
  onOpenDrafts: () -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.operator_automation_schedules_title),
    subtitle = stringResource(R.string.operator_automation_schedules_subtitle),
  ) {
    Text(
      text = stringResource(R.string.operator_automation_schedules_disclaimer),
      style = MaterialTheme.typography.bodySmall,
      color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f),
    )
    if (selectedFlow == null) {
      Text(
        text = stringResource(R.string.operator_automation_schedule_select_flow),
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
      BaoEdgeSecondaryButton(
        label = stringResource(R.string.operator_automation_open_drafts),
        onClick = onOpenDrafts,
        leadingIcon = Icons.Rounded.AutoAwesome,
      )
    } else {
      FlowRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
      ) {
        BaoEdgeChip(
          label = selectedFlow.title,
          active = true,
          leadingIcon = Icons.Rounded.AutoAwesome,
        )
        BaoEdgeSecondaryButton(
          label = stringResource(R.string.operator_automation_schedule_daily),
          onClick = onCreateDaily,
          leadingIcon = Icons.Rounded.Schedule,
        )
        BaoEdgeSecondaryButton(
          label = stringResource(R.string.operator_automation_schedule_weekly),
          onClick = onCreateWeekly,
          leadingIcon = Icons.Rounded.CalendarMonth,
        )
      }
    }

    if (schedules.isEmpty()) {
      Text(
        text = stringResource(R.string.operator_automation_schedules_empty),
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    } else {
      Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        schedules.forEach { schedule ->
          BaoEdgePanel(title = schedule.flowTitle) {
            BaoEdgeStatusCard(
              title =
                when (schedule.trigger.type) {
                  OperatorAutomationTriggerType.ONE_OFF -> stringResource(R.string.operator_automation_schedule_one_off)
                  OperatorAutomationTriggerType.DAILY -> stringResource(R.string.operator_automation_schedule_daily)
                  OperatorAutomationTriggerType.WEEKLY -> stringResource(R.string.operator_automation_schedule_weekly)
                },
              state =
                when (schedule.status) {
                  OperatorAutomationScheduleStatus.ACTIVE -> FlowExecutionState.SUCCESS
                  OperatorAutomationScheduleStatus.PAUSED -> FlowExecutionState.IDLE
                  OperatorAutomationScheduleStatus.FAILED,
                  OperatorAutomationScheduleStatus.NEEDS_ATTENTION -> FlowExecutionState.ERROR_RETRYABLE
                },
              detail = stringResource(R.string.operator_automation_schedule_next_run, formatOperatorTimestamp(schedule.trigger.nextRunAtMs)),
            )
            BaoEdgeSecondaryButton(
              label =
                if (schedule.status == OperatorAutomationScheduleStatus.ACTIVE) {
                  stringResource(R.string.operator_automation_schedule_pause)
                } else {
                  stringResource(R.string.operator_automation_schedule_resume)
                },
              onClick = { onToggleSchedule(schedule.id) },
              leadingIcon = Icons.Rounded.Schedule,
            )
          }
        }
      }
    }
  }
}

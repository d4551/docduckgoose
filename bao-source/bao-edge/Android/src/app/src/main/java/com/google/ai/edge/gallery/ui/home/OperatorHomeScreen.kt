package com.google.ai.edge.gallery.ui.home

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.VolumeOff
import androidx.compose.material.icons.automirrored.rounded.VolumeUp
import androidx.compose.material.icons.automirrored.rounded.ArrowForward
import androidx.compose.material.icons.rounded.ArrowOutward
import androidx.compose.material.icons.rounded.Subject
import androidx.compose.material.icons.rounded.AutoAwesome
import androidx.compose.material.icons.rounded.ChatBubbleOutline
import androidx.compose.material.icons.rounded.CheckCircle
import androidx.compose.material.icons.rounded.Close
import androidx.compose.material.icons.rounded.Image
import androidx.compose.material.icons.rounded.Memory
import androidx.compose.material.icons.rounded.MoreVert
import androidx.compose.material.icons.rounded.Mic
import androidx.compose.material.icons.rounded.SettingsEthernet
import androidx.compose.material.icons.rounded.Warning
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilledTonalIconButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.graphics.asImageBitmap
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.customtasks.mobileactions.OperatorApprovalRequest
import com.google.ai.edge.gallery.data.BuiltInTaskId
import com.google.ai.edge.gallery.data.Task
import com.google.ai.edge.gallery.ui.common.chat.AudioRecorderPanel
import com.google.ai.edge.gallery.ui.common.textandvoiceinput.HoldToDictate
import com.google.ai.edge.gallery.ui.common.textandvoiceinput.HoldToDictateViewModel
import com.google.ai.edge.gallery.ui.common.textandvoiceinput.VoiceRecognizerOverlay
import com.google.ai.edge.gallery.ui.modelmanager.ModelManagerViewModel
import com.google.ai.edge.gallery.ui.modelmanager.OperatorRuntimeSummary
import com.google.ai.edge.gallery.ui.modelmanager.RequiredModelReadiness
import com.google.ai.edge.gallery.ui.modelmanager.RequiredModelReadinessState
import com.google.ai.edge.gallery.ui.theme.BaoEdgeShape
import com.google.ai.edge.gallery.ui.theme.customColors
import com.baohaus.baoedge.core.flow.FlowExecutionState
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.text.DateFormat
import java.util.Date
import java.util.Locale

private fun OperatorComposerMode.labelResId(): Int =
  when (this) {
    OperatorComposerMode.CHAT -> R.string.operator_shell_chat
    OperatorComposerMode.IMAGE -> R.string.settings_runtime_usage_image
    OperatorComposerMode.AUDIO -> R.string.settings_runtime_usage_speech_input
    OperatorComposerMode.AUTOMATION -> R.string.operator_shell_automations
  }

private fun OperatorComposerMode.placeholderResId(): Int =
  when (this) {
    OperatorComposerMode.CHAT -> R.string.operator_message_placeholder
    OperatorComposerMode.IMAGE -> R.string.operator_message_placeholder_image
    OperatorComposerMode.AUDIO -> R.string.operator_message_placeholder_audio
    OperatorComposerMode.AUTOMATION -> R.string.operator_message_placeholder_automation
  }

private fun OperatorComposerMode.icon(): androidx.compose.ui.graphics.vector.ImageVector =
  when (this) {
    OperatorComposerMode.CHAT -> Icons.Rounded.ChatBubbleOutline
    OperatorComposerMode.IMAGE -> Icons.Rounded.Image
    OperatorComposerMode.AUDIO -> Icons.Rounded.Mic
    OperatorComposerMode.AUTOMATION -> Icons.Rounded.AutoAwesome
  }

internal fun shouldAutoSendLaunchPrompt(
  pendingLaunchAutoSend: Boolean,
  messageDraft: String,
  isSending: Boolean,
  providerReady: Boolean,
  modelReady: Boolean,
  nativeIntentSupported: Boolean,
): Boolean {
  if (!pendingLaunchAutoSend || messageDraft.isBlank() || isSending) {
    return false
  }
  return nativeIntentSupported || (providerReady && modelReady)
}

/** Primary entry surface for conversational RPA operations. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OperatorHomeScreen(
  modelManagerViewModel: ModelManagerViewModel,
  operatorShellViewModel: OperatorShellViewModel,
  onOpenModels: () -> Unit,
  onOpenSettings: () -> Unit,
  modifier: Modifier = Modifier,
) {
  val uiState by modelManagerViewModel.uiState.collectAsState()
  val shellUiState by operatorShellViewModel.uiState.collectAsState()
  val listState = rememberLazyListState()
  val holdToDictateViewModel: HoldToDictateViewModel = hiltViewModel()
  val holdToDictateUiState by holdToDictateViewModel.uiState.collectAsState()
  var curAmplitude by remember { mutableIntStateOf(0) }

  LaunchedEffect(
    uiState.activeChatProvider,
    uiState.cloudModelOptions,
    uiState.cloudModelOptionsProvider,
    uiState.isLoadingCloudModels,
  ) {
    if (
      uiState.activeChatProvider.isNotBlank() &&
        (
          uiState.cloudModelOptions.isEmpty() ||
            uiState.cloudModelOptionsProvider != uiState.activeChatProvider
        ) &&
        !uiState.isLoadingCloudModels
    ) {
      modelManagerViewModel.loadCloudModelsForSelectedProvider()
    }
  }

  LaunchedEffect(uiState.controlPlaneBaseUrl) {
    operatorShellViewModel.ensureConversationHistoryLoaded(baseUrl = uiState.controlPlaneBaseUrl)
  }

  LaunchedEffect(
    shellUiState.pendingLaunchAutoSend,
    shellUiState.messageDraft,
    shellUiState.runtimeContext.provider,
    shellUiState.runtimeContext.model,
    uiState.controlPlaneBaseUrl,
    uiState.selectedProviderProfileId,
    uiState.providerBaseUrl,
  ) {
    if (
      !shouldAutoSendLaunchPrompt(
        pendingLaunchAutoSend = shellUiState.pendingLaunchAutoSend,
        messageDraft = shellUiState.messageDraft,
        isSending = shellUiState.isSending,
        providerReady = shellUiState.runtimeContext.provider.isNotBlank(),
        modelReady = shellUiState.runtimeContext.model.isNotBlank(),
        nativeIntentSupported = operatorShellViewModel.supportsNativeIntent(shellUiState.messageDraft),
      )
    ) {
      return@LaunchedEffect
    }
    operatorShellViewModel.markLaunchAutoSendConsumed()
    operatorShellViewModel.sendMessage(
      baseUrl = uiState.controlPlaneBaseUrl,
      activeProviderProfileId = uiState.selectedProviderProfileId,
      providerBaseUrl = uiState.providerBaseUrl,
    )
  }

  LaunchedEffect(
    uiState.controlPlaneBaseUrl,
    uiState.cloudModelSource,
    uiState.activeChatProvider,
    uiState.activeChatModel,
    uiState.cloudChatRequestTts,
  ) {
    operatorShellViewModel.syncRuntimeContext(
      controlPlaneBaseUrl = uiState.controlPlaneBaseUrl,
      runtimeContext =
        OperatorRuntimeContext(
          source = uiState.cloudModelSource,
          provider = uiState.activeChatProvider,
          model = uiState.activeChatModel,
          voiceInput = true,
          voiceOutput = uiState.cloudChatRequestTts,
          automation = true,
        ),
      requestTts = uiState.cloudChatRequestTts,
    )
  }

  LaunchedEffect(
    shellUiState.runtimeContext.provider,
    shellUiState.runtimeContext.model,
    shellUiState.runtimeContext.source,
  ) {
    val runtimeContext = shellUiState.runtimeContext
    if (
      runtimeContext.provider.isBlank() &&
        runtimeContext.model.isBlank() &&
        runtimeContext.source.isBlank()
    ) {
      return@LaunchedEffect
    }
    if (runtimeContext.provider.isNotBlank() && runtimeContext.provider != uiState.activeChatProvider) {
      modelManagerViewModel.setActiveChatProvider(runtimeContext.provider)
    }
    if (runtimeContext.source.isNotBlank() && runtimeContext.source != uiState.cloudModelSource) {
      modelManagerViewModel.setRuntimeAssignmentSource(
        usage = com.google.ai.edge.gallery.data.OperatorRuntimeUsage.CHAT,
        source = runtimeContext.source,
      )
    }
    if (runtimeContext.model.isNotBlank() && runtimeContext.model != uiState.activeChatModel) {
      modelManagerViewModel.setActiveChatModel(runtimeContext.model)
    }
  }

  val runtimeSummary = modelManagerViewModel.buildOperatorRuntimeSummary()
  val requiredModelReadiness = modelManagerViewModel.buildRequiredModelReadiness()
  val localChatTask = modelManagerViewModel.getTaskById(BuiltInTaskId.LLM_CHAT)
  val audioTask = modelManagerViewModel.getTaskById(BuiltInTaskId.LLM_ASK_AUDIO)
  val voiceLabel =
    holdToDictateUiState.selectedLanguageTag.takeIf(String::isNotBlank)?.let { languageTag ->
      Locale.forLanguageTag(languageTag)
        .getDisplayName(Locale.getDefault())
        .replaceFirstChar { character ->
          if (character.isLowerCase()) character.titlecase(Locale.getDefault()) else character.toString()
        }
    }.orEmpty().ifBlank { stringResource(R.string.operator_voice_status_unavailable) }
  val setupProgress =
    OperatorSetupProgress(
      providerConnected = uiState.activeChatProvider.isNotBlank(),
      modelSelected = uiState.activeChatModel.isNotBlank(),
      deviceReady =
        requiredModelReadiness.state == RequiredModelReadinessState.READY ||
          requiredModelReadiness.state == RequiredModelReadinessState.IN_USE,
    )

  LaunchedEffect(setupProgress) {
    operatorShellViewModel.updateSetupProgress(
      providerConnected = setupProgress.providerConnected,
      modelSelected = setupProgress.modelSelected,
      deviceReady = setupProgress.deviceReady,
    )
  }

  val displayComposerMode =
    when {
      shellUiState.composerMode == OperatorComposerMode.AUTOMATION -> OperatorComposerMode.CHAT
      shellUiState.composerMode == OperatorComposerMode.IMAGE && !runtimeSummary.supportsImageInput ->
        OperatorComposerMode.CHAT
      shellUiState.composerMode == OperatorComposerMode.AUDIO &&
        !holdToDictateUiState.recognitionAvailable &&
        !runtimeSummary.supportsAudioInput ->
        OperatorComposerMode.CHAT
      else -> shellUiState.composerMode
    }

  LaunchedEffect(runtimeSummary.supportsImageInput, holdToDictateUiState.recognitionAvailable, runtimeSummary.supportsAudioInput) {
    val mode = shellUiState.composerMode
    if (
      (mode == OperatorComposerMode.IMAGE && !runtimeSummary.supportsImageInput) ||
        (mode == OperatorComposerMode.AUDIO && !holdToDictateUiState.recognitionAvailable && !runtimeSummary.supportsAudioInput)
    ) {
      operatorShellViewModel.setComposerMode(OperatorComposerMode.CHAT)
    }
  }

  BaoEdgeScaffold(
    modifier = modifier,
    topBar = {
      OperatorChatTopBar(
        conversationId = shellUiState.conversationId,
        conversationThreads = shellUiState.conversationThreads,
        isLoadingThreads = shellUiState.isLoadingConversationThreads,
        runtimeSummary = runtimeSummary,
        setupProgress = setupProgress,
        requiredModelReadiness = requiredModelReadiness,
        messageDraft = shellUiState.messageDraft,
        onConversationSelected = { conversationId ->
          operatorShellViewModel.selectConversation(
            baseUrl = uiState.controlPlaneBaseUrl,
            conversationId = conversationId,
          )
        },
        onRefreshThreads = {
          operatorShellViewModel.refreshConversationHistory(baseUrl = uiState.controlPlaneBaseUrl)
        },
        onNewThread = operatorShellViewModel::startNewConversation,
        onClearThread = {
          operatorShellViewModel.clearActiveConversation(baseUrl = uiState.controlPlaneBaseUrl)
        },
        onOpenRuntimePicker = {
          operatorShellViewModel.openRuntimePicker(OperatorRuntimePickerTarget.DEFAULT)
        },
        onOpenModels = onOpenModels,
        onSaveAsFlow = operatorShellViewModel::saveAutomationFlow,
        onOpenAutomations = operatorShellViewModel::handoffChatDraftToAutomations,
      )
    },
  ) { innerPadding ->
    Box(modifier = Modifier.fillMaxSize()) {
      Column(
        modifier = Modifier.fillMaxSize(),
      ) {
        LazyColumn(
          state = listState,
          modifier = Modifier
            .weight(1f)
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.background),
          contentPadding = PaddingValues(
            start = 16.dp,
            end = 16.dp,
            top = innerPadding.calculateTopPadding() + 12.dp,
            bottom = 16.dp,
          ),
          verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
          val pendingApproval = shellUiState.pendingApproval
          if (pendingApproval != null) {
            item(key = "approval") {
              OperatorApprovalCard(
                approval = pendingApproval,
                isSubmitting = shellUiState.isRunningPhoneAutomation,
                onApprove = {},
                onDismiss = { operatorShellViewModel.clearPendingApproval() },
              )
            }
          }
          if (shellUiState.timeline.isEmpty()) {
            item(key = "quick-start") {
              OperatorQuickStartDeck(
                supportsImageInput = runtimeSummary.supportsImageInput,
                supportsAudioInput = runtimeSummary.supportsAudioInput,
                onStarterSelected = { starter ->
                  if (starter.composerMode == OperatorComposerMode.AUTOMATION) {
                    operatorShellViewModel.handoffWithPrompt(starter.prompt)
                  } else {
                    operatorShellViewModel.setComposerMode(starter.composerMode)
                    operatorShellViewModel.setMessageDraft(starter.prompt)
                  }
                },
              )
            }
          } else {
            item(key = "timeline") {
              OperatorTimelineCard(entries = shellUiState.timeline)
            }
            item(key = "contextual-chips") {
              OperatorContextualChips(
                timeline = shellUiState.timeline,
                supportsImageInput = runtimeSummary.supportsImageInput,
                onChipSelected = { starter ->
                  operatorShellViewModel.setComposerMode(starter.composerMode)
                  operatorShellViewModel.setMessageDraft(starter.prompt)
                },
              )
            }
          }
        }
        OperatorComposerHeroCard(
          composerMode = displayComposerMode,
          message = shellUiState.messageDraft,
          pickedImages = shellUiState.pickedImages,
          requestTts = shellUiState.requestTts,
          voiceLabel = voiceLabel,
          speechRecognitionAvailable = holdToDictateUiState.recognitionAvailable,
          supportsImageInput = runtimeSummary.supportsImageInput,
          supportsAudioInput = runtimeSummary.supportsAudioInput,
          isSending = shellUiState.isSending,
          localChatTask = localChatTask,
          audioTask = audioTask,
          holdToDictateViewModel = holdToDictateViewModel,
          onMessageChanged = operatorShellViewModel::setMessageDraft,
          onRequestTtsChanged = modelManagerViewModel::setCloudChatRequestTts,
          onComposerModeSelected = { mode ->
            if (mode != OperatorComposerMode.AUTOMATION) {
              operatorShellViewModel.setComposerMode(mode)
            }
          },
          onOpenSettings = onOpenSettings,
          onAmplitudeChanged = { curAmplitude = it },
          onRemoveImage = { bitmap ->
            operatorShellViewModel.setPickedImages(shellUiState.pickedImages.filter { it != bitmap })
          },
          onImagesSelected = { bitmaps ->
            operatorShellViewModel.appendPickedImages(bitmaps)
          },
          onSendMessage = {
            operatorShellViewModel.sendMessage(
              baseUrl = uiState.controlPlaneBaseUrl,
              activeProviderProfileId = uiState.selectedProviderProfileId,
              providerBaseUrl = uiState.providerBaseUrl,
            )
          },
          onSendAudio = { audioBytes ->
            operatorShellViewModel.sendMessageWithAudio(
              baseUrl = uiState.controlPlaneBaseUrl,
              activeProviderProfileId = uiState.selectedProviderProfileId,
              providerBaseUrl = uiState.providerBaseUrl,
              audioBytes = audioBytes,
            )
          },
          modifier = Modifier.padding(
            start = 16.dp,
            end = 16.dp,
            bottom = innerPadding.calculateBottomPadding() + 16.dp,
          ),
        )
      }
      AnimatedVisibility(
        holdToDictateUiState.recognizing,
        enter = fadeIn(animationSpec = tween(durationMillis = 150, easing = FastOutSlowInEasing)),
        exit = fadeOut(animationSpec = tween(durationMillis = 100, easing = FastOutSlowInEasing, delayMillis = 300)),
      ) {
        localChatTask?.let { task ->
          VoiceRecognizerOverlay(
            task = task,
            viewModel = holdToDictateViewModel,
            bottomPadding = innerPadding.calculateBottomPadding(),
            curAmplitude = curAmplitude,
          )
        }
      }
    }
  }
}

/** Slim top bar for chat: thread switcher, compact runtime summary, readiness indicator, overflow. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun OperatorChatTopBar(
  conversationId: String,
  conversationThreads: List<OperatorConversationThreadSummary>,
  isLoadingThreads: Boolean,
  runtimeSummary: OperatorRuntimeSummary,
  setupProgress: OperatorSetupProgress,
  requiredModelReadiness: RequiredModelReadiness,
  messageDraft: String,
  onConversationSelected: (String) -> Unit,
  onRefreshThreads: () -> Unit,
  onNewThread: () -> Unit,
  onClearThread: () -> Unit,
  onOpenRuntimePicker: () -> Unit,
  onOpenModels: () -> Unit,
  onSaveAsFlow: () -> Unit,
  onOpenAutomations: () -> Unit,
) {
  val selectedThreadLabel =
    conversationThreads.firstOrNull { it.id == conversationId }?.title
      ?: conversationId.takeIf(String::isNotBlank)?.take(8)
      ?: stringResource(R.string.operator_thread_new_value)
  var threadPickerExpanded by rememberSaveable { mutableStateOf(false) }
  var overflowExpanded by rememberSaveable { mutableStateOf(false) }
  val statusColor =
    if (runtimeSummary.runtimeReady && setupProgress.isReady) {
      MaterialTheme.customColors.successColor
    } else {
      MaterialTheme.colorScheme.error
    }
  val runtimeLabel =
    buildString {
      val provider = runtimeSummary.activeProvider.ifBlank { stringResource(R.string.operator_runtime_cta_provider_missing) }
      val model = runtimeSummary.activeCloudModel.ifBlank { stringResource(R.string.operator_runtime_cta_model_missing) }
      append(provider)
      if (runtimeSummary.activeCloudModel.isNotBlank()) {
        append(" · ")
        append(model)
      }
    }

  CenterAlignedTopAppBar(
    title = {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalAlignment = Alignment.CenterVertically,
      ) {
        Icon(
          painterResource(R.drawable.logo),
          modifier = Modifier.size(20.dp),
          contentDescription = stringResource(R.string.cd_app_logo),
          tint = androidx.compose.ui.graphics.Color.Unspecified,
        )
        Row(
          modifier = Modifier.weight(1f),
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
          Box(
            modifier = Modifier
              .size(8.dp)
              .clip(CircleShape)
              .background(statusColor),
          )
          Box {
            BaoEdgeChip(
              label = selectedThreadLabel,
              active = conversationId.isNotBlank(),
              leadingIcon = Icons.Rounded.ChatBubbleOutline,
              onClick = { threadPickerExpanded = true },
            )
            DropdownMenu(
              expanded = threadPickerExpanded,
              onDismissRequest = { threadPickerExpanded = false },
            ) {
            when {
              isLoadingThreads -> {
                DropdownMenuItem(
                  text = { Text(stringResource(R.string.operator_thread_loading)) },
                  onClick = { threadPickerExpanded = false },
                  enabled = false,
                )
              }
              conversationThreads.isEmpty() -> {
                DropdownMenuItem(
                  text = { Text(stringResource(R.string.operator_thread_history_empty)) },
                  onClick = { threadPickerExpanded = false },
                  enabled = false,
                )
              }
              else -> {
                conversationThreads.forEach { thread ->
                  DropdownMenuItem(
                    text = {
                      Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                        Text(thread.title)
                        if (thread.runtimeLabel.isNotBlank()) {
                          Text(
                            thread.runtimeLabel,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                          )
                        }
                      }
                    },
                    onClick = {
                      threadPickerExpanded = false
                      onConversationSelected(thread.id)
                    },
                  )
                }
              }
            }
            DropdownMenuItem(
              text = { Text(stringResource(R.string.operator_refresh_threads)) },
              onClick = {
                threadPickerExpanded = false
                onRefreshThreads()
              },
            )
            }
          }
          Text(
            text = runtimeLabel,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            modifier = Modifier.widthIn(max = 120.dp),
          )
        }
        if (!setupProgress.isReady) {
          BaoEdgeChip(
            label = requiredModelReadiness.title,
            active = false,
            leadingIcon = Icons.Rounded.Warning,
            onClick = onOpenModels,
          )
        }
        IconButton(onClick = { overflowExpanded = true }) {
          Icon(Icons.Rounded.MoreVert, contentDescription = stringResource(R.string.cd_more_options))
        }
        DropdownMenu(
          expanded = overflowExpanded,
          onDismissRequest = { overflowExpanded = false },
        ) {
          DropdownMenuItem(
            text = { Text(stringResource(R.string.operator_start_new_thread)) },
            onClick = {
              overflowExpanded = false
              onNewThread()
            },
          )
          DropdownMenuItem(
            text = { Text(stringResource(R.string.operator_clear_chat_history)) },
            onClick = {
              overflowExpanded = false
              onClearThread()
            },
          )
          DropdownMenuItem(
            text = { Text(stringResource(R.string.operator_runtime_picker_default_title)) },
            onClick = {
              overflowExpanded = false
              onOpenRuntimePicker()
            },
          )
          if (messageDraft.isNotBlank()) {
            DropdownMenuItem(
              text = { Text(stringResource(R.string.operator_automation_save_flow)) },
              onClick = {
                overflowExpanded = false
                onSaveAsFlow()
              },
            )
            DropdownMenuItem(
              text = { Text(stringResource(R.string.operator_automation_open_workspace)) },
              onClick = {
                overflowExpanded = false
                onOpenAutomations()
              },
            )
          }
        }
      }
    },
    colors = TopAppBarDefaults.topAppBarColors(
      containerColor = MaterialTheme.colorScheme.surface,
      titleContentColor = MaterialTheme.colorScheme.onSurface,
    ),
  )
}

@Composable
private fun OperatorComposerHeroCard(
  composerMode: OperatorComposerMode,
  message: String,
  pickedImages: List<android.graphics.Bitmap>,
  requestTts: Boolean,
  voiceLabel: String,
  speechRecognitionAvailable: Boolean,
  supportsImageInput: Boolean,
  supportsAudioInput: Boolean,
  isSending: Boolean,
  localChatTask: Task?,
  audioTask: Task?,
  holdToDictateViewModel: HoldToDictateViewModel,
  onMessageChanged: (String) -> Unit,
  onRequestTtsChanged: (Boolean) -> Unit,
  onComposerModeSelected: (OperatorComposerMode) -> Unit,
  onOpenSettings: () -> Unit,
  onAmplitudeChanged: (Int) -> Unit,
  onRemoveImage: (android.graphics.Bitmap) -> Unit,
  onImagesSelected: (List<android.graphics.Bitmap>) -> Unit,
  onSendMessage: () -> Unit,
  onSendAudio: (ByteArray) -> Unit,
  modifier: Modifier = Modifier,
) {
  val context = androidx.compose.ui.platform.LocalContext.current
  val scope = rememberCoroutineScope()
  val pickMedia =
    rememberLauncherForActivityResult(
      ActivityResultContracts.PickMultipleVisualMedia(),
    ) { uris ->
      if (uris.isNotEmpty()) {
        scope.launch(kotlinx.coroutines.Dispatchers.IO) {
          com.google.ai.edge.gallery.common.handleImagesSelected(
            context = context,
            uris = uris,
            onImagesSelected = onImagesSelected,
          )
        }
      }
    }
  var showRawAudioRecorder by remember { mutableStateOf(false) }
  val recordAudioPermissionLauncher =
    rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
      if (granted) showRawAudioRecorder = true
    }
  val chatModes =
    buildList {
      add(OperatorComposerMode.CHAT)
      if (supportsImageInput) add(OperatorComposerMode.IMAGE)
      if (speechRecognitionAvailable || supportsAudioInput) add(OperatorComposerMode.AUDIO)
    }
  BaoEdgePanel(
    title = null,
    subtitle = null,
    modifier = modifier,
  ) {
    if (showRawAudioRecorder && (audioTask ?: localChatTask) != null) {
      AudioRecorderPanel(
        task = audioTask ?: localChatTask!!,
        onAmplitudeChanged = onAmplitudeChanged,
        onSendAudioClip = { bytes ->
          onSendAudio(bytes)
          showRawAudioRecorder = false
        },
        onClose = { showRawAudioRecorder = false },
        modifier = Modifier.padding(bottom = 8.dp),
      )
    }
    SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
      chatModes.forEachIndexed { index, mode ->
        SegmentedButton(
          shape = SegmentedButtonDefaults.itemShape(index = index, count = chatModes.size),
          selected = composerMode == mode,
          onClick = { onComposerModeSelected(mode) },
          icon = { Icon(mode.icon(), contentDescription = null) },
          label = { Text(stringResource(mode.labelResId())) },
        )
      }
    }

    BaoEdgeInput(
      value = message,
      onValueChange = onMessageChanged,
      modifier = Modifier.fillMaxWidth(),
      minLines = 3,
      label = null,
      placeholder = stringResource(composerMode.placeholderResId()),
    )

    if (composerMode == OperatorComposerMode.IMAGE && supportsImageInput) {
      Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalAlignment = Alignment.CenterVertically,
      ) {
        for (bitmap in pickedImages) {
          Box(contentAlignment = Alignment.TopEnd) {
            Image(
              bitmap = bitmap.asImageBitmap(),
              contentDescription = stringResource(R.string.cd_image_thumbnail),
              modifier =
                Modifier.height(64.dp)
                  .clip(RoundedCornerShape(8.dp))
                  .border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(8.dp)),
            )
            IconButton(
              onClick = { onRemoveImage(bitmap) },
              modifier = Modifier.size(24.dp).offset(x = 4.dp, y = (-4).dp),
            ) {
              Icon(Icons.Rounded.Close, contentDescription = stringResource(R.string.cd_delete_icon), modifier = Modifier.size(16.dp))
            }
          }
        }
        FilledTonalIconButton(
          onClick = { pickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)) },
          modifier = Modifier.size(48.dp),
        ) {
          Icon(Icons.Rounded.Image, contentDescription = stringResource(R.string.operator_add_image))
        }
      }
    }

    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(10.dp),
      verticalAlignment = Alignment.CenterVertically,
    ) {
      FilledTonalIconButton(
        onClick = { onRequestTtsChanged(!requestTts) },
        modifier = Modifier.size(48.dp).weight(0.18f, fill = false),
        colors = IconButtonDefaults.filledTonalIconButtonColors(
          containerColor =
            if (requestTts) {
              MaterialTheme.customColors.appTitleGradientColors.firstOrNull()?.copy(alpha = 0.16f)
                ?: MaterialTheme.colorScheme.secondaryContainer
            } else {
              MaterialTheme.colorScheme.surfaceContainerHighest
            },
          contentColor =
            if (requestTts) {
              MaterialTheme.customColors.appTitleGradientColors.firstOrNull()
                ?: MaterialTheme.colorScheme.primary
            } else {
              MaterialTheme.colorScheme.onSurfaceVariant
            },
        ),
      ) {
        Icon(
          if (requestTts) Icons.AutoMirrored.Rounded.VolumeUp else Icons.AutoMirrored.Rounded.VolumeOff,
          contentDescription = stringResource(R.string.operator_request_tts),
        )
      }
      if (localChatTask != null && speechRecognitionAvailable) {
        HoldToDictate(
          task = localChatTask,
          viewModel = holdToDictateViewModel,
          onDone = { text -> onMessageChanged(if (message.isBlank()) text else "$message\n$text") },
          onAmplitudeChanged = onAmplitudeChanged,
          enabled = !isSending,
          compact = true,
        )
      } else {
        FilledTonalIconButton(onClick = onOpenSettings, modifier = Modifier.size(48.dp)) {
          Icon(
            Icons.Rounded.Mic,
            contentDescription = stringResource(R.string.operator_voice_alert_action),
          )
        }
      }
      if (composerMode == OperatorComposerMode.AUDIO && supportsAudioInput && (audioTask ?: localChatTask) != null) {
        FilledTonalIconButton(
          onClick = {
            if (androidx.core.content.ContextCompat.checkSelfPermission(context, android.Manifest.permission.RECORD_AUDIO) == android.content.pm.PackageManager.PERMISSION_GRANTED) {
              showRawAudioRecorder = true
            } else {
              recordAudioPermissionLauncher.launch(android.Manifest.permission.RECORD_AUDIO)
            }
          },
          modifier = Modifier.size(48.dp),
        ) {
          Icon(
            Icons.Rounded.Mic,
            contentDescription = stringResource(R.string.operator_record_and_send),
          )
        }
      }
      Spacer(modifier = Modifier.weight(1f))
      BaoEdgeChip(
        label =
          if (speechRecognitionAvailable) {
            voiceLabel
          } else {
            stringResource(R.string.operator_voice_alert_title)
          },
        active = speechRecognitionAvailable,
        leadingIcon = Icons.Rounded.Mic,
        onClick = if (speechRecognitionAvailable) null else onOpenSettings,
      )
    }

    BaoEdgePrimaryButton(
      label = stringResource(R.string.operator_send),
      onClick = onSendMessage,
      enabled = !isSending && (message.isNotBlank() || (composerMode == OperatorComposerMode.IMAGE && supportsImageInput && pickedImages.isNotEmpty())),
      leadingIcon = Icons.Rounded.ArrowOutward,
      modifier = Modifier.fillMaxWidth(),
    )

    if (isSending) {
      Row(
        horizontalArrangement = Arrangement.spacedBy(10.dp),
        verticalAlignment = Alignment.CenterVertically,
      ) {
        CircularProgressIndicator(
          modifier = Modifier.size(18.dp),
          strokeWidth = 2.dp,
          color = MaterialTheme.colorScheme.primary,
        )
        Text(
          stringResource(R.string.operator_state_loading),
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
      }
    }
  }
}

@Composable
private fun OperatorQuickStartDeck(
  supportsImageInput: Boolean,
  supportsAudioInput: Boolean,
  onStarterSelected: (OperatorStarterAction) -> Unit,
) {
  val starterActions =
    buildList {
      add(
        OperatorStarterAction(
          id = "ask",
          title = stringResource(R.string.operator_quick_action_ask),
          prompt = stringResource(R.string.operator_quick_start_chat_prompt),
          composerMode = OperatorComposerMode.CHAT,
        ),
      )
      add(
        OperatorStarterAction(
          id = "plan",
          title = stringResource(R.string.operator_quick_action_plan),
          prompt = stringResource(R.string.operator_quick_start_plan_prompt),
          composerMode = OperatorComposerMode.CHAT,
        ),
      )
      if (supportsImageInput) {
        add(
          OperatorStarterAction(
            id = "describe-image",
            title = stringResource(R.string.operator_chip_describe_image),
            prompt = stringResource(R.string.operator_message_placeholder_image),
            composerMode = OperatorComposerMode.IMAGE,
          ),
        )
      }
      if (supportsAudioInput) {
        add(
          OperatorStarterAction(
            id = "voice-question",
            title = stringResource(R.string.operator_chip_voice_question),
            prompt = stringResource(R.string.operator_message_placeholder_audio),
            composerMode = OperatorComposerMode.AUDIO,
          ),
        )
      }
      add(
        OperatorStarterAction(
          id = "automate",
          title = stringResource(R.string.operator_quick_action_automate),
          prompt = stringResource(R.string.operator_quick_start_automation_prompt),
          composerMode = OperatorComposerMode.AUTOMATION,
        ),
      )
    }
  FlowRow(
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
  ) {
    starterActions.forEach { starter ->
      BaoEdgeChip(
        label = starter.title,
        active = false,
        leadingIcon = starter.composerMode.icon(),
        onClick = { onStarterSelected(starter) },
      )
    }
  }
}

private fun operatorContextualActionIcon(
  actionId: String,
  composerMode: OperatorComposerMode,
): androidx.compose.ui.graphics.vector.ImageVector =
  when (actionId) {
    "summarize" -> Icons.Rounded.Subject
    "continue" -> Icons.AutoMirrored.Rounded.ArrowForward
    "describe-image-contextual" -> Icons.Rounded.Image
    else -> composerMode.icon()
  }

@Composable
private fun OperatorContextualChips(
  timeline: List<OperatorTimelineEntry>,
  supportsImageInput: Boolean,
  onChipSelected: (OperatorStarterAction) -> Unit,
) {
  if (timeline.isEmpty()) return
  val lastEntry = timeline.last()
  val lastIsAssistant = lastEntry.role == OperatorTimelineRole.ASSISTANT
  val contextualActions =
    buildList {
      if (lastIsAssistant) {
        add(
          OperatorStarterAction(
            id = "summarize",
            title = stringResource(R.string.operator_chip_summarize),
            prompt = stringResource(R.string.operator_chip_summarize_prompt),
            composerMode = OperatorComposerMode.CHAT,
          ),
        )
        add(
          OperatorStarterAction(
            id = "continue",
            title = stringResource(R.string.operator_chip_continue),
            prompt = stringResource(R.string.operator_chip_continue_prompt),
            composerMode = OperatorComposerMode.CHAT,
          ),
        )
      }
      if (supportsImageInput) {
        add(
          OperatorStarterAction(
            id = "describe-image-contextual",
            title = stringResource(R.string.operator_chip_describe_image),
            prompt = stringResource(R.string.operator_message_placeholder_image),
            composerMode = OperatorComposerMode.IMAGE,
          ),
        )
      }
    }
  if (contextualActions.isEmpty()) return
  FlowRow(
    modifier = Modifier.padding(top = 8.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
  ) {
    contextualActions.forEach { starter ->
      BaoEdgeCompactAction(
        label = starter.title,
        hint = starter.prompt,
        icon = operatorContextualActionIcon(starter.id, starter.composerMode),
        onClick = { onChipSelected(starter) },
      )
    }
  }
}

@Composable
internal fun OperatorTimelineCard(entries: List<OperatorTimelineEntry>) {
  BaoEdgePanel(
    title = stringResource(R.string.operator_timeline_title),
  ) {
    if (entries.isEmpty()) {
      Text(
        stringResource(R.string.operator_timeline_empty),
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f),
      )
    } else {
      Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        entries.takeLast(12).forEach { entry ->
          OperatorTimelineRow(entry = entry)
        }
      }
    }
  }
}

@Composable
private fun OperatorTimelineRow(entry: OperatorTimelineEntry) {
  val accentColor =
    when (entry.tone) {
      OperatorTimelineTone.ACCENT -> MaterialTheme.colorScheme.primary
      OperatorTimelineTone.INFO -> MaterialTheme.colorScheme.secondary
      OperatorTimelineTone.SUCCESS -> MaterialTheme.customColors.successColor
      OperatorTimelineTone.WARNING -> MaterialTheme.colorScheme.tertiary
      OperatorTimelineTone.ERROR -> MaterialTheme.colorScheme.error
    }
  val timestamp =
    remember(entry.timestampMs) {
      if (entry.timestampMs <= 0L) "" else DateFormat.getTimeInstance(DateFormat.SHORT).format(Date(entry.timestampMs))
    }

  Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.spacedBy(12.dp),
    verticalAlignment = Alignment.Top,
  ) {
    Column(
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
      Box(
        modifier = Modifier.size(12.dp).clip(CircleShape).background(accentColor),
      )
      Box(
        modifier = Modifier
          .padding(top = 2.dp)
          .size(width = 2.dp, height = 48.dp)
          .background(accentColor.copy(alpha = 0.25f)),
      )
    }
    BaoEdgeTimelineBubble(
      title = entry.title,
      body = buildString {
        append(entry.body)
        if (entry.meta.isNotBlank()) {
          append("\n")
          append(entry.meta)
        }
      },
      state = entry.state,
      renderBodyAsMarkdown = shouldRenderOperatorTimelineBodyAsMarkdown(entry.role),
      accentColor = accentColor,
      contentColor = MaterialTheme.colorScheme.onSurface,
      alignment = Alignment.CenterStart,
      modifier = Modifier.weight(1f),
    )
  }
  if (timestamp.isNotBlank()) {
    Text(
      text = timestamp,
      style = MaterialTheme.typography.labelSmall,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
      modifier = Modifier.padding(start = 24.dp),
    )
  }
}

@Composable
internal fun OperatorApprovalCard(
  approval: OperatorApprovalRequest,
  isSubmitting: Boolean,
  onApprove: () -> Unit,
  onDismiss: () -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.operator_approval_title),
    subtitle = stringResource(R.string.operator_approval_summary, approval.riskLevel.ifBlank { stringResource(R.string.operator_not_set) }, approval.commandCount),
  ) {
    Text(
      stringResource(R.string.operator_approval_correlation, approval.correlationId),
      style = MaterialTheme.typography.bodySmall,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
    )
    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
      BaoEdgePrimaryButton(
        label = stringResource(R.string.operator_approval_approve),
        onClick = onApprove,
        enabled = !isSubmitting,
        modifier = Modifier.weight(1f),
      )
      BaoEdgeSecondaryButton(
        label = stringResource(R.string.operator_approval_dismiss),
        onClick = onDismiss,
        enabled = !isSubmitting,
        modifier = Modifier.weight(1f),
      )
    }
  }
}

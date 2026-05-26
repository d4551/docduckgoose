@file:OptIn(ExperimentalLayoutApi::class)

package com.google.ai.edge.gallery.ui.home

import android.app.UiModeManager
import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.BoxWithConstraints
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
import androidx.compose.material.icons.rounded.AutoAwesome
import androidx.compose.material.icons.rounded.CheckCircle
import androidx.compose.material.icons.rounded.Close
import androidx.compose.material.icons.rounded.Memory
import androidx.compose.material.icons.rounded.Public
import androidx.compose.material.icons.rounded.SettingsEthernet
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import com.google.ai.edge.gallery.BuildConfig
import com.google.ai.edge.gallery.GalleryApplication
import com.google.ai.edge.gallery.GalleryTopAppBar
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.common.APP_LOCALE_SYSTEM
import com.google.ai.edge.gallery.common.applyAppLocale
import com.google.ai.edge.gallery.common.normalizeAppLocaleTag
import com.google.ai.edge.gallery.data.OperatorRuntimeUsage
import com.google.ai.edge.gallery.proto.Theme
import com.google.ai.edge.gallery.ui.common.textandvoiceinput.HoldToDictateViewModel
import com.google.ai.edge.gallery.ui.common.tos.AppTosDialog
import com.google.ai.edge.gallery.ui.modelmanager.ModelManagerViewModel
import com.google.ai.edge.gallery.ui.theme.ThemeSettings
import com.google.android.gms.oss.licenses.OssLicensesMenuActivity
import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.Locale
import kotlin.math.min
import org.xmlpull.v1.XmlPullParser

private val SETTINGS_THEME_OPTIONS = listOf(Theme.THEME_AUTO, Theme.THEME_LIGHT, Theme.THEME_DARK)
private val SETTINGS_RUNTIME_USAGE_OPTIONS = OperatorRuntimeUsage.ordered

private enum class OperatorSettingsSection {
  GENERAL,
  AI,
}

private fun List<String>.toBaoEdgeChoiceOptions(providerDisplayNames: Map<String, String>): List<BaoEdgeChoiceOption> =
  map { providerId ->
    BaoEdgeChoiceOption(
      value = providerId,
      label = providerDisplayNames[providerId].orEmpty().ifBlank { providerId },
    )
  }

private fun OperatorRuntimeUsage.labelResId(): Int =
  when (this) {
    OperatorRuntimeUsage.CHAT -> R.string.settings_runtime_usage_chat
    OperatorRuntimeUsage.AUTOMATION -> R.string.settings_runtime_usage_automation
    OperatorRuntimeUsage.IMAGE -> R.string.settings_runtime_usage_image
    OperatorRuntimeUsage.FLOW_GENERATION -> R.string.settings_runtime_usage_flow_generation
    OperatorRuntimeUsage.SPEECH_INPUT -> R.string.settings_runtime_usage_speech_input
    OperatorRuntimeUsage.SPEECH_OUTPUT -> R.string.settings_runtime_usage_speech_output
  }

private fun OperatorRuntimeUsage.toRuntimePickerTarget(): OperatorRuntimePickerTarget =
  when (this) {
    OperatorRuntimeUsage.CHAT -> OperatorRuntimePickerTarget.CHAT
    OperatorRuntimeUsage.AUTOMATION -> OperatorRuntimePickerTarget.AUTOMATION
    OperatorRuntimeUsage.IMAGE -> OperatorRuntimePickerTarget.IMAGE
    OperatorRuntimeUsage.FLOW_GENERATION -> OperatorRuntimePickerTarget.FLOW_GENERATION
    OperatorRuntimeUsage.SPEECH_INPUT -> OperatorRuntimePickerTarget.SPEECH_INPUT
    OperatorRuntimeUsage.SPEECH_OUTPUT -> OperatorRuntimePickerTarget.SPEECH_OUTPUT
  }

private fun buildLocaleChoiceOptions(context: Context): List<BaoEdgeChoiceOption> {
  val displayLocale = context.resources.configuration.locales[0] ?: Locale.getDefault()
  val localeOptions =
    readSupportedAppLocaleTags(context)
      .mapNotNull { languageTag ->
        val locale = Locale.forLanguageTag(languageTag)
        val label =
          locale.getDisplayName(displayLocale)
            .trim()
            .replaceFirstChar { character ->
              if (character.isLowerCase()) character.titlecase(displayLocale) else character.toString()
            }
        if (label.isBlank()) {
          null
        } else {
          BaoEdgeChoiceOption(value = locale.toLanguageTag(), label = label)
        }
      }
      .sortedBy { option -> option.label.lowercase(displayLocale) }

  return listOf(
    BaoEdgeChoiceOption(
      value = APP_LOCALE_SYSTEM,
      label = context.getString(R.string.settings_language_system),
    ),
  ) + localeOptions
}

private fun readSupportedAppLocaleTags(context: Context): List<String> {
  val parser = context.resources.getXml(R.xml.locale_config)
  val localeTags = mutableListOf<String>()
  parser.use {
    var eventType = parser.eventType
    while (eventType != XmlPullParser.END_DOCUMENT) {
      if (eventType == XmlPullParser.START_TAG && parser.name == "locale") {
        val rawTag =
          parser.getAttributeValue("http://schemas.android.com/apk/res/android", "name")
            ?: parser.getAttributeValue(null, "name")
        val normalizedTag = normalizeAppLocaleTag(rawTag)
        if (normalizedTag != APP_LOCALE_SYSTEM) {
          localeTags += normalizedTag
        }
      }
      eventType = parser.next()
    }
  }
  return localeTags.distinct()
}

private fun buildSpeechLocaleChoiceOptions(
  context: Context,
  supportedLanguageTags: List<String>,
): List<BaoEdgeChoiceOption> {
  val displayLocale = context.resources.configuration.locales[0] ?: Locale.getDefault()
  return supportedLanguageTags
    .map { languageTag ->
      val locale = Locale.forLanguageTag(languageTag)
      BaoEdgeChoiceOption(
        value = locale.toLanguageTag(),
        label =
          locale.getDisplayName(displayLocale)
            .trim()
            .replaceFirstChar { character ->
              if (character.isLowerCase()) character.titlecase(displayLocale) else character.toString()
            },
      )
    }
    .filter { option -> option.value.isNotBlank() && option.label.isNotBlank() }
    .distinctBy { option -> option.value }
    .sortedBy { option -> option.label.lowercase(displayLocale) }
}

/** Dedicated Settings workspace split into General and AI settings areas. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OperatorSettingsScreen(
  modelManagerViewModel: ModelManagerViewModel,
  operatorShellViewModel: OperatorShellViewModel = hiltViewModel(),
  modifier: Modifier = Modifier,
) {
  val holdToDictateViewModel: HoldToDictateViewModel = hiltViewModel()
  val uiState by modelManagerViewModel.uiState.collectAsState()
  val tokenStatusAndData by modelManagerViewModel.tokenStatusAndData.collectAsState()
  val holdToDictateUiState by holdToDictateViewModel.uiState.collectAsState()
  val context = LocalContext.current
  val dateFormatter = remember {
    DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM).withZone(ZoneId.systemDefault())
  }
  val localeChoiceOptions = remember(context) { buildLocaleChoiceOptions(context) }
  val speechLocaleChoiceOptions =
    remember(context, holdToDictateUiState.supportedLanguageTags) {
      buildSpeechLocaleChoiceOptions(context, holdToDictateUiState.supportedLanguageTags)
    }
  var selectedSectionName by rememberSaveable { mutableStateOf(OperatorSettingsSection.GENERAL.name) }
  var selectedTheme by remember { mutableStateOf(modelManagerViewModel.readThemeOverride()) }
  var customHfToken by remember { mutableStateOf("") }
  var showTos by remember { mutableStateOf(false) }
  var selectedRuntimeUsageName by rememberSaveable { mutableStateOf(OperatorRuntimeUsage.CHAT.wireValue) }
  val selectedSection = OperatorSettingsSection.valueOf(selectedSectionName)
  val selectedRuntimeUsage =
    SETTINGS_RUNTIME_USAGE_OPTIONS.firstOrNull { usage -> usage.wireValue == selectedRuntimeUsageName }
      ?: OperatorRuntimeUsage.CHAT
  val selectedRuntimeAssignment = uiState.runtimeAssignments.assignmentFor(selectedRuntimeUsage)

  LaunchedEffect(Unit) {
    modelManagerViewModel.ensureCloudProvidersLoaded()
    modelManagerViewModel.refreshStoredProviderCredentialState()
    modelManagerViewModel.refreshTokenStatus()
    holdToDictateViewModel.refreshRecognitionSupport()
  }
  LaunchedEffect(
    selectedRuntimeUsageName,
    selectedRuntimeAssignment.provider,
    uiState.cloudModelOptionsProvider,
    uiState.cloudModelOptions,
    uiState.isLoadingCloudModels,
  ) {
    if (
      selectedRuntimeAssignment.provider.isNotBlank()
      && !uiState.isLoadingCloudModels
      && (
        uiState.cloudModelOptions.isEmpty()
          || uiState.cloudModelOptionsProvider != selectedRuntimeAssignment.provider
      )
    ) {
      modelManagerViewModel.loadCloudModelsForRuntimeUsage(selectedRuntimeUsage)
    }
  }

  BaoEdgeScaffold(
    modifier = modifier,
    topBar = {
      GalleryTopAppBar(
        title = stringResource(R.string.settings_workspace_title),
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
      item(key = "settings-sections") {
        SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
          val sections =
            listOf(
              OperatorSettingsSection.GENERAL to R.string.settings_workspace_general_tab,
              OperatorSettingsSection.AI to R.string.settings_workspace_ai_tab,
            )
          sections.forEachIndexed { index, (section, labelResId) ->
            SegmentedButton(
              shape = SegmentedButtonDefaults.itemShape(index = index, count = sections.size),
              selected = selectedSection == section,
              onClick = { selectedSectionName = section.name },
              label = { Text(text = stringResource(labelResId)) },
            )
          }
        }
      }

      if (selectedSection == OperatorSettingsSection.GENERAL) {
        item(key = "general-appearance") {
          AppearanceSettingsCard(
            selectedTheme = selectedTheme,
            onThemeSelected = { theme ->
              selectedTheme = theme
              ThemeSettings.themeOverride.value = theme
              modelManagerViewModel.saveThemeOverride(theme)
              applyThemeMode(context = context, theme = theme)
            },
          )
        }
        item(key = "general-language") {
          LanguageSettingsCard(
            appLocaleTag = uiState.appLocaleTag,
            localeOptions = localeChoiceOptions,
            onLocaleSelected = { localeTag ->
              modelManagerViewModel.saveAppLocale(localeTag)
              applyAppLocale(context, localeTag)
              (context.applicationContext as? GalleryApplication)?.updateCurrentAppLocale(localeTag)
            },
          )
        }
        item(key = "general-voice") {
          VoiceInputSettingsCard(
            speechRecognitionAvailable = holdToDictateUiState.recognitionAvailable,
            speechRecognitionStatusMessage = holdToDictateUiState.statusMessage,
            speechRecognitionLanguageTag = holdToDictateUiState.selectedLanguageTag,
            speechRecognitionLocaleOptions = speechLocaleChoiceOptions,
            onSpeechRecognitionLocaleSelected = holdToDictateViewModel::updateRecognitionLanguage,
          )
        }
        item(key = "legal-about") {
          LegalAndAboutCard(
            versionName = BuildConfig.VERSION_NAME,
            onViewTos = { showTos = true },
            onViewLicenses = {
              context.startActivity(Intent(context, OssLicensesMenuActivity::class.java))
            },
          )
        }
      } else {
        item(key = "ai-default-runtime") {
          OperatorDefaultRuntimeCard(
            providerLabel =
              uiState.providerDisplayNames[uiState.activeChatProvider].orEmpty().ifBlank {
                uiState.activeChatProvider.ifBlank { stringResource(R.string.operator_runtime_cta_provider_missing) }
              },
            providerActive = uiState.activeChatProvider.isNotBlank(),
            sourceLabel =
              uiState.modelSourceOptions.firstOrNull { it.id == uiState.cloudModelSource }?.displayName
                ?.ifBlank { uiState.cloudModelSource }
                ?: uiState.cloudModelSource.ifBlank { stringResource(R.string.operator_not_set) },
            sourceActive = uiState.cloudModelSource.isNotBlank(),
            modelLabel =
              uiState.cloudModelDisplayNames[uiState.activeChatModel].orEmpty().ifBlank {
                uiState.activeChatModel.ifBlank { stringResource(R.string.operator_runtime_cta_model_missing) }
              },
            modelActive = uiState.activeChatModel.isNotBlank(),
            onEdit = { operatorShellViewModel.openRuntimePicker(OperatorRuntimePickerTarget.DEFAULT) },
          )
        }
        item(key = "ai-capabilities") {
          OperatorCapabilityCards(
            runtimeAssignments = uiState.runtimeAssignments,
            providerDisplayNames = uiState.providerDisplayNames,
            onEditCapability = { usage ->
              operatorShellViewModel.openRuntimePicker(usage.toRuntimePickerTarget())
            },
          )
        }
        item(key = "ai-connection") {
          AiConnectionCard(
            controlPlaneBaseUrl = uiState.controlPlaneBaseUrl,
            providerBaseUrl = uiState.providerBaseUrl,
            providerApiKeyDraft = uiState.providerApiKey,
            providerApiKeyMasked = uiState.providerApiKeyMasked,
            hasStoredProviderApiKey = uiState.hasStoredProviderApiKey,
            providerOptions = uiState.providerOptions.toBaoEdgeChoiceOptions(uiState.providerDisplayNames),
            selectedProvider = uiState.activeChatProvider,
            providerProfiles =
              uiState.providerProfiles
                .filter { profile ->
                  profile.providerId.equals(uiState.activeChatProvider, ignoreCase = true)
                }
                .map { profile ->
                  BaoEdgeChoiceOption(value = profile.profileId, label = profile.displayName)
                },
            selectedProviderProfileId = uiState.selectedProviderProfileId,
            selectedProviderProfileLabel = uiState.selectedProviderProfileLabel,
            supportsProviderEndpointOverride = uiState.providerSupportsBaseUrlOverride.contains(uiState.activeChatProvider),
            providerMessage = uiState.providerRegistryMessage,
            isLoadingProviders = uiState.isLoadingProviderRegistry,
            onControlPlaneBaseUrlChanged = modelManagerViewModel::setControlPlaneBaseUrl,
            onProviderBaseUrlChanged = modelManagerViewModel::setProviderBaseUrl,
            onProviderApiKeyDraftChanged = modelManagerViewModel::setProviderApiKey,
            onProviderProfileSelected = modelManagerViewModel::setSelectedProviderProfileId,
            onProviderProfileLabelChanged = modelManagerViewModel::setSelectedProviderProfileLabel,
            onSaveProviderApiKey = modelManagerViewModel::saveProviderApiKey,
            onClearProviderApiKey = modelManagerViewModel::clearProviderApiKey,
            onLoadProviders = modelManagerViewModel::loadCloudProviders,
            onProviderSelected = modelManagerViewModel::setActiveChatProvider,
          )
        }
        item(key = "conversation-defaults") {
          ConversationDefaultsCard(
            requestTts = uiState.cloudChatRequestTts,
            ttsVoice = uiState.cloudChatTtsVoice,
            outputMimeType = uiState.cloudChatTtsOutputMimeType,
            onRequestTtsChanged = modelManagerViewModel::setCloudChatRequestTts,
            onTtsVoiceChanged = modelManagerViewModel::setCloudChatTtsVoice,
            onOutputMimeTypeChanged = modelManagerViewModel::setCloudChatTtsOutputMimeType,
          )
        }
        item(key = "hf-token") {
          HuggingFaceTokenCard(
            maskedToken =
              tokenStatusAndData.data?.accessToken?.takeIf(String::isNotBlank)?.let { token ->
                maskSecret(token, stringResource(R.string.secret_stored_chars, token.length))
              } ?: stringResource(R.string.not_available),
            expiresAtLabel =
              tokenStatusAndData.data?.takeIf { it.accessToken.isNotBlank() }?.let {
                stringResource(R.string.expires_at, dateFormatter.format(Instant.ofEpochMilli(it.expiresAtMs)))
              }.orEmpty(),
            draftToken = customHfToken,
            onDraftTokenChanged = { customHfToken = it },
            onSaveToken = {
              modelManagerViewModel.saveAccessToken(
                accessToken = customHfToken,
                refreshToken = "",
                expiresAt = System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 365 * 10,
              )
              customHfToken = ""
            },
            onClearToken = modelManagerViewModel::clearAccessToken,
          )
        }
      }
    }
  }

  if (showTos) {
    AppTosDialog(onTosAccepted = { showTos = false }, viewingMode = true)
  }
}

@Composable
private fun AppearanceSettingsCard(
  selectedTheme: Theme,
  onThemeSelected: (Theme) -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_appearance_title),
  ) {
    SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
      SETTINGS_THEME_OPTIONS.forEachIndexed { index, theme ->
        SegmentedButton(
          shape = SegmentedButtonDefaults.itemShape(index = index, count = SETTINGS_THEME_OPTIONS.size),
          selected = theme == selectedTheme,
          onClick = { onThemeSelected(theme) },
          label = { Text(text = themeLabel(theme = theme)) },
        )
      }
    }
  }
}

@Composable
private fun LanguageSettingsCard(
  appLocaleTag: String,
  localeOptions: List<BaoEdgeChoiceOption>,
  onLocaleSelected: (String) -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_language_title),
  ) {
    Text(
      text = stringResource(R.string.settings_language_hint),
      style = MaterialTheme.typography.bodySmall,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
    )
    BaoEdgeSearchableChoiceField(
      label = stringResource(R.string.settings_language),
      selectedValue = appLocaleTag,
      options = localeOptions,
      onOptionSelected = onLocaleSelected,
      placeholder = stringResource(R.string.settings_language_system),
    )
  }
}

@Composable
private fun VoiceInputSettingsCard(
  speechRecognitionAvailable: Boolean,
  speechRecognitionStatusMessage: String,
  speechRecognitionLanguageTag: String,
  speechRecognitionLocaleOptions: List<BaoEdgeChoiceOption>,
  onSpeechRecognitionLocaleSelected: (String) -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_voice_input_title),
  ) {
    Text(
      text = stringResource(R.string.settings_dictation_language_hint),
      style = MaterialTheme.typography.bodySmall,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
    )
    if (speechRecognitionAvailable && speechRecognitionLocaleOptions.isNotEmpty()) {
      BaoEdgeSearchableChoiceField(
        label = stringResource(R.string.settings_dictation_language),
        selectedValue = speechRecognitionLanguageTag,
        options = speechRecognitionLocaleOptions,
        onOptionSelected = onSpeechRecognitionLocaleSelected,
        placeholder = stringResource(R.string.settings_language_system),
      )
    } else {
      BaoEdgePanel(
        title = stringResource(R.string.operator_voice_alert_title),
      ) {
        Text(
          text =
            speechRecognitionStatusMessage.ifBlank {
              stringResource(R.string.settings_dictation_language_unavailable)
            },
          style = MaterialTheme.typography.bodyMedium,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
      }
    }
  }
}

@Composable
private fun OperatorDefaultRuntimeCard(
  providerLabel: String,
  providerActive: Boolean,
  sourceLabel: String,
  sourceActive: Boolean,
  modelLabel: String,
  modelActive: Boolean,
  onEdit: () -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_default_runtime_title),
    subtitle = stringResource(R.string.settings_workspace_default_runtime_subtitle),
  ) {
    Text(
      text = stringResource(
        R.string.settings_workspace_runtime_summary,
        providerLabel,
        sourceLabel,
        modelLabel,
      ),
      style = MaterialTheme.typography.bodyMedium,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
    )
    BaoEdgePrimaryButton(
      label = stringResource(R.string.settings_workspace_edit_runtime),
      onClick = onEdit,
      modifier = Modifier.fillMaxWidth(),
      leadingIcon = Icons.Rounded.AutoAwesome,
    )
  }
}

@Composable
private fun OperatorCapabilityCards(
  runtimeAssignments: com.google.ai.edge.gallery.data.OperatorRuntimeAssignments,
  providerDisplayNames: Map<String, String>,
  onEditCapability: (OperatorRuntimeUsage) -> Unit,
) {
  Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
    OperatorRuntimeUsage.ordered.forEach { usage ->
      val assignment = runtimeAssignments.assignmentFor(usage)
      val providerLabel =
        providerDisplayNames[assignment.provider].orEmpty().ifBlank {
          assignment.provider.ifBlank { emptyCapabilityLabel(usage) }
        }
      val modelLabel = assignment.model.ifBlank { emptyCapabilityLabel(usage) }
      val sourceLabel = assignment.source.ifBlank { stringResource(R.string.operator_not_set) }
      BaoEdgePanel(
        title = stringResource(usage.labelResId()),
      ) {
        Text(
          text = stringResource(
            R.string.settings_workspace_assignment_summary,
            providerLabel,
            modelLabel,
            sourceLabel,
          ),
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        BaoEdgeSecondaryButton(
          label = stringResource(R.string.edit),
          onClick = { onEditCapability(usage) },
          leadingIcon = Icons.Rounded.CheckCircle,
          modifier = Modifier.fillMaxWidth(),
        )
      }
    }
  }
}

@Composable
private fun emptyCapabilityLabel(usage: OperatorRuntimeUsage): String =
  when (usage) {
    OperatorRuntimeUsage.SPEECH_OUTPUT -> stringResource(R.string.settings_workspace_empty_speech_output)
    OperatorRuntimeUsage.SPEECH_INPUT -> stringResource(R.string.settings_workspace_empty_speech_input)
    OperatorRuntimeUsage.AUTOMATION -> stringResource(R.string.settings_workspace_empty_automation)
    OperatorRuntimeUsage.IMAGE -> stringResource(R.string.settings_workspace_empty_image)
    OperatorRuntimeUsage.FLOW_GENERATION -> stringResource(R.string.settings_workspace_empty_flow)
    OperatorRuntimeUsage.CHAT -> stringResource(R.string.settings_workspace_empty_chat)
  }

@Composable
private fun GeneralSettingsCard(
  selectedTheme: Theme,
  appLocaleTag: String,
  localeOptions: List<BaoEdgeChoiceOption>,
  speechRecognitionAvailable: Boolean,
  speechRecognitionStatusMessage: String,
  speechRecognitionLanguageTag: String,
  speechRecognitionLocaleOptions: List<BaoEdgeChoiceOption>,
  onThemeSelected: (Theme) -> Unit,
  onLocaleSelected: (String) -> Unit,
  onSpeechRecognitionLocaleSelected: (String) -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_general_title),
    subtitle = null,
  ) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
      Text(
        text = stringResource(R.string.theme),
        style = MaterialTheme.typography.labelLarge,
        fontWeight = FontWeight.SemiBold,
      )
      FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        SETTINGS_THEME_OPTIONS.forEach { theme ->
          BaoEdgeChip(
            label = themeLabel(theme = theme),
            active = theme == selectedTheme,
            onClick = { onThemeSelected(theme) },
          )
        }
      }
    }

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
      Text(
        text = stringResource(R.string.settings_language),
        style = MaterialTheme.typography.labelLarge,
        fontWeight = FontWeight.SemiBold,
      )
      Text(
        text = stringResource(R.string.settings_language_hint),
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
      BaoEdgeSearchableChoiceField(
        label = stringResource(R.string.settings_language),
        selectedValue = appLocaleTag,
        options = localeOptions,
        onOptionSelected = onLocaleSelected,
        placeholder = stringResource(R.string.settings_language_system),
      )
    }

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
      Text(
        text = stringResource(R.string.settings_dictation_language),
        style = MaterialTheme.typography.labelLarge,
        fontWeight = FontWeight.SemiBold,
      )
      Text(
        text = stringResource(R.string.settings_dictation_language_hint),
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
      if (speechRecognitionAvailable && speechRecognitionLocaleOptions.isNotEmpty()) {
        BaoEdgeSearchableChoiceField(
          label = stringResource(R.string.settings_dictation_language),
          selectedValue = speechRecognitionLanguageTag,
          options = speechRecognitionLocaleOptions,
          onOptionSelected = onSpeechRecognitionLocaleSelected,
          placeholder = stringResource(R.string.settings_language_system),
        )
      } else {
        Text(
          text =
            speechRecognitionStatusMessage.ifBlank {
              stringResource(R.string.settings_dictation_language_unavailable)
            },
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
      }
    }
  }
}

@Composable
private fun CapabilityAssignmentsCard(
  runtimeAssignments: com.google.ai.edge.gallery.data.OperatorRuntimeAssignments,
  providerDisplayNames: Map<String, String>,
  activeProviderProfileIds: Map<String, String>,
  providerProfiles: List<com.google.ai.edge.gallery.data.OperatorProviderProfile>,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_ai_defaults_title),
    subtitle = stringResource(R.string.settings_workspace_ai_defaults_subtitle),
  ) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
      OperatorRuntimeUsage.ordered.forEach { usage ->
        val assignment = runtimeAssignments.assignmentFor(usage)
        val providerLabel = providerDisplayNames[assignment.provider].orEmpty().ifBlank {
          assignment.provider.ifBlank { stringResource(R.string.operator_not_set) }
        }
        val profileLabel =
          assignment.provider.takeIf(String::isNotBlank)?.let { providerId ->
            val profileId = activeProviderProfileIds[providerId].orEmpty()
            providerProfiles.firstOrNull { profile ->
              profile.providerId.equals(providerId, ignoreCase = true) &&
                profile.profileId.equals(profileId, ignoreCase = true)
            }?.displayName ?: profileId
          }.orEmpty().ifBlank { stringResource(R.string.operator_not_set) }
        val modelLabel = assignment.model.ifBlank { stringResource(R.string.operator_not_set) }
        val sourceLabel = assignment.source.ifBlank { stringResource(R.string.operator_not_set) }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
          Text(
            text = stringResource(usage.labelResId()),
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.SemiBold,
          )
          Text(
            text = stringResource(
              R.string.settings_workspace_capability_assignment_summary,
              providerLabel,
              profileLabel,
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

@Composable
private fun LegalAndAboutCard(
  versionName: String,
  onViewTos: () -> Unit,
  onViewLicenses: () -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_about_title),
    subtitle = stringResource(R.string.app_version, versionName),
  ) {
    BaoEdgeSecondaryButton(
      label = stringResource(R.string.settings_dialog_view_app_terms_of_service),
      onClick = onViewTos,
      modifier = Modifier.fillMaxWidth(),
    )
    BaoEdgeSecondaryButton(
      label = stringResource(R.string.oss_licenses),
      onClick = onViewLicenses,
      modifier = Modifier.fillMaxWidth(),
    )
  }
}

@Composable
private fun AiConnectionCard(
  controlPlaneBaseUrl: String,
  providerBaseUrl: String,
  providerApiKeyDraft: String,
  providerApiKeyMasked: String,
  hasStoredProviderApiKey: Boolean,
  providerOptions: List<BaoEdgeChoiceOption>,
  selectedProvider: String,
  providerProfiles: List<BaoEdgeChoiceOption>,
  selectedProviderProfileId: String,
  selectedProviderProfileLabel: String,
  supportsProviderEndpointOverride: Boolean,
  providerMessage: String,
  isLoadingProviders: Boolean,
  onControlPlaneBaseUrlChanged: (String) -> Unit,
  onProviderBaseUrlChanged: (String) -> Unit,
  onProviderApiKeyDraftChanged: (String) -> Unit,
  onProviderProfileSelected: (String) -> Unit,
  onProviderProfileLabelChanged: (String) -> Unit,
  onSaveProviderApiKey: () -> Unit,
  onClearProviderApiKey: () -> Unit,
  onLoadProviders: () -> Unit,
  onProviderSelected: (String) -> Unit,
) {
  var apiKeySectionExpanded by rememberSaveable { mutableStateOf(!hasStoredProviderApiKey) }
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_ai_connection_title),
    subtitle = null,
  ) {
    if (providerOptions.isNotEmpty()) {
      BaoEdgeSearchableChoiceField(
        label = stringResource(R.string.settings_workspace_connection_provider_title),
        options = providerOptions,
        selectedValue = selectedProvider,
        onOptionSelected = onProviderSelected,
        placeholder = stringResource(R.string.operator_not_set),
      )
    }

    if (providerMessage.isNotBlank()) {
      Text(
        text = providerMessage,
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    }

    if (selectedProvider.isNotBlank()) {
      BaoEdgeSearchableChoiceField(
        label = stringResource(R.string.settings_workspace_provider_profile),
        options = providerProfiles,
        selectedValue = selectedProviderProfileId,
        onOptionSelected = onProviderProfileSelected,
        placeholder = stringResource(R.string.settings_workspace_provider_profile_default),
      )
    }

    Text(
      text =
        if (hasStoredProviderApiKey) {
          stringResource(R.string.settings_workspace_provider_key_stored, providerApiKeyMasked)
        } else {
          stringResource(R.string.settings_workspace_provider_key_missing)
        },
      style = MaterialTheme.typography.bodySmall,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
    )
    BaoEdgeSecondaryButton(
      label = if (apiKeySectionExpanded) stringResource(R.string.collapse_all) else stringResource(R.string.expand_all),
      onClick = { apiKeySectionExpanded = !apiKeySectionExpanded },
      modifier = Modifier.fillMaxWidth(),
    )
    if (apiKeySectionExpanded) {
      if (selectedProvider.isNotBlank()) {
        BaoEdgeInput(
          value = selectedProviderProfileId,
          onValueChange = onProviderProfileSelected,
          label = stringResource(R.string.settings_workspace_provider_profile_id),
          modifier = Modifier.fillMaxWidth(),
          singleLine = true,
        )
        BaoEdgeInput(
          value = selectedProviderProfileLabel,
          onValueChange = onProviderProfileLabelChanged,
          label = stringResource(R.string.settings_workspace_provider_profile_label),
          modifier = Modifier.fillMaxWidth(),
          singleLine = true,
        )
      }
      OutlinedTextField(
        value = providerApiKeyDraft,
        onValueChange = onProviderApiKeyDraftChanged,
        modifier = Modifier.fillMaxWidth(),
        label = { Text(stringResource(R.string.ai_provider_api_key)) },
        visualTransformation = PasswordVisualTransformation(),
        singleLine = true,
        trailingIcon = {
          if (providerApiKeyDraft.isNotBlank()) {
            IconButton(onClick = onSaveProviderApiKey) {
              Icon(
                imageVector = Icons.Rounded.CheckCircle,
                contentDescription = stringResource(R.string.settings_workspace_save_key),
              )
            }
          }
        },
      )
      BaoEdgeInput(
        value = controlPlaneBaseUrl,
        onValueChange = onControlPlaneBaseUrlChanged,
        label = stringResource(R.string.control_plane_base_url),
        modifier = Modifier.fillMaxWidth(),
        singleLine = true,
      )
      if (selectedProvider.isNotBlank() && supportsProviderEndpointOverride) {
        BaoEdgeInput(
          value = providerBaseUrl,
          onValueChange = onProviderBaseUrlChanged,
          label = stringResource(R.string.ai_provider_base_url),
          modifier = Modifier.fillMaxWidth(),
          singleLine = true,
        )
      }
    }

    BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
      val isCompactActions = useBaoEdgeCompactActionLayout(maxWidth)
      if (isCompactActions) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
          BaoEdgePrimaryButton(
            label = stringResource(R.string.settings_workspace_save_key),
            onClick = onSaveProviderApiKey,
            modifier = Modifier.fillMaxWidth(),
            enabled = selectedProvider.isNotBlank() && selectedProviderProfileId.isNotBlank(),
            leadingIcon = Icons.Rounded.SettingsEthernet,
          )
          FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            BaoEdgeIconActionButton(
              label = stringResource(R.string.clear),
              icon = Icons.Rounded.Close,
              onClick = onClearProviderApiKey,
              enabled = hasStoredProviderApiKey,
            )
            BaoEdgeIconActionButton(
              label = stringResource(R.string.load_configured_providers),
              icon = Icons.Rounded.Public,
              onClick = onLoadProviders,
              enabled = !isLoadingProviders,
            )
          }
        }
      } else {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
          BaoEdgePrimaryButton(
            label = stringResource(R.string.settings_workspace_save_key),
            onClick = onSaveProviderApiKey,
            modifier = Modifier.fillMaxWidth(),
            enabled = selectedProvider.isNotBlank() && selectedProviderProfileId.isNotBlank(),
            leadingIcon = Icons.Rounded.SettingsEthernet,
          )
          FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            BaoEdgeIconActionButton(
              label = stringResource(R.string.clear),
              icon = Icons.Rounded.Close,
              onClick = onClearProviderApiKey,
              enabled = hasStoredProviderApiKey,
            )
            BaoEdgeIconActionButton(
              label = stringResource(R.string.load_configured_providers),
              icon = Icons.Rounded.Public,
              onClick = onLoadProviders,
              enabled = !isLoadingProviders,
            )
          }
        }
      }
    }
  }
}

@Composable
private fun AiDefaultsCard(
  runtimeUsageOptions: List<OperatorRuntimeUsage>,
  selectedRuntimeUsage: OperatorRuntimeUsage,
  sourceOptions: List<Pair<String, String>>,
  selectedSource: String,
  providerOptions: List<BaoEdgeChoiceOption>,
  selectedProvider: String,
  selectedProviderLabel: String,
  modelOptions: List<String>,
  modelDisplayNames: Map<String, String>,
  selectedModel: String,
  modelMessage: String,
  isLoadingModels: Boolean,
  onRuntimeUsageSelected: (OperatorRuntimeUsage) -> Unit,
  onSourceSelected: (String) -> Unit,
  onProviderSelected: (String) -> Unit,
  onLoadModels: () -> Unit,
  onModelSelected: (String) -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_assignment_editor_title),
    subtitle = null,
  ) {
    BaoEdgeLabeledRadioChoiceGroup(
      title = stringResource(R.string.settings_runtime_usage_title),
      options =
        runtimeUsageOptions.map { usage ->
          BaoEdgeChoiceOption(value = usage.wireValue, label = stringResource(usage.labelResId()))
        },
      selectedOption = selectedRuntimeUsage.wireValue,
      onOptionSelected = { usage ->
        runtimeUsageOptions.firstOrNull { candidate -> candidate.wireValue == usage }?.let(onRuntimeUsageSelected)
      },
    )

    if (sourceOptions.isNotEmpty()) {
      BaoEdgeSearchableChoiceField(
        label = stringResource(R.string.models_workspace_source_title),
        selectedValue = selectedSource,
        options = sourceOptions.map { (id, label) -> BaoEdgeChoiceOption(value = id, label = label) },
        onOptionSelected = onSourceSelected,
        placeholder = stringResource(R.string.operator_not_set),
      )
    }

    if (providerOptions.isNotEmpty()) {
      BaoEdgeSearchableChoiceField(
        label = stringResource(R.string.settings_workspace_assignment_provider_title),
        options = providerOptions,
        selectedValue = selectedProvider,
        onOptionSelected = onProviderSelected,
        placeholder = stringResource(R.string.operator_not_set),
      )
      if (selectedProviderLabel.isNotBlank()) {
        Text(
          text = stringResource(R.string.settings_workspace_assignment_provider_value, selectedProviderLabel),
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
      }
    }

    FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
      BaoEdgeIconActionButton(
        label = stringResource(R.string.runtime_admin_load_models),
        icon = Icons.Rounded.Memory,
        onClick = onLoadModels,
        enabled = selectedProvider.isNotBlank() && !isLoadingModels,
      )
    }

    if (modelMessage.isNotBlank()) {
      Text(
        text = modelMessage,
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    }

    if (modelOptions.isNotEmpty()) {
      BaoEdgeSearchableChoiceField(
        label = stringResource(R.string.operator_model_picker_title),
        selectedValue = selectedModel,
        options =
          modelOptions.map { model ->
            BaoEdgeChoiceOption(value = model, label = modelDisplayNames[model].orEmpty().ifBlank { model })
          },
        onOptionSelected = onModelSelected,
        placeholder = stringResource(R.string.operator_not_set),
      )
    }
  }
}

@Composable
private fun ConversationDefaultsCard(
  requestTts: Boolean,
  ttsVoice: String,
  outputMimeType: String,
  onRequestTtsChanged: (Boolean) -> Unit,
  onTtsVoiceChanged: (String) -> Unit,
  onOutputMimeTypeChanged: (String) -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_voice_title),
    subtitle = null,
  ) {
    BaoEdgeSwitchRow(
      label = stringResource(R.string.operator_request_tts),
      checked = requestTts,
      onCheckedChange = onRequestTtsChanged,
    )
    BaoEdgeInput(
      value = ttsVoice,
      onValueChange = onTtsVoiceChanged,
      label = stringResource(R.string.settings_workspace_tts_voice),
      modifier = Modifier.fillMaxWidth(),
      singleLine = true,
    )
    BaoEdgeInput(
      value = outputMimeType,
      onValueChange = onOutputMimeTypeChanged,
      label = stringResource(R.string.settings_workspace_tts_mime_type),
      modifier = Modifier.fillMaxWidth(),
      singleLine = true,
    )
  }
}

@Composable
private fun HuggingFaceTokenCard(
  maskedToken: String,
  expiresAtLabel: String,
  draftToken: String,
  onDraftTokenChanged: (String) -> Unit,
  onSaveToken: () -> Unit,
  onClearToken: () -> Unit,
) {
  BaoEdgePanel(
    title = stringResource(R.string.settings_workspace_download_access_title),
    subtitle = null,
  ) {
    Text(
      text = maskedToken,
      style = MaterialTheme.typography.bodyMedium,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
    )
    if (expiresAtLabel.isNotBlank()) {
      Text(
        text = expiresAtLabel,
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
      )
    }
    OutlinedTextField(
      value = draftToken,
      onValueChange = onDraftTokenChanged,
      modifier = Modifier.fillMaxWidth(),
      label = { Text(stringResource(R.string.enter_token_manually)) },
      visualTransformation = PasswordVisualTransformation(),
      singleLine = true,
      trailingIcon = {
        if (draftToken.isNotBlank()) {
          IconButton(onClick = onSaveToken) {
            Icon(
              imageVector = Icons.Rounded.CheckCircle,
              contentDescription = stringResource(R.string.settings_workspace_save_token),
            )
          }
        }
      },
    )
    BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
      val isCompactActions = useBaoEdgeCompactActionLayout(maxWidth)
      if (isCompactActions) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
          BaoEdgePrimaryButton(
            label = stringResource(R.string.settings_workspace_save_token),
            onClick = onSaveToken,
            modifier = Modifier.fillMaxWidth(),
            enabled = draftToken.isNotBlank(),
            leadingIcon = Icons.Rounded.Public,
          )
          FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            BaoEdgeIconActionButton(
              label = stringResource(R.string.clear),
              icon = Icons.Rounded.Close,
              onClick = onClearToken,
            )
          }
        }
      } else {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
          BaoEdgePrimaryButton(
            label = stringResource(R.string.settings_workspace_save_token),
            onClick = onSaveToken,
            modifier = Modifier.fillMaxWidth(),
            enabled = draftToken.isNotBlank(),
            leadingIcon = Icons.Rounded.Public,
          )
          FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            BaoEdgeIconActionButton(
              label = stringResource(R.string.clear),
              icon = Icons.Rounded.Close,
              onClick = onClearToken,
            )
          }
        }
      }
    }
  }
}

private fun applyThemeMode(context: Context, theme: Theme) {
  val uiModeManager =
    ContextCompat.getSystemService(context.applicationContext, UiModeManager::class.java) ?: return
  when (theme) {
    Theme.THEME_AUTO -> uiModeManager.setApplicationNightMode(UiModeManager.MODE_NIGHT_AUTO)
    Theme.THEME_LIGHT -> uiModeManager.setApplicationNightMode(UiModeManager.MODE_NIGHT_NO)
    Theme.THEME_DARK -> uiModeManager.setApplicationNightMode(UiModeManager.MODE_NIGHT_YES)
    else -> uiModeManager.setApplicationNightMode(UiModeManager.MODE_NIGHT_AUTO)
  }
}

@Composable
private fun themeLabel(theme: Theme): String {
  return when (theme) {
    Theme.THEME_AUTO -> stringResource(R.string.system)
    Theme.THEME_LIGHT -> stringResource(R.string.light)
    Theme.THEME_DARK -> stringResource(R.string.dark)
    else -> stringResource(R.string.system)
  }
}

private fun maskSecret(secret: String, storedLabel: String): String {
  if (secret.isBlank()) {
    return ""
  }
  if (secret.length <= 8) {
    return storedLabel
  }
  return "${secret.take(4)}••••${secret.takeLast(min(4, secret.length))}"
}

package com.google.ai.edge.gallery.ui.home

import androidx.compose.foundation.BorderStroke
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.sizeIn
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuAnchorType
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.FilledTonalIconButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.ScaffoldDefaults
import androidx.compose.material3.SmallFloatingActionButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.google.ai.edge.gallery.R
import com.google.ai.edge.gallery.ui.common.MarkdownText
import com.google.ai.edge.gallery.ui.theme.BaoEdgeShape
import com.google.ai.edge.gallery.ui.theme.customColors
import com.baohaus.baoedge.core.flow.FlowExecutionState

private val BAO_EDGE_COMPACT_ACTION_WIDTH_THRESHOLD = 520.dp
private const val BAO_EDGE_COMPACT_ACTION_FONT_SCALE_THRESHOLD = 1.15f

@Composable
@ReadOnlyComposable
private fun baoEdgeGold(): Color = MaterialTheme.customColors.appTitleGradientColors.firstOrNull() ?: MaterialTheme.colorScheme.primary

@Composable
@ReadOnlyComposable
private fun baoEdgeGoldSoft(): Color = baoEdgeGold().copy(alpha = 0.16f)

@Composable
@ReadOnlyComposable
private fun baoEdgeBorder(): BorderStroke = BorderStroke(1.dp, MaterialTheme.colorScheme.outlineVariant.copy(alpha = 0.8f))

/** Branded scaffold for operator surfaces. */
@Composable
fun BaoEdgeScaffold(
  topBar: @Composable () -> Unit,
  modifier: Modifier = Modifier,
  floatingActionButton: @Composable () -> Unit = {},
  content: @Composable (PaddingValues) -> Unit,
) {
  Scaffold(
    modifier = modifier.background(MaterialTheme.colorScheme.background),
    topBar = topBar,
    floatingActionButton = floatingActionButton,
    contentColor = MaterialTheme.colorScheme.onBackground,
    containerColor = MaterialTheme.colorScheme.background,
    contentWindowInsets = ScaffoldDefaults.contentWindowInsets,
    content = content,
  )
}

/** Elevated branded panel used across operator surfaces. */
@Composable
fun BaoEdgePanel(
  title: String?,
  modifier: Modifier = Modifier,
  subtitle: String? = null,
  content: @Composable ColumnScope.() -> Unit,
) {
  Card(
    modifier = modifier
      .fillMaxWidth()
      .drawBehind {
        drawCircle(
          brush = com.google.ai.edge.gallery.ui.theme.goldSurfaceGlowBrush(
            center = androidx.compose.ui.geometry.Offset(size.width * 0.3f, size.height * 0.2f)
          ),
          radius = size.maxDimension * 0.6f,
          alpha = 0.03f,
        )
      },
    shape = BaoEdgeShape.Panel,
    border = baoEdgeBorder(),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceContainerLow),
    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
  ) {
    Column(
      modifier = Modifier.fillMaxWidth().padding(horizontal = 18.dp, vertical = 16.dp),
      verticalArrangement = Arrangement.spacedBy(14.dp),
    ) {
      if (!title.isNullOrBlank() || !subtitle.isNullOrBlank()) {
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
          if (!title.isNullOrBlank()) {
            Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
          }
          if (!subtitle.isNullOrBlank()) {
            Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
          }
        }
      }
      content()
    }
  }
}

/** Icon-only compact action — 48dp min touch target; contentDescription from label. */
@Composable
fun BaoEdgeCompactAction(
  label: String,
  icon: ImageVector,
  onClick: () -> Unit,
  modifier: Modifier = Modifier,
  hint: String? = null,
) {
  IconButton(
    onClick = onClick,
    modifier = modifier.sizeIn(minWidth = 48.dp, minHeight = 48.dp),
  ) {
    Icon(
      imageVector = icon,
      contentDescription = if (hint.isNullOrBlank()) label else "$label. $hint",
      tint = baoEdgeGold(),
    )
  }
}

/** Branded runtime/status chip (status/read-only when onClick is null). */
@Composable
fun BaoEdgeChip(
  label: String,
  modifier: Modifier = Modifier,
  active: Boolean = false,
  leadingIcon: ImageVector? = null,
  onClick: (() -> Unit)? = null,
  selectionRole: Role? = null,
) {
  val containerColor = if (active) baoEdgeGoldSoft() else MaterialTheme.colorScheme.surface
  val contentColor = if (active) baoEdgeGold() else MaterialTheme.colorScheme.onSurfaceVariant
  val chipModifier =
    modifier
      .then(if (onClick != null) Modifier.sizeIn(minWidth = 48.dp, minHeight = 48.dp) else Modifier)
      .clip(BaoEdgeShape.Chip)
      .background(containerColor)
      .border(BorderStroke(1.dp, if (active) baoEdgeGold().copy(alpha = 0.55f) else MaterialTheme.colorScheme.outlineVariant.copy(alpha = 0.7f)), BaoEdgeShape.Chip)
      .padding(horizontal = 12.dp, vertical = 9.dp)
  val rowContent: @Composable () -> Unit = {
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
      if (leadingIcon != null) {
        Icon(leadingIcon, contentDescription = null, tint = contentColor, modifier = Modifier.size(16.dp))
      }
      Text(label, style = MaterialTheme.typography.labelMedium, color = contentColor, fontWeight = if (active) FontWeight.SemiBold else FontWeight.Medium)
    }
  }
  if (onClick == null) {
    Box(modifier = chipModifier) { rowContent() }
  } else {
    val interactiveModifier =
      if (selectionRole != null) {
        chipModifier.selectable(
          selected = active,
          role = selectionRole,
          onClick = onClick,
        )
      } else {
        chipModifier.clickable(
          role = Role.Button,
          onClickLabel = label,
          onClick = onClick,
        )
      }
    Box(modifier = interactiveModifier, contentAlignment = Alignment.Center) {
      rowContent()
    }
  }
}

/** Accessible single-choice radio group with full-row tap targets. */
internal data class BaoEdgeChoiceOption(
  val value: String,
  val label: String,
)

internal fun filterBaoEdgeChoiceOptions(
  options: List<BaoEdgeChoiceOption>,
  query: String,
  hasEditedQuery: Boolean,
): List<BaoEdgeChoiceOption> {
  val needle = if (hasEditedQuery) query.trim() else ""
  if (needle.isBlank()) {
    return options
  }
  return options.filter { option ->
    option.label.contains(needle, ignoreCase = true) ||
      option.value.contains(needle, ignoreCase = true)
  }
}

/** Accessible single-choice radio group with full-row tap targets. */
@Composable
internal fun BaoEdgeRadioChoiceGroup(
  title: String,
  options: List<String>,
  selectedOption: String,
  modifier: Modifier = Modifier,
  onOptionSelected: (String) -> Unit,
) {
  BaoEdgeLabeledRadioChoiceGroup(
    title = title,
    options = options.map { option -> BaoEdgeChoiceOption(value = option, label = option) },
    selectedOption = selectedOption,
    modifier = modifier,
    onOptionSelected = onOptionSelected,
  )
}

/** Accessible single-choice radio group with full-row tap targets and display labels. */
@Composable
internal fun BaoEdgeLabeledRadioChoiceGroup(
  title: String,
  options: List<BaoEdgeChoiceOption>,
  selectedOption: String,
  modifier: Modifier = Modifier,
  onOptionSelected: (String) -> Unit,
) {
  if (options.isEmpty()) {
    return
  }

  Column(
    modifier = modifier.selectableGroup(),
    verticalArrangement = Arrangement.spacedBy(8.dp),
  ) {
    Text(
      title,
      style = MaterialTheme.typography.labelLarge,
      fontWeight = FontWeight.SemiBold,
    )
    options.forEach { option ->
      BaoEdgeRadioChoiceRow(
        label = option.label,
        selected = option.value == selectedOption,
        onClick = { onOptionSelected(option.value) },
      )
    }
  }
}

/** Searchable dropdown field for high-cardinality settings like language, provider, and model choice. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun BaoEdgeSearchableChoiceField(
  label: String,
  selectedValue: String,
  options: List<BaoEdgeChoiceOption>,
  onOptionSelected: (String) -> Unit,
  modifier: Modifier = Modifier,
  placeholder: String? = null,
) {
  val selectedLabel =
    options.firstOrNull { option -> option.value == selectedValue }?.label
      ?: selectedValue.ifBlank { placeholder.orEmpty() }
  var expanded by remember { mutableStateOf(false) }
  var query by remember(label, selectedValue, selectedLabel) { mutableStateOf(selectedLabel) }
  var hasEditedQuery by remember(label, selectedValue, selectedLabel) { mutableStateOf(false) }
  val filteredOptions = filterBaoEdgeChoiceOptions(options = options, query = query, hasEditedQuery = hasEditedQuery)

  LaunchedEffect(selectedLabel, expanded) {
    if (!expanded) {
      query = selectedLabel
      hasEditedQuery = false
    }
  }

  ExposedDropdownMenuBox(
    expanded = expanded,
    onExpandedChange = {
      expanded = it
      if (!it) {
        query = selectedLabel
        hasEditedQuery = false
      }
    },
    modifier = modifier.fillMaxWidth(),
  ) {
    OutlinedTextField(
      value = query,
      onValueChange = {
        query = it
        hasEditedQuery = true
        expanded = true
      },
      modifier =
        Modifier
          .menuAnchor(type = ExposedDropdownMenuAnchorType.PrimaryEditable, enabled = true)
          .fillMaxWidth(),
      label = { Text(label) },
      placeholder = placeholder?.let { text -> { Text(text) } },
      trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
      singleLine = true,
      shape = BaoEdgeShape.Input,
      colors = TextFieldDefaults.colors(
        focusedContainerColor = MaterialTheme.colorScheme.surface,
        unfocusedContainerColor = MaterialTheme.colorScheme.surface,
        focusedIndicatorColor = baoEdgeGold(),
        unfocusedIndicatorColor = MaterialTheme.colorScheme.outlineVariant,
        focusedLabelColor = baoEdgeGold(),
      ),
    )
    DropdownMenu(
      expanded = expanded,
      onDismissRequest = {
        expanded = false
        query = selectedLabel
        hasEditedQuery = false
      },
    ) {
      filteredOptions.forEach { option ->
        DropdownMenuItem(
          text = { Text(option.label) },
          onClick = {
            query = option.label
            expanded = false
            hasEditedQuery = false
            onOptionSelected(option.value)
          },
        )
      }
    }
  }
}

/** Returns whether action controls should stack for narrow widths or larger text scales. */
@Composable
internal fun useBaoEdgeCompactActionLayout(maxWidth: Dp): Boolean {
  return maxWidth < BAO_EDGE_COMPACT_ACTION_WIDTH_THRESHOLD ||
    LocalDensity.current.fontScale >= BAO_EDGE_COMPACT_ACTION_FONT_SCALE_THRESHOLD
}

/** Single radio option row that keeps the entire row tappable for accessibility. */
@Composable
internal fun BaoEdgeRadioChoiceRow(
  label: String,
  selected: Boolean,
  modifier: Modifier = Modifier,
  onClick: () -> Unit,
) {
  Row(
    modifier =
      modifier
        .fillMaxWidth()
        .sizeIn(minWidth = 48.dp, minHeight = 48.dp)
        .selectable(
          selected = selected,
          role = Role.RadioButton,
          onClick = onClick,
        )
        .padding(horizontal = 4.dp, vertical = 2.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalAlignment = Alignment.CenterVertically,
  ) {
    androidx.compose.material3.RadioButton(selected = selected, onClick = null)
    Text(
      label,
      modifier = Modifier.weight(1f, fill = false),
      style = MaterialTheme.typography.bodyMedium,
    )
  }
}

/** Full-width switch row that merges the label into one accessible toggle target. */
@Composable
internal fun BaoEdgeSwitchRow(
  label: String,
  checked: Boolean,
  modifier: Modifier = Modifier,
  onCheckedChange: (Boolean) -> Unit,
) {
  Row(
    modifier =
      modifier
        .fillMaxWidth()
        .sizeIn(minWidth = 48.dp, minHeight = 48.dp)
        .semantics(mergeDescendants = true) {}
        .toggleable(
          value = checked,
          role = Role.Switch,
          onValueChange = onCheckedChange,
        )
        .padding(horizontal = 4.dp, vertical = 2.dp),
    horizontalArrangement = Arrangement.spacedBy(16.dp),
    verticalAlignment = Alignment.CenterVertically,
  ) {
    Text(
      label,
      modifier = Modifier.weight(1f),
      style = MaterialTheme.typography.bodyMedium,
    )
    androidx.compose.material3.Switch(
      checked = checked,
      onCheckedChange = null,
      modifier = Modifier.clearAndSetSemantics {},
    )
  }
}

/** Primary branded action button with press scale animation. */
@Composable
fun BaoEdgePrimaryButton(
  label: String,
  onClick: () -> Unit,
  modifier: Modifier = Modifier,
  enabled: Boolean = true,
  leadingIcon: ImageVector? = null,
) {
  val interactionSource = remember { MutableInteractionSource() }
  val isPressed by interactionSource.collectIsPressedAsState()
  val scale by animateFloatAsState(
    targetValue = if (isPressed) 0.96f else 1f,
    animationSpec = tween(durationMillis = 150),
    label = "buttonScale",
  )
  Button(
    onClick = onClick,
    modifier = modifier.scale(scale),
    enabled = enabled,
    shape = BaoEdgeShape.Button,
    interactionSource = interactionSource,
    colors = ButtonDefaults.buttonColors(
      containerColor = baoEdgeGold(),
      contentColor = MaterialTheme.colorScheme.onPrimary,
      disabledContainerColor = MaterialTheme.colorScheme.surfaceContainerHighest,
      disabledContentColor = MaterialTheme.colorScheme.onSurfaceVariant,
    ),
    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 12.dp),
  ) {
    if (leadingIcon != null) {
      Icon(leadingIcon, contentDescription = null, modifier = Modifier.size(18.dp))
      Box(modifier = Modifier.size(8.dp))
    }
    Text(label, fontWeight = FontWeight.SemiBold)
  }
}

/** Secondary branded action button. */
@Composable
fun BaoEdgeSecondaryButton(
  label: String,
  onClick: () -> Unit,
  modifier: Modifier = Modifier,
  enabled: Boolean = true,
  leadingIcon: ImageVector? = null,
) {
  OutlinedButton(
    onClick = onClick,
    modifier = modifier,
    enabled = enabled,
    shape = BaoEdgeShape.Button,
    border = BorderStroke(1.dp, baoEdgeGold().copy(alpha = 0.4f)),
    colors = ButtonDefaults.outlinedButtonColors(contentColor = MaterialTheme.colorScheme.onSurface),
    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 12.dp),
  ) {
    if (leadingIcon != null) {
      Icon(leadingIcon, contentDescription = null, modifier = Modifier.size(18.dp), tint = baoEdgeGold())
      Box(modifier = Modifier.size(8.dp))
    }
    Text(label, fontWeight = FontWeight.Medium)
  }
}

/** Icon-first utility action that keeps a compact label while exposing an explicit description. */
@Composable
fun BaoEdgeIconActionButton(
  label: String,
  icon: ImageVector,
  onClick: () -> Unit,
  modifier: Modifier = Modifier,
  enabled: Boolean = true,
) {
  Column(
    modifier = modifier.widthIn(min = 80.dp, max = 132.dp),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(6.dp),
  ) {
    FilledTonalIconButton(
      onClick = onClick,
      enabled = enabled,
      modifier =
        Modifier
          .size(52.dp)
          .semantics { contentDescription = label },
      shape = BaoEdgeShape.Button,
      colors =
        IconButtonDefaults.filledTonalIconButtonColors(
          containerColor = baoEdgeGoldSoft(),
          contentColor = baoEdgeGold(),
          disabledContainerColor = MaterialTheme.colorScheme.surfaceContainerHighest,
          disabledContentColor = MaterialTheme.colorScheme.onSurfaceVariant,
        ),
    ) {
      Icon(
        imageVector = icon,
        contentDescription = null,
        modifier = Modifier.size(20.dp),
      )
    }
    Text(
      text = label,
      style = MaterialTheme.typography.labelSmall,
      fontWeight = FontWeight.Medium,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
      textAlign = TextAlign.Center,
    )
  }
}

/** Branded multiline input for the operator composer and admin forms. */
@Composable
fun BaoEdgeInput(
  value: String,
  onValueChange: (String) -> Unit,
  label: String? = null,
  modifier: Modifier = Modifier,
  placeholder: String? = null,
  minLines: Int = 1,
  singleLine: Boolean = false,
) {
  OutlinedTextField(
    value = value,
    onValueChange = onValueChange,
    modifier = modifier,
    minLines = minLines,
    singleLine = singleLine,
    shape = BaoEdgeShape.Input,
    label = label?.let { { Text(it) } },
    placeholder = placeholder?.let { { Text(it, color = MaterialTheme.colorScheme.onSurfaceVariant) } },
    colors = TextFieldDefaults.colors(
      focusedContainerColor = MaterialTheme.colorScheme.surface,
      unfocusedContainerColor = MaterialTheme.colorScheme.surface,
      focusedIndicatorColor = baoEdgeGold(),
      unfocusedIndicatorColor = MaterialTheme.colorScheme.outlineVariant,
      focusedLabelColor = baoEdgeGold(),
    ),
  )
}

/** Branded timeline bubble that maps deterministic execution state to one visual contract. */
@Composable
fun BaoEdgeTimelineBubble(
  title: String,
  body: String,
  state: FlowExecutionState,
  renderBodyAsMarkdown: Boolean,
  modifier: Modifier = Modifier,
  accentColor: Color,
  contentColor: Color,
  alignment: Alignment,
) {
  Box(modifier = modifier.fillMaxWidth(), contentAlignment = alignment) {
    Card(
      modifier = Modifier.fillMaxWidth(0.94f),
      shape = BaoEdgeShape.Input,
      border = BorderStroke(1.dp, accentColor.copy(alpha = 0.28f)),
      colors = CardDefaults.cardColors(containerColor = accentColor.copy(alpha = 0.14f), contentColor = contentColor),
    ) {
      Column(modifier = Modifier.padding(15.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
        Text(title, style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.SemiBold)
        if (renderBodyAsMarkdown) {
          MarkdownText(
            text = body,
            smallFontSize = true,
            textColor = contentColor,
            modifier = Modifier.fillMaxWidth(),
          )
        } else {
          Text(body, style = MaterialTheme.typography.bodyMedium)
        }
        Text(operatorStateLabel(state), style = MaterialTheme.typography.labelSmall, color = contentColor.copy(alpha = 0.72f))
      }
    }
  }
}

/** Render operator timeline content as Markdown for non-user entries. */
internal fun shouldRenderOperatorTimelineBodyAsMarkdown(role: OperatorTimelineRole): Boolean = role != OperatorTimelineRole.USER

/** Branded summary row for execution and readiness states. */
@Composable
fun BaoEdgeStatusCard(
  title: String,
  state: FlowExecutionState,
  detail: String,
  modifier: Modifier = Modifier,
) {
  Card(
    modifier = modifier.fillMaxWidth(),
    shape = BaoEdgeShape.Bubble,
    border = baoEdgeBorder(),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
  ) {
    Column(modifier = Modifier.fillMaxWidth().padding(horizontal = 14.dp, vertical = 12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
      Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Text(title, style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.SemiBold)
        Text(operatorStateLabel(state), style = MaterialTheme.typography.labelSmall, color = operatorStateColor(state))
      }
      if (detail.isNotBlank()) {
        Text(detail, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
      }
    }
  }
}

/** Floating chat shortcut with pulsing gold glow. */
@Composable
fun BaoEdgeFloatingChatBubble(
  onClick: () -> Unit,
  contentDescription: String,
  modifier: Modifier = Modifier,
  icon: ImageVector,
) {
  val infiniteTransition = androidx.compose.animation.core.rememberInfiniteTransition(label = "fabPulse")
  val glowAlpha by infiniteTransition.animateFloat(
    initialValue = 0.3f,
    targetValue = 0.6f,
    animationSpec = androidx.compose.animation.core.infiniteRepeatable(
      animation = tween(2000, easing = androidx.compose.animation.core.FastOutSlowInEasing),
      repeatMode = androidx.compose.animation.core.RepeatMode.Reverse,
    ),
    label = "glowAlpha",
  )
  SmallFloatingActionButton(
    onClick = onClick,
    modifier = modifier
      .size(56.dp)
      .drawBehind {
        drawCircle(
          color = com.google.ai.edge.gallery.ui.theme.goldGradientMid,
          radius = size.maxDimension * 0.7f,
          alpha = glowAlpha * 0.15f,
        )
      },
    shape = CircleShape,
    containerColor = baoEdgeGold(),
    contentColor = MaterialTheme.colorScheme.onPrimary,
  ) {
    Icon(icon, contentDescription = contentDescription, modifier = Modifier.size(22.dp))
  }
}

@Composable
private fun operatorStateColor(state: FlowExecutionState): Color {
  return when (state) {
    FlowExecutionState.SUCCESS -> MaterialTheme.customColors.successColor
    FlowExecutionState.ERROR_RETRYABLE,
    FlowExecutionState.ERROR_NON_RETRYABLE,
    FlowExecutionState.UNAUTHORIZED -> MaterialTheme.colorScheme.error
    FlowExecutionState.LOADING -> baoEdgeGold()
    FlowExecutionState.EMPTY,
    FlowExecutionState.IDLE -> MaterialTheme.colorScheme.onSurfaceVariant
  }
}

@Composable
private fun operatorStateLabel(state: FlowExecutionState): String {
  return when (state) {
    FlowExecutionState.IDLE -> stringResource(R.string.operator_state_idle)
    FlowExecutionState.LOADING -> stringResource(R.string.operator_state_loading)
    FlowExecutionState.SUCCESS -> stringResource(R.string.operator_state_success)
    FlowExecutionState.EMPTY -> stringResource(R.string.operator_state_empty)
    FlowExecutionState.ERROR_RETRYABLE -> stringResource(R.string.operator_state_error_retryable)
    FlowExecutionState.ERROR_NON_RETRYABLE -> stringResource(R.string.operator_state_error_non_retryable)
    FlowExecutionState.UNAUTHORIZED -> stringResource(R.string.operator_state_unauthorized)
  }
}

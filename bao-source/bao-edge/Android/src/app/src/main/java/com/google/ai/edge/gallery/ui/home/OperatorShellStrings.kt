package com.google.ai.edge.gallery.ui.home

import android.content.Context
import com.google.ai.edge.gallery.R
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Inject
import javax.inject.Singleton

/** String contract used by the operator shell so its state logic stays unit-testable. */
interface OperatorShellStrings {
  /** Fallback title for persisted threads without a title. */
  fun threadUntitled(): String

  /** Loading copy shown while one thread is being resolved. */
  fun threadLoading(): String

  /** Success copy shown after a thread is loaded without a title. */
  fun threadLoaded(): String

  /** Retryable error copy shown when thread loading fails. */
  fun conversationLoadFailed(): String

  /** Fallback label used for approval timeline entries. */
  fun approvalTitle(): String

  /** User timeline title. */
  fun userTitle(): String

  /** Assistant timeline title. */
  fun assistantTitle(): String

  /** Runtime/system timeline title. */
  fun runtimeTitle(): String

  /** Validation error shown when the draft is empty. */
  fun inputMissing(): String

  /** Validation error shown when unsupported speech payloads are sent. */
  fun speechNotSupported(): String

  /** Validation error shown when the provider is missing. */
  fun providerRequired(): String

  /** Validation error shown when the model is missing. */
  fun modelRequired(): String

  /** Loading copy shown while the workflow is running. */
  fun sending(): String

  /** Retryable failure shown when the workflow request fails. */
  fun sendFailed(): String

  /** Automation recipe: capture a screen flow. */
  fun automationRecipeCapture(): String

  /** Automation recipe: capture prompt. */
  fun automationRecipeCapturePrompt(): String

  /** Automation recipe: check a settings path. */
  fun automationRecipeSettings(): String

  /** Automation recipe: settings prompt. */
  fun automationRecipeSettingsPrompt(): String

  /** Automation recipe: prepare a recurring check. */
  fun automationRecipeSchedule(): String

  /** Automation recipe: schedule prompt. */
  fun automationRecipeSchedulePrompt(): String

  /** Fallback title for automation flows without a goal line. */
  fun flowDefaultTitle(): String

  /** Default message when sending an image with no user input. */
  fun defaultImagePrompt(): String

  /** Default message when sending audio with no user input. */
  fun defaultAudioPrompt(): String
}

@Singleton
class AndroidOperatorShellStrings
@Inject
constructor(
  @ApplicationContext private val context: Context,
) : OperatorShellStrings {
  override fun threadUntitled(): String = context.getString(R.string.operator_thread_untitled)

  override fun threadLoading(): String = context.getString(R.string.operator_thread_loading)

  override fun threadLoaded(): String = context.getString(R.string.operator_conversation_loaded)

  override fun conversationLoadFailed(): String =
    context.getString(R.string.operator_conversation_load_failed)

  override fun approvalTitle(): String = context.getString(R.string.operator_approval_title)

  override fun userTitle(): String = context.getString(R.string.operator_timeline_user_title)

  override fun assistantTitle(): String =
    context.getString(R.string.operator_timeline_assistant_title)

  override fun runtimeTitle(): String = context.getString(R.string.operator_timeline_runtime_title)

  override fun inputMissing(): String = context.getString(R.string.cloud_chat_input_missing)

  override fun speechNotSupported(): String =
    context.getString(R.string.cloud_chat_speech_not_supported)

  override fun providerRequired(): String =
    context.getString(R.string.cloud_chat_provider_required)

  override fun modelRequired(): String = context.getString(R.string.cloud_chat_model_required)

  override fun sending(): String = context.getString(R.string.cloud_chat_sending)

  override fun sendFailed(): String = context.getString(R.string.cloud_chat_send_failed)

  override fun automationRecipeCapture(): String =
    context.getString(R.string.operator_automation_recipe_capture)

  override fun automationRecipeCapturePrompt(): String =
    context.getString(R.string.operator_automation_recipe_capture_prompt)

  override fun automationRecipeSettings(): String =
    context.getString(R.string.operator_automation_recipe_settings)

  override fun automationRecipeSettingsPrompt(): String =
    context.getString(R.string.operator_automation_recipe_settings_prompt)

  override fun automationRecipeSchedule(): String =
    context.getString(R.string.operator_automation_recipe_schedule)

  override fun automationRecipeSchedulePrompt(): String =
    context.getString(R.string.operator_automation_recipe_schedule_prompt)

  override fun flowDefaultTitle(): String =
    context.getString(R.string.operator_flow_default_title)

  override fun defaultImagePrompt(): String =
    context.getString(R.string.operator_default_image_prompt)

  override fun defaultAudioPrompt(): String =
    context.getString(R.string.operator_default_audio_prompt)
}

@Module
@InstallIn(SingletonComponent::class)
internal abstract class OperatorShellStringsModule {
  @Binds
  abstract fun bindOperatorShellStrings(
    implementation: AndroidOperatorShellStrings,
  ): OperatorShellStrings
}

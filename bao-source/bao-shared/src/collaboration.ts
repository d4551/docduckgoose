/**
 * Shared collaboration view-model and surface-scope contracts.
 *
 */

import type { TranslationKey } from "./i18n";

/** Supported chat-surface scopes in route handlers. */
export type CollaborationSurfaceScope = "internal" | "portal" | "public";

/** Shared collaboration surface value. */
export type CollaborationSurfaceValue = "INTERNAL" | "PORTAL" | "PUBLIC";

/** AI assistant actions available to collaboration threads. */
export type CollaborationAssistantAction =
  | "REPLY"
  | "SUMMARIZE_THREAD"
  | "CREATE_AUTOMATION_RUN"
  | "BUILD_REPORT_PACK"
  | "COMPARE_REPORT_VERSIONS"
  | "START_PUBLIC_HANDOFF"
  | "REQUEST_ML_ANALYSIS";

/** Default control-plane targets exposed in the collaboration UI. */
export type CollaborationAssistantTargets = Readonly<{
  automationDefinitionId: string | null;
  reportPackId: string | null;
  savedReportId: string | null;
  mlExperimentId: string | null;
}>;

/** Thread participant rendered in the workspace roster and mention controls. */
export type ConversationParticipantView = Readonly<{
  id: string;
  label: string;
  roleLabel: string;
  audienceLabel: string;
  isAi: boolean;
  isViewer: boolean;
}>;

/** Stored mention snapshot rendered on messages and in composer chips. */
export type ConversationMentionView = Readonly<{
  participantId: string;
  label: string;
  audienceLabel: string;
  isAi: boolean;
}>;

/** Linked business record or workspace anchor attached to a thread. */
export type ConversationAnchorView = Readonly<{
  id: string;
  label: string;
  href: string | null;
}>;

/** Conversation summary shown in rails and selectors. */
export type ConversationSummary = Readonly<{
  id: string;
  title: string;
  description: string;
  surface: CollaborationSurfaceValue;
  typeLabel: string;
  participantCount: number;
  messageCount: number;
  aiEnabled: boolean;
  unreadCount: number;
  latestMessagePreview: string;
  updatedAt: string;
}>;

/** Message row rendered in a thread. */
export type ConversationMessageView = Readonly<{
  id: string;
  authorLabel: string;
  authorAudienceLabel: string;
  kind: string;
  kindLabel: string | null;
  content: string;
  createdAt: string;
  isAi: boolean;
  isViewer: boolean;
  mentions: readonly ConversationMentionView[];
}>;

/** Active thread detail. */
export type ConversationThreadView = Readonly<{
  id: string;
  title: string;
  description: string;
  surface: CollaborationSurfaceValue;
  typeLabel: string;
  aiEnabled: boolean;
  participantCount: number;
  messageCount: number;
  anchorCount: number;
  participants: readonly ConversationParticipantView[];
  linkedRecords: readonly ConversationAnchorView[];
  messages: readonly ConversationMessageView[];
}>;

/** Collaboration page workspace model. */
export type CollaborationWorkspaceModel = Readonly<{
  surface: CollaborationSurfaceValue;
  title: string;
  description: string;
  conversations: readonly ConversationSummary[];
  activeConversation: ConversationThreadView | null;
  assistantTargets: CollaborationAssistantTargets;
  pageContext: string;
}>;

export const MAX_MESSAGE_LENGTH = 2_000;
export const MAX_MESSAGE_MENTIONS = 8;
export const MAX_PREVIEW_LENGTH = 120;
export const MAX_THREAD_MESSAGES = 24;
export const MAX_AI_TRANSCRIPT_MESSAGES = 10;

export const SURFACE_BY_SCOPE: Readonly<
  Record<CollaborationSurfaceScope, CollaborationSurfaceValue>
> = {
  internal: "INTERNAL",
  portal: "PORTAL",
  public: "PUBLIC",
};

export const SURFACE_TITLE_KEY: Readonly<Record<CollaborationSurfaceScope, TranslationKey>> = {
  internal: "chat.workspace.internalTitle",
  portal: "chat.workspace.portalTitle",
  public: "chat.workspace.publicTitle",
};

export const SURFACE_DESCRIPTION_KEY: Readonly<Record<CollaborationSurfaceScope, TranslationKey>> =
  {
    internal: "chat.workspace.internalDescription",
    portal: "chat.workspace.portalDescription",
    public: "chat.workspace.publicDescription",
  };

export const EMPTY_ASSISTANT_TARGETS: CollaborationAssistantTargets = {
  automationDefinitionId: null,
  reportPackId: null,
  savedReportId: null,
  mlExperimentId: null,
};

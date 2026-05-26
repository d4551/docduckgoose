/**
 * Shared Help Center content configuration.
 *
 * Provides the canonical, locale-keyed Help Center categories, topics, and FAQs
 * for both API delivery and UI rendering.
 *
 * @packageDocumentation
 */

/**
 * Supported Help Center category identifiers.
 */
export const HELP_CENTER_CATEGORY_IDS: readonly [
  "getting-started",
  "user-management",
  "devices",
  "ai-providers",
  "automation",
  "storage",
  "integrations",
  "compliance",
] = [
  "getting-started",
  "user-management",
  "devices",
  "ai-providers",
  "automation",
  "storage",
  "integrations",
  "compliance",
] as const;

/**
 * Supported Help Center category identifier type.
 */
export type HelpCenterCategoryId = (typeof HELP_CENTER_CATEGORY_IDS)[number];

/**
 * Supported route keys for Help Center topics.
 */
export type HelpCenterRouteKey =
  | "admin.users"
  | "clinical.cases"
  | "devices.root"
  | "automation.root"
  | "ai.root"
  | "hub.infrastructure"
  | "clinical.reports"
  | "automation.rpa"
  | "xr.root"
  | "ai.labs.training";

/**
 * Help Center content i18n key map.
 */
export const HELP_CENTER_CONTENT_KEYS = {
  categories: {
    gettingStarted: "admin.helpCenter.content.categories.gettingStarted",
    userManagement: "admin.helpCenter.content.categories.userManagement",
    devices: "admin.helpCenter.content.categories.devices",
    aiProviders: "admin.helpCenter.content.categories.aiProviders",
    automation: "admin.helpCenter.content.categories.automation",
    storage: "admin.helpCenter.content.categories.storage",
    integrations: "admin.helpCenter.content.categories.integrations",
    compliance: "admin.helpCenter.content.categories.compliance",
  },
  topics: {
    onboarding: {
      title: "admin.helpCenter.content.topics.onboarding.title",
      description: "admin.helpCenter.content.topics.onboarding.description",
    },
    caseIntake: {
      title: "admin.helpCenter.content.topics.caseIntake.title",
      description: "admin.helpCenter.content.topics.caseIntake.description",
    },
    deviceOps: {
      title: "admin.helpCenter.content.topics.deviceOps.title",
      description: "admin.helpCenter.content.topics.deviceOps.description",
    },
    automation: {
      title: "admin.helpCenter.content.topics.automation.title",
      description: "admin.helpCenter.content.topics.automation.description",
    },
    aiProviders: {
      title: "admin.helpCenter.content.topics.aiProviders.title",
      description: "admin.helpCenter.content.topics.aiProviders.description",
    },
    storage: {
      title: "admin.helpCenter.content.topics.storage.title",
      description: "admin.helpCenter.content.topics.storage.description",
    },
    fhirIntegrations: {
      title: "admin.helpCenter.content.topics.fhirIntegrations.title",
      description: "admin.helpCenter.content.topics.fhirIntegrations.description",
    },
    compliance: {
      title: "admin.helpCenter.content.topics.compliance.title",
      description: "admin.helpCenter.content.topics.compliance.description",
    },
    userManagement: {
      title: "admin.helpCenter.content.topics.userManagement.title",
      description: "admin.helpCenter.content.topics.userManagement.description",
    },
    rpaWorkflows: {
      title: "admin.helpCenter.content.topics.rpaWorkflows.title",
      description: "admin.helpCenter.content.topics.rpaWorkflows.description",
    },
    xrExperiences: {
      title: "admin.helpCenter.content.topics.xrExperiences.title",
      description: "admin.helpCenter.content.topics.xrExperiences.description",
    },
    trainingJobs: {
      title: "admin.helpCenter.content.topics.trainingJobs.title",
      description: "admin.helpCenter.content.topics.trainingJobs.description",
    },
  },
  faqs: {
    firstLogin: {
      question: "admin.helpCenter.content.faqs.firstLogin.question",
      answer: "admin.helpCenter.content.faqs.firstLogin.answer",
    },
    navigation: {
      question: "admin.helpCenter.content.faqs.navigation.question",
      answer: "admin.helpCenter.content.faqs.navigation.answer",
    },
    dashboard: {
      question: "admin.helpCenter.content.faqs.dashboard.question",
      answer: "admin.helpCenter.content.faqs.dashboard.answer",
    },
    addOperator: {
      question: "admin.helpCenter.content.faqs.addOperator.question",
      answer: "admin.helpCenter.content.faqs.addOperator.answer",
    },
    updateRole: {
      question: "admin.helpCenter.content.faqs.updateRole.question",
      answer: "admin.helpCenter.content.faqs.updateRole.answer",
    },
    suspendAccess: {
      question: "admin.helpCenter.content.faqs.suspendAccess.question",
      answer: "admin.helpCenter.content.faqs.suspendAccess.answer",
    },
    resetPassword: {
      question: "admin.helpCenter.content.faqs.resetPassword.question",
      answer: "admin.helpCenter.content.faqs.resetPassword.answer",
    },
    connectScanner: {
      question: "admin.helpCenter.content.faqs.connectScanner.question",
      answer: "admin.helpCenter.content.faqs.connectScanner.answer",
    },
    deviceOffline: {
      question: "admin.helpCenter.content.faqs.deviceOffline.question",
      answer: "admin.helpCenter.content.faqs.deviceOffline.answer",
    },
    calibrateCamera: {
      question: "admin.helpCenter.content.faqs.calibrateCamera.question",
      answer: "admin.helpCenter.content.faqs.calibrateCamera.answer",
    },
    connectAi: {
      question: "admin.helpCenter.content.faqs.connectAi.question",
      answer: "admin.helpCenter.content.faqs.connectAi.answer",
    },
    modelRouting: {
      question: "admin.helpCenter.content.faqs.modelRouting.question",
      answer: "admin.helpCenter.content.faqs.modelRouting.answer",
    },
    aiCosts: {
      question: "admin.helpCenter.content.faqs.aiCosts.question",
      answer: "admin.helpCenter.content.faqs.aiCosts.answer",
    },
    validateBaoDown: {
      question: "admin.helpCenter.content.faqs.validateBaoDown.question",
      answer: "admin.helpCenter.content.faqs.validateBaoDown.answer",
    },
    createWorkflow: {
      question: "admin.helpCenter.content.faqs.createWorkflow.question",
      answer: "admin.helpCenter.content.faqs.createWorkflow.answer",
    },
    scheduleAutomation: {
      question: "admin.helpCenter.content.faqs.scheduleAutomation.question",
      answer: "admin.helpCenter.content.faqs.scheduleAutomation.answer",
    },
    auditStorage: {
      question: "admin.helpCenter.content.faqs.auditStorage.question",
      answer: "admin.helpCenter.content.faqs.auditStorage.answer",
    },
    retentionPolicies: {
      question: "admin.helpCenter.content.faqs.retentionPolicies.question",
      answer: "admin.helpCenter.content.faqs.retentionPolicies.answer",
    },
    restoreArchived: {
      question: "admin.helpCenter.content.faqs.restoreArchived.question",
      answer: "admin.helpCenter.content.faqs.restoreArchived.answer",
    },
    fhirConnect: {
      question: "admin.helpCenter.content.faqs.fhirConnect.question",
      answer: "admin.helpCenter.content.faqs.fhirConnect.answer",
    },
    webhookSetup: {
      question: "admin.helpCenter.content.faqs.webhookSetup.question",
      answer: "admin.helpCenter.content.faqs.webhookSetup.answer",
    },
    apiKeys: {
      question: "admin.helpCenter.content.faqs.apiKeys.question",
      answer: "admin.helpCenter.content.faqs.apiKeys.answer",
    },
    auditLogs: {
      question: "admin.helpCenter.content.faqs.auditLogs.question",
      answer: "admin.helpCenter.content.faqs.auditLogs.answer",
    },
    complianceReports: {
      question: "admin.helpCenter.content.faqs.complianceReports.question",
      answer: "admin.helpCenter.content.faqs.complianceReports.answer",
    },
    dataExport: {
      question: "admin.helpCenter.content.faqs.dataExport.question",
      answer: "admin.helpCenter.content.faqs.dataExport.answer",
    },
  },
} as const;

/**
 * Help Center category configuration entry.
 */
export interface HelpCenterCategoryConfig {
  /** Category identifier. */
  id: HelpCenterCategoryId;
  /** i18n label key. */
  labelKey: string;
  /** Iconify icon class. */
  icon: string;
}

/**
 * Help Center topic configuration entry.
 */
export interface HelpCenterTopicConfig {
  /** Topic identifier. */
  id: string;
  /** i18n title key. */
  titleKey: string;
  /** i18n description key. */
  descriptionKey: string;
  /** Iconify icon class. */
  icon: string;
  /** Icon color class. */
  iconColor: string;
  /** Icon background class. */
  iconBg: string;
  /** Optional route registry key. */
  routeKey?: HelpCenterRouteKey;
  /** Category for filtering. */
  category: HelpCenterCategoryId;
  /** Search tags. */
  tags: string[];
}

/**
 * Help Center FAQ configuration entry.
 */
export interface HelpCenterFaqConfig {
  /** FAQ identifier. */
  id: string;
  /** i18n question key. */
  questionKey: string;
  /** i18n answer key. */
  answerKey: string;
  /** Category for filtering. */
  category: HelpCenterCategoryId;
  /** Search tags. */
  tags: string[];
}

/**
 * Help Center content configuration payload.
 */
export interface HelpCenterContent {
  /** Category definitions. */
  categories: HelpCenterCategoryConfig[];
  /** Topic definitions. */
  topics: HelpCenterTopicConfig[];
  /** FAQ definitions. */
  faqs: HelpCenterFaqConfig[];
}

/**
 * Canonical Help Center content configuration.
 */
export const HELP_CENTER_CONTENT: HelpCenterContent = {
  categories: [
    {
      id: "getting-started",
      labelKey: HELP_CENTER_CONTENT_KEYS.categories.gettingStarted,
      icon: "lucide--rocket",
    },
    {
      id: "user-management",
      labelKey: HELP_CENTER_CONTENT_KEYS.categories.userManagement,
      icon: "lucide--users",
    },
    {
      id: "devices",
      labelKey: HELP_CENTER_CONTENT_KEYS.categories.devices,
      icon: "lucide--cpu",
    },
    {
      id: "ai-providers",
      labelKey: HELP_CENTER_CONTENT_KEYS.categories.aiProviders,
      icon: "lucide--brain-circuit",
    },
    {
      id: "automation",
      labelKey: HELP_CENTER_CONTENT_KEYS.categories.automation,
      icon: "lucide--workflow",
    },
    {
      id: "storage",
      labelKey: HELP_CENTER_CONTENT_KEYS.categories.storage,
      icon: "lucide--hard-drive",
    },
    {
      id: "integrations",
      labelKey: HELP_CENTER_CONTENT_KEYS.categories.integrations,
      icon: "lucide--plug",
    },
    {
      id: "compliance",
      labelKey: HELP_CENTER_CONTENT_KEYS.categories.compliance,
      icon: "lucide--shield-check",
    },
  ],
  topics: [
    {
      id: "onboarding",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.onboarding.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.onboarding.description,
      icon: "lucide--user-plus",
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      routeKey: "admin.users",
      category: "getting-started",
      tags: ["users", "onboarding", "roles", "permissions", "setup"],
    },
    {
      id: "case-intake",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.caseIntake.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.caseIntake.description,
      icon: "lucide--clipboard-list",
      iconColor: "text-secondary",
      iconBg: "bg-secondary/10",
      routeKey: "clinical.cases",
      category: "getting-started",
      tags: ["cases", "intake", "accessioning", "specimens", "workflow"],
    },
    {
      id: "device-ops",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.deviceOps.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.deviceOps.description,
      icon: "lucide--cpu",
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
      routeKey: "devices.root",
      category: "devices",
      tags: ["devices", "hardware", "scanners", "cameras", "bunbuddies", "basler"],
    },
    {
      id: "automation",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.automation.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.automation.description,
      icon: "lucide--workflow",
      iconColor: "text-warning",
      iconBg: "bg-warning/10",
      routeKey: "automation.root",
      category: "automation",
      tags: ["automation", "baodown", "workflows", "triggers", "orchestration", "rpa"],
    },
    {
      id: "ai-providers",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.aiProviders.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.aiProviders.description,
      icon: "lucide--brain-circuit",
      iconColor: "text-info",
      iconBg: "bg-info/10",
      routeKey: "ai.root",
      category: "ai-providers",
      tags: ["ai", "nvidia", "nim", "azure", "openai", "huggingface", "models"],
    },
    {
      id: "storage",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.storage.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.storage.description,
      icon: "lucide--hard-drive",
      iconColor: "text-success",
      iconBg: "bg-success/10",
      routeKey: "hub.infrastructure",
      category: "storage",
      tags: ["storage", "minio", "seaweedfs", "archives", "retention", "s3"],
    },
    {
      id: "fhir-integrations",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.fhirIntegrations.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.fhirIntegrations.description,
      icon: "lucide--plug",
      iconColor: "text-error",
      iconBg: "bg-error/10",
      routeKey: "hub.infrastructure",
      category: "integrations",
      tags: ["fhir", "ehr", "integrations", "hl7", "clinical", "interoperability"],
    },
    {
      id: "compliance",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.compliance.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.compliance.description,
      icon: "lucide--shield-check",
      iconColor: "text-neutral",
      iconBg: "bg-neutral/10",
      routeKey: "clinical.reports",
      category: "compliance",
      tags: ["compliance", "audit", "soc2", "hipaa", "reports", "policies"],
    },
    {
      id: "user-management",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.userManagement.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.userManagement.description,
      icon: "lucide--users",
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      routeKey: "admin.users",
      category: "user-management",
      tags: ["users", "accounts", "roles", "permissions", "teams"],
    },
    {
      id: "rpa-workflows",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.rpaWorkflows.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.rpaWorkflows.description,
      icon: "lucide--bot",
      iconColor: "text-secondary",
      iconBg: "bg-secondary/10",
      routeKey: "automation.rpa",
      category: "automation",
      tags: ["rpa", "automation", "workflows", "bots", "scripts"],
    },
    {
      id: "xr-experiences",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.xrExperiences.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.xrExperiences.description,
      icon: "lucide--glasses",
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
      routeKey: "xr.root",
      category: "integrations",
      tags: ["xr", "ar", "vr", "3d", "spatial", "mixed-reality"],
    },
    {
      id: "training-jobs",
      titleKey: HELP_CENTER_CONTENT_KEYS.topics.trainingJobs.title,
      descriptionKey: HELP_CENTER_CONTENT_KEYS.topics.trainingJobs.description,
      icon: "lucide--graduation-cap",
      iconColor: "text-info",
      iconBg: "bg-info/10",
      routeKey: "ai.labs.training",
      category: "ai-providers",
      tags: ["training", "ml", "machine-learning", "models", "jobs"],
    },
  ],
  faqs: [
    {
      id: "faq-first-login",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.firstLogin.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.firstLogin.answer,
      category: "getting-started",
      tags: ["login", "setup", "password", "2fa", "first-time"],
    },
    {
      id: "faq-navigation",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.navigation.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.navigation.answer,
      category: "getting-started",
      tags: ["navigation", "menu", "sidebar", "interface"],
    },
    {
      id: "faq-dashboard",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.dashboard.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.dashboard.answer,
      category: "getting-started",
      tags: ["dashboard", "widgets", "metrics", "overview"],
    },
    {
      id: "faq-add-operator",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.addOperator.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.addOperator.answer,
      category: "user-management",
      tags: ["users", "add", "invite", "operator", "create"],
    },
    {
      id: "faq-update-role",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.updateRole.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.updateRole.answer,
      category: "user-management",
      tags: ["roles", "permissions", "update", "change"],
    },
    {
      id: "faq-suspend-access",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.suspendAccess.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.suspendAccess.answer,
      category: "user-management",
      tags: ["suspend", "disable", "access", "deactivate"],
    },
    {
      id: "faq-reset-password",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.resetPassword.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.resetPassword.answer,
      category: "user-management",
      tags: ["password", "reset", "sso", "security"],
    },
    {
      id: "faq-connect-scanner",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.connectScanner.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.connectScanner.answer,
      category: "devices",
      tags: ["scanner", "connect", "device", "setup"],
    },
    {
      id: "faq-device-offline",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.deviceOffline.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.deviceOffline.answer,
      category: "devices",
      tags: ["offline", "troubleshoot", "network", "connectivity"],
    },
    {
      id: "faq-calibrate-camera",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.calibrateCamera.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.calibrateCamera.answer,
      category: "devices",
      tags: ["calibration", "camera", "setup", "accuracy"],
    },
    {
      id: "faq-connect-ai",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.connectAi.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.connectAi.answer,
      category: "ai-providers",
      tags: ["nvidia", "azure", "openai", "nim", "connect", "credentials"],
    },
    {
      id: "faq-model-routing",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.modelRouting.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.modelRouting.answer,
      category: "ai-providers",
      tags: ["routing", "models", "fallback", "priority"],
    },
    {
      id: "faq-ai-costs",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.aiCosts.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.aiCosts.answer,
      category: "ai-providers",
      tags: ["usage", "costs", "budget", "monitoring", "tokens"],
    },
    {
      id: "faq-validate-baodown",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.validateBaoDown.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.validateBaoDown.answer,
      category: "automation",
      tags: ["automation", "baodown", "validation", "flows", "test"],
    },
    {
      id: "faq-create-workflow",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.createWorkflow.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.createWorkflow.answer,
      category: "automation",
      tags: ["workflow", "create", "automation", "triggers"],
    },
    {
      id: "faq-schedule-automation",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.scheduleAutomation.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.scheduleAutomation.answer,
      category: "automation",
      tags: ["schedule", "cron", "timing", "triggers"],
    },
    {
      id: "faq-audit-storage",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.auditStorage.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.auditStorage.answer,
      category: "storage",
      tags: ["storage", "health", "audit", "capacity", "minio"],
    },
    {
      id: "faq-retention-policies",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.retentionPolicies.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.retentionPolicies.answer,
      category: "storage",
      tags: ["retention", "policies", "archival", "deletion"],
    },
    {
      id: "faq-restore-archived",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.restoreArchived.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.restoreArchived.answer,
      category: "storage",
      tags: ["restore", "archive", "recovery", "glacier"],
    },
    {
      id: "faq-fhir-connect",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.fhirConnect.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.fhirConnect.answer,
      category: "integrations",
      tags: ["fhir", "connect", "endpoint", "ehr"],
    },
    {
      id: "faq-webhook-setup",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.webhookSetup.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.webhookSetup.answer,
      category: "integrations",
      tags: ["webhooks", "events", "notifications", "api"],
    },
    {
      id: "faq-api-keys",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.apiKeys.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.apiKeys.answer,
      category: "integrations",
      tags: ["api", "keys", "authentication", "security"],
    },
    {
      id: "faq-audit-logs",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.auditLogs.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.auditLogs.answer,
      category: "compliance",
      tags: ["audit", "logs", "trail", "history"],
    },
    {
      id: "faq-compliance-reports",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.complianceReports.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.complianceReports.answer,
      category: "compliance",
      tags: ["reports", "soc2", "hipaa", "compliance", "export"],
    },
    {
      id: "faq-data-export",
      questionKey: HELP_CENTER_CONTENT_KEYS.faqs.dataExport.question,
      answerKey: HELP_CENTER_CONTENT_KEYS.faqs.dataExport.answer,
      category: "compliance",
      tags: ["export", "data", "auditors", "download"],
    },
  ],
};

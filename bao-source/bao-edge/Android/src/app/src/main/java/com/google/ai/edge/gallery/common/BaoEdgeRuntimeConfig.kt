package com.google.ai.edge.gallery.common

import android.os.Build
import com.google.ai.edge.gallery.BuildConfig
import java.net.URL

/** Typed runtime configuration for Bao Edge branding and auth defaults. */
data class BaoEdgeOAuthConfig(
  val clientId: String,
  val redirectUri: String,
  val redirectScheme: String,
)

/** Maximum time (ms) to wait for an LLM model instance to initialize before timing out. */
const val MODEL_INIT_TIMEOUT_MS = 60_000L

/** Runtime access point for non-hardcoded app configuration values. */
object BaoEdgeRuntimeConfig {
  private const val DEFAULT_MODEL_SOURCE_BASE_URL = "https://huggingface.co"
  private const val DEFAULT_SOURCE_REPOSITORY = "d4551/baohaus"
  private const val DEFAULT_SOURCE_REPOSITORY_REF = "main"
  private const val DEFAULT_LITERT_DOCS_REPOSITORY = "google-ai-edge/LiteRT-LM"
  private const val DEFAULT_LITERT_DOCS_REPOSITORY_REF = "main"
  private const val DEFAULT_MODEL_ALLOWLIST_BASE_URL = "asset://"
  private const val DEFAULT_GEMMA_TERMS_URL = "https://ai.google.dev/gemma/terms"
  private const val DEFAULT_GOOGLE_PRIVACY_POLICY_URL =
    "https://policies.google.com/privacy?hl=en-US"
  private const val DEFAULT_GOOGLE_TERMS_OF_SERVICE_URL =
    "https://policies.google.com/terms?hl=en-US"
  private const val DEFAULT_MOBILE_ACTIONS_GUIDE_URL =
    "https://ai.google.dev/gemma/docs/mobile-actions"
  private const val DEFAULT_CONTROL_PLANE_BASE_URL = "http://127.0.0.1:3310"
  private const val DEFAULT_CONTROL_PLANE_CONNECT_TIMEOUT_MS = 15_000
  private const val DEFAULT_CONTROL_PLANE_READ_TIMEOUT_MS = 30_000
  private const val DEFAULT_CONTROL_PLANE_POLL_INTERVAL_MS = 900
  private const val DEFAULT_CONTROL_PLANE_POLL_ATTEMPTS = 180
  private const val DEFAULT_CONTROL_PLANE_DEFAULT_PULL_TIMEOUT_MS = 120_000
  private const val DEFAULT_CONTROL_PLANE_MODEL_STATE_ID_PREFIX = "model-state"
  private const val DEFAULT_DEVICE_AI_REQUIRED_MODEL_REF =
    "huggingface.co/mradermacher/AutoGLM-Phone-9B-Multilingual-GGUF"
  private const val DEFAULT_DEVICE_AI_REQUIRED_MODEL_REVISION =
    "5b34029a6b23a90aea2e377f1f9b273d1001638c"
  private const val DEFAULT_DEVICE_AI_REQUIRED_MODEL_FILE =
    "AutoGLM-Phone-9B-Multilingual.Q4_K_M.gguf"
  private const val DEFAULT_DEVICE_AI_REQUIRED_MODEL_SHA256 =
    "12b91074f0dfffee7e2732501ba8c5eecf3b1187dd08a91d71fb1e23437a073f"
  private const val DEFAULT_DEVICE_AI_MODEL_DIRECTORY = "bao-edge-device-ai/models"
  private const val DEFAULT_DEVICE_AI_PROTOCOL_TIMEOUT_MS = 900_000
  private const val DEFAULT_DEVICE_AI_REPORT_MAX_AGE_MINUTES = 240
  private const val DEFAULT_DEVICE_AI_DOWNLOAD_MAX_ATTEMPTS = 3
  private const val DEFAULT_OPERATOR_APPLE_MACBOOK_PRO_BUY_URL =
    "https://www.apple.com/shop/buy-mac/macbook-pro/16-inch"
  private const val DEFAULT_OPERATOR_NATIVE_WEB_RESEARCH_TIMEOUT_MS = 20_000
  private const val DEFAULT_OPERATOR_NATIVE_WEB_RESEARCH_POLL_INTERVAL_MS = 350
  private const val DEFAULT_OPERATOR_CALENDAR_DEFAULT_DURATION_MINUTES = 60
  private const val DEFAULT_GEMMA_PROHIBITED_USE_POLICY_URL =
    "https://ai.google.dev/gemma/prohibited_use_policy"
  private const val DEFAULT_GEMMA_TERMS_MODEL_DOWNLOAD_BASE_URL =
    "https://dl.google.com/google-ai-edge-gallery"
  private const val DEFAULT_TINY_GARDEN_ASSET_BASE_URL = "https://appassets.androidplatform.net"
  private const val DEFAULT_TINY_GARDEN_ASSET_PATH = "assets/tinygarden"
  private const val AOSP_EMULATOR_CONTROL_PLANE_HOST = "10.0.2.2"
  private const val GENYMOTION_CONTROL_PLANE_HOST = "10.0.3.2"
  private val CONTROL_PLANE_LOOPBACK_HOSTS = setOf("127.0.0.1", "localhost")

  private fun normalizeBaseUrl(raw: String, fallback: String): String {
    val value = raw.trim().ifBlank { fallback }
    if (value == DEFAULT_MODEL_ALLOWLIST_BASE_URL) {
      return value
    }
    return value.trimEnd('/')
  }

  private fun joinUrl(baseUrl: String, path: String): String {
    return "${baseUrl.trimEnd('/')}/${path.trimStart('/')}"
  }

  private fun normalizeRepositoryPath(path: String): String {
    return path.trim().trimStart('/')
  }

  private fun repositoryBlobUrl(repositoryBaseUrl: String, repositoryRef: String, path: String): String =
    joinUrl(repositoryBaseUrl, "blob/$repositoryRef/${normalizeRepositoryPath(path)}")

  private fun repositoryTreeUrl(repositoryBaseUrl: String, repositoryRef: String, path: String): String =
    joinUrl(repositoryBaseUrl, "tree/$repositoryRef/${normalizeRepositoryPath(path)}")

  /** Source base URL for OAuth and model-related web endpoints (overrideable). */
  val modelSourceBaseUrl: String = normalizeBaseUrl(
    BuildConfig.BAO_EDGE_HF_BASE_URL,
    DEFAULT_MODEL_SOURCE_BASE_URL,
  )

  val modelDownloadBaseUrl: String = modelSourceBaseUrl

  /** Owner/repository slug for source links, release checks, and repository asset defaults. */
  val sourceRepository: String =
    BuildConfig.BAO_EDGE_SOURCE_REPOSITORY.trim()
      .ifBlank { DEFAULT_SOURCE_REPOSITORY }

  /** Default branch or ref used when building source and repository asset links for the app. */
  val sourceRepositoryRef: String =
    BuildConfig.BAO_EDGE_SOURCE_REPOSITORY_REF.trim()
      .ifBlank { DEFAULT_SOURCE_REPOSITORY_REF }

  /** Owner/repository slug for external LiteRT documentation links used by built-in tasks. */
  val liteRtDocsRepository: String =
    BuildConfig.BAO_EDGE_LITERT_DOCS_REPOSITORY.trim()
      .ifBlank { DEFAULT_LITERT_DOCS_REPOSITORY }

  /** Default branch or ref used when building external LiteRT documentation links. */
  val liteRtDocsRepositoryRef: String =
    BuildConfig.BAO_EDGE_LITERT_DOCS_REPOSITORY_REF.trim()
      .ifBlank { DEFAULT_LITERT_DOCS_REPOSITORY_REF }

  private val sourceRepositoryBaseUrl: String = joinUrl("https://github.com", sourceRepository)
  private val liteRtDocsRepositoryBaseUrl: String = joinUrl("https://github.com", liteRtDocsRepository)
  val modelAllowlistBaseUrl: String = normalizeBaseUrl(
    BuildConfig.BAO_EDGE_MODEL_ALLOWLIST_BASE_URL,
    DEFAULT_MODEL_ALLOWLIST_BASE_URL,
  )

  /** Canonical Gemma terms URL used by native legal surfaces. */
  val gemmaTermsUrl: String = DEFAULT_GEMMA_TERMS_URL

  /** Canonical Google Privacy Policy URL used by the app terms dialog. */
  val googlePrivacyPolicyUrl: String = DEFAULT_GOOGLE_PRIVACY_POLICY_URL

  /** Canonical Google Terms of Service URL used by the app terms dialog. */
  val googleTermsOfServiceUrl: String = DEFAULT_GOOGLE_TERMS_OF_SERVICE_URL

  /** Canonical guide URL for the gated Mobile Actions challenge flow. */
  val mobileActionsGuideUrl: String = DEFAULT_MOBILE_ACTIONS_GUIDE_URL

  /** Canonical LiteRT-LM Kotlin README URL used by task documentation links. */
  val liteRtLmKotlinReadmeUrl: String =
    repositoryBlobUrl(liteRtDocsRepositoryBaseUrl, liteRtDocsRepositoryRef, "kotlin/README.md")

  /**
   * Canonical model-download base URL that requires Gemma terms acceptance before downloading.
   */
  val gemmaTermsModelDownloadBaseUrl: String = normalizeBaseUrl(
    BuildConfig.BAO_EDGE_GEMMA_TERMS_MODEL_DOWNLOAD_BASE_URL,
    DEFAULT_GEMMA_TERMS_MODEL_DOWNLOAD_BASE_URL,
  )

  val controlPlaneBaseUrl: String = normalizeBaseUrl(
    BuildConfig.BAO_EDGE_CONTROL_PLANE_BASE_URL,
    DEFAULT_CONTROL_PLANE_BASE_URL,
  )

  /**
   * Returns ordered base URL candidates for the Android control-plane client.
   *
   * Loopback hosts are preserved first for direct-on-device and `adb reverse` setups, then expanded
   * to emulator host aliases so the same configured base URL works on the Android emulator and
   * Genymotion without per-device manual edits.
   */
  internal fun resolveControlPlaneCandidateBaseUrls(
    baseUrl: String,
    localHostAliases: List<String> = controlPlaneLocalHostAliases(),
  ): List<String> {
    val normalizedBaseUrl = normalizeBaseUrl(baseUrl, controlPlaneBaseUrl)
    val parsed = runCatching { URL(normalizedBaseUrl) }.getOrNull() ?: return listOf(normalizedBaseUrl)
    val host = parsed.host?.lowercase()?.trim().orEmpty()
    if (host !in CONTROL_PLANE_LOOPBACK_HOSTS) {
      return listOf(normalizedBaseUrl)
    }

    return buildList {
      add(normalizedBaseUrl)
      for (alias in localHostAliases) {
        replaceUriHost(parsed = parsed, host = alias)?.let(::add)
      }
    }.distinct()
  }

  val controlPlaneConnectTimeoutMs: Int =
    BuildConfig.BAO_EDGE_CONTROL_PLANE_CONNECT_TIMEOUT_MS.takeIf { it > 0 }
      ?: DEFAULT_CONTROL_PLANE_CONNECT_TIMEOUT_MS

  val controlPlaneReadTimeoutMs: Int =
    BuildConfig.BAO_EDGE_CONTROL_PLANE_READ_TIMEOUT_MS.takeIf { it > 0 }
      ?: DEFAULT_CONTROL_PLANE_READ_TIMEOUT_MS

  val controlPlanePollIntervalMs: Int =
    BuildConfig.BAO_EDGE_CONTROL_PLANE_POLL_INTERVAL_MS.takeIf { it > 0 }
      ?: DEFAULT_CONTROL_PLANE_POLL_INTERVAL_MS

  val controlPlanePollAttempts: Int =
    BuildConfig.BAO_EDGE_CONTROL_PLANE_POLL_ATTEMPTS.takeIf { it > 0 }
      ?: DEFAULT_CONTROL_PLANE_POLL_ATTEMPTS

  val controlPlaneDefaultPullTimeoutMs: Int =
    BuildConfig.BAO_EDGE_CONTROL_PLANE_DEFAULT_PULL_TIMEOUT_MS.takeIf { it > 0 }
      ?: DEFAULT_CONTROL_PLANE_DEFAULT_PULL_TIMEOUT_MS

  /** Optional registry override; blank means use the control-plane source registry default. */
  val controlPlaneDefaultModelSource: String =
    BuildConfig.BAO_EDGE_CONTROL_PLANE_DEFAULT_MODEL_SOURCE
      .trim()

  val controlPlaneModelStateIdPrefix: String =
    BuildConfig.BAO_EDGE_CONTROL_PLANE_MODEL_STATE_ID_PREFIX.trim()
      .trimEnd('-')
      .ifBlank { DEFAULT_CONTROL_PLANE_MODEL_STATE_ID_PREFIX }

  val deviceAiRequiredModelRef: String =
    BuildConfig.BAO_EDGE_REQUIRED_MODEL_REF.trim()
      .ifBlank { DEFAULT_DEVICE_AI_REQUIRED_MODEL_REF }

  val deviceAiRequiredModelRevision: String =
    BuildConfig.BAO_EDGE_REQUIRED_MODEL_REVISION.trim()
      .ifBlank { DEFAULT_DEVICE_AI_REQUIRED_MODEL_REVISION }

  val deviceAiRequiredModelFileName: String =
    BuildConfig.BAO_EDGE_REQUIRED_MODEL_FILE.trim()
      .ifBlank { DEFAULT_DEVICE_AI_REQUIRED_MODEL_FILE }

  val deviceAiRequiredModelSha256: String =
    BuildConfig.BAO_EDGE_REQUIRED_MODEL_SHA256.trim()
      .ifBlank { DEFAULT_DEVICE_AI_REQUIRED_MODEL_SHA256 }

  val deviceAiManagedModelDirectory: String =
    BuildConfig.BAO_EDGE_DEVICE_AI_MODEL_DIRECTORY.trim()
      .trim('/')
      .ifBlank { DEFAULT_DEVICE_AI_MODEL_DIRECTORY }

  val deviceAiProtocolTimeoutMs: Int =
    BuildConfig.BAO_EDGE_DEVICE_AI_PROTOCOL_TIMEOUT_MS.takeIf { it > 0 }
      ?: DEFAULT_DEVICE_AI_PROTOCOL_TIMEOUT_MS

  val deviceAiReportMaxAgeMinutes: Int =
    BuildConfig.BAO_EDGE_DEVICE_AI_REPORT_MAX_AGE_MINUTES.takeIf { it > 0 }
      ?: DEFAULT_DEVICE_AI_REPORT_MAX_AGE_MINUTES

  val deviceAiDownloadMaxAttempts: Int =
    BuildConfig.BAO_EDGE_DEVICE_AI_DOWNLOAD_MAX_ATTEMPTS.takeIf { it > 0 }
      ?: DEFAULT_DEVICE_AI_DOWNLOAD_MAX_ATTEMPTS

  /** Canonical live Apple buy URL used by the Android operator research flow. */
  val operatorAppleMacBookProBuyUrl: String = normalizeBaseUrl(
    BuildConfig.BAO_EDGE_OPERATOR_APPLE_MACBOOK_PRO_BUY_URL,
    DEFAULT_OPERATOR_APPLE_MACBOOK_PRO_BUY_URL,
  )

  /** Maximum time the native operator WebView research flow can spend loading Apple pricing. */
  val operatorNativeWebResearchTimeoutMs: Int =
    BuildConfig.BAO_EDGE_OPERATOR_NATIVE_WEB_RESEARCH_TIMEOUT_MS.takeIf { it > 0 }
      ?: DEFAULT_OPERATOR_NATIVE_WEB_RESEARCH_TIMEOUT_MS

  /** Poll interval used while waiting for the Apple buy page bootstrap payload to hydrate. */
  val operatorNativeWebResearchPollIntervalMs: Int =
    BuildConfig.BAO_EDGE_OPERATOR_NATIVE_WEB_RESEARCH_POLL_INTERVAL_MS.takeIf { it > 0 }
      ?: DEFAULT_OPERATOR_NATIVE_WEB_RESEARCH_POLL_INTERVAL_MS

  /** Default duration, in minutes, for operator-created calendar events without an explicit end. */
  val operatorCalendarDefaultDurationMinutes: Int =
    BuildConfig.BAO_EDGE_OPERATOR_CALENDAR_DEFAULT_DURATION_MINUTES.takeIf { it > 0 }
      ?: DEFAULT_OPERATOR_CALENDAR_DEFAULT_DURATION_MINUTES

  val tinyGardenAssetBaseUrl: String = normalizeBaseUrl(
    BuildConfig.BAO_EDGE_TINY_GARDEN_ASSET_BASE_URL,
    DEFAULT_TINY_GARDEN_ASSET_BASE_URL,
  )

  val tinyGardenAssetPath: String =
    BuildConfig.BAO_EDGE_TINY_GARDEN_ASSET_PATH.trim()
      .trim('/')
      .ifBlank { DEFAULT_TINY_GARDEN_ASSET_PATH }

  val deviceAiHfToken: String =
    BuildConfig.BAO_EDGE_DEVICE_AI_HF_TOKEN.trim()

  val appName: String = BuildConfig.BAO_EDGE_APP_NAME.ifBlank { "Bao Edge" }

  val brandTagline: String =
    BuildConfig.BAO_EDGE_BRAND_TAGLINE.ifBlank { "Concierge-grade mobile automation" }

  val applicationId: String = BuildConfig.BAO_EDGE_APPLICATION_ID.ifBlank { "com.baohaus.baoedge" }

  val deepLinkScheme: String =
    BuildConfig.BAO_EDGE_DEEP_LINK_SCHEME.ifBlank { "com.baohaus.baoedge" }

  /** URL to the model community hub displayed in the app intro. */
  val modelCommunityUrl: String = "${modelSourceBaseUrl}/litert-community"

  /** GitHub releases API endpoint used for in-app release checks. */
  val sourceRepositoryLatestReleaseApiUrl: String =
    joinUrl("https://api.github.com/repos", "$sourceRepository/releases/latest")

  /** Canonical Gemma prohibited-use-policy URL used by legal settings links. */
  val gemmaProhibitedUsePolicyUrl: String = DEFAULT_GEMMA_PROHIBITED_USE_POLICY_URL

  /** Builds a source file URL in the configured repository for the active ref. */
  fun sourceRepositoryBlobUrl(path: String): String =
    repositoryBlobUrl(sourceRepositoryBaseUrl, sourceRepositoryRef, path)

  /** Builds a source directory URL in the configured repository for the active ref. */
  fun sourceRepositoryTreeUrl(path: String): String =
    repositoryTreeUrl(sourceRepositoryBaseUrl, sourceRepositoryRef, path)

  /** Builds a repository file URL in the configured repository for the active ref. */
  fun sourceRepositoryFileUrl(path: String): String =
    sourceRepositoryBlobUrl(path)

  val oauth: BaoEdgeOAuthConfig =
    BaoEdgeOAuthConfig(
      clientId = BuildConfig.BAO_EDGE_HF_CLIENT_ID,
      redirectUri = BuildConfig.BAO_EDGE_HF_REDIRECT_URI,
      redirectScheme = BuildConfig.BAO_EDGE_HF_REDIRECT_SCHEME,
    )

  private fun controlPlaneLocalHostAliases(): List<String> {
    return if (isGenymotionRuntime()) {
      listOf(GENYMOTION_CONTROL_PLANE_HOST, AOSP_EMULATOR_CONTROL_PLANE_HOST)
    } else {
      listOf(AOSP_EMULATOR_CONTROL_PLANE_HOST, GENYMOTION_CONTROL_PLANE_HOST)
    }
  }

  private fun isGenymotionRuntime(): Boolean {
    val runtimeDescriptors =
      listOf(
        Build.MANUFACTURER,
        Build.BRAND,
        Build.MODEL,
        Build.DEVICE,
        Build.FINGERPRINT,
        Build.PRODUCT,
      )
    return runtimeDescriptors.any { descriptor ->
      descriptor.contains("genymotion", ignoreCase = true) || descriptor.contains("vbox", ignoreCase = true)
    }
  }

  private fun replaceUriHost(parsed: URL, host: String): String? {
    val path = parsed.path?.trimEnd('/').orEmpty()
    val portSuffix = if (parsed.port >= 0) ":${parsed.port}" else ""
    val normalizedPath = if (path == "/") "" else path
    return runCatching {
      "${parsed.protocol}://$host$portSuffix$normalizedPath".trimEnd('/')
    }.getOrNull()
  }
}

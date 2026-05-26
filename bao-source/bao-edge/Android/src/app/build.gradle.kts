/*
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

plugins {
  alias(libs.plugins.android.application)
  // Note: set apply to true to enable google-services (requires google-services.json).
  alias(libs.plugins.google.services) apply false
  alias(libs.plugins.kotlin.android)
  alias(libs.plugins.kotlin.compose)
  alias(libs.plugins.kotlin.serialization)
  alias(libs.plugins.protobuf)
  alias(libs.plugins.hilt.application)
  alias(libs.plugins.ksp)
  alias(libs.plugins.oss.licenses)
}

fun resolveConfig(name: String, defaultValue: String): String {
  return project.findProperty(name)?.toString()
    ?: providers.gradleProperty(name).orNull
    ?: System.getenv(name)
    ?: defaultValue
}

fun buildConfigString(value: String): String {
  val escaped = value.replace("\\", "\\\\").replace("\"", "\\\"")
  return "\"$escaped\""
}

val frontierBaoAppName = resolveConfig(name = "BAO_EDGE_APP_NAME", defaultValue = "Bao Edge")
val frontierBaoTagline =
  resolveConfig(
    name = "BAO_EDGE_BRAND_TAGLINE",
    defaultValue = "Concierge-grade mobile automation",
  )
val frontierBaoAppId = resolveConfig(name = "BAO_EDGE_APPLICATION_ID", defaultValue = "com.baohaus.baoedge")
val frontierBaoDeepLinkScheme = resolveConfig(name = "BAO_EDGE_DEEP_LINK_SCHEME", defaultValue = "com.baohaus.baoedge")
val frontierBaoHfRedirectScheme =
  resolveConfig(name = "BAO_EDGE_HF_REDIRECT_SCHEME", defaultValue = "combaohausbaoedge")
val frontierBaoHfClientId = resolveConfig(name = "BAO_EDGE_HF_CLIENT_ID", defaultValue = "")
if (frontierBaoHfClientId.isBlank()) {
  logger.warn("BAO_EDGE_HF_CLIENT_ID is not set. HuggingFace OAuth will not work.")
}
val frontierBaoHfRedirectUri =
  resolveConfig(name = "BAO_EDGE_HF_REDIRECT_URI", defaultValue = "$frontierBaoHfRedirectScheme://callback")
val frontierBaoHfBaseUrl = resolveConfig(
  name = "BAO_EDGE_HF_BASE_URL",
  defaultValue = "https://huggingface.co",
)
val frontierBaoSourceRepository = resolveConfig(
  name = "BAO_EDGE_SOURCE_REPOSITORY",
  defaultValue = "d4551/baohaus",
)
val frontierBaoSourceRepositoryRef = resolveConfig(
  name = "BAO_EDGE_SOURCE_REPOSITORY_REF",
  defaultValue = "main",
)
val frontierBaoLiteRtDocsRepository = resolveConfig(
  name = "BAO_EDGE_LITERT_DOCS_REPOSITORY",
  defaultValue = "google-ai-edge/LiteRT-LM",
)
val frontierBaoLiteRtDocsRepositoryRef = resolveConfig(
  name = "BAO_EDGE_LITERT_DOCS_REPOSITORY_REF",
  defaultValue = "main",
)
val frontierBaoModelAllowlistBaseUrl = resolveConfig(
  name = "BAO_EDGE_MODEL_ALLOWLIST_BASE_URL",
  defaultValue = "asset://",
)
val frontierBaoGemmaTermsModelDownloadBaseUrl = resolveConfig(
  name = "BAO_EDGE_GEMMA_TERMS_MODEL_DOWNLOAD_BASE_URL",
  defaultValue = "https://dl.google.com/google-ai-edge-gallery",
)
val frontierBaoControlPlaneBaseUrl = resolveConfig(
  name = "BAO_EDGE_CONTROL_PLANE_BASE_URL",
  defaultValue = "http://127.0.0.1:3310",
)
val frontierBaoControlPlaneConnectTimeoutMs = resolveConfig(
  name = "BAO_EDGE_CONTROL_PLANE_CONNECT_TIMEOUT_MS",
  defaultValue = "15000",
)
val frontierBaoControlPlaneReadTimeoutMs = resolveConfig(
  name = "BAO_EDGE_CONTROL_PLANE_READ_TIMEOUT_MS",
  defaultValue = "30000",
)
val frontierBaoControlPlanePollIntervalMs = resolveConfig(
  name = "BAO_EDGE_CONTROL_PLANE_POLL_INTERVAL_MS",
  defaultValue = "900",
)
val frontierBaoControlPlanePollAttempts = resolveConfig(
  name = "BAO_EDGE_CONTROL_PLANE_POLL_ATTEMPTS",
  defaultValue = "180",
)
val frontierBaoControlPlaneDefaultPullTimeoutMs = resolveConfig(
  name = "BAO_EDGE_CONTROL_PLANE_DEFAULT_PULL_TIMEOUT_MS",
  defaultValue = "120000",
)
val frontierBaoControlPlaneDefaultModelSource = resolveConfig(
  name = "BAO_EDGE_CONTROL_PLANE_DEFAULT_MODEL_SOURCE",
  defaultValue = "",
)
val frontierBaoControlPlaneModelStateIdPrefix = resolveConfig(
  name = "BAO_EDGE_CONTROL_PLANE_MODEL_STATE_ID_PREFIX",
  defaultValue = "model-state",
)
val frontierBaoRequiredModelRef = resolveConfig(
  name = "BAO_EDGE_REQUIRED_MODEL_REF",
  defaultValue = "huggingface.co/mradermacher/AutoGLM-Phone-9B-Multilingual-GGUF",
)
val frontierBaoRequiredModelRevision = resolveConfig(
  name = "BAO_EDGE_REQUIRED_MODEL_REVISION",
  defaultValue = "5b34029a6b23a90aea2e377f1f9b273d1001638c",
)
val frontierBaoRequiredModelFile = resolveConfig(
  name = "BAO_EDGE_REQUIRED_MODEL_FILE",
  defaultValue = "AutoGLM-Phone-9B-Multilingual.Q4_K_M.gguf",
)
val frontierBaoRequiredModelSha256 = resolveConfig(
  name = "BAO_EDGE_REQUIRED_MODEL_SHA256",
  defaultValue = "12b91074f0dfffee7e2732501ba8c5eecf3b1187dd08a91d71fb1e23437a073f",
)
val frontierBaoDeviceAiModelDirectory = resolveConfig(
  name = "BAO_EDGE_DEVICE_AI_MODEL_DIRECTORY",
  defaultValue = "bao-edge-device-ai/models",
)
val frontierBaoDeviceAiProtocolTimeoutMs = resolveConfig(
  name = "BAO_EDGE_DEVICE_AI_PROTOCOL_TIMEOUT_MS",
  defaultValue = "900000",
)
val frontierBaoDeviceAiReportMaxAgeMinutes = resolveConfig(
  name = "BAO_EDGE_DEVICE_AI_REPORT_MAX_AGE_MINUTES",
  defaultValue = "240",
)
val frontierBaoDeviceAiDownloadMaxAttempts = resolveConfig(
  name = "BAO_EDGE_DEVICE_AI_DOWNLOAD_MAX_ATTEMPTS",
  defaultValue = "3",
)
val frontierBaoOperatorAppleMacBookProBuyUrl = resolveConfig(
  name = "BAO_EDGE_OPERATOR_APPLE_MACBOOK_PRO_BUY_URL",
  defaultValue = "https://www.apple.com/shop/buy-mac/macbook-pro/16-inch",
)
val frontierBaoOperatorNativeWebResearchTimeoutMs = resolveConfig(
  name = "BAO_EDGE_OPERATOR_NATIVE_WEB_RESEARCH_TIMEOUT_MS",
  defaultValue = "20000",
)
val frontierBaoOperatorNativeWebResearchPollIntervalMs = resolveConfig(
  name = "BAO_EDGE_OPERATOR_NATIVE_WEB_RESEARCH_POLL_INTERVAL_MS",
  defaultValue = "350",
)
val frontierBaoOperatorCalendarDefaultDurationMinutes = resolveConfig(
  name = "BAO_EDGE_OPERATOR_CALENDAR_DEFAULT_DURATION_MINUTES",
  defaultValue = "60",
)
val frontierBaoTinyGardenAssetBaseUrl = resolveConfig(
  name = "BAO_EDGE_TINY_GARDEN_ASSET_BASE_URL",
  defaultValue = "https://appassets.androidplatform.net",
)
val frontierBaoTinyGardenAssetPath = resolveConfig(
  name = "BAO_EDGE_TINY_GARDEN_ASSET_PATH",
  defaultValue = "assets/tinygarden",
)
val frontierBaoDeviceAiHfToken = resolveConfig(
  name = "BAO_EDGE_DEVICE_AI_HF_TOKEN",
  defaultValue = resolveConfig(
    name = "HF_TOKEN",
    defaultValue = resolveConfig(name = "HUGGINGFACE_HUB_TOKEN", defaultValue = ""),
  ),
)

android {
  namespace = "com.google.ai.edge.gallery"
  compileSdk = 35

  sourceSets {
    getByName("main") {
      assets.srcDir("../../../model_allowlists")
    }
  }

  defaultConfig {
    applicationId = frontierBaoAppId
    minSdk = 31
    targetSdk = 35
    versionCode = 19
    versionName = "1.0.10"

    // Needed for HuggingFace auth workflows.
    // Use the scheme of the "Redirect URLs" in HuggingFace app.
    manifestPlaceholders["appAuthRedirectScheme"] = frontierBaoHfRedirectScheme
    manifestPlaceholders["deepLinkScheme"] = frontierBaoDeepLinkScheme
    manifestPlaceholders["applicationName"] = "com.google.ai.edge.gallery.GalleryApplication"

    buildConfigField("String", "BAO_EDGE_APP_NAME", buildConfigString(frontierBaoAppName))
    buildConfigField("String", "BAO_EDGE_BRAND_TAGLINE", buildConfigString(frontierBaoTagline))
    buildConfigField("String", "BAO_EDGE_APPLICATION_ID", buildConfigString(frontierBaoAppId))
    buildConfigField("String", "BAO_EDGE_DEEP_LINK_SCHEME", buildConfigString(frontierBaoDeepLinkScheme))
    buildConfigField("String", "BAO_EDGE_HF_CLIENT_ID", buildConfigString(frontierBaoHfClientId))
    buildConfigField("String", "BAO_EDGE_HF_REDIRECT_URI", buildConfigString(frontierBaoHfRedirectUri))
    buildConfigField("String", "BAO_EDGE_HF_REDIRECT_SCHEME", buildConfigString(frontierBaoHfRedirectScheme))
    buildConfigField("String", "BAO_EDGE_HF_BASE_URL", buildConfigString(frontierBaoHfBaseUrl))
    buildConfigField(
      "String",
      "BAO_EDGE_SOURCE_REPOSITORY",
      buildConfigString(frontierBaoSourceRepository),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_SOURCE_REPOSITORY_REF",
      buildConfigString(frontierBaoSourceRepositoryRef),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_LITERT_DOCS_REPOSITORY",
      buildConfigString(frontierBaoLiteRtDocsRepository),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_LITERT_DOCS_REPOSITORY_REF",
      buildConfigString(frontierBaoLiteRtDocsRepositoryRef),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_MODEL_ALLOWLIST_BASE_URL",
      buildConfigString(frontierBaoModelAllowlistBaseUrl),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_GEMMA_TERMS_MODEL_DOWNLOAD_BASE_URL",
      buildConfigString(frontierBaoGemmaTermsModelDownloadBaseUrl),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_CONTROL_PLANE_BASE_URL",
      buildConfigString(frontierBaoControlPlaneBaseUrl),
    )
    buildConfigField(
      "int",
      "BAO_EDGE_CONTROL_PLANE_CONNECT_TIMEOUT_MS",
      frontierBaoControlPlaneConnectTimeoutMs,
    )
    buildConfigField(
      "int",
      "BAO_EDGE_CONTROL_PLANE_READ_TIMEOUT_MS",
      frontierBaoControlPlaneReadTimeoutMs,
    )
    buildConfigField(
      "int",
      "BAO_EDGE_CONTROL_PLANE_POLL_INTERVAL_MS",
      frontierBaoControlPlanePollIntervalMs,
    )
    buildConfigField(
      "int",
      "BAO_EDGE_CONTROL_PLANE_POLL_ATTEMPTS",
      frontierBaoControlPlanePollAttempts,
    )
    buildConfigField(
      "int",
      "BAO_EDGE_CONTROL_PLANE_DEFAULT_PULL_TIMEOUT_MS",
      frontierBaoControlPlaneDefaultPullTimeoutMs,
    )
    buildConfigField(
      "String",
      "BAO_EDGE_CONTROL_PLANE_DEFAULT_MODEL_SOURCE",
      buildConfigString(frontierBaoControlPlaneDefaultModelSource),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_CONTROL_PLANE_MODEL_STATE_ID_PREFIX",
      buildConfigString(frontierBaoControlPlaneModelStateIdPrefix),
    )
    buildConfigField("String", "BAO_EDGE_REQUIRED_MODEL_REF", buildConfigString(frontierBaoRequiredModelRef))
    buildConfigField(
      "String",
      "BAO_EDGE_REQUIRED_MODEL_REVISION",
      buildConfigString(frontierBaoRequiredModelRevision),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_REQUIRED_MODEL_FILE",
      buildConfigString(frontierBaoRequiredModelFile),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_REQUIRED_MODEL_SHA256",
      buildConfigString(frontierBaoRequiredModelSha256),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_DEVICE_AI_MODEL_DIRECTORY",
      buildConfigString(frontierBaoDeviceAiModelDirectory),
    )
    buildConfigField(
      "int",
      "BAO_EDGE_DEVICE_AI_PROTOCOL_TIMEOUT_MS",
      frontierBaoDeviceAiProtocolTimeoutMs,
    )
    buildConfigField(
      "int",
      "BAO_EDGE_DEVICE_AI_REPORT_MAX_AGE_MINUTES",
      frontierBaoDeviceAiReportMaxAgeMinutes,
    )
    buildConfigField(
      "int",
      "BAO_EDGE_DEVICE_AI_DOWNLOAD_MAX_ATTEMPTS",
      frontierBaoDeviceAiDownloadMaxAttempts,
    )
    buildConfigField(
      "String",
      "BAO_EDGE_OPERATOR_APPLE_MACBOOK_PRO_BUY_URL",
      buildConfigString(frontierBaoOperatorAppleMacBookProBuyUrl),
    )
    buildConfigField(
      "int",
      "BAO_EDGE_OPERATOR_NATIVE_WEB_RESEARCH_TIMEOUT_MS",
      frontierBaoOperatorNativeWebResearchTimeoutMs,
    )
    buildConfigField(
      "int",
      "BAO_EDGE_OPERATOR_NATIVE_WEB_RESEARCH_POLL_INTERVAL_MS",
      frontierBaoOperatorNativeWebResearchPollIntervalMs,
    )
    buildConfigField(
      "int",
      "BAO_EDGE_OPERATOR_CALENDAR_DEFAULT_DURATION_MINUTES",
      frontierBaoOperatorCalendarDefaultDurationMinutes,
    )
    buildConfigField(
      "String",
      "BAO_EDGE_TINY_GARDEN_ASSET_BASE_URL",
      buildConfigString(frontierBaoTinyGardenAssetBaseUrl),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_TINY_GARDEN_ASSET_PATH",
      buildConfigString(frontierBaoTinyGardenAssetPath),
    )
    buildConfigField(
      "String",
      "BAO_EDGE_DEVICE_AI_HF_TOKEN",
      buildConfigString(frontierBaoDeviceAiHfToken),
    )

    testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
  }

  signingConfigs {
    create("release") {
      val keystorePath = resolveConfig("BAO_EDGE_RELEASE_KEYSTORE_FILE", "")
      if (keystorePath.isNotBlank()) {
        storeFile = file(keystorePath)
        storePassword = resolveConfig("BAO_EDGE_RELEASE_KEYSTORE_PASSWORD", "")
        keyAlias = resolveConfig("BAO_EDGE_RELEASE_KEY_ALIAS", "")
        keyPassword = resolveConfig("BAO_EDGE_RELEASE_KEY_PASSWORD", "")
      }
    }
  }

  buildTypes {
    release {
      isMinifyEnabled = true
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
      val releaseConfig = signingConfigs.findByName("release")
      val hasReleaseKeystore = releaseConfig?.storeFile?.exists() == true
      signingConfig = if (hasReleaseKeystore) releaseConfig else signingConfigs.getByName("debug")
      if (!hasReleaseKeystore) {
        logger.warn(
          "Release build is using debug signing. " +
            "Set BAO_EDGE_RELEASE_KEYSTORE_FILE, BAO_EDGE_RELEASE_KEYSTORE_PASSWORD, " +
            "BAO_EDGE_RELEASE_KEY_ALIAS, and BAO_EDGE_RELEASE_KEY_PASSWORD for production builds."
        )
      }
    }
  }
  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }
  kotlinOptions {
    jvmTarget = "17"
    freeCompilerArgs += "-Xcontext-receivers"
  }
  buildFeatures {
    compose = true
    buildConfig = true
  }
}

dependencies {
  implementation(project(":bao-edge-core"))
  implementation(project(":bao-edge-android-rpa"))
  implementation(libs.androidx.core.ktx)
  implementation(libs.androidx.lifecycle.runtime.ktx)
  implementation(libs.androidx.activity.compose)
  implementation(platform(libs.androidx.compose.bom))
  implementation(libs.androidx.ui)
  implementation(libs.androidx.ui.graphics)
  implementation(libs.androidx.ui.tooling.preview)
  implementation(libs.androidx.material3)
  implementation(libs.androidx.compose.navigation)
  implementation(libs.kotlinx.serialization.json)
  implementation(libs.kotlin.reflect)
  implementation(libs.material.icon.extended)
  implementation(libs.androidx.work.runtime)
  implementation(libs.hilt.work)
  implementation(libs.androidx.datastore)
  implementation(libs.com.google.code.gson)
  implementation(libs.androidx.lifecycle.process)
  implementation(libs.androidx.webkit)
  implementation(libs.litertlm)
  implementation(libs.commonmark)
  implementation(libs.richtext)
  implementation(libs.tflite)
  implementation(libs.tflite.gpu)
  implementation(libs.tflite.support)
  implementation(libs.camerax.core)
  implementation(libs.camerax.camera2)
  implementation(libs.camerax.lifecycle)
  implementation(libs.camerax.view)
  implementation(libs.openid.appauth)
  implementation(libs.androidx.splashscreen)
  implementation(libs.protobuf.javalite)
  implementation(libs.hilt.android)
  implementation(libs.hilt.navigation.compose)
  implementation(libs.play.services.oss.licenses)
  implementation(platform(libs.firebase.bom))
  implementation(libs.firebase.analytics)
  implementation(libs.firebase.messaging)
  implementation(libs.androidx.exifinterface)
  ksp(libs.hilt.android.compiler)
  testImplementation(libs.junit)
  androidTestImplementation(libs.androidx.junit)
  androidTestImplementation(libs.androidx.espresso.core)
  androidTestImplementation(platform(libs.androidx.compose.bom))
  androidTestImplementation(libs.androidx.ui.test.junit4)
  androidTestImplementation(libs.hilt.android.testing)
  debugImplementation(libs.androidx.ui.tooling)
  debugImplementation(libs.androidx.ui.test.manifest)
}

protobuf {
  protoc { artifact = "com.google.protobuf:protoc:4.26.1" }
  generateProtoTasks { all().forEach { it.plugins { create("java") { option("lite") } } } }
}

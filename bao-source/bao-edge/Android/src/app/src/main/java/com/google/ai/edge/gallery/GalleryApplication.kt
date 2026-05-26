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

package com.google.ai.edge.gallery

import android.app.Application
import androidx.hilt.work.HiltWorkerFactory
import com.google.ai.edge.gallery.common.APP_LOCALE_SYSTEM
import com.google.ai.edge.gallery.common.applyAppLocale
import com.google.ai.edge.gallery.common.normalizeAppLocaleTag
import com.google.ai.edge.gallery.data.DataStoreRepository
import com.google.ai.edge.gallery.ui.home.OperatorAutomationScheduleCoordinator
import com.google.ai.edge.gallery.ui.home.OperatorAutomationWorkspaceStateStore
import com.google.ai.edge.gallery.ui.theme.ThemeSettings
import com.google.firebase.FirebaseApp
import androidx.work.Configuration
import dagger.hilt.android.HiltAndroidApp
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import javax.inject.Inject

@HiltAndroidApp
class GalleryApplication : Application(), Configuration.Provider {

  @Inject lateinit var dataStoreRepository: DataStoreRepository
  @Inject lateinit var hiltWorkerFactory: HiltWorkerFactory
  @Inject lateinit var automationWorkspaceStore: OperatorAutomationWorkspaceStateStore
  @Inject lateinit var automationScheduleCoordinator: OperatorAutomationScheduleCoordinator
  private val appScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)
  @Volatile var currentAppLocaleTag: String = APP_LOCALE_SYSTEM
    private set

  override fun onCreate() {
    super.onCreate()

    runBlocking {
      val persistedLocaleTag = normalizeAppLocaleTag(dataStoreRepository.readAppLocale())
      currentAppLocaleTag = persistedLocaleTag
      applyAppLocale(this@GalleryApplication, persistedLocaleTag)
    }

    // Load saved theme asynchronously to avoid blocking app startup.
    appScope.launch {
      ThemeSettings.themeOverride.value = dataStoreRepository.readTheme()
    }

    FirebaseApp.initializeApp(this)
    automationScheduleCoordinator.reconcile(automationWorkspaceStore.load())
  }

  fun updateCurrentAppLocale(appLocaleTag: String) {
    currentAppLocaleTag = normalizeAppLocaleTag(appLocaleTag)
  }

  override val workManagerConfiguration: Configuration
    get() =
      Configuration.Builder().setWorkerFactory(hiltWorkerFactory).build()
}

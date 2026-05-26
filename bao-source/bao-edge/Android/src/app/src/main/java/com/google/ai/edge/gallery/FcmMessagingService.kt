/*
 * Copyright 2026 Google LLC
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

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.google.ai.edge.gallery.common.StructuredLog
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

/** Maps short-lived FCM payloads onto deterministic launcher notifications. */
class GalleryFcmMessagingService : FirebaseMessagingService() {
  override fun onMessageReceived(remoteMessage: RemoteMessage) {
    StructuredLog.d(
      TAG,
      "fcm_message_received",
      "messageId" to remoteMessage.messageId.orEmpty(),
      "from" to remoteMessage.from.orEmpty(),
      "hasData" to remoteMessage.data.isNotEmpty(),
      "hasNotification" to (remoteMessage.notification != null),
    )
    if (remoteMessage.data.isNotEmpty()) {
      StructuredLog.d(
        TAG,
        "fcm_data_payload_received",
        "keys" to remoteMessage.data.keys.sorted().joinToString(","),
      )
    }

    val payload = remoteMessage.toNotificationPayload()
    if (payload == null) {
      StructuredLog.d(
        TAG,
        "fcm_message_ignored",
        "reason" to "missing_notification_content",
      )
      return
    }

    if (
      ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) !=
        PackageManager.PERMISSION_GRANTED
    ) {
      StructuredLog.w(
        TAG,
        "fcm_notification_skipped",
        "reason" to "notification_permission_missing",
        "messageId" to remoteMessage.messageId.orEmpty(),
      )
      return
    }

    val channelId = getString(R.string.gallery_news_notification_channel_id)
    val notificationManager = getSystemService(NotificationManager::class.java)
    notificationManager.createNotificationChannel(
      NotificationChannel(
        channelId,
        getString(R.string.gallery_news_notification_title),
        NotificationManager.IMPORTANCE_HIGH,
      ).apply { description = getString(R.string.gallery_news_notification_channel_description) }
    )

    val pendingIntent =
      PendingIntent.getActivity(
        this,
        payload.notificationId,
        createLaunchIntent(),
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
      )

    val notification =
      NotificationCompat.Builder(this, channelId)
        .setSmallIcon(R.mipmap.ic_launcher)
        .setContentTitle(payload.title)
        .setContentText(payload.body)
        .setStyle(NotificationCompat.BigTextStyle().bigText(payload.body))
        .setContentIntent(pendingIntent)
        .setAutoCancel(true)
        .setPriority(NotificationCompat.PRIORITY_HIGH)
        .build()

    NotificationManagerCompat.from(this).notify(payload.notificationId, notification)
    StructuredLog.d(
      TAG,
      "fcm_notification_posted",
      "notificationId" to payload.notificationId,
      "messageId" to remoteMessage.messageId.orEmpty(),
    )
  }

  private fun createLaunchIntent(): Intent {
    return (packageManager.getLaunchIntentForPackage(packageName)
        ?: Intent(this, MainActivity::class.java))
      .apply {
        addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
      }
  }

  private fun RemoteMessage.toNotificationPayload(): IncomingNotificationPayload? {
    val title =
      firstNonBlank(
        notification?.title,
        data[DATA_TITLE_KEY],
        data[DATA_FCM_TITLE_KEY],
      ) ?: getString(R.string.gallery_news_notification_title)
    val body =
      firstNonBlank(
        notification?.body,
        data[DATA_BODY_KEY],
        data[DATA_MESSAGE_KEY],
        data[DATA_FCM_BODY_KEY],
      ) ?: return null
    val notificationIdSeed = messageId ?: "$title:$body"
    return IncomingNotificationPayload(
      title = title,
      body = body,
      notificationId = notificationIdSeed.hashCode() and Int.MAX_VALUE,
    )
  }

  private fun firstNonBlank(vararg values: String?): String? {
    return values.firstOrNull { !it.isNullOrBlank() }?.trim()
  }

  companion object {
    private const val TAG = "AGFcmMessagingService"
    private const val DATA_BODY_KEY = "body"
    private const val DATA_FCM_BODY_KEY = "gcm.notification.body"
    private const val DATA_FCM_TITLE_KEY = "gcm.notification.title"
    private const val DATA_MESSAGE_KEY = "message"
    private const val DATA_TITLE_KEY = "title"
  }
}

private data class IncomingNotificationPayload(
  val title: String,
  val body: String,
  val notificationId: Int,
)

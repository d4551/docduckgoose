package com.google.ai.edge.gallery.data

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import androidx.core.content.edit
import dagger.hilt.android.qualifiers.ApplicationContext
import java.nio.ByteBuffer
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import javax.inject.Inject
import javax.inject.Singleton
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

private const val CREDENTIAL_STORE_NAME = "bao_edge_operator_credentials"
private const val KEYSTORE_ALIAS = "bao_edge_operator_credentials_key"
private const val KEY_ACCESS_TOKEN_DATA = "access_token_data"
private const val KEY_PROVIDER_API_KEY_PREFIX = "provider_api_key"
private const val AES_TRANSFORMATION = "AES/GCM/NoPadding"
private const val GCM_TAG_LENGTH_BITS = 128
private const val DEFAULT_PROVIDER_PROFILE_ID = "default"

/** Secure record for a stored Hugging Face access token. */
@Serializable
data class AccessTokenRecord(
  /** Access token used for Hugging Face requests. */
  val accessToken: String,
  /** Refresh token used for token renewal. */
  val refreshToken: String,
  /** Epoch timestamp when the access token expires. */
  val expiresAtMs: Long,
)

/** Secure owner for operator credentials that must not be stored in DataStore. */
interface CredentialStore {
  /** Persists Hugging Face access token data in secure storage. */
  suspend fun saveAccessTokenData(accessTokenData: AccessTokenRecord)

  /** Removes stored Hugging Face access token data. */
  suspend fun clearAccessTokenData()

  /** Reads Hugging Face access token data from secure storage. */
  suspend fun readAccessTokenData(): AccessTokenRecord?

  /** Persists a provider API key for a named provider profile in secure storage. */
  suspend fun saveProviderApiKey(providerId: String, profileId: String, apiKey: String)

  /** Removes a stored provider API key for a named provider profile. */
  suspend fun clearProviderApiKey(providerId: String, profileId: String)

  /** Reads a stored provider API key for a named provider profile. */
  suspend fun readProviderApiKey(providerId: String, profileId: String): String?

  /** Persists the default provider API key in secure storage. */
  suspend fun saveProviderApiKey(apiKey: String) = saveProviderApiKey(providerId = "", profileId = DEFAULT_PROVIDER_PROFILE_ID, apiKey = apiKey)

  /** Removes the default stored provider API key. */
  suspend fun clearProviderApiKey() = clearProviderApiKey(providerId = "", profileId = DEFAULT_PROVIDER_PROFILE_ID)

  /** Reads the default stored provider API key. */
  suspend fun readProviderApiKey(): String? = readProviderApiKey(providerId = "", profileId = DEFAULT_PROVIDER_PROFILE_ID)
}

/** Android KeyStore-backed implementation of [CredentialStore]. */
@Singleton
class AndroidCredentialStore
@Inject
constructor(
  @ApplicationContext context: Context,
) : CredentialStore {
  private val json = Json {
    encodeDefaults = true
    ignoreUnknownKeys = false
  }
  private val sharedPreferences =
    context.getSharedPreferences(CREDENTIAL_STORE_NAME, Context.MODE_PRIVATE)

  private fun providerApiKeyPreferenceKey(providerId: String, profileId: String): String {
    val normalizedProviderId = providerId.trim().ifBlank { "global" }
    val normalizedProfileId = profileId.trim().ifBlank { DEFAULT_PROVIDER_PROFILE_ID }
    return listOf(KEY_PROVIDER_API_KEY_PREFIX, normalizedProviderId, normalizedProfileId).joinToString(separator = "_")
  }

  private fun resolveSecretKey(): SecretKey {
    val keyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
    val existingKey = keyStore.getKey(KEYSTORE_ALIAS, null)
    if (existingKey is SecretKey) {
      return existingKey
    }

    return KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore").apply {
      init(
        KeyGenParameterSpec.Builder(
          KEYSTORE_ALIAS,
          KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT,
        )
          .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
          .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
          .setRandomizedEncryptionRequired(true)
          .setUserAuthenticationRequired(false)
          .build(),
      )
    }.generateKey()
  }

  private fun encryptToStorageValue(plaintext: ByteArray): String {
    val cipher = Cipher.getInstance(AES_TRANSFORMATION).apply {
      init(Cipher.ENCRYPT_MODE, resolveSecretKey())
    }
    val iv = cipher.iv
    val ciphertext = cipher.doFinal(plaintext)
    val payload =
      ByteBuffer.allocate(Int.SIZE_BYTES + iv.size + ciphertext.size).apply {
        putInt(iv.size)
        put(iv)
        put(ciphertext)
      }.array()
    return Base64.encodeToString(payload, Base64.NO_WRAP)
  }

  private fun decryptFromStorageValue(value: String?): ByteArray? {
    if (value.isNullOrBlank()) {
      return null
    }
    val payload =
      try {
        Base64.decode(value, Base64.NO_WRAP)
      } catch (_: IllegalArgumentException) {
        return null
      }
    if (payload.size <= Int.SIZE_BYTES) {
      return null
    }
    val buffer = ByteBuffer.wrap(payload)
    val ivLength = buffer.int
    if (ivLength <= 0 || payload.size <= Int.SIZE_BYTES + ivLength) {
      return null
    }
    val iv = ByteArray(ivLength)
    buffer.get(iv)
    val ciphertext = ByteArray(buffer.remaining())
    buffer.get(ciphertext)
    return try {
      Cipher.getInstance(AES_TRANSFORMATION).run {
        init(Cipher.DECRYPT_MODE, resolveSecretKey(), GCMParameterSpec(GCM_TAG_LENGTH_BITS, iv))
        doFinal(ciphertext)
      }
    } catch (_: Exception) {
      null
    }
  }

  override suspend fun saveAccessTokenData(accessTokenData: AccessTokenRecord) {
    sharedPreferences.edit {
      putString(
        KEY_ACCESS_TOKEN_DATA,
        encryptToStorageValue(
          json.encodeToString(AccessTokenRecord.serializer(), accessTokenData).encodeToByteArray(),
        ),
      )
    }
  }

  override suspend fun clearAccessTokenData() {
    sharedPreferences.edit {
      remove(KEY_ACCESS_TOKEN_DATA)
    }
  }

  override suspend fun readAccessTokenData(): AccessTokenRecord? {
    val tokenPayload = decryptFromStorageValue(sharedPreferences.getString(KEY_ACCESS_TOKEN_DATA, null))
      ?: return null
    val tokenData =
      try {
        json.decodeFromString(AccessTokenRecord.serializer(), tokenPayload.decodeToString())
      } catch (_: Exception) {
        return null
      }
    if (tokenData.accessToken.isBlank()) {
      return null
    }
    return tokenData
  }

  override suspend fun saveProviderApiKey(providerId: String, profileId: String, apiKey: String) {
    if (apiKey.isBlank()) {
      clearProviderApiKey(providerId = providerId, profileId = profileId)
      return
    }
    sharedPreferences.edit {
      putString(
        providerApiKeyPreferenceKey(providerId = providerId, profileId = profileId),
        encryptToStorageValue(apiKey.encodeToByteArray()),
      )
    }
  }

  override suspend fun clearProviderApiKey(providerId: String, profileId: String) {
    sharedPreferences.edit { remove(providerApiKeyPreferenceKey(providerId = providerId, profileId = profileId)) }
  }

  override suspend fun readProviderApiKey(providerId: String, profileId: String): String? {
    return decryptFromStorageValue(
      sharedPreferences.getString(
        providerApiKeyPreferenceKey(providerId = providerId, profileId = profileId),
        null,
      ),
    )
      ?.decodeToString()
      ?.trim()
      ?.ifBlank { null }
  }
}

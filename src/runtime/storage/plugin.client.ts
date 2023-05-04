import type { FirebaseApp } from 'firebase/app'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { defineNuxtPlugin, useAppConfig } from '#app'

/**
 * Initializes the app and provides it to others.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp

  const storage = getStorage(firebaseApp)

  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.storage) {
    const storageConfig = appConfig.emulatorConfig.storage
    connectStorageEmulator(storage, storageConfig.host, storageConfig.port)
  }

  return {
    provide: {
      storage,
    },
  }
})

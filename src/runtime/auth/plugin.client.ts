import type { FirebaseApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { defineNuxtPlugin, useAppConfig } from '#app'

/**
 * Initializes the app and provides it to others.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp

  const auth = getAuth(firebaseApp)

  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.auth) {
    const authConfig = appConfig.emulatorConfig.auth
    connectAuthEmulator(auth, `http://${authConfig.host}:${authConfig.port}`)
  }

  return {
    provide: {
      auth,
    },
  }
})

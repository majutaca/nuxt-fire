import type { FirebaseApp } from 'firebase/app'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { defineNuxtPlugin, useAppConfig } from '#app'

/**
 * Initializes the app and provides it to others.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp

  const functions = getFunctions(firebaseApp)

  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.firestore) {
    const functionsConfig = appConfig.emulatorConfig.functions
    connectFunctionsEmulator(functions, functionsConfig.host, functionsConfig.port)
  }

  return {
    provide: {
      functions,
    },
  }
})

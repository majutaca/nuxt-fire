import type { FirebaseApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator} from 'firebase/firestore'
import { defineNuxtPlugin, useAppConfig } from '#app'

/**
 * Initializes the app and provides it to others.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp

  const firestore = getFirestore(firebaseApp)

  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.firestore) {
    const firestoreConfig = appConfig.emulatorConfig.firestore
    connectFirestoreEmulator(firestore, firestoreConfig.host, firestoreConfig.port)
  }

  return {
    provide: {
      firestore,
    },
  }
})

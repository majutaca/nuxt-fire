import {FirebaseApp, initializeApp} from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { defineNuxtPlugin, useAppConfig } from '#app'
import {connectDatabaseEmulator, getDatabase} from "firebase/database";
import {connectFirestoreEmulator, getFirestore} from "firebase/firestore";
import {connectStorageEmulator, getStorage} from "firebase/storage";
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";
import {getAnalytics, setAnalyticsCollectionEnabled} from "firebase/analytics";

/**
 * Initializes the firebase and provides it to others.
 */
export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  console.log('App Init Config', appConfig.firebaseConfig)

  const firebaseApp = initializeApp(appConfig.firebaseConfig)

  // Auth
  const auth = getAuth(firebaseApp)
  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.auth) {
    const authConfig = appConfig.emulatorConfig.auth
    connectAuthEmulator(auth, `http://${authConfig.host}:${authConfig.port}`)
  }

  // Database
  const database = getDatabase(firebaseApp)
  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.database) {
    const databaseConfig = appConfig.emulatorConfig.database
    connectDatabaseEmulator(database, databaseConfig.host, databaseConfig.port)
  }

  // Firestore
  const firestore = getFirestore(firebaseApp)
  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.firestore) {
    const firestoreConfig = appConfig.emulatorConfig.firestore
    connectFirestoreEmulator(firestore, firestoreConfig.host, firestoreConfig.port)
  }

  // Storage
  const storage = getStorage(firebaseApp)
  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.storage) {
    const storageConfig = appConfig.emulatorConfig.storage
    connectStorageEmulator(storage, storageConfig.host, storageConfig.port)
  }

  // Functions
  const functions = getFunctions(firebaseApp)
  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.functions) {
    const functionsConfig = appConfig.emulatorConfig.functions
    connectFunctionsEmulator(functions, functionsConfig.host, functionsConfig.port)
  }

  // Analytics
  const analytics = getAnalytics(firebaseApp)
  setAnalyticsCollectionEnabled(analytics, false)
  // Only enable analytics if the user has explicitly enabled it and in production
  if (process.env.NODE_ENV === 'production' && appConfig.analyticsEnabled) {
    setAnalyticsCollectionEnabled(analytics, true)
  }

  return {
    provide: {
      firebaseApp,
      auth,
      database,
      firestore,
      storage,
      functions,
      analytics,
    },
  }
})

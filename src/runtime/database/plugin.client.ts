import type { FirebaseApp } from 'firebase/app'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import { defineNuxtPlugin, useAppConfig} from '#app'

/**
 * Initializes the app and provides it to others.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp

  const database = getDatabase(firebaseApp)

  if (process.env.NODE_ENV === 'development' && appConfig.emulatorConfig?.database) {
    const databaseConfig = appConfig.emulatorConfig.database
    connectDatabaseEmulator(database, databaseConfig.host, databaseConfig.port)
  }

  return {
    provide: {
      database,
    },
  }
})

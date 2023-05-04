import type { FirebaseApp } from 'firebase/app'
import { getAnalytics, setAnalyticsCollectionEnabled } from 'firebase/analytics'
import { defineNuxtPlugin, useAppConfig } from '#app'

/**
 * Initializes the app and provides it to others.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp
  const analytics = getAnalytics(firebaseApp)
  setAnalyticsCollectionEnabled(analytics, false)

  // Only enable analytics if the user has explicitly enabled it and in production
  if (process.env.NODE_ENV === 'production' && appConfig.analyticsEnabled) {
    setAnalyticsCollectionEnabled(analytics, true)
  }

  return {
    provide: {
      analytics,
    },
  }
})

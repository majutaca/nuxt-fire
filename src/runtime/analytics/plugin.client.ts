import type { FirebaseApp } from 'firebase/app'
import { getAnalytics, setAnalyticsCollectionEnabled } from 'firebase/analytics'
import { defineNuxtPlugin } from '#app'

/**
 * Initializes the app and provides it to others.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp

  const analytics = getAnalytics(firebaseApp)

  // Disable analytics collection when running locally
  if (process.env.NODE_ENV === 'development') {
    setAnalyticsCollectionEnabled(analytics, false)
  }

  return {
    provide: {
      analytics,
    },
  }
})

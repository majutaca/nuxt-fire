import type { Analytics } from 'firebase/analytics'
import { useNuxtApp } from '#app'

export const useAnalytics = (): Analytics => useNuxtApp().$analytics

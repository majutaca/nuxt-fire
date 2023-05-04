import type { FirebaseApp } from 'firebase/app'
import { useNuxtApp } from '#app'

export const useFirebaseApp = (): FirebaseApp => useNuxtApp().$firebaseApp as FirebaseApp

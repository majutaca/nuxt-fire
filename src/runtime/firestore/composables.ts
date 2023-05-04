import type { Firestore } from 'firebase/firestore'
import { useNuxtApp } from '#app'

export const useFirestore = (): Firestore => useNuxtApp().$firestore

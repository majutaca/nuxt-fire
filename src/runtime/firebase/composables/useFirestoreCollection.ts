/**
 * Allows the retrieval of a collection of documents from Firestore and utilities for pagination.
 */
import { useNuxtApp } from '#app'
import type { Firestore, DocumentData, DocumentSnapshot, Timestamp } from 'firebase/firestore'
import { query, collection, doc, getDocs, orderBy, limit, startAfter, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { ref } from 'vue'


type OrderParam = {
  field: string,
  direction?: string,
}

type Options = {
  pageSize?: number,
  orderParams?: OrderParam[]
}



export const useFirestoreCollection = async <T extends object>(path: string, options: Options) => {

  const firestoreConvetor = {
    toFirestore(data: T): DocumentData {
      const firestoreData = <DocumentData>{};
      for (const key in data) {
        if(key === 'id') continue
        if(data[key] === undefined) continue
        firestoreData[key] = data[key];
      }
      return firestoreData;
    },
    fromFirestore(snapshot: DocumentSnapshot): T {
      const data = snapshot.data();
      const result = <T>{id: snapshot.id};
      for (const key in data) {
        if(data[key] === undefined) continue
        // If the value is a timestamp, convert it to a Date.
        if (data[key] instanceof Timestamp) {
          result[key] = data[key].toDate();
        }else {
          result[key] = data[key];
        }
      }
      return result;
    }
  }

  const db = useNuxtApp().$firestore as Firestore
  const { pageSize = 10 , orderParams } = options
  const collectionRef = collection(db, path).withConverter(firestoreConvetor)

  const dataList = ref<unknown[]>([])
  const loading = ref<boolean>(false)
  const lastDoc = ref<unknown>(null)

  loading.value = true
  const order = orderParams ? orderParams.map(o => orderBy(o.field,  o.direction? o.direction :'asc')) : []
  const snapshot = await getDocs(query(collectionRef, ...order, limit(pageSize)))
  dataList.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  lastDoc.value = snapshot.docs[snapshot.docs.length - 1]

  const loadMore = async () => {
    loading.value = true
    const snapshot = await getDocs(query(collectionRef, ...order, startAfter(lastDoc.value), limit(pageSize)))
    dataList.value = [...dataList.value, ...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))]
    lastDoc.value = snapshot.docs[snapshot.docs.length - 1]
    loading.value = false
  }

  const add = async (data: T) => {
    const ref = await addDoc(collectionRef, data)
    dataList.value = [{id: ref.id, ...data}, ...dataList.value]
  }

  const update = async (data: T) => {
    if(!data.id) throw new Error('id is required')
    await setDoc(doc(db, `${path}/${data.id}`).withConverter(firestoreConvetor), data)
    dataList.value = dataList.value.map(item => item.id === data.id ? data : item)
  }

  const remove = async (id: string) => {
    await deleteDoc(doc(db, `${path}/${id}`))
    dataList.value = dataList.value.filter(data => data.id !== id)
  }

  return {
    dataList,
    loading,
    loadMore,
    add,
    update,
    remove
  }
}

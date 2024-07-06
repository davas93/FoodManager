import { Injectable } from '@angular/core';
import {initializeApp, FirebaseApp, FirebaseOptions} from "@firebase/app";
import {
  getFirestore,
  collection,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  arrayUnion,
  runTransaction,
  arrayRemove,
  Firestore,
  DocumentData,
  WithFieldValue,
  writeBatch
} from 'firebase/firestore/lite';
import {from, Observable, of, switchMap} from "rxjs";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import {isEqual} from "lodash-es";

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  private firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyDXHU0asm3cNfjuazcRnq8iDG9McBf13eM",
    authDomain: "foodapp-bf639.firebaseapp.com",
    databaseURL: "https://foodapp-bf639-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "foodapp-bf639",
    storageBucket: "foodapp-bf639.appspot.com",
    messagingSenderId: "647212870949",
    appId: "1:647212870949:web:bb4f22f6365162e380becc",
    measurementId: "G-91ZWB6QZES"
  };

  private readonly app: FirebaseApp;
  private readonly db: Firestore;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  get fbApp(): FirebaseApp {
    return this.app;
  }

  getItems<T>(collectionPath: string): Observable<T[]> {
    const collectionRef = collection(this.db, collectionPath);

    return from(getDocs(collectionRef).then(querySnapshot => {
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    }));
  }

  getItemById<T>(collectionPath: string, id: number | string): Observable<T | null> {
    const collectionRef = collection(this.db, collectionPath);
    const q = query(collectionRef, where('id', '==', id));

    return from(getDocs(q).then(querySnapshot => !querySnapshot.empty ? querySnapshot.docs[0].data() as T : null));
  }

  addItem<T extends DocumentData>(collectionPath: string, data: WithFieldValue<T>): Observable<DocumentReference<T>> {
    const collectionRef = collection(this.db, collectionPath);
    const addPromise = addDoc(collectionRef, data);
    return from(addPromise) as unknown as Observable<DocumentReference<T>>;
  }

  updateItem<T>(collectionPath: string, id: string | number, data: Partial<T>): Observable<void> {
    const collectionRef = collection(this.db, collectionPath);
    const q = query(collectionRef, where('id', '==', id));

    return from(getDocs(q).then(querySnapshot => {
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
          return updateDoc<DocumentData, DocumentData>(docRef, data);
      } else {
        throw new Error('Document not found');
      }
    }));
  }

  updateAllItems(collectionPath: string, data: any): Observable<void> {
    const collectionRef = collection(this.db, collectionPath);

    return from(getDocs(collectionRef).then(querySnapshot => {
      const batch = writeBatch(this.db);

      querySnapshot.forEach((doc ) => {
        const updateData = data.find(item => item.id === doc.data().id);
        if (updateData && !isEqual(doc.data(), updateData)) {
          batch.update(doc.ref, updateData);
        }
      });

      return batch.commit();
    }));
  }

  deleteItem(collectionPath: string, id: number | string): Observable<string | number> {
    const collectionRef = collection(this.db, collectionPath);
    const q = query(collectionRef, where('id', '==', id));

    return from(getDocs(q).then(querySnapshot => {
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        return deleteDoc(docRef);
      } else {
        throw new Error('Document not found');
      }
    })).pipe(switchMap(_ => of(id)));
  }

  addItemToArray<T, K>(collectionPath: string, arrayField: string, newItem: T, dependentCollectionPath: string, newDependentItem: K): Observable<void> {
    return from(runTransaction(this.db, async (transaction) => {
      const collectionRef = collection(this.db, collectionPath);
      const querySnapshot = await getDocs(collectionRef);
      if (querySnapshot.empty) {
        throw new Error('No documents found in collection');
      }

      querySnapshot.forEach(docSnapshot => {
        const docData = docSnapshot.data();
        const array = docData[arrayField] || [];
        array.push(newItem);
        transaction.update(docSnapshot.ref, { [arrayField]: array });
      });

      const dependentRef = collection(this.db, dependentCollectionPath);
      const dependentSnapshot = await getDocs(dependentRef);

      dependentSnapshot.forEach(dependentDoc => {
        const dependentData = dependentDoc.data();
        const dependentArray = dependentData[arrayField] || [];
        dependentArray.push(newDependentItem);
        transaction.update(dependentDoc.ref, { [arrayField]: dependentArray });
      });
    }));
  }

  removeItemFromArray<T>(
    collectionPath: string,
    arrayField: string,
    itemField: keyof T,
    fieldValue: any,
    dependentCollectionPath: string
  ): Observable<void> {
    return from(runTransaction(this.db, async (transaction) => {
      const collectionRef = collection(this.db, collectionPath);
      const querySnapshot = await getDocs(collectionRef);
      if (querySnapshot.empty) {
        throw new Error('No documents found in collection');
      }

      querySnapshot.forEach(docSnapshot => {
        const docData = docSnapshot.data();
        const array = docData[arrayField] || [];
        const itemIndex = array.findIndex((item: T) => item[itemField] === fieldValue);
        if (itemIndex !== -1) {
          transaction.update(docSnapshot.ref, { [arrayField]: arrayRemove(array[itemIndex]) });
        }
      });

      const dependentRef = collection(this.db, dependentCollectionPath);
      const dependentSnapshot = await getDocs(dependentRef);

      dependentSnapshot.forEach(dependentDoc => {
        const dependentData = dependentDoc.data();
        const dependentArray = dependentData[arrayField] || [];
        const dependentItemIndex = dependentArray.findIndex((item: T) => item[itemField] === fieldValue);
        if (dependentItemIndex !== -1) {
          transaction.update(dependentDoc.ref, { [arrayField]: arrayRemove(dependentArray[dependentItemIndex]) });
        }
      });
    }));
  }

  renameArrayItems<T>(
    collectionPath: string,
    arrayField: string,
    renameFunction: (item: T, index: number) => T,
    dependentCollectionPath: string,
    dependentRenameFunction: (item: T, index: number) => T
  ): Observable<void> {
    return from(runTransaction(this.db, async (transaction) => {
      const collectionRef = collection(this.db, collectionPath);
      const querySnapshot = await getDocs(collectionRef);
      if (querySnapshot.empty) {
        throw new Error('No documents found in collection');
      }

      // Обработка основной коллекции
      querySnapshot.forEach(docSnapshot => {
        const docData = docSnapshot.data();
        const items = docData[arrayField] as T[];
        const renamedItems = items.map((item, index) => renameFunction(item, index));
        transaction.update(docSnapshot.ref, { [arrayField]: renamedItems });
      });

      // Обработка зависимой коллекции
      const dependentRef = collection(this.db, dependentCollectionPath);
      const dependentSnapshot = await getDocs(dependentRef);

      dependentSnapshot.forEach(dependentDoc => {
        const dependentData = dependentDoc.data();
        const dependentItems = dependentData[arrayField] as T[];
        const renamedDependentItems = dependentItems.map((item, index) => dependentRenameFunction(item, index));
        transaction.update(dependentDoc.ref, { [arrayField]: renamedDependentItems });
      });
    }));
  }
}

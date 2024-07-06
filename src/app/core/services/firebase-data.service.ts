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

  addItemToArray<T>(collectionPath: string, arrayField: string, newItem: T): Observable<void> {
    const collectionRef = collection(this.db, collectionPath);

    return from(getDocs(collectionRef).then(querySnapshot => {
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        return updateDoc(docRef, {
          [arrayField]: arrayUnion(newItem)
        });
      } else {
        throw new Error('Document not found');
      }
    }));
  }

  removeItemFromArray<T>(collectionPath: string, arrayField: string, itemToRemove: T): Observable<void> {
    const collectionRef = collection(this.db, collectionPath);

    return from(getDocs(collectionRef).then(querySnapshot => {
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        return updateDoc(docRef, {
          [arrayField]: arrayRemove(itemToRemove)
        });
      } else {
        throw new Error('Document not found');
      }
    }));
  }

  renameArrayItems<T>(
    collectionPath: string,
    arrayField: string,
    renameFunction: (item: T, index: number) => T
  ): Observable<void> {
    const collectionRef = collection(this.db, collectionPath);

    return from(getDocs(collectionRef).then(querySnapshot => {
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        return getDoc(docRef).then(docSnapshot => {
          const data = docSnapshot.data();
          const items = data[arrayField] as T[];

          const renamedItems = items.map((item, index) => renameFunction(item, index));

          return updateDoc(docRef, {
            [arrayField]: renamedItems
          });
        });
      } else {
        throw new Error('Document not found');
      }
    }));
  }
}

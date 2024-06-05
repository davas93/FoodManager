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
  query,
  Firestore,
  DocumentData,
  WithFieldValue
} from 'firebase/firestore/lite';
import {from, Observable} from "rxjs";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

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
        return updateDoc(docRef, data);
      } else {
        throw new Error('Document not found');
      }
    }));
  }

  deleteItem(collectionPath: string, id: number): Observable<void> {
    const collectionRef = collection(this.db, collectionPath);
    const q = query(collectionRef, where('id', '==', id));

    return from(getDocs(q).then(querySnapshot => {
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        return deleteDoc(docRef);
      } else {
        throw new Error('Document not found');
      }
    }));
  }
}

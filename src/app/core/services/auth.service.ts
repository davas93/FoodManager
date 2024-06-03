import {Injectable} from '@angular/core';
import {FirebaseDataService} from "./firebase-data.service";
import {
  Auth,
  getAuth,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser,
  User
} from "firebase/auth"
import {BehaviorSubject, from, fromEvent, map, Observable, switchMap} from "rxjs";
import {Employee} from "../../models/employee.model";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import {LoginData} from "../../models/login-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  private authState = new BehaviorSubject<User | null>(null);

  constructor(private firestoreDataService: FirebaseDataService) {
    this.auth = getAuth(this.firestoreDataService.fbApp);

    fromEvent(window, 'beforeunload').pipe(
      switchMap(_ => this.signOut())
    ).subscribe()

    onAuthStateChanged(
      this.auth,
      user => this.authState.next(user),
      error => this.authState.error(error),
      () => this.authState.complete()
    );
  }

  signIn(loginData: LoginData): Observable<Employee | null> {
    return from(signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)).pipe(
      switchMap(user => this.firestoreDataService.getItemById<Employee>('employees', user.user.uid))
    );
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  signUp(email: string, password: string, employee: Employee): Observable<DocumentReference<Employee>> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(user => {
        employee.id = user.user.uid;

        return this.firestoreDataService.addItem<Employee>('employees', employee)
      })
    )
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable().pipe(
      map(user => !!user)
    );
  }

  get userUid(): Observable<string | undefined> {
    return this.authState.asObservable().pipe(
      map(user => user?.uid)
    )
  }
}

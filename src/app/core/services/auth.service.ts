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
import {
  BehaviorSubject,
  combineLatest,
  concatMap, EMPTY,
  filter,
  from,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  takeWhile
} from "rxjs";
import {Employee} from "../../models/employee.model";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import {LoginData} from "../../models/login-data.model";
import {ServiceHelper} from "../../helpers/service.helper";
import {EmployeeMenu} from "../../models/employee-menu.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  private authState = new BehaviorSubject<User | null>(null);

  constructor(private firestoreDataService: FirebaseDataService, private http: HttpClient) {
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

  signUp(email: string, password: string, employee: Employee): Observable<DocumentReference<EmployeeMenu | Employee>> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(user => {
        employee.id = user.user.uid;

        return combineLatest([this.firestoreDataService.addItem<Employee>('employees', ServiceHelper.toPlainObject(employee)), of(user.user.uid)])
      }),
      switchMap(([doc, uid]) => {
        if (employee.role === "Dining") {
          return of(doc);
        } else {
          const userMenu = new EmployeeMenu({
            id: uid,
            employeeName: employee.fullName
          })

          return this.firestoreDataService.addItem<EmployeeMenu>('menus', ServiceHelper.toPlainObject(userMenu))
        }
      })
    )
  }

  deleteUser(employee: Employee): Observable<void> {
    return this.http.post('http://localhost:7071/api/DeleteUserFunction', employee.id, {
      responseType: 'text'
    }).pipe(
      switchMap(_ => this.firestoreDataService.deleteItem('employees', employee.id)),
      switchMap(res => employee.role === "Dining" ? of(res) : this.firestoreDataService.deleteItem('menus', employee.id))
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

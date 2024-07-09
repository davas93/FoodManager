import {Injectable} from '@angular/core';
import {FirebaseDataService} from "./firebase-data.service";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User
} from "firebase/auth"
import {
  BehaviorSubject,
  combineLatest,
  from,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
} from "rxjs";
import {Employee} from "../../models/employee.model";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import {LoginData} from "../../models/login-data.model";
import {ServiceHelper} from "../../helpers/service.helper";
import {EmployeeMenu, Week} from "../../models/employee-menu.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import UserCredential = firebase.auth.UserCredential;
import {GeneralMenu} from "../../models/general-menu.model";

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
    return from(signInWithEmailAndPassword(this.auth, loginData.serviceNumber, loginData.password)).pipe(
      switchMap(user => this.firestoreDataService.getItemById<Employee>('employees', user.user.uid))
    );
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  createUser(email: string, password: string, employee: Employee): Observable<DocumentReference<EmployeeMenu | Employee>> {
    return this.http.post('https://food-manager-server.vercel.app/createUser', {email, password}, {
      responseType: 'text'
    }).pipe(
      switchMap(uid => {
        employee.id = uid;

        return combineLatest([
          this.firestoreDataService.addItem<Employee>('employees', ServiceHelper.toPlainObject(employee)),
          of(uid),
          this.firestoreDataService.getItemById<GeneralMenu>('generalMenu', 1)])
      }),
      switchMap(([doc, uid, menu]) => {
        if (employee.role === "Dining" || employee.role === "Admin") {
          return of(doc);
        } else {
          const userMenu = new EmployeeMenu({
            id: uid,
            employeeName: employee.fullName
          })

          menu.weeks.forEach((week) => {
            userMenu.weeks.push(new Week({
              name: week.name,
              displayName: week.displayName
            }))
          })

          return this.firestoreDataService.addItem<EmployeeMenu>('menus', ServiceHelper.toPlainObject(userMenu))
        }
      })
    )
  }

  deleteUser(employee: Employee): Observable<string | number> {
    const queryParams = new HttpParams().append("uid", `${employee.id}`);

    return this.http.get(`https://food-manager-server.vercel.app/deleteUser`, {
      params: queryParams,
      responseType: 'text'
    }).pipe(
      switchMap(_ =>
        this.firestoreDataService.deleteItem('employees', employee.id).pipe(
          switchMap(res => employee.role === "Dining" || employee.role === "Admin" ? of(res) : this.firestoreDataService.deleteItem('menus', employee.id))
        )
      )
    );
  }

  updatePassword(uid: string, newPassword: string): Observable<string | number> {
    return this.http.post(`https://food-manager-server.vercel.app/updatePassword`, {uid, newPassword}, {
      responseType: 'text'
    })
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

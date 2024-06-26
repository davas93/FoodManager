import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {catchError, map, merge, Observable, of, ReplaySubject, retry, Subject, switchMap, tap, throwError} from "rxjs";
import {EmployeeMenu} from "../../../models/employee-menu.model";
import {isNil} from "lodash-es";
import {AuthService} from "../../../core/services/auth.service";
import {FirebaseDataService} from "../../../core/services/firebase-data.service";
import {MessageService} from "primeng/api";
import {GeneralMenu} from "../../../models/general-menu.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Dish, Dishes} from "../../../models/dishes.model";
import {Employee} from "../../../models/employee.model";
import {UserFormDto} from "../../../interfaces/user-form-dto.interface";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;
import {ServiceHelper} from "../../../helpers/service.helper";

@UntilDestroy()
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit{
  private userMenuData$!: Observable<EmployeeMenu | null>;
  public currentUserMenu$!: Observable<EmployeeMenu | null>;
  public generalMenuData$!: Observable<GeneralMenu | null>;
  public generalMenu$!: Observable<GeneralMenu | null>;
  public firstCourses$!: Observable<Dish[]>;
  public secondCourses$!: Observable<Dish[]>;
  public sideDishes$!: Observable<Dish[]>;
  public salads$!: Observable<Dish[]>;
  public employees$!: Observable<Employee[]>;
  private employeesData$!: Observable<Employee[]>;

  //Personal menu management
  public saveUserMenu$: Subject<EmployeeMenu> = new Subject<EmployeeMenu>();
  public refreshUserMenu$: Subject<void> = new Subject<void>();

  //General menu management
  public saveGeneralMenu$: Subject<GeneralMenu> = new Subject<GeneralMenu>();
  public refreshGeneralMenu$: Subject<void> = new Subject<void>();

  //Users management
  public addNewUser$: Subject<UserFormDto> = new Subject<UserFormDto>();
  public refreshEmployees$: Subject<void> = new Subject<void>();

  public errorSubject$: ReplaySubject<{error: boolean, timestamp: number}> = new ReplaySubject<{error: boolean, timestamp: number}>(1);


  constructor(private authService: AuthService,
              private fbService: FirebaseDataService,
              private messageService: MessageService) {
  }

    ngOnInit(): void {
    this.employeesData$ = this.fbService.getItems<Employee>('employees').pipe(
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При получении cписка сотрудников произошла ошибка'});
        return throwError(err);
      })
    );

    this.employees$ = merge(
      this.employeesData$,
      this.refreshEmployees$.pipe(switchMap(_ => this.employeesData$))
    )

      this.userMenuData$ = this.authService.userUid.pipe(
        switchMap(uid => {
          if (!isNil(uid)) {
            return this.fbService.getItemById<EmployeeMenu>('menus', uid)
          } else return of(null)
        }),
        catchError(err => {
          this.messageService.add({severity: 'error', detail: 'При получении меню сотрудника произошла ошибка'});
          return throwError(err);
        }),
      );

      this.generalMenuData$ = this.fbService.getItemById<GeneralMenu>('generalMenu', 1).pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }),
      );

      this.currentUserMenu$ = merge(
        this.userMenuData$,
        this.refreshUserMenu$.pipe(switchMap(_ => this.userMenuData$))
      );

      this.generalMenu$ = merge(
        this.generalMenuData$,
        this.refreshUserMenu$.pipe(switchMap(_ => this.userMenuData$))
      );

      this.firstCourses$ = this.fbService.getItems<Dishes>('firstCourses').pipe(
        map(dishes => dishes[0].dishes),
        catchError(err => {
          this.messageService.add({severity: 'error', detail: 'Не удалосб получить список первых блюд'});
          return throwError(err);
        })
      );

      this.secondCourses$ = this.fbService.getItems<Dishes>('secondCourses').pipe(
        map(dishes => dishes[0].dishes),
        catchError(err => {
          this.messageService.add({severity: 'error', detail: 'Не удалось получить список вторых блюд'});
          return throwError(err);
        })
      );

      this.sideDishes$ = this.fbService.getItems<Dishes>('sideDishes').pipe(
        map(dishes => dishes[0].dishes),
        catchError(err => {
          this.messageService.add({severity: 'error', detail: 'Не удалосб получить список гарниров'});
          return throwError(err);
        })
      );

      this.salads$ = this.fbService.getItems<Dishes>('salads').pipe(
        map(dishes => dishes[0].dishes),
        catchError(err => {
          this.messageService.add({severity: 'error', detail: 'Не удалосб получить список салатов'});
          return throwError(err);
        })
      );

      this.initializeSideEffect()
    }

  private initializeSideEffect() {
    this.saveUserMenu$.pipe(
      switchMap(menu => this.fbService.updateItem<EmployeeMenu>('menus', menu.id, menu)),
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При сохранении меню произошла ошибка'});
        return throwError(err);
      }),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.messageService.add({severity: 'success', detail: 'Изменения успешно сохранены'});
      this.refreshUserMenu$.next();
    });

    this.saveGeneralMenu$.pipe(
      switchMap(menu => this.fbService.updateItem<GeneralMenu>('generalMenu', 1, menu)),
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При сохранении меню произошла ошибка'});
        return throwError(err);
      }),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.messageService.add({severity: 'success', detail: 'Изменения успешно сохранены'});
      this.refreshGeneralMenu$.next();
    });

    //Users management
    this.addNewUser$.pipe(
      switchMap(userDto => {
        const employee = new Employee({
          username: userDto.username,
          fullName: userDto.fullName,
          role: userDto.role
        });

        return this.authService.signUp(userDto.username, userDto.password, employee)
      }
      ),
      catchError((err: FirebaseError) => {
        this.messageService.add({severity: 'error', detail: ServiceHelper.translateError(err.code)});
        this.errorSubject$.next({ error: true, timestamp: new Date().getTime() });
        return throwError(err);
      }),
      retry(),
      untilDestroyed(this)
    ).subscribe(res => {
      console.log(res);
      this.messageService.add({severity: 'success', detail: 'Новый сотрудник успешно добавлен'});
      this.refreshEmployees$.next();
    })
  }
}

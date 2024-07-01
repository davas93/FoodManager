import {Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  merge,
  Observable,
  of,
  ReplaySubject,
  retry, share,
  Subject,
  switchMap,
  throwError, withLatestFrom
} from "rxjs";
import {EmployeeMenu} from "../../../models/employee-menu.model";
import {isEqual, isNil} from "lodash-es";
import {AuthService} from "../../../core/services/auth.service";
import {FirebaseDataService} from "../../../core/services/firebase-data.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {GeneralMenu} from "../../../models/general-menu.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Dish, Dishes} from "../../../models/dishes.model";
import {Employee} from "../../../models/employee.model";
import {UserFormDto} from "../../../interfaces/user-form-dto.interface";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;
import {ServiceHelper} from "../../../helpers/service.helper";
import {SelectedMenuWithDay} from "../../../interfaces/selected-dishes-with-day.interface";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {PersonalMenuComponent} from "./components/personal-menu/personal-menu.component";

@UntilDestroy()
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit {
  @ViewChild('selectedUserMenuTemplate') modalTemplate: TemplateRef<any>;

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public currentUserMenu$!: Observable<EmployeeMenu | null>;
  public generalMenu$!: Observable<GeneralMenu | null>;
  public firstCourses$!: Observable<Dish[]>;
  public secondCourses$!: Observable<Dish[]>;
  public sideDishes$!: Observable<Dish[]>;
  public salads$!: Observable<Dish[]>;
  public employees$!: Observable<Employee[]>;

  //Personal menu management
  public saveUserMenu$: Subject<EmployeeMenu> = new Subject<EmployeeMenu>();
  public refreshUserMenu$: Subject<void> = new Subject<void>();

  //General menu management
  public saveGeneralMenu$: Subject<GeneralMenu> = new Subject<GeneralMenu>();
  public refreshGeneralMenu$: Subject<void> = new Subject<void>();
  public selectedDishesWithDay$: ReplaySubject<SelectedMenuWithDay> = new ReplaySubject<SelectedMenuWithDay>(1);

  //Users management
  public addNewUser$: Subject<UserFormDto> = new Subject<UserFormDto>();
  public refreshEmployees$: Subject<void> = new Subject<void>();
  public removeUser$: Subject<Employee> = new Subject<Employee>();
  public editUser$: Subject<Employee> = new Subject<Employee>();
  public editSelectedUserMenu$: Subject<string> = new Subject<string>();

  //oth
  public errorSubject$: ReplaySubject<{ error: boolean, timestamp: number }> = new ReplaySubject<{
    error: boolean,
    timestamp: number
  }>(1);

  public ref: DynamicDialogRef;
  public _selectedTabIndex: number = 0;


  constructor(private authService: AuthService,
              private fbService: FirebaseDataService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService,) {
  }

  ngOnInit(): void {

    this.employees$ = merge(
      this.employeesData$,
      this.refreshEmployees$.pipe(switchMap(_ => this.employeesData$))
    ).pipe(
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При списка сотрудников произошла ошибка'});
        return throwError(err);
      }),
    );

    this.currentUserMenu$ = merge(
      this.userMenuData$,
      this.refreshUserMenu$.pipe(switchMap(_ => this.userMenuData$))
    ).pipe(
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При получении меню сотрудника произошла ошибка'});
        return throwError(err);
      }),
      share()
    );

    this.generalMenu$ = merge(
      this.generalMenuData$,
      this.refreshGeneralMenu$.pipe(switchMap(_ => this.generalMenuData$)
      ).pipe(catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При получении основного меню произошла ошибка'});
        return throwError(err);
      }))
    );

    this.firstCourses$ = this.fbService.getItems<Dishes>('firstCourses').pipe(
      map(dishes => dishes[0].dishes),
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'Не удалось получить список первых блюд'});
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
        this.messageService.add({severity: 'error', detail: 'Не удалось получить список гарниров'});
        return throwError(err);
      })
    );

    this.salads$ = this.fbService.getItems<Dishes>('salads').pipe(
      map(dishes => dishes[0].dishes),
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'Не удалось получить список салатов'});
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
      retry(),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.messageService.add({severity: 'success', detail: 'Изменения успешно сохранены'});
      this.refreshUserMenu$.next();
    });

    this.saveGeneralMenu$.pipe(
      switchMap(menu => this.fbService.updateItem<GeneralMenu>('generalMenu', 1, menu)),
      switchMap(_ => this.userMenus$),
      withLatestFrom(this.selectedDishesWithDay$),
      switchMap(([menus, selectedDishes]) => {
        const filterCourses = selectedDishes.dishes.map(dish => dish.name);

        const updatedMenus = menus.map(employeeMenu => {
          const currentWeek = employeeMenu.weeks[selectedDishes.week];
          const currentDay = currentWeek.days.find(day => day.name === selectedDishes.day);
          if (!filterCourses.includes(currentDay.meals[selectedDishes.dishType])) {
            currentDay.meals[selectedDishes.dishType] = "";
          }
          return employeeMenu;
        });

        return this.fbService.updateAllItems('menus', updatedMenus)
      }),
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При сохранении меню произошла ошибка'});
        this.errorSubject$.next({error: true, timestamp: new Date().getTime()});
        return throwError(err);
      }),
      retry(),
      untilDestroyed(this),
    ).subscribe(_ => {
      this.messageService.add({severity: 'success', detail: 'Изменения успешно сохранены'});
      this.refreshGeneralMenu$.next();
      this.refreshUserMenu$.next();
    });

    //Users management
    this.addNewUser$.pipe(
      switchMap(userDto => {
          const employee = new Employee({
            username: userDto.username,
            fullName: userDto.fullName,
            role: userDto.role
          });

          this.isLoading$.next(true);

          return this.authService.signUp(userDto.username, userDto.password, employee)
        }
      ),
      catchError((err: FirebaseError) => {
        this.isLoading$.next(false);
        this.messageService.add({severity: 'error', detail: ServiceHelper.translateError(err.code)});
        this.errorSubject$.next({error: true, timestamp: new Date().getTime()});
        return throwError(err);
      }),
      retry(),
      untilDestroyed(this)
    ).subscribe(res => {
      this.isLoading$.next(false);
      this.messageService.add({severity: 'success', detail: 'Новый сотрудник успешно добавлен'});
      this.refreshEmployees$.next()
    });

    this.removeUser$.pipe(
      switchMap(user => {
        const confirmed$: Subject<boolean> = new Subject<boolean>();

        this.confirmationService.confirm({
          header: "Удаление пользователя",
          message: `Вы действительно хотите удалить пользователя ${user.fullName} ?`,
          rejectLabel: "Отмена",
          acceptLabel: "Удалить",
          acceptButtonStyleClass: "p-button-primary",
          rejectButtonStyleClass: "p-button-secondary p-button-text",
          acceptIcon: "none",
          rejectIcon: "none",
          blockScroll: false,
          accept: () => {
            this.isLoading$.next(true);
            confirmed$.next(true);
          },
          reject: () => {
            confirmed$.next(false);
            this.isLoading$.next(false);
          }
        })

        return confirmed$
      }),
      filter(confirmed => confirmed),
      withLatestFrom(this.removeUser$),
      switchMap(([_, user]) => this.authService.deleteUser(user)),
      catchError(err => {
        this.isLoading$.next(false);
        this.messageService.add({severity: 'error', detail: 'При удалении сотрудника произошла ошибка'});
        return throwError(err);
      }),
      retry(),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.isLoading$.next(false);
      this.messageService.add({severity: 'success', detail: 'Cотрудник успешно удален'});
      this.refreshEmployees$.next();
    });

    this.editUser$.pipe(
      switchMap(user => this.fbService.updateItem<Employee>('employees', user.id, user)),
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При изменении данных пользователя, произошла ошибка.'});
        return throwError(err);
      }),
      retry(),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.messageService.add({severity: 'success', detail: 'Данные пользователя успешно сохранены'});
      this.refreshEmployees$.next();
    });

    this.editSelectedUserMenu$.pipe(
      withLatestFrom(this.currentUserMenu$),
      filter(([id, currentUserMenu]) => {
        if (isEqual(id, currentUserMenu.id)) {
          this._selectedTabIndex = 0;
          return false
        }

        return true;
      }),
      switchMap(([id, _]) => this.fbService.getItemById<EmployeeMenu>('menus', id)),
      withLatestFrom(this.generalMenu$),
      switchMap(([menu, generalMenu]) => {
        this.ref = this.dialogService.open(PersonalMenuComponent, {
          width: '95%',
          height: '95%',
          data: {
            userMenuData: menu,
            generalMenu: generalMenu
          }
        })

        return this.ref.onClose as Observable<EmployeeMenu>;
      }),
      filter(menu => !isNil(menu)),
      switchMap(menu => this.fbService.updateItem<EmployeeMenu>('menus', menu.id, menu)),
      catchError(err => {
        this.messageService.add({severity: 'error', detail: err});
        return throwError(err);
      }),
      retry(),
      untilDestroyed(this)
    ).subscribe(_ => this.messageService.add({severity: 'success', detail: 'Изменения успешно сохранены'}))
  }

  private get userMenus$(): Observable<EmployeeMenu[]> {
    return this.fbService.getItems<EmployeeMenu>('menus');
  }

  private get userMenuData$(): Observable<EmployeeMenu> {
    return this.authService.userUid.pipe(
      switchMap(uid => {
        if (!isNil(uid)) {
          return this.fbService.getItemById<EmployeeMenu>('menus', uid)
        } else return of(null)
      })
    );
  }

  private get generalMenuData$(): Observable<GeneralMenu> {
    return this.fbService.getItemById<GeneralMenu>('generalMenu', 1);
  }

  private get employeesData$(): Observable<Employee[]> {
    return this.fbService.getItems<Employee>('employees');
  }
}

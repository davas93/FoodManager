import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  merge,
  Observable, of,
  ReplaySubject,
  retry,
  Subject,
  switchMap,
  throwError, withLatestFrom
} from "rxjs";
import {EmployeeMenu, Week} from "../../../models/employee-menu.model";
import {isNil} from "lodash-es";
import {AuthService} from "../../../core/services/auth.service";
import {FirebaseDataService} from "../../../core/services/firebase-data.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {GeneralMenu, GeneralMenuWeek} from "../../../models/general-menu.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
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
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public generalMenu$!: Observable<GeneralMenu | null>;
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

  //Weeks management
  public addNewWeek$: Subject<GeneralMenuWeek> = new Subject<GeneralMenuWeek>();
  public removeWeek$: Subject<GeneralMenuWeek> = new Subject<GeneralMenuWeek>();
  public renameWeek$: Subject<{weekName: string; newDisplayName: string }> = new Subject<{weekName: string; newDisplayName: string }>();

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

    this.generalMenu$ = merge(
      this.generalMenuData$,
      this.refreshGeneralMenu$.pipe(switchMap(_ => this.generalMenuData$)
      ).pipe(catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При получении основного меню произошла ошибка'});
        return throwError(err);
      }))
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
        const filterCourses = selectedDishes.dishes.map(dish => dish);

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
        this.messageService.add({severity: 'error', detail: err});
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

          return this.authService.createUser(userDto.username, userDto.password, employee)
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
      switchMap((id) => this.fbService.getItemById<EmployeeMenu>('menus', id)),
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

    //Weeks management
    this.addNewWeek$.pipe(
      switchMap(week => {
        const newEmployeeWeek: Week = ServiceHelper.toPlainObject(new Week({
          name: week.name,
          displayName: week.displayName
        }));

        return this.fbService.addItemToArray<GeneralMenuWeek, Week>(
          'generalMenu',
          'weeks',
          week,
          'menus', newEmployeeWeek)
      }),
      catchError(err => {
        this.errorSubject$.next({error: true, timestamp: new Date().getTime()});
        this.messageService.add({severity: 'error', detail: err});
        return throwError(err);
      }),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.messageService.add({severity: 'success', detail: 'Новая неделя успешно добавлена'});
      this.refreshGeneralMenu$.next();
    });

    this.removeWeek$.pipe(
      switchMap(week => {
        const confirmed$: Subject<boolean> = new Subject<boolean>();

        this.confirmationService.confirm({
          header: "Удаление недели",
          message: `Вы действительно хотите удалить "${week.displayName}"? Все меню этой недели будет утеряно`,
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
      withLatestFrom(this.removeWeek$),
      switchMap(([_, week]) => this.fbService.removeItemFromArray<GeneralMenuWeek>(
        'generalMenu',
        'weeks',
        'name',
        week.name,
        'menus')),
      switchMap(_ => this.fbService.renameArrayItems<GeneralMenuWeek>('generalMenu', 'weeks', (week , i) => ({
        ...week,
        name: `week${i + 1}`,
      }), 'menus', (week , i)=> ({...week, name: `week${i + 1}`}))),
      catchError(err => {
        this.messageService.add({severity: 'error', detail: err});
        return throwError(err);
      }),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.isLoading$.next(false);
      this.messageService.add({severity: 'success', detail: 'Неделя успешно удалена'});
      this.refreshGeneralMenu$.next();
    });

    this.renameWeek$.pipe(
      switchMap(weekData => this.fbService.renameArrayItems<GeneralMenuWeek>(
        'generalMenu',
        'weeks',
        (week) => {
        if (week.name === weekData.weekName) {
          return {
            ...week,
            displayName: weekData.newDisplayName
          }
        }

        return week;
      }, 'menus', (week) => {
          if (week.name === weekData.weekName) {
            return {
              ...week,
              displayName: weekData.newDisplayName
            }
          }

          return week;
        })),
      catchError(err => {
        this.errorSubject$.next({error: true, timestamp: new Date().getTime()});
        this.messageService.add({severity: 'error', detail: err});
        return throwError(err);
      }),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.messageService.add({severity: 'success', detail: 'Неделя успешно переименована'});
      this.refreshGeneralMenu$.next();
    });
  }

  private get userMenus$(): Observable<EmployeeMenu[]> {
    return this.fbService.getItems<EmployeeMenu>('menus');
  }

  private get generalMenuData$(): Observable<GeneralMenu> {
    return this.fbService.getItemById<GeneralMenu>('generalMenu', 1);
  }

  private get employeesData$(): Observable<Employee[]> {
    return this.fbService.getItems<Employee>('employees');
  }
}

import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FirebaseDataService} from "../../../core/services/firebase-data.service";
import {catchError, merge, Observable, of, share, shareReplay, Subject, switchMap, tap, throwError} from "rxjs";
import {cloneDeep, isEqual, isNil} from "lodash-es";
import {EmployeeMenu} from "../../../models/employee-menu.model";
import {GeneralMenu} from "../../../models/general-menu.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MessageService} from "primeng/api";
import {WeekService} from "../../../core/services/week.service";
import {map} from "rxjs/operators";
import {CalendarOptions} from "@fullcalendar/core";
import {FullCalendarComponent} from "@fullcalendar/angular";

@UntilDestroy()
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  public currentUserMenu$!: Observable<EmployeeMenu | null>;
  public generalMenu$!: Observable<GeneralMenu | null>;
  private userMenuData$!: Observable<EmployeeMenu | null>;

  public _cachedUserMenu!: EmployeeMenu | null;
  public currentWeek!: string;
  public currentDate$: Observable<string>;
  public calendarOptions$: Observable<CalendarOptions>;
  public isCalendarDialogShow: boolean = false;

  public saveMenuBtnClick$: Subject<EmployeeMenu> = new Subject<EmployeeMenu>();
  private refreshUserMenu$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService,
              private fbService: FirebaseDataService,
              private messageService: MessageService,
              private weekService: WeekService) {
  }

  ngOnInit(): void {
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
      tap(menu => {
        !isNil(menu) ? this._cachedUserMenu = cloneDeep(menu) : this._cachedUserMenu = null;
        this._cachedUserMenu?.weeks.map(week => week.days.sort((a, b) => a.name > b.name ? 1 : -1));
      })
    );

    this.currentUserMenu$ = merge(
      this.userMenuData$,
      this.refreshUserMenu$.pipe(switchMap(_ => this.userMenuData$))
    );

    this.generalMenu$ = this.fbService.getItemById<GeneralMenu>('generalMenu', 1).pipe(
      catchError(err => {
        console.log(err);
        return throwError(err);
      }),
    ).pipe(
      share(),
      shareReplay({refCount: true, bufferSize: 1})
    );

    this.currentDate$ = this.generalMenu$.pipe(
      map(menu => this.weekService.getCurrentDateWeekString(menu))
    );

    this.calendarOptions$ = this.generalMenu$.pipe(
      map(menu => {
        return this.weekService.getWeeksCalendarOptions(menu);
      })
    )

    this.initializeSideEffect()
  }

  public getBtnState(changedMenu: EmployeeMenu, cachedMenu: EmployeeMenu | null): boolean {
    return isEqual(changedMenu, cachedMenu);
  }

  public openCalendarDialog() {
    this.isCalendarDialogShow = true;
    setTimeout(() => {
      this.calendarComponent.getApi().updateSize();
    }, 200)
  }


  private initializeSideEffect() {
    this.saveMenuBtnClick$.pipe(
      switchMap(menu => this.fbService.updateItem<EmployeeMenu>('menus', menu.id, menu)),
      catchError(err => {
        this.messageService.add({severity: 'error', detail: 'При сохранении меню произошла ошибка'});
        return throwError(err);
      }),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.messageService.add({severity: 'success', detail: 'Изменения успешно сохранены'});
      this.refreshUserMenu$.next();
    })
  }
}

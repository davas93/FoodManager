import { Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FirebaseDataService} from "../../../core/services/firebase-data.service";
import {catchError, merge, Observable, of, Subject, switchMap, tap, throwError} from "rxjs";
import {cloneDeep, isEqual, isNil} from "lodash-es";
import {EmployeeMenu} from "../../../models/employee-menu.model";
import {GeneralMenu} from "../../../models/general-menu.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MessageService} from "primeng/api";
import {WeekService} from "../../../core/services/week.service";
import {WEEKS} from "../../../consts/weeks-vocabulary";

@UntilDestroy()
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent implements OnInit {

  public currentUserMenu$!: Observable<EmployeeMenu | null>;
  public generalMenu$!: Observable<GeneralMenu | null>;
  private userMenuData$!: Observable<EmployeeMenu | null>;

  public _cachedUserMenu!: EmployeeMenu | null;
  public currentDate!: string;
  public currentWeek!: string;

  public saveMenuBtnClick$: Subject<EmployeeMenu> = new Subject<EmployeeMenu>();
  private refreshUserMenu$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService,
              private fbService: FirebaseDataService,
              private messageService: MessageService,
              private weekService: WeekService) {
  }

  ngOnInit(): void {
    const formattedDate: string = new Date().toLocaleDateString('ru',{weekday: "long", day: "numeric", month: "long", year: "numeric"});

    this.currentWeek = this.weekService.getCurrentWeek(4);

    this.currentDate = `Сегодня ${formattedDate} ${WEEKS[this.currentWeek]}`;

    this.userMenuData$ = this.authService.userUid.pipe(
      switchMap(uid => {
        if (!isNil(uid)) {
          return this.fbService.getItemById<EmployeeMenu>('menus', uid)
        } else return of(null)
      }),
      catchError(err => {
        this.messageService.add({ severity: 'error', detail: 'При получении меню сотрудника произошла ошибка' });
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
    );

    this.initializeSideEffect()
  }

  public getBtnState(changedMenu: EmployeeMenu, cachedMenu: EmployeeMenu | null): boolean {
    return isEqual(changedMenu, cachedMenu);
  }


  private initializeSideEffect() {
    this.saveMenuBtnClick$.pipe(
      switchMap(menu => this.fbService.updateItem<EmployeeMenu>('menus', menu.id, menu)),
      catchError(err => {
        this.messageService.add({ severity: 'error', detail: 'При сохранении меню произошла ошибка' });
        return throwError(err);
      }),
      untilDestroyed(this)
    ).subscribe(_ => {
      this.messageService.add({ severity: 'success', detail: 'Изменения успешно сохранены' });
      this.refreshUserMenu$.next();
    })
  }
}

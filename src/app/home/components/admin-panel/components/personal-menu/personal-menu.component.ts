import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {catchError, ReplaySubject, Subject, switchMap, tap, throwError} from "rxjs";
import {EmployeeMenu} from "../../../../../models/employee-menu.model";
import {GeneralMenu} from "../../../../../models/general-menu.model";
import {FirebaseDataService} from "../../../../../core/services/firebase-data.service";
import {MessageService} from "primeng/api";
import {WeekService} from "../../../../../core/services/week.service";
import {WEEKS} from "../../../../../consts/weeks-vocabulary";
import {cloneDeep, isEqual, isNil} from "lodash-es";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  styleUrl: './personal-menu.component.scss'
})
export class PersonalMenuComponent implements OnInit {
  @Input() set userMenuData(menu: EmployeeMenu | null) {
    if (!isNil(menu)) {
      this.currentUserMenu$.next(menu);

      !isNil(menu) ? this._cachedUserMenu = cloneDeep(menu) : this._cachedUserMenu = null;
      this._cachedUserMenu?.weeks.map(week => week.days.sort((a, b) => a.name > b.name ? 1 : -1));
    }
  }

  @Input() set generalMenu(menu: GeneralMenu | null) {
    if (!isNil(menu)) this.generalMenu$.next(menu);
  }

  @Output() refreshUserData: EventEmitter<void> = new EventEmitter<void>();

  public generalMenu$: ReplaySubject<GeneralMenu | null> = new ReplaySubject<GeneralMenu | null>(1);
  public currentUserMenu$: ReplaySubject<EmployeeMenu | null> = new ReplaySubject(1);

  public _cachedUserMenu!: EmployeeMenu | null;
  public currentDate!: string;
  public currentWeek!: string;

  public saveMenuBtnClick$: Subject<EmployeeMenu> = new Subject<EmployeeMenu>();

  constructor(private fbService: FirebaseDataService,
              private messageService: MessageService,
              private weekService: WeekService) {
  }

  ngOnInit(): void {
    const formattedDate: string = new Date().toLocaleDateString('ru', {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    this.currentWeek = this.weekService.getCurrentWeek();

    this.currentDate = `Сегодня ${formattedDate} ${WEEKS[this.currentWeek]}`;

    this.initializeSideEffect()
  }

  public getBtnState(changedMenu: EmployeeMenu, cachedMenu: EmployeeMenu | null): boolean {
    return isEqual(changedMenu, cachedMenu);
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
      this.refreshUserData.emit();
    })
  }
}

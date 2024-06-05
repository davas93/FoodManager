import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Week} from "../../models/employee-menu.model";
import {GeneralMenu} from "../../models/general-menu.model";
import {ReplaySubject} from "rxjs";
import {isNil} from "lodash-es";
import {DAYS_OF_WEEK, WEEKS} from "../../consts/weeks-vocabulary";

@Component({
  selector: 'app-user-menu-table',
  templateUrl: './user-menu-table.component.html',
  styleUrl: './user-menu-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserMenuTableComponent {

  @Input() set weeks(weeks: Week[]) {
    if (!isNil(weeks)) this.weeks$.next(weeks);
    else this.weeks$.next([])
  }

  @Input() set generalMenu(menu: GeneralMenu | null) {
    if (!isNil(menu)) this.generalMenu$.next(menu);
  }

  @Output() changeMenu: EventEmitter<void> = new EventEmitter<void>();

  protected readonly DAYS_OF_WEEK = DAYS_OF_WEEK;
  protected readonly WEEKS = WEEKS;

  public weeks$: ReplaySubject<Week[]> = new ReplaySubject<Week[]>(1);
  public generalMenu$: ReplaySubject<GeneralMenu> = new ReplaySubject<GeneralMenu>(1);
}

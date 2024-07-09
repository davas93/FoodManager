import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Day, Week} from "../../../../../models/employee-menu.model";
import {GeneralMenu} from "../../../../../models/general-menu.model";
import { ReplaySubject} from "rxjs";
import {isNil} from "lodash-es";
import {DAYS_OF_WEEK, WEEKS} from "../../../../../consts/weeks-vocabulary";

@Component({
  selector: 'app-user-menu-table',
  templateUrl: './user-menu-table.component.html',
  styleUrl: './user-menu-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserMenuTableComponent implements OnInit{

  @Input() set weeks(weeks: Week[]) {
    if (!isNil(weeks)) this.weeks$.next(weeks);
    else this.weeks$.next([])
  }

  @Input() set generalMenu(menu: GeneralMenu | null) {
    if (!isNil(menu)) this.generalMenu$.next(menu);
  }

  @Input() set currentWeek(week: string) {
    if (!isNil(week)) {
      this._currentWeek = week;
      console.log(this._currentDay, week, this._currentTimeInvalid)
    }
  }

  @Output() changeMenu: EventEmitter<void> = new EventEmitter<void>();

  protected readonly DAYS_OF_WEEK = DAYS_OF_WEEK;
  protected readonly WEEKS = WEEKS;

  public weeks$: ReplaySubject<Week[]> = new ReplaySubject<Week[]>(1);
  public generalMenu$: ReplaySubject<GeneralMenu> = new ReplaySubject<GeneralMenu>(1);
  public _currentWeekIndex: number = 0;
  private _currentDate: Date = new Date();
  public _currentDay: string = this._currentDate.toLocaleDateString('ru', {weekday: "long"});
  public _currentWeek: string;
  public _currentTimeInvalid: boolean = this._currentDate.getHours() > 15 || (this._currentDate.getHours() === 15 && this._currentDate.getMinutes() > 0);

  ngOnInit(): void {
  }

  onSaladChange(weekDay: Day, newValue: string) {
    if (newValue === 'САЛАТ') {
      weekDay.meals.firstCourse = '';
      weekDay.meals.secondCourse = '';
      weekDay.meals.sideDish = '';
    }
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WeekService} from "../../../core/services/week.service";
import {DAYS_OF_WEEK, WEEKS} from "../../../consts/weeks-vocabulary";
import {Observable, of, share, shareReplay, tap, withLatestFrom} from "rxjs";
import {EmployeeMenu} from "../../../models/employee-menu.model";
import {FirebaseDataService} from "../../../core/services/firebase-data.service";
import {map} from "rxjs/operators";
import {calculateMealCounts, MealCounts} from "./functions/calculateMealsCount.function";
import {Employee} from "../../../models/employee.model";
import {EmployeeStatus} from "../../../types/employee-status.type";

@Component({
  selector: 'app-dining-info',
  templateUrl: './dining-info.component.html',
  styleUrl: './dining-info.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DiningInfoComponent implements OnInit{
  protected readonly Object = Object;

  public currentDateString: string;
  public currentWeekDay: string;
  public currentWeek: string;
  public _currentWeekIndex: number;
  public _currentDayIndex: number = 0;
  public currentDate: Date = new Date();

  public employeeMenus$: Observable<EmployeeMenu[]>;
  private employees$: Observable<Employee[]>;
  public mealCounts$: Observable<MealCounts>;
  public isWeekend$: Observable<boolean>;

  constructor(private weekService: WeekService, private fbService: FirebaseDataService) {
  }

  ngOnInit(): void {
    const formattedDate: string = this.currentDate.toLocaleDateString('ru',{weekday: "long", day: "numeric", month: "long", year: "numeric"});
    this.currentWeekDay = this.currentDate.toLocaleDateString('ru', {weekday: "long"});

    this.currentWeek = this.weekService.getCurrentWeek();
    this.currentDateString = `Сегодня ${formattedDate} ${WEEKS[this.currentWeek]}`;
    this._currentWeekIndex = Object.keys(WEEKS).indexOf(this.currentWeek);

    if (!(this.currentWeekDay === "суббота" || this.currentWeekDay === "воскресенье")) {
      this._currentDayIndex = Object.values(DAYS_OF_WEEK).map(day => day.toLowerCase()).indexOf(this.currentWeekDay.toLowerCase());
    }

    this.isWeekend$ = of(this.currentWeekDay === "суббота" || this.currentWeekDay === "воскресенье");

    this.employees$ = this.fbService.getItems<Employee>('employees');

    this.employeeMenus$ = this.fbService.getItems<EmployeeMenu>('menus').pipe(
      withLatestFrom(this.employees$),
      map(([menus, employees]) => {
        const filteredMenus: EmployeeMenu[] = menus
          .filter(menu => employees
            .find(employee => employee.id === menu.id).status as EmployeeStatus !== ('Vacation' || 'Mission'));

        return filteredMenus;
      }),
      share(),
      shareReplay({bufferSize: 1, refCount: true})
    );

    this.mealCounts$ = this.employeeMenus$.pipe(
      map(employeeMenus => calculateMealCounts(employeeMenus, this._currentWeekIndex, this._currentDayIndex)),
    )
  }

  public getMaxFooterRows(mealCounts: MealCounts): never[] {
    return Array.from({ length: Math.max(
        Object.keys(mealCounts.firstCourse).length - 1,
        Object.keys(mealCounts.secondCourse).length - 1,
        Object.keys(mealCounts.sideDish).length - 1,
        Object.keys(mealCounts.salad).length - 1) })
  }
}

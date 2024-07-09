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
import {b} from "@fullcalendar/core/internal-common";

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
  public currentWeekIndex$: Observable<number>;
  public _currentDayIndex: number = 0;
  public currentDate: Date = new Date();

  public employeeMenus$: Observable<EmployeeMenu[]>;
  private employees$: Observable<Employee[]>;
  public mealCounts$: Observable<MealCounts>;
  public isWeekend$: Observable<boolean>;
  public currentDate$: Observable<string>;
  public diningTableData$: Observable<DiningTableData>;

  constructor(private weekService: WeekService, private fbService: FirebaseDataService) {
  }

  ngOnInit(): void {

    this.employees$ = this.fbService.getItems<Employee>('employees');

    this.employeeMenus$ = this.fbService.getItems<EmployeeMenu>('menus').pipe(
      withLatestFrom(this.employees$),
      map(([menus, employees]) => {
        const filteredMenus: EmployeeMenu[] = menus
          .filter(menu => {
            const employee = employees.find(employee => employee.id === menu.id);
            return employee && employee.status !== 'Vacation' && employee.status !== 'Mission';
          });

        return filteredMenus;
      }),
    );


    this.diningTableData$ = this.employeeMenus$.pipe(
      map(menus => {
        const currentDate: string = this.weekService.getCurrentDateWeekString(menus[0]);
        const currentWeek: string = this.weekService.getCurrentWeek(menus[0].weeks.length);
        const currentWeekIndex: number = menus[0].weeks.findIndex(week => week.name === currentWeek);
        const currentWeekDay = this.currentDate.toLocaleDateString('ru', {weekday: "long"});
        const currentDayIndex: number = Object.values(DAYS_OF_WEEK).map(day => day.toLowerCase()).indexOf(currentWeekDay.toLowerCase());
        const isWeekend: boolean = currentWeekDay === "суббота" || currentWeekDay === "воскресенье";
        const mealsCount: MealCounts = calculateMealCounts(menus, currentWeekIndex, currentDayIndex);


        const data: DiningTableData = {
          menus: menus,
          currentDate: currentDate,
          weekIndex: currentWeekIndex,
          dayIndex: currentDayIndex,
          isWeekend: isWeekend,
          mealCounts: mealsCount
        }

        return data
      })
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

interface DiningTableData {
  menus: EmployeeMenu[];
  currentDate: string;
  isWeekend: boolean;
  dayIndex: number;
  weekIndex: number;
  mealCounts: MealCounts
}

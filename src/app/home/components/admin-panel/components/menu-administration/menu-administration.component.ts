import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  switchMap,
  withLatestFrom
} from "rxjs";
import {GeneralMenu} from "../../../../../models/general-menu.model";
import {DAYS_OF_WEEK, WEEKS} from "../../../../../consts/weeks-vocabulary";
import {isNil} from "lodash-es";
import {Dish} from "../../../../../models/dishes.model";
import {Meal, Week} from "../../../../../models/employee-menu.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-menu-administration',
  templateUrl: './menu-administration.component.html',
  styleUrl: './menu-administration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MenuAdministrationComponent implements OnInit{

  @Input() set generalMenu(menu: GeneralMenu | null) {
    if (!isNil(menu)) this.generalMenu$.next(menu)
  }

  @Input() set firstCourses(dishes: Dish[] | null) {
    if (!isNil(dishes)) this.firstCourses$.next(dishes)
  }

  @Input() set secondCourses(dishes: Dish[] | null) {
    if (!isNil(dishes)) this.secondCourses$.next(dishes)
  }

  @Input() set sideDishes(dishes: Dish[] | null) {
    if (!isNil(dishes)) this.sideDishes$.next(dishes)
  }

  @Input() set salads(dishes: Dish[] | null) {
    if (!isNil(dishes)) this.salads$.next(dishes)
  }

  @Output() updateMenu: EventEmitter<GeneralMenu> = new EventEmitter<GeneralMenu>();

  protected readonly WEEKS = WEEKS;
  protected readonly DAYS_OF_WEEK = DAYS_OF_WEEK;

  public dishOptions$!: Observable<Dish[]>;

  public firstCourses$: ReplaySubject<Dish[]> = new ReplaySubject<Dish[]>(1);
  public secondCourses$: ReplaySubject<Dish[]> = new ReplaySubject<Dish[]>(1);
  public sideDishes$: ReplaySubject<Dish[]> = new ReplaySubject<Dish[]>(1);
  public salads$: ReplaySubject<Dish[]> = new ReplaySubject<Dish[]>(1);

  public currentDishType$: BehaviorSubject<keyof Meal> = new BehaviorSubject<keyof Meal>("firstCourse");
  public currentWeek$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public selectedDay$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public selectedDishes$: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>([]);
  public updateMenu$: Subject<GeneralMenu> = new Subject<GeneralMenu>();

  public isDialogShow: boolean = false;

  constructor() {
  }

  public generalMenu$: ReplaySubject<GeneralMenu | null> = new ReplaySubject<GeneralMenu | null>(1);

  ngOnInit(): void {
    this.dishOptions$ = this.currentDishType$.pipe(
      switchMap(type => {
        let dishes$: Observable<Dish[]>;
        switch (type) {
          case 'firstCourse':
            dishes$ = this.firstCourses$;
            break;
          case 'secondCourse':
            dishes$ = this.secondCourses$;
            break;
          case 'sideDish':
            dishes$ = this.sideDishes$;
            break;
          case 'salad':
            dishes$ = this.salads$;
            break;
          default:
            dishes$ = of([]);
        }

        return combineLatest([dishes$, this.selectedDay$, this.generalMenu$, this.currentWeek$]).pipe(
          map(([dishes, day, menu, week]) => {
            const meals = menu?.weeks[week]?.days.find(d => d.name === day)?.meals[type];
            return dishes.filter(dish => Array.isArray(meals) && !meals.find(m => m.id === dish.id));
          })
        );
      })
    );

    this.initializeSideEffects();
  }

  openModal(week: number, dishType: keyof Meal) {
    this.currentWeek$.next(week);
    this.currentDishType$.next(dishType);
    this.isDialogShow = true;
  }

  private initializeSideEffects() {
    this.updateMenu$.pipe(
      withLatestFrom(this.currentWeek$, this.selectedDay$, this.currentDishType$, this.selectedDishes$),
      map(([menu,week, day, type, dishes]) => {
        const currentWeek = menu.weeks[week];
        const currentDay = currentWeek.days.find(d => d.name === day);
        if (currentDay) {
          (currentDay.meals[type] as Dish[]).push(...dishes);
        }

        return menu
      }),
      untilDestroyed(this)
    ).subscribe(menu => {
      //this.updateMenu.emit(menu);
      this.generalMenu$.next(menu);
      this.isDialogShow = false;
    });
  }

  getMaxArrayLength(arr1: unknown[], arr2: unknown[], arr3: unknown[], arr4: unknown[]): Array<unknown> {
    return new Array(Math.max(arr1.length, arr2.length, arr3.length, arr4.length));
  }
}

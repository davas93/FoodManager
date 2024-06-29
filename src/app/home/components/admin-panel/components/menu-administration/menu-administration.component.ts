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
import {DAYS_OF_WEEK, DISHES, WEEKS} from "../../../../../consts/weeks-vocabulary";
import {isNil} from "lodash-es";
import {Dish} from "../../../../../models/dishes.model";
import {Meal} from "../../../../../models/employee-menu.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {WeekService} from "../../../../../core/services/week.service";

@UntilDestroy()
@Component({
    selector: 'app-menu-administration',
    templateUrl: './menu-administration.component.html',
    styleUrl: './menu-administration.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MenuAdministrationComponent implements OnInit {

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

    public currentDate!: string;
    public currentWeek!: string;
    public _currentWeekIndex = 0;

    public dishOptions$!: Observable<Dish[]>;
    public modalHeaderName$!: Observable<string>;
    public selectedOptions$!: Observable<Dish[]>;

    public generalMenu$: ReplaySubject<GeneralMenu | null> = new ReplaySubject<GeneralMenu | null>(1);
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

    constructor(private weekService: WeekService) {
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

        this.modalHeaderName$ = this.currentDishType$.pipe(
            map(type => DISHES[type])
        );

        switch (this.currentWeek) {
            case 'week1':
                this._currentWeekIndex = 0;
                break;
            case 'week2':
                this._currentWeekIndex= 1;
                break;
            case 'week3':
                this._currentWeekIndex = 2;
                break;
            case 'week4':
                this._currentWeekIndex = 3;
                break;
        }

        this.selectedOptions$ = combineLatest([this.generalMenu$, this.currentWeek$, this.selectedDay$, this.currentDishType$]).pipe(
            map(([menu, week, day, type]) => {
                if (!isNil(menu)) {
                    const dayIndex: number = menu.weeks[week].days.findIndex(option => option.name === day);
                    const dishes = menu.weeks[week].days[dayIndex]?.meals[type];
                    return dishes;
                }

                return []
            })
        );

        this.dishOptions$ = this.currentDishType$.pipe(
            switchMap(type => {
                switch (type) {
                    case 'firstCourse':
                        return this.firstCourses$;
                    case 'secondCourse':
                        return this.secondCourses$
                    case 'sideDish':
                        return this.sideDishes$
                    case 'salad':
                        return this.salads$
                    default:
                        return of([])
                }
            }),
        );

        this.initializeSideEffects();
    }

    public openModal(week: number, dishType: keyof Meal) {
        this.currentWeek$.next(week);
        this.currentDishType$.next(dishType);
        this.isDialogShow = true;
    }

    private initializeSideEffects() {
        this.updateMenu$.pipe(
            withLatestFrom(this.currentWeek$, this.selectedDay$, this.currentDishType$, this.selectedDishes$),
            map(([menu, week, day, type, dishes]) => {
                const currentWeek = menu.weeks[week];
                const currentDay = currentWeek.days.find(d => d.name === day);
                if (currentDay) {

                    (currentDay.meals[type]).push(...dishes)
                    currentDay.meals[type] = dishes;
                }

                return menu
            }),
            untilDestroyed(this)
        ).subscribe(menu => {
            this.updateMenu.emit(menu);
            this.isDialogShow = false;
        });
    }

    public getMaxArrayLength(arr1: unknown[], arr2: unknown[], arr3: unknown[], arr4: unknown[]): Array<unknown> {
        return new Array(Math.max(arr1.length, arr2.length, arr3.length, arr4.length));
    }

    public resetData() {
        this.selectedDishes$.next([]);
        this.selectedDay$.next('')
    }
}

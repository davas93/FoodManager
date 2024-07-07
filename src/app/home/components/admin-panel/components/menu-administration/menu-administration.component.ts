import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest, filter,
  map, merge,
  Observable,
  ReplaySubject, shareReplay,
  Subject,
  withLatestFrom
} from "rxjs";
import {GeneralMenu, GeneralMenuWeek} from "../../../../../models/general-menu.model";
import {DAYS_OF_WEEK, DISHES, WEEKS} from "../../../../../consts/weeks-vocabulary";
import {isNil} from "lodash-es";
import {Meal} from "../../../../../models/employee-menu.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {WeekService} from "../../../../../core/services/week.service";
import {SelectedMenuWithDay} from "../../../../../interfaces/selected-dishes-with-day.interface";
import {FormArray, FormBuilder, FormControl} from "@angular/forms";
import {noWhitespaceValidator} from "../../../../../form-validators/form-validators";
import {ServiceHelper} from "../../../../../helpers/service.helper";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import ruLocale from '@fullcalendar/core/locales/ru';
import {addDays} from "date-fns";
import {FullCalendarComponent} from "@fullcalendar/angular";

@UntilDestroy()
@Component({
  selector: 'app-menu-administration',
  templateUrl: './menu-administration.component.html',
  styleUrl: './menu-administration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MenuAdministrationComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  @Input() set generalMenu(menu: GeneralMenu | null) {
    if (!isNil(menu)) {
      this.generalMenu$.next(menu);
      this.isDialogShow = false;
      this.isNewWeekDialogShow = false;

      if (this.weekAction$.value === 'delete' && this._currentWeekIndex > 0) {
        this._currentWeekIndex = this._currentWeekIndex - 1;
      }
    }
  }

  @Input() set serviceError(error: {error: boolean, timestamp: number} | null) {
    if (!isNil(error)) this.errorSubject$.next(error)
  }

  @Output() updateMenu: EventEmitter<GeneralMenu> = new EventEmitter<GeneralMenu>();
  @Output() changeDishesWithDay: EventEmitter<SelectedMenuWithDay> = new EventEmitter<SelectedMenuWithDay>();
  @Output() addNewWeek: EventEmitter<GeneralMenuWeek> = new EventEmitter<GeneralMenuWeek>();
  @Output() removeWeek: EventEmitter<GeneralMenuWeek> = new EventEmitter<GeneralMenuWeek>();
  @Output() renameWeek: EventEmitter<{weekName: string; newDisplayName: string }> = new EventEmitter<{weekName: string; newDisplayName: string }>();

  protected readonly DAYS_OF_WEEK = DAYS_OF_WEEK;

  public currentDate$: Observable<string>;
  public _currentWeekIndex: number = 0;
  public modalHeaderName$!: Observable<string>;
  public selectedOptions$!: Observable<string[]>;

  public generalMenu$: ReplaySubject<GeneralMenu> = new ReplaySubject<GeneralMenu>(1);

  public currentDishType$: BehaviorSubject<keyof Meal> = new BehaviorSubject<keyof Meal>("firstCourse");
  public currentWeek$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public selectedDay$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public selectedDishes$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public updateMenu$: Subject<GeneralMenu> = new Subject<GeneralMenu>();

  private selectedDishesWithDay$: Observable<SelectedMenuWithDay>;

  public isDialogShow: boolean = false;
  public isNewWeekDialogShow: boolean = false;
  public isCalendarDialogShow: boolean = false;
  public isLoading$: Observable<boolean>;
  private startLoading$: Subject<void> = new Subject<void>();
  private errorSubject$: ReplaySubject<{error: boolean, timestamp: number}> = new ReplaySubject<{error: boolean, timestamp: number}>(1);

  public mealsForm: FormArray<FormControl<string>>;

  //weeks management
  public weekDisplayNameFormControl: FormControl<string> = new FormControl<string>('', noWhitespaceValidator);
  public addNewWeekClick$: Subject<void> = new Subject<void>();
  public removeWeekClick$: Subject<GeneralMenuWeek> = new Subject<GeneralMenuWeek>();
  public renameWeekClick$: Subject<string> = new Subject<string>();
  public openModalMode$: BehaviorSubject<'new' | 'edit'> = new BehaviorSubject<"new" | "edit">('new');
  public weekModalHeaderName$: BehaviorSubject<string> = new BehaviorSubject<string>('Добавление новой недели');
  public selectedWeekName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private weekAction$: BehaviorSubject<'add' | 'delete' | 'update'> = new BehaviorSubject<"add" | "delete" | "update">('add');

  public calendarOptions$: Observable<CalendarOptions>;

  constructor(private weekService: WeekService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.mealsForm = this.fb.array<string>([]);

    this.currentDate$ = this.generalMenu$.pipe(
      map(menu => {
        return this.weekService.getCurrentDateWeekString(menu);
      })
    );

    this.calendarOptions$ = this.generalMenu$.pipe(
      map(menu => {
        return this.weekService.getWeeksCalendarOptions(menu);
      })
    )

    this.modalHeaderName$ = this.currentDishType$.pipe(
      map(type => DISHES[type])
    );

    this.isLoading$ = merge(
      this.generalMenu$.pipe(map(_ => false)),
      this.startLoading$.pipe(map(_ => true)),
      this.errorSubject$.pipe(map(_ => false))
    ).pipe(
      shareReplay({bufferSize: 1, refCount: true})
    )

    this.selectedDishesWithDay$ = combineLatest([this.currentWeek$, this.selectedDay$, this.mealsForm.valueChanges, this.currentDishType$]).pipe(
      filter(([week, day, dishes, dishType]) => !isNil(week) && !isNil(day) && !isNil(dishes) && !isNil(dishType)),
      map(([week, day, dishes, dishType]) => {
        const data: SelectedMenuWithDay = {
          week: week,
          day: day,
          dishType: dishType,
          dishes: dishes
        }

        return data;
      }),
    )

    this.selectedOptions$ = combineLatest([this.generalMenu$, this.currentWeek$, this.selectedDay$, this.currentDishType$]).pipe(
    map(([menu, week, day, type]) => {
      if (!isNil(menu)) {
        const dayIndex: number = menu.weeks[week]?.days.findIndex(option => option.name === day);
        const dishes = menu.weeks[week]?.days[dayIndex]?.meals[type];
        return dishes;
      }

      return []
    })
  );

    this.initializeSideEffects();
  }


  public addMeal(value: string = ""): void {
    this.mealsForm.push(this.fb.control(value, noWhitespaceValidator));  // Добавление нового FormControl в FormArray
  }

  public removeMeal(index: number): void {
    this.mealsForm.removeAt(index);
  }

  public openModal(week: number, dishType: keyof Meal) {
    this.currentWeek$.next(week);
    this.currentDishType$.next(dishType);
    this.isDialogShow = true;
  }

  private initializeSideEffects() {
    this.selectedOptions$.pipe(untilDestroyed(this)).subscribe(meals => {
      if (!isNil(meals)) {
        meals.forEach(meal => this.addMeal(meal))
      }
    });

    this.updateMenu$.pipe(
      filter(_ => this.mealsForm.valid),
      withLatestFrom(this.currentWeek$, this.selectedDay$, this.currentDishType$),
      map(([menu, week, day, type]) => {
        const currentWeek = menu.weeks[week];
        const currentDay = currentWeek.days.find(d => d.name === day);
        if (currentDay) {

          (currentDay.meals[type]).push(...this.mealsForm.value)
          currentDay.meals[type] = this.mealsForm.value;
        }

        return menu
      }),
      withLatestFrom(this.selectedDishesWithDay$),
      untilDestroyed(this)
    ).subscribe(([menu, selectedMenuWithDay]) => {
      this.updateMenu.emit(menu);
      this.changeDishesWithDay.emit(selectedMenuWithDay);
      this.startLoading$.next();
      this.resetData();
    });

    //Weeks management
    this.addNewWeekClick$.pipe(
      filter(_ => this.weekDisplayNameFormControl.valid),
      withLatestFrom(this.generalMenu$),
      map(([_ ,menu]) => {
        this.isNewWeekDialogShow = true;

        const totalWeeks = menu.weeks.length;

        return new GeneralMenuWeek({
          name: `week${totalWeeks + 1}`,
          displayName: this.weekDisplayNameFormControl.value
        })
      })
    ).subscribe(week => {
      this.weekAction$.next('add');
      this.addNewWeek.emit(ServiceHelper.toPlainObject(week));
      this.startLoading$.next();
      this.weekDisplayNameFormControl.reset();
    });

    this.removeWeekClick$.pipe(untilDestroyed(this)).subscribe(week => {
      this.weekAction$.next('delete');
      this.removeWeek.emit(week);
    });

    this.renameWeekClick$.pipe(untilDestroyed(this)).subscribe(newDisplayName => {
      this.weekAction$.next('update');
      this.renameWeek.emit({
        weekName: this.selectedWeekName$.value,
        newDisplayName: newDisplayName
      });

      this.startLoading$.next()
    });
  }

  public getMaxArrayLength(arr1: unknown[], arr2: unknown[], arr3: unknown[], arr4: unknown[]): Array<unknown> {
    return new Array(Math.max(arr1.length, arr2.length, arr3.length, arr4.length));
  }

  public resetData() {
    this.selectedDishes$.next(null);
    this.selectedDay$.next(null);
    this.currentWeek$.next(null);
    this.currentDishType$.next(null);
    this.mealsForm = this.fb.array<string>([]);
    this.isDialogShow = false;
  }

  public openWeekModal(week?: GeneralMenuWeek) {
    if (!isNil(week)) {
      this.openModalMode$.next('edit');
      this.weekDisplayNameFormControl.setValue(week.displayName);
      this.weekModalHeaderName$.next(`Редактирование недели "${week.displayName}"`);
      this.selectedWeekName$.next(week.name);
    } else {
      this.openModalMode$.next('new');
      this.weekModalHeaderName$.next('Добавление новой недели');
    }

    this.isNewWeekDialogShow = true;
  }

  public openCalendarDialog() {
    this.isCalendarDialogShow = true;
    setTimeout(() => {
      this.calendarComponent.getApi().updateSize();
    }, 200)
  }
}

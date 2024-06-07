import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ReplaySubject, Subject} from "rxjs";
import {GeneralMenu} from "../../../../../models/general-menu.model";
import {DAYS_OF_WEEK, WEEKS} from "../../../../../consts/weeks-vocabulary";
import {isNil} from "lodash-es";
import {Dish} from "../../../../../models/dishes.model";

@Component({
  selector: 'app-menu-administration',
  templateUrl: './menu-administration.component.html',
  styleUrl: './menu-administration.component.scss',
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

  protected readonly WEEKS = WEEKS;
  protected readonly DAYS_OF_WEEK = DAYS_OF_WEEK;

  public firstCourses$: Subject<Dish[]> = new Subject<Dish[]>();
  public secondCourses$: Subject<Dish[]> = new Subject<Dish[]>();
  public sideDishes$: Subject<Dish[]> = new Subject<Dish[]>();
  public salads$: Subject<Dish[]> = new Subject<Dish[]>();

  public isDialogShow: boolean = false;

  constructor() {
  }

  public generalMenu$: ReplaySubject<GeneralMenu | null> = new ReplaySubject<GeneralMenu | null>(1);

  ngOnInit(): void {
  }

  openModal() {
    this.isDialogShow = true;
  }
}

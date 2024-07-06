import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {EmployeeMenu} from "../../../../../models/employee-menu.model";
import {GeneralMenu} from "../../../../../models/general-menu.model";
import {WeekService} from "../../../../../core/services/week.service";
import {WEEKS} from "../../../../../consts/weeks-vocabulary";
import {cloneDeep, isEqual, isNil} from "lodash-es";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  styleUrl: './personal-menu.component.scss',
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

  @Output() saveMenuData: EventEmitter<EmployeeMenu> = new EventEmitter<EmployeeMenu>();

  public generalMenu$: ReplaySubject<GeneralMenu | null> = new ReplaySubject<GeneralMenu | null>(1);
  public currentUserMenu$: ReplaySubject<EmployeeMenu | null> = new ReplaySubject(1);

  public _cachedUserMenu!: EmployeeMenu | null;
  public currentDate!: string;
  public currentWeek!: string;


  constructor(private weekService: WeekService, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    if (config.data) {
      this.currentUserMenu$.next(config.data.userMenuData);
      this._cachedUserMenu = cloneDeep(config.data.userMenuData);
      this.generalMenu$.next(config.data.generalMenu);
    }
  }

  ngOnInit(): void {
    const formattedDate: string = new Date().toLocaleDateString('ru', {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    this.currentWeek = this.weekService.getCurrentWeek(4);

    this.currentDate = `Сегодня ${formattedDate} ${WEEKS[this.currentWeek]}`;
  }

  public getBtnState(changedMenu: EmployeeMenu, cachedMenu: EmployeeMenu | null): boolean {
    return isEqual(changedMenu, cachedMenu);
  }

  public onSave(menu: EmployeeMenu) {
    this.saveMenuData.emit(menu);
    this.ref.close(menu);
  }

  public onCancel() {
    this.ref.close();
  }
}

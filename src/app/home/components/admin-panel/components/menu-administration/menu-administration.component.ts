import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {GeneralMenu} from "../../../../../models/general-menu.model";
import {DAYS_OF_WEEK, WEEKS} from "../../../../../consts/weeks-vocabulary";
import {isNil} from "lodash-es";

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

  protected readonly WEEKS = WEEKS;
  protected readonly DAYS_OF_WEEK = DAYS_OF_WEEK;

  public isDialogShow: boolean = false;

  constructor() {
  }

  public generalMenu$: ReplaySubject<GeneralMenu | null> = new ReplaySubject<GeneralMenu | null>(1);

  ngOnInit(): void {
  }

  logMenu(menu: GeneralMenu) {
    this.isDialogShow = true;
  }
}

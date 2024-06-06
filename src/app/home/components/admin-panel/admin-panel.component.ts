import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {catchError, merge, Observable, of, Subject, switchMap, tap, throwError} from "rxjs";
import {EmployeeMenu} from "../../../models/employee-menu.model";
import {isNil} from "lodash-es";
import {AuthService} from "../../../core/services/auth.service";
import {FirebaseDataService} from "../../../core/services/firebase-data.service";
import {MessageService} from "primeng/api";
import {GeneralMenu} from "../../../models/general-menu.model";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit{
  private userMenuData$!: Observable<EmployeeMenu | null>;
  public currentUserMenu$!: Observable<EmployeeMenu | null>;
  public generalMenu$!: Observable<GeneralMenu | null>;

  public refreshUserMenu$: Subject<void> = new Subject<void>();


  constructor(private authService: AuthService,
              private fbService: FirebaseDataService,
              private messageService: MessageService) {
  }

    ngOnInit(): void {
      this.userMenuData$ = this.authService.userUid.pipe(
        switchMap(uid => {
          if (!isNil(uid)) {
            return this.fbService.getItemById<EmployeeMenu>('menus', uid)
          } else return of(null)
        }),
        catchError(err => {
          this.messageService.add({severity: 'error', detail: 'При получении меню сотрудника произошла ошибка'});
          return throwError(err);
        }),
      );

      this.generalMenu$ = this.fbService.getItemById<GeneralMenu>('generalMenu', 1).pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }),
      );

      this.currentUserMenu$ = merge(
        this.userMenuData$,
        this.refreshUserMenu$.pipe(switchMap(_ => this.userMenuData$))
      );
    }

}

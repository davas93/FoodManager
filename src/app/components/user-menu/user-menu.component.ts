import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {FirebaseDataService} from "../../core/services/firebase-data.service";
import {Observable, of, switchMap, tap} from "rxjs";
import {isNil} from "lodash-es";
import {EmployeeMenu} from "../../models/employee-menu.model";
import {GeneralMenu} from "../../models/general-menu.model";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent implements OnInit {

  public currentUserMenu$!: Observable<EmployeeMenu | null>;
  public generalMenu$!: Observable<GeneralMenu | null>;

  constructor(private authService: AuthService, private fbService: FirebaseDataService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.currentUserMenu$ = this.authService.userUid.pipe(
      switchMap(uid => {
        if (!isNil(uid)) return this.fbService.getItemById<EmployeeMenu>('menus', uid);
        else return of(null)
      })
    );

    this.generalMenu$ = this.fbService.getItemById<GeneralMenu>('generalMenu', 1).pipe(tap(data => console.log(data)));
  }


  edit(event: EmployeeMenu) {
    console.log(event)
  }
}

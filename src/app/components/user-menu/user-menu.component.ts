import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Employee} from "../../models/employee.model";
import {FirebaseDataService} from "../../core/services/firebase-data.service";
import {Observable, of, switchMap} from "rxjs";
import {isNil} from "lodash-es";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent implements OnInit{

  public currentUser$!: Observable<Employee | null>;

  constructor(private authService: AuthService, private fbService: FirebaseDataService) {
  }

  ngOnInit(): void {
        this.currentUser$ = this.authService.userUid.pipe(
          switchMap(uid => {
            if (!isNil(uid)) return this.fbService.getItemById<Employee>('employees', uid);
            else return of(null)
          })
        )
    }
}

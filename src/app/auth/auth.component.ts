import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginData} from "../models/login-data.model";
import {catchError, filter, of, Subject, switchMap} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {AuthService} from "../core/services/auth.service";
import {Router} from "@angular/router";

@UntilDestroy()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  public loginData: FormGroup<LoginFormData> = new FormGroup<LoginFormData>(<LoginFormData>{
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  })

  public loginBtnClick$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginBtnClick$.pipe(
      filter(_ => this.loginData.valid),
      switchMap(_ => this.authService.signIn(this.loginData.value as LoginData).pipe(
          catchError(error => {
            console.error('Login error:', error);
            return of(null);
          }))),
      untilDestroyed(this)
    ).subscribe(user => {
      if (user) {
        switch (user.role) {
          case "User":
            this.router.navigate(["/user"]);
            break;

          case "Admin":
            this.router.navigate(["/admin"]);
            break;

          case "Dining":
            this.router.navigate(["/dining"]);
            break;
        }
      }
    });
  }
}

type PartialLoginDataControls<T> = {
  [K in keyof T]: FormControl<T[K]>
}

type LoginFormData = PartialLoginDataControls<LoginData>;

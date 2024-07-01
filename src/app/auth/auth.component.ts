import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginData} from "../models/login-data.model";
import {catchError, filter, of, retry, Subject, switchMap, throwError} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {AuthService} from "../core/services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ServiceHelper} from "../helpers/service.helper";
import {noWhitespaceValidator} from "../form-validators/form-validators";

@UntilDestroy()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  public loginData: FormGroup<LoginFormData> = new FormGroup<LoginFormData>(<LoginFormData>{
    serviceNumber: new FormControl<string>('00001', noWhitespaceValidator),
    password: new FormControl<string>('000000', [noWhitespaceValidator, Validators.minLength(6)])
  })

  public loginBtnClick$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loginBtnClick$.pipe(
      filter(_ => this.loginData.valid),
      switchMap(_ => {
        const loginData: LoginData = this.loginData.value as LoginData;

        loginData.serviceNumber = loginData.serviceNumber.concat('@fondital.ru')
        return this.authService.signIn(loginData);
      }),
      catchError(error => {
        this.messageService.add({severity: 'error', detail: ServiceHelper.translateError(error.code)});
        return throwError(error);
      }),
      retry(),
      untilDestroyed(this)
    ).subscribe(user => {
      if (user) {
        switch (user.role) {
          case "User":
            this.router.navigate(["/home/user"]);
            break;

          case "Admin":
            this.router.navigate(["/home/admin"]);
            break;

          case "Dining":
            this.router.navigate(["/home/dining"]);
            break;
        }
      }
    });
  }

  public getErrorMessage(control: AbstractControl): string {
    const errors = control.errors;

    if (errors && control.dirty) {
      switch (true) {
        case !!errors['whitespace']:
          return 'Поле обязательно для заполнения'

        case !!errors['minlength']:
          return 'Пароль должен быть не менее 6 символов';

        default:
          return ""
      }
    }

    return ""
  }
}

type PartialLoginDataControls<T> = {
  [K in keyof T]: FormControl<T[K]>
}

type LoginFormData = PartialLoginDataControls<LoginData>;

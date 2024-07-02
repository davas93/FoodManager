import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Employee} from "../../../../../models/employee.model";
import {merge, Observable, ReplaySubject, shareReplay, Subject} from "rxjs";
import {isNil} from "lodash-es";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Roles} from "../../../../../types/roles.type";
import {noWhitespaceValidator} from "../../../../../form-validators/form-validators";
import {UserFormDto} from "../../../../../interfaces/user-form-dto.interface";
import {map} from "rxjs/operators";
import {ROLES} from "../../../../../consts/roles";
import {STATUSES} from "../../../../../consts/employee-status-vocabulary";

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersManagementComponent {

  @Input() set employees(employees: Employee[] | null) {
    if (!isNil(employees)) {
      employees.sort((a, b) => a.fullName.localeCompare(b.fullName));
      const filteredEmployees = employees.filter(employee => employee.id !== this.currentUserId)

      this.employees$.next(filteredEmployees);
      this.isDialogShow = false;
    }
  }

  @Input() set serviceError(error: {error: boolean, timestamp: number} | null) {
    if (!isNil(error)) this.errorSubject$.next(error)
  }

  @Output() addUser: EventEmitter<UserFormDto> = new EventEmitter<UserFormDto>();
  @Output() removeUser: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() editUser: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() openUserMenu: EventEmitter<string> = new EventEmitter<string>();

  public readonly employeeStatuses: { label: string, value: string }[] = [];
  public readonly roles = ROLES;
  protected readonly STATUSES = STATUSES;

  public isDialogShow: boolean = false;
  public isLoading$: Observable<boolean>;
  private startLoading$: Subject<void> = new Subject<void>();
  private errorSubject$: ReplaySubject<{error: boolean, timestamp: number}> = new ReplaySubject<{error: boolean, timestamp: number}>(1);


  public employees$: ReplaySubject<Employee[]> = new ReplaySubject<Employee[]>(1);
  public userFormDto: FormGroup<UserDtoFormGroup>;
  public currentUserId: string;


  constructor(private fb: FormBuilder) {
    this.currentUserId = JSON.parse(localStorage.getItem("userData")).id;

    this.userFormDto = this.fb.group<UserDtoFormGroup>({
      username: new FormControl<string>('', [noWhitespaceValidator]),
      fullName: new FormControl<string>('', [noWhitespaceValidator]),
      password: new FormControl<string>('', [noWhitespaceValidator, Validators.minLength(6)]),
      role: new FormControl<Roles | null>(null, [noWhitespaceValidator]),
    });

    this.isLoading$ = merge(
      this.employees$.pipe(map(_ => false)),
      this.startLoading$.pipe(map(_ => true)),
      this.errorSubject$.pipe(map(_ => false))
    ).pipe(
      shareReplay({bufferSize: 1, refCount: true})
    )

    this.employeeStatuses = Object.keys(STATUSES).map(key => ({
      label: STATUSES[key],
      value: key
    }));
  }

  public showModal(): void {
    this.isDialogShow = true;
  }

  public getErrorMessage(control: AbstractControl): string {
    const errors = control.errors;

    if (errors && control.dirty) {
      switch (true) {
        case !!errors['whitespace']:
          return 'Поле обязательно для заполнения'

        case !!errors['invalidEmail']:
          return 'Логин должен быть в формате email';

        case !!errors['minlength']:
          return 'Пароль должен быть не менее 6 символов';

        default:
          return ""
      }
    }

    return ""
  }

  public sendForm(): void {
    if (this.userFormDto.invalid) {
      for (const control in this.userFormDto.controls) {
        this.userFormDto.get(control)?.markAsDirty()
      }

      return;
    }

    const sendData: UserFormDto = (this.userFormDto.value) as UserFormDto;
    sendData.username = sendData.username.concat('@fondital.ru');

    this.startLoading$.next();
    this.addUser.emit(sendData);
  }

  public resetForm(): void {
    this.userFormDto.reset()
  }
}

type UserDtoFormGroup = {
  [K in keyof UserFormDto]: FormControl<UserFormDto[K] | null>
};

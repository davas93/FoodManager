import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Employee} from "../../../../../models/employee.model";
import {ReplaySubject} from "rxjs";
import {isNil} from "lodash-es";

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersManagementComponent {

  @Input() set employees(employees: Employee[] | null) {
    if (!isNil(employees)) this.employees$.next(employees);
  }

  public employees$: ReplaySubject<Employee[]> = new ReplaySubject<Employee[]>();

}

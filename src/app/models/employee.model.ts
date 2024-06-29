import {Roles} from "../types/roles.type";
import {isNil} from "lodash-es";
import {EmployeeStatus} from "../types/employee-status.type";

export class Employee {
  id: string = '';
  username: string = "";
  fullName: string = '';
  role: Roles | null = 'User';
  status: EmployeeStatus = 'Working'

  constructor(input?: Partial<Employee>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

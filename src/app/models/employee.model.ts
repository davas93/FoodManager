import {Roles} from "../types/roles.type";
import {isNil} from "lodash-es";

export class Employee {
  id: string = '';
  fullName: string = '';
  role: Roles = 'User'

  constructor(input?: Partial<Employee>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

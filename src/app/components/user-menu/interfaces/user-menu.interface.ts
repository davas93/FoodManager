import {Observable} from "rxjs";
import {Employee} from "../../../models/employee.model";

export interface UserMenu {
  getUserInfo(id: string): Observable<Employee>;
}

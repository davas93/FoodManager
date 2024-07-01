import {isNil} from "lodash-es";

export class LoginData {
  serviceNumber: string = "";
  password: string = ""

  constructor(input?: Partial<LoginData>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

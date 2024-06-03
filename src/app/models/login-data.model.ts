import {isNil} from "lodash-es";

export class LoginData {
  email: string = "";
  password: string = ""

  constructor(input?: Partial<LoginData>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

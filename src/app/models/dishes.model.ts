import {isNil} from "lodash-es";

export class Dishes {
  dishes: Dish[] = [];

  constructor(input?: Partial<Dishes>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}


export class Dish {
  id: string = "";
  name: string = "";

  constructor(input?: Partial<Dish>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

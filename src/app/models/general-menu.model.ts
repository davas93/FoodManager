import {isNil} from "lodash-es";
import {Week} from "./employee-menu.model";

export class GeneralMenu {
  weeks: Week[]  = [
    new Week({name: "week1"}),
    new Week({name: "week2"}),
    new Week({name: "week3"}),
    new Week({name: "week4"})
  ];

  constructor(input?: Partial<GeneralMenu>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

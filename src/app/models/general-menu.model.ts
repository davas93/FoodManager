import {isNil} from "lodash-es";
import {Dish} from "./dishes.model";

export class GeneralMenu {
  weeks: GeneralMenuWeek[]  = [
    new GeneralMenuWeek({name: "week1"}),
    new GeneralMenuWeek({name: "week2"}),
    new GeneralMenuWeek({name: "week3"}),
    new GeneralMenuWeek({name: "week4"})
  ];

  constructor(input?: Partial<GeneralMenu>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class GeneralMenuMeal {
  firstCourse: Dish[] = [];
  secondCourse: Dish[] = [];
  sideDish: Dish[] = [];
  salad: Dish[] = [];

  constructor(input?: Partial<GeneralMenuMeal>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class GeneralMenuDay {
  name: string = "";
  meals: GeneralMenuMeal = new GeneralMenuMeal();

  constructor(input?: Partial<GeneralMenuDay>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class GeneralMenuWeek {
  name: string = "";
  days: GeneralMenuDay[] = [
    new GeneralMenuDay({name: "day1"}),
    new GeneralMenuDay({name: "day2"}),
    new GeneralMenuDay({name: "day3"}),
    new GeneralMenuDay({name: "day4"}),
    new GeneralMenuDay({name: "day5"}),
  ];

  constructor(input?: Partial<GeneralMenuWeek>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

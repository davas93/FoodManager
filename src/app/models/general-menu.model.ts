import {isNil} from "lodash-es";
import {Dish} from "./dishes.model";

export class GeneralMenu {
  weeks: GeneralMenuWeek[]  = [
    new GeneralMenuWeek({name: "week1", displayName: "Неделя 1"}),
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
  displayName: string = "";
  meals: GeneralMenuMeal = new GeneralMenuMeal();

  constructor(input?: Partial<GeneralMenuDay>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class GeneralMenuWeek {
  name: string = "";
  displayName: string = "";
  days: GeneralMenuDay[] = [
    new GeneralMenuDay({name: "day1", displayName: "Понедельник"}),
    new GeneralMenuDay({name: "day2", displayName: "Вторник"}),
    new GeneralMenuDay({name: "day3", displayName: "Среда"}),
    new GeneralMenuDay({name: "day4", displayName: "Четверг"}),
    new GeneralMenuDay({name: "day5", displayName: "Пятница"}),
  ];

  constructor(input?: Partial<GeneralMenuWeek>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

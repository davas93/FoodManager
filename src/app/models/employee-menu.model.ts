import {isNil} from "lodash-es";
import {Dish} from "./dishes.model";

export class Meal {
  firstCourse: string | Dish[] = "";
  secondCourse: string | Dish[] = "";
  sideDish: string | Dish[] ="";
  salad: string | Dish[] = "";

  constructor(input?: Partial<Meal>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class Day {
  name: string = "";
  meals: Meal = new Meal();

  constructor(input?: Partial<Day>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class Week {
  name: string = "";
  days: Day[] = [
    new Day({name: "day1"}),
    new Day({name: "day2"}),
    new Day({name: "day3"}),
    new Day({name: "day4"}),
    new Day({name: "day5"}),
  ];

  constructor(input?: Partial<Week>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class EmployeeMenu {
  id: string = "";
  employeeName: string = "";
  weeks: Week[] = [
    new Week({name: "week1"}),
    new Week({name: "week2"}),
    new Week({name: "week3"}),
    new Week({name: "week4"})
  ];

  constructor(input?: Partial<EmployeeMenu>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

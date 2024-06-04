import {isNil} from "lodash-es";

export class Meal {
  firstCourse: string = "";
  secondCourse: string = "";
  sideDish: string ="";
  salad: string = "";

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
    new Day({name: "monday"}),
    new Day({name: "tuesday"}),
    new Day({name: "wednesday"}),
    new Day({name: "thursday"}),
    new Day({name: "friday"}),
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

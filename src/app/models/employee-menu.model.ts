import {isNil} from "lodash-es";

export class Meal {
  firstCourse: string = "";
  secondCourse: string = "";
  sideDish: string = "";
  salad: string = "";

  constructor(input?: Partial<Meal>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class Day {
  name: string = "";
  displayName: string = "";
  meals: Meal = new Meal();

  constructor(input?: Partial<Day>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class Week {
  name: string = "";
  displayName: string = "";
  days: Day[] = [
    new Day({name: "day1", displayName: "Понедельник"}),
    new Day({name: "day2", displayName: "Вторник"}),
    new Day({name: "day3", displayName: "Среда"}),
    new Day({name: "day4", displayName: "Четверг"}),
    new Day({name: "day5", displayName: "Пятница"}),
  ];

  constructor(input?: Partial<Week>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

export class EmployeeMenu {
  id: string = "";
  employeeName: string = "";
  weeks: Week[] = [
    new Week({name: "week1", displayName: "Неделя 1"}),
  ];

  constructor(input?: Partial<EmployeeMenu>) {
    if (!isNil(input)) Object.assign(this, input);
  }
}

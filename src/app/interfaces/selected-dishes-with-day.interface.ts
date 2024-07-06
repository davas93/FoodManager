import {Meal} from "../models/employee-menu.model";

export interface SelectedMenuWithDay {
  week: number;
  day: string;
  dishType: keyof Meal;
  dishes: string[];
}

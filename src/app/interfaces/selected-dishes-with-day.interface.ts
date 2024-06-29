import {Dish} from "../models/dishes.model";
import {Meal} from "../models/employee-menu.model";

export interface SelectedMenuWithDay {
  week: number;
  day: string;
  dishType: keyof Meal;
  dishes: Dish[];
}

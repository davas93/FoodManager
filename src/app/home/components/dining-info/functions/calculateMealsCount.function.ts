import {EmployeeMenu} from "../../../../models/employee-menu.model";

type Meal = {
  firstCourse?: string;
  salad?: string;
  sideDish?: string;
  secondCourse?: string;
};

type Day = {
  meals: Meal;
};

type Week = {
  days: Day[];
};

type Employee = {
  weeks: Week[];
};

export type MealCounts = {
  [key: string]: { [mealName: string]: number } & { total: number };
};

export function calculateMealCounts(data: EmployeeMenu[], currentWeekIndex: number, currentDayIndex: number): MealCounts {
  const mealCounts: MealCounts = {
    firstCourse: { total: 0 },
    salad: { total: 0 },
    sideDish: { total: 0 },
    secondCourse: { total: 0 }
  };

  data.forEach(employee => {
    const week = employee.weeks[currentWeekIndex];
    if (week) {
      const day = week.days[currentDayIndex];
      if (day) {
        const meals = day.meals;
        if (meals.firstCourse) {
          if (!mealCounts.firstCourse[meals.firstCourse]) {
            mealCounts.firstCourse[meals.firstCourse] = 0;
          }
          mealCounts.firstCourse[meals.firstCourse]++;
          mealCounts.firstCourse.total++;
        }
        if (meals.salad) {
          if (!mealCounts.salad[meals.salad]) {
            mealCounts.salad[meals.salad] = 0;
          }
          mealCounts.salad[meals.salad]++;
          mealCounts.salad.total++;
        }
        if (meals.sideDish) {
          if (!mealCounts.sideDish[meals.sideDish]) {
            mealCounts.sideDish[meals.sideDish] = 0;
          }
          mealCounts.sideDish[meals.sideDish]++;
          mealCounts.sideDish.total++;
        }
        if (meals.secondCourse) {
          if (!mealCounts.secondCourse[meals.secondCourse]) {
            mealCounts.secondCourse[meals.secondCourse] = 0;
          }
          mealCounts.secondCourse[meals.secondCourse]++;
          mealCounts.secondCourse.total++;
        }
      }
    }
  });

  const totalComplexMeals = Math.max(
    mealCounts.firstCourse.total,
    mealCounts.salad.total,
    mealCounts.sideDish.total,
    mealCounts.secondCourse.total
  );

  mealCounts.complexMeals = { total: totalComplexMeals };

  return mealCounts;
}

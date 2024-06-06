import { Pipe, PipeTransform } from '@angular/core';
import {Day, Meal} from "../models/employee-menu.model";
import {Dish} from "../models/dishes.model";

@Pipe({
  name: 'normalizeMeals',
  standalone: true
})
export class NormalizeMealsPipe implements PipeTransform {

  transform(days: Day[]): Day[] {
    return days.map(day => this.normalizeDayMeals(day));
  }

  private normalizeDayMeals(day: Day): Day {
    const maxLength = this.getMaxLength(day);
    const normalizedMeals: Meal = {
      firstCourse: this.normalizeCourse(day.meals.firstCourse, maxLength),
      secondCourse: this.normalizeCourse(day.meals.secondCourse, maxLength),
      sideDish: this.normalizeCourse(day.meals.sideDish, maxLength),
      salad: this.normalizeCourse(day.meals.salad, maxLength),
    };
    return { ...day, meals: normalizedMeals };
  }

  private getMaxLength(day: Day): number {
    return Math.max(
      this.ensureArray(day.meals.firstCourse).length,
      this.ensureArray(day.meals.secondCourse).length,
      this.ensureArray(day.meals.sideDish).length,
      this.ensureArray(day.meals.salad).length
    );
  }

  private normalizeCourse(course: string | Dish[], maxLength: number): Dish[] {
    const normalizedCourse = [...this.ensureArray(course)];
    while (normalizedCourse.length < maxLength) {
      normalizedCourse.push({ id: 0, name: '' });
    }
    return normalizedCourse;
  }

  private ensureArray(course: string | Dish[]): Dish[] {
    if (typeof course === 'string') {
      return course ? [{ id: 0, name: course }] : [];
    }
    return course;
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor() { }

  public getCurrentWeek(weeksLength: number): string {
    const currentDate: Date = new Date();
    const startOfYear: Date = new Date(currentDate.getFullYear(), 5, 3);
    const diff: number = currentDate.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const currentWeekNumber = Math.floor(diff / (oneDay * 7)) % weeksLength + 1;

    return `week${currentWeekNumber}`;
  }
}

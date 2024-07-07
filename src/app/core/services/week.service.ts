import { Injectable } from '@angular/core';
import {addDays, endOfWeek, startOfWeek} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor() { }

  public getCurrentWeek(weeksLength: number): string {
    const currentDate: Date = new Date();
    const startOfYear: Date = new Date(currentDate.getFullYear(), 0, 1);
    const diff: number = currentDate.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const currentWeekNumber = Math.floor(diff / (oneDay * 7)) % weeksLength + 1;

    return `week${currentWeekNumber}`;
  }

  getWeekRangesForCurrentYear(): { start: Date, end: Date }[] {
    const ranges: { start: Date, end: Date }[] = [];
    const currentDate: Date = new Date();
    const startOfYear: Date = new Date(currentDate.getFullYear(), 0, 1);
    const endOfYear: Date = new Date(currentDate.getFullYear(), 11, 31);

    let currentStartOfWeek: Date = startOfWeek(startOfYear, { weekStartsOn: 1 });

    while (currentStartOfWeek <= endOfYear) {
      const currentEndOfWeek: Date = endOfWeek(currentStartOfWeek, { weekStartsOn: 1 });
      ranges.push({ start: currentStartOfWeek, end: currentEndOfWeek });
      currentStartOfWeek = addDays(currentEndOfWeek, 1);
    }

    return ranges;
  }
}

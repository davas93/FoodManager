import { Injectable } from '@angular/core';
import {addDays, endOfWeek, startOfWeek} from "date-fns";
import {GeneralMenu} from "../../models/general-menu.model";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import ruLocale from "@fullcalendar/core/locales/ru";

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

  public getWeekRangesForCurrentYear(): { start: Date, end: Date }[] {
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

  public getWeeksCalendarOptions(menu: GeneralMenu): CalendarOptions {
    const colors = ['#63A0EB', '#EB4F67', '#9BD366', '#F6C855', '#F4BCDB', '#96CFEB', '#F096A2', '#68A33A', '#D09433', '#B077B0', '#3567A4', '#DD6DA7', '#499E8D', '#EF8532'];
    const weekRanges = this.getWeekRangesForCurrentYear();

    const events = weekRanges.map((range, index) => ({
      title: `${menu.weeks[index % menu.weeks.length].displayName}`,
      start: range.start.toISOString().split('T')[0],
      end: addDays(range.end, 1).toISOString().split('T')[0],
      backgroundColor: colors[index % menu.weeks.length],
      borderColor: colors[index % menu.weeks.length]
    }));

    const calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: events,
      firstDay: 1,
      locale: ruLocale
    };

    return calendarOptions;
  }

  getCurrentDateWeekString(menu: GeneralMenu): string {
    const formattedDate: string = new Date().toLocaleDateString('ru', {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const currentWeek: string = this.getCurrentWeek(menu.weeks.length);
    const currentWeekDisplayName: string = menu.weeks.find(menu => menu.name === currentWeek).displayName;

    return `Сегодня ${formattedDate} ${currentWeekDisplayName}`
  }
}

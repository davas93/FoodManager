import { Pipe, PipeTransform } from '@angular/core';
import {SORTED_DAYS} from "../consts/weeks-vocabulary";
import {DailyMenu} from "../models/employee-menu.model";

@Pipe({
  name: 'sortDays',
})
export class SortDaysPipe implements PipeTransform {

  transform(keys: { key: keyof DailyMenu; value: DailyMenu[keyof DailyMenu] }[]): { key: keyof DailyMenu; value: DailyMenu[keyof DailyMenu] }[] {
    const sortedDays = keys.sort((a, b) => SORTED_DAYS.indexOf(a.key) - SORTED_DAYS.indexOf(b.key));

    const fffff = keys.map(ff => {
      return {
        key: ff.key,
        value: ff.value
      }
    })

    console.log(fffff)
    return sortedDays;
  }

}

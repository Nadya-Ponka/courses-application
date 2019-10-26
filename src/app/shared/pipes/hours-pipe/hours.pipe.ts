import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {
  public transform(value: number): string {
    if (value > 0 && value / 60 < 1) {
      return value + ' Minutes';

    } else {
      return Math.round(value / 60) + ' Hour(s) ' + (value % 60) + ' Minutes';
    }
  }
}

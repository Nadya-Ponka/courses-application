import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {
  public transform(value: number): string {
    if (value < 0) {
      return 0 + ' Minutes';
    } else if (value > 0 && value / 60 < 1) {
      return value + ' Minutes';
    } else {
      return Math.trunc(value / 60) + ' Hour(s) ' + (value % 60) + ' Minutes';
    }
  }
}

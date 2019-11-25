import { Directive, ElementRef, Input, HostBinding } from '@angular/core';
import * as moment from 'moment';

import { CourseItem } from '../../shared/models/course';

@Directive({
  selector: '[appBorder]'
})

export class BorderDirective {
  @HostBinding('style.border')
  public border: string;

  @Input()
  set item(value: CourseItem) {
    const daysDiff: number = moment().diff(moment(value.creationDate), 'days');
    if (daysDiff < 0) {
      this.border = '2px solid blue';
    } else if (daysDiff < 15) {
      this.border = '2px solid green';
    }
  }
}

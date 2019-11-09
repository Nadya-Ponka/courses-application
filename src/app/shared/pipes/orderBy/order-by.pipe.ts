import { Pipe, PipeTransform } from '@angular/core';

import { CourseItem } from './../../models/course';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: CourseItem[]): any {
    return value.sort((a, b) => (a.creationDate < b.creationDate) ? 1 : -1);
  }
}

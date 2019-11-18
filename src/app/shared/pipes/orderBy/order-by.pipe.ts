import { Pipe, PipeTransform } from '@angular/core';

import { CourseItem } from 'src/app/shared/models/course';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: CourseItem[], sortBy: string): any {
    return [...value].sort((a, b) => (a[sortBy] - b[sortBy]));
  }
}

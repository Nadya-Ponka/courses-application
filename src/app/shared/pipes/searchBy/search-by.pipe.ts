import { Pipe, PipeTransform } from '@angular/core';

import { CourseItem } from 'src/app/shared/models/course';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {
  transform(value: CourseItem[], text: string): CourseItem[] {
    if (!value) { return null; }
    if (!text) { return value; }

    text = text.toLowerCase();

    return value.filter((item) => JSON.stringify(item).toLowerCase().includes(text));
  }
}

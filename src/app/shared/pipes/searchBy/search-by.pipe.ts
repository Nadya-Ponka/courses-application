import { Pipe, PipeTransform } from '@angular/core';

import { CourseItem } from './../../models/course';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {
  transform(value: CourseItem[], text: string): CourseItem[] {
    if (!value) { return null; }
    if (!text) { return value; }

    text = text.toLowerCase();

    return value.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(text);
    });
  }

}

import { Component, OnInit } from '@angular/core';

import { CourseItem } from '../../shared/models/course';
import { initialCourses } from '../../shared/data/courses';
import { OrderByPipe } from './../../shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from './../../shared/pipes/searchBy/search-by.pipe';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  providers: [OrderByPipe, SearchByPipe],
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public courses: CourseItem[];
  constructor(
    private orderByPipe: OrderByPipe,
    private searchByPipe: SearchByPipe
  ) {}

  public onSearchText(text: string): string {
    console.log('Text for search: ', text);
    this.courses = this.searchByPipe.transform(initialCourses, text);
    return text;
  }

  public onDeleteCourse(event: CourseItem): CourseItem {
    console.log('Course to delete: ', event.id);
    this.courses = this.courses.filter(el => el.id !== event.id);
    return event;
  }

  public ngOnInit(): void {
    this.courses = this.orderByPipe.transform(initialCourses);
  }
}

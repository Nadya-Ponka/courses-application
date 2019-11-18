import { Component, OnInit } from '@angular/core';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesService } from 'src/app/courses/services/courses-service.service';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';

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
    private searchByPipe: SearchByPipe,
    private coursesService: CoursesService,
  ) {}

  public onSearchText(text: string): string {
    console.log('Text for search: ', text);
    this.courses = this.searchByPipe.transform(this.coursesService.getList(), text);
    return text;
  }

  public onDeleteCourse(event: CourseItem): CourseItem {
    console.log('Course to delete: ', event.id);
    if (confirm('Do you really want to delete this course? Yes/No')) {
      this.courses = this.coursesService.removeCourse(event);
    }
    return event;
  }

  public ngOnInit(): void {
    this.courses = this.orderByPipe.transform(this.coursesService.getList(), 'creationDate');
  }
}

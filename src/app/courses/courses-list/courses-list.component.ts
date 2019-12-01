import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesService } from 'src/app/courses/services/courses-service';
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
  public searchText: string;

  constructor(
    private orderByPipe: OrderByPipe,
    private router: Router,
    private searchByPipe: SearchByPipe,
    private coursesService: CoursesService
  ) {}

  public onSearchText(text: string): string {
    console.log('Text for search: ', text);
    this.courses = this.searchByPipe.transform(this.coursesService.getList(), text);
    return text;
  }

  public onDeleteCourse(event: CourseItem): CourseItem {
    if (confirm('Do you really want to delete this course? Yes/No')) {
      this.courses = this.coursesService.removeCourse(event);
    }
    return event;
  }

  public onCreateCourse() {
    const link = ['/courses/add'];
    this.router.navigate(link);
  }

  public onEditCourse(item: CourseItem) {
    const link = [`/courses/${item.id}`];
    this.router.navigate(link);
  }

  public ngOnInit(): void {
    this.courses = this.orderByPipe.transform(this.coursesService.getList(), 'creationDate');
  }
}

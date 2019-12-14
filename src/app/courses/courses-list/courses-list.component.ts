import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesObservableService } from 'src/app/courses/services/courses-observable.service';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  providers: [OrderByPipe, SearchByPipe],
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public searchText = '';
  public courses: CourseItem[];
  public courses$: CourseItem[];
  public coursesError$: Observable < Error | string > ;

  constructor(
    private orderByPipe: OrderByPipe,
    private router: Router,
    private searchByPipe: SearchByPipe,
    private coursesObservableService: CoursesObservableService
  ) {}

  public onSearchText(event: any) {
/* 		this.searchText = event.target.value; 
 */		console.log('EVENT: ', this.searchText);
		this.coursesObservableService.getFullList()
		.subscribe((courses: Array<CourseItem>) => {
			this.courses = this.searchByPipe.transform(courses, event.target.value);
		});
  }

  public onDeleteCourse(event: CourseItem) {
    if (confirm('Do you really want to delete this course? Yes/No')) {
      this.coursesObservableService.removeCourse(event, this.courses.length).subscribe(data => {
          this.courses = this.orderByPipe.transform(data, 'creationDate');
      });
    }
  }

  public onCreateCourse() {
    const link = ['/courses/add'];
    this.router.navigate(link);
  }

  public onEditCourse(item: CourseItem) {
    const link = [`/courses/${item.id}`];
    this.router.navigate(link);
  }

  public onShowMore(): void {
    this.coursesObservableService.getList(this.courses.length, 5, '').subscribe(data => {
      this.courses.push(...data);
    });
  }

  public ngOnInit(): void {
    this.coursesObservableService.getList(0, 5, '').subscribe(response => {
        this.courses = this.orderByPipe.transform(response, 'creationDate');
    });
  }
}

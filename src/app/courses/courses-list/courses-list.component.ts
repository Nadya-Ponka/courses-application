import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, selectCoursesData, selectCoursesError  } from 'src/app/@ngrx';

import { Observable, Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { CourseItem, ICourse } from 'src/app/shared/models/course';
import { CoursesPromiseService } from 'src/app/courses/services/courses-promise.service';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';
import { SpinnerService } from 'src/app/widgets';

import * as CoursesActions from 'src/app/@ngrx/courses-list/courses-list.actions';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  providers: [OrderByPipe, SearchByPipe],
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public searchText = '';
  public inputSearchText;
  public courses: CourseItem[];
  public courses$: Observable < ReadonlyArray < CourseItem >>;
  public coursesError$: Observable < Error | string > ;

  constructor(
    private orderByPipe: OrderByPipe,
    private router: Router,
    private searchByPipe: SearchByPipe,
    private coursesPromiseService: CoursesPromiseService,
		public spinnerService: SpinnerService,
		private store: Store < AppState >

  ) {}

  public onSearchText(event: any) {
    this.inputSearchText.next(event.target.value);
  }

  public onDeleteCourse(course: ICourse) {
    if (confirm('Do you really want to delete this course? Yes/No')) {
			const courseToDelete: ICourse = { ...course };
			this.store.dispatch(CoursesActions.deleteCourse({ course: courseToDelete }));
      };
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
/*     this.coursesPromiseService.getFullList().subscribe(data => {
      this.courses.push(...data);
      this.spinnerService.hide();
    });
 */  }

  public ngOnInit(): void {
		this.courses$ = this.store.pipe(select(selectCoursesData));
		console.log('this.courses$: ', this.courses$);
    this.coursesError$ = this.store.pipe(select(selectCoursesError));
		this.store.dispatch(CoursesActions.getCourses());
		
		this.inputSearchText = new Subject < string > ();
    this.inputSearchText.pipe(
      filter((val: string) => val.length >= 3),
      debounceTime(1000)
    ).subscribe({
      next: (text: string) => {
				this.store.dispatch(CoursesActions.getSearchedCourses({
          text: text
        }));
      }
    });

  }
}

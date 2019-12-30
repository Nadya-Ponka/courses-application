import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, selectSelectedCourse, CoursesState, selectCoursesState } from 'src/app/@ngrx';

import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesPromiseService } from 'src/app/courses/services/courses-promise.service';
import * as CoursesActions from 'src/app/@ngrx/courses-list/courses-list.actions';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit, OnDestroy {
  public item: CourseItem;
  private sub: Subscription;
  coursesState$: Observable < CoursesState > ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
		private coursesPromiseService: CoursesPromiseService,
		private store: Store < AppState >
  ) {}

  public onSaveItem() {
    // if (this.item.id === undefined) {
    //   this.item.id = Math.random() * 1000;
    //   this.sub = this.coursesObservableService.createCourse(this.item)
    //     .subscribe((elem: any) => {
    //       this.onGoBack();
    //     }),

    //     error => console.log(error);
    // } else {
    //   this.sub = this.coursesObservableService.updateCourse(this.item)
    //     .subscribe((elem: CourseItem) => {
    //       this.onGoBack();
    //     }),
    //     error => console.log(error);
		// }
		
		const course = { ...this.item } as CourseItem;

    if (course.id) {
      this.store.dispatch(CoursesActions.updateCourse({
        course
      }));
    } else {
      this.store.dispatch(CoursesActions.createCourse({
        course: course
      }));
    }

  }

  public onGoBack() {
    this.router.navigate(['/courses']);
  }

  public ngOnInit() {
    // this.item = new CourseItem(undefined, '', false, new Date(), 0, '', []);

    // let url = this.router.routerState.snapshot.url;
    // const navigatedForEdit = /\/courses\/add/.test(url);
    // let id: number;
    // if (!navigatedForEdit) {
    //   url = url.slice(9);
    //   id = +url;
    // }

    // // it is not necessary to save subscription to route.paramMap
    // // when router destroys this component, it handles subscriptions automatically
    // if (id !== undefined) {
    //   this.route.paramMap
    //     .pipe(
    //       switchMap((params: ParamMap) => {
    //         return this.coursesObservableService.getCourseByID(+params.get('id'));
    //       }))
    //     .subscribe(
    //       course => this.item = course,
    //       err => console.log(err)
    //     );
		// }
		
		this.coursesState$ = this.store.pipe(select(selectCoursesState));
    this.sub = this.coursesState$.subscribe(coursesState => {
      console.log('coursesState++++++: ', coursesState);
      if (coursesState.selectedCourse) {
        this.item = { ...coursesState.selectedCourse } as CourseItem;
      } else {
        this.item = new CourseItem(undefined, '', false, new Date(), 0, '', []);
      }
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('courseID');
      if (id) {
        this.store.dispatch(CoursesActions.getCourse({
          courseID: +id
        }));
      }
    });

  }

  public ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

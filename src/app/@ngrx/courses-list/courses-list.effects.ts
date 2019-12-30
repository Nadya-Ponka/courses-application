import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// rxjs
import { Observable } from 'rxjs';
import { concatMap, pluck, switchMap } from 'rxjs/operators';

import * as CoursesActions from './courses-list.actions';
import { CoursesPromiseService } from 'src/app/courses/services/courses-promise.service';
import { CourseItem, ICourse } from 'src/app/shared/models/course';

@Injectable()
export class CoursesEffects {

  constructor(
    private actions$: Actions,
    private coursesPromiseService: CoursesPromiseService,
    private router: Router
  ) {
    console.log('[COURSES EFFECTS]');
  }

  getCourses$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.getCourses),
      switchMap(action =>
        this.coursesPromiseService
        .getFullList()
        .then(courses => CoursesActions.getCoursesSuccess({
          courses
        }))
        .catch(error => CoursesActions.getCoursesError({
          error
        }))
      )
    )
  );

	getSearchedCourses$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
			ofType(CoursesActions.getSearchedCourses),
			pluck('text'),
      switchMap(text =>
        this.coursesPromiseService
        .getSearchedList(text)
        .then(courses => CoursesActions.getSearchedCoursesSuccess({
          courses
        }))
        .catch(error => CoursesActions.getSearchedCoursesError({
          error
        }))
      )
    )
	);
	
  getCourse$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.getCourse),
      pluck('courseID'),
      switchMap(courseID =>
        this.coursesPromiseService.getCourse(courseID)
        .then(course => CoursesActions.getCourseSuccess({
          course
        }))
        .catch(error => CoursesActions.getCourseError({
          error
        }))
      )
    )
  );

  updateCourse$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      pluck('course'),
      concatMap((course: CourseItem) =>
        this.coursesPromiseService.updateCourse(course)
        .then((updatedCourse: ICourse) => {
          console.log('updatedCourse: ', updatedCourse);
          this.router.navigate(['/courses']);
          return CoursesActions.updateCourseSuccess({
            course: updatedCourse
          });
        })
        .catch(error => CoursesActions.updateCourseError({
          error
        }))
      )
    )
  );

  createCourse$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      pluck('course'),
      concatMap((course: CourseItem) =>
        this.coursesPromiseService
        .createCourse(course)
        .then((createdCourse: ICourse) => {
          this.router.navigate(['/courses']);
          return CoursesActions.createCourseSuccess({
            course: createdCourse
          });
        })
        .catch(error => CoursesActions.createCourseError({
          error
        }))
      )
    )
  );

  deleteCourse$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      pluck('course'),
      concatMap((course: CourseItem) =>
        this.coursesPromiseService
        .removeCourse(course)
        .then(() => {
          return CoursesActions.deleteCourseSuccess({
            course
          });
        })
        .catch(error => CoursesActions.deleteCourseError({
          error
        }))
      )
    )
  );

}

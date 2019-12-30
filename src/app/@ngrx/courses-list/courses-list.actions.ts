import { createAction, props } from '@ngrx/store';

import { CourseItem, ICourse } from 'src/app/shared/models/course';

export const getCourses = createAction(
 '[Courses] GET_COURSES'
);

export const getCoursesSuccess = createAction(
  '[Courses] GET_COURSES_SUCCEESS',
  props<{ courses: CourseItem[] }>()
);
export const getCoursesError = createAction(
  '[Courses] GET_COURSE_ERROR',
  props<{ error: Error | string }>()
);

export const getSearchedCourses = createAction(
	'[Courses] GET_SEARCHED_COURSES',
	props<{ text: string }>()
 );
 
 export const getSearchedCoursesSuccess = createAction(
	 '[Courses] GET_SEARCHED_COURSES_SUCCEESS',
	 props<{ courses: CourseItem[] }>()
 );
 export const getSearchedCoursesError = createAction(
	 '[Courses] GET_SEARCHED_COURSE_ERROR',
	 props<{ error: Error | string }>()
 );

export const getCourse = createAction(
  '[Courses] GET_COURSE',
  props<{ courseID: number }>()
);

export const getCourseSuccess = createAction(
  '[Courses API] GET_COURSE_SUCCESS',
  props<{ course: any }>()
);

export const getCourseError = createAction(
  '[Courses API] GET_COURSE_ERROR',
  props<{ error: Error | string }>()
);

export const createCourse = createAction(
  '[Courses] CREATE_COURSE',
  props<{ course: CourseItem }>()
);

export const createCourseSuccess = createAction(
  '[Courses API] CREATE_COURSE_SUCCESS',
  props<{ course: CourseItem }>()
);

export const createCourseError = createAction(
  '[Courses API] CREATE_COURSE_ERROR',
  props<{ error: Error | string }>()
);

export const updateCourse = createAction(
  '[Courses] UPDATE_COURSE',
  props<{ course: CourseItem }>()
);

export const updateCourseSuccess = createAction(
  '[Courses API] UPDATE_COURSE_SUCCESS',
  props<{ course: CourseItem }>()
);

export const updateCourseError = createAction(
  '[Courses API] UPDATE_COURSE_ERROR',
  props<{ error: Error | string }>()
);

export const deleteCourse = createAction(
  '[Courses] DELETE_COURSE',
  props<{ course: ICourse }>()
);

export const deleteCourseSuccess = createAction(
  '[Courses API] DELETE_COURSE_SUCCESS',
  props<{ course: ICourse }>()
);

export const deleteCourseError = createAction(
  '[Courses API] DELETE_COURSE_ERROR',
  props<{ error: Error | string }>()
);

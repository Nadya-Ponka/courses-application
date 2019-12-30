import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router';

import { CoursesState } from 'src/app/@ngrx/courses-list/courses-list.state';
import { CourseItem } from 'src/app/shared/models/course';

export const selectCoursesState = createFeatureSelector < CoursesState > ('courses');
export const selectCoursesData = createSelector(selectCoursesState, (state: CoursesState) => state.data);
export const selectSelectedCourse = createSelector(selectCoursesState, (state: CoursesState) => state.selectedCourse);
export const selectCoursesError = createSelector(selectCoursesState, (state: CoursesState) => state.error);
export const selectCoursesLoaded = createSelector(selectCoursesState, (state: CoursesState) => state.loaded);
export const selectSelectedCourseByUrl = createSelector(
  selectCoursesData,
  selectRouterState,
  (courses, router): CourseItem => {
    const courseID = router.state.params.courseID;
    if (courseID && Array.isArray(courses)) {
      return courses.find(course => course.id === +courseID);
    } else {
      return new CourseItem(undefined, '', false, new Date(), 0, '', []);
    }
  });

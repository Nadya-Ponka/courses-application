import { Action, createReducer, on } from '@ngrx/store';

import { CoursesState, initialCoursesState } from './courses-list.state';
import * as CoursesActions from './courses-list.actions';
import { CourseItem } from 'src/app/shared/models/course';

const reducer = createReducer(
  initialCoursesState,
  on(CoursesActions.getCourses, state => {
    console.log('GET_COURSES action being handled!');
    return {
      ...state,
      loading: true
    };
	}),
	
  on(CoursesActions.getCoursesSuccess, (state, props) => {
    console.log('GET_COURSES_SUCCESS action being handled!');
		const data = props.courses.map((course: any) => new CourseItem(
			course.id,
			course.name,
			course.isTopRated,
			course.date,
			course.length,
			course.description,
			course.authors
		));
    return {
      ...state,
      data,
      loading: false,
      loaded: true
    };
  }),
  on(CoursesActions.getCoursesError, (state, props) => {
    console.log('GET_COURSES_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),

	on(CoursesActions.getSearchedCourses, state => {
    console.log('GET_SEARCHED_COURSES action being handled!');
    return {
      ...state,
      loading: true
    };
	}),
	
  on(CoursesActions.getSearchedCoursesSuccess, (state, props) => {
    console.log('GET_SEARCHED_COURSES_SUCCESS action being handled!');
		const data = props.courses.map((course: any) => new CourseItem(
			course.id,
			course.name,
			course.isTopRated,
			course.date,
			course.length,
			course.description,
			course.authors
		));
    return {
      ...state,
      data,
      loading: false,
      loaded: true
    };
  }),
  on(CoursesActions.getSearchedCoursesError, (state, props) => {
    console.log('GET_SEARCHED_COURSES_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
	}),
	
  on(CoursesActions.getCourse, state => {
    console.log('GET_COURSE action being handled!');
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),

  on(CoursesActions.getCourseSuccess, (state, props) => {
    console.log('GET_COURSE_SUCCESS action being handled!');
		console.log('SELECTED COURSE: ', props);
		
    const selectedCourse = {
			id: props.course.id,
			title: props.course.name,
			topRated: props.course.isTopRated,
			creationDate: props.course.date,
			duration: props.course.length,
			description: props.course.description,
			authors: props.course.authors
    };
    return {
      ...state,
      loading: false,
      loaded: true,
      selectedCourse
    };
  }),

  on(CoursesActions.getCourseError, (state, props) => {
    console.log('GET_COURSE_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),

  on(CoursesActions.createCourse, state => {
    console.log('CREATE_Course action being handled!');
    return {
      ...state
    };
  }),

  on(CoursesActions.createCourseSuccess, (state, props) => {
    console.log('CREATE_COURSE_SUCCESS action being handled!');
    const course = {
      ...props.course
    };
    const data = [...state.data, course];

    return {
      ...state,
      data
    };
  }),

  on(CoursesActions.createCourseError, (state, props) => {
    console.log('CREATE_COURSE_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      error
    };
  }),

  on(CoursesActions.updateCourse, state => {
    console.log('UPDATE_Course action being handled!');
    return {
      ...state
    };
  }),

  on(CoursesActions.updateCourseSuccess, (state, props) => {
    console.log('UPDATE_COURSE_SUCCESS action being handled!');
    const data = [...state.data];
    const course = props.course;

    const index = data.findIndex(t => t.id === course.id);

    data[index] = {
      ...course
    };

    return {
      ...state,
      data
    };
  }),

  on(CoursesActions.updateCourseError, (state, props) => {
    console.log('UPDATE_COURSE_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      error
    };
  }),
	
	on(CoursesActions.deleteCourse, state => {
    console.log('DELETE_COURSE action being handled!');
    return { ...state };
	}),
	
	on(CoursesActions.deleteCourseSuccess, (state, props) => {
    console.log('DELETE_COURSE_SUCCESS action being handled!');
    const data = state.data.filter(t => t.id !== props.course.id);

    return {
      ...state,
      data
    };
  }),
	on(CoursesActions.deleteCourseError, (state, props) => {
			console.log('DELETE_COURSE_ERROR action being handled!');
			const error = props.error;
			return {
				...state,
				error
			};
		}), 
	);

export function coursesReducer(state: CoursesState | undefined, action: Action) {
  return reducer(state, action);
}

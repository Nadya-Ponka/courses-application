import { ICourse } from 'src/app/shared/models/course';

export interface CoursesState {
  data: ReadonlyArray < ICourse > ;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
  selectedCourse: Readonly < ICourse > ;
}

export const initialCoursesState: CoursesState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
  selectedCourse: null
};

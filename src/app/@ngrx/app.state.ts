import { CoursesState } from './courses-list';
import { UsersState } from './admin';

export interface AppState {
	courses: CoursesState;
	users: UsersState;
}

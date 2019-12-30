import { Action, createReducer, on } from '@ngrx/store';

import { UsersState, initialUsersState } from './users.state';
import * as UsersActions from './users.actions';

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.checkUser, state => {
    console.log('CHECK_USER action being handled!');
    return {
      ...state,
      loading: true
    };
	}),
	
  on(UsersActions.checkUserSuccess, (state, props) => {
    console.log('CHECK_USER_SUCCESS action being handled!');
		const data = props.user;
    return {
      ...state,
      data,
      loading: false,
      loaded: true
    };
  }),
  on(UsersActions.checkUserError, (state, props) => {
    console.log('GET_COURSES_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UsersState } from 'src/app/@ngrx/admin/users.state';

export const selectUsersState = createFeatureSelector < UsersState > ('user');
export const selectUsersData = createSelector(selectUsersState, (state: UsersState) => state.data);
export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);
export const selectUsersLoaded = createSelector(selectUsersState, (state: UsersState) => state.loaded);

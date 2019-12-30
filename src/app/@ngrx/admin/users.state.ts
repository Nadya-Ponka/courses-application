import { IUser } from 'src/app/shared/models/user';

export interface UsersState {
  data: IUser ;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
  selectedUser: IUser ;
}

export const initialUsersState: UsersState = {
  data: null,
  loading: false,
  loaded: false,
  error: null,
  selectedUser: null
};

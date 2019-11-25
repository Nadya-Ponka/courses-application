export interface IUser {
  id: number;
  firstName: string;
	lastName: string;
	email: string;
	login: string;
	password: string;
	/* faketoken */
}

export class UserItem implements IUser {
  constructor(
    public id: number,
    public firstName: string = '',
		public lastName: string = '',
		public email: string = '',
		public login: string = '',
    public password: string = '',
  ) {}
}

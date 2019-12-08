export interface IUser {
  id: number;
  token: string;
  name: {
    firstName: string,
    lastName: string
  };
  login: string;
  password: string;
}

export class UserItem implements IUser {
  constructor(
    public id: number,
    public token: string,
    public name: {
      firstName: string,
      lastName: string
    },
    public login: string = '',
    public password: string = '',
  ) {}
}

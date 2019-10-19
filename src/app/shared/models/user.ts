export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export class UserItem implements User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
  ) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
  }
}

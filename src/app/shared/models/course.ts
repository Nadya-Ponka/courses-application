export interface ICourse {
  id: number;
  title: string;
  topRated: boolean;
  creationDate: Date;
  duration: number;
  description: string;
}

export class CourseItem implements ICourse {
  constructor(
    public id: number,
    public title: string,
    public topRated: boolean,
    public creationDate: Date,
    public duration: number,
    public description: string,
  ) {}
}

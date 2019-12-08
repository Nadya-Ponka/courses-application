import { Injectable } from '@angular/core';

import { CourseItem } from 'src/app/shared/models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor() {}

  private courseList: CourseItem[] = [];

  setList(array: CourseItem[]) {
    this.courseList = [...array];
  }

  getList(): CourseItem[] {
    return this.courseList;
  }

  getCourseByID(id: number | string): CourseItem {
    return this.getList().find(course => course.id === +id);
  }

  createCourse(course: CourseItem): void {
    this.courseList.push(course);
  }

  updateCourse(course: CourseItem): CourseItem[] {
    const i = this.courseList.findIndex(t => t.id === course.id);
    this.courseList.splice(i, 1, course);
    return this.courseList;
  }

  removeCourse(course: CourseItem): CourseItem[] {
    this.courseList = this.courseList.filter(item => item.id !== course.id);
    return this.courseList;
  }
}

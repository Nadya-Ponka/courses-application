import { Component, OnInit } from '@angular/core';

import { CourseItem } from '../../shared/models/course';
import { initialCourses } from '../../shared/data/courses';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public courses: CourseItem[];
  constructor() {}

  public onSearchText(text: string): string {
    console.log('Text for search: ', text);
    return text;
  }

  public onDeleteCourse(event: CourseItem): CourseItem {
    console.log('Course to delete: ', event.id);
    return event;
  }

  public ngOnInit(): void {
    this.courses = initialCourses;
  }

}

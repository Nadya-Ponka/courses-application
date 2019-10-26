import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { HoursPipe } from './../shared/pipes/hours-pipe/hours.pipe';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseComponent,
    HoursPipe
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    CoursesListComponent
  ]
})
export class CoursesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { HoursPipe } from './../shared/pipes/hours-pipe/hours.pipe';
import { BorderDirective } from './../shared/directives/border.directive';
import { OrderByPipe } from './../shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from './../shared/pipes/searchBy/search-by.pipe';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseComponent,
    HoursPipe,
    BorderDirective,
    OrderByPipe,
    SearchByPipe
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    CoursesListComponent
  ]
})
export class CoursesModule {}

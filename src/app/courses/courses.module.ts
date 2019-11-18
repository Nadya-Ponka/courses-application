import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesListComponent } from 'src/app/courses/courses-list/courses-list.component';
import { CourseComponent } from 'src/app/courses/course/course.component';
import { HoursPipe } from 'src/app/shared/pipes/hours-pipe/hours.pipe';
import { BorderDirective } from 'src/app/shared/directives/border.directive';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';

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

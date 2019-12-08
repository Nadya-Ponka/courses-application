import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesListComponent } from 'src/app/courses/courses-list/courses-list.component';
import { CourseComponent } from 'src/app/courses/course/course.component';
import { HoursPipe } from 'src/app/shared/pipes/hours-pipe/hours.pipe';
import { BorderDirective } from 'src/app/shared/directives/border.directive';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';
import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesAPIProvider } from 'src/app/courses/services/courses.config';
import { CoursesObservableService } from './services/courses-observable.service';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseComponent,
    HoursPipe,
    BorderDirective,
    OrderByPipe,
    SearchByPipe,
    CourseFormComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    CoursesListComponent
  ],
  providers: [
    CoursesAPIProvider, CoursesObservableService
  ]
})
export class CoursesModule {}

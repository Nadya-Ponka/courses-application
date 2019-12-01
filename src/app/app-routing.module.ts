import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from 'src/app/admin/admin.component';
import { AuthGuard } from './admin/guards/auth.guard';
import { CoursesListComponent } from 'src/app/courses/courses-list/courses-list.component';
import { CourseFormComponent } from 'src/app/courses/course-form/course-form.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [{
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    component: CoursesListComponent
  },
  {
    path: 'courses/add',
    canActivate: [AuthGuard],
    component: CourseFormComponent
  },
  {
    path: 'courses/:id',
    canActivate: [AuthGuard],
    component: CourseFormComponent
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminComponent
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

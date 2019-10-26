import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { LogoComponent } from './header/logo/logo.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';

import { CoursesModule } from './courses/courses.module';

const appRoutes: Routes = [{
    path: '',
    component: CoursesListComponent
  },
  // { path: 'scaled/:id', component: ScaledItemComponent },
  {
    path: 'scaled/:id/**',
    redirectTo: '**',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumbsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule, FormsModule, CoursesModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

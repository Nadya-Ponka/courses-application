import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AdminModule } from 'src/app/admin/admin.module';
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BreadcrumbsComponent } from 'src/app/breadcrumbs/breadcrumbs.component';
import { CoursesModule } from 'src/app/courses/courses.module';
import { FooterComponent } from 'src/app/footer/footer.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { LogoComponent } from 'src/app/header/logo/logo.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { RootStoreModule } from 'src/app/@ngrx/root-store.module';
import { RouterLinkStubDirective } from 'src/app/testing-helpers/router-stubs';
import { RouterOutletStubComponent } from 'src/app/testing-helpers/router-stubs';
import { SpinnerModule } from 'src/app/widgets/spinner/spinner.module';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    LogoComponent,
		PageNotFoundComponent,
    RouterLinkStubDirective,
    RouterOutletStubComponent,
  ],
  imports: [AdminModule, BrowserModule, CoursesModule, FormsModule, HttpClientModule, RootStoreModule, SpinnerModule.forRoot(), AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(readonly router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

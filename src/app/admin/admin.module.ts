import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from 'src/app/admin/interceptors/index';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule, FormsModule, HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class AdminModule {}

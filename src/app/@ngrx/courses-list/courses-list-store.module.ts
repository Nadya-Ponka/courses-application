import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @NgRx
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from './courses-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './courses-list.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('courses', coursesReducer),
    EffectsModule.forFeature([CoursesEffects])
  ]
})
export class CoursesStoreModule {}

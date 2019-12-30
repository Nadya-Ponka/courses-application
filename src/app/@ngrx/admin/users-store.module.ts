import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @NgRx
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './users.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class UsersStoreModule {}

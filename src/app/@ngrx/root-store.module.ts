import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { routerReducers, CustomSerializer } from './router';

// @NgRx
import { StoreModule } from '@ngrx/store';
import { CoursesStoreModule } from './courses-list/courses-list-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { metaReducers } from './meta-reducers';
import { UsersStoreModule } from './admin/users-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        // router state is not serializable
        // set false if you don't use CustomSerializer
        strictStateSerializability: true,
        // router action is not serializable
        // set false
        strictActionSerializability: false
      }
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
      // serializer: CustomSerializer // has a priority over routerState
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    !environment.production ? StoreDevtoolsModule.instrument() : [],
		CoursesStoreModule,
		UsersStoreModule
  ]
})
export class RootStoreModule {}

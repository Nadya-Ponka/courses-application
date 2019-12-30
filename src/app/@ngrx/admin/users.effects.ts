import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// rxjs
import { Observable } from 'rxjs';
import { concatMap, map, pluck, switchMap } from 'rxjs/operators';

import * as UsersActions from './users.actions';
import { AuthService } from 'src/app/admin/services/auth-service.service';
import { UserItem, IUser } from 'src/app/shared/models/user';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
    console.log('[USERS EFFECTS]');
  }

  checkUser$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
			ofType(UsersActions.checkUser),
			pluck('user'),
      switchMap(action =>
        this.authService
        .login(action)
        .then(user => UsersActions.checkUserSuccess({
          user
        }))
        .catch(error => UsersActions.checkUserError({
          error
        }))
      )
    )
  );
}

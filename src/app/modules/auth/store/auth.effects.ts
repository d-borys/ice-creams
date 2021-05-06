import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {login, loginFailed, loginSuccess, logout, logoutSuccess} from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from 'core/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router){}
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap((action) => {
        const {email, password} = action;
        return this.authService.login({email, password}).pipe(
          map((user) => {
            return loginSuccess({user});
          }),
          tap((act) => {
            localStorage.setItem('user', JSON.stringify(act.user));
            this.router.navigateByUrl('/icecreams/orders');
          }),
          catchError((error) => {
            return of(loginFailed({message: error}));
          })
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            return logoutSuccess();
          }),
          tap(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
          }),
        );
      })
    );
  });
}

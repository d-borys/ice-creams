import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers/app.reducer';
import {selectCurrentUser} from '../../modules/auth/store/auth.selectors';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanLoad {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  canLoad(route: Route): Observable<boolean> {
    return this.store.select(selectCurrentUser).pipe(
      map((currentUser) => !!currentUser),
      tap(currentUser => {
        if (!currentUser) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}

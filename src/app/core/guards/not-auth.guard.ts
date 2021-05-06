import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers/app.reducer';
import {selectCurrentUser} from '../../modules/auth/store/auth.selectors';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotAuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectCurrentUser).pipe(
      map((currentUser) => !currentUser),
      tap(isAllowed => {
        if (!isAllowed) {
          this.router.navigate(['orders/list']);
        }
      })
    );
  }
}

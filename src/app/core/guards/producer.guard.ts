import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../reducers/app.reducer';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../modules/auth/store/auth.selectors';
import {map, tap} from 'rxjs/operators';
import {UserRoles} from '../../modules/models/enum/user-roles';

@Injectable({providedIn: 'root'})
export class ProducerGuard implements CanLoad {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  canLoad(route: Route): Observable<boolean> {
    return this.store.select(selectCurrentUser).pipe(
      map(user => user.role === UserRoles.PRODUCER),
      tap(isProducer => {
        if (!isProducer) {
          this.router.navigate(['icecreams/orders']);
        }
      })
    );
  }
}

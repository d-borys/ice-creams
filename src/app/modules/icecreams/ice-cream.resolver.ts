import {IceCream} from '../models/ice-cream';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../../core/reducers/app.reducer';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {selectAreIceCreamsLoaded} from '../shared/store/ice-cream/ice-cream.selectors';
import {fetchIceCreams} from '../shared/store/ice-cream/ice-cream.actions';

@Injectable()
export class IceCreamResolver implements Resolve<IceCream[]> {
  constructor(private store: Store<AppState>){}
  resolve(): Observable<any> {
    return this.store.pipe(
      select(selectAreIceCreamsLoaded),
      tap((iceCreamsLoaded) => {
        if (!iceCreamsLoaded) {
          return this.store.dispatch(fetchIceCreams());
        }
      }),
      filter(iceCreamsLoaded => iceCreamsLoaded),
      first()
    );
  }
}

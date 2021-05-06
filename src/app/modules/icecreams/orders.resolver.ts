import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../../core/reducers/app.reducer';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Customer} from '../models/customer';
import {selectAreOrdersLoaded} from '../shared/store/ice-cream/ice-cream.selectors';
import {fetchOrders} from '../shared/store/ice-cream/ice-cream.actions';
import {showLoading} from 'shared/store/ui/ui.actions';

@Injectable()
export class OrdersResolver implements Resolve<Customer[]> {
  constructor(private store: Store<AppState>){}
  resolve(): Observable<any> {
    return this.store.pipe(
      select(selectAreOrdersLoaded),
      tap((ordersLoaded) => {
        if (!ordersLoaded) {
          this.store.dispatch(showLoading());
          return this.store.dispatch(fetchOrders());
        }
      }),
      filter(ordersLoaded => ordersLoaded),
      first()
    );
  }
}

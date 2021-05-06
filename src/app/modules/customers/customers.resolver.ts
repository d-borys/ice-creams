import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../../core/reducers/app.reducer';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Customer} from '../models/customer';
import {fetchCustomers} from '../shared/store/customers/customers.actions';
import {selectAreCustomersLoaded} from '../shared/store/customers/customers.selectors';

@Injectable()
export class CustomersResolver implements Resolve<Customer[]> {
  constructor(private store: Store<AppState>){}
  resolve(): Observable<any> {
    return this.store.pipe(
      select(selectAreCustomersLoaded),
      tap((customersLoaded) => {
        if (!customersLoaded) {
          return this.store.dispatch(fetchCustomers());
        }
      }),
      filter(customersLoaded => customersLoaded),
      first()
    );
  }
}

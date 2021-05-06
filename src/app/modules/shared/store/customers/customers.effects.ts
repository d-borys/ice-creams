import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  addNewCustomer,
  addNewCustomerFailed,
  addNewCustomerSuccess,
  fetchCustomers,
  fetchCustomersFailed,
  fetchCustomersSuccess
} from './customers.actions';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {CustomerService} from '../../../../core/services/customer.service';
import {showLoading, showMessage} from '../ui/ui.actions';
import {AppState} from '../../../../core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {selectAreCustomersLoaded} from './customers.selectors';

@Injectable()
export class CustomersEffects {
  constructor(private actions$: Actions, private customerService: CustomerService, private store: Store<AppState>) {
  }

  fetchCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCustomers),
      withLatestFrom(this.store.select(selectAreCustomersLoaded)),
      filter(([action, areCustomersLoaded]) => !areCustomersLoaded),
      switchMap(() => {
        this.store.dispatch(showLoading());
        return this.customerService.getCustomers().pipe(
          map((customers) => {
            return fetchCustomersSuccess({customers});
          }),
          catchError((error) => {
            return of(fetchCustomersFailed({message: error}));
          })
        );
      })
    );
  });

  addCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addNewCustomer),
      switchMap(({customer}) => {
        return this.customerService.createCustomer(customer).pipe(
          map((newCustomer) => {
            this.store.dispatch(showMessage({message: 'New customer added!'}));
            return addNewCustomerSuccess({customer: newCustomer});
          }),
          catchError((error) => {
            return of(addNewCustomerFailed({message: error}));
          })
        );
      }));
  });

}

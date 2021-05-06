import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {delay, map} from 'rxjs/operators';
import {hideError, hideLoading, showLoading, showMessage} from './ui.actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import {login, loginFailed, loginSuccess} from '../../../auth/store/auth.actions';
import {
  createNewOrder,
  createNewOrderFailed,
  createNewOrderSuccess,
  createOrderFromFavoriteFailed,
  createOrderFromFavoriteSuccess,
  fetchIceCreamsFailed,
  fetchIceCreamsSuccess,
  fetchOrdersFailed,
  fetchOrdersSuccess, setFavoriteIceCreams, setFavoriteIceCreamsFailed, setFavoriteIceCreamsSuccess
} from '../ice-cream/ice-cream.actions';
import {
  addNewCustomer,
  addNewCustomerFailed,
  addNewCustomerSuccess,
  fetchCustomersFailed,
  fetchCustomersSuccess
} from '../customers/customers.actions';
import {addNewUnit, addNewUnitFailed, addNewUnitSuccess, fetchUnitsFailed, fetchUnitsSuccess} from '../units/units.actions';

const showLoadingActions = [
  addNewUnit,
  addNewCustomer,
  createNewOrder,
  login,
  setFavoriteIceCreams,
];

const hideLoadingActions = [
  fetchOrdersSuccess,
  fetchOrdersFailed,
  fetchIceCreamsSuccess,
  fetchIceCreamsFailed,
  fetchUnitsSuccess,
  fetchUnitsFailed,
  fetchCustomersSuccess,
  fetchCustomersFailed,
  loginSuccess,
  loginFailed,
  createNewOrderFailed,
  createNewOrderSuccess,
  addNewUnitFailed,
  addNewUnitSuccess,
  addNewCustomerFailed,
  addNewCustomerSuccess,
  createOrderFromFavoriteSuccess,
  createOrderFromFavoriteFailed,
  setFavoriteIceCreamsFailed,
  setFavoriteIceCreamsSuccess,
];

const errorActions = [
  fetchOrdersFailed,
  fetchIceCreamsFailed,
  fetchUnitsFailed,
  fetchCustomersFailed,
  loginFailed
];

@Injectable()
export class UiEffects {
  constructor(
    private actions$: Actions,
    private matSnackBar: MatSnackBar
  ) {
  }


  showLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...showLoadingActions),
      map(() => showLoading())
    );
  });

  hideLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...hideLoadingActions),
      map(() => hideLoading())
    );
  });

  showError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...errorActions),
      map(({message}) => {
        return this.matSnackBar.open(message, 'Close');
      }),
      delay(5000),
      map(() => hideError())
    );
  });

  hideError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(hideError),
      map(() => this.matSnackBar.dismiss())
    );
  }, {dispatch: false});

  showMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(showMessage),
      map(({message}) => {
        return this.matSnackBar.open(message, null, {panelClass: 'mat-snack-success'});
      }),
      delay(5000),
      map(() => hideError())
    );
  });



}

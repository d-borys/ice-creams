import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  addNewIceCream,
  addNewIceCreamFailed,
  addNewIceCreamSuccess,
  createNewOrder,
  createOrderFromFavorite,
  createOrderFromFavoriteFailed,
  createOrderFromFavoriteSuccess,
  fetchIceCreams,
  fetchIceCreamsFailed,
  fetchIceCreamsSuccess,
  fetchOrders,
  fetchOrdersFailed,
  fetchOrdersSuccess,
  setFavoriteIceCreams,
  setFavoriteIceCreamsFailed,
  setFavoriteIceCreamsSuccess
} from './ice-cream.actions';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {selectAreIceCreamsLoaded, selectAreOrdersLoaded} from './ice-cream.selectors';
import {AppState} from '../../../../core/reducers/app.reducer';
import {OrderService} from '../../../../core/services/order.service';
import {IceCreamService} from '../../../../core/services/ice-cream.service';
import {selectCurrentUser} from '../../../auth/store/auth.selectors';
import {showLoading, showMessage} from '../ui/ui.actions';


@Injectable()
export class IceCreamEffects {
  constructor(
    private actions$: Actions, private iceCreamService: IceCreamService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private orderService: OrderService
  ) {
  }

  fetchIceCreams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchIceCreams),
      withLatestFrom(this.store.select(selectAreIceCreamsLoaded)),
      filter(([action, iceCreamsLoaded]) => !iceCreamsLoaded),
      switchMap(() => {
        this.store.dispatch(showLoading());
        return this.iceCreamService.getIceCreams().pipe(
          map((iceCreams) => {
            return fetchIceCreamsSuccess({iceCreams});
          }),
          catchError((error) => {
            return of(fetchIceCreamsFailed({message: error}));
          })
        );
      }),
    );
  });

  addIceCream$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addNewIceCream),
      switchMap(({iceCream}) => {
        return this.iceCreamService.createIceCream(iceCream).pipe(
          map((newIceCream) => {
            this.store.dispatch(showMessage({message: 'New ice cream added!'}));
            return addNewIceCreamSuccess({iceCream: newIceCream});
          }),
          catchError((error) => {
            return of(addNewIceCreamFailed({message: error}));
          })
        );
      }));
  });

  setFavoriteIceCreams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setFavoriteIceCreams),
      switchMap(({iceCreamIds}) => {
        this.store.dispatch(showLoading());
        return this.iceCreamService.setFavoriteIceCreams(iceCreamIds).pipe(
          map((newAddedIceCreams) => {
              this.store.dispatch(showMessage({message: 'Favorites selected!'}));
              return setFavoriteIceCreamsSuccess({iceCreams: newAddedIceCreams});
            }
          ),
          catchError((err) => of(setFavoriteIceCreamsFailed({message: err})))
        );
      })
    );
  });

  fetchOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOrders),
      withLatestFrom(this.store.select(selectAreOrdersLoaded)),
      filter(([action, areOrdersLoaded]) => !areOrdersLoaded),
      withLatestFrom(this.store.select(selectCurrentUser)),
      switchMap(([action, {id}]) => {
        return this.orderService.getOrders(id).pipe(
          tap(() => showLoading()),
          map((orders) => {
            return fetchOrdersSuccess({orders});
          }),
          catchError((error) => {
            return of(fetchOrdersFailed({message: error}));
          })
        );
      })
    );
  });

  createOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        createNewOrder,
        createOrderFromFavorite
      ),
      switchMap(({order}) => {
        return this.orderService.createNewOrder(order).pipe(
          map((newOrder) => {
            this.store.dispatch(showMessage({message: 'Order was created!'}));
            return createOrderFromFavoriteSuccess({order: newOrder});
          }),
          catchError((error) => {
            return of(createOrderFromFavoriteFailed({message: error}));
          })
        );
      })
    );
  });
}

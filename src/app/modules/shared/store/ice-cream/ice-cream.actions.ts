import {createAction, props} from '@ngrx/store';
import {IceCream} from '../../../models/ice-cream';
import {Order} from '../../../models/order';

export const fetchIceCreams = createAction(
  '[Ice Cream Resolver] Fetch Ice Creams'
);

export const fetchIceCreamsSuccess = createAction(
  '[Ice Cream Effect] Fetch Ice Creams Success',
  props<{iceCreams: IceCream[]}>()
);

export const fetchIceCreamsFailed = createAction(
  '[Ice Cream Effect] Fetch Ice Creams Failed',
  props<{message: string}>()
);

export const addNewIceCream = createAction(
  '[Ice Cream List] Add New Ice Cream',
  props<{iceCream: IceCream}>()
);

export const addNewIceCreamSuccess = createAction(
  '[Ice Cream Effect] Add New Ice Cream Sucess',
  props<{iceCream: IceCream}>()
);

export const addNewIceCreamFailed = createAction(
  '[Ice Cream Effect] Add New Ice Cream Fail',
  props<{message: string}>()
);

export const fetchFavoriteIceCreamsForUser = createAction(
  '[Ice Cream Favorites] Fetch Favorite Ice Creams For User'
);

export const fetchFavoriteIceCreamsForUserSuccess = createAction(
  '[Ice Cream Effect] Fetch Favorite Ice Creams For User Success',
  props<{iceCreams: IceCream[]}>()
);

export const fetchFavoriteIceCreamsForUserFailed = createAction(
  '[Ice Cream Favorites] Fetch Favorite Ice Creams For User',
  props<{message: string}>()
);

export const setFavoriteIceCreams = createAction(
  '[Ice Cream Effects] Select Favorite Ice Cream',
  props<{iceCreamIds: number[]}>()
);

export const setFavoriteIceCreamsSuccess = createAction(
  '[Ice Cream Effects] Select Favorite Ice Cream Success',
  props<{iceCreams: IceCream[]}>()
);

export const setFavoriteIceCreamsFailed = createAction(
  '[Ice Cream Effects] Select Favorite Ice Cream Failed',
  props<{message: string}>()
);

export const fetchIceCreamsBeforeOpeningDialogSuccess = createAction(
  '[Ice Cream Effects] Fetch Ice Creams Before Opening Dialog Success',
  props<{iceCreams: IceCream[]}>()
);

export const createOrderFromFavorite = createAction(
  '[Favorites View] Create Order From Favorite',
  props<{order: Order}>()
);

export const createOrderFromFavoriteSuccess = createAction(
  '[Ice Cream Effects] Create Order From Favorite Success',
  props<{order: Order}>()
);

export const createOrderFromFavoriteFailed = createAction(
  '[Ice Cream Effects] Create Order From Favorite Failed',
  props<{message: string}>()
);


export const fetchOrders = createAction(
  '[Order Resolver] Fetch Orders'
);

export const fetchOrdersSuccess = createAction(
  '[Order Effect] Fetch Orders Success',
  props<{orders: Order[]}>()
);

export const fetchOrdersFailed = createAction(
  '[Order Effect] Fetch Orders Failed',
  props<{message: string}>()
);

export const createNewOrder = createAction(
  '[Order List] Create New Order',
  props<{order: Order}>()
);

export const createNewOrderSuccess = createAction(
  '[Order Effect] Create New Order Sucess',
  props<{order: Order}>()
);

export const createNewOrderFailed = createAction(
  '[Order Effect] Create New Order Fail',
  props<{message: string}>()
);






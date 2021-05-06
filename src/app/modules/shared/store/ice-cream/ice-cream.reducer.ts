import {Action, createReducer, on} from '@ngrx/store';
import {
  addNewIceCreamSuccess,
  createNewOrderSuccess, createOrderFromFavoriteSuccess,
  fetchIceCreamsBeforeOpeningDialogSuccess,
  fetchIceCreamsSuccess,
  fetchOrdersSuccess,
  setFavoriteIceCreamsSuccess
} from './ice-cream.actions';
import {IceCream} from '../../../models/ice-cream';
import {Order} from '../../../models/order';

export const ordersIceCreamFeatureKey = 'orders-ice-cream';

export interface OrdersIceCreamState {
  iceCreams: IceCream[];
  orders: Order[];
  allIceCreamsLoaded: boolean;
  allOrdersLoaded: boolean;
}

// INITIAL SHARED STATE

const initialOrdersIceCreamState: OrdersIceCreamState = {
  iceCreams: [],
  orders: [],
  allIceCreamsLoaded: false,
  allOrdersLoaded: false
};


const reducer = createReducer(initialOrdersIceCreamState,
  on(fetchIceCreamsBeforeOpeningDialogSuccess,
    setFavoriteIceCreamsSuccess,
    fetchIceCreamsSuccess, (state, {iceCreams}) => {
      return {
        ...state,
        iceCreams,
        allIceCreamsLoaded: true
      }
    }),
  on(addNewIceCreamSuccess, (state, {iceCream}) => {
    return {
      ...state,
      iceCreams: [...state.iceCreams, iceCream]
    }
  }),
  on(fetchOrdersSuccess, (state, {orders}) => {
    return {
      ...state,
      orders,
      allOrdersLoaded: true
    }
  }),
  on(createOrderFromFavoriteSuccess, createNewOrderSuccess,
    (state, {order}) => {
    return {
      ...state,
      orders: [...state.orders, order]
    }
  }),
)


export function ordersIceCreamReducer(state: OrdersIceCreamState, action: Action): OrdersIceCreamState {
  return reducer(state, action);
}



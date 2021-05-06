import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ordersIceCreamFeatureKey, OrdersIceCreamState} from './ice-cream.reducer';
import {sharedFeatureKey, SharedState} from '../shared.reducer';


const sharedState = createFeatureSelector<SharedState>(sharedFeatureKey);

const ordersIceCreamState = createSelector(
  sharedState,
  (state) => state.ordersIceCreams
);

export const selectAllIceCreams = createSelector(
  ordersIceCreamState,
  (state) => state.iceCreams
);

export const selectAreIceCreamsLoaded = createSelector(
  ordersIceCreamState,
  (state) => state.allIceCreamsLoaded
);

export const selectFavoriteIceCreams = createSelector(
  selectAllIceCreams,
  (iceCreams) => iceCreams.filter(ic => ic.favorite)
);

export const selectAllOrders = createSelector(
  ordersIceCreamState,
  (state) => state.orders
);

export const selectAreOrdersLoaded = createSelector(
  ordersIceCreamState,
  (state) => state.allOrdersLoaded
);

export const selectOrderCustomers = createSelector(
  selectAllOrders,
  (orders) => orders.map(order => order.customer)
);

export const selectOrdersForCustomer = createSelector(
  selectAllOrders,
  (orders, props) => {
    return orders.filter((order) => order.customer.name === props.name);
  }
);


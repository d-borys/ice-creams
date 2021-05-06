import {combineReducers} from '@ngrx/store';
import {unitsReducer, UnitState} from './units/units.reducer';
import {ordersIceCreamReducer, OrdersIceCreamState} from './ice-cream/ice-cream.reducer';
import {uiReducer, UIState} from './ui/ui.reducer';
import {customersReducer, CustomersState} from './customers/customers.reducer';

export const sharedFeatureKey = 'shared';

export interface SharedState {
  units: UnitState;
  UI: UIState;
  ordersIceCreams: OrdersIceCreamState;
  customers: CustomersState;
};

export const reducers = combineReducers({
  units: unitsReducer,
  ordersIceCreams: ordersIceCreamReducer,
  customers: customersReducer,
  UI: uiReducer
});

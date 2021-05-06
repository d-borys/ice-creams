import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCustomersState from './customers.reducer';
import {sharedFeatureKey, SharedState} from '../shared.reducer';


const sharedState = createFeatureSelector<SharedState>(sharedFeatureKey);
const customerState = createSelector(
  sharedState,
  (state) => state.customers
);

export const selectAllCustomers = createSelector(
  customerState,
  fromCustomersState.selectAll
);

export const selectAreCustomersLoaded = createSelector(
  customerState,
  (state) => state.allCustomersLoaded
);

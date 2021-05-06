import {Action, createReducer, on} from '@ngrx/store';
import {addNewCustomerSuccess, fetchCustomersSuccess} from './customers.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Customer} from '../../../models/customer';

export const customerFeatureKey = 'customers';

export interface CustomersState extends EntityState<Customer> {
  allCustomersLoaded: boolean;
}

export const customersAdapter = createEntityAdapter<Customer>();

const initialCustomersState = customersAdapter.getInitialState({
  allCustomersLoaded: false
});

const reducer = createReducer(initialCustomersState,
  on(fetchCustomersSuccess, (state, {customers}) => {
    return customersAdapter.setAll(
      customers,
      {
        ...state,
        allCustomersLoaded: true
      }
    );
  }),
  on(addNewCustomerSuccess, (state, {customer}) => {
    return customersAdapter.addOne(
      customer,
      {...state}
    );
  })
);

export function customersReducer(state: CustomersState, action: Action): CustomersState {
  return reducer(state, action);
}

export const {
  selectAll
} = customersAdapter.getSelectors();



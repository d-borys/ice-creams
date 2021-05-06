import {createAction, props} from '@ngrx/store';
import {Customer} from '../../../models/customer';

export const fetchCustomers = createAction(
  '[Customer Resolver] Fetch Customers'
);

export const fetchCustomersSuccess = createAction(
  '[Customer Effect] Fetch Customers Success',
  props<{customers: Customer[]}>()
);

export const fetchCustomersFailed = createAction(
  '[Customer Effect] Fetch Customers Failed',
  props<{message: string}>()
);

export const addNewCustomer = createAction(
  '[Customer List] Add New Customer',
  props<{customer: Customer}>()
);

export const addNewCustomerSuccess = createAction(
  '[Customer Effect] Add New Customer Sucess',
  props<{customer: Customer}>()
);

export const addNewCustomerFailed = createAction(
  '[Customer Effect] Add New Customer Fail',
  props<{message: string}>()
);



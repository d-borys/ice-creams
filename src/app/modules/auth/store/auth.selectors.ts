import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from './auth.reducer';
import {UserRoles} from '../../models/enum/user-roles';

const authFeatureState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectCurrentUser = createSelector(
  authFeatureState,
  (state) => state.user
);

export const selectAssginedUnit = createSelector(
  selectCurrentUser,
  (user) => user?.unit
);

export const selectIsProducer = createSelector(
  selectCurrentUser,
  (user) => user?.role === UserRoles.PRODUCER
);

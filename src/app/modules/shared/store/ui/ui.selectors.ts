import {createFeatureSelector, createSelector} from '@ngrx/store';
import {sharedFeatureKey, SharedState} from '../shared.reducer';

const sharedSelector = createFeatureSelector<SharedState>(sharedFeatureKey);

const uiState = createSelector(sharedSelector,
  state => state.UI);

export const selectIsLoading = createSelector(
  uiState,
  (state) => state.isLoading
);

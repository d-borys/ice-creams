import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUnitsState from './units.reducer';
import {SharedState} from '../shared.reducer';


const sharedState = createFeatureSelector<SharedState>('shared');
const selectUnitState = createSelector(
  sharedState,
  state => state.units
);

export const selectAllUnits = createSelector(
  selectUnitState,
  fromUnitsState.selectAll
);

export const selectAreUnitsLoaded = createSelector(
  selectUnitState,
  (state) => state.allUnitsLoaded
);

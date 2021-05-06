import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import { addNewUnitSuccess, fetchUnitsSuccess } from './units.actions';
import {Unit} from '../../../models/unit';

export interface UnitState extends EntityState<Unit> {
  allUnitsLoaded: boolean;
}

export const unitsAdapter = createEntityAdapter<Unit>();

export const initialUnitState = unitsAdapter.getInitialState({
  allUnitsLoaded: false
});

const reducer = createReducer(initialUnitState,
  on(fetchUnitsSuccess, (state, {units}) => {
    return unitsAdapter.setAll(
      units,
      {
        ...state,
        allUnitsLoaded: true
      }
    );
  }),
  on(addNewUnitSuccess, (state, {unit}) => {
    return unitsAdapter.addOne(
      unit,
      {...state}
    );
  })
);

export function unitsReducer(state: UnitState, action: Action): UnitState {
  return reducer(state, action);
}

export const {
  selectAll
} = unitsAdapter.getSelectors();



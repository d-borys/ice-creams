import {createAction, props} from '@ngrx/store';
import {Unit} from 'models/unit';

export const fetchUnits = createAction(
  '[Unit Resolver] Fetch Units'
);

export const fetchUnitsSuccess = createAction(
  '[Unit Effect] Fetch Units Success',
  props<{units: Unit[]}>()
);

export const fetchUnitsFailed = createAction(
  '[Unit Effect] Fetch Units Failed',
  props<{message: string}>()
);

export const addNewUnit = createAction(
  '[Unit List] Add New Unit',
  props<{unit: Unit}>()
);

export const addNewUnitSuccess = createAction(
  '[Unit Effect] Add New Unit Sucess',
  props<{unit: Unit}>()
);

export const addNewUnitFailed = createAction(
  '[Unit Effect] Add New Unit Fail',
  props<{message: string}>()
);



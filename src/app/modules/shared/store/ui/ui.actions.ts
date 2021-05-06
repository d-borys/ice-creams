import {createAction, props} from '@ngrx/store';

export const showLoading = createAction(
  '[UI] Show Loading Indicator'
);

export const hideLoading = createAction(
  '[UI] Hide Loading Indicator'
);

export const showError = createAction(
  '[UI] Show Error',
  props<{ message: string }>()
);

export const hideError = createAction(
  '[UI] Hide Error'
);

export const showMessage = createAction(
  '[UI] Show Message',
  props<{ message: string }>()
);

export const hideMessage = createAction(
  '[UI] Hide Message'
);


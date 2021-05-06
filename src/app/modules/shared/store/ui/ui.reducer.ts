import {Action, createReducer, on} from '@ngrx/store';
import {hideLoading, showLoading} from './ui.actions';

export interface UIState {
  isLoading: boolean;
}

const initiaSharedState: UIState = {
  isLoading: false,
};


const reducer = createReducer(initiaSharedState,
  on(showLoading, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(hideLoading, (state) => {
    return {
      ...state,
      isLoading: false
    };
  })
);

export function uiReducer(state: UIState | undefined, action: Action): UIState {
  return reducer(state, action);
}

import {User} from '../../models/user';
import {Action, createReducer, on} from '@ngrx/store';
import {login, loginSuccess, logoutSuccess} from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined;
  isLoggedIn: boolean;
};

const initialAtuhState: AuthState = {
  user: undefined,
  isLoggedIn: false
};

const reducer = createReducer(
  initialAtuhState,
  on(loginSuccess, (state, {user}) => {
    return {
      ...state,
      user,
      isLoggedIn: true
    };
  }),
  on(logoutSuccess, (state) => {
    return {
      ...state,
      user: null,
      isLoggedIn: false
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}

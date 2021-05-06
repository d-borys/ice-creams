import {createAction, props} from '@ngrx/store';
import {User} from '../../models/user';

export const login = createAction(
  '[Login Component] Login',
  props<{email: string, password: string}>()
);

export const loginSuccess = createAction(
  '[Auth Effect] Login Success',
  props<{user: User}>()
);

export const loginFailed = createAction(
  '[Auth Effect] Login Failed',
  props<{message: string}>()
);

export const logout = createAction(
  '[Navigation Component] Logout',
);

export const logoutSuccess = createAction(
  '[Navigation Component] Logout Success',
);

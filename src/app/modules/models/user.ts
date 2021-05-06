import {UserRoles} from './enum/user-roles';
import {Unit} from './unit';

export interface User {
  email: string;
  id: number;
  role: UserRoles;
  unit?: Unit;
};

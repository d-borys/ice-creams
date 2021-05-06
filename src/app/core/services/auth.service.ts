import {Injectable} from '@angular/core';
import {UserRoles} from '../../modules/models/enum/user-roles';
import {Observable, of, throwError} from 'rxjs';
import {User} from '../../modules/models/user';
import {delay} from 'rxjs/operators';

@Injectable()
export class AuthService {
  private readonly dummyUsers = [
    {
      id: 1,
      email: 'customer@test.pl',
      password: '12345678',
      role: UserRoles.CUSTOMER,
      unit: {
        id: 1,
        name: 'Bucket',
        weight: 1,
        symbol: 'kg'
      },
    },
    {
      id: 2,
      email: 'producer@test.pl',
      password: '12345678',
      role: UserRoles.PRODUCER
    },
  ];

  constructor() {
  }

  login(credentials: { email: string, password: string }): Observable<User> {
    const {email, password} = credentials;
    const loggedUser = this.dummyUsers.find((user) => user.email === email && user.password === password);
    if (loggedUser) {
      const {id, role, unit} = loggedUser;
      return of({id, email, role, unit}).pipe(
        delay(500)
      );
    }
    return throwError('Invalid email or password');
  }

  logout(): Observable<User> {
    return of(null).pipe(
      delay(500)
    );
  }

}

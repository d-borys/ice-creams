import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {login} from '../store/auth.actions';
import {AppState} from 'core/reducers/app.reducer';

@Component({
  selector: 'app-login',
  template: `
    <app-login-form (submitted)="onFormSubmit($event)"></app-login-form>`
})

export class LoginComponent {

  constructor(private store: Store<AppState>) {

  }

  onFormSubmit(credentials: { email: string, password: string }): void {
    const {email, password} = credentials;
    this.store.dispatch(login({email, password}));
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './core/reducers/app.reducer';
import {loginSuccess} from './modules/auth/store/auth.actions';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from './modules/models/user';
import {selectCurrentUser} from './modules/auth/store/auth.selectors';
import {selectIsLoading} from './modules/shared/store/ui/ui.selectors';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectCurrentUser);
    this.isLoading$ = this.store.select(selectIsLoading);
    const user = localStorage.getItem('user');
    if (!!user) {
      this.store.dispatch(loginSuccess({user: JSON.parse(user)}));
      // this.router.navigate(['icecreams/orders']);
    }

  }

}

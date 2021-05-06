import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AppState} from '../../../../core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {logout} from '../../../auth/store/auth.actions';
import {selectIsProducer} from '../../../auth/store/auth.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isProducer$: Observable<boolean>;
  @Output() toggle = new EventEmitter<boolean>();
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isProducer$ = this.store.select(selectIsProducer);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

}

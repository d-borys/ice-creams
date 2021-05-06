import {Component, OnInit} from '@angular/core';
import {IceCream} from 'models/ice-cream';
import {Observable} from 'rxjs';
import {AppState} from 'core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {selectAssginedUnit} from '../../../auth/store/auth.selectors';
import {Unit} from 'models/unit';
import {fetchFavoriteIceCreamsForUser} from 'shared/store/ice-cream/ice-cream.actions';
import {selectFavoriteIceCreams} from 'shared/store/ice-cream/ice-cream.selectors';

@Component({
  selector: 'app-favorites',
  template: `<app-favorites-list [favorites]="favorites$ | async" [unit]="selectAssginedUnit$ | async"></app-favorites-list>`,
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<IceCream[]>;
  selectAssginedUnit$: Observable<Unit>;

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchFavoriteIceCreamsForUser());
    this.favorites$ = this.store.select(selectFavoriteIceCreams);
    this.selectAssginedUnit$ = this.store.select(selectAssginedUnit);
  }
}

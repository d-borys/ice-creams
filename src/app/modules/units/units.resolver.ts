import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../../core/reducers/app.reducer';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Unit} from '../models/unit';
import {selectAreUnitsLoaded} from '../shared/store/units/units.selectors';
import {fetchUnits} from '../shared/store/units/units.actions';

@Injectable()
export class UnitsResolver implements Resolve<Unit[]> {
  constructor(private store: Store<AppState>){}
  resolve(): Observable<any> {
    return this.store.pipe(
      select(selectAreUnitsLoaded),
      tap((unitsLoaded) => {
        if (!unitsLoaded) {
          return this.store.dispatch(fetchUnits());
        }
      }),
      filter(unitsLoaded => unitsLoaded),
      first()
    );
  }
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {addNewUnit, addNewUnitFailed, addNewUnitSuccess, fetchUnits, fetchUnitsFailed, fetchUnitsSuccess} from './units.actions';
import {UnitService} from '../../../../core/services/unit.service';
import {showLoading, showMessage} from '../ui/ui.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers/app.reducer';
import {selectAreUnitsLoaded} from './units.selectors';

@Injectable()
export class UnitsEffects {
  constructor(private actions$: Actions, private unitService: UnitService, private store: Store<AppState>) {
  }

  fetchUnits$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchUnits),
      withLatestFrom(this.store.select(selectAreUnitsLoaded)),
      filter(([action, areUnitsLoaded]) => !areUnitsLoaded),
      switchMap(() => {
        this.store.dispatch(showLoading());
        return this.unitService.getUnits().pipe(
          map((units) => {
            return fetchUnitsSuccess({units});
          }),
          catchError((error) => {
            return of(fetchUnitsFailed({message: error}));
          })
        );
      })
    );
  });

  addUnit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addNewUnit),
      switchMap(({unit}) => {
        return this.unitService.createUnit(unit).pipe(
          map((newUnit) => {
            this.store.dispatch(showMessage({message: 'New unit added!'}));
            return addNewUnitSuccess({unit: newUnit});
          }),
          catchError((error) => {
            return of(addNewUnitFailed({message: error}));
          })
        );
      }));
  });

}

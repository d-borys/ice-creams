import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Unit} from '../../modules/models/unit';

@Injectable()
export class UnitService {
  private dummyUnits: Unit[] = [
    {
      id: 1,
      name: 'Bucket',
      weight: 1,
      symbol: 'kg'
    },
    {
      id: 2,
      name: 'Cup',
      weight: 500,
      symbol: 'g'
    },
    {
      id: 3,
      name: 'Scoop',
      weight: 100,
      symbol: 'g'
    }
  ];

  constructor() {
  }

  getUnits(): Observable<Unit[]> {
    return of(this.dummyUnits).pipe(
      delay(500)
    );
  }

  createUnit(unit: Unit): Observable<Unit> {
    const newUnit = {...unit};
    if (!this.doesUnitExist(newUnit.name)) {
      newUnit.id = this.dummyUnits.map(ic => ic?.id).reduce((a, b) => (a ?? 1) + (b ?? 1), 0);
      this.dummyUnits = [...this.dummyUnits, newUnit];
      return of(newUnit).pipe(
        delay(500)
      );
    }
    return throwError('This Ice Cream already exists');
  }

  private doesUnitExist(name: string): boolean {
    return !!this.dummyUnits.find(item => item.name === name);
  }

}

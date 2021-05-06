import {Injectable} from '@angular/core';
import {IceCream} from '../../modules/models/ice-cream';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable()
export class IceCreamService {
  iceCreamTypes: IceCream[] = [
    {
      id: 1,
      name: 'Chocolate',
      favorite: true,
    },
    {
      id: 2,
      name: 'Strawberry',
      favorite: true
    },
    {
      id: 3,
      name: 'Vanilla',
      favorite: false
    },
    {
      id: 4,
      name: 'Gum',
      favorite: true
    },
    {
      id: 5,
      name: 'Carmel',
      favorite: false
    }
  ];

  constructor() {
  }

  getIceCreams(): Observable<IceCream[]> {
    return of([...this.iceCreamTypes]).pipe(
      delay(500)
    );
  }

  createIceCream(iceCream: IceCream): Observable<IceCream> {
    const newIc = {...iceCream};
    if (!this.doesIceCreamExist(newIc.name)) {
      newIc.id = this.iceCreamTypes.map(ic => ic?.id).reduce((a, b) => (a ?? 1) + (b ?? 1), 0);
      this.iceCreamTypes = [...this.iceCreamTypes, newIc];
      return of(newIc).pipe(
        delay(500)
      );
    }
    return throwError('This Ice Cream already exists');
  }

  private doesIceCreamExist(name: string): boolean {
    return !!this.iceCreamTypes.find(item => item.name === name);
  }

  setFavoriteIceCreams(iceCreamsIds: number[]): Observable<IceCream[]> {
    this.iceCreamTypes = this.iceCreamTypes.map(item => {
        item = {
          ...item,
          favorite: iceCreamsIds.indexOf(item.id) > -1
        };
        return item;
    });
    return of(this.iceCreamTypes).pipe(
      delay(500)
    );
  }

}

import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'core/reducers/app.reducer';
import {Observable} from 'rxjs';
import {IceCream} from 'models/ice-cream';
import {ColumnDef} from 'models/column-def';
import {IceCreamFormComponent} from '../../presentational/ice-cream-form/ice-cream-form.component';
import {MatDialog} from '@angular/material/dialog';
import {addNewIceCream, fetchIceCreams} from 'shared/store/ice-cream/ice-cream.actions';
import {selectAllIceCreams} from 'shared/store/ice-cream/ice-cream.selectors';

@Component({
  selector: 'app-ice-cream',
  template: `
    <div class="wrapper__content">
      <div class="iceCream__header">
        <h1>List of all the available ice creams</h1>
      </div>
      <div class="content">
      <app-ic-custom-table [dataProvider]="iceCreams$ | async" [columnsDef]="columns"></app-ic-custom-table>
      </div>
        <div class="button__bar">
        <div class="button__bar-center">
          <button mat-raised-button (click)="onShowAddForm()" color="primary">Create ice cream</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./ice-cream.component.scss']
})
export class IceCreamComponent implements OnInit {

  iceCreams$: Observable<IceCream[]>;
    columns: ColumnDef[] = [
      {
        id: 'id',
        header: 'ID',
        fieldId: 'id'
      },
      {
        id: 'name',
        header: 'Name',
        fieldId: 'name'
      }
    ];
  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchIceCreams());
    this.iceCreams$ = this.store.select(selectAllIceCreams);
  }

  onAddNewIceCream(iceCream: IceCream): void {
    this.store.dispatch(addNewIceCream({iceCream}));
  }

  onShowAddForm(): void {
    const dialogRef = this.dialog.open(IceCreamFormComponent, {
      panelClass: 'dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onAddNewIceCream(result);
      }
    });
  }


}

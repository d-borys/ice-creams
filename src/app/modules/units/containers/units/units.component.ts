import {Component, OnInit} from '@angular/core';
import {ColumnDef} from '../../../models/column-def';
import {AppState} from '../../../../core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Unit} from '../../../models/unit';
import {MatDialog} from '@angular/material/dialog';
import {UnitsFormComponent} from '../../presentational/units-form/units-form.component';
import {selectAllUnits} from '../../../shared/store/units/units.selectors';
import {addNewUnit} from '../../../shared/store/units/units.actions';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  units$: Observable<Unit[]>;
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
    },
    {
      id: 'weight',
      header: 'Weight',
      fieldId: 'weight'
    },
    {
      id: 'symbol',
      header: 'Symbol',
      fieldId: 'symbol'
    }
  ];

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.units$ = this.store.select(selectAllUnits);
  }

  onShowAddForm(): void {
    const dialogRef = this.dialog.open(UnitsFormComponent, {
      panelClass: 'dialog'
    });
    dialogRef.afterClosed().subscribe((unit) => {
      if (unit) {
        this.store.dispatch(addNewUnit({unit}));
      }
    });
  }

}

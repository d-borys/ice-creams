import {Component, Input} from '@angular/core';
import {Unit} from 'models/unit';
import {IceCream} from 'models/ice-cream';
import {MatDialog} from '@angular/material/dialog';
import {ColumnDef} from 'models/column-def';
import {CreateOrderFormComponent} from '../../containers/create-order-form/create-order-form.component';
import {AddFavoriteFormComponent} from '../../containers/add-favorite-form/add-favorite-form.component';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.componen.html',
})

export class FavoritesListComponent {
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
  selectedItem: IceCream;

  @Input() unit: Unit;
  @Input() favorites: IceCream[];

  constructor(
    private dialog: MatDialog
  ) {
  }


  onShowSlectForm(favoriteIceCreams: IceCream[]): void {
    this.dialog.open(AddFavoriteFormComponent, {
      data: favoriteIceCreams,
      panelClass: 'dialog'
    });
  }


  onOrder(iceCream: IceCream, unit: Unit): void {
    const dialogRef = this.dialog.open(CreateOrderFormComponent, {
      data: {
        order: {
          iceCream
        }
      },
      panelClass: 'dialog'
    });
  }

}

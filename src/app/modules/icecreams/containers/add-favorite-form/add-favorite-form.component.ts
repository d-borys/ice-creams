import {Component, Inject, OnInit} from '@angular/core';
import {IceCream} from 'models/ice-cream';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fetchIceCreams, setFavoriteIceCreams} from 'shared/store/ice-cream/ice-cream.actions';
import {AppState} from 'core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {selectAllIceCreams} from 'shared/store/ice-cream/ice-cream.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-favorite-form',
  templateUrl: './add-favorite-form.component.html',
  styleUrls: ['./add-favorite-form.component.scss']
})
export class AddFavoriteFormComponent implements OnInit {
  selectedIceCreams: IceCream[];
  iceCreams$: Observable<IceCream[]>;

  constructor(
    public dialogRef: MatDialogRef<AddFavoriteFormComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) private data: IceCream[]
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchIceCreams());
    this.iceCreams$ = this.store.select(selectAllIceCreams);
    this.selectedIceCreams = this.data;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSelect(selectedIceCreams: IceCream[]): void {
    this.store.dispatch(setFavoriteIceCreams({iceCreamIds: selectedIceCreams.map(item => item.id)}));
  }

  compareIceCream(a: IceCream, b: IceCream): boolean {
    return a?.id === b?.id;
  }

}

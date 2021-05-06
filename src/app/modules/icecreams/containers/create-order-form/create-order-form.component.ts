import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IceCream} from 'models/ice-cream';
import {Unit} from 'models/unit';
import {Order} from 'models/order';
import {AppState} from 'core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectAssginedUnit} from '../../../auth/store/auth.selectors';
import {selectAllIceCreams} from 'shared/store/ice-cream/ice-cream.selectors';
import {createNewOrder, fetchIceCreams} from 'shared/store/ice-cream/ice-cream.actions';
import {Customer} from 'models/customer';
import {selectAllCustomers} from 'shared/store/customers/customers.selectors';
import {fetchCustomers} from 'shared/store/customers/customers.actions';

@Component({
  selector: 'app-favorite-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderFormComponent implements OnInit {
  amount: number;
  unit$: Observable<Unit>;
  selectedIceCream: IceCream;
  selectedCustomer: Customer;
  isProducer = false;
  availableIceCreams$: Observable<IceCream[]>;
  isDuplicateMode = false;
  customers$: Observable<Customer[]>;
  order: Order;

  constructor(
    public dialogRef: MatDialogRef<CreateOrderFormComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    if (this.data?.order) {
      this.order = this.data?.order;
      const {iceCream, amount} = this.order;
      this.selectedIceCream = iceCream;
      this.isDuplicateMode = true;
      this.amount = amount;
    }

    if (this.data?.isProducer) {
      this.isProducer = this.data.isProducer;
      this.store.dispatch(fetchCustomers());
      this.customers$ = this.store.select(selectAllCustomers);
      this.selectedCustomer = this.data?.order?.customer;
    }

    this.store.dispatch(fetchIceCreams());
    this.availableIceCreams$ = this.store.select(selectAllIceCreams);
    this.unit$ = this.store.select(selectAssginedUnit);
  }

  onCloseModal(order: Order = null): void {
    this.dialogRef.close(order);
  }

  onOrder(amount: number, unit: Unit): void {
    const order: Order = {
      amount,
      unit: unit ?? this.order.unit,
      iceCream: this.selectedIceCream,
      customer: this.selectedCustomer ?? null
    };
    this.store.dispatch(createNewOrder({order}));
  }

  compareValuesFunction(a, b): boolean {
    return a?.id === b?.id;
  }

  compareCustomerValuesFunction(a, b): boolean {
    return a?.email === b?.email;
  }

}

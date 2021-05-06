import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppState} from 'core/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {Order} from 'models/order';
import {Observable} from 'rxjs';
import {Customer} from 'models/customer';
import {selectIsProducer} from '../../../auth/store/auth.selectors';
import {selectAllOrders, selectOrderCustomers, selectOrdersForCustomer} from 'shared/store/ice-cream/ice-cream.selectors';
import {fetchOrders} from 'shared/store/ice-cream/ice-cream.actions';

@Component({
  selector: 'app-orders',
  template: `
    <app-orders-list [orders]="orders$ | async" [customers]="customers$ | async" [isProducer]="isProducer$ | async"
                     (filter)="onSelectFilter($event)">
    </app-orders-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  customers$: Observable<Customer[]>;
  isProducer$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(selectAllOrders);
    this.customers$ = this.store.select(selectOrderCustomers);
    this.isProducer$ = this.store.select(selectIsProducer);
  }

  onSelectFilter(filterValue: string): void {
    if (filterValue) {
      this.orders$ = this.store.select(selectOrdersForCustomer, {name: filterValue});
    } else {
      this.orders$ = this.store.select(selectAllOrders);
    }
  }

}

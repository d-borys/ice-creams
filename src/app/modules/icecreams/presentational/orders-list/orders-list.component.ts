import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Customer} from 'models/customer';
import {Order} from 'models/order';
import {ColumnDef} from 'models/column-def';
import {MatDialog} from '@angular/material/dialog';
import {CreateOrderFormComponent} from '../../containers/create-order-form/create-order-form.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  @Input() customers: Customer[];
  @Input() orders: Order[];
  @Input() isProducer: boolean;
  @Output() filter = new EventEmitter<string>();
  filterValue: string;
  selectedItem: Order;
  columnsDef: ColumnDef[] = [
    {
      id: 'id',
      header: 'ID',
      fieldId: 'id',
    },
    {
      id: 'unit',
      header: 'Unit',
      fieldId: 'unit.name',
    },
    {
      id: 'icecream',
      header: 'Type of Ice cream',
      fieldId: 'iceCream.name'
    },
    {
      id: 'amount',
      header: 'Amount',
      fieldId: 'amount'
    },
    {
      id: 'customer',
      header: 'Customer',
      fieldId: 'customer.name'
    },
    {
      id: 'status',
      header: 'Status',
      fieldId: 'status'
    },
    {
      id: 'date',
      header: 'Order date',
      fieldId: 'creationDate'
    }
  ];

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }


  onDuplicateOrder(isProducer): void {
    this.dialog.open(CreateOrderFormComponent, {
      data: {
        order: this.selectedItem,
        isProducer
      },
      panelClass: 'dialog'
    });
  }

  onCreateOrder(isProducer: boolean): void {
    const dialogRef = this.dialog.open(CreateOrderFormComponent, {
      data: {
        isProducer
      },
      panelClass: 'dialog'
    });
    dialogRef.afterClosed();
  }

  columnsDefForCustomer(): ColumnDef[] {
    return this.columnsDef.filter(item => item.id !== 'customer');
  }

  onCustomerChange(): void {
    this.filter.emit(this.filterValue);
  }

}

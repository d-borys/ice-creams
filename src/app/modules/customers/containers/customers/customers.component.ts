import {Component, OnInit} from '@angular/core';
import {Customer} from 'models/customer';
import {ColumnDef} from 'models/column-def';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from 'core/reducers/app.reducer';
import {MatDialog} from '@angular/material/dialog';
import {CustomerFormComponent} from '../../presentational/customer-cream-form/customer-form.component';
import {selectAllCustomers} from 'shared/store/customers/customers.selectors';
import {addNewCustomer} from 'shared/store/customers/customers.actions';

@Component({
  selector: 'app-customers',
  template: `
    <div class="wrapper__content">
      <div class="list__header">
        <h1>List of your customers</h1>
      </div>
      <div class="content">
        <app-ic-custom-table [dataProvider]="customers$ | async" [columnsDef]="columns"></app-ic-custom-table>
      </div>
      <div class="button__bar">
        <div class="button__bar-center">
          <button mat-raised-button (click)="onShowAddForm()" color="primary">Create customer</button>
        </div>
      </div>
    </div>`
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;
  columns: ColumnDef[] = [
    {
      id: 'id',
      header: 'Id',
      fieldId: 'id'
    },
    {
      id: 'email',
      header: 'Email',
      fieldId: 'email'
    },
    {
      id: 'name',
      header: 'Name',
      fieldId: 'name'
    },
    {
      id: 'address',
      header: 'Address',
      fieldId: 'address'
    },
    {
      id: 'phone',
      header: 'Phone',
      fieldId: 'phone'
    }
  ];

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.customers$ = this.store.select(selectAllCustomers).pipe();
  }

  onShowAddForm(): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      panelClass: 'dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onAddNewCustomer(result);
      }
    });
  }

  onAddNewCustomer(customer: Customer): void {
    this.store.dispatch(addNewCustomer({customer}));
  }

}

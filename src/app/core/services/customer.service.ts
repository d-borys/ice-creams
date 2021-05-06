import {Injectable} from '@angular/core';
import {Customer} from '../../modules/models/customer';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'customer@test.pl',
      name: 'Best Ice creams',
      address: '273  Single Street',
      phone: '601-545-9293'
    },
    {
      id: 2,
      email: 'customer.2@test.pl',
      name: 'Crafted Ice Creams',
      address: '394  Finwood Road',
      phone: '405-625-2546'
    },
    {
      id: 3,
      email: 'customer.3@test.pl',
      name: 'IceCreamy',
      address: '443  Lena Lane',
      phone: '267-335-3658'
    }
  ];

  constructor() {
  }

  getCustomers(): Observable<Customer[]> {
    return of(this.customers).pipe(
      delay(500)
    );
  }

  createCustomer(customer: Customer): Observable<Customer> {
    if (!this.doesCustomerExist(customer)) {
      const id = this.customers.map((cus) => cus.id).reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
      const newCustomer = {...customer};
      newCustomer.id = id;
      this.customers = [...this.customers, newCustomer];
      return of(newCustomer);
    }
    return throwError('You already have a customer with provided email');
  }

  private doesCustomerExist(customer: Customer): boolean {
    return !!this.customers.find(item => item.email === customer.email);
  }
}

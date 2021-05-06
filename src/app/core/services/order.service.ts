import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Order} from '../../modules/models/order';
import {OrderStatus} from '../../modules/models/enum/order-status';
import {delay} from 'rxjs/operators';

@Injectable()
export class OrderService {
  private dummyOrdersProducer: Order[] = [
    {
      id: 1,
      unit: {
        id: 1,
        name: 'Bucket',
        weight: 1,
        symbol: 'kg'
      },
      iceCream: {
        id: 1,
        name: 'Chocolate'
      },
      creationDate: new Date(),
      status: OrderStatus.COMPLETED,
      amount: 10,
      customer: {
        id: 1,
        email: 'customer@test.pl',
        name: 'Best Ice creams'
      }
    },
    {
      id: 2,
      unit: {
        id: 2,
        name: 'Cup',
        weight: 500,
        symbol: 'g'
      },
      iceCream: {
        id: 2,
        name: 'Strawberry'
      },
      status: OrderStatus.NEW,
      amount: 15,
      creationDate: new Date(),
      customer: {
        id: 2,
        email: 'customer.2@test.pl',
        name: 'Crafted Ice Creams',
      }
    }
  ];

  getOrders(userId: number): Observable<Order[]> {
    if (userId === 1 || userId === 2) {
      return of(this.dummyOrdersProducer).pipe(
        delay(500)
      );
    }
    return of([]);
  }

  createNewOrder(body: Order): Observable<Order> {
    const newOrder = {
      ...body,
      id: Math.ceil(Math.random() * 100),
      status: OrderStatus.NEW,
      creationDate: new Date()
    };
    this.dummyOrdersProducer = [...this.dummyOrdersProducer, newOrder];
    return of(newOrder);
  }
}

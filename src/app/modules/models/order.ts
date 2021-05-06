import {Unit} from './unit';
import {IceCream} from './ice-cream';
import {OrderStatus} from './enum/order-status';
import {Customer} from './customer';

export interface Order {
  id?: number;
  unit: Unit;
  iceCream: IceCream;
  status?: OrderStatus;
  amount: number;
  customer?: Customer;
  creationDate?: Date;
}

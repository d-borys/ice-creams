import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IceCreamComponent} from './containers/ice-cream/ice-cream.component';
import {IceCreamResolver} from './ice-cream.resolver';
import {FavoritesComponent} from './containers/favorites/favorites.component';
import {OrdersComponent} from './containers/orders/orders.component';
import {OrdersResolver} from './orders.resolver';

const routes: Routes = [
  {
    path: 'list',
    component: IceCreamComponent,
    // resolve: {
    //   IceCreamResolver
    // }
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    resolve: {
      IceCreamResolver
    }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    resolve: {
      OrdersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IceCreamRoutingModule {
}

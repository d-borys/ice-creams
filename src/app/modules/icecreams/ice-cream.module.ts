import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IceCreamRoutingModule} from './ice-cream-routing.module';
import {SharedModule} from '../shared/shared.module';
import {IceCreamComponent} from './containers/ice-cream/ice-cream.component';
import {IceCreamResolver} from './ice-cream.resolver';
import {IceCreamFormComponent} from './presentational/ice-cream-form/ice-cream-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FavoritesComponent} from './containers/favorites/favorites.component';
import {OrdersComponent} from './containers/orders/orders.component';
import {OrdersResolver} from './orders.resolver';
import { OrdersListComponent } from './presentational/orders-list/orders-list.component';
import {FavoritesListComponent} from './presentational/favorites-list/favorites-list.component';
import {AddFavoriteFormComponent} from './containers/add-favorite-form/add-favorite-form.component';
import {CreateOrderFormComponent} from './containers/create-order-form/create-order-form.component';


@NgModule({
  declarations: [
    IceCreamComponent,
    IceCreamFormComponent,
    FavoritesComponent,
    AddFavoriteFormComponent,
    OrdersComponent,
    CreateOrderFormComponent,
    OrdersListComponent,
    FavoritesListComponent
  ],
  imports: [
    CommonModule,
    IceCreamRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    IceCreamResolver,
    OrdersResolver
  ]
})
export class IceCreamModule { }

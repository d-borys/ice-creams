import {NgModule} from '@angular/core';
import {CustomersRoutingModule} from './customers-routing.module';
import {CustomersComponent} from './containers/customers/customers.component';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomerFormComponent} from './presentational/customer-cream-form/customer-form.component';
import {CustomersResolver} from './customers.resolver';


@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    CustomersComponent,
    CustomerFormComponent,
  ],
  providers: [
    CustomersResolver
  ],
})
export class CustomersModule {
}

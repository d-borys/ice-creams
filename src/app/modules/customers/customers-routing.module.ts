import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CustomersComponent} from './containers/customers/customers.component';
import {CustomersResolver} from './customers.resolver';

const routes: Routes = [
  {
    path: 'list',
    component: CustomersComponent,
    resolve: {
      CustomersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomersRoutingModule {
}

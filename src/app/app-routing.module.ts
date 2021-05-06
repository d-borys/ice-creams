import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersModule} from './modules/customers/customers.module';
import {IceCreamModule} from './modules/icecreams/ice-cream.module';
import {UnitsModule} from './modules/units/units.module';
import {LoginComponent} from './modules/auth/containers/login.component';
import {AuthGuard} from './core/guards/auth.guard';
import {ProducerGuard} from './core/guards/producer.guard';
import {NotAuthGuard} from 'core/guards/not-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'icecreams',
    loadChildren: () => import('./modules/icecreams/ice-cream.module').then(m => IceCreamModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'customers',
    loadChildren: () => import('./modules/customers/customers.module').then(m => CustomersModule),
    canLoad: [AuthGuard, ProducerGuard],
  },
  {
    path: 'units',
    loadChildren: () => import('./modules/units/units.module').then(m => UnitsModule),
    canLoad: [AuthGuard, ProducerGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'icecreams/orders'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true
    })
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule {}

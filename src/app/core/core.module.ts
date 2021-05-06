import {NgModule} from '@angular/core';
import {AuthService} from './services/auth.service';
import {CustomerService} from './services/customer.service';
import {IceCreamService} from './services/ice-cream.service';
import {UnitService} from './services/unit.service';
import {OrderService} from './services/order.service';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './reducers/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  providers: [
    AuthService,
    CustomerService,
    IceCreamService,
    UnitService,
    OrderService
  ],
  imports: [
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([]),
  ]
})

export class CoreModule {

}

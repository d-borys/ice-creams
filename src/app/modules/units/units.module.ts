import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {UnitsRoutingModule} from './units-routing.module';
import {SharedModule} from '../shared/shared.module';
import {UnitsResolver} from './units.resolver';
import {ReactiveFormsModule} from '@angular/forms';
import {UnitsFormComponent} from './presentational/units-form/units-form.component';
import {UnitsComponent} from './containers/units/units.component';

@NgModule({
  imports: [
    CommonModule,
    UnitsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    UnitsComponent,
    UnitsFormComponent
  ],
  providers: [UnitsResolver],
})
export class UnitsModule {
}

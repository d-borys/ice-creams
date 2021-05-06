import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UnitsResolver} from './units.resolver';
import {UnitsComponent} from './containers/units/units.component';

const routes: Routes = [
  {
    path: 'list',
    component: UnitsComponent,
    resolve: {
      UnitsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UnitsRoutingModule {

}

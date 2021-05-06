import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatErrorMessageDirective} from './directives/mat-errors-messages.directive';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {IcCustomTableComponent} from './components/ic-custom-table/ic-custom-table.component';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {RowTemplateDirective} from './directives/row-template.directive';
import {NestedPipe} from './pipes/nested.pipe';
import {StatusComponent} from './components/status/status.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {StoreModule} from '@ngrx/store';
import {reducers, sharedFeatureKey} from './store/shared.reducer';
import {LoadingComponent} from './components/loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LetDirective} from './directives/let.directive';
import {EffectsModule} from '@ngrx/effects';
import {UnitsEffects} from './store/units/units.effects';
import {UiEffects} from './store/ui/ui.effects';
import {CustomersEffects} from './store/customers/customers.effects';
import {IceCreamEffects} from './store/ice-cream/ice-cream.effects';
import {UnitBarComponent} from './components/unit-bar/unit-bar.component';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSidenavModule,
    RouterModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatSelectModule,
    StoreModule.forFeature(sharedFeatureKey, reducers),
    EffectsModule.forFeature([UnitsEffects, UiEffects, CustomersEffects, IceCreamEffects]),
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSidenavModule,
  ],
  declarations: [
    MatErrorMessageDirective,
    NavigationComponent,
    IcCustomTableComponent,
    RowTemplateDirective,
    NestedPipe,
    StatusComponent,
    LoadingComponent,
    LetDirective,
    UnitBarComponent
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatErrorMessageDirective,
    NavigationComponent,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    IcCustomTableComponent,
    MatCardModule,
    RowTemplateDirective,
    NestedPipe,
    StatusComponent,
    MatTooltipModule,
    MatSelectModule,
    LoadingComponent,
    MatSnackBarModule,
    LetDirective,
    UnitBarComponent,
    MatSidenavModule
  ]
})

export class SharedModule {
}

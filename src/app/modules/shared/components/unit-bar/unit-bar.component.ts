import {Unit} from '../../../models/unit';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-unit-bar',
  template: `
    <div class="unit">
      <span>{{unit.name}} ({{unit.weight + ' ' + unit.symbol}})</span>
    </div>
  `
})

export class UnitBarComponent {
  @Input() unit: Unit;
}

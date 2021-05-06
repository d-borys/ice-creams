import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {OrderStatus} from '../../../models/enum/order-status';

@Component({
  selector: 'app-status',
  template: `
    <div class="status">
    <span class="status__icon" [matTooltip]="status" [ngClass]="getStatusClass()"></span>
    </div>
  `,
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent implements OnInit {
@Input() status: OrderStatus;
  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(): string {
    switch (this.status) {
      case OrderStatus.NEW:
        return 'new';
      case OrderStatus.CANCELLED:
        return 'cancelled';
      case OrderStatus.COMPLETED:
        return 'completed';
    }
  }

}

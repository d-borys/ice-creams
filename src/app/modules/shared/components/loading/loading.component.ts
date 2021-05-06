import {Component} from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <ng-container>
      <div class="loading__overlay"></div>
      <div class="loading__wrapper">
        <mat-spinner></mat-spinner>
      </div>
    </ng-container>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

}

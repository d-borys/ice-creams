import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[rTemplate]'
})

export class RowTemplateDirective {
  constructor(
    private ref: TemplateRef<any>
  ) {
  }
  @Input() rTemplate: string;

  get templateRef(): TemplateRef<any> {
    return this.ref;
  }
}

import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {FormControlErrors} from '../../models/enum/from-control-errors.enum';


@Component({
  selector: '[matErrorMessages]',
  template: '{{error}}'
})
export class MatErrorMessageDirective implements AfterViewInit, OnDestroy {
  error: string;
  keyup$: Observable<Event>;
  subscription: Subscription;

  constructor(
    private matInput: MatFormField
  ) {
  }

  ngAfterViewInit(): void {
    this.keyup$ = fromEvent(this.matInput._elementRef.nativeElement, 'keyup');
    this.subscription = this.keyup$.subscribe(() => {
      const errors = this.matInput._control.ngControl?.errors;
      if (errors) {
        const errorKey = Object.keys(errors as { [key: string]: boolean })[0];
        this.error = this.getErrorMessage(errorKey);
      }
    });
  }

  private getErrorMessage(errorKey: string): string {
    switch (errorKey) {
      case FormControlErrors.EMAIL:
        return 'Please enter a valid email address';
      case FormControlErrors.REQUIRED:
        return 'Missing value!';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

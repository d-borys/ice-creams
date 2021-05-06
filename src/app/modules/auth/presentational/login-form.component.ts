import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  form: FormGroup;
  @Output() submitted = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group(
      {
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.required]
      }
    );
  }

  onFormSubmit(formValue: any, isValid: boolean): void {
    if (formValue && isValid) {
      this.submitted.emit(formValue);
    }
  }
}

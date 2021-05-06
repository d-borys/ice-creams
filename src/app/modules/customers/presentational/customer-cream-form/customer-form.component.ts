import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ice-cream-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerFormComponent>
  ) {
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      name: [null, Validators.required],
      phone: [null],
      address: [null]
    });
  }

  onSubmit(formValue: { name: string }, isValid: boolean): void {
    if (isValid) {
      this.dialogRef.close(formValue);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}

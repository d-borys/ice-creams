import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ice-cream-form',
  templateUrl: './ice-cream-form.component.html',
  styleUrls: ['./ice-cream-form.component.scss']
})
export class IceCreamFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<IceCreamFormComponent>
  ) {
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required]
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

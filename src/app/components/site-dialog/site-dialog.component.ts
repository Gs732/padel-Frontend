import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';


@Component({
    selector: 'app-site-dialog',
    imports: [CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatDialogModule, MatFormFieldModule, MatInputModule],
    templateUrl: './site-dialog.component.html',
    styleUrl: './site-dialog.component.css'
})
export class SiteDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SiteDialogComponent>
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      telephone: ['', Validators.required],
      actif: [true]  // Define your form controls here
    });
  }

  confirmer(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
  }
}
  annuler(): void {
    this.dialogRef.close();
  }
}

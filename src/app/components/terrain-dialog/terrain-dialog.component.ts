import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-terrain-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './terrain-dialog.component.html',
  styleUrl: './terrain-dialog.component.css'
})
export class TerrainDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TerrainDialogComponent>
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      interieur: [false],
      actif: [true],
      siteId: ['', Validators.required]
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
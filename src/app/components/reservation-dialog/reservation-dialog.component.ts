import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { inject } from '@angular/core';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css',
})
export class ReservationDialogComponent {
  form: FormGroup;

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ReservationDialogComponent>);

  constructor() {
    this.form = this.fb.group({
      membreId: ['', Validators.required],
      terrainId: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      prix: [0, Validators.required],
      statut: ['EN_ATTENTE'],
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

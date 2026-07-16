import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  ReservationService,
  Reservation,
} from '../../services/reservation.service';
import { ReservationDialogComponent } from '../../components/reservation-dialog/reservation-dialog.component';

@Component({
    selector: 'app-reservations',
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
    ],
    templateUrl: './reservations.component.html',
    styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  displayedColumns: string[] = [
    'id',
    'membreId',
    'terrainId',
    'dateDebut',
    'dateFin',
    'prix',
    'statut',
    'actions',
  ];

  private reservationService = inject(ReservationService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data: Reservation[]) => (this.reservations = data),
      error: (err: any) => console.error('Erreur chargement réservations', err),
    });
  }

  ouvrirDialog(): void {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: Reservation) => {
      if (result) {
        this.reservationService.creerReservation(result).subscribe({
          next: () => this.loadReservations(),
          error: (err: any) => {
            const message =
              err.error?.message ||
              'Erreur lors de la création de la réservation';
            alert(message);
          },
        });
      }
    });
  }

  annulerReservation(id: number): void {
    if (confirm('Voulez-vous vraiment annuler cette réservation ?')) {
      this.reservationService.annulerReservation(id).subscribe({
        next: () => this.loadReservations(),
        error: (err: any) =>
          console.error('Erreur annulation réservation', err),
      });
    }
  }

  supprimerReservation(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
      this.reservationService.supprimerReservation(id).subscribe({
        next: () => this.loadReservations(),
        error: (err: any) =>
          console.error('Erreur suppression réservation', err),
      });
    }
  }
}

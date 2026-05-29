import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
  id?: number;
  membreId: number;
  terrainId: number;
  dateDebut: string;
  dateFin: string;
  prix: number;
  statut: string;
}
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  getReservationsByMembreId(membreId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/membre/${membreId}`);
  }

  creerReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }

  annulerReservation(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/annuler`, {});
  }

  supprimerReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Creneau {
  debut: string;
  fin: string;
  disponible: boolean;
}

export interface RencontreResponse {
  id: number;
  terrainNom: string;
  siteNom: string;
  organisateurNom: string;
  debut: string;
  visibilite: string;
  statut: string;
  prixTotal: number;
  nombreJoueurs: number;
}

export interface CreerRencontreRequest {
  organisateurId: number;
  terrainId: number;
  debut: string;
  visibilite: string;
}

@Injectable({
  providedIn: 'root',
})
export class RencontreService {
  private creneauUrl = 'http://localhost:8080/api/creneaux';
  private rencontreUrl = 'http://localhost:8080/api/rencontres';

  constructor(private http: HttpClient) {}

  getCreneaux(terrainId: number, date: string): Observable<Creneau[]> {
    return this.http.get<Creneau[]>(
      `${this.creneauUrl}?terrainId=${terrainId}&date=${date}`,
    );
  }

  creerRencontre(request: CreerRencontreRequest): Observable<RencontreResponse> {
    return this.http.post<RencontreResponse>(this.rencontreUrl, request);
  }

  getRencontres(): Observable<RencontreResponse[]> {
    return this.http.get<RencontreResponse[]>(this.rencontreUrl);
  }
}
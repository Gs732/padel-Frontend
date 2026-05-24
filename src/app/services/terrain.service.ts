import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Terrain {
  id?: number;
  nom: string;
  type: string;
  interieur: boolean;
  actif: boolean;
  siteId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private apiUrl = 'http://localhost:8080/api/terrains';

  constructor(private http: HttpClient) {}

  getAllTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(this.apiUrl);
  }

  getTerrainsBySiteId(siteId: number): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.apiUrl}/site/${siteId}`);
  }

  creerTerrain(terrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(this.apiUrl, terrain);
  }

  modifierTerrain(id: number, terrain: Terrain): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.apiUrl}/${id}`, terrain);
  }

  supprimerTerrain(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
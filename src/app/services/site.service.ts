import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Site {
  id?: number;
  nom: string;
  adresse: string;
  ville: string;
  telephone: string;
  actif: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private apiUrl = 'http://localhost:8080/api/sites';

  constructor(private http: HttpClient) {}

  getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl);
  }

  getSiteById(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.apiUrl}/${id}`);
  }

  creerSite(site: Site): Observable<Site> {
    return this.http.post<Site>(this.apiUrl, site);
  }

  modifierSite(id: number, site: Site): Observable<Site> {
    return this.http.put<Site>(`${this.apiUrl}/${id}`, site);
  }

  supprimerSite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
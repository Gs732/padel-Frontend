import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Membre {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  solde: number;
  actif: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private apiUrl = 'http://localhost:8080/api/membres';
  constructor(private http: HttpClient) {}

  getMembres(): Observable<Membre[]> {
    return this.http.get<Membre[]>(this.apiUrl);
} 

getMembreById(id: number): Observable<Membre> {
  return this.http.get<Membre>(`${this.apiUrl}/${id}`);
}

creerMembre(membre: Membre): Observable<Membre> {
  return this.http.post<Membre>(this.apiUrl, membre);
}

modifierMembre(id: number, membre: Membre): Observable<Membre> {
  return this.http.put<Membre>(`${this.apiUrl}/${id}`, membre);
}

supprimerMembre(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}

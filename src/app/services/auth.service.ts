import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private tokenSignal = signal<string | null>(localStorage.getItem('token'));

  isLoggedIn = computed(() => this.tokenSignal() !== null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.tokenSignal.set(response.token);
      }),
    );
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSignal.set(null);
    this.router.navigate(['/login']);
  }
}

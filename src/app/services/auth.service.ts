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

  // Le rôle de l'utilisateur, extrait du token JWT
  role = computed(() => this.extractRole(this.tokenSignal()));

  // Raccourcis pratiques pour les templates
  isAdmin = computed(() => {
    const r = this.role();
    return r === 'ROLE_ADMIN_GLOBAL' || r === 'ROLE_ADMIN_SITE';
  });
  isAdminGlobal = computed(() => this.role() === 'ROLE_ADMIN_GLOBAL');

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

  // Décode le payload du JWT et en extrait le rôle
  private extractRole(token: string | null): string | null {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Le backend met le rôle dans "role" : [{ authority: "ROLE_ADMIN_GLOBAL" }]
      const roles = payload.role;
      if (Array.isArray(roles) && roles.length > 0) {
        return roles[0].authority;
      }
      return null;
    } catch {
      return null;
    }
  }
}
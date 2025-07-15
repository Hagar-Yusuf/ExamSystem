import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private api = 'https://localhost:7003/api/auth';

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.api}/login`, { email, password });
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  storeToken(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', payload.role);
    sessionStorage.setItem('id', payload.nameid);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

getRole(): string {
  const token = sessionStorage.getItem('token');
  if (!token) return '';
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload['role'] || '';
}

isAuthenticated(): boolean {
  return !!this.getToken();
}
  getId() {
    return +sessionStorage.getItem('id')!;
  }

logout(): void {
  sessionStorage.removeItem('token');
  window.location.href = '/login';
}

  isLoggedIn() {
    return !!this.getToken();
  }
}

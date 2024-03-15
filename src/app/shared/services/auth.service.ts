import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseURL;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: { immatricule: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData);
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

  check(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (typeof window !== 'undefined' && localStorage) {
        this.http
          .post<any>(`${this.apiUrl}/auth/check-login`, {
            token: localStorage.getItem('access_token'),
          })
          .subscribe({
            next: (result) => {
              resolve(true);
            },
            error: (error) => {
              resolve(false);
            },
          });
      } else {
        resolve(false);
      }
    });
  }

  isLogged() {
    if (typeof window !== 'undefined' && localStorage) {
      return !!localStorage.getItem('access_token');
    } else {
      return false;
    }
  }
}

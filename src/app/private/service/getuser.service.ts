import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GetuserService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient) {}

  findAll(token: any) {
    return this.http.post<any>(`${this.PrivateApiUrl}/auth/check-login`, {
      token,
    });
  }
}

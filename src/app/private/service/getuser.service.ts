import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GetuserService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private auth: AuthService, private http: HttpClient) {}
  findOne(immatricule: string) {
    return this.http.get<any>(`${this.PrivateApiUrl}/users/${immatricule}`);
  }
}

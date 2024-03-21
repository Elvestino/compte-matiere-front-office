import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrdreService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient, private router: Router) {}
  create(ordre: any) {
    return this.http.post<any>(`${this.PrivateApiUrl}/ordre`, ordre);
  }
  findAll() {
    return this.http.get<any>(`${this.PrivateApiUrl}/ordre`);
  }
  update(ordre: any) {
    return this.http.patch<any>(`${this.PrivateApiUrl}/ordre/:numOrdre`, ordre);
  }
  remove(numOrdre: number) {
    return this.http.delete<any>(`${this.PrivateApiUrl}/ordre/${numOrdre}`);
  }
}

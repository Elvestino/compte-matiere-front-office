import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient, private router: Router) {}
  create(facture: any) {
    return this.http.post<any>(`${this.PrivateApiUrl}/facture`, facture);
  }
  findAll() {
    return this.http.get<any>(`${this.PrivateApiUrl}/facture`);
  }
  update(facture: any) {
    return this.http.patch<any>(
      `${this.PrivateApiUrl}/facture/:numFacture`,
      facture
    );
  }
  remove(numFacture: number) {
    return this.http.delete<any>(`${this.PrivateApiUrl}/facture/${numFacture}`);
  }
}
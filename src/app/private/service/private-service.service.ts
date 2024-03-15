import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FournisseurModel } from '../models/fournisseur.models';

@Injectable({
  providedIn: 'root',
})
export class PrivateServiceService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  create(FournisseurData: any) {
    return this.http.post<any>(
      `${this.PrivateApiUrl}/fournisseur`,
      FournisseurData,
    );
  }
  findAll() {
    return this.http.get<any>(`${this.PrivateApiUrl}/fournisseur`);
  }
  update(Frns: any) {
    return this.http.patch<any>(
      `${this.PrivateApiUrl}/fournisseur/:numFrns`,
      Frns,
    );
  }
  remove(numFrns: number) {
    return this.http.delete<any>(
      `${this.PrivateApiUrl}/fournisseur/${numFrns}`,
    );
  }
}

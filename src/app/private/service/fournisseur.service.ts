import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrivateServiceService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient, private router: Router) {}
  create(FournisseurData: any) {
    return this.http.post<any>(
      `${this.PrivateApiUrl}/fournisseur`,
      FournisseurData
    );
  }
  findAll() {
    return this.http.get<any>(`${this.PrivateApiUrl}/fournisseur`);
  }
  update(Frns: any) {
    return this.http.patch<any>(
      `${this.PrivateApiUrl}/fournisseur/:numFrns`,
      Frns
    );
  }
  remove(numFrns: number) {
    return this.http.delete<any>(
      `${this.PrivateApiUrl}/fournisseur/${numFrns}`
    );
  }
  filterFrns(searchterm: string) {
    return this.http.get<any[]>(`${this.PrivateApiUrl}/fournisseur`).pipe(
      map((data) => {
        return data.filter((item) => {
          return (
            item.nomFrns.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.prenomFrns.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.adrsFrns.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.typeFrns.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.telFrns.toLowerCase().includes(searchterm.toLowerCase())
          );
        });
      })
    );
  }
  filterOrdre(searchOrdre: string) {
    return this.http.get<any[]>(`${this.PrivateApiUrl}/ordre`).pipe(
      map((data) => {
        return data.filter((item) => {
          return (
            item.dateOrdre.toLowerCase().includes(searchOrdre.toLowerCase()) ||
            item.numService.toLowerCase().includes(searchOrdre.toLowerCase()) ||
            item.nomService.toLowerCase().includes(searchOrdre.toLowerCase()) ||
            item.newannee.toLowerCase().includes(searchOrdre.toLowerCase())
          );
        });
      })
    );
  }
}

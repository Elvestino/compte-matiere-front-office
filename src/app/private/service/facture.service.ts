import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

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
  remove(numFacture: string) {
    return this.http.delete<any>(`${this.PrivateApiUrl}/facture/${numFacture}`);
  }
  filterFrns(searchterm: string, nbr: number) {
    return this.http.get<any[]>(`${this.PrivateApiUrl}/facture`).pipe(
      map((data) => {
        return data.filter((item) => {
          return (
            item.fournisseur.nomFrns
              .toLowerCase()
              .includes(searchterm.toLowerCase()) ||
            item.destination.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.dateFacture.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.LieuFacture.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.typeFacture.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.objetFacture
              .toLowerCase()
              .includes(searchterm.toLowerCase()) ||
            item.montantFacture.to().includes(nbr.toString())
          );
        });
      })
    );
  }
}

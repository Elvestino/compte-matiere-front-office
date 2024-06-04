import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntreeService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient, private router: Router) {}
  create(EntreeData: any) {
    return this.http.post<any>(`${this.PrivateApiUrl}/entree`, EntreeData);
  }
  findAll() {
    return this.http.get<any>(`${this.PrivateApiUrl}/entree`);
  }
  update(EntreeData: any) {
    return this.http.patch<any>(
      `${this.PrivateApiUrl}/entree/:numEntree`,
      EntreeData
    );
  }
  remove(numEntree: string) {
    return this.http.delete<any>(`${this.PrivateApiUrl}/entree/${numEntree}`);
  }

  filterFrns(searchterm: string, nbr: number) {
    return this.http.get<any[]>(`${this.PrivateApiUrl}/entree`).pipe(
      map((data) => {
        return data.filter((item) => {
          return (
            item.designation.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.especeUnitaire
              .toLowerCase()
              .includes(searchterm.toLowerCase()) ||
            item.facture.destination
              .toLowerCase()
              .includes(searchterm.toLowerCase()) ||
            item.numFolioGL.toString().includes(nbr.toString()) ||
            item.nomenclature.toString().includes(nbr.toString()) ||
            item.quantite.toString().includes(nbr.toString()) ||
            item.prix.toString().includes(nbr.toString()) ||
            item.annee.newannee.toString().includes(nbr.toString())
          );
        });
      })
    );
  }
}

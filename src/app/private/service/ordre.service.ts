import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ServiceService } from './service.service';
import { AnneeService } from './annee.service';

@Injectable({
  providedIn: 'root',
})
export class OrdreService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(
    private http: HttpClient,
    private service: ServiceService,
    private annee: AnneeService,
    private router: Router
  ) {}
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
  filterOrdre(searchterm: string, numService: number, newannee: number) {
    return this.http.get<any[]>(`${this.PrivateApiUrl}/ordre`).pipe(
      map((data) => {
        return data.filter((item) => {
          return (
            item.dataOrdre.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.service.numService
              .toLowerCase()
              .includes(searchterm.toLowerCase()) ||
            item.service.nomService
              .toLowerCase()
              .includes(searchterm.toLowerCase()) ||
            item.newannee.toLowerCase().includes(searchterm.toLowerCase())
          );
        });
      })
    );
  }
}

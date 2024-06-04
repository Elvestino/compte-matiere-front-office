import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdreService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient) {}
  create(ordre: any): Observable<any> {
    return this.http.post<any>(`${this.PrivateApiUrl}/ordre`, ordre);
  }
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.PrivateApiUrl}/ordre`);
  }
  update(ordre: any, numOrdre: string): Observable<any> {
    return this.http.patch<any>(
      `${this.PrivateApiUrl}/ordre/${numOrdre}`,
      ordre
    );
  }
  remove(numOrdre: string): Observable<any> {
    return this.http.delete<any>(`${this.PrivateApiUrl}/ordre/${numOrdre}`);
  }
  filterOrdre(searchterm: string): Observable<any> {
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
            item.annee.newannee.toLowerCase().includes(searchterm.toLowerCase())
          );
        });
      })
    );
  }
}

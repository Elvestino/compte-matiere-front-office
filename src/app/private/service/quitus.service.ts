import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuitusService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient, private router: Router) {}
  create(quitus: any) {
    return this.http.post<any>(`${this.PrivateApiUrl}/quitus`, quitus);
  }
  findAll() {
    return this.http.get<any>(`${this.PrivateApiUrl}/quitus`);
  }
  update(quitus: any) {
    return this.http.patch<any>(
      `${this.PrivateApiUrl}/quitus/:numQuitus`,
      quitus
    );
  }
  remove(numQuitus: string) {
    return this.http.delete<any>(`${this.PrivateApiUrl}/quitus/${numQuitus}`);
  }
  filterquitus(searchterm: string) {
    return this.http.get<any[]>(`${this.PrivateApiUrl}/quitus`).pipe(
      map((data) => {
        return data.filter((item) => {
          return (
            item.objetQuitus.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.ReferenceQuitus.toLowerCase().includes(
              searchterm.toLowerCase()
            ) ||
            // item.exerciceAnnee
            //   .toLowerCase()
            //   .includes(searchterm.toLowerCase()) ||
            // item.montantQuitus
            //   .toLowerCase()
            //   .includes(searchterm.toLowerCase()) ||
            item.service.nomService
              .toLowerCase()
              .includes(searchterm.toLowerCase()) ||
            item.observateur.toLowerCase().includes(searchterm.toLowerCase()) ||
            item.dateQuitus.toLowerCase().includes(searchterm.toLowerCase())
          );
        });
      })
    );
  }
}

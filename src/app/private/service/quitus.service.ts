import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  remove(numQuitus: number) {
    return this.http.delete<any>(`${this.PrivateApiUrl}/quitus/${numQuitus}`);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnneeService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient) {}
  create(AnneeData: any) {
    return this.http.post<any>(`${this.PrivateApiUrl}/annee`, AnneeData);
  }
  findAll() {
    return this.http.get<any>(`${this.PrivateApiUrl}/annee`);
  }
  remove(newannee: number) {
    return this.http.delete<any>(`${this.PrivateApiUrl}/annee/${newannee}`);
  }
}

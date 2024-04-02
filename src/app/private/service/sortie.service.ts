import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SortieService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient) {}
  create(sortie: any) {
    return this.http.post<any>(`${this.PrivateApiUrl}/sortie`, sortie);
  }
  findAll() {
    return this.http.get<any>(`${this.PrivateApiUrl}/sortie`);
  }

  remove(numSortie: number) {
    return this.http.delete<any>(`${this.PrivateApiUrl}/sortie/${numSortie}`);
  }
}

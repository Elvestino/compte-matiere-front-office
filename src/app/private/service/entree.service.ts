import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
}

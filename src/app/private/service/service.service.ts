import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient) {}
  create(service: any) {
    return this.http.post<any>(`${this.PrivateApiUrl}/service`, service);
  }
  findAll() {
    return this.http.get<any>(`${this.PrivateApiUrl}/service`);
  }
  update(service: any) {
    return this.http.patch<any>(
      `${this.PrivateApiUrl}/service/:numService`,
      service
    );
  }
  remove(numService: number) {
    return this.http.delete<any>(`${this.PrivateApiUrl}/service/${numService}`);
  }
}

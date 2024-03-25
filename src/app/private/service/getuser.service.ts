import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GetuserService {
  private PrivateApiUrl = environment.apiBaseURL;

  constructor(private http: HttpClient) {}
  // getImmatricule(): Promise<string | null> {
  //   return new Promise<string | null>((resolve, reject) => {
  //     if (typeof window !== 'undefined' && localStorage) {
  //       this.http
  //         .get<any>(`${this.PrivateApiUrl}/users`, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //           },
  //         })
  //         .subscribe({
  //           next: (userData) => {
  //             resolve(userData.immatricule);
  //           },
  //           error: (error) => {
  //             resolve(null);
  //           },
  //         });
  //     } else {
  //       resolve(null);
  //     }
  //   });
  // }
}

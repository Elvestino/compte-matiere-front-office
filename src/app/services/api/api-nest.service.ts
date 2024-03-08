import { UsersModel } from './../../models/users/users.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APINestService {
  private apiURl_nest = environment.apiBaseURL;

  constructor(private http: HttpClient) {}
  getAll(): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(`${this.apiURl_nest}/users`);
  }
  getOne(id: number): Observable<UsersModel> {
    return this.http.get<UsersModel>(`${this.apiURl_nest}/users/${id}`);
  }
  create(usersModel: UsersModel): Observable<UsersModel> {
    return this.http.post<UsersModel>(`${this.apiURl_nest}/users`, usersModel);
  }
  delete(id: number): Observable<UsersModel> {
    return this.http.delete<UsersModel>(`${this.apiURl_nest}/users/${id}`);
  }
}

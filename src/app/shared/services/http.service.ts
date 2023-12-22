import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  apiURL = 'https://658389484d1ee97c6bce044c.mockapi.io/api/v1/users';

  public fetchUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL);
  }

  public getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiURL}/${id}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiURL}/${user.id}`, user);
  }

  public deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiURL}/${id}`);
  }
}

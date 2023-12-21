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

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL);
  }
}

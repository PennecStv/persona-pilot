import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private router: Router, private http: HttpService) {}

  users = new BehaviorSubject<User[]>([]);

  isLoading = new BehaviorSubject<boolean>(false);

  public getUsers() {
    this.isLoading.next(true);
    this.http.getUsers().subscribe((data: User[]) => {
      this.users.next(data);
      this.isLoading.next(false);
    });
  }
}

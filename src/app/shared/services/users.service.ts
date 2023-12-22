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
  selectedUser = new BehaviorSubject<User>(new User());

  isLoading = new BehaviorSubject<boolean>(false);

  public fetchUsers() {
    this.isLoading.next(true);
    this.http.fetchUsers().subscribe((data: User[]) => {
      this.users.next(data);
      this.isLoading.next(false);
    });
  }

  public selectUser(id: string) {
    this.isLoading.next(true);
    const sub = this.http.getUser(id).subscribe((user: User) => {
      this.selectedUser.next(user);
      this.isLoading.next(false);
    });
  }

  public updateUser() {
    this.isLoading.next(true);
    const userData = this.selectedUser.getValue();

    if (userData) {
      // Update locally
      const updatedUsers = this.users.value.map((user) =>
        user.id === userData.id ? userData : user
      );

      this.users.next(updatedUsers);

      this.http.updateUser(userData).subscribe();

      this.fetchUsers();
    }
  }

  public deleteUser(id: string) {
    // Delete locally
    const updatedUsers = this.users.value.filter((user) => user.id !== id);
    this.users.next(updatedUsers);

    this.http.deleteUser(id).subscribe();
  }
}

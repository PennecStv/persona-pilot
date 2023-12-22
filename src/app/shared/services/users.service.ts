import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpService, private _snackBar: MatSnackBar) {}

  users = new BehaviorSubject<User[]>([]);
  selectedUser = new BehaviorSubject<User>(new User());

  isLoading = new BehaviorSubject<boolean>(false);

  createdUserMessage: string = 'User created successfully!';
  updatedUserMessage: string = 'User updated successfully!';
  deletedUserMessage: string = 'User deleted successfully!';

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }

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

    if (userData != null) {
      this.http.updateUser(userData).subscribe();

      this.fetchUsers();

      this.openSnackBar(this.updatedUserMessage);
    }
  }

  public deleteUser(id: string) {
    // Delete locally
    const updatedUsers = this.users.value.filter((user) => user.id !== id);
    this.users.next(updatedUsers);

    this.http.deleteUser(id).subscribe();

    this.openSnackBar(this.deletedUserMessage);
  }

  public createUser(user: User) {
    this.isLoading.next(true);

    if (!user.isNull()) {
      this.http.createUser(user).subscribe();

      this.fetchUsers();

      this.openSnackBar(this.createdUserMessage);
    }
  }
}

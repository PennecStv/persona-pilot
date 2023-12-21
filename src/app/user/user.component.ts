import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private userService: UsersService) {}

  usersList: User[] = [];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.userService.getUsers();

    let subscription = this.userService.users.subscribe((data: User[]) => {
      this.usersList = data;
    });
    this.subscriptions.push(subscription);
  }

  columnsToDisplay = ['id', 'first_name', 'last_name', 'email'];
}

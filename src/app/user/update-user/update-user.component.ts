import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}

  selectedUser: User = new User();
  subscriptions: Subscription[] = [];

  isLoading: boolean = false;

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params['id'], 10);

    this.userService.selectUser(id.toString());

    let subscription = this.userService.selectedUser.subscribe(
      (selectedUser) => (this.selectedUser = selectedUser)
    );
    this.subscriptions.push(subscription);

    subscription = this.userService.isLoading.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
    this.subscriptions.push(subscription);
  }

  onSubmit(): void {
    this.userService.updateUser();

    this.userService.fetchUsers();
  }
}

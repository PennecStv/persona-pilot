import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}

  newUser: User = new User();

  onSubmit(): void {
    this.userService.createUser(this.newUser);

    this.newUser = new User();
  }
}

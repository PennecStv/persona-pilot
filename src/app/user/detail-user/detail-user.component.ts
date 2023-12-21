import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  selectedUser: User = new User();
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    //this.activatedRoute.paramMap.subscribe((params) => {
    //const id = params.get('id');
    this.userService.selectUser(id.toString());
    //});

    let subscription = this.userService.selectedUser.subscribe(
      (selectedUser) => (this.selectedUser = selectedUser)
    );
    this.subscriptions.push(subscription);

    console.log(this.selectedUser);
  }
}

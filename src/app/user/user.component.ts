import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private userService: UsersService) {}

  usersList: User[] = [];
  subscriptions: Subscription[] = [];
  users$: Observable<User[]> = new Observable<User[]>();

  userDataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  isLoading: boolean = false;

  columnsToDisplay = [
    'id',
    'first_name',
    'last_name',
    'email',
    'detail-button',
    'edit-button',
    'delete-button',
  ];

  ngOnInit(): void {
    this.userService.fetchUsers();
    this.users$ = this.userService.users.asObservable();

    let subscription = this.userService.users.subscribe((data: User[]) => {
      this.usersList = data;
      this.userDataSource = new MatTableDataSource<User>(this.usersList);
      this.userDataSource.paginator = this.paginator;
    });
    this.subscriptions.push(subscription);

    subscription = this.userService.isLoading.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id);
  }
}

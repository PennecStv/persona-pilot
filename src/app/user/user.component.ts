import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private userService: UsersService) {}

  subscriptions: Subscription[] = [];
  sortedData: User[] = [];
  users$: Observable<User[]> = new Observable<User[]>();

  userDataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  isLoading: boolean = false;
  searchTerm: string = '';
  columnToFilter: string = '';
  selectedColumn: string = 'all';
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
      this.userDataSource = new MatTableDataSource<User>(data);
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

  customEmailFilter(data: User, filter: string): boolean {
    switch (this.selectedColumn) {
      case 'all':
        this.columnToFilter =
          data.first_name.toLowerCase() +
          data.last_name.toLowerCase() +
          data.email.toLowerCase() +
          data.occupation.toLowerCase() +
          data.bio.toLowerCase();
        break;
      case 'first_name':
        this.columnToFilter = data.first_name.toLowerCase();
        break;
      case 'last_name':
        this.columnToFilter = data.last_name.toLowerCase();
        break;
      case 'email':
        this.columnToFilter = data.email.toLowerCase();
        break;
      case 'occupation':
        this.columnToFilter = data.occupation.toLowerCase();
        break;
      default:
        this.columnToFilter = data.first_name.toLowerCase();
    }
    return this.columnToFilter.includes(filter);
  }

  search(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.userDataSource.filter = filterValue;
    this.userDataSource.filterPredicate = (data, filter) =>
      this.customEmailFilter(data, filterValue);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.userDataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.userDataSource.data = data;
      return;
    }

    this.userDataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(parseInt(a.id), parseInt(b.id), isAsc);
        case 'first_name':
          return this.compare(a.first_name, b.first_name, isAsc);
        case 'last_name':
          return this.compare(a.last_name, b.last_name, isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        default:
          return 0;
      }
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id);
  }
}

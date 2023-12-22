import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UserComponent },
  { path: 'user/:id', component: DetailUserComponent },
  { path: 'update/user/:id', component: UpdateUserComponent },
];

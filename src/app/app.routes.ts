import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';

export const routes: Routes = [
  //Home page
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UserComponent },
  { path: 'user/:id', component: DetailUserComponent },
];

import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  //home page
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UserComponent },
];

import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'auth/register', component: RegisterComponent },
];

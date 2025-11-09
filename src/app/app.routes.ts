import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { DentistDashboard } from './layout/dentist-dashboard/dentist-dashboard';
import { Appointment } from './layout/appointment/appointment';
import { authGuard } from './Guards/Auth-guard';
import { NotificationsComponent } from './layout/notifications/notifications.component';
import { AdminComponent } from './layout/admin/admin.component';

export const routes: Routes = [
  {
    path:"",
    component: DentistDashboard,
    canActivate:[authGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'appointment',
    component: Appointment,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[authGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

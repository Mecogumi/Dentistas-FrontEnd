import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { DentistDashboard } from './layout/dentist-dashboard/dentist-dashboard';
import { Appointment } from './layout/appointment/appointment';
import { PatientDashboard } from './layout/patient-dashboard/patient-dashboard';
import { authGuard } from './Guards/Auth-guard';

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
    path: '**',
    redirectTo: ''
  }
];

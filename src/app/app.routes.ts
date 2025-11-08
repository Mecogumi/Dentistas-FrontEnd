import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { DentistDashboard } from './layout/dentist-dashboard/dentist-dashboard';
import { Appointment } from './layout/appointment/appointment';
import { authGuard } from './Guards/Auth-guard';
import { CrudDentists } from './layout/crud-dentists/crud-dentists';
import { CrudPatient } from './layout/crud-patient/crud-patient';
import { CrudAppointments } from './layout/crud-appointments/crud-appointments';
import { NotificationsComponent } from './layout/notifications/notifications.component';

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
    path: 'admin/pacientes',
    component: CrudPatient,
  },
  {
    path: 'admin/medicos',
    component: CrudDentists,
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

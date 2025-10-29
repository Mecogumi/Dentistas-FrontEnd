import { Routes } from '@angular/router';
import { MakeAppointmentComponent } from './layout/make-appointment/make-appointment.component';
import { ChooseDentistComponent } from './layout/make-appointment/choose-dentist/choose-dentist.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { DentistDashboard } from './layout/dentist-dashboard/dentist-dashboard';

export const routes: Routes = [
  {
    path: '', // Sets HomeComponent as the new landing page
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
    component: MakeAppointmentComponent,
    children: [
      {
        path: 'dentists',
        component: ChooseDentistComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DentistDashboard
  },
  {
    path: '**',
    redirectTo: ''
  },
];

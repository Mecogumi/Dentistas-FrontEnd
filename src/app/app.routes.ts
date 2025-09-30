import { Routes } from '@angular/router';
import { MakeAppointmentComponent } from './layout/make-appointment/make-appointment.component';
import { ChooseDentistComponent } from './layout/make-appointment/choose-dentist/choose-dentist.component';

export const routes: Routes = [
  {
    path: 'appointment',
    component: MakeAppointmentComponent,
    children: [
      {
        path: 'dentists',
        component: ChooseDentistComponent
      }
    ]
  }
];

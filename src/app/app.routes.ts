import { Routes } from '@angular/router';
import { MakeAppointmentComponent } from './layout/make-appointment/make-appointment.component';
import { ChooseDentistComponent } from './layout/make-appointment/choose-dentist/choose-dentist.component';
import { HomeComponent } from './layout/home/home.component';

// export const routes: Routes = [
//   {
//     path: 'home',
//     component: HomeComponent
//   },
//   {
//     path: 'appointment',
//     component: MakeAppointmentComponent,
//     children: [
//       {
//         path: 'dentists',
//         component: ChooseDentistComponent
//       }

//     ]
//   },
//   {
//     path: '**',
//     redirectTo: 'home'
//   }, 
// ];
export const routes: Routes = [
  {
    path: '', // Sets HomeComponent as the new landing page
    component: HomeComponent,
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
  }
];

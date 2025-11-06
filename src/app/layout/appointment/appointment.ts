import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Footer } from "../../shared/components/footer/footer";
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { DateColumn } from '../../shared/components/appointments/date-column/date-column';

@Component({
  selector: 'app-appointment',
  imports: [NavbarComponent, Footer, DateColumn],
  templateUrl: './appointment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointment {

  todayDate = new Date();
  tomorrowDate = new Date().setDate(this.todayDate.getDate()+1);
  afterTomorrowDate = new Date().setDate(this.todayDate.getDate()+2);
  afterAfterTomorrowDate = new Date().setDate(this.todayDate.getDate()+3);

  getDay(date:Date){
    return date.toLocaleDateString('es-ES', {weekday: 'long'});
  }
 }


import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateColumn } from '../../shared/components/appointments/date-column/date-column';

@Component({
  selector: 'app-appointment',
  imports: [ DateColumn],
  templateUrl: './appointment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointment {
  todayDate = new Date();
  dateFixed = (num:number) =>{
    const day = new Date(this.todayDate);
    day.setDate(day.getDate() + num);
    return day;
  }

  getDay(date:Date){
    const day = date.toLocaleDateString('es-ES', { weekday: 'long' });
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  confirmDate(date:Date){
    console.log(date)
  }
 }


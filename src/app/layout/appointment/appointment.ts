import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DateColumn } from '../../shared/components/appointments/date-column/date-column';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  imports: [ DateColumn, ReactiveFormsModule],
  templateUrl: './appointment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointment {
  private appointmentService = inject(AppointmentService)
  private router = inject(Router)

  todayDate = new Date();
  tomorrowDate = this.addDays(this.todayDate, 1);
  day2Date = this.addDays(this.todayDate, 2);
  day3Date = this.addDays(this.todayDate, 3);
  pickedDay = signal<Date|null>(null)

  reasonForm = new FormGroup({
    reason: new FormControl('', [Validators.required])
  });

  private addDays(base: Date, days: number) {
    const day = new Date(base);
    day.setDate(day.getDate() + days);
    return day;
  }

  getDay(date:Date){
    const day = date.toLocaleDateString('es-ES', { weekday: 'long' });
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  confirmDate(date:Date){
    this.pickedDay.set(date);
  }

  onSubmit(){
    if(this.reasonForm.valid){
      this.appointmentService.requestAppointmen(this.pickedDay()!,this.reasonForm.value.reason!).subscribe({
        next: r => {
          console.log(r);
          const modal = document.getElementById('my_modal') as HTMLDialogElement;
          modal?.close();
          this.router.navigateByUrl("/")
        }
      })
    }
  }

 }


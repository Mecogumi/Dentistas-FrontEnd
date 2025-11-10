import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DateColumn } from '../../shared/components/appointments/date-column/date-column';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { Auth } from '../../services/auth';
import { RequestDentist } from '../../interfaces/requestDentist.intterface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment',
  imports: [ DateColumn, ReactiveFormsModule],
  templateUrl: './appointment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointment {
  private appointmentService = inject(AppointmentService)
  private authService = inject(Auth)
  private router = inject(Router)
  private location = inject(Location);

  todayDate = new Date();
  tomorrowDate = this.addDays(this.todayDate, 1);
  day2Date = this.addDays(this.todayDate, 2);
  day3Date = this.addDays(this.todayDate, 3);
  requestDentist = signal<RequestDentist>({})

  dentistResource = rxResource({
    params: ()=>({}),
    stream: ()=> this.authService.getActiveDentist()
  })

  reasonForm = new FormGroup({
    reason: new FormControl('', [Validators.required]),
    visitType: new FormControl('', [Validators.required]),
    notes: new FormControl<string | null>('')
  });

  private addDays(base: Date, days: number) {
    const day = new Date(base);
    day.setDate(day.getDate() + days);
    return day;
  }

  goBack(){
    this.location.back();
  }

  getDay(date:Date){
    const day = date.toLocaleDateString('es-ES', { weekday: 'long' });
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  confirmDate(event:RequestDentist){
    this.requestDentist.set(event)
  }

  onSubmit(){
    if(this.reasonForm.valid){
      let emitDentist = this.requestDentist()
      emitDentist.notes = this.reasonForm.value.notes || this.reasonForm.value.reason!;
      emitDentist.type= this.reasonForm.value.visitType!;
      this.appointmentService.requestAppointmen(this.requestDentist()).subscribe({
        next: r => {
          console.log(r);
          const modal = document.getElementById('my_modal') as HTMLDialogElement;
          modal?.close();
          this.router.navigateByUrl("/")
        },
        error: r =>{
          const modal = document.getElementById('my_modal') as HTMLDialogElement;
          modal?.close();
          window.alert("Error al generar cita")
        }
      })
    }
  }

 }



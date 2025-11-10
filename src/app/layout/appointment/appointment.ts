import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
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
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild('successModal') successModal!: ElementRef<HTMLDialogElement>;
  
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

  getDentistName(dentistId: number): string {
    const dentist = this.dentistResource.value()?.data?.dentists?.find(d => d.id === dentistId);
    return dentist?.name || 'No encontrado';
  }

  formatAppointmentDate(): string {
    if (!this.requestDentist().date) return '';
    
    const date = new Date(this.requestDentist().date!);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    const formatted = date.toLocaleDateString('es-ES', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  getVisitTypeLabel(): string {
    const types: {[key: string]: string} = {
      'first_visit': 'Primera visita',
      'follow_up': 'Seguimiento',
      'emergency': 'Emergencia',
      'cleaning': 'Limpieza',
      'treatment': 'Control'
    };
    return types[this.reasonForm.value.visitType || ''] || '';
  }

  onSubmit(){
    if(this.reasonForm.valid){
      let emitDentist = this.requestDentist()
      emitDentist.notes = this.reasonForm.value.notes || '';
      emitDentist.type= this.reasonForm.value.visitType!;
      
      this.appointmentService.requestAppointmen(this.requestDentist()).subscribe({
        next: r => {
          console.log(r);
          const modal = document.getElementById('my_modal') as HTMLDialogElement;
          modal?.close();
          
          // Mostrar modal de éxito
          const successModal = document.getElementById('success_modal') as HTMLDialogElement;
          successModal?.showModal();
        },
        error: e => {
          console.error('Error al agendar cita:', e);
          alert('Hubo un error al agendar la cita. Por favor intenta de nuevo.');
        }
      })
    }
  }

  closeAndNavigate() {
    const successModal = document.getElementById('success_modal') as HTMLDialogElement;
    successModal?.close();
    this.router.navigateByUrl("/");
  }
}
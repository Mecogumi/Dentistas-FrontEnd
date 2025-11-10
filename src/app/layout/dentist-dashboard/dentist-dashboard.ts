import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, signal, effect } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { rxResource } from '@angular/core/rxjs-interop';
import { AppointmentService } from '../../services/appointment.service';
import { DatePipe } from '@angular/common';
import { Auth } from '../../services/auth';
import { AppointmenteStatusPipe } from '../../shared/pipes/appointmenteStatus-pipe';
import { RouterLink } from "@angular/router";

const bPoint700px = '(max-width: 700px)';
const bPoint600px = '(max-width: 600px)';

@Component({
  selector: 'app-dentist-dashboard',
  imports: [DatePipe, AppointmenteStatusPipe, RouterLink],
  templateUrl: './dentist-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DentistDashboard implements OnInit {
  private cd = inject(ChangeDetectorRef);
  private appointmentService = inject(AppointmentService);
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(Auth);

  role = signal<string>("");
  date = signal<Date>(new Date());
  screenWidth700px = signal<boolean>(false);
  screenWidth600px = signal<boolean>(false);
  private appointmentToCancel = signal<number>(0);
  private appointmentToComplete = signal<number>(0);

  // Recurso para las citas del día seleccionado
  rxresoruce = rxResource({
    params: () => this.date(),
    stream: ({ params }) => this.appointmentService.getAppointmentByDay(params),
  });

  // Recurso para las próximas citas (siguientes 30 días)
  upcomingAppointmentsResource = rxResource({
    params: () => ({}),
    stream: () => this.appointmentService.getUpcomingAppointments(),
  });

  constructor() {
    // Efecto para refrescar el template cuando los datos de próximas citas cambien
    effect(() => {
      const data = this.upcomingAppointmentsResource.value();
      if (data) {
        this.cd.markForCheck();
      }
    });
  }

  ngOnInit() {
    // Rol del usuario
    this.role.set(this.authService.getUser().data.user.role);

    // Detección de breakpoints
    this.breakpointObserver
      .observe([bPoint700px, bPoint600px])
      .subscribe((x) => {
        this.screenWidth700px.set(x.breakpoints[bPoint700px]);
        this.screenWidth600px.set(x.breakpoints[bPoint600px]);
      });
  }

  nextDay() {
    const current = this.date();
    const next = new Date(current);
    next.setDate(current.getDate() + 1);
    this.date.set(next);
  }

  prevDay() {
    const current = this.date();
    const prev = new Date(current);
    prev.setDate(current.getDate() - 1);
    this.date.set(prev);
  }

  goToToday() {
    this.date.set(new Date());
  }

  onStatusChange(event: Event, appointmentID: number) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    // Aquí podrías manejar un cambio de estado de cita si lo implementas después
  }

  setAppointCancel(id: number) {
    this.appointmentToCancel.set(id);
  }

  setAppointComplete(id: number) {
    this.appointmentToComplete.set(id);
  }

  onCancelAppointment() {
    const modal = document.getElementById('my_modal_cancel') as HTMLDialogElement;
    if (this.appointmentToCancel() !== 0) {
      this.appointmentService.cancelAppointment(this.appointmentToCancel()).subscribe({
        next: () => {
          modal?.close();
          this.rxresoruce.reload();
          this.upcomingAppointmentsResource.reload();
          this.cd.markForCheck();
        },
      });
    }
  }

  onCompleteAppointment() {
    const modal = document.getElementById('my_modal_complete') as HTMLDialogElement;
    if (this.appointmentToComplete() !== 0) {
      this.appointmentService.completeAppointment(this.appointmentToComplete()).subscribe({
        next: () => {
          modal?.close();
          this.rxresoruce.reload();
          this.upcomingAppointmentsResource.reload();
          this.cd.markForCheck();
        },
      });
    }
  }
}

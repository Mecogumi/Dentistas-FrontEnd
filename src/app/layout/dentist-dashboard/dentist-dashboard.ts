import { ChangeDetectionStrategy, Component, inject, OnInit, resource, signal } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout'
import {rxResource} from '@angular/core/rxjs-interop'
import { AppointmentService } from '../../services/appointment.service';
import { DatePipe } from '@angular/common';
import { Auth } from '../../services/auth';
import { AppointmenteStatusPipe } from '../../shared/pipes/appointmenteStatus-pipe';

const bPoint700px = '(max-width: 700px)';
const bPoint600px = '(max-width: 600px)';

@Component({
  selector: 'app-dentist-dashboard',
  imports: [DatePipe,AppointmenteStatusPipe],
  templateUrl: './dentist-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DentistDashboard implements OnInit {
  authService = inject(Auth)
  role = signal<string>("")
  private breakpointObserver = inject(BreakpointObserver);
  date = signal<Date>(new Date())
  private appointmentService = inject(AppointmentService)
  private appointmentToCancel = signal<number>(0)
  
  rxresoruce = rxResource({
    params: ()=>(this.date()),
    stream: ({params}) => this.appointmentService.getAppointmentByDay(params)
  })

  
  screenWidth700px = signal<boolean>(false);
  screenWidth600px = signal<boolean>(false);


  ngOnInit() {
    this.role.set(this.authService.getUser().data.user.role);
    this.breakpointObserver
      .observe([bPoint700px, bPoint600px])
      .subscribe(x => {
        this.screenWidth700px.set(x.breakpoints[bPoint700px]);
        this.screenWidth600px.set(x.breakpoints[bPoint600px]);
      });
  }

  nextDay(){
    const current = this.date();
    const next = new Date(current);
    next.setDate(current.getDate() + 1);
    this.date.set(next); 
  }

  prevDay(){
    const current = this.date();
    const prev = new Date(current);
    prev.setDate(current.getDate() - 1);
    this.date.set(prev); 
  }

  onStatusChange(event: Event, appointmentID: number) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  }

  setAppointCancel(id:number){
    this.appointmentToCancel.set(id)
  }

  onCancelAppointment(){
    const modal = document.getElementById('my_modal_cancel') as HTMLDialogElement;
    if (this.appointmentToCancel()!=0){
      this.appointmentService.cancelAppointment(this.appointmentToCancel()).subscribe({
        next: r=>{
          modal?.close();
          this.rxresoruce.reload()
        } 
      })

    }
  }

}

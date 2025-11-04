import { afterNextRender, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout'
import { Footer } from '../../shared/components/footer/footer';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import {rxResource} from '@angular/core/rxjs-interop'
import { Appointment } from '../../services/appointment';
import { DatePipe } from '@angular/common';
import { Auth } from '../../services/auth';
import { RouterLink } from '@angular/router';

const bPoint700px = '(max-width: 700px)';
const bPoint600px = '(max-width: 600px)';

@Component({
  selector: 'app-dentist-dashboard',
  imports: [Footer, NavbarComponent,DatePipe],
  templateUrl: './dentist-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DentistDashboard implements OnInit {
  authService = inject(Auth)
  role = signal<string>("")
  private breakpointObserver = inject(BreakpointObserver);
  date = signal<Date>(new Date(2025, 11, 25))
  private appointmentService = inject(Appointment)
  rxresoruce = rxResource({
    params: ()=>(this.date()),
    stream: ({params}) => this.appointmentService.getAppointmentByDay(params)
  })

  
  screenWidth700px = signal<boolean>(false);
  screenWidth600px = signal<boolean>(false);


  async ngOnInit(): Promise<void> {
    this.role.set(await this.authService.getUserRol());
    this.breakpointObserver
      .observe([bPoint700px, bPoint600px])
      .subscribe(x => {
        this.screenWidth700px.set(x.breakpoints[bPoint700px]);
        this.screenWidth600px.set(x.breakpoints[bPoint600px]);
      });
  }

}

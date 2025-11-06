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
export class Appointment { }


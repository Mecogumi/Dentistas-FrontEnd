import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Footer } from "../../shared/components/footer/footer";
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-appointment',
  imports: [NavbarComponent, Footer],
  templateUrl: './appointment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointment { }


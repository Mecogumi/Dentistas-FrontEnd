import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PatientNav } from "../../shared/components/patient-navbar/patient-nav";
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-appointment',
  imports: [PatientNav, Footer],
  templateUrl: './appointment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointment { }


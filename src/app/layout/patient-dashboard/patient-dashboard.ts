import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PatientNav } from '../../shared/components/patient-navbar/patient-nav';
import { Footer } from "../../shared/components/footer/footer";

@Component({
  standalone: true,
  selector: 'app-patient-dashboard',
  imports: [PatientNav, Footer],
  templateUrl: './patient-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDashboard { }

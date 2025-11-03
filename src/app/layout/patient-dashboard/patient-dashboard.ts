import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Footer } from "../../shared/components/footer/footer";
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-patient-dashboard',
  imports: [NavbarComponent, Footer],
  templateUrl: './patient-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDashboard { }

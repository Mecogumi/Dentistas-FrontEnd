import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-nav',
  imports: [RouterLink],
  templateUrl: './patient-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientNav { }

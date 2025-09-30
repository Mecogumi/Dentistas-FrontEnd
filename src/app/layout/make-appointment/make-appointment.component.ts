import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChooseDayComponent } from './choose-day/choose-day.component';
@Component({
  selector: 'app-make-appointment',
  imports: [RouterOutlet, ChooseDayComponent],
  templateUrl: './make-appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeAppointmentComponent { }

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Dentist } from '../../../interfaces/dentist-interface';

@Component({
  selector: 'app-dentist-card',
  imports: [],
  templateUrl: './dentist-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DentistCardComponent {

  dentist = input<Dentist>()
  name = input<string>()

}

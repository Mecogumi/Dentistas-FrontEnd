import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DentistCardComponent } from '../../../shared/components/dentist-card/dentist-card.component';

@Component({
  selector: 'app-choose-dentist',
  imports: [DentistCardComponent],
  templateUrl: './choose-dentist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseDentistComponent { }

import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-date-column',
  imports: [],
  templateUrl: './date-column.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateColumn { 
  dia=input.required<string>()

  
}

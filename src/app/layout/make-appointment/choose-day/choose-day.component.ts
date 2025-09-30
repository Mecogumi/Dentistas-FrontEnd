import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';
import { DateAdapter, provideCalendar, CalendarMonthViewComponent, CalendarEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarMonth } from 'cally';


@Component({
  selector: 'app-choose-day',
  imports: [CalendarMonthViewComponent],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  templateUrl: './choose-day.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseDayComponent {
  viewDate = new Date();

  dayclick(day: CalendarMonthViewDay) {
    console.log(day)
  }
}

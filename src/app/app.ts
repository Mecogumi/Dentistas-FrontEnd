import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateAdapter, provideCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class App {

}

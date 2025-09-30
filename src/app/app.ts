import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DateAdapter, provideCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
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


  // protected readonly title = signal('Dentistas-FrontEnd');

  // httpClient = inject(HttpClient)
  // resource = rxResource({
  //   params: () => ({}),
  //   stream: (params) => this.httpClient.get("http://localhost:3001/dentistas/dentrificos/oralB").pipe(
  //     tap(res => {
  //       console.log(res)
  //     }),
  //     catchError(err => {
  //       console.error(err);
  //       return of(null);
  //     })
  //   )
  // })



}

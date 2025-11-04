import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Appointments } from '../interfaces/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class Appointment {
  private http = inject(HttpClient)

  getAppointmentByDay(date:Date):Observable<Appointments>{
    const dd = date.getDate();
    const nexday = dd+1;
    const mm = date.getMonth()+1;
    const yyyy = date.getFullYear();
    const startDate = yyyy+"/"+mm+"/"+dd;
    const endDate = yyyy+"/"+mm+"/"+nexday;
    const url = environment.API_URL+"/appointments";
    let params = new HttpParams();
    console.log(startDate);
    console.log(endDate);
    params = params.set("startDate",startDate);
    params = params.set("endDate",endDate);
    return this.http.get<Appointments>(url,{params:params});
  }

}

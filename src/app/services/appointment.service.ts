import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Appointments } from '../interfaces/appointment.interface';
import { OccupiedAppointments } from '../interfaces/ocuppiedAppointments';
import { RequestDentist } from '../interfaces/requestDentist.intterface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
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

  getOcuppiedAppointmentts(date:Date):Observable<OccupiedAppointments>{
    const dd = date.getDate();
    const nexday = dd+1;
    const mm = date.getMonth()+1;
    const yyyy = date.getFullYear();
    const startDate = yyyy+"/"+mm+"/"+dd;
    const endDate = yyyy+"/"+mm+"/"+nexday;
    const url = environment.API_URL+"/appointments/occupied-slots";
    let params = new HttpParams();
    console.log(startDate);
    console.log(endDate);
    params = params.set("startDate",startDate);
    params = params.set("endDate",endDate);
    return this.http.get<OccupiedAppointments>(url,{params:params});
  }

  requestAppointmen(request:RequestDentist){
    const url = environment.API_URL+"/appointments";
    return this.http.post(url,request)
  }

  cancelAppointment(id: number):Observable<Appointments> {
    const url = `${environment.API_URL}/appointments/${id}/cancel`;
    return this.http.patch<Appointments>(url, {});
  }

  completeAppointment(id: number): Observable<Appointments> {
    const url = `${environment.API_URL}/appointments/${id}/complete`;
    return this.http.patch<Appointments>(url, {});
  }


}

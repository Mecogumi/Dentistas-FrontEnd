import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {  AppointmentService } from '../../../../services/appointment.service';
import { OccupiedSlot } from '../../../../interfaces/ocuppiedAppointments';

@Component({
  selector: 'app-date-column',
  imports: [],
  templateUrl: './date-column.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateColumn implements OnInit {
  
  hours =[9,10,11,12,13,14,15,16]
  
  dia=input.required<string>()
  date= input.required<Date>()
  appointmentDate = output<Date>()
  private appointmentSerivce = inject(AppointmentService)

  
  rxResource = rxResource({
    params: ()=>(this.date()),
    stream: ({params})=> this.appointmentSerivce.getOcuppiedAppointmentts(params)
  })

  ngOnInit(): void {
    this.rxResource.reload()
  }

  isOccupied(hour: number): boolean {
    const resource = this.rxResource.value();
    if (!resource?.data?.occupiedSlots) return false;
    return resource.data.occupiedSlots.some((slot: OccupiedSlot) => {
      const slotDate = new Date(slot.date);
      return slotDate.getHours() == hour;
    });
  }

  clickDay(hour: number) {
    const baseDate = new Date(this.date());
    const appointmentDate = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      hour,
      0,    
      0     
    );
    this.appointmentDate.emit(appointmentDate);
  }

}

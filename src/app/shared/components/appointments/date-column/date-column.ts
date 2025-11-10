import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {  AppointmentService } from '../../../../services/appointment.service';
import { OccupiedSlot } from '../../../../interfaces/ocuppiedAppointments';
import { RequestDentist } from '../../../../interfaces/requestDentist.intterface';



@Component({
  selector: 'app-date-column',
  imports: [],
  templateUrl: './date-column.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateColumn implements OnInit {
  
  hours =[8,9,10,11,12,13,14,15,16]
  
  dentistID = input.required<number>()
  dia=input.required<string>()
  date= input.required<Date>()
  appointmentEmit = output<RequestDentist>()
  private appointmentSerivce = inject(AppointmentService)

  
  rxResource = rxResource({
    params: ()=>(this.date()),
    stream: ({params})=> this.appointmentSerivce.getOcuppiedAppointmentts(params)
  })

  ngOnInit(): void {
    this.rxResource.reload()
  }

  isOccupied(hour: number): boolean {
    const now = new Date();
    const baseDate = new Date(this.date());
    const slotStart = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      hour,
      0,
      0
    );
    if (slotStart.getTime() < now.getTime()) {
      return true;
    }
    const resource = this.rxResource.value();
    if (!resource?.data?.occupiedSlots) return false;
    return resource.data.occupiedSlots.some((slot: OccupiedSlot) => {
      const slotDate = new Date(slot.date);
      return (
        slotDate.getFullYear() === baseDate.getFullYear() &&
        slotDate.getMonth() === baseDate.getMonth() &&
        slotDate.getDate() === baseDate.getDate() &&
        slotDate.getHours() === hour &&
        slot.dentistId === this.dentistID()
      );
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
    this.appointmentEmit.emit({date:appointmentDate,dentistId:this.dentistID()});
  }

}


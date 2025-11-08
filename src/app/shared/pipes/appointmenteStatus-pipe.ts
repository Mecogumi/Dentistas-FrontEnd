import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appAppointmenteStatus',
})
export class AppointmenteStatusPipe implements PipeTransform {

  transform(value: string): string {
    let status:string=''
    switch(value){
      case 'scheduled':
        status='Pendiente'
        break
      case 'completed':
        status='Completada'
        break
      case 'cancelled':
        status='Cancelada'
    }
    return status;
  }

}

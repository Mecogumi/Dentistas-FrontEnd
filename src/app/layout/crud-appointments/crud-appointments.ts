import { Component } from '@angular/core';
import { EntityListComponent } from '../../shared/components/entity-list/entity-list.component';

@Component({
	selector: 'app-crud-appointments',
	standalone: true,
	imports: [EntityListComponent],
	templateUrl: './crud-appointments.html',
})
export class CrudAppointments {
	columns = ['date', 'time', 'patientName', 'dentistName', 'status'];
	// empty array — you will wire your service here
	items: any[] = [];
}

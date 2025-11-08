import { Component } from '@angular/core';
import { EntityListComponent } from '../../shared/components/entity-list/entity-list.component';


@Component({
	selector: 'app-crud-patient',
	standalone: true,
	imports: [EntityListComponent],
	templateUrl: './crud-patient.html',
})
export class CrudPatient {
	columns = ['firstName', 'lastName', 'email', 'phone'];
	items: any[] = [];
}

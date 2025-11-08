import { Component } from '@angular/core';
import { EntityListComponent } from '../../shared/components/entity-list/entity-list.component';

@Component({
	selector: 'app-crud-dentists',
	standalone: true,
	imports: [EntityListComponent],
	templateUrl: './crud-dentists.html',
})
export class CrudDentists {
	columns = ['firstName', 'lastName', 'specialty', 'email'];
	items: any[] = [];
}

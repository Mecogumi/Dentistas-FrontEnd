import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './entity-list.component.html',
})
export class EntityListComponent {
  @Input() title = '';
  @Input() columns: string[] = [];
  @Input() items: any[] = [];
  @Input() routerPrefix = '';
  @Input() idKey = 'id';

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() del = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();

  query = '';

  get filteredItems() {
    const q = this.query?.toLowerCase()?.trim();
    if (!q) return this.items || [];
    return (this.items || []).filter((item) =>
      this.columns.some((col) => {
        const val = item?.[col];
        return val !== undefined && String(val).toLowerCase().includes(q);
      })
    );
  }

  onAdd() {
    this.add.emit();
  }

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.del.emit(item);
  }

  onView(item: any) {
    this.view.emit(item);
  }
}

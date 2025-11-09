import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserAdminService } from '../../services/user-admin.service';
import { AdminUser } from '../../interfaces/users.interface';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  private userAdminService = inject(UserAdminService);
  private auth = inject(Auth);
  private router = inject(Router);

  search = signal<string>('');
  selectedUserId = signal<number | null>(null);
  usersCache = signal<AdminUser[]>([]);

  usersResource = rxResource({
    params: () => this.search(),
    stream: ({ params }) => this.userAdminService.getUsers(params)
  });

  ngOnInit(): void {
    const me = this.auth.getUser();
    if (!me?.data?.user || me.data.user.role !== 'admin') {
      this.router.navigateByUrl('');
      return;
    }

    this.usersResource.reload()
  }

  onSearchInput(value: string) {
    this.search.set(value);
  }

  toggleActive(user: AdminUser) {
    this.userAdminService.setActive(user.id, !user.isActive).subscribe({
      next: () => this.usersResource.reload()
    });
  }

  askDelete(id: number) {
    this.selectedUserId.set(id);
    const dlg = document.getElementById('delete_user_modal') as HTMLDialogElement;
    dlg?.showModal();
  }

  confirmDelete() {
    const id = this.selectedUserId();
    if (!id) return;
    this.userAdminService.deleteUser(id).subscribe({
      next: () => {
        (document.getElementById('delete_user_modal') as HTMLDialogElement)?.close();
        this.selectedUserId.set(null);
        this.usersResource.reload();
      }
    });
  }

  goToDashboard() {
    this.router.navigateByUrl('');
  }

  createForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    role: new FormControl<'patient' | 'dentist' | 'admin'>('patient', { nonNullable: true }),
    specialty: new FormControl<string | null>('')
  });

  openCreateModal() {
    const dlg = document.getElementById('create_user_modal') as HTMLDialogElement | null;
    dlg?.showModal();
  }

  closeCreateModal() {
    const dlg = document.getElementById('create_user_modal') as HTMLDialogElement | null;
    dlg?.close();
  }

  submitCreate() {
    if (this.createForm.invalid) return;
    const v = this.createForm.value;
    const payload: any = {
      name: v.name!,
      email: v.email!,
      phone: v.phone!,
      password: v.password!,
      role: v.role!
    };
    if (v.role === 'dentist' && v.specialty) {
      payload.specialty = v.specialty;
    }
    this.userAdminService.createUser(payload).subscribe({
      next: () => {
        this.closeCreateModal();
        this.createForm.reset({ role: 'patient' });
        this.usersResource.reload();
      }
    });
  }
}

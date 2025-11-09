import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { MedicalRecordsService } from '../../services/medical-records.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-medical-records',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medical-records.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalRecordsComponent {
  private auth = inject(Auth);
  private medicalRecordsService = inject(MedicalRecordsService);
  private location = inject(Location);
  private route = inject(ActivatedRoute);



  paramPatientId = toSignal(this.route.paramMap.pipe(
    map(pm => {
      const v = pm.get('patientId');
      return v ? Number(v) : null;
    })
  ), { initialValue: null });
  patientId = computed(() => this.paramPatientId());
  role = computed(() => this.auth.getUser().data.user.role);


  recordsResource = rxResource({
    params: () => this.patientId(),
    stream: ({ params }) => this.medicalRecordsService.getByPatient(params!) 
  });

  form = new FormGroup({
    diagnosis: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    treatment: new FormControl<string | null>(''),
    prescriptions: new FormControl<string | null>(''),
    notes: new FormControl<string | null>(''),
  });

  openAddModal() {
    const dlg = document.getElementById('add_medical_record_modal') as HTMLDialogElement | null;
    dlg?.showModal();
  }

  closeAddModal() {
    const dlg = document.getElementById('add_medical_record_modal') as HTMLDialogElement | null;
    dlg?.close();
  }

  submit() {
    if (this.form.invalid) return;
    const pid = this.patientId();
    if (!pid) return;
    const payload = {
      patientId: pid,
      diagnosis: this.form.controls.diagnosis.value!,
      treatment: this.form.controls.treatment.value ?? undefined,
      prescriptions: this.form.controls.prescriptions.value ?? undefined,
      notes: this.form.controls.notes.value ?? undefined,
    };
    this.medicalRecordsService.create(payload).subscribe({
      next: () => {
        this.closeAddModal();
        this.form.reset();
        this.recordsResource.reload()
      }
    });
  }

  goBack(){
    this.location.back();
  }
}

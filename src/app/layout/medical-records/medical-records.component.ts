import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Auth } from '../../services/auth';
import { rxResource } from '@angular/core/rxjs-interop';
import { MedicalRecordsService } from '../../services/medical-records.service';

@Component({
  standalone: true,
  selector: 'app-medical-records',
  imports: [CommonModule],
  templateUrl: './medical-records.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalRecordsComponent {
  private auth = inject(Auth);
  private medicalRecordsService = inject(MedicalRecordsService);
  private location = inject(Location);

  profileResource = rxResource({
    params: () => ({}),
    stream: () => this.auth.profile(),
  });

  patientId = computed(() => this.profileResource.value()?.data.user.id ?? null);

  recordsResource = rxResource({
    params: () => this.patientId(),
    stream: ({ params }) =>this.medicalRecordsService.getByPatient(18)
  });

  goBack(){
    this.location.back();
  }
}

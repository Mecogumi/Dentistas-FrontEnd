import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MedicalRecordListResponse, MedicalRecordResponse } from '../interfaces/medical-record.interface';

@Injectable({ providedIn: 'root' })
export class MedicalRecordsService {
  private http = inject(HttpClient);

  getByPatient(patientId: number): Observable<MedicalRecordListResponse> {
    const url = `${environment.API_URL}/medical-records/patient/${patientId}`;
    return this.http.get<MedicalRecordListResponse>(url);
  }

  getById(id: number): Observable<MedicalRecordResponse> {
    const url = `${environment.API_URL}/medical-records/${id}`;
    return this.http.get<MedicalRecordResponse>(url);
  }

  create(payload: {
    patientId: number;
    diagnosis: string;
    treatment?: string | null;
    prescriptions?: string | null;
    notes?: string | null;
  }): Observable<MedicalRecordResponse> {
    const url = `${environment.API_URL}/medical-records`;
    return this.http.post<MedicalRecordResponse>(url, payload);
  }
}

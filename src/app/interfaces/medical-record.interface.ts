export interface MedicalRecordListResponse {
  success: boolean;
  data: {
    medicalRecords: MedicalRecord[];
  };
}

export interface MedicalRecordResponse {
  success: boolean;
  data: {
    medicalRecord: MedicalRecord;
  };
}

export interface MedicalRecord {
  id: number;
  patientId: number;
  diagnosis: string;
  treatment?: string | null;
  prescriptions?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}


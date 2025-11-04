export interface Appointments {
    success: boolean;
    data:    Data;
}

export interface Data {
    appointments: Appointment[];
    total:        number;
    page:         number;
    totalPages:   number;
}

export interface Appointment {
    id:        number;
    patientId: number;
    dentistId: number;
    date:      Date;
    status:    string;
    reason:    string;
    notes:     string;
    createdAt: Date;
    updatedAt: Date;
    patient:   Dentist;
    dentist:   Dentist;
}

export interface Dentist {
    id:         number;
    name:       string;
    email:      string;
    phone:      string;
    specialty?: string;
}

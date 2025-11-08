export interface OccupiedAppointments {
    success: boolean;
    data:    Data;
}

export interface Data {
    occupiedSlots: OccupiedSlot[];
    total:         number;
    message:       string;
}

export interface OccupiedSlot {
    appointmentId: number;
    dentistId:     number;
    dentistName:   string;
    date:          Date;
    status:        string;
    available:     boolean;
}



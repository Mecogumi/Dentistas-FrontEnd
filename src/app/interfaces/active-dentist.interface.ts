export interface ActiveDentist {
    success: boolean;
    data:    Data;
}

export interface Data {
    dentists: Dentist[];
    total:    number;
    message:  string;
}

export interface Dentist {
    id:        number;
    name:      string;
    email:     string;
    phone:     string;
    specialty: string;
    isActive:  boolean;
}

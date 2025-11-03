export interface Profile {
    success: boolean;
    data:    Data;
}

export interface Data {
    user: User;
}

export interface User {
    id:        number;
    name:      string;
    email:     string;
    role:      string;
    phone:     string;
    isActive:  boolean;
    createdAt: Date;
    updatedAt: Date;
}

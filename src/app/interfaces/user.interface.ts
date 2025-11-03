export interface User {
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    user:  UserClass;
    token: string;
}

export interface UserClass {
    id:    number;
    name:  string;
    email: string;
    phone: string;
    role:  string;
}

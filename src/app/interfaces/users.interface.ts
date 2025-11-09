export interface UsersResponse {
  success: boolean;
  data: UsersData;
}

export interface UsersData {
  users: AdminUser[];
  total: number;
  message?: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'dentist' | 'patient';
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}


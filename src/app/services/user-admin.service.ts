import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsersResponse } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {
  private http = inject(HttpClient);

  getUsers(query?: string): Observable<UsersResponse> {
    const url = `${environment.API_URL}/auth/users`;
    const params = query ? { params: { q: query } } : {};
    return this.http.get<UsersResponse>(url, params);
  }

  setActive(id: number, isActive: boolean): Observable<{ success: boolean }>{
    const url = `${environment.API_URL}/auth/user/${id}/deactivate`;
    return this.http.patch<{ success: boolean }>(url, { isActive });
  }

  deleteUser(id: number): Observable<{ success: boolean }> {
    const url = `${environment.API_URL}/auth/user/${id}`;
    return this.http.delete<{ success: boolean }>(url);
  }

  createUser(payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: 'patient' | 'dentist' | 'admin';
    specialty?: string | null;
  }): Observable<any> {
    const url = `${environment.API_URL}/auth/register`;
    return this.http.post(url, payload);
  }
}

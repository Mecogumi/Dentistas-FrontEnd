import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient)

  login(email:string, password:string):Observable<User>{
    const loginUrl = environment.API_URL+"/auth/login"
    console.log(loginUrl)
    return this.http.post<User>(loginUrl,{email,password}).pipe(
      tap(user => {localStorage.setItem("token", user.data.token);})
    );
  }

  profile():Observable<Profile>{
    return this.http.get<Profile>(environment.API_URL+"/auth/profile");
  }

  logout(){
    localStorage.removeItem("token");
    window.location.href = '/home';
  }

  async getUserRol() {
    const req = await firstValueFrom(this.profile());
    return req.data.user.role;
  }

}

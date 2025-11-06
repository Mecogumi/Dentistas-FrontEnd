import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Profile } from '../interfaces/profile.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient)
  private router = inject(Router);

  login(email:string, password:string):Observable<User>{
    const loginUrl = environment.API_URL+"/auth/login"
    console.log(loginUrl)
    return this.http.post<User>(loginUrl,{email,password}).pipe(
      tap(user => {localStorage.setItem("user", JSON.stringify(user))})
    );
  }

  profile():Observable<Profile>{
    return this.http.get<Profile>(environment.API_URL+"/auth/profile");
  }

  logout(){
    localStorage.removeItem("user");
    window.location.href = '/home';
  }

  getUser() :User {
    const user = JSON.parse(localStorage.getItem("user")||JSON.stringify("Not logged in"));
    return user;
  }

  singupUser(user:UserSign):Observable<User>{
    const singUp = environment.API_URL+"/auth/register"
    return this.http.post<User>(singUp,user);
  }

}

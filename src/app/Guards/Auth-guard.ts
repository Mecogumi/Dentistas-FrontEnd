import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { Auth } from '../services/auth';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const isAuth = authService.getUser().success || false;
  if (isAuth){
    return true
  }
  else{
    router.navigateByUrl("/home")
    return false
  }
};

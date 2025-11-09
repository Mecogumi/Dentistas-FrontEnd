import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

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

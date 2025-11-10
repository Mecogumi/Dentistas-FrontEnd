import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth)
  const router = inject(Router)
  if (authService.getUser().data.user.role=='admin'){
    return true;
  }
  router.navigateByUrl("/")
  return false;
};

import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { Auth } from '../services/auth';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.profile().pipe(
    map(resp => {
      if (resp.success) {
        return true;
      } else {
        return router.createUrlTree(['/home']);
      }
    }),
    catchError(err => {
      console.error('Auth error', err);
      return of(router.createUrlTree(['/home']));
    })
  );
};

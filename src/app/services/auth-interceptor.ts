import type { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userData = localStorage.getItem("user");
  let newRequest = req;

  if (userData) {
    const user: User = JSON.parse(userData);
    const token = user?.data?.token;
    if (token) {
      newRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(newRequest);
};


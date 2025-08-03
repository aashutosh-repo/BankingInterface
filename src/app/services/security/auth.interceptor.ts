import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Oauth2Service } from './oauth2.service';
import { Router } from 'express';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const securityService = inject(Oauth2Service);
  const token = securityService.getToken();
  if(token){
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
   });
   return next(authReq).pipe(
    tap({
      error: (err) => {
        if(err.status == 401){
          localStorage.clear();
          inject(Router).navigate(['/login'])
        }
      }
    })
   );
  }
  return next(req);
};

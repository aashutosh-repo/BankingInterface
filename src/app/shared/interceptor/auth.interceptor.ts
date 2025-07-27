import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Oauth2Service } from '../../services/security/oauth2.service';

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
   return next(authReq);
  }
  return next(req);
};

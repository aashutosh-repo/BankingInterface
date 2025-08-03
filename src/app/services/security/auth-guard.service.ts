// import { isPlatformBrowser } from '@angular/common';
// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router,
//     @Inject(PLATFORM_ID) private platformId: object
//     ){}

//   canActivate(): boolean {
//     if (!isPlatformBrowser(this.platformId)) {
//       // Running on the server → deny navigation
//       return false;
//     }
//     const token = localStorage.getItem('jwtToken');
//     const expiresAt = localStorage.getItem('expiresAt');

//     if (token && expiresAt && new Date(expiresAt) > new Date()) {
//       return true; // session valid
//     }

//     this.router.navigate(['/login']);
//     return false;
//   }
// }

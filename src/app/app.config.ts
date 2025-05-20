import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
<<<<<<< HEAD
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/error-handling/http-error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
=======
import { provideHttpClient } from '@angular/common/http';
>>>>>>> parent of 0455473 (Error handling Improved and Loging way corrected in UI)

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes), 
  provideClientHydration(withEventReplay()),
<<<<<<< HEAD
  provideAnimations(),
  provideHttpClient(withInterceptors([
    HttpErrorInterceptor // ✅ Register your interceptor here
  ]))]
=======
  provideHttpClient()]
>>>>>>> parent of 0455473 (Error handling Improved and Loging way corrected in UI)
};

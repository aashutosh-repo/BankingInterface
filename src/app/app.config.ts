import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/interceptor/http-error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './shared/interceptor/auth.interceptor';

export const  appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor,HttpErrorInterceptor] //** order Matter here */
    ))
  ]
};

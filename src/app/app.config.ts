import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './services/core/interceptor/auth.interceptor';
import { loaderInterceptor } from './services/core/interceptor/loader.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CustomMatPaginatorIntl } from './services/utility/pagination.service';
import { MatPaginatorIntl } from '@angular/material/paginator';


export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, loaderInterceptor])),
    provideAnimations(),
    provideStore(),
    provideEffects(),
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};

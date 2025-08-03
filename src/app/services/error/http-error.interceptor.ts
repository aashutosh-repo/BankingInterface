import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // Correct import
import { PLATFORM_ID, inject } from '@angular/core'; // PLATFORM_ID remains from @angular/core

// Function-based HttpInterceptor
export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID); // Correctly import PLATFORM_ID
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let userMessage = 'An unknown error occurred.';

      // Check if running in the browser
      if (isPlatformBrowser(platformId)) {
        // ProgressEvent only exists in the browser
        if (error.error instanceof ProgressEvent && error.status === 0) {
          userMessage = 'Unable to connect to the server. Please check your network or try again later.';
        }
      }
      if (error.status === 0) {
        userMessage = isPlatformBrowser(platformId)
          ? 'Network error: Unable to connect to the server.'
          : 'Server is unreachable.';
      }else 

      // Handle other status codes
      if (error.status >= 500) {
        userMessage = 'Server error occurred. Please try again later.';
      } else if (error.status >= 400) {
        userMessage = error.error?.message || 'Bad request. Please verify your input.';
      }

      console.error('[HTTP ERROR]', userMessage, error);

      // Propagate a user-friendly error
      return throwError(() => new Error(userMessage));
    })
  );
};

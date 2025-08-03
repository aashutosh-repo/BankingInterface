import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRequest,UserResponse } from '../../model/interfaces/UserDetails.model';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {

  private apiUrl = 'http://localhost:8080/auth/security/login';


  constructor(private http: HttpClient, private router: Router) {}

  login(user: UserRequest) {
    if (!user.username || !user.password) {
      console.error('Username or password is empty');
      return;
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<UserResponse>(this.apiUrl, user, {headers})
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Method to store token after successful login
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(){
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('jwtToken');
      }
      return null;
  }

  setExpiryTime(response: UserResponse){
    localStorage.setItem('expiresAt', response.expiryTime.toString());
  }

  getExpiryTime(response: UserResponse): string{
    return localStorage.getItem('expiresAt') || '';
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}

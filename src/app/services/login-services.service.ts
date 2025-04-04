import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IUserDTO, UserRequest } from '../model/interfaces/UserDetails.model';
import { ErrorService } from './error/error.service';
import { Oauth2Service } from './security/oauth2.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  private ApiUrl = 'http://localhost:9999/user/verifyUser';

  constructor(private http : HttpClient,private errorService: ErrorService ) { }

  login(userdto: UserRequest): Observable<IUserDTO>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<IUserDTO>(this.ApiUrl,userdto,{headers})
    .pipe(
      catchError(this.handleException)
    );
  }
  private handleException(error: any): Observable<IUserDTO> {
    if (error.status === 404 && error.error) {
      return of(error.error as IUserDTO); // Converts error response into a valid Observable<IUserDTO>
    }
    throw new Error('Method not Executed properly .' + error);
  }
}

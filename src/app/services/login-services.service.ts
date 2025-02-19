import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IUserDTO } from '../model/interfaces/UserDetails.model';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  private ApiUrl = 'http://localhost:9999/user/verifyUser';

  constructor(private http : HttpClient) { }

  login(userdto: IUserDTO): Observable<IUserDTO>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<IUserDTO>(this.ApiUrl,userdto,{headers})
    .pipe(
      catchError(this.handleException)
    );
  }
  private handleException(error: any): Observable<never> {
    throw new Error('Method not Executed properly .' + error);
  }
}

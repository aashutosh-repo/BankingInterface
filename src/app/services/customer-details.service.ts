import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CustomerDetails } from '../model/interfaces/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  private custmerUrl = 'http://localhost:9999/customer/getAllCustomerDetails';
  constructor(private http : HttpClient) { }

  loadCustomerDetails(){
    return this.http.get<CustomerDetails[]>(this.custmerUrl).pipe(catchError(this.handleException) );
  }

  private handleException(error: any): Observable<never> {
    throw new Error('Method not Executed properly .' + error);
  }
}

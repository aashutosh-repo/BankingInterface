import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDetails } from '../../model/interfaces/customer.model';
import { catchError, Observable } from 'rxjs';
import { CustomerDto } from '../../model/interfaces/customerDTO.model';
import { CustomerSearchRequestDto } from '../../model/interfaces/customer/customerRequestDTO.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerOperationService {


  private apiUrl = 'http://localhost:8080/customer/customer-Onboarding';
  private custmerUrl = 'http://localhost:8080/customer/getAllCustomerDetails';
  private baseUrl = 'http://localhost:8080/customer';



  constructor(private http: HttpClient) {}

  sendRequestToBackend(data: any): Observable<any> {
    console.log('Sending request payload:', data);
    return this.http.post(this.apiUrl, data);
  }


  loadCustomerDetails(){
    return this.http.get<CustomerDetails[]>(this.custmerUrl)
    .pipe(catchError(this.handleException) );
  }


  searchcustomerDetails(customerSearchRequest: CustomerSearchRequestDto): Observable<CustomerDto[]> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // const formattedStart = this.formatDate(customerSearchRequest.startDate);
    // const formattedEnd = this.formatDate(customerSearchRequest.endDate);
      // const params = new HttpParams()
      //   .set('customerType', customerSearchRequest.customerType)
      //   .set('startDate', formattedStart)
      //   .set('endDate', formattedEnd);

      // console.log("Start Date:", formattedStart);
      // console.log("End Date:", formattedEnd);

      console.log(customerSearchRequest);

      // return this.http.get<CustomerDto[]>(this.baseUrl, { params });
      return this.http.post<CustomerDto[]>(
        `${this.baseUrl}/customerSearch`,
        customerSearchRequest,
        { headers }
      );
  }
  
    private handleException(error: any): Observable<never> {
      throw new Error('Method not Executed properly .' + error);
    }

    private formatDate(date: Date): string {
      return date.toString().split('T')[0]; // 'yyyy-MM-dd'
    }
}

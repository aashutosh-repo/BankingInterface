import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerData, CustomerDetails } from '../../model/interfaces/customer.model';
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

    getCustomerById(customerId: string, customerType: string): Observable<CustomerData> {
    const params = new HttpParams()
      .set('customerId', customerId)
      .set('customerType', customerType);

    return this.http.get<CustomerData>(`${this.baseUrl}/findCustomerById`, { params });
  }


  searchcustomerDetails(customerSearchRequest: CustomerSearchRequestDto): Observable<CustomerData[]> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
      // return this.http.get<CustomerDto[]>(this.baseUrl, { params });
      return this.http.post<CustomerData[]>(`${this.baseUrl}/customerSearch`, customerSearchRequest,
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

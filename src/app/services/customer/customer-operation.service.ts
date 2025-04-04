import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDetails } from '../../model/interfaces/customer.model';
import { catchError, Observable } from 'rxjs';
import { CustomerDto } from '../../model/interfaces/customerDTO.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerOperationService {


  private apiUrl = 'http://localhost:8080/customer/customer-Onboarding';
  private custmerUrl = 'http://localhost:8080/customer/getAllCustomerDetails';
  private baseUrl = 'http://localhost:8080/customer/customerSearch';



  constructor(private http: HttpClient) {}

  sendRequestToBackend() {
    const customerDto = sessionStorage.getItem('customerDto');
    const docDto = sessionStorage.getItem('docDto');
    const customerAddress = sessionStorage.getItem('customerAddress');
    const nomineeDetails = sessionStorage.getItem('nomineeDetails');


    if (customerDto && docDto && customerAddress && nomineeDetails) {
      const requestPayload = {
        customerDto: customerDto ? JSON.parse(customerDto) : null,
        docDto: docDto ? JSON.parse(docDto) : null,
        customerAddress: customerAddress ? JSON.parse(customerAddress) : null,
        nomineeDetails: nomineeDetails ? JSON.parse(nomineeDetails) : []
      };
        console.log(requestPayload)
      // Sending the request to the backend
      return this.http.post(this.apiUrl, requestPayload);
    } else {
      console.error('Some required session storage data is missing!');
      return null;
    }
  }


  loadCustomerDetails(){
    return this.http.get<CustomerDetails[]>(this.custmerUrl)
    .pipe(catchError(this.handleException) );
  }


  searchcustomerDetails(customerType: string, startDate: Date, endDate: Date): Observable<CustomerDto[]> {
    const formattedStart = this.formatDate(startDate);
  const formattedEnd = this.formatDate(endDate);
    const params = new HttpParams()
      .set('customerType', customerType)
      .set('startDate', formattedStart)
      .set('endDate', formattedEnd);
    console.log("Start Date:", formattedStart);
    console.log("End Date:", formattedEnd);
      return this.http.get<CustomerDto[]>(this.baseUrl, { params });
  }
  
    private handleException(error: any): Observable<never> {
      throw new Error('Method not Executed properly .' + error);
    }

    private formatDate(date: Date): string {
      return date.toISOString().split('T')[0]; // 'yyyy-MM-dd'
    }
}

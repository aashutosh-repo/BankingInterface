import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerOnboardingService {

  private apiUrl = 'http://localhost:9999/customer/customer-Onboarding';

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
}

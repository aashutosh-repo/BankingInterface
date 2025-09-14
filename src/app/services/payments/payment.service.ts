import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TransactionResponse } from '../../model/interfaces/payments/Transaction.model';
import { PaymentStatusResponse } from '../../model/interfaces/payments/PaymentResponse.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly baseURL = 'http://localhost:8080/payments';
  paymentProcessingUrl = 'http://localhost:8080/payments/process-payment'; // adjust URL as needed
  paymentUrl = 'http://localhost:8080/payments/initiate';
  private readonly apiUrl = 'http://localhost:8080/payments/getPaymentDetails';

 paymentData ={
  "paymentMethod": "CARD",
  "token": "gvscvksdhvjhcjsvjhvcljsdvcljdsvcljdvj",
  "merchantId": "MERCHANT123",
  "customerId": "CUST456",
  "amount": 1000,
  "currency": "INR",
  "billingAddress": {
    "payerName": "Aashutosh Kumar",
    "city": "Aurangabad",
    "fullAddress": "Jamhor Aurangabad, Bihar",
    "country": "INDIA",
    "pincode": "201306"
  },
  "cardNumber": "string",
  "expiryMonth": "string",
  "expiryYear": "string",
  "cvv": "string",
  "cardHolderName": "string"
}


 upiPaymentData ={
  "paymentMethod": "UPI",
  "token": "gvscvksdhvjhcjsvjhvcljsdvcljdsvcljdvj",
  "merchantId": "MERCHANT123",
  "customerId": "CUST0003",
  "amount": 1000,
  "currency": "INR",
  "billingAddress": {
    "payerName": "Aashutosh Kumar",
    "city": "Aurangabad",
    "fullAddress": "Jamhor Aurangabad, Bihar",
    "country": "INDIA",
    "pincode": "201306"
  },
  "upiId": "aashutosh@upi",
}


  constructor(private http: HttpClient) {}
  //methods for payment processing
  async initiatePayment(encryptedPayload: string) {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return await firstValueFrom(
        this.http.post<{ payload: string }>(
          this.paymentProcessingUrl,
          { payload: encryptedPayload },
          { headers, responseType: 'json' }
        )
      );
    } catch (error) {
      console.error('Payment Processing Failed:', error);
      throw new Error('Something went wrong. Please try again.');
    }
  }

    async initiate(encryptedPayload: string): Promise<PaymentStatusResponse>  {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return await firstValueFrom(
        this.http.post<PaymentStatusResponse>(
          this.paymentUrl,this.upiPaymentData)
      );
    
    } catch (error) {
      console.error('Payment Processing Failed:', error);
      throw new Error('Something went wrong. Please try again.');
    }
  }

    getStatus(txnId: string): Observable<PaymentStatusResponse> {
    return this.http.get<PaymentStatusResponse>(`${this.baseURL}/${txnId}/status`);
  }

  getTransctionDetails(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(this.apiUrl);
  }
}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TransactionResponse } from '../../model/interfaces/payments/Transaction.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentProcessingUrl = 'http://localhost:8080/payments/process-payment'; // adjust URL as needed
  private readonly apiUrl = 'http://localhost:8080/payments/getPaymentDetails';

  constructor(private http : HttpClient) {
  }
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

  getTransctionDetails(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(this.apiUrl);
  }
}

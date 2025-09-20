import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

    async initiate(paymentData: any): Promise<PaymentStatusResponse>  {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return await firstValueFrom(
        this.http.post<PaymentStatusResponse>(
          this.paymentUrl, paymentData)
      );
    
    } catch (error: HttpErrorResponse | any) {
      console.error('Payment Processing Failed:', error.message || error);
      return error;
    }
  }

    getStatus(txnId: string): Observable<PaymentStatusResponse> {
    return this.http.get<PaymentStatusResponse>(`${this.baseURL}/${txnId}/status`);
  }

  getTransctionDetails(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(this.apiUrl);
  }
}

function generateRandomUpiOrder() {
  // Random helpers
  const randomId = (prefix: string, length: number) =>
    prefix + Math.random().toString(36).substring(2, 2 + length).toUpperCase();

  const randomAmount = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    paymentMethod: "UPI",
    token: randomId("TKN", 12),
    merchantId: randomId("MERCHANT", 5),
    customerId: randomId("CUST", 4),
    amount: randomAmount(100, 5000), // random amount between 100–5000
    currency: "INR",
    billingAddress: {
      payerName: "Aashutosh Kumar",
      city: "Aurangabad",
      fullAddress: "Jamhor Aurangabad, Bihar",
      country: "INDIA",
      pincode: "201306"
    },
    upiId: "aashutosh@upi",
    orderId: randomId("ORD", 8) // ✅ add a random orderId for tracking
  };
}

// Example usage:
const randomOrder = generateRandomUpiOrder();
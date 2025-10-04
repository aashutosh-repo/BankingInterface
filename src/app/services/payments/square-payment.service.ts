import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SquarePaymentService {
  private appId = 'sandbox-sq0idb-ZFXsUViLmhZyrNxuB70txg';  // from Square Developer Dashboard
  private locationId = 'EAAAlwvG4ub4uC_TTM8PWY31Byn3HapaGNsByKTYCuwPHsiC_GLiCymcIsnQ2Tb4'; 

  constructor(private http: HttpClient) {}

  async initPayments() {
    const payments = (window as any).Square.payments(this.appId, this.locationId);
    return payments;
  }

  // Call backend to create payment
  createPayment(token: string, amount: number) {
    return this.http.post('/api/payments', {
      sourceId: token,
      amount: amount,
    });
  }
}

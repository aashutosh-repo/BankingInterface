import { Component } from '@angular/core';
import { SquarePaymentService } from '../../services/payments/square-payment.service';

@Component({
  selector: 'app-testpay',
  imports: [],
  templateUrl: './testpay.component.html',
  styleUrl: './testpay.component.scss'
})
export class TestpayComponent {
  private card: any;
  message = '';

  constructor(private squareService: SquarePaymentService) {}

  async ngAfterViewInit() {
    const payments = await this.squareService.initPayments();
    this.card = await payments.card();
    await this.card.attach('#card-container');
  }

  async handlePayment() {
    try {
      const result = await this.card.tokenize();
      if (result.status === 'OK') {
        this.squareService.createPayment(result.token, 200).subscribe({
          next: (res: any) => (this.message = 'Payment Successful!'),
          error: (err) => (this.message = 'Payment Failed: ' + err.message),
        });
      } else {
        this.message = 'Tokenization failed';
      }
    } catch (err: any) {
      this.message = 'Error: ' + err.message;
    }
  }

}

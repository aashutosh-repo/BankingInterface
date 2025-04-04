import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EncryptionService } from '../../services/encryption/encryption.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ FormsModule, CommonModule
  ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  http = inject(HttpClient);
  name:string = 'Aashutosh Kumar';
  constructor(private encryptionService: EncryptionService) {}

  async ngOnInit() {
    const encrypted = await this.encryptionService.encrypt(this.name);
    console.log('Encrypted:', encrypted);
    const decrypted = await this.encryptionService.decrypt(encrypted);
    console.log('Decrypted:', decrypted);
  }

  async sendPaymentData() {
    const cardNumber = '4111111111111111';
    const encryptedCard = await this.encryptionService.encrypt(cardNumber);

    const paymentData = { card: encryptedCard };
    console.log('Encrypted Card:', encryptedCard);

    fetch('https://your-backend.com/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });
  }

  async initiatePayment() {
    const token ='Aashutosh Kumar';
    const paymentData = { token, amount: '100' };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Encrypt the payment data
    const encryptedData = await this.encryptionService.encrypt(JSON.stringify(paymentData));

    // Create payload with encrypted data
    const requestBody = { encryptedPayload: encryptedData };

    this.http.post('http://localhost:9999/payments/process-payment', requestBody, { headers, responseType: 'text' })
    .subscribe({
      next: (response: any) => {
        console.log("Payment Response:", response);
        alert('Payment Successful!');
      },
      error: (error: any) => {
        console.error('Payment Failed:', error);
        alert('Payment Failed!');
      }
    });
}

  
}

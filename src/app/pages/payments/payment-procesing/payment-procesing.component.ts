import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentSuccessDialogComponent } from '../payment-success-dialog/payment-success-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { EncryptionService } from '../../../services/encryption/encryption.service';

@Component({
  selector: 'app-payment-procesing',
  imports: [FormsModule, CommonModule,
    MatCardModule,MatFormFieldModule, 
    MatInputModule,MatSelectModule,
    MatButtonModule,ReactiveFormsModule],
  templateUrl: './payment-procesing.component.html',
  styleUrls: ['./payment-procesing.component.css']
})
export class PaymentProcesingComponent {
  
  paymentForm!: FormGroup;
  cardType: string | null = null;
  http = inject(HttpClient);

  constructor(private fb: FormBuilder, private dialog: MatDialog, private encryptionService: EncryptionService
  ) {};

  ngOnInit(): void {
    this.initializeForm();
    this.onPaymentMethodChange();
  }

  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  initializeForm() {
    this.paymentForm = this.fb.group({
      paymentMethod: ['card', Validators.required],
      cardHolderName: [''],
      cardNumber: [''],
      expiryMonth: [''],
      expiryYear: [''],
      cvv: [''],
      upiId: [''],
    });
  }

  onPaymentMethodChange() {
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe((method: string) => {
      if (method === 'card') {
        // Set validators for card payment method
        this.paymentForm.get('cardHolderName')?.setValidators([Validators.required]);
        this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
        this.paymentForm.get('expiryMonth')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
        this.paymentForm.get('expiryYear')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
        this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
        
        // Clear UPI validators as Card method has been selected 
        this.paymentForm.get('upiId')?.clearValidators();
      } else if (method === 'upi') {
        this.paymentForm.get('upiId')?.setValidators([Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)]);
        
        // Clear card validators as UPI method has been selected 
        this.paymentForm.get('cardHolderName')?.clearValidators();
        this.paymentForm.get('cardNumber')?.clearValidators();
        this.paymentForm.get('expiryMonth')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
        this.paymentForm.get('expiryYear')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
        this.paymentForm.get('cvv')?.clearValidators();
      }
      this.paymentForm.get('cardHolderName')?.updateValueAndValidity();
      this.paymentForm.get('cardNumber')?.updateValueAndValidity();
      this.paymentForm.get('expiryMonth')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
      this.paymentForm.get('expiryYear')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
      this.paymentForm.get('cvv')?.updateValueAndValidity();
      this.paymentForm.get('upiId')?.updateValueAndValidity();
    });
  }

  detectCardType(cardNumber: string) {
    const cardPatterns: { [key: string]: RegExp } = {
      visa: /^4[0-9]{0,12}(?:[0-9]{0,3})?$/,
      mastercard: /^5[1-5][0-9]{0,14}?$/,
      amex: /^3[47][0-9]{0,13}$/,
      rupay: /^(60|65|81|82|508)\d{0,15}$/
    };

    this.cardType = null; // Reset card type
    Object.keys(cardPatterns).forEach((type) => {
      if (cardPatterns[type].test(cardNumber.replace(/\s/g, ''))) {
        this.cardType = type;
      }
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const paymentMethod = this.paymentForm.value.paymentMethod;
      let paymentData: any = {};
      this.submitPayment();

      if (paymentMethod === 'card') {
        const expiryMonth = this.paymentForm.get('expiryMonth')?.value;
        const expiryYear = this.paymentForm.get('expiryYear')?.value;
        paymentData = {
          cardHolderName: this.paymentForm.get('cardHolderName')?.value,
          cardNumber: this.paymentForm.get('cardNumber')?.value,
          expiry:  `${expiryMonth?.toString().padStart(2, '0')}-${expiryYear}`,
          cvv: this.paymentForm.get('cvv')?.value,
        };
      } else if (paymentMethod === 'upi') {
        paymentData = {
          upiId: this.paymentForm.get('upiId')?.value,
        };
      }

      console.log('Captured Payment Data:', paymentData);
      // Call your payment API here with the paymentData object
    } else {
      console.log('Invalid Form');
    }
  }

  submitPayment() {
    this.http.post('http://localhost:8080/core/secureCard/tokenize', `cardNumber=${this.paymentForm.value.cardNumber}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'text'
    }).subscribe({
      next: (token: string) => {
        console.log('Received Token:', token);
        this.initiatePayment(token);
      },
      error: () => alert('Tokenization failed!')
    });
  }
  
  async initiatePayment(token: string) {
    const paymentData = { token, amount: '100' };
  
    try {
      // Step 1: Encrypt the paymentData
      const encryptedPayload = await this.encryptionService.encrypt(JSON.stringify(paymentData));
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      this.http.post<{ payload: string }>(
        'http://localhost:8080/payments/process-payment',
        { payload: encryptedPayload },
        { headers, responseType: 'json' } // Expecting JSON response now
      ).subscribe({
        next: async (response: any) => {
          // Step 2: Optionally decrypt the response if encrypted
          let message: string;
  debugger;
          if (response?.payload) {
            const decrypted = await this.encryptionService.decrypt(response.payload);
            // message = JSON.parse(decrypted)?.message || 'Payment Successful!';

            message = decrypted || 'Payment Successful!';

          } else {
            message = 'Payment Successful!';
          }
          this.dialog.open(PaymentSuccessDialogComponent, { width: '400px' });
        },
        error: (error: any) => {
          console.error('Payment Failed:', error);
          alert('Payment Failed!');
        }
      });
  
    } catch (error) {
      console.error('Encryption Failed:', error);
      alert('Something went wrong. Please try again.');
    }
  }
  
 
}

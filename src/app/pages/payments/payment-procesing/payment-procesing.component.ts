import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentSuccessDialogComponent } from '../payment-success-dialog/payment-success-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-procesing',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './payment-procesing.component.html',
  styleUrls: ['./payment-procesing.component.css']
})
export class PaymentProcesingComponent {

  
    paymentForm!: FormGroup;
    cardType: string | null = null;
    http = inject(HttpClient);
  
    constructor(private fb: FormBuilder, private dialog: MatDialog) {}
  
    ngOnInit(): void {
      this.initializeForm();
      this.onPaymentMethodChange();
    }
  
    initializeForm() {
      this.paymentForm = this.fb.group({
        paymentMethod: ['card', Validators.required],
        cardHolderName: [''],
        cardNumber: [''],
        expiry: [''],
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
          this.paymentForm.get('expiry')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
          this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
          
          // Clear UPI validators as Card method has been selected 
          this.paymentForm.get('upiId')?.clearValidators();
        } else if (method === 'upi') {
          this.paymentForm.get('upiId')?.setValidators([Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)]);
          
          // Clear card validators as UPI method has been selected 
          this.paymentForm.get('cardHolderName')?.clearValidators();
          this.paymentForm.get('cardNumber')?.clearValidators();
          this.paymentForm.get('expiry')?.clearValidators();
          this.paymentForm.get('cvv')?.clearValidators();
        }
        this.paymentForm.get('cardHolderName')?.updateValueAndValidity();
        this.paymentForm.get('cardNumber')?.updateValueAndValidity();
        this.paymentForm.get('expiry')?.updateValueAndValidity();
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
  
        if (paymentMethod === 'card') {
          paymentData = {
            cardHolderName: this.paymentForm.get('cardHolderName')?.value,
            cardNumber: this.paymentForm.get('cardNumber')?.value,
            expiry: this.paymentForm.get('expiry')?.value,
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
      this.http.post('http://localhost:8081/api/token/tokenize', `cardNumber=${this.paymentForm.value.cardNumber}`, {
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
    
    initiatePayment(token: string) {
      const paymentData = { token, amount: '100' };
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      this.http.post('http://localhost:9999/payments/process-payment', paymentData, { headers, responseType: 'text' })
      .subscribe({
        next: (response: any) => {
          console.log("Payment Response:", response); // Log response
          this.dialog.open(PaymentSuccessDialogComponent, {
            width: '400px'
          });
          alert('Payment Successful!');
        },
        error: (error: any) => {
          console.error('Payment Failed:', error);
          alert('Payment Failed!');
        }
      });
    }
}

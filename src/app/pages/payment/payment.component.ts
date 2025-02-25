import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  paymentForm!: FormGroup;
  cardType: string | null = null;

  constructor(private fb: FormBuilder) {}

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
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
      if (method === 'card') {
        // Set validators for card payment method
        this.paymentForm.get('cardHolderName')?.setValidators([Validators.required]);
        this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
        this.paymentForm.get('expiry')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
        this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
        
        // Clear UPI validators
        this.paymentForm.get('upiId')?.clearValidators();
      } else if (method === 'upi') {
        // Set validators for UPI method
        this.paymentForm.get('upiId')?.setValidators([Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)]);
        
        // Clear card validators
        this.paymentForm.get('cardHolderName')?.clearValidators();
        this.paymentForm.get('cardNumber')?.clearValidators();
        this.paymentForm.get('expiry')?.clearValidators();
        this.paymentForm.get('cvv')?.clearValidators();
      }
      
      // Update form validation state
      this.paymentForm.get('cardHolderName')?.updateValueAndValidity();
      this.paymentForm.get('cardNumber')?.updateValueAndValidity();
      this.paymentForm.get('expiry')?.updateValueAndValidity();
      this.paymentForm.get('cvv')?.updateValueAndValidity();
      this.paymentForm.get('upiId')?.updateValueAndValidity();
    });
  }

  detectCardType(cardNumber: string) {
    const cardPatterns: { [key: string]: RegExp } = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{0,13}$/,
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
}

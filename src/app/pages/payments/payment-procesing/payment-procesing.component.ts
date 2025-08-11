import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessDialogComponent } from '../../../shared/dialogs/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '../../../shared/dialogs/loading/loading.component';
import { CoreServicesService } from '../../../services/core/core-services.service';
import { PaymentService } from '../../../services/payments/payment.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { EncryptionService } from '../../../services/encryption/encryption.service';

interface PaymentOption {
  label: string;
  value: string;
}

interface PaymentMethod {
  label: string;
  value: string;
  childOptions?: PaymentOption[];
}

@Component({
  selector: 'app-payment-procesing',
  imports: [FormsModule, CommonModule, MatCardModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, LoadingComponent, MatRadioModule, MatDividerModule,
     QRCodeComponent , MatProgressBarModule],
  templateUrl: './payment-procesing.component.html',
  styleUrls: ['./payment-procesing.component.scss']
})
export class PaymentProcesingComponent {
  paymentForm!: FormGroup;
  cardType: string | null = null;
  http = inject(HttpClient);
  isLoading = false;
  paymentData: any = {}; // Declare at the component level

  constructor(private fb: FormBuilder, private dialog: MatDialog, 
    private encryptionService: EncryptionService,
    private coreServices: CoreServicesService,
    private paymentService: PaymentService
  ) {};

  paymentMethods: PaymentMethod[] = [
    {
      label: 'Credit Card',
      value: 'card',
      childOptions: [
        { label: 'Pay full amount', value: 'full' },
        { label: 'Pay with EMI', value: 'emi' }
      ]
    },
    {
      label: 'UPI',
      value: 'upi',
      childOptions: [
        { label: 'Normal UPI Payment', value: 'normal' },
        { label: 'UPI EMI Payment', value: 'emi' },
        { label: 'UPI Advance Payment', value: 'advance' }
      ]
    },
    { label: 'QR Code', value: 'qr' }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.onPaymentMethodChange();

    // this.paymentForm = this.fb.group({
    //   paymentMethod: [''],
    //   selectedChildOption: ['']
    // });

    // Reset child selection when switching payment method
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(() => {
      this.paymentForm.get('selectedChildOption')?.reset();
    });
  }

  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  initializeForm() {
    this.paymentForm = this.fb.group({
      paymentMethod: ['card', Validators.required],
      selectedChildOption: [''],
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
        this.paymentForm.get('expiryMonth')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{1}$/)]);
        this.paymentForm.get('expiryYear')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{1}$/)]);
        this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
        
        // Clear UPI validators as Card method has been selected 
        this.paymentForm.get('upiId')?.clearValidators();
      } else if (method === 'upi') {
        this.paymentForm.get('upiId')?.setValidators([Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)]);
        
        // Clear card validators as UPI method has been selected 
        this.paymentForm.get('cardHolderName')?.clearValidators();
        this.paymentForm.get('cardNumber')?.clearValidators();
        this.paymentForm.get('expiryMonth')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{1}$/)]);
        this.paymentForm.get('expiryYear')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{1}$/)]);
        this.paymentForm.get('cvv')?.clearValidators();
      }
      this.paymentForm.get('cardHolderName')?.updateValueAndValidity();
      this.paymentForm.get('cardNumber')?.updateValueAndValidity();
      this.paymentForm.get('expiryMonth')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{1}$/)]);
      this.paymentForm.get('expiryYear')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{1}$/)]);
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
      this.paymentData = {}; // Initialize or reset paymentData
  
      if (paymentMethod === 'card') {
        const expiryMonth = this.paymentForm.get('expiryMonth')?.value;
        const expiryYear = this.paymentForm.get('expiryYear')?.value;
          this.paymentData = {
          cardHolderName: this.paymentForm.get('cardHolderName')?.value,
          cardNumber: this.paymentForm.get('cardNumber')?.value,
          expiry: `${expiryMonth?.toString().padStart(2, '0')}-${expiryYear}`,
          cvv: this.paymentForm.get('cvv')?.value,
        };
      } else if (paymentMethod === 'upi') {
        this.paymentData = {
          upiId: this.paymentForm.get('upiId')?.value,
        };
      }

      console.log('Captured Payment Data:', this.paymentData);
      // Call your payment API here with the paymentData object
    } else {
      console.log('Invalid Form');
    }
this.processPayment(this.paymentData);
  }

  async processPayment(paymentData: any) {
    this.isLoading = true;
    // Create a 3-second delay promise
    const delay = new Promise(resolve => setTimeout(resolve, 3000));
  
    try {
      const cardNumber = this.paymentForm.value.cardNumber;
      // Tokenize card number
      const tokenPromise = this.coreServices.tokenizeCard(cardNumber);
      const [token] = await Promise.all([tokenPromise, delay]);

      // Initiate payment with the token
      const paymentData = { token, amount: '100',data: this.paymentData };
      const encryptedPayload = await this.encryptionService.encrypt(JSON.stringify(paymentData));

      const response = await this.paymentService.initiatePayment(encryptedPayload);

      // Decrypt the response
      const decryptedResponse = await this.encryptionService.decrypt(response.payload);
      console.log('Decrypted Response:', decryptedResponse);
      this.dialog.open(SuccessDialogComponent, { width: '400px' });

  } catch (error) {
      console.error('Tokenization or Payment failed!', error);
      alert('Tokenization or Payment failed!');
    } finally {
      this.isLoading = false;
    }
  }


  qrData: string = '';
  qrInProgress = false;
  qrSuccess = false;
  generateQR() {
    this.qrSuccess = false;
    const upiId = 'aashutoshkumar6729@ybl';
    const name = encodeURIComponent('Aashutosh Kumar');
    const currency = 'INR';
    const amount1 = 1.00; // Amount in INR
    this.qrData = `upi://pay?pa=${upiId}&pn=${name}&am=${amount1}&cu=${currency}`;    this.qrInProgress = true;

    // const { customerName, amount } = this.paymentForm.value;
    // this.qrData = JSON.stringify({ customerName, amount });

    setTimeout(() => {
      this.qrInProgress = false;
      this.qrSuccess = true;
    }, 10000);
  }


paymentForm1!: FormGroup;
}
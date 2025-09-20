import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessDialogComponent } from '../../../shared/dialogs/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreServicesService } from '../../../services/core/core-services.service';
import { PaymentService } from '../../../services/payments/payment.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EncryptionService } from '../../../services/encryption/encryption.service';
import { BillingAddressComponent } from '../billing-address/billing-address.component';
import { SharedMaterialModules } from '../../../shared/material-imports/shared-material.module';
import { Router } from '@angular/router';
import { filter, interval, Subscription, switchMap, takeWhile } from 'rxjs';
import { generateRandomUpiOrder } from '../../../shared/Testdata/Paymentdata';
import { tokenizeCard } from '../../../sdk/sdk';

interface PaymentOption {
  label: string;
  value: string;
}

interface PaymentMethod {
  label: string;
  value: string;
  childOptions?: PaymentOption[];
  isActive?: boolean;
}

@Component({
  selector: 'app-payment-procesing',
  imports: [SharedMaterialModules,
    ReactiveFormsModule, QRCodeComponent , 
    MatProgressBarModule, BillingAddressComponent],
  templateUrl: './payment-procesing.component.html',
  styleUrls: ['./payment-procesing.component.scss']
})
export class PaymentProcesingComponent {
  paymentForm!: FormGroup;
  cardType: string | null = null;
  http = inject(HttpClient);
  isLoading = false;
  showBillingAddress = false;
  paymentData: any = {}; // Declare at the component level

  constructor(private fb: FormBuilder, private dialog: MatDialog, 
    private router: Router,
    private encryptionService: EncryptionService,
    private coreServices: CoreServicesService,
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef
  ) {};

  paymentMethods: PaymentMethod[] = [
    {
      label: 'Credit Card',
      value: 'card',
      childOptions: [
        { label: 'Pay full amount', value: 'full' },
        { label: 'Pay with EMI', value: 'emi' }
      ],
      isActive: true
    },
    {
      label: 'UPI',
      value: 'upi',
      childOptions: [
        { label: 'Normal UPI Payment', value: 'normal' },
        { label: 'UPI EMI Payment', value: 'emi' },
        { label: 'UPI Advance Payment', value: 'advance' }
      ],
       isActive: true
    },
    { label: 'QR Code', value: 'qr', isActive: false },
    { label: 'Net Banking', value: 'netbanking', isActive: false },
    { label: 'Wallet', value: 'wallet', isActive: false },
    { label: 'paytm', value: 'cod', isActive: true }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.onPaymentMethodChange();
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(() => {
      this.paymentForm.get('selectedChildOption')?.reset();
    });
  }


  get selectedMethod() {
    return this.paymentMethods.find(m => m.value === this.paymentForm.value.paymentMethod);
  }

  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  initializeForm() {
    this.paymentForm = this.fb.group({
      billingForm: this.fb.group({
        payerName: ['Aashutosh Kumar', Validators.required],
        city: ['Aurangabad', Validators.required],
        fullAddress: ['Jamhor Aurangabad, Bihar', Validators.required],
        country: ['INDIA', Validators.required],
        pincode: ['201306', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      }),
      paymentMethod: ['', Validators.required],
      selectedChildOption: [''],
      cardHolderName: [''],
      cardNumber: [''],
      expiryMonth: [''],
      expiryYear: [''],
      cvv: [''],
      upiId: [''],
    });
  }

  get billingGroup() {
    return this.paymentForm.get('billingForm') as FormGroup;
  }

  onPaymentMethodChange() {
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe((method: string) => {
      const cardControls = [
        'cardHolderName',
        'cardNumber',
        'expiryMonth',
        'expiryYear',
        'cvv'
      ];
      const upiControls = ['upiId'];

      if (method === 'card') {
        // Apply validators for card
        this.setValidators('cardHolderName', [Validators.required]);
        this.setValidators('cardNumber', [Validators.required, Validators.pattern(/^\d{16}$/)]);
        this.setValidators('expiryMonth', [Validators.required]);
        this.setValidators('expiryYear', [Validators.required]);
        this.setValidators('cvv', [Validators.required, Validators.pattern(/^\d{3}$/)]);

        // Clear UPI validators
        upiControls.forEach(c => this.clearValidators(c));

      } else if (method === 'upi') {
        // Apply validators for UPI
        this.setValidators('upiId', [
          Validators.required,
          Validators.pattern(/^[\w.-]+@[\w.-]+$/)
        ]);

        // Clear card validators
        cardControls.forEach(c => this.clearValidators(c));
      }

      this.paymentForm.updateValueAndValidity();
    });
  }

  private setValidators(controlName: string, validators: any[]) {
    const control = this.paymentForm.get(controlName);
    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }

  private clearValidators(controlName: string) {
    const control = this.paymentForm.get(controlName);
    if (control) {
      control.clearValidators();
      control.updateValueAndValidity();
    }
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

      // Call your payment API here with the paymentData object
    } else {
      console.log('Invalid Form');
    }
    this.processPayment(this.paymentData);
  }

  async processPayment(paymentData: any) {
    this.isLoading = true;  
    try {
      const cardNumber = this.paymentForm.value.cardNumber;
      // Tokenize card number
      // const tokenPromise = this.coreServices.tokenizeCard(cardNumber);
     const res= await tokenizeCard({
          cardNumber: cardNumber,
          expiry: this.paymentForm.value.expiryMonth + '/' + this.paymentForm.value.expiryYear,
          cvv: this.paymentForm.value.cvv
        });
      console.log('Tokenization result:', res);
      
        // Initiate payment with the token
      const paymentData = { cardNumber, amount: '100',data: this.paymentData };
      const encryptedPayload = await this.encryptionService.encrypt(JSON.stringify(paymentData));
        // const encryptedPayload = JSON.stringify(paymentData);

        const paymentPayload = generateRandomUpiOrder();
      
      const response = await this.paymentService.initiate(paymentPayload);
      console.log(response);
      this.startPollingStatus(response.transactionId);
  } catch (error) {
      console.error('Tokenization or Payment failed!', error);
      alert('Tokenization or Payment failed!');
    } finally {
      this.isLoading = false;
    }
  }

private pollSub?: Subscription;

startPollingStatus(txnId: string) {
  this.pollSub = interval(3000).pipe(
    switchMap(() => this.paymentService.getStatus(txnId)),
    takeWhile(res => res.status !== 'SUCCESS' && res.status !== 'FAILURE', true) // ✅ keep last value
  ).subscribe((res) => {
    console.log('Polled status:', res.status);

    if (res.status === 'SUCCESS') {
      
      this.dialog.open(SuccessDialogComponent, { width: '400px' });
      this.router.navigate(['/payments/success'], { state: { payment: res } });

      this.pollSub?.unsubscribe(); // stop polling
    } else if (res.status === 'FAILURE') {
      alert('Payment failed. Try again.');
      this.pollSub?.unsubscribe(); // stop polling
    }
  });
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
}
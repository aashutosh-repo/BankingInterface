import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../../../../services/payments/payment.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EncryptionService } from '../../../../services/encryption/encryption.service';
import { SharedMaterialModules } from '../../../../shared/material-imports/shared-material.module';
import { Router } from '@angular/router';
import { filter, interval, Subscription, switchMap, takeWhile } from 'rxjs';
import { generateRandomUpiOrder } from '../../../../shared/Testdata/Paymentdata';
import { CoreServicesService } from '../../../../services/core/core-services.service';
import { BillingAddressComponent } from '../../../../pages/payments/billing-address/billing-address.component';
import { SuccessDialogComponent } from '../../../../shared/dialogs/success-dialog/success-dialog.component';

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
    ReactiveFormsModule , 
    MatProgressBarModule],
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

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      cardNumber: [''],
      expiry: [''],
      cvv: [''],
      emiTenure: [''],
      upiId: [''],
      advanceAmount: [''],
      bank: ['']
    });

    // this.initializeForm();
    // this.onPaymentMethodChange();
    this.applyValidators('card');

    this.form.get('paymentMethod')?.valueChanges.subscribe((method: string) => {
      this.applyValidators(method);
    });
    // this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(() => {
    //   this.paymentForm.get('selectedChildOption')?.reset();
    // });
  }

  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  // initializeForm() {
  //   this.paymentForm = this.fb.group({
  //     billingForm: this.fb.group({
  //       payerName: ['Aashutosh Kumar', Validators.required],
  //       city: ['Aurangabad', Validators.required],
  //       fullAddress: ['Jamhor Aurangabad, Bihar', Validators.required],
  //       country: ['INDIA', Validators.required],
  //       pincode: ['201306', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  //     }),
  //     paymentMethod: ['', Validators.required],
  //     selectedChildOption: [''],
  //     cardHolderName: [''],
  //     cardNumber: [''],
  //     expiryMonth: [''],
  //     expiryYear: [''],
  //     cvv: [''],
  //     upiId: [''],
  //   });
  // }

  get billingGroup() {
    return this.paymentForm.get('billingForm') as FormGroup;
  }

private applyValidators(method: string): void {

  console.log('Applying validators for method:', method);
    if (method === 'card') {
      this.setCardValidators();
      this.clearUpiValidators();
    } else if (method === 'upi') {
      this.setUpiValidators();
      this.clearCardValidators();
    }
  }

  private setCardValidators() {
    // this.paymentForm.get('cardHolderName')?.setValidators([Validators.required]);
    this.form.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
    this.form.get('expiryMonth')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]);
    this.form.get('expiryYear')?.setValidators([Validators.required, Validators.pattern(/^\d{4}$/)]);
    this.form.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);

    this.refreshControls(['cardHolderName', 'cardNumber', 'expiryMonth', 'expiryYear', 'cvv']);
  }

  private clearCardValidators() {
    this.clearControls(['cardHolderName', 'cardNumber', 'expiryMonth', 'expiryYear', 'cvv']);
  }

  private setUpiValidators() {
    this.form.get('upiId')?.setValidators([
      Validators.required,
      Validators.pattern(/^[\w.-]+@[\w.-]+$/)
    ]);
    this.refreshControls(['upiId']);
  }

  private clearUpiValidators() {
    this.clearControls(['upiId']);
  }

  private clearControls(controls: string[]) {
    controls.forEach(ctrl => {
      this.form.get(ctrl)?.clearValidators();
      this.form.get(ctrl)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  private refreshControls(controls: string[]) {
    controls.forEach(ctrl => {
      this.form.get(ctrl)?.updateValueAndValidity({ emitEvent: false });
    });
  }




  private updateControls(controls: string[]) {
    controls.forEach(ctrl => {
      this.paymentForm.get(ctrl)?.updateValueAndValidity();
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
      // const tokenPromise = this.coreServices.tokenizeCard(cardNumber);
      // const [token] = await Promise.all([tokenPromise, delay]);

      // Initiate payment with the token
      const paymentData = { cardNumber, amount: '100',data: this.paymentData };
      const encryptedPayload = await this.encryptionService.encrypt(JSON.stringify(paymentData));
        // const encryptedPayload = JSON.stringify(paymentData);

        const paymentPayload = generateRandomUpiOrder();
      
      const response = await this.paymentService.initiate(paymentPayload);
      console.log(response);

      // Decrypt the response
      // const decryptedResponse = await this.encryptionService.decrypt(response.payload);
      // console.log('Decrypted Response:', decryptedResponse);
      debugger;
      this.startPollingStatus(response.transactionId);
      // this.dialog.open(SuccessDialogComponent, { width: '400px' });
      // this.router.navigate(['/payments/success'], { state: { payment: response } });
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
  // selectedMethod: string = 'card'; // default selection

  // selectMethod(method: string) {
  //   this.selectedMethod = method;
  // }
  selectedMethod: string | null = null;
  selectedChild: string | null = null;

  selectMethod(method: PaymentMethod) {
    if (!method.isActive) return; // disable inactive
    this.selectedMethod = method.value;
    this.selectedChild = null; // reset child
  }

  selectChild(childValue: string) {
    this.selectedChild = childValue;
  }

  submitPayment() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      alert('Payment submitted: ' + JSON.stringify(this.form.value));
    } else {
      alert('Please fill all required fields.');
      //  this.paymentForm.markAllAsTouched();
    }
  }
}
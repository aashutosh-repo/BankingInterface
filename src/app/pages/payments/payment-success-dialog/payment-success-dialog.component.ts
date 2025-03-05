import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-success-dialog',
  imports: [],
  templateUrl: './payment-success-dialog.component.html',
  styleUrl: './payment-success-dialog.component.css'
})
export class PaymentSuccessDialogComponent {
  
  constructor() {}

  close() {
    window.location.reload(); // need to customize to Reload page or navigate elsewhere
  }

}

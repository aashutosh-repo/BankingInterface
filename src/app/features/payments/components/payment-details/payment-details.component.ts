import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMaterialModules } from '../../../shared/material-imports/shared-material.module';
import { PaymentStatusResponse } from '../../../model/interfaces/payments/PaymentResponse.model';

@Component({
  selector: 'app-payment-details',
  imports: [SharedMaterialModules],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss'
})
export class PaymentDetailsComponent {

payment!: PaymentStatusResponse | null;

  constructor(private route: ActivatedRoute, private router: Router) {
    // Try to get from navigation state
    const nav = this.router.getCurrentNavigation();
    const statePayment = nav?.extras?.state?.['payment'] as PaymentStatusResponse;

    if (statePayment) {
      this.payment = statePayment;
      // Persist so refresh still works
      localStorage.setItem('payment', JSON.stringify(this.payment));
    } else {
      // Fallback: load from storage
      const stored = localStorage.getItem('payment');
      this.payment = stored ? JSON.parse(stored) : null;
    }

    // Optional: use query params if needed
    this.route.queryParams.subscribe(params => {
      console.log('Query params:', params);
    });
  }

  goHome() {
    this.router.navigate(['/payments/digital']);
  }

}

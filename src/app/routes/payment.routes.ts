import { Routes } from '@angular/router';
import { PaymentProcesingComponent } from '../pages/payments/payment-procesing/payment-procesing.component';
import { BulkPaymentsComponent } from '../pages/payments/bulk-payments/bulk-payments.component';
import { LayoutComponent } from '../shared/layout/layout/layout.component';
import { PaymentDetailsComponent } from '../pages/payments/payment-details/payment-details.component';

export const paymentRoutes: Routes = [
  {
    path: 'payments',
    component: LayoutComponent,
    children: [
      { path: 'digital', component: PaymentProcesingComponent },
      { path: 'bulk-payments', component: BulkPaymentsComponent },
      { path : 'success', component: PaymentDetailsComponent }
    ]
  }
];

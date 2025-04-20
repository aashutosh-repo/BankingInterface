import { Routes } from '@angular/router';
import { CustomerDetailsViewComponent } from '../pages/customer/customer-details-view/customer-details-view.component';
import { PreviewCustomerDetailsComponent } from '../pages/customer/preview-customer-details/preview-customer-details.component';
import { CustomerSearchComponent } from '../pages/customer/customer-search/customer-search.component';
import { LayoutComponent } from '../shared/layout/layout/layout.component';

export const customerRoutes: Routes = [
  {
    path: 'customer',
    component: LayoutComponent,
    children: [
      { path: 'customerOnboarding', component: CustomerDetailsViewComponent },
      { path: 'preview', component: PreviewCustomerDetailsComponent },
      { path: 'customerSearch', component: CustomerSearchComponent }
    ]
   }
];

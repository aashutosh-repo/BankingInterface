import { Component } from '@angular/core';
import { CustomerOnboardingService } from '../../../services/customer/customer-onboarding.service';

@Component({
  selector: 'app-customer-onboarding',
  standalone:true,
  imports: [],
  templateUrl: './customer-onboarding.component.html',
  styleUrl: './customer-onboarding.component.css'
})
export class CustomerOnboardingComponent {

  constructor(private customerService: CustomerOnboardingService) {}

  submitCustomerData() {
    this.customerService.sendRequestToBackend()?.subscribe({
      next: (response) => {
        console.log('Data successfully sent to backend:', response);
      },
      error: (error) => {
        console.error('Error sending data:', error);
      }
    });
  }

}

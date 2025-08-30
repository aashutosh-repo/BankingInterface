import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NomineeDetailComponent } from '../../components/nominee-detail/nominee-detail.component';
import { DocumentsDetailComponent } from '../../components/documents-detail/documents-detail.component';
import { AddressDetailComponent } from '../../components/address-detail/address-detail.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { PreviewCustomerComponent } from '../../components/preview-customer/preview-customer.component';
import { CustomerDetailsComponent } from '../../components/customer-details/customer-details.component';

@Component({
  selector: 'app-customer-onboarding',
  imports: [FormsModule, NomineeDetailComponent, 
    DocumentsDetailComponent, AddressDetailComponent, CustomerDetailsComponent, 
    PreviewCustomerComponent, MatStepperModule],
  templateUrl: './customer-onboarding.component.html',
  styleUrls: ['./customer-onboarding.component.scss']
})
export class CustomerOnboardingComponent {

    @ViewChild('stepper') stepper!: MatStepper;  // Reference to the stepper

  moveToNextStep() {
    if (this.stepper) {
      console.log('Moving to next step...');
      this.stepper.next();
    } else {
      console.error('Stepper is undefined!');
    }
  }

}

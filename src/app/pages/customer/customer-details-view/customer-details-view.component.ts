import { Component, ViewChild } from '@angular/core';
import { NomineeDetailComponent } from '../nominee-detail/nominee-detail.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { DocumentsDetailComponent } from '../documents-detail/documents-detail.component';
import { AddressDetailComponent } from '../address-detail/address-detail.component';
import { CustomerBasicDetailsComponent } from '../customer-basic-details/customer-basic-details.component';
import { PreviewCustomerDetailsComponent } from '../preview-customer-details/preview-customer-details.component';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-customer-details-view',
  imports: [FormsModule, NomineeDetailComponent, DocumentsDetailComponent, AddressDetailComponent, CustomerBasicDetailsComponent, PreviewCustomerDetailsComponent, MatStepperModule],
  templateUrl: './customer-details-view.component.html',
  styleUrls: ['./customer-details-view.component.css']
})
export class CustomerDetailsViewComponent {
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

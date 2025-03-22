import { Component, OnInit } from '@angular/core';
import { CustomerOnboardingService } from '../../../services/customer/customer-onboarding.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { CUSTOMER_LABEL_MAPPING } from '../../../constants/levels/customer-details-labels';
import { CUSTOMER_ADDRESS_LABEL_MAPPING } from '../../../constants/levels/CustomerAddress-lebels';
import { DOCUMENT_LABEL_MAPPING } from '../../../constants/levels/customer-document-labels';
import { NOMINEE_LABEL_MAPPING } from '../../../constants/levels/nomineeDetails-label';

@Component({
  selector: 'app-preview-customer-details',
  standalone:true,
  imports: [CommonModule,FormsModule,
    MatIconModule, MatCardModule, 
    MatGridListModule, MatButtonModule,
    MatDividerModule ,MatTableModule 
  ],
  templateUrl: './preview-customer-details.component.html',
  styleUrl: './preview-customer-details.component.css'
})
export class PreviewCustomerDetailsComponent implements OnInit{
  customerDto: any;
  customerAddress: any;
  docDto: any;  
  nomineeDetails: any;
  constructor( private customerService: CustomerOnboardingService) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.docDto = JSON.parse(sessionStorage.getItem('docDto') || '{}');
      this.customerDto = JSON.parse(sessionStorage.getItem('customerDto') || '{}');
      this.customerAddress = JSON.parse(sessionStorage.getItem('customerAddress') || '{}');
      this.nomineeDetails = JSON.parse(sessionStorage.getItem('nomineeDetails') || '{}');  
      console.log('customerDto:', this.customerDto);
      console.log('customerAddress:', this.customerAddress);
      console.log('docDto:', this.docDto);
      console.log('nomineeDetails:', this.nomineeDetails);
    }
  }


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

  labelMapping = CUSTOMER_LABEL_MAPPING;
  addressLabelMapping = CUSTOMER_ADDRESS_LABEL_MAPPING;
  //import document label mapping DOCUMENT_LABEL_MAPPING from customer-document-labels.ts
  customerDocumentsLabel= DOCUMENT_LABEL_MAPPING;
  nomineeDetailsLabel =NOMINEE_LABEL_MAPPING;

  getCustomerLabel(key: unknown): string {
    return this.labelMapping[key as string] ?? key as string;
  }
  getCustomerAddressLabel(key: unknown): string {
    return this.addressLabelMapping[key as string] ?? key as string;
  }

  getCustomerDocumentsLabel(key: unknown): string {
    return this.customerDocumentsLabel[key as string] ?? key as string;
  }

  getNomineeLabel(key: unknown): string {
    return this.customerDocumentsLabel[key as string] ?? key as string;
  }


}

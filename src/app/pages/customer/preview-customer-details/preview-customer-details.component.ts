import { Component, OnInit } from '@angular/core';
import { CustomerOnboardingService } from '../../../services/customer/customer-onboarding.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-preview-customer-details',
  standalone:true,
  imports: [CommonModule,FormsModule,
    MatIconModule, MatCardModule, MatGridListModule, MatButtonModule, MatDividerModule
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
    }
  }
  
  keyMappings: Record<string, string> = {
    custClsngDt: "Customer Closing Date",
    fatherName: "Father's Name"
  };


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

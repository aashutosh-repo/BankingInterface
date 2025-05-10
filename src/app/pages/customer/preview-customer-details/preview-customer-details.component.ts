import { Component, OnInit } from '@angular/core';
import { SuccessDialogComponent } from '../../../shared/dialogs/success-dialog/success-dialog.component';
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
import { CustomerOperationService } from '../../../services/customer/customer-operation.service';
import { CustomerDataService } from '../../../services/customer/customer-data.service';
import { MatDialog } from '@angular/material/dialog';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-customer-details',
  standalone:true,
  imports: [CommonModule,FormsModule,
    MatIconModule, MatCardModule, 
    MatGridListModule, MatButtonModule,
    MatDividerModule ,MatTableModule 
  ],
  templateUrl: './preview-customer-details.component.html',
  styleUrls: ['./preview-customer-details.component.css']
})
export class PreviewCustomerDetailsComponent implements OnInit{
  customerDto: any;
  customerAddress: any;
  docDto: any;  
  nomineeDetails: any;
  constructor( 
    private router: Router,
    private dialog: MatDialog,
    private customerService: CustomerOperationService,
    private customerDataService: CustomerDataService

  ) {}
  
  ngOnInit(): void {
    setTimeout(() => {
    const data = this.customerDataService.getAllData();
    this.customerDto = data.customerDetails;
    this.customerAddress = data.addressDetails;
    this.docDto = data.documentDetails;
    // this.nomineeDetails = data.nomineeDetails;
    const nominee = data.nomineeDetails;

    this.nomineeDetails = Array.isArray(nominee) ? nominee : [nominee];


    console.log('Previewing customerDto:', this.customerDto);
    console.log('Previewing customerAddress:', this.customerAddress);
    console.log('Previewing docDto:', this.docDto);
    console.log('Previewing nomineeDetails:', this.nomineeDetails);
  }, 100);

  }


  submitCustomerData(): void {
    const requestData = {
      customerDto: this.customerDto,
      customerAddress: this.customerAddress,
      docDto: this.docDto,
      nomineeDetails: this.nomineeDetails
    };

    this.customerService.sendRequestToBackend(requestData).subscribe({
      next: (response) => {
        console.log('Data successfully sent to backend:', response);
        this.dialog.open(SuccessDialogComponent, { 
          data: { message: 'Customer created successfully!' },
          width: '400px' });
        this.customerDataService.resetAll();
        this.router.navigate(['/customer/customerSearch']);
      },
      error: (error) => {
        console.error('Error sending data:', error);
      }
    });
  }

  customerlabelMapping = CUSTOMER_LABEL_MAPPING;
  addressLabelMapping = CUSTOMER_ADDRESS_LABEL_MAPPING;
  customerDocumentsLabel= DOCUMENT_LABEL_MAPPING;
  nomineeDetailsLabel = NOMINEE_LABEL_MAPPING;

  getCustomerLabel(key: unknown): string {
    return this.customerlabelMapping[key as string] ?? key as string;
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

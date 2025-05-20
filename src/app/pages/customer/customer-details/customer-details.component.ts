import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SharedMaterialModules } from '../../../shared/material-imports/shared-material.module';
import { ActivatedRoute } from '@angular/router';
import { CustomerDataService } from '../../../services/customer/customer-data.service';
import { CustomerOperationService } from '../../../services/customer/customer-operation.service';

@Component({
  selector: 'app-customer-details',
  imports: [...SharedMaterialModules],
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '300ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-out',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class CustomerDetailsComponent implements OnInit {
  customerId!: number;
  customerType!: number;
  constructor(
    private route: ActivatedRoute,
    private customerDataService: CustomerDataService,
    private customerService: CustomerOperationService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.customerId = +params.get('customerId')!;
      this.customerType = +params.get('customerType')!;


      if (this.customerId && this.customerType) {
      const customerData = this.customerDataService.getAllCustomerData();
      let results: any[] = [];
      if (Array.isArray(customerData) && customerData.length > 0) {
        results = customerData.filter(
          (item) =>
            item.customerDetails?.customerId === this.customerId.toString() &&
            item.customerDetails?.customerType === this.customerType.toString()
        );
        return;
      }

      this.customerService
        .getCustomerById(this.customerId.toString(), this.customerType.toString())
        .subscribe((data) => {
          console.log('Customer data from API:', data);
        });

    }
    });
  }

  selectedSection = 0;

  sections = [
    { label: 'Basic Details', icon: 'person' },
    { label: 'Address', icon: 'home' },
    { label: 'Documents', icon: 'description' },
    { label: 'Nominee', icon: 'group' },
    { label: 'Submit', icon: 'check_circle' },
  ];

  customerDto = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  customerAddress = {
    street: '123 Main St',
    city: 'New York',
    zip: '10001',
  };

  docDto = {
    aadhaar: '1234-5678-9012',
    pan: 'ABCDE1234F',
  };

  nomineeDetails = [
    {
      nomineeFirstName: 'Jane',
      nomineeMiddleName: '',
      nomineeLastName: 'Doe',
      dateOfBirth: '1990-05-01',
      nomShare: 100,
      nomDocId: 'A1234567',
    },
  ];

  submitCustomerData() {
    alert('Customer data submitted!');
  }

  getCustomerLabel(key: string): string {
    return this.capitalize(key);
  }

  getCustomerAddressLabel(key: string): string {
    return this.capitalize(key);
  }

  getCustomerDocumentsLabel(key: string): string {
    return this.capitalize(key);
  }

  private capitalize(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }
}

import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SharedMaterialModules } from '../../../shared/material-imports/shared-material.module';
import { ActivatedRoute } from '@angular/router';
import { CustomerDataService } from '../../../services/customer/customer-data.service';
import { CustomerOperationService } from '../../../services/customer/customer-operation.service';
import { CustomerAddress, CustomerData, CustomerDetails, documentDetails, NomineeDetails } from '../../../model/interfaces/customer.model';
import { CUSTOMER_CATEGORY_OPTIONS, CUSTOMER_STATUS, CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS, RISK_PROFILE_OPTIONS } from '../../../constants/dropdowns/CommonDropDowns';

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
  customerId!: string;
  customerType!: number;
  customerDto!: CustomerDetails;
  customerAddress! : CustomerAddress| null;
  docDto!: documentDetails | null;
  nomineeDetails!: NomineeDetails[];
  singleCustomerData!: CustomerData | null;
  results!: CustomerData | null;

  constructor(
    private route: ActivatedRoute,
    private customerDataService: CustomerDataService,
    private customerService: CustomerOperationService
  ) {}

fieldMappings: { [key: string]: { label: string; value: string }[] } = {
  riskProfile: RISK_PROFILE_OPTIONS,
  status: CUSTOMER_STATUS_OPTIONS,
  customerCategory: CUSTOMER_CATEGORY_OPTIONS,
  customerType: CUSTOMER_TYPE_OPTIONS
};

getLabelsForFields(key: string | number, value: string | number): string | number {
  const fieldMapping = this.fieldMappings[String(key)];
  if (!fieldMapping) return value ?? 'NA';

  const match = fieldMapping.find(field => field.value === String(value));
  return match ? match.label : value ?? 'NA';
}


  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.customerId = params.get('customerId')!;
      this.customerType = +params.get('customerType')!; // + sign Convert to number

      //fetch customer data from service if available 
      if (this.customerId && this.customerType) {

        const customerData = this.customerDataService.getAllCustomerData();
        if (Array.isArray(customerData) && customerData.length > 0) {
          // Filter returns an array, but results is declared as CustomerData | null
          // So, find the first matching item instead of using filter
          const found = customerData.find(
            (item) =>
              item.customerDetails?.customerId === this.customerId.toString() &&
              item.customerDetails?.customerType === this.customerType.toString()
          );
          this.results = found ?? null;
          if (this.results) {
            this.customerDto = this.mapCustomerDtoFields(this.results.customerDetails);
            this.customerAddress = this.results.addressDetails;
            this.docDto = this.results.documentDetails;
            this.nomineeDetails = this.results.nomineeDetails || [];
          }
        } else {
          //fetch data from API if Service doesn't contains data
          this.customerService
            .getCustomerById(
              this.customerId.toString(),
              this.customerType.toString()
            )
            .subscribe((data) => {
              console.log('Customer data from API:', data);
              this.customerDataService.addCustomerData(data);
              console.log('Customer data added to service:', this.customerDataService.getAllCustomerData());
              if (data && data.customerDetails) {
                this.customerDto = this.mapCustomerDtoFields(data.customerDetails);
                this.customerAddress = data.addressDetails;
                this.docDto = data.documentDetails;
                this.nomineeDetails = data.nomineeDetails || [];
              } else {
                console.error('No customer details found in the response');
              }
            });
        }
      }
    });
  }

  mapCustomerDtoFields(dto: any): any {
  const result: any = {};
  for (const key in dto) {
    if (dto.hasOwnProperty(key)) {
      result[key] = this.getLabelsForFields(key, dto[key]);
    }
  }
  return result;
}


  selectedSection = 0;

  sections = [
    { label: 'Basic Details', icon: 'person' },
    { label: 'Address', icon: 'home' },
    { label: 'Documents', icon: 'description' },
    { label: 'Nominee', icon: 'group' },
    { label: 'Submit', icon: 'check_circle' },
  ];


  submitCustomerData() {
    alert('Customer data submitted!');
  }

  backToSearch() {
    this.customerDataService.resetAll();
    window.history.back();
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

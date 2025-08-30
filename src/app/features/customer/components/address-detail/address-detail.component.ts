import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerAddress } from '../../../../model/interfaces/customer.model';
import { COUNTRIES, STATES_IN_INDIA } from '../../../../constants/dropdowns/DemographicDropdowns';
import { ADDRESS_TYPE } from '../../../../constants/dropdowns/CommonDropDowns';
import { Router } from '@angular/router';
import { CustomerDataService } from '../../../../services/customer/customer-data.service';
import { SharedMaterialModules } from '../../../../shared/material-imports/shared-material.module';

@Component({
  selector: 'app-address-detail',
  imports: [SharedMaterialModules,FormsModule, ReactiveFormsModule],
  templateUrl: './address-detail.component.html',
  styleUrl: './address-detail.component.scss'
})
export class AddressDetailComponent {
  
  addressForm!: FormGroup;
  customerAddress: CustomerAddress = {} as CustomerAddress;
  countriesOptions: string[] = COUNTRIES;
  selectedCountry: string = 'India'; // Default value
  selectedState: string = 'Maharashtra'; // Default value
  statesOptions: string[] = STATES_IN_INDIA;
  addressTypes= ADDRESS_TYPE;

  getAddressTypeLabel(value: string|number): string {
    const addressType = this.addressTypes.find(type => type.value === value);
    return addressType ? addressType.label : 'Unknown Address Type';
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      customerID: ['1234', Validators.required],
      addressType: ['1', Validators.required],
      addressLn1: ['L1'],
      addressLn2: ['L2'],
      city: ['Aurangabad'],
      village: ['Borivali'],
      district: ['Mumbai'],
      state: ['Maharashtra'],
      pinCode: ['400091',[Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      lastUpdate: [''],
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerDataService: CustomerDataService
  ) {}  
  @Output() nextStepToDocDetail = new EventEmitter<void>(); // Event to notify parent


  onSubmit() {
    if (this.addressForm.valid) {
      this.customerDataService.setSection('addressDetails', this.addressForm.value);
    } else {
      this.addressForm.markAllAsTouched();
    }
    this.nextStepToDocDetail.emit();
  }


}

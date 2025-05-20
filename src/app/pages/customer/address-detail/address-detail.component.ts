import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerAddress } from '../../../model/interfaces/customerAddress.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { COUNTRIES, STATES_IN_INDIA } from '../../../constants/dropdowns/DemographicDropdowns';
import { MatSelectModule } from '@angular/material/select';
import { CustomerDataService } from '../../../services/customer/customer-data.service';
import { ADDRESS_TYPE } from '../../../constants/dropdowns/CommonDropDowns';

@Component({
  selector: 'app-address-detail',
  standalone:true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {

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
  // customerAddressTest: CustomerAddress =
  // {
  //   "customerID": 1001,
  //   "addressType": 1,
  //   "addressLn1": "123, MG Road",
  //   "addressLn2": "Near Central Park",
  //   "city": "Mumbai",
  //   "village": "Borivali",
  //   "district": "Mumbai Suburban",
  //   "taluka": "Borivali West",
  //   "state": "Maharashtra",
  //   "pinCode": 400091,
  //   "lastUpdate": "2025-03-20T14:30:00Z",
  //   "dateOfCapture": "2024-05-15T10:00:00Z"
  // }
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
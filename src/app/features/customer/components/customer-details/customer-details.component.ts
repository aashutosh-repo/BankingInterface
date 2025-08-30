import { Component, EventEmitter, Output } from '@angular/core';
import { MatCalendarCellClassFunction,MatDatepickerModule } from '@angular/material/datepicker';
import { SharedMaterialModules } from '../../../../shared/material-imports/shared-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerDto } from '../../../../model/interfaces/customerDTO.model';
import { CUSTOMER_STATUS_OPTIONS, DOCUMENTS_TYPES, RATING_AGENCIES, RISK_PROFILE_OPTIONS } from '../../../../constants/dropdowns/CommonDropDowns';
import { CustomerDataService } from '../../../../services/customer/customer-data.service';
import { currentOrFutureDateValidator, mailValidator, phoneNumberValidator } from '../../../../shared/validations/validation.service';
import { Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { saveBasicDetails } from '../../store/customer.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customer-details',
  imports: [SharedMaterialModules, FormsModule,ReactiveFormsModule, 
    MatDatepickerModule, MatNativeDateModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {
  
  customerForm!: FormGroup;
  customerDto: CustomerDto = {} as CustomerDto;
  @Output() nextStepTest = new EventEmitter<void>();
  documentTypes = DOCUMENTS_TYPES;
  ratingAgencies = RATING_AGENCIES;
  riskProfileOptions = RISK_PROFILE_OPTIONS;
  
  getRiskProfileLabel(value: string | number): string {
    const profile = RISK_PROFILE_OPTIONS.find(opt => opt.value === String(value));
    return profile ? profile.label : String(value);
  }
  // customerStatusOptions = ['Active', 'Inactive', 'Pending', 'Closed'];
    customerStatusOptions = CUSTOMER_STATUS_OPTIONS;
  
    getStatusLabel(status: string |number): string {
      const statusStr = String(status);
      const statusOption = this.customerStatusOptions.find(opt => opt.value === statusStr);
      return statusOption ? statusOption.label : statusStr;
    }


  constructor(private fb: FormBuilder, 
      private customerDataService: CustomerDataService, 
      private store: Store
    ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['Aashu', Validators.required],
      lastName: ['Kumar'],
      fatherName: ['Arvind Nath Verma'],
      motherName: ['Puspa devi'],
      mail: ['aashu@gmail.com', [Validators.required, mailValidator()]],
      mobileNumber: ['9098998888', [Validators.required, phoneNumberValidator()]],
      status: ['1'],
      dateOfBirth: [''],
      onboardingDate: ['', [Validators.required, currentOrFutureDateValidator()]],
      custClsngDt: ['2024-12-31'],
      riskProfile: [''],
      ratingAgency: ['']
    });  
  }

  nextStep() {
    if (this.customerForm.valid) {
      this.customerDataService.setSection('customerDetails', this.customerForm.value);
      this.nextStepTest.emit();
      this.store.dispatch(saveBasicDetails({ basicDetails: this.customerForm.value }));
      // sessionStorage.setItem('customerDto', JSON.stringify(this.customerDtoTest));
    } else {
      this.customerForm.markAllAsTouched(); // Show validation messages if any
    }
  }


  holidays: string[] = [
    '2025-01-01', // New Year's Day
    '2025-08-15', // Independence Day
    '2025-10-02', // Gandhi Jayanti
    '2025-12-25',  // Christmas
    '2025-03-25'
  ];

  highlightHolidays: MatCalendarCellClassFunction<Date> = (date: Date): string => {
    const dateStr = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format
    return this.holidays.includes(dateStr) ? 'holiday' : ''; // ✅ Return empty string instead of null
  };

}

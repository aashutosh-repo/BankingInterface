import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerDto } from '../../../model/interfaces/customerDTO.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule,MatCalendarCellClassFunction  } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DOCUMENTS_TYPES, RATING_AGENCIES } from '../../../constants/dropdowns/CommonDropDowns';
import { MatSelectModule } from '@angular/material/select';
import { CustomerDataService } from '../../../services/customer/customer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-basic-details',
  standalone: true,
  imports: [FormsModule,CommonModule,
    MatInputModule, ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './customer-basic-details.component.html',
  styleUrls: ['./customer-basic-details.component.scss']
})
export class CustomerBasicDetailsComponent implements OnInit {


  customerForm!: FormGroup;
  customerDto: CustomerDto = {} as CustomerDto;
  // @ViewChild('stepper') stepper!: MatStepper;  // Reference to the stepper
  @Output() nextStepTest = new EventEmitter<void>();
  documentTypes = DOCUMENTS_TYPES;
  ratingAgencies = RATING_AGENCIES;
  riskProfileOptions = ['High', 'Medium', 'Low'];
  customerStatusOptions = ['Active', 'Inactive', 'Pending', 'Closed'];

  constructor(private fb: FormBuilder, private customerDataService: CustomerDataService, private router: Router) {}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['Aashu', Validators.required],
      lastName: ['Kumar'],
      fatherName: ['Arvind Nath Verma'],
      motherName: ['Puspa devi'],
      mail: ['aashu@gmail.com', [Validators.email]],
      mobileNumber: ['123456789'],
      status: ['1'],
      dateOfBirth: [''],
      onboardingDate: [''],
      custClsngDt: ['2024-12-31'],
      riskProfile: [''],
      ratingAgency: ['']
    });  }


  customerDtoTest: CustomerDto=
  {
    customerCategory: "Individual",
    "firstName": "John",
    "lastName": "Doe",
    "fatherName": "Robert Doe",
    "motherName": "Mary Doe",
    "mail": "john.doe@example.com",
    "mobileNumber": "9876543210",
    "status": 1,
    "dateOfBirth": "1990-05-15",
    "onboardingDate": "2024-03-10",
    "custClsngDt": "2030-12-31",
    "riskProfile": 3,
    "ratingAgency": "CRISIL"
  }

  nextStep() {
    if (this.customerForm.valid) {
      this.customerDataService.setSection('customerDetails', this.customerForm.value);
      this.nextStepTest.emit();
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

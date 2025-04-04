import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerDto } from '../../../model/interfaces/customerDTO.model';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-customer-basic-details',
  standalone: true,
  imports: [FormsModule,CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './customer-basic-details.component.html',
  styleUrls: ['./customer-basic-details.component.css']
})
export class CustomerBasicDetailsComponent {

  customerDto: CustomerDto = {} as CustomerDto;
  // @ViewChild('stepper') stepper!: MatStepper;  // Reference to the stepper
  @Output() nextStepTest = new EventEmitter<void>();
  documentTypes = DOCUMENTS_TYPES;
  ratingAgencies = RATING_AGENCIES;
  riskProfileOptions = ['High', 'Medium', 'Low'];
  customerStatusOptions = ['Active', 'Inactive', 'Pending', 'Closed'];

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
  
  constructor() {}


  nextStep() {
    // Save data to session storage
    sessionStorage.setItem('customerDto', JSON.stringify(this.customerDtoTest));
    // this.router.navigate(['/customer/document']);
    this.nextStepTest.emit();
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

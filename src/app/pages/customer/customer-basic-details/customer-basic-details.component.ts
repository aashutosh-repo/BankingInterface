import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CustomerDto } from '../../../model/interfaces/customerDTO.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper } from '@angular/material/stepper';

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
    MatIconModule
  ],
  templateUrl: './customer-basic-details.component.html',
  styleUrls: ['./customer-basic-details.component.css']
})
export class CustomerBasicDetailsComponent {

  customerDto: CustomerDto = {} as CustomerDto;
  // @ViewChild('stepper') stepper!: MatStepper;  // Reference to the stepper
  @Output() nextStepTest = new EventEmitter<void>();


  customerDtoTest: CustomerDto=
  {
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
  
  constructor(private router: Router) {}


  nextStep() {
    // Save data to session storage
    sessionStorage.setItem('customerDto', JSON.stringify(this.customerDtoTest));
    // this.router.navigate(['/customer/document']);
    this.nextStepTest.emit();
  }
}

import { Component, Inject } from '@angular/core';
import { CustomerDto } from '../../../model/interfaces/customerDTO.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-basic-details',
  imports: [FormsModule,CommonModule],
  templateUrl: './customer-basic-details.component.html',
  styleUrls: ['./customer-basic-details.component.css']
})
export class CustomerBasicDetailsComponent {

  customerDto: CustomerDto = {} as CustomerDto;
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
    // console.log(this.customerDto)
    this.router.navigate(['/customer/document']);
  }

}

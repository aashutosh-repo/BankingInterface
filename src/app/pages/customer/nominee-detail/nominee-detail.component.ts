import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerOnboardingService } from '../../../services/customer/customer-onboarding.service';
import { NomineeDetails } from '../../../model/interfaces/NomineeDetails.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nominee-detail',
  standalone:true,
  imports: [CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
  MatIconModule],
  templateUrl: './nominee-detail.component.html',
  styleUrl: './nominee-detail.component.css'
})
export class NomineeDetailComponent {

  constructor(private router: Router, private customerService: CustomerOnboardingService) {}

  nomineeDetail: NomineeDetails = {} as NomineeDetails;
  @Output() finalSubmit = new EventEmitter<void>(); 

  nomineeDetailTest: NomineeDetails[] =
  [
    {
      "ownerId": 1001,
      "nomineeRefNum": 5001,
      "ownerType": 1,
      "seqNum": 1,
      "nomShare": 50,
      "nomType": 1,
      "nomTypeCode": 101,
      "nomineeFirstName": "Jane",
      "nomineeMiddleName": "Elizabeth",
      "nomineeLastName": "Doe",
      "rtlnType": 2,
      "rtlnTypeCode": 201,
      "dateOfBirth": "1995-08-10",
      "nomAddId": 3001,
      "nomDocId": "NDOC123456",
      "ver": 1
    },
    {
      "ownerId": 1001,
      "nomineeRefNum": 5002,
      "ownerType": 1,
      "seqNum": 2,
      "nomShare": 50,
      "nomType": 2,
      "nomTypeCode": 102,
      "nomineeFirstName": "Michael",
      "nomineeMiddleName": "Andrew",
      "nomineeLastName": "Smith",
      "rtlnType": 3,
      "rtlnTypeCode": 202,
      "dateOfBirth": "2000-12-05",
      "nomAddId": 3002,
      "nomDocId": "NDOC654321",
      "ver": 1
    }
  ]
  
  moveToPreview() {
    // Save data to session storage
    sessionStorage.setItem('nomineeDetails', JSON.stringify(this.nomineeDetailTest));
    console.log('Data saved to session storage:', this.nomineeDetailTest);
    // Navigate to submission or confirmation page
    // this.router.navigate(['/customer/submit']);
    this.finalSubmit.emit();
    
  }



  submitCustomerData() {
    sessionStorage.setItem('nomineeDetails', JSON.stringify(this.nomineeDetailTest));
    this.customerService.sendRequestToBackend()?.subscribe({
      next: (response) => {
        console.log('Data successfully sent to backend:', response);
      },
      error: (error) => {
        console.error('Error sending data:', error);
      }
    });
  }

}

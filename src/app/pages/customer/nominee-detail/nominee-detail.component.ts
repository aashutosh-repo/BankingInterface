import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerOnboardingService } from '../../../services/customer/customer-onboarding.service';
import { NomineeDetails } from '../../../model/interfaces/NomineeDetails.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CustomerDataService } from '../../../services/customer/customer-data.service';
import { CUSTOMER_ELIGIBILITY_TYPES } from '../../../constants/dropdowns/CommonDropDowns';

@Component({
  selector: 'app-nominee-detail',
  standalone:true,
  imports: [FormsModule,CommonModule,
    MatInputModule, ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule, MatSelectModule],
  templateUrl: './nominee-detail.component.html',
  styleUrls: ['./nominee-detail.component.scss']
})
export class NomineeDetailComponent implements OnInit {
  // @ViewChild('nomineeForm') nomineeForm!: NgForm;

  nomineeForm!: FormGroup;
  constructor(private router: Router, 
    private fb: FormBuilder,
    private customerService: CustomerOnboardingService,
    private customerDataService: CustomerDataService) {
    }

    ngOnInit(): void {
      console.log('Nominee Detail Component Initialized');
      this.nomineeForm = this.fb.group({
        ownerId: ['123', Validators.required],
        ownerType: ['123'],
        nomShare: ['100'],
        nomType: ['Major'],
        nomineeFirstName: ['Aashu'],
        nomineeLastName: ['Kumar'],
        relationshipType: [''],
        dateOfBirth: [''],
        nomAddId: ['234'],
        nomDocId: ['12345']
      });
    }
  nomineeDetail: NomineeDetails = {} as NomineeDetails;
  nomineeRelations: string[] = ['Spouse', 'Children', 'Father','Mother', 'Siblings', 'NGO', 'Trust'];
  nomineeTypes=CUSTOMER_ELIGIBILITY_TYPES;

  getNomineeTyepesLabel(nomineeType: string|number): string {
    const nomineeTypeObj = this.nomineeTypes.find((type) => type.value === nomineeType);
    return nomineeTypeObj ? nomineeTypeObj.label : 'Unknown Type';
  }


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
    if (this.nomineeForm.valid) {
      this.customerDataService.setSection('nomineeDetails', this.nomineeForm.value);
      const fullPayload = this.customerDataService.getAllData();
      console.log('Full Payload:', fullPayload); // Log the full payload to the console
      // this.router.navigate(['/customer/preview']);
      this.finalSubmit.emit();

    } else {
      this.nomineeForm.markAllAsTouched();
    }
    
  }



  onSubmit() {
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

import { Component, EventEmitter, Output } from '@angular/core';
import { SharedMaterialModules } from '../../../../shared/material-imports/shared-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerOnboardingService } from '../../../../services/customer/customer-onboarding.service';
import { CustomerDataService } from '../../../../services/customer/customer-data.service';
import { NomineeDetails } from '../../../../model/interfaces/customer.model';
import { CUSTOMER_ELIGIBILITY_TYPES } from '../../../../constants/dropdowns/CommonDropDowns';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-nominee-detail',
  imports: [SharedMaterialModules, FormsModule,ReactiveFormsModule, MatDatepickerModule, 
    MatNativeDateModule],
  templateUrl: './nominee-detail.component.html',
  styleUrl: './nominee-detail.component.scss'
})
export class NomineeDetailComponent {

  nomineeForm!: FormGroup;
  constructor( 
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
        nomType: ['' , Validators.required],
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
    sessionStorage.setItem('nomineeDetails', JSON.stringify(this.nomineeDetail));
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

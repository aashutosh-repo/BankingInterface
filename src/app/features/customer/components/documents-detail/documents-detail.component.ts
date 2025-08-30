import { Component, EventEmitter, Output } from '@angular/core';
import { SharedMaterialModules } from '../../../../shared/material-imports/shared-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentDTO } from '../../../../model/interfaces/DocumentDTO.model';
import { DOCUMENTS_TYPES } from '../../../../constants/dropdowns/CommonDropDowns';
import { Router } from '@angular/router';
import { CustomerDataService } from '../../../../services/customer/customer-data.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-documents-detail',
  imports: [SharedMaterialModules, FormsModule, ReactiveFormsModule, 
    MatDatepickerModule, 
    MatNativeDateModule],
  templateUrl: './documents-detail.component.html',
  styleUrl: './documents-detail.component.scss'
})
export class DocumentsDetailComponent {
  documentForm!: FormGroup;
  docDto: DocumentDTO = {} as DocumentDTO;
  documentType: string[] = DOCUMENTS_TYPES;
  @Output() nextStepToNomineeDetails = new EventEmitter<void>(); // Event to notify parent

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerDataService: CustomerDataService
  ) {}
  ngOnInit(): void {
    this.documentForm = this.fb.group({
      custId: ['1234', Validators.required],
      docDescription: ['Passport'],
      docIdentificationNumber: ['A1234567'],
      docType: ['Government ID', Validators.required],
      issueDate: ['2020-06-15'],
      expiryDate: ['2030-06-15']
    });
  }
  
  docDtoTest: DocumentDTO =
  {
    "custId": 1001,
    "docDescription": "Passport",
    "docIdentificationNumber": "A1234567",
    "docType": "Government ID",
    "docTypeCode": "PP",
    "issueDate": "2020-06-15",
    "expiryDate": "2030-06-15"
  }
  



  onSubmit() {
    if (this.documentForm.valid) {
      this.customerDataService.setSection('documentDetails', this.documentForm.value);
      this.nextStepToNomineeDetails.emit();
      // this.router.navigate(['/nominee-details']); // Proceed to next page
    } else {
      this.documentForm.markAllAsTouched();
    }

  }

}

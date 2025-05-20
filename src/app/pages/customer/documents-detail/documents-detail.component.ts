import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {DocumentDTO } from '../../../model/interfaces/DocumentDTO.model';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DOCUMENTS_TYPES } from '../../../constants/dropdowns/CommonDropDowns';
import { MatSelectModule } from '@angular/material/select';
import { CustomerDataService } from '../../../services/customer/customer-data.service';

@Component({
  selector: 'app-documents-detail',
  standalone:true,
  imports: [FormsModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatIconModule],
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.scss']
})
export class DocumentsDetailComponent implements OnInit {
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
